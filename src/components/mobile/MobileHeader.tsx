
import React from 'react';
import { Button } from "@/components/ui/button";
import { Settings, GitCompare, Users, Plus } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface MobileHeaderProps {
  onPersonalizationClick: () => void;
  onComparisonClick: () => void;
  onCommunityClick: () => void;
  onTimelineClick: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({
  onPersonalizationClick,
  onComparisonClick,
  onCommunityClick,
  onTimelineClick
}) => {
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return (
    <div className="sticky top-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10 px-4 py-3">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Life Simulator
        </h1>
        
        <div className="flex space-x-1">
          <Button
            onClick={onPersonalizationClick}
            className="bg-purple-600/20 border border-purple-400 text-purple-300 hover:bg-purple-600/30 hover:text-white p-2"
            size="sm"
          >
            <Settings className="h-4 w-4" />
          </Button>
          
          <Button
            onClick={onComparisonClick}
            className="bg-green-600/20 border border-green-400 text-green-300 hover:bg-green-600/30 hover:text-white p-2"
            size="sm"
          >
            <GitCompare className="h-4 w-4" />
          </Button>
          
          <Button
            onClick={onCommunityClick}
            className="bg-purple-600/20 border border-purple-400 text-purple-300 hover:bg-purple-600/30 hover:text-white p-2"
            size="sm"
          >
            <Users className="h-4 w-4" />
          </Button>
          
          <Button
            onClick={onTimelineClick}
            className="bg-orange-600/20 border border-orange-400 text-orange-300 hover:bg-orange-600/30 hover:text-white p-2"
            size="sm"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;
