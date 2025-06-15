
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bookmark, Home, Building, Car, Heart, Trophy, GraduationCap, Briefcase, MapPin } from "lucide-react";

interface VisualYearNodeProps {
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
  index: number;
}

const VisualYearNode: React.FC<VisualYearNodeProps> = ({
  yearData,
  isSelected,
  isBookmarked,
  onClick,
  onBookmark,
  index
}) => {
  const { year, age, isCurrentYear, isCompleted, hasDecision, hasMilestone, lifeData } = yearData;

  // Determine building type based on career stage
  const getBuildingIcon = () => {
    if (lifeData.career.includes('Junior') || lifeData.career.includes('Entry')) {
      return <Building className="h-8 w-8 text-gray-400" />;
    } else if (lifeData.career.includes('Senior') || lifeData.career.includes('Lead')) {
      return <Building className="h-10 w-10 text-blue-400" />;
    } else if (lifeData.career.includes('Manager') || lifeData.career.includes('Director')) {
      return <Building className="h-12 w-12 text-purple-400" />;
    }
    return <Building className="h-8 w-8 text-gray-400" />;
  };

  // Determine housing type
  const getHousingIcon = () => {
    if (lifeData.livingSituation.includes('apartment') || lifeData.livingSituation.includes('Studio')) {
      return <Building className="h-6 w-6 text-orange-300" />;
    } else if (lifeData.livingSituation.includes('House')) {
      return <Home className="h-8 w-8 text-green-400" />;
    }
    return <Building className="h-6 w-6 text-orange-300" />;
  };

  return (
    <div className="relative flex flex-col items-center mx-4 group">
      {/* Major Decision Billboard */}
      {hasDecision && (
        <div className="absolute -top-24 left-1/2 transform -translate-x-1/2">
          <div className="bg-red-600/90 text-white px-4 py-2 rounded-lg border-2 border-red-400 shadow-lg animate-pulse">
            <div className="text-xs font-bold">BIG DECISION</div>
            <div className="text-xs">Age {age}</div>
          </div>
        </div>
      )}

      {/* Achievement Flag */}
      {hasMilestone && (
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
          <div className="bg-yellow-500/90 text-black px-3 py-1 rounded-full border border-yellow-400 shadow-lg">
            <Trophy className="h-4 w-4 inline mr-1" />
            <span className="text-xs font-bold">Milestone!</span>
          </div>
        </div>
      )}

      {/* Main Visual Area */}
      <div
        className={`relative cursor-pointer transition-all duration-300 ${
          isCurrentYear 
            ? 'scale-125 z-20' 
            : isSelected 
            ? 'scale-110 z-10' 
            : 'hover:scale-105'
        }`}
        onClick={onClick}
      >
        {/* Career Building */}
        <div className={`
          relative mb-2 p-3 rounded-lg shadow-lg border-2
          ${isCurrentYear 
            ? 'bg-gradient-to-t from-purple-600/80 to-blue-600/80 border-white ring-4 ring-white/50' 
            : isCompleted 
            ? 'bg-gradient-to-t from-gray-600/60 to-gray-500/60 border-gray-300' 
            : 'bg-gradient-to-t from-gray-800/60 to-gray-700/60 border-dashed border-gray-400'
          }
          ${isSelected ? 'ring-2 ring-yellow-400' : ''}
        `}>
          {getBuildingIcon()}
          
          {/* Company/Career label */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
            <div className="bg-blue-900/80 text-white px-2 py-1 rounded text-xs font-semibold">
              {lifeData.career}
            </div>
          </div>
        </div>

        {/* Housing */}
        <div className={`
          relative mb-2 p-2 rounded shadow-md border
          ${lifeData.livingSituation.includes('House') 
            ? 'bg-green-500/60 border-green-300' 
            : 'bg-orange-500/60 border-orange-300'
          }
        `}>
          {getHousingIcon()}
        </div>

        {/* Relationship Heart */}
        {lifeData.relationships !== 'Single' && (
          <div className="absolute -right-2 top-0">
            <Heart className={`h-4 w-4 ${
              lifeData.relationships === 'Married' ? 'text-red-400 fill-current' : 'text-pink-400'
            }`} />
          </div>
        )}

        {/* Income indicator */}
        <div className="absolute -left-6 top-1/2 transform -translate-y-1/2">
          <div className="bg-green-600/80 text-white px-1 py-0.5 rounded text-xs font-bold">
            ${Math.round(lifeData.finances.income/1000)}k
          </div>
        </div>
      </div>

      {/* Bookmark Button */}
      <Button
        variant="ghost"
        size="sm"
        className={`absolute -right-2 -top-2 p-1 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 hover:bg-black/70 ${
          isBookmarked ? 'text-yellow-400' : 'text-gray-300'
        }`}
        onClick={(e) => {
          e.stopPropagation();
          onBookmark();
        }}
      >
        <Bookmark className="h-3 w-3" fill={isBookmarked ? 'currentColor' : 'none'} />
      </Button>

      {/* Year Label on Road */}
      <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center">
        <div className={`text-sm font-bold px-2 py-1 rounded ${
          isCurrentYear ? 'bg-yellow-400 text-black' : 'bg-white/20 text-white'
        }`}>
          {year}
        </div>
        <div className="text-xs text-gray-300 mt-1">Age {age}</div>
        {lifeData.location && (
          <div className="text-xs text-blue-300 mt-1 flex items-center justify-center">
            <MapPin className="h-3 w-3 mr-1" />
            {lifeData.location}
          </div>
        )}
      </div>

      {/* Detailed Hover Card */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-black/95 backdrop-blur-sm rounded-lg p-4 min-w-72 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-30 border border-white/20">
        <div className="text-xs space-y-2">
          <div className="text-center border-b border-white/20 pb-2">
            <div className="text-lg font-bold text-white">{year} - Age {age}</div>
            <div className="text-blue-300">{lifeData.location}</div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="flex items-center mb-1">
                <Briefcase className="h-3 w-3 text-blue-300 mr-2" />
                <span className="text-blue-300 font-semibold text-xs">Career</span>
              </div>
              <div className="text-white text-xs">{lifeData.career}</div>
              <div className="text-green-300 text-xs">${lifeData.finances.income.toLocaleString()}/year</div>
            </div>
            
            <div>
              <div className="flex items-center mb-1">
                <Home className="h-3 w-3 text-orange-300 mr-2" />
                <span className="text-orange-300 font-semibold text-xs">Living</span>
              </div>
              <div className="text-white text-xs">{lifeData.livingSituation}</div>
            </div>
            
            <div>
              <div className="flex items-center mb-1">
                <Heart className="h-3 w-3 text-pink-300 mr-2" />
                <span className="text-pink-300 font-semibold text-xs">Personal</span>
              </div>
              <div className="text-white text-xs">{lifeData.relationships}</div>
            </div>
            
            <div>
              <div className="flex items-center mb-1">
                <Trophy className="h-3 w-3 text-yellow-300 mr-2" />
                <span className="text-yellow-300 font-semibold text-xs">Savings</span>
              </div>
              <div className="text-white text-xs">${lifeData.finances.savings.toLocaleString()}</div>
            </div>
          </div>
          
          {lifeData.achievements.length > 0 && (
            <div className="pt-2 border-t border-white/20">
              <div className="text-yellow-400 text-xs font-semibold mb-1">🏆 Achievements:</div>
              <div className="text-yellow-200 text-xs">{lifeData.achievements.join(', ')}</div>
            </div>
          )}
          
          {lifeData.challenges.length > 0 && (
            <div className="pt-2 border-t border-white/20">
              <div className="text-red-400 text-xs font-semibold mb-1">⚠️ Challenges:</div>
              <div className="text-red-200 text-xs">{lifeData.challenges.join(', ')}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisualYearNode;
