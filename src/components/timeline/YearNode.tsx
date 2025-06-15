
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bookmark, Star, AlertCircle, TrendingUp } from "lucide-react";

interface YearNodeProps {
  yearData: {
    year: number;
    age: number;
    isCurrentYear: boolean;
    isCompleted: boolean;
    hasDecision: boolean;
    lifeData: {
      livingSituation: string;
      career: string;
      relationships: string;
      finances: {
        income: number;
        expenses: number;
        savings: number;
      };
      health: {
        stress: number;
        fitness: number;
        workLifeBalance: number;
      };
      achievements: string[];
      challenges: string[];
    };
  };
  isSelected: boolean;
  isBookmarked: boolean;
  onClick: () => void;
  onBookmark: () => void;
}

const YearNode: React.FC<YearNodeProps> = ({
  yearData,
  isSelected,
  isBookmarked,
  onClick,
  onBookmark
}) => {
  const { year, age, isCurrentYear, isCompleted, hasDecision, lifeData } = yearData;

  return (
    <div className="relative flex flex-col items-center mx-4 group">
      {/* Achievement/Challenge Indicators */}
      {lifeData.achievements.length > 0 && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
          <Star className="h-4 w-4 text-yellow-400 animate-pulse" />
        </div>
      )}
      
      {lifeData.challenges.length > 0 && (
        <div className="absolute -top-8 right-0">
          <AlertCircle className="h-4 w-4 text-red-400" />
        </div>
      )}

      {/* Decision Point Indicator */}
      {hasDecision && (
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
          <Badge variant="destructive" className="animate-bounce">
            Decision
          </Badge>
        </div>
      )}

      {/* Main Year Node */}
      <div
        className={`relative cursor-pointer transition-all duration-300 ${
          isCurrentYear 
            ? 'scale-125 z-10' 
            : isSelected 
            ? 'scale-110 z-5' 
            : 'hover:scale-105'
        }`}
        onClick={onClick}
      >
        {/* Year Circle */}
        <div className={`
          w-16 h-16 rounded-full flex flex-col items-center justify-center text-center relative
          ${isCurrentYear 
            ? 'bg-gradient-to-br from-purple-500 to-pink-500 ring-4 ring-white/50' 
            : isCompleted 
            ? 'bg-gradient-to-br from-blue-500 to-purple-500' 
            : 'bg-gray-600 border-2 border-dashed border-gray-400'
          }
          ${isSelected ? 'ring-2 ring-yellow-400' : ''}
        `}>
          <div className="text-xs font-bold">{year}</div>
          <div className="text-xs opacity-80">Age {age}</div>
          
          {/* Avatar/Progress Ring */}
          {isCurrentYear && (
            <div className="absolute inset-0 rounded-full border-2 border-white animate-pulse" />
          )}
        </div>

        {/* Life Tracks */}
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 space-y-1">
          {/* Career Track */}
          <div className="w-2 h-8 bg-blue-500 rounded opacity-60 group-hover:opacity-100 transition-opacity" />
          
          {/* Relationship Track */}
          <div className="w-2 h-6 bg-pink-500 rounded opacity-60 group-hover:opacity-100 transition-opacity" />
          
          {/* Financial Track */}
          <div 
            className="w-2 bg-green-500 rounded opacity-60 group-hover:opacity-100 transition-opacity"
            style={{ height: `${Math.min(40, lifeData.finances.savings / 1000)}px` }}
          />
        </div>
      </div>

      {/* Bookmark Button */}
      <Button
        variant="ghost"
        size="sm"
        className={`absolute -right-2 top-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity ${
          isBookmarked ? 'text-yellow-400' : 'text-gray-400'
        }`}
        onClick={(e) => {
          e.stopPropagation();
          onBookmark();
        }}
      >
        <Bookmark className="h-3 w-3" fill={isBookmarked ? 'currentColor' : 'none'} />
      </Button>

      {/* Year Label */}
      <div className="mt-16 text-center">
        <div className="text-sm font-medium">{year}</div>
        {isCurrentYear && (
          <div className="text-xs text-blue-300 animate-pulse">Current</div>
        )}
      </div>

      {/* Hover Detail Card */}
      <div className="absolute top-24 left-1/2 transform -translate-x-1/2 bg-black/90 backdrop-blur-sm rounded-lg p-3 min-w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
        <div className="text-xs space-y-1">
          <div><span className="text-blue-300">Career:</span> {lifeData.career}</div>
          <div><span className="text-pink-300">Living:</span> {lifeData.livingSituation}</div>
          <div><span className="text-green-300">Income:</span> ${lifeData.finances.income.toLocaleString()}</div>
          <div><span className="text-yellow-300">Relationship:</span> {lifeData.relationships}</div>
          
          {lifeData.achievements.length > 0 && (
            <div className="text-yellow-400 text-xs">
              🏆 {lifeData.achievements.join(', ')}
            </div>
          )}
          
          {lifeData.challenges.length > 0 && (
            <div className="text-red-400 text-xs">
              ⚠️ {lifeData.challenges.join(', ')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default YearNode;
