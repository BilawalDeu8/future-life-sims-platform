
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ZoomIn, ZoomOut, RotateCcw, Share2, Download, Settings } from 'lucide-react';
import { LifeEvent, CanvasViewport, TimelineMarker } from '@/types/lifeCanvas';
import CanvasRenderer from './CanvasRenderer';
import EventCreationFAB from './EventCreationFAB';
import EventDetailModal from './EventDetailModal';
import TimelineControls from './TimelineControls';
import ComparisonOverlay from './ComparisonOverlay';
import QuickAddToolbar from './QuickAddToolbar';
import LifeInsightsPanel from './LifeInsightsPanel';
import { useLifeCanvasData } from '@/hooks/useLifeCanvasData';
import { useCanvasInteractions } from '@/hooks/useCanvasInteractions';
import { toast } from 'sonner';

interface LifeCanvasProps {
  userId: string;
  currentAge: number;
  birthYear: number;
}

const LifeCanvas: React.FC<LifeCanvasProps> = ({ userId, currentAge, birthYear }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Canvas state
  const [viewport, setViewport] = useState<CanvasViewport>({
    x: 0,
    y: 0,
    zoom: 1,
    width: 1200,
    height: 600
  });

  // UI state
  const [selectedEvent, setSelectedEvent] = useState<LifeEvent | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Data hooks
  const {
    events,
    timelineMarkers,
    insights,
    addEvent,
    updateEvent,
    deleteEvent,
    connectEvents,
    generateInsights
  } = useLifeCanvasData(userId, currentAge, birthYear);

  const {
    handleCanvasClick,
    handleIconDrag,
    handleZoom,
    getEventAtPosition,
    snapToGrid
  } = useCanvasInteractions(viewport, setViewport);

  // Initialize canvas
  useEffect(() => {
    if (canvasRef.current && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setViewport(prev => ({
        ...prev,
        width: rect.width,
        height: rect.height
      }));
      
      // Center on current age
      const currentAgePosition = (currentAge - 18) * 100; // 100px per year
      setViewport(prev => ({
        ...prev,
        x: -currentAgePosition + rect.width / 2
      }));
    }
  }, [currentAge]);

  // Mouse interactions
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Check if clicking on an event
    const clickedEvent = getEventAtPosition(x, y, events);
    if (clickedEvent) {
      setSelectedEvent(clickedEvent);
      return;
    }

    // Start dragging canvas
    setIsDragging(true);
    setDragStart({ x: e.clientX - viewport.x, y: e.clientY - viewport.y });
  }, [viewport, events, getEventAtPosition]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;

    setViewport(prev => ({
      ...prev,
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    }));
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Zoom controls
  const handleZoomIn = () => {
    setViewport(prev => ({
      ...prev,
      zoom: Math.min(prev.zoom * 1.2, 3)
    }));
  };

  const handleZoomOut = () => {
    setViewport(prev => ({
      ...prev,
      zoom: Math.max(prev.zoom / 1.2, 0.3)
    }));
  };

  const resetView = () => {
    const currentAgePosition = (currentAge - 18) * 100;
    setViewport(prev => ({
      ...prev,
      x: -currentAgePosition + prev.width / 2,
      y: 0,
      zoom: 1
    }));
  };

  // Event creation
  const handleEventCreated = async (eventData: Partial<LifeEvent>) => {
    try {
      await addEvent(eventData);
      toast.success('Life event added to your timeline!');
    } catch (error) {
      toast.error('Failed to add event. Please try again.');
    }
  };

  // Quick add positioning
  const handleQuickAddPosition = (x: number, y: number) => {
    // Convert screen position to timeline position
    const timelineX = (x - viewport.x) / viewport.zoom;
    const age = 18 + (timelineX / 100); // 100px per year
    
    setShowQuickAdd(true);
    // Position will be passed to QuickAddToolbar
  };

  return (
    <div className="h-full w-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Main Canvas Container */}
      <div 
        ref={containerRef}
        className="relative w-full h-full cursor-move"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <CanvasRenderer
          ref={canvasRef}
          viewport={viewport}
          events={events}
          timelineMarkers={timelineMarkers}
          currentAge={currentAge}
          showComparison={showComparison}
          onEventClick={setSelectedEvent}
          onCanvasClick={handleQuickAddPosition}
        />

        {/* Current Age Indicator */}
        <div 
          className="absolute top-4 bg-blue-500/90 text-white px-4 py-2 rounded-full font-semibold animate-pulse shadow-lg"
          style={{
            left: `${viewport.x + (currentAge - 18) * 100 * viewport.zoom - 60}px`
          }}
        >
          YOU ARE HERE
        </div>
      </div>

      {/* Timeline Controls */}
      <TimelineControls
        viewport={viewport}
        currentAge={currentAge}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onReset={resetView}
        onToggleComparison={() => setShowComparison(!showComparison)}
        onToggleInsights={() => setShowInsights(!showInsights)}
        showComparison={showComparison}
      />

      {/* Event Creation FAB */}
      <EventCreationFAB
        onEventCreate={handleEventCreated}
        currentAge={currentAge}
      />

      {/* Quick Add Toolbar */}
      {showQuickAdd && (
        <QuickAddToolbar
          onEventCreate={handleEventCreated}
          onClose={() => setShowQuickAdd(false)}
          suggestedAge={currentAge}
        />
      )}

      {/* Event Detail Modal */}
      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onUpdate={updateEvent}
          onDelete={deleteEvent}
          allEvents={events}
          onConnect={connectEvents}
        />
      )}

      {/* Comparison Overlay */}
      {showComparison && (
        <ComparisonOverlay
          events={events}
          predictions={[]} // TODO: Connect to prediction data
          onClose={() => setShowComparison(false)}
        />
      )}

      {/* Life Insights Panel */}
      {showInsights && (
        <LifeInsightsPanel
          insights={insights}
          onClose={() => setShowInsights(false)}
          onGenerateInsights={generateInsights}
        />
      )}

      {/* Floating Action Buttons */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Button
          variant="outline"
          size="icon"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          onClick={() => setShowInsights(!showInsights)}
        >
          <Settings className="h-4 w-4" />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          <Share2 className="h-4 w-4" />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          <Download className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default LifeCanvas;
