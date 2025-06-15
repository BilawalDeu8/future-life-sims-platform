
import React from 'react';
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, ZoomIn, ZoomOut, Share2, Bookmark } from "lucide-react";

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
      {/* Playback Controls */}
      <div className="flex items-center space-x-1 bg-black/30 rounded-lg p-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={onPlayPause}
          className="text-white hover:bg-white/10"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="text-white hover:bg-white/10"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      {/* Zoom Controls */}
      <div className="flex items-center space-x-1 bg-black/30 rounded-lg p-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={onZoomOut}
          disabled={zoomLevel <= 0.5}
          className="text-white hover:bg-white/10 disabled:opacity-50"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        
        <span className="text-xs text-white px-2 min-w-12 text-center">
          {Math.round(zoomLevel * 100)}%
        </span>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onZoomIn}
          disabled={zoomLevel >= 2}
          className="text-white hover:bg-white/10 disabled:opacity-50"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
      </div>

      {/* Additional Controls */}
      <div className="flex items-center space-x-1 bg-black/30 rounded-lg p-1">
        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/10"
        >
          <Bookmark className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/10"
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TimelineControls;
