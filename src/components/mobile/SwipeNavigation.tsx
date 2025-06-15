
import React, { useState, useRef, useEffect } from 'react';
import { useIsMobile } from "@/hooks/use-mobile";

interface SwipeNavigationProps {
  children: React.ReactNode[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  className?: string;
}

const SwipeNavigation: React.FC<SwipeNavigationProps> = ({ 
  children, 
  currentIndex, 
  onIndexChange, 
  className = "" 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return;
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !isMobile) return;
    
    const newCurrentX = e.touches[0].clientX;
    setCurrentX(newCurrentX);
    
    const deltaX = newCurrentX - startX;
    setTranslateX(deltaX);
  };

  const handleTouchEnd = () => {
    if (!isDragging || !isMobile) return;
    
    setIsDragging(false);
    const deltaX = currentX - startX;
    const threshold = 50; // Minimum swipe distance
    
    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0 && currentIndex > 0) {
        // Swipe right - previous
        onIndexChange(currentIndex - 1);
      } else if (deltaX < 0 && currentIndex < children.length - 1) {
        // Swipe left - next
        onIndexChange(currentIndex + 1);
      }
    }
    
    setTranslateX(0);
  };

  // Mouse events for desktop testing
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMobile) return;
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || isMobile) return;
    
    const newCurrentX = e.clientX;
    setCurrentX(newCurrentX);
    
    const deltaX = newCurrentX - startX;
    setTranslateX(deltaX);
  };

  const handleMouseUp = () => {
    if (!isDragging || isMobile) return;
    
    setIsDragging(false);
    const deltaX = currentX - startX;
    const threshold = 50;
    
    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0 && currentIndex > 0) {
        onIndexChange(currentIndex - 1);
      } else if (deltaX < 0 && currentIndex < children.length - 1) {
        onIndexChange(currentIndex + 1);
      }
    }
    
    setTranslateX(0);
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        ref={containerRef}
        className="flex transition-transform duration-300 ease-out"
        style={{
          transform: `translateX(calc(-${currentIndex * 100}% + ${translateX}px))`,
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {children.map((child, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full"
          >
            {child}
          </div>
        ))}
      </div>
      
      {/* Dots indicator */}
      {children.length > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {children.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-white' 
                  : 'bg-white/40'
              }`}
              onClick={() => onIndexChange(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SwipeNavigation;
