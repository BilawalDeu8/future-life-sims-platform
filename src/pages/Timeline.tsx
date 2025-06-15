
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Play, Pause, RotateCcw, Bookmark, Share2, ZoomIn, ZoomOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import YearNode from "@/components/timeline/YearNode";
import LifeDecisionModal from "@/components/timeline/LifeDecisionModal";
import TimelineControls from "@/components/timeline/TimelineControls";

interface TimelineYear {
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
}

const Timeline = () => {
  const navigate = useNavigate();
  const timelineRef = useRef<HTMLDivElement>(null);
  const [currentYear, setCurrentYear] = useState(2024);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showDecisionModal, setShowDecisionModal] = useState(false);
  const [currentDecision, setCurrentDecision] = useState<any>(null);
  const [bookmarkedYears, setBookmarkedYears] = useState<number[]>([]);

  // Generate timeline data for 25 years
  const generateTimelineData = (): TimelineYear[] => {
    const startYear = 2024;
    const startAge = 22; // Assuming user starts at 22
    
    return Array.from({ length: 25 }, (_, index) => ({
      year: startYear + index,
      age: startAge + index,
      isCurrentYear: startYear + index === currentYear,
      isCompleted: startYear + index < currentYear,
      hasDecision: [2026, 2029, 2032, 2035, 2040].includes(startYear + index),
      lifeData: {
        livingSituation: index < 3 ? "Shared apartment" : index < 8 ? "1BR apartment" : "House",
        career: index < 2 ? "Junior Developer" : index < 5 ? "Software Developer" : index < 10 ? "Senior Developer" : "Tech Lead",
        relationships: index < 3 ? "Dating" : index < 7 ? "Serious relationship" : "Married",
        finances: {
          income: 65000 + (index * 8000),
          expenses: 45000 + (index * 5000),
          savings: Math.max(0, (65000 + (index * 8000) - 45000 - (index * 5000)) * index)
        },
        health: {
          stress: Math.min(100, 30 + (index * 2)),
          fitness: Math.max(50, 80 - (index * 1.5)),
          workLifeBalance: Math.max(40, 75 - (index * 1))
        },
        achievements: index === 2 ? ["First promotion"] : index === 5 ? ["Tech Lead promotion"] : [],
        challenges: index === 3 ? ["Student loan debt"] : index === 7 ? ["Career plateau"] : []
      }
    }));
  };

  const timelineData = generateTimelineData();

  const scrollToYear = (year: number) => {
    if (timelineRef.current) {
      const yearIndex = year - 2024;
      const scrollPosition = yearIndex * (200 * zoomLevel);
      timelineRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleYearClick = (year: number) => {
    setSelectedYear(year);
    setCurrentYear(year);
    scrollToYear(year);
    
    // Check if this year has a decision point
    const yearData = timelineData.find(y => y.year === year);
    if (yearData?.hasDecision) {
      setCurrentDecision({
        year,
        title: "Major Life Decision",
        description: `At age ${yearData.age}, you face an important choice that will shape your future.`,
        options: [
          { id: 1, text: "Take the promotion and relocate", impact: "Higher salary, new city" },
          { id: 2, text: "Stay in current role", impact: "Stable life, slower growth" }
        ]
      });
      setShowDecisionModal(true);
    }
  };

  const handleDecisionMade = (decisionId: number) => {
    console.log('Decision made:', decisionId);
    setShowDecisionModal(false);
    setCurrentDecision(null);
    // Here you would update the timeline based on the decision
  };

  const toggleBookmark = (year: number) => {
    setBookmarkedYears(prev => 
      prev.includes(year) ? prev.filter(y => y !== year) : [...prev, year]
    );
  };

  const autoPlay = () => {
    if (isPlaying && currentYear < 2048) {
      setTimeout(() => {
        setCurrentYear(prev => prev + 1);
        scrollToYear(currentYear + 1);
      }, 2000);
    }
  };

  useEffect(() => {
    autoPlay();
  }, [isPlaying, currentYear]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-full px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate('/simulation')}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Simulation
            </Button>
            
            <div className="text-center">
              <h1 className="text-2xl font-bold">Your Life Timeline</h1>
              <p className="text-blue-200">Year {currentYear} • Age {22 + (currentYear - 2024)}</p>
            </div>

            <TimelineControls
              isPlaying={isPlaying}
              onPlayPause={() => setIsPlaying(!isPlaying)}
              zoomLevel={zoomLevel}
              onZoomIn={() => setZoomLevel(prev => Math.min(2, prev + 0.2))}
              onZoomOut={() => setZoomLevel(prev => Math.max(0.5, prev - 0.2))}
              onReset={() => {
                setCurrentYear(2024);
                scrollToYear(2024);
              }}
            />
          </div>
        </div>
      </div>

      {/* Timeline Tracks Legend */}
      <div className="px-4 py-2 bg-black/10">
        <div className="flex justify-center space-x-8 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
            Career Progress
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-pink-500 rounded mr-2"></div>
            Relationships
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
            Financial Growth
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
            Life Events
          </div>
        </div>
      </div>

      {/* Main Timeline */}
      <div className="relative flex-1">
        <div 
          ref={timelineRef}
          className="overflow-x-auto overflow-y-hidden h-96 scrollbar-thin scrollbar-thumb-white/20"
          style={{ 
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'left center'
          }}
        >
          <div className="flex items-center h-full px-8" style={{ width: `${timelineData.length * 200}px` }}>
            {timelineData.map((yearData) => (
              <YearNode
                key={yearData.year}
                yearData={yearData}
                isSelected={selectedYear === yearData.year}
                isBookmarked={bookmarkedYears.includes(yearData.year)}
                onClick={() => handleYearClick(yearData.year)}
                onBookmark={() => toggleBookmark(yearData.year)}
              />
            ))}
          </div>
        </div>

        {/* Timeline Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
            style={{ width: `${((currentYear - 2024) / 24) * 100}%` }}
          />
        </div>
      </div>

      {/* Year Detail Panel */}
      {selectedYear && (
        <Card className="fixed bottom-8 left-8 right-8 bg-black/80 backdrop-blur-sm border-white/20 max-h-80 overflow-y-auto">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-blue-300 mb-2">Living</h3>
                <p className="text-gray-300 text-sm">
                  {timelineData.find(y => y.year === selectedYear)?.lifeData.livingSituation}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-pink-300 mb-2">Career</h3>
                <p className="text-gray-300 text-sm">
                  {timelineData.find(y => y.year === selectedYear)?.lifeData.career}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-300 mb-2">Finances</h3>
                <p className="text-gray-300 text-sm">
                  ${timelineData.find(y => y.year === selectedYear)?.lifeData.finances.income.toLocaleString()}/year
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-yellow-300 mb-2">Relationships</h3>
                <p className="text-gray-300 text-sm">
                  {timelineData.find(y => y.year === selectedYear)?.lifeData.relationships}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Decision Modal */}
      {showDecisionModal && currentDecision && (
        <LifeDecisionModal
          decision={currentDecision}
          onDecisionMade={handleDecisionMade}
          onClose={() => setShowDecisionModal(false)}
        />
      )}
    </div>
  );
};

export default Timeline;
