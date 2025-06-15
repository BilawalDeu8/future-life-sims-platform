import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Play, Pause, RotateCcw, Bookmark, Share2, ZoomIn, ZoomOut, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";
import YearNode from "@/components/timeline/YearNode";
import LifeDecisionModal from "@/components/timeline/LifeDecisionModal";
import TimelineControls from "@/components/timeline/TimelineControls";
import RealWorldDataDisplay from "@/components/data/RealWorldDataDisplay";
import PersonalizationWidget from "@/components/personalization/PersonalizationWidget";
import CareerSelector from "@/components/timeline/CareerSelector";
import { usePersonalization } from "@/hooks/usePersonalization";
import { useRealWorldData } from "@/hooks/useRealWorldData";

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
  const [showPersonalization, setShowPersonalization] = useState(false);
  const [showCareerSelector, setShowCareerSelector] = useState(false);
  const [selectedCareerPath, setSelectedCareerPath] = useState<any>(null);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);

  // Initialize personalization and real-world data hooks
  const userId = "demo-user"; // In real app, get from auth
  const { profile, updateProfile, trackEngagement } = usePersonalization(userId);
  const { salaryData, costOfLivingData, jobMarketData, isLoading, fetchScenarioData } = useRealWorldData();

  // Generate personalized timeline data
  const generatePersonalizedTimelineData = (): TimelineYear[] => {
    const startYear = 2024;
    const startAge = 22;
    
    // Use personalization data to influence timeline
    const careerWeight = profile?.salaryWeight || 30;
    const workLifeWeight = profile?.workLifeBalanceWeight || 50;
    
    return Array.from({ length: 25 }, (_, index) => {
      const year = startYear + index;
      const baseSalary = 65000 + (index * (careerWeight > 50 ? 12000 : 8000));
      
      return {
        year,
        age: startAge + index,
        isCurrentYear: year === currentYear,
        isCompleted: year < currentYear,
        hasDecision: [2026, 2029, 2032, 2035, 2040].includes(year),
        lifeData: {
          livingSituation: index < 3 ? "Shared apartment" : index < 8 ? "1BR apartment" : "House",
          career: index < 2 ? "Junior Developer" : index < 5 ? "Software Developer" : index < 10 ? "Senior Developer" : "Tech Lead",
          relationships: index < 3 ? "Dating" : index < 7 ? "Serious relationship" : "Married",
          finances: {
            income: baseSalary,
            expenses: Math.floor(baseSalary * 0.7),
            savings: Math.max(0, baseSalary * 0.15 * index)
          },
          health: {
            stress: Math.min(100, 30 + (index * (workLifeWeight > 70 ? 1 : 2))),
            fitness: Math.max(50, 80 - (index * 1.5)),
            workLifeBalance: Math.max(40, workLifeWeight - (index * 1))
          },
          achievements: index === 2 ? ["First promotion"] : index === 5 ? ["Tech Lead promotion"] : [],
          challenges: index === 3 ? ["Student loan debt"] : index === 7 ? ["Career plateau"] : []
        }
      };
    });
  };

  const timelineData = generatePersonalizedTimelineData();

  // Load real-world data on component mount
  useEffect(() => {
    const occupation = selectedCareerPath?.title || "Software Developer";
    const location = selectedCompany?.locations[0] || "San Francisco, CA";
    fetchScenarioData(occupation, location);
    if (profile) {
      trackEngagement("timeline_view");
    }
  }, [profile, selectedCareerPath, selectedCompany]);

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
          { 
            id: 1, 
            text: "Take the promotion and relocate", 
            impact: "Higher salary, new city",
            consequences: { career: 15, finances: 20, relationships: -10, happiness: 5 }
          },
          { 
            id: 2, 
            text: "Stay in current role", 
            impact: "Stable life, slower growth",
            consequences: { career: -5, finances: 0, relationships: 10, happiness: 10 }
          }
        ]
      });
      setShowDecisionModal(true);
    }
    
    if (profile) {
      trackEngagement("year_click", 1);
    }
  };

  const handleDecisionMade = (decisionId: number) => {
    console.log('Decision made:', decisionId);
    setShowDecisionModal(false);
    setCurrentDecision(null);
    if (profile) {
      trackEngagement("decision_made", 5);
    }
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

  const handleCareerSelection = (career: any, company?: any) => {
    setSelectedCareerPath(career);
    setSelectedCompany(company);
    setShowCareerSelector(false);
    
    // Fetch real-world data for the selected career and company
    const location = company?.locations[0] || "San Francisco, CA";
    fetchScenarioData(career.title, location);
    
    if (profile) {
      trackEngagement("career_selected", 3);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-full px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate('/simulation')}
              className="text-white hover:bg-white/20 border border-white/30 bg-white/10"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Simulation
            </Button>
            
            <div className="text-center">
              <h1 className="text-2xl font-bold">Your Personalized Timeline</h1>
              <p className="text-blue-200">Year {currentYear} • Age {22 + (currentYear - 2024)}</p>
              {selectedCareerPath && (
                <p className="text-sm text-purple-200">
                  {selectedCareerPath.title} {selectedCompany && `at ${selectedCompany.name}`}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCareerSelector(true)}
                className="text-white border-blue-400 hover:bg-blue-500/30 hover:text-white bg-blue-500/20"
              >
                <Briefcase className="h-4 w-4 mr-2" />
                Career
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPersonalization(!showPersonalization)}
                className="text-white border-purple-400 hover:bg-purple-500/30 hover:text-white bg-purple-500/20"
              >
                Personalize
              </Button>
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
      </div>

      {/* Personalization Panel */}
      {showPersonalization && (
        <div className="fixed top-20 right-4 z-30 w-80">
          <PersonalizationWidget
            profile={profile}
            onUpdateProfile={updateProfile}
            onClose={() => setShowPersonalization(false)}
          />
        </div>
      )}

      {/* Career Selector Modal */}
      {showCareerSelector && (
        <CareerSelector
          onSelectCareer={handleCareerSelection}
          onClose={() => setShowCareerSelector(false)}
        />
      )}

      {/* Real-World Data Display */}
      <div className="px-4 py-6">
        <RealWorldDataDisplay
          salaryData={salaryData}
          costOfLivingData={costOfLivingData}
          jobMarketData={jobMarketData}
          isLoading={isLoading}
        />
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

      {/* Visual Map-like Timeline */}
      <div className="relative flex-1 bg-gradient-to-b from-green-100/10 to-blue-100/10 min-h-96">
        {/* Sky and horizon background */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-400/20 via-sky-300/10 to-green-200/20"></div>
        
        {/* Grid lines for map feel */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>

        <div 
          ref={timelineRef}
          className="overflow-x-auto overflow-y-hidden h-96 scrollbar-thin scrollbar-thumb-white/20 relative"
          style={{ 
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'left center'
          }}
        >
          <div className="flex items-end h-full px-8 relative" style={{ width: `${timelineData.length * 200}px` }}>
            {/* Road/Path */}
            <div className="absolute bottom-8 left-0 right-0 h-4 bg-gray-600/50 rounded-full shadow-lg">
              <div className="h-full bg-gradient-to-r from-yellow-400/30 via-orange-400/30 to-red-400/30 rounded-full"></div>
              {/* Road markings */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/50 transform -translate-y-1/2"
                   style={{
                     backgroundImage: 'repeating-linear-gradient(to right, white 0, white 20px, transparent 20px, transparent 40px)',
                   }}></div>
            </div>

            {timelineData.map((yearData, index) => (
              <VisualYearNode
                key={yearData.year}
                yearData={yearData}
                isSelected={selectedYear === yearData.year}
                isBookmarked={bookmarkedYears.includes(yearData.year)}
                onClick={() => handleYearClick(yearData.year)}
                onBookmark={() => toggleBookmark(yearData.year)}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Timeline Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-white/10">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
            style={{ width: `${((currentYear - 2024) / 24) * 100}%` }}
          />
        </div>
      </div>

      {/* Year Detail Panel */}
      {selectedYear && (
        <Card className="fixed bottom-8 left-8 right-8 bg-black/80 backdrop-blur-sm border-white/20 max-h-80 overflow-y-auto z-10">
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

      {/* Decision Modal - Fixed positioning and z-index */}
      {showDecisionModal && currentDecision && (
        <div className="fixed inset-0 z-50">
          <LifeDecisionModal
            decision={currentDecision}
            onDecisionMade={handleDecisionMade}
            onClose={() => setShowDecisionModal(false)}
          />
        </div>
      )}
    </div>
  );
};

export default Timeline;
