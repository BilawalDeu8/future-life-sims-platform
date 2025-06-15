
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bookmark, Star, AlertCircle, TrendingUp, Trophy, MapPin, Building } from "lucide-react";

interface YearNodeProps {
  yearData: {
    year: number;
    age: number;
    isCurrentYear: boolean;
    isCompleted: boolean;
    hasDecision: boolean;
    hasMilestone?: boolean;
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
      location?: string;
      lifestyle?: string;
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
  const { year, age, isCurrentYear, isCompleted, hasDecision, hasMilestone, lifeData } = yearData;

  return (
    <div className="relative flex flex-col items-center mx-4 group">
      {/* Achievement/Milestone Indicators */}
      {hasMilestone && (
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center bg-yellow-500/20 rounded-full px-3 py-1 border border-yellow-400">
            <Trophy className="h-4 w-4 text-yellow-400 mr-1" />
            <span className="text-xs text-yellow-300 font-semibold">Milestone</span>
          </div>
        </div>
      )}

      {lifeData.achievements.length > 0 && !hasMilestone && (
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
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
          <Badge variant="destructive" className="animate-bounce bg-purple-600 hover:bg-purple-700">
            Big Decision
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
          w-20 h-20 rounded-full flex flex-col items-center justify-center text-center relative border-2
          ${isCurrentYear 
            ? 'bg-gradient-to-br from-purple-500 to-pink-500 ring-4 ring-white/50 border-white' 
            : isCompleted 
            ? 'bg-gradient-to-br from-blue-500 to-purple-500 border-blue-300' 
            : 'bg-gray-700 border-dashed border-gray-400'
          }
          ${isSelected ? 'ring-2 ring-yellow-400' : ''}
          ${hasMilestone ? 'ring-2 ring-yellow-400 animate-pulse' : ''}
        `}>
          <div className="text-sm font-bold">{year}</div>
          <div className="text-xs opacity-80">Age {age}</div>
          
          {/* Current Year Pulse */}
          {isCurrentYear && (
            <div className="absolute inset-0 rounded-full border-2 border-white animate-pulse" />
          )}

          {/* Milestone Glow */}
          {hasMilestone && (
            <div className="absolute inset-0 rounded-full bg-yellow-400/20 animate-pulse" />
          )}
        </div>

        {/* Enhanced Life Tracks */}
        <div className="absolute top-24 left-1/2 transform -translate-x-1/2 space-y-1">
          {/* Career Track - Height based on seniority */}
          <div 
            className="w-3 bg-blue-500 rounded opacity-60 group-hover:opacity-100 transition-opacity"
            style={{ height: `${Math.min(40, 20 + (age - 22) * 2)}px` }}
          />
          
          {/* Relationship Track */}
          <div 
            className="w-3 bg-pink-500 rounded opacity-60 group-hover:opacity-100 transition-opacity"
            style={{ 
              height: lifeData.relationships === 'Single' ? '10px' : 
                     lifeData.relationships === 'Dating' ? '20px' :
                     lifeData.relationships === 'Serious relationship' ? '30px' : '40px'
            }}
          />
          
          {/* Financial Track */}
          <div 
            className="w-3 bg-green-500 rounded opacity-60 group-hover:opacity-100 transition-opacity"
            style={{ height: `${Math.min(50, lifeData.finances.savings / 5000)}px` }}
          />

          {/* Location Indicator */}
          {lifeData.location && (
            <div className="w-3 h-3 bg-orange-400 rounded-full opacity-60 group-hover:opacity-100 transition-opacity" />
          )}
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
      <div className="mt-20 text-center">
        <div className="text-sm font-medium">{year}</div>
        {isCurrentYear && (
          <div className="text-xs text-blue-300 animate-pulse">Current</div>
        )}
        {lifeData.location && (
          <div className="text-xs text-orange-300 mt-1">{lifeData.location}</div>
        )}
      </div>

      {/* Enhanced Hover Detail Card */}
      <div className="absolute top-28 left-1/2 transform -translate-x-1/2 bg-black/95 backdrop-blur-sm rounded-lg p-4 min-w-64 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20 border border-white/20">
        <div className="text-xs space-y-2">
          <div className="flex items-center">
            <Building className="h-3 w-3 text-blue-300 mr-2" />
            <span className="text-blue-300 font-semibold">Career:</span> 
            <span className="ml-1 text-white">{lifeData.career}</span>
          </div>
          
          {lifeData.location && (
            <div className="flex items-center">
              <MapPin className="h-3 w-3 text-orange-300 mr-2" />
              <span className="text-orange-300 font-semibold">Location:</span> 
              <span className="ml-1 text-white">{lifeData.location}</span>
            </div>
          )}
          
          <div className="flex items-center">
            <span className="text-green-300 font-semibold">Income:</span> 
            <span className="ml-1 text-white">${lifeData.finances.income.toLocaleString()}</span>
          </div>
          
          <div className="flex items-center">
            <span className="text-pink-300 font-semibold">Living:</span> 
            <span className="ml-1 text-white">{lifeData.livingSituation}</span>
          </div>
          
          <div className="flex items-center">
            <span className="text-yellow-300 font-semibold">Relationship:</span> 
            <span className="ml-1 text-white">{lifeData.relationships}</span>
          </div>
          
          {lifeData.achievements.length > 0 && (
            <div className="pt-2 border-t border-white/20">
              <div className="text-yellow-400 text-xs font-semibold mb-1">
                🏆 Achievements:
              </div>
              <div className="text-yellow-200 text-xs">
                {lifeData.achievements.join(', ')}
              </div>
            </div>
          )}
          
          {lifeData.challenges.length > 0 && (
            <div className="pt-2 border-t border-white/20">
              <div className="text-red-400 text-xs font-semibold mb-1">
                ⚠️ Challenges:
              </div>
              <div className="text-red-200 text-xs">
                {lifeData.challenges.join(', ')}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default YearNode;
