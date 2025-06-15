
import React from 'react';
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";

interface TimelineControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

const TimelineControls: React.FC<TimelineControlsProps> = ({
  isPlaying,
  onPlayPause,
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onReset
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={onPlayPause}
        className="text-white border-green-400 hover:bg-green-500/30 hover:text-white bg-green-500/20"
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={onZoomOut}
        disabled={zoomLevel <= 0.5}
        className="text-white border-orange-400 hover:bg-orange-500/30 hover:text-white bg-orange-500/20 disabled:opacity-50"
      >
        <ZoomOut className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={onZoomIn}
        disabled={zoomLevel >= 2}
        className="text-white border-orange-400 hover:bg-orange-500/30 hover:text-white bg-orange-500/20 disabled:opacity-50"
      >
        <ZoomIn className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={onReset}
        className="text-white border-red-400 hover:bg-red-500/30 hover:text-white bg-red-500/20"
      >
        <RotateCcw className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default TimelineControls;
