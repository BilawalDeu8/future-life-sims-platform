
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

    // Render timeline grid
    const renderGrid = (ctx: CanvasRenderingContext2D) => {
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;

      // Yearly grid lines
      for (let age = 18; age <= currentAge + 10; age++) {
        const x = (age - 18) * 100 * viewport.zoom + viewport.x;
        
        if (x > -50 && x < viewport.width + 50) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, viewport.height);
          ctx.stroke();

          // Year labels
          ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
          ctx.font = `${12 * viewport.zoom}px system-ui`;
          ctx.textAlign = 'center';
          ctx.fillText(`Age ${age}`, x, 30);
        }
      }

      // Quarterly subdivisions
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      for (let age = 18; age <= currentAge + 10; age++) {
        for (let quarter = 0; quarter < 4; quarter++) {
          const x = ((age - 18) + quarter * 0.25) * 100 * viewport.zoom + viewport.x;
          
          if (x > -10 && x < viewport.width + 10) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, viewport.height);
            ctx.stroke();
          }
        }
      }

      // Current age line
      const currentX = (currentAge - 18) * 100 * viewport.zoom + viewport.x;
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(currentX, 0);
      ctx.lineTo(currentX, viewport.height);
      ctx.stroke();

      ctx.restore();
    };

    // Render life events
    const renderEvents = (ctx: CanvasRenderingContext2D) => {
      events.forEach(event => {
        const age = new Date().getFullYear() - new Date(event.date).getFullYear();
        const x = (age - 18) * 100 * viewport.zoom + viewport.x + event.position.x;
        const y = event.position.y * viewport.zoom + viewport.y;

        // Skip if outside viewport
        if (x < -50 || x > viewport.width + 50 || y < -50 || y > viewport.height + 50) {
          return;
        }

        ctx.save();

        // Event icon background
        const isHighSatisfaction = event.satisfactionRating >= 4;
        const isPastEvent = age <= currentAge;
        
        const radius = 20 * viewport.zoom;
        const alpha = isPastEvent ? 1 : 0.4;

        // Glow effect for high satisfaction events
        if (isHighSatisfaction && isPastEvent) {
          ctx.shadowColor = '#fbbf24';
          ctx.shadowBlur = 15 * viewport.zoom;
        }

        // Icon circle
        ctx.globalAlpha = alpha;
        ctx.fillStyle = getCategoryColor(event.category.color);
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();

        // Border
        if (isHighSatisfaction && isPastEvent) {
          ctx.strokeStyle = '#fbbf24';
          ctx.lineWidth = 3 * viewport.zoom;
        } else {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
          ctx.lineWidth = 2 * viewport.zoom;
        }
        ctx.stroke();

        // Icon (emoji or symbol)
        ctx.globalAlpha = 1;
        ctx.font = `${16 * viewport.zoom}px system-ui`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'white';
        ctx.fillText(event.category.icon, x, y);

        // Event title
        if (viewport.zoom > 0.5) {
          ctx.font = `${11 * viewport.zoom}px system-ui`;
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.textAlign = 'center';
          ctx.fillText(
            event.title.length > 20 ? event.title.substring(0, 17) + '...' : event.title,
            x,
            y + radius + 15 * viewport.zoom
          );
        }

        ctx.restore();
      });
    };

    // Render connection lines between events
    const renderConnections = (ctx: CanvasRenderingContext2D) => {
      events.forEach(event => {
        event.connections.forEach(connectionId => {
          const connectedEvent = events.find(e => e.id === connectionId);
          if (!connectedEvent) return;

          const age1 = new Date().getFullYear() - new Date(event.date).getFullYear();
          const age2 = new Date().getFullYear() - new Date(connectedEvent.date).getFullYear();
          
          const x1 = (age1 - 18) * 100 * viewport.zoom + viewport.x + event.position.x;
          const y1 = event.position.y * viewport.zoom + viewport.y;
          const x2 = (age2 - 18) * 100 * viewport.zoom + viewport.x + connectedEvent.position.x;
          const y2 = connectedEvent.position.y * viewport.zoom + viewport.y;

          ctx.save();
          ctx.strokeStyle = 'rgba(139, 92, 246, 0.5)';
          ctx.lineWidth = 2 * viewport.zoom;
          ctx.setLineDash([5 * viewport.zoom, 5 * viewport.zoom]);
          
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
          
          ctx.restore();
        });
      });
    };

    // Helper function to get category color
    const getCategoryColor = (color: string) => {
      const colors: { [key: string]: string } = {
        housing: '#ef4444',
        career: '#8b5cf6',
        relationships: '#ec4899',
        finance: '#10b981',
        health: '#f59e0b',
        travel: '#06b6d4',
        achievements: '#eab308',
        custom: '#6b7280'
      };
      return colors[color] || colors.custom;
    };

    // Main render function
    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render components
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

    // Handle clicks
    const handleCanvasClick = (e: React.MouseEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Check if clicking on an event
      for (const event of events) {
        const age = new Date().getFullYear() - new Date(event.date).getFullYear();
        const eventX = (age - 18) * 100 * viewport.zoom + viewport.x + event.position.x;
        const eventY = event.position.y * viewport.zoom + viewport.y;
        const radius = 20 * viewport.zoom;

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
        className="w-full h-full"
        onClick={handleCanvasClick}
        style={{ cursor: 'crosshair' }}
      />
    );
  }
);

CanvasRenderer.displayName = 'CanvasRenderer';

export default CanvasRenderer;
