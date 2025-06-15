
import React from 'react';
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, RotateCcw, BarChart3, GitCompare } from 'lucide-react';
import { CanvasViewport } from '@/types/lifeCanvas';

interface TimelineControlsProps {
  viewport: CanvasViewport;
  currentAge: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onToggleComparison: () => void;
  onToggleInsights: () => void;
  showComparison: boolean;
}

const TimelineControls: React.FC<TimelineControlsProps> = ({
  viewport,
  currentAge,
  onZoomIn,
  onZoomOut,
  onReset,
  onToggleComparison,
  onToggleInsights,
  showComparison
}) => {
  return (
    <div className="absolute bottom-6 left-6 flex flex-col gap-2">
      {/* Zoom Controls */}
      <div className="flex flex-col bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 overflow-hidden">
        <Button
          onClick={onZoomIn}
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/20 rounded-none border-b border-white/10"
          disabled={viewport.zoom >= 3}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        
        <div className="px-3 py-1 text-xs text-white/70 text-center border-b border-white/10">
          {Math.round(viewport.zoom * 100)}%
        </div>
        
        <Button
          onClick={onZoomOut}
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/20 rounded-none"
          disabled={viewport.zoom <= 0.3}
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
      </div>

      {/* Navigation Controls */}
      <div className="flex flex-col gap-2">
        <Button
          onClick={onReset}
          variant="outline"
          size="sm"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Center on Now
        </Button>

        <Button
          onClick={onToggleComparison}
          variant={showComparison ? "default" : "outline"}
          size="sm"
          className={showComparison 
            ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white" 
            : "bg-white/10 border-white/20 text-white hover:bg-white/20"
          }
        >
          <GitCompare className="h-4 w-4 mr-2" />
          Compare Predictions
        </Button>

        <Button
          onClick={onToggleInsights}
          variant="outline"
          size="sm"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          Life Insights
        </Button>
      </div>

      {/* Current Position Indicator */}
      <div className="bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 p-3 text-center">
        <div className="text-xs text-white/70 mb-1">Current Age</div>
        <div className="text-lg font-bold text-white">{currentAge}</div>
      </div>
    </div>
  );
};

export default TimelineControls;
