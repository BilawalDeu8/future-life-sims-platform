
import { useCallback } from 'react';
import { CanvasViewport, LifeEvent } from '@/types/lifeCanvas';

export const useCanvasInteractions = (
  viewport: CanvasViewport,
  setViewport: (viewport: CanvasViewport | ((prev: CanvasViewport) => CanvasViewport)) => void
) => {
  
  // Handle canvas click for positioning
  const handleCanvasClick = useCallback((x: number, y: number) => {
    // Convert screen coordinates to timeline coordinates
    const timelineX = (x - viewport.x) / viewport.zoom;
    const timelineY = (y - viewport.y) / viewport.zoom;
    
    return { x: timelineX, y: timelineY };
  }, [viewport]);

  // Handle icon dragging
  const handleIconDrag = useCallback((eventId: string, deltaX: number, deltaY: number) => {
    // This would update the event position
    const newX = deltaX / viewport.zoom;
    const newY = deltaY / viewport.zoom;
    
    return { x: newX, y: newY };
  }, [viewport.zoom]);

  // Handle zoom functionality
  const handleZoom = useCallback((delta: number, centerX: number, centerY: number) => {
    setViewport(prev => {
      const newZoom = Math.max(0.3, Math.min(3, prev.zoom + delta));
      const zoomFactor = newZoom / prev.zoom;
      
      // Zoom toward the center point
      const newX = centerX - (centerX - prev.x) * zoomFactor;
      const newY = centerY - (centerY - prev.y) * zoomFactor;
      
      return {
        ...prev,
        zoom: newZoom,
        x: newX,
        y: newY
      };
    });
  }, [setViewport]);

  // Get event at specific position
  const getEventAtPosition = useCallback((x: number, y: number, events: LifeEvent[]) => {
    for (const event of events) {
      const age = new Date().getFullYear() - new Date(event.date).getFullYear();
      const eventX = (age - 18) * 100 * viewport.zoom + viewport.x + event.position.x;
      const eventY = event.position.y * viewport.zoom + viewport.y;
      const radius = 20 * viewport.zoom;

      const distance = Math.sqrt((x - eventX) ** 2 + (y - eventY) ** 2);
      if (distance <= radius) {
        return event;
      }
    }
    return null;
  }, [viewport]);

  // Snap position to grid
  const snapToGrid = useCallback((x: number, y: number) => {
    const gridSize = 25; // 25px grid
    return {
      x: Math.round(x / gridSize) * gridSize,
      y: Math.round(y / gridSize) * gridSize
    };
  }, []);

  return {
    handleCanvasClick,
    handleIconDrag,
    handleZoom,
    getEventAtPosition,
    snapToGrid
  };
};
