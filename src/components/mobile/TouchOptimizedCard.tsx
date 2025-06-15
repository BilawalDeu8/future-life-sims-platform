
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MapPin, DollarSign, Clock, Zap } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface TouchOptimizedCardProps {
  scenario: any;
  onSelect: (scenario: any) => void;
  index: number;
}

const TouchOptimizedCard: React.FC<TouchOptimizedCardProps> = ({ scenario, onSelect, index }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const isMobile = useIsMobile();

  const handleTouchStart = () => {
    setIsPressed(true);
    if (isMobile) {
      // Haptic feedback simulation
      if (navigator.vibrate) {
        navigator.vibrate(10);
      }
    }
  };

  const handleTouchEnd = () => {
    setIsPressed(false);
  };

  const handleLongPress = () => {
    setShowTooltip(true);
    if (navigator.vibrate) {
      navigator.vibrate([20, 10, 20]);
    }
    setTimeout(() => setShowTooltip(false), 3000);
  };

  // Long press detection
  let pressTimer: NodeJS.Timeout;

  const startPressTimer = () => {
    pressTimer = setTimeout(handleLongPress, 800);
  };

  const cancelPressTimer = () => {
    clearTimeout(pressTimer);
  };

  return (
    <div className="relative">
      <Card 
        className={`
          bg-white/10 backdrop-blur-sm border-white/20 
          transition-all duration-200 cursor-pointer group overflow-hidden
          ${isPressed ? 'scale-95 shadow-lg' : 'hover:scale-105'}
          ${isMobile ? 'min-h-[280px]' : 'min-h-[400px]'}
          touch-manipulation
        `}
        onClick={() => onSelect(scenario)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={startPressTimer}
        onMouseUp={cancelPressTimer}
        onMouseLeave={cancelPressTimer}
      >
        <div className="relative overflow-hidden rounded-t-lg">
          <img 
            src={`https://images.unsplash.com/${scenario.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`}
            alt={scenario.title}
            className={`
              w-full object-cover group-hover:scale-110 transition-transform duration-500
              ${isMobile ? 'h-32' : 'h-48'}
            `}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className={`absolute bottom-2 left-2 right-2 ${isMobile ? 'bottom-1 left-1 right-1' : ''}`}>
            <h3 className={`font-bold text-white mb-1 ${isMobile ? 'text-lg' : 'text-2xl'}`}>
              {scenario.title}
            </h3>
            <p className={`text-blue-200 ${isMobile ? 'text-xs' : 'text-sm'}`}>
              {scenario.career}
            </p>
          </div>
        </div>
        
        <CardContent className={isMobile ? 'p-3' : 'p-6'}>
          <div className="space-y-3">
            <div className={`flex items-center justify-between ${isMobile ? 'text-xs' : 'text-sm'}`}>
              <div className="flex items-center">
                <MapPin className={`mr-2 text-purple-400 ${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
                <span className="text-gray-300 truncate">{scenario.location}</span>
              </div>
              <div className="flex items-center">
                <DollarSign className={`mr-1 text-green-400 ${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
                <span className="text-gray-300">{scenario.salaryRange}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className={`mr-2 text-blue-400 ${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
                  <span className={`text-gray-300 ${isMobile ? 'text-xs' : 'text-sm'}`}>Work-Life Balance</span>
                </div>
                <div className={`bg-white/20 rounded-full h-2 ${isMobile ? 'w-16' : 'w-24'}`}>
                  <div 
                    className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${scenario.workLifeBalance}%` }}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Zap className={`mr-2 text-yellow-400 ${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
                  <span className={`text-gray-300 ${isMobile ? 'text-xs' : 'text-sm'}`}>Stress Level</span>
                </div>
                <div className={`bg-white/20 rounded-full h-2 ${isMobile ? 'w-16' : 'w-24'}`}>
                  <div 
                    className="bg-gradient-to-r from-yellow-400 to-red-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${scenario.stressLevel}%` }}
                  />
                </div>
              </div>
            </div>
            
            <p className={`text-blue-200 leading-relaxed ${isMobile ? 'text-xs line-clamp-2' : 'text-sm'}`}>
              {scenario.description}
            </p>
            
            <Button 
              className={`
                w-full bg-gradient-to-r from-purple-600 to-pink-600 
                hover:from-purple-700 hover:to-pink-700 
                group-hover:shadow-lg transition-all duration-300 text-white
                ${isMobile ? 'py-2 text-sm' : 'py-3'}
              `}
            >
              Live This Future
              <ArrowRight className={`ml-2 group-hover:translate-x-1 transition-transform ${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tooltip for long press */}
      {showTooltip && (
        <div className="absolute top-0 left-0 right-0 bg-black/90 text-white p-2 rounded-md text-xs z-50 animate-fade-in">
          <p className="font-semibold">{scenario.title}</p>
          <p>Lifestyle: {scenario.lifestyle}</p>
          <p>Living: {scenario.livingSpace}</p>
          <p>Social: {scenario.socialLife}</p>
        </div>
      )}
    </div>
  );
};

export default TouchOptimizedCard;
