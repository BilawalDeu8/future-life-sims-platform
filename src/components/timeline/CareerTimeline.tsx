
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, MapPin, Building, Users, Trophy, AlertTriangle, Heart } from "lucide-react";
import YearNode from "./YearNode";
import LifeDecisionModal from "./LifeDecisionModal";
import TimelineControls from "./TimelineControls";
import CareerMilestoneModal from "./CareerMilestoneModal";

interface LifeScenario {
  id: string;
  title: string;
  career: string;
  location: string;
  salaryRange: string;
  workLifeBalance: number;
  stressLevel: number;
  lifestyle: string;
  image: string;
  description: string;
  livingSpace: string;
  socialLife: string;
}

interface CareerTimelineProps {
  scenario: LifeScenario;
  onBack: () => void;
}

interface TimelineYear {
  year: number;
  age: number;
  isCurrentYear: boolean;
  isCompleted: boolean;
  hasDecision: boolean;
  hasMilestone: boolean;
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
    location: string;
    lifestyle: string;
  };
}

const CareerTimeline: React.FC<CareerTimelineProps> = ({ scenario, onBack }) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [currentYear, setCurrentYear] = useState(2024);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showDecisionModal, setShowDecisionModal] = useState(false);
  const [showMilestoneModal, setShowMilestoneModal] = useState(false);
  const [currentDecision, setCurrentDecision] = useState<any>(null);
  const [currentMilestone, setCurrentMilestone] = useState<any>(null);
  const [bookmarkedYears, setBookmarkedYears] = useState<number[]>([]);
  const [userChoices, setUserChoices] = useState<Record<number, number>>({});

  const generateCareerSpecificData = (): TimelineYear[] => {
    const careerPaths = {
      'tech-startup': {
        baseSalary: 95000,
        salaryGrowth: 12000,
        locations: ['San Francisco', 'Austin', 'Seattle', 'NYC'],
        careers: ['Junior Dev', 'Software Engineer', 'Senior Engineer', 'Tech Lead', 'Engineering Manager', 'VP Engineering'],
        decisions: [
          { year: 2026, title: 'Startup Acquisition Offer', description: 'Your startup got acquired! Join the acquiring company or start fresh?' },
          { year: 2028, title: 'Senior Role vs Startup CTO', description: 'Take a senior role at Google or become CTO of a new startup?' },
          { year: 2031, title: 'Remote vs Office Leadership', description: 'Lead a distributed team or relocate for in-person leadership?' },
          { year: 2034, title: 'IPO Opportunity', description: 'Your company is going public. Cash out or stay for the ride?' }
        ],
        milestones: [
          { year: 2025, title: 'First Major Launch', description: 'Your code powers a feature used by millions!' },
          { year: 2027, title: 'Open Source Fame', description: 'Your project gets 10k GitHub stars!' },
          { year: 2030, title: 'Industry Speaker', description: 'Keynote at major tech conference!' },
          { year: 2033, title: 'Mentor Recognition', description: 'Featured as top engineering mentor!' }
        ]
      },
      'creative-agency': {
        baseSalary: 75000,
        salaryGrowth: 8000,
        locations: ['Austin', 'Portland', 'Nashville', 'Denver'],
        careers: ['Junior Designer', 'Creative Specialist', 'Art Director', 'Creative Director', 'Agency Partner', 'Studio Owner'],
        decisions: [
          { year: 2026, title: 'Freelance vs Agency Growth', description: 'Go freelance with flexibility or climb the agency ladder?' },
          { year: 2029, title: 'Brand Partnership', description: 'Exclusive partnership with major brand or maintain creative freedom?' },
          { year: 2032, title: 'Studio Launch', description: 'Start your own creative studio or become agency partner?' },
          { year: 2035, title: 'Teaching Opportunity', description: 'Professor position at art school or focus on commercial work?' }
        ],
        milestones: [
          { year: 2025, title: 'Award-Winning Campaign', description: 'Your campaign wins a prestigious advertising award!' },
          { year: 2028, title: 'Gallery Exhibition', description: 'Your personal art featured in major gallery!' },
          { year: 2031, title: 'Creative Leadership', description: 'Lead rebranding of Fortune 500 company!' },
          { year: 2034, title: 'Industry Recognition', description: 'Named Creative Director of the Year!' }
        ]
      },
      // Add more career paths...
    };

    const careerData = careerPaths[scenario.id as keyof typeof careerPaths] || careerPaths['tech-startup'];
    
    return Array.from({ length: 25 }, (_, index) => {
      const year = 2024 + index;
      const age = 22 + index;
      const careerStage = Math.floor(index / 4);
      const location = careerData.locations[Math.min(careerStage, careerData.locations.length - 1)];
      
      return {
        year,
        age,
        isCurrentYear: year === currentYear,
        isCompleted: year < currentYear,
        hasDecision: careerData.decisions.some(d => d.year === year),
        hasMilestone: careerData.milestones.some(m => m.year === year),
        lifeData: {
          livingSituation: index < 3 ? "Studio apartment" : index < 8 ? "1BR apartment" : index < 15 ? "2BR apartment" : "House",
          career: careerData.careers[Math.min(careerStage, careerData.careers.length - 1)],
          relationships: index < 3 ? "Dating" : index < 7 ? "Serious relationship" : index < 12 ? "Engaged" : "Married",
          finances: {
            income: careerData.baseSalary + (index * careerData.salaryGrowth),
            expenses: Math.floor((careerData.baseSalary + (index * careerData.salaryGrowth)) * 0.7),
            savings: Math.max(0, (careerData.baseSalary + (index * careerData.salaryGrowth)) * 0.15 * index)
          },
          health: {
            stress: Math.min(100, scenario.stressLevel + (index * 2)),
            fitness: Math.max(50, 85 - (index * 1.5)),
            workLifeBalance: Math.max(40, scenario.workLifeBalance - (index * 1))
          },
          achievements: careerData.milestones.filter(m => m.year === year).map(m => m.title),
          challenges: index === 3 ? ["Industry downturn"] : index === 8 ? ["Burnout phase"] : [],
          location,
          lifestyle: scenario.lifestyle
        }
      };
    });
  };

  const timelineData = generateCareerSpecificData();

  const handleYearClick = (year: number) => {
    setSelectedYear(year);
    setCurrentYear(year);
    scrollToYear(year);
    
    const yearData = timelineData.find(y => y.year === year);
    
    // Check for milestones first
    if (yearData?.hasMilestone) {
      const careerPaths = {
        'tech-startup': {
          milestones: [
            { year: 2025, title: 'First Major Launch', description: 'Your code powers a feature used by millions!', impact: 'Career boost, industry recognition' },
            { year: 2027, title: 'Open Source Fame', description: 'Your project gets 10k GitHub stars!', impact: 'Personal brand growth, job opportunities' },
            { year: 2030, title: 'Industry Speaker', description: 'Keynote at major tech conference!', impact: 'Thought leadership, networking expansion' },
            { year: 2033, title: 'Mentor Recognition', description: 'Featured as top engineering mentor!', impact: 'Legacy building, leadership opportunities' }
          ]
        }
      };

      const milestones = careerPaths[scenario.id as keyof typeof careerPaths]?.milestones || [];
      const milestone = milestones.find(m => m.year === year);
      
      if (milestone) {
        setCurrentMilestone(milestone);
        setShowMilestoneModal(true);
        return;
      }
    }
    
    // Check for decisions
    if (yearData?.hasDecision) {
      const careerPaths = {
        'tech-startup': {
          decisions: [
            { 
              year: 2026, 
              title: 'Startup Acquisition Offer', 
              description: 'Your startup got acquired by Google! You have options for your next move.',
              options: [
                { id: 1, text: 'Join Google as Senior Engineer', impact: 'Stable income, big tech experience, less equity upside' },
                { id: 2, text: 'Start a new startup with acquisition money', impact: 'High risk/reward, entrepreneurial freedom, uncertain income' },
                { id: 3, text: 'Take a sabbatical and travel', impact: 'Life experience, reset, delayed career progression' }
              ]
            }
          ]
        }
      };

      const decisions = careerPaths[scenario.id as keyof typeof careerPaths]?.decisions || [];
      const decision = decisions.find(d => d.year === year);
      
      if (decision) {
        setCurrentDecision(decision);
        setShowDecisionModal(true);
      }
    }
  };

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

  const handleDecisionMade = (decisionId: number) => {
    if (currentDecision) {
      setUserChoices(prev => ({ ...prev, [currentDecision.year]: decisionId }));
      console.log(`Decision made for ${currentDecision.year}:`, decisionId);
    }
    setShowDecisionModal(false);
    setCurrentDecision(null);
  };

  const toggleBookmark = (year: number) => {
    setBookmarkedYears(prev => 
      prev.includes(year) ? prev.filter(y => y !== year) : [...prev, year]
    );
  };

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && currentYear < 2048) {
      const timer = setTimeout(() => {
        setCurrentYear(prev => prev + 1);
        scrollToYear(currentYear + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isPlaying, currentYear]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-full px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to {scenario.title}
            </Button>
            
            <div className="text-center">
              <h1 className="text-2xl font-bold">{scenario.title} Journey</h1>
              <p className="text-blue-200">Year {currentYear} • Age {22 + (currentYear - 2024)}</p>
              <p className="text-sm text-purple-200">{scenario.career} • {scenario.location}</p>
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

      {/* Career-Specific Legend */}
      <div className="px-4 py-2 bg-black/10">
        <div className="flex justify-center space-x-8 text-sm">
          <div className="flex items-center">
            <Building className="w-4 h-4 text-blue-400 mr-2" />
            Career Progression
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 text-green-400 mr-2" />
            Location Changes
          </div>
          <div className="flex items-center">
            <Trophy className="w-4 h-4 text-yellow-400 mr-2" />
            Major Milestones
          </div>
          <div className="flex items-center">
            <AlertTriangle className="w-4 h-4 text-red-400 mr-2" />
            Key Decisions
          </div>
          <div className="flex items-center">
            <Heart className="w-4 h-4 text-pink-400 mr-2" />
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

      {/* Enhanced Year Detail Panel */}
      {selectedYear && (
        <Card className="fixed bottom-8 left-8 right-8 bg-black/80 backdrop-blur-sm border-white/20 max-h-80 overflow-y-auto">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-blue-300 mb-2 flex items-center">
                  <Building className="h-4 w-4 mr-2" />
                  Career
                </h3>
                <p className="text-white font-medium">
                  {timelineData.find(y => y.year === selectedYear)?.lifeData.career}
                </p>
                <p className="text-gray-300 text-sm">
                  ${timelineData.find(y => y.year === selectedYear)?.lifeData.finances.income.toLocaleString()}/year
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-300 mb-2 flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Location
                </h3>
                <p className="text-white font-medium">
                  {timelineData.find(y => y.year === selectedYear)?.lifeData.location}
                </p>
                <p className="text-gray-300 text-sm">
                  {timelineData.find(y => y.year === selectedYear)?.lifeData.livingSituation}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-pink-300 mb-2 flex items-center">
                  <Heart className="h-4 w-4 mr-2" />
                  Personal Life
                </h3>
                <p className="text-white font-medium">
                  {timelineData.find(y => y.year === selectedYear)?.lifeData.relationships}
                </p>
                <p className="text-gray-300 text-sm">
                  {timelineData.find(y => y.year === selectedYear)?.lifeData.lifestyle}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-yellow-300 mb-2 flex items-center">
                  <Trophy className="h-4 w-4 mr-2" />
                  Achievements
                </h3>
                <p className="text-white font-medium">
                  {timelineData.find(y => y.year === selectedYear)?.lifeData.achievements.join(', ') || 'Steady progress'}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-300 mb-2">Finances</h3>
                <p className="text-white font-medium">
                  ${timelineData.find(y => y.year === selectedYear)?.lifeData.finances.savings.toLocaleString()} saved
                </p>
                <p className="text-gray-300 text-sm">
                  ${timelineData.find(y => y.year === selectedYear)?.lifeData.finances.expenses.toLocaleString()}/year expenses
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

      {/* Milestone Modal */}
      {showMilestoneModal && currentMilestone && (
        <CareerMilestoneModal
          milestone={currentMilestone}
          onClose={() => setShowMilestoneModal(false)}
        />
      )}
    </div>
  );
};

export default CareerTimeline;
