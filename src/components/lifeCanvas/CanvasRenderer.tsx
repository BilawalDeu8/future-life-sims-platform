
import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { LifeEvent, CanvasViewport, TimelineMarker } from '@/types/lifeCanvas';

interface CanvasRendererProps {
  viewport: CanvasViewport;
  events: LifeEvent[];
  timelineMarkers: TimelineMarker[];
  currentAge: number;
  showComparison: boolean;
  onEventClick: (event: LifeEvent) => void;
  onCanvasClick: (x: number, y: number) => void;
}

const CanvasRenderer = forwardRef<HTMLCanvasElement, CanvasRendererProps>(
  ({ viewport, events, timelineMarkers, currentAge, showComparison, onEventClick, onCanvasClick }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameRef = useRef<number>();

    useImperativeHandle(ref, () => canvasRef.current!, []);

    // Render magical background
    const renderMagicalBackground = (ctx: CanvasRenderingContext2D) => {
      ctx.save();
      
      // Create animated particles
      const time = Date.now() * 0.001;
      for (let i = 0; i < 50; i++) {
        const x = (Math.sin(time + i) * 200 + i * 50) % viewport.width;
        const y = (Math.cos(time + i * 0.5) * 100 + i * 30) % viewport.height;
        const alpha = (Math.sin(time + i) + 1) * 0.1;
        
        ctx.fillStyle = `rgba(147, 51, 234, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.restore();
    };

    // Render enhanced timeline grid
    const renderGrid = (ctx: CanvasRenderingContext2D) => {
      ctx.save();
      
      // Main timeline path - more magical
      const gradient = ctx.createLinearGradient(0, viewport.height / 2 - 20, 0, viewport.height / 2 + 20);
      gradient.addColorStop(0, 'rgba(147, 51, 234, 0.3)');
      gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.6)');
      gradient.addColorStop(1, 'rgba(147, 51, 234, 0.3)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, viewport.height / 2 - 20, viewport.width, 40);

      // Yearly markers with glow
      for (let age = 18; age <= currentAge + 10; age++) {
        const x = (age - 18) * 100 * viewport.zoom + viewport.x;
        
        if (x > -50 && x < viewport.width + 50) {
          // Marker line
          ctx.strokeStyle = age <= currentAge ? 'rgba(34, 197, 94, 0.8)' : 'rgba(156, 163, 175, 0.4)';
          ctx.lineWidth = age === Math.floor(currentAge) ? 4 : 2;
          
          if (age === Math.floor(currentAge)) {
            ctx.shadowColor = '#22c55e';
            ctx.shadowBlur = 10;
          }
          
          ctx.beginPath();
          ctx.moveTo(x, viewport.height / 2 - 30);
          ctx.lineTo(x, viewport.height / 2 + 30);
          ctx.stroke();
          
          ctx.shadowBlur = 0;

          // Age labels with better styling
          ctx.fillStyle = age <= currentAge ? '#ffffff' : 'rgba(255, 255, 255, 0.6)';
          ctx.font = `bold ${14 * viewport.zoom}px system-ui`;
          ctx.textAlign = 'center';
          ctx.fillText(`${age}`, x, viewport.height / 2 - 40);
          
          // Small year indicator
          ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
          ctx.font = `${10 * viewport.zoom}px system-ui`;
          const year = new Date().getFullYear() - currentAge + age;
          ctx.fillText(`${year}`, x, viewport.height / 2 + 55);
        }
      }

      // Current age pulse effect
      const currentX = (currentAge - 18) * 100 * viewport.zoom + viewport.x;
      const pulse = Math.sin(Date.now() * 0.005) * 0.3 + 0.7;
      ctx.strokeStyle = `rgba(59, 130, 246, ${pulse})`;
      ctx.lineWidth = 6;
      ctx.shadowColor = '#3b82f6';
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.moveTo(currentX, 0);
      ctx.lineTo(currentX, viewport.height);
      ctx.stroke();

      ctx.restore();
    };

    // Render life events with enhanced visuals
    const renderEvents = (ctx: CanvasRenderingContext2D) => {
      console.log('Rendering events:', events.length);
      
      events.forEach((event, index) => {
        // Calculate position based on event date
        const eventDate = new Date(event.date);
        const eventYear = eventDate.getFullYear();
        const currentYear = new Date().getFullYear();
        const ageAtEvent = currentAge - (currentYear - eventYear);
        
        const x = (ageAtEvent - 18) * 100 * viewport.zoom + viewport.x;
        const y = viewport.height / 2 + event.position.y * viewport.zoom;

        console.log(`Event ${index}: ${event.title} at age ${ageAtEvent}, position (${x}, ${y})`);

        // Skip if outside viewport
        if (x < -100 || x > viewport.width + 100) {
          return;
        }

        ctx.save();

        // Enhanced event styling
        const isHighSatisfaction = event.satisfactionRating >= 4;
        const isPastEvent = ageAtEvent <= currentAge;
        const radius = 25 * viewport.zoom;
        const alpha = isPastEvent ? 1 : 0.5;

        // Magical glow effect
        if (isHighSatisfaction && isPastEvent) {
          ctx.shadowColor = '#fbbf24';
          ctx.shadowBlur = 20 * viewport.zoom;
        }

        // Floating animation for events
        const floatOffset = Math.sin(Date.now() * 0.002 + index) * 3;
        const finalY = y + floatOffset;

        // Event circle with gradient
        const eventGradient = ctx.createRadialGradient(x, finalY, 0, x, finalY, radius);
        eventGradient.addColorStop(0, getCategoryColor(event.category.color, 0.9));
        eventGradient.addColorStop(1, getCategoryColor(event.category.color, 0.6));

        ctx.globalAlpha = alpha;
        ctx.fillStyle = eventGradient;
        ctx.beginPath();
        ctx.arc(x, finalY, radius, 0, Math.PI * 2);
        ctx.fill();

        // Enhanced border
        if (isHighSatisfaction && isPastEvent) {
          ctx.strokeStyle = '#fbbf24';
          ctx.lineWidth = 4 * viewport.zoom;
        } else {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
          ctx.lineWidth = 2 * viewport.zoom;
        }
        ctx.stroke();

        // Event icon
        ctx.globalAlpha = 1;
        ctx.font = `${20 * viewport.zoom}px system-ui`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'white';
        ctx.shadowBlur = 0;
        ctx.fillText(event.category.icon, x, finalY);

        // Event title with background
        if (viewport.zoom > 0.5) {
          const titleY = finalY + radius + 20 * viewport.zoom;
          const title = event.title.length > 15 ? event.title.substring(0, 12) + '...' : event.title;
          
          // Title background
          ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
          ctx.font = `bold ${12 * viewport.zoom}px system-ui`;
          const titleWidth = ctx.measureText(title).width;
          ctx.fillRect(x - titleWidth/2 - 8, titleY - 8, titleWidth + 16, 16);
          
          // Title text
          ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
          ctx.fillText(title, x, titleY);
        }

        // Satisfaction indicator
        if (isPastEvent && viewport.zoom > 0.7) {
          const stars = '★'.repeat(event.satisfactionRating);
          ctx.font = `${10 * viewport.zoom}px system-ui`;
          ctx.fillStyle = '#fbbf24';
          ctx.fillText(stars, x, finalY - radius - 15);
        }

        ctx.restore();
      });
    };

    // Enhanced connection rendering
    const renderConnections = (ctx: CanvasRenderingContext2D) => {
      events.forEach(event => {
        event.connections.forEach(connectionId => {
          const connectedEvent = events.find(e => e.id === connectionId);
          if (!connectedEvent) return;

          const eventDate1 = new Date(event.date);
          const eventDate2 = new Date(connectedEvent.date);
          const age1 = currentAge - (new Date().getFullYear() - eventDate1.getFullYear());
          const age2 = currentAge - (new Date().getFullYear() - eventDate2.getFullYear());
          
          const x1 = (age1 - 18) * 100 * viewport.zoom + viewport.x;
          const y1 = viewport.height / 2 + event.position.y * viewport.zoom;
          const x2 = (age2 - 18) * 100 * viewport.zoom + viewport.x;
          const y2 = viewport.height / 2 + connectedEvent.position.y * viewport.zoom;

          ctx.save();
          
          // Animated connection line
          const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
          gradient.addColorStop(0, 'rgba(139, 92, 246, 0.8)');
          gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.6)');
          gradient.addColorStop(1, 'rgba(139, 92, 246, 0.8)');
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 3 * viewport.zoom;
          ctx.setLineDash([8 * viewport.zoom, 6 * viewport.zoom]);
          ctx.lineDashOffset = -Date.now() * 0.01;
          
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
          
          ctx.restore();
        });
      });
    };

    // Helper function with enhanced colors
    const getCategoryColor = (color: string, alpha: number = 1) => {
      const colors: { [key: string]: string } = {
        housing: `rgba(239, 68, 68, ${alpha})`,
        career: `rgba(139, 92, 246, ${alpha})`,
        relationships: `rgba(236, 72, 153, ${alpha})`,
        finance: `rgba(16, 185, 129, ${alpha})`,
        health: `rgba(245, 158, 11, ${alpha})`,
        travel: `rgba(6, 182, 212, ${alpha})`,
        achievements: `rgba(234, 179, 8, ${alpha})`,
        custom: `rgba(107, 114, 128, ${alpha})`
      };
      return colors[color] || colors.custom;
    };

    // Main render function
    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Clear canvas with gradient background
      const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bgGradient.addColorStop(0, 'rgba(88, 28, 135, 0.1)');
      bgGradient.addColorStop(0.5, 'rgba(30, 64, 175, 0.1)');
      bgGradient.addColorStop(1, 'rgba(67, 56, 202, 0.1)');
      
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render components
      renderMagicalBackground(ctx);
      renderGrid(ctx);
      renderConnections(ctx);
      renderEvents(ctx);
    };

    // Handle canvas resize
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const resizeCanvas = () => {
        const rect = canvas.parentElement?.getBoundingClientRect();
        if (rect) {
          canvas.width = rect.width;
          canvas.height = rect.height;
          render();
        }
      };

      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
      return () => window.removeEventListener('resize', resizeCanvas);
    }, []);

    // Render when dependencies change
    useEffect(() => {
      render();
    }, [viewport, events, currentAge, showComparison]);

    // Animation loop for magical effects
    useEffect(() => {
      const animate = () => {
        render();
        animationFrameRef.current = requestAnimationFrame(animate);
      };
      
      animationFrameRef.current = requestAnimationFrame(animate);
      
      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [viewport, events, currentAge]);

    // Handle clicks
    const handleCanvasClick = (e: React.MouseEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Check if clicking on an event
      for (const event of events) {
        const eventDate = new Date(event.date);
        const eventYear = eventDate.getFullYear();
        const currentYear = new Date().getFullYear();
        const ageAtEvent = currentAge - (currentYear - eventYear);
        
        const eventX = (ageAtEvent - 18) * 100 * viewport.zoom + viewport.x;
        const eventY = viewport.height / 2 + event.position.y * viewport.zoom;
        const radius = 25 * viewport.zoom;

        const distance = Math.sqrt((x - eventX) ** 2 + (y - eventY) ** 2);
        if (distance <= radius) {
          onEventClick(event);
          return;
        }
      }

      // If no event clicked, trigger canvas click
      onCanvasClick(x, y);
    };

    return (
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-crosshair"
        onClick={handleCanvasClick}
      />
    );
  }
);

CanvasRenderer.displayName = 'CanvasRenderer';

export default CanvasRenderer;
