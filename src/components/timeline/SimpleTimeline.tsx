
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Play, Pause, Home, Briefcase, Heart, DollarSign, MapPin, Trophy, AlertCircle } from "lucide-react";
import LifeDecisionModal from './LifeDecisionModal';

interface TimelineProps {
  careerPath: any;
  onBack: () => void;
}

interface LifeStage {
  age: number;
  year: number;
  title: string;
  career: string;
  income: number;
  location: string;
  housing: string;
  relationship: string;
  savings: number;
  achievements: string[];
  challenges: string[];
  hasDecision: boolean;
  milestone?: string;
}

const SimpleTimeline: React.FC<TimelineProps> = ({ careerPath, onBack }) => {
  const [currentAge, setCurrentAge] = useState(22);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDecisionModal, setShowDecisionModal] = useState(false);
  const [currentDecision, setCurrentDecision] = useState<any>(null);

  // Get user's location
  const getUserLocation = () => {
    const onboardingData = localStorage.getItem('onboardingData');
    if (onboardingData) {
      const data = JSON.parse(onboardingData);
      return data.personalFoundation?.location || 'Bangalore, India';
    }
    return 'Bangalore, India';
  };

  const userLocation = getUserLocation();
  const isIndianLocation = userLocation.toLowerCase().includes('india');

  // Generate life stages
  const generateLifeStages = (): LifeStage[] => {
    const stages: LifeStage[] = [];
    const ages = [22, 25, 28, 32, 35, 40, 45, 50];
    
    const baseIncome = isIndianLocation ? 1200000 : 80000; // ₹12L or $80k
    const currency = isIndianLocation ? '₹' : '$';
    const cities = isIndianLocation 
      ? ['Bangalore', 'Mumbai', 'Pune', 'Hyderabad', 'Delhi NCR'] 
      : ['San Francisco', 'New York', 'Austin', 'Seattle', 'Boston'];
    
    ages.forEach((age, index) => {
      const yearOffset = age - 22;
      const progressFactor = index / (ages.length - 1);
      const currentIncome = baseIncome + (yearOffset * (isIndianLocation ? 200000 : 12000));
      
      stages.push({
        age,
        year: 2024 + yearOffset,
        title: progressFactor < 0.3 ? 'Starting Career' :
               progressFactor < 0.6 ? 'Building Experience' :
               progressFactor < 0.8 ? 'Senior Professional' : 'Leadership Role',
        career: progressFactor < 0.3 ? 'Junior Developer' :
                progressFactor < 0.6 ? 'Mid-level Developer' :
                progressFactor < 0.8 ? 'Senior Developer' : 'Tech Lead',
        income: currentIncome,
        location: cities[Math.min(Math.floor(progressFactor * cities.length), cities.length - 1)],
        housing: progressFactor < 0.3 ? 'Studio Apartment' :
                 progressFactor < 0.6 ? '1BHK Apartment' :
                 progressFactor < 0.8 ? '2BHK House' : '3BHK Villa',
        relationship: progressFactor < 0.4 ? 'Single' :
                      progressFactor < 0.7 ? 'In Relationship' : 'Married',
        savings: Math.floor(currentIncome * 0.15 * yearOffset),
        achievements: progressFactor > 0.3 ? ['First promotion'] : [],
        challenges: progressFactor < 0.3 ? ['Learning curve'] : [],
        hasDecision: [25, 30, 35].includes(age),
        milestone: progressFactor === 0.5 ? 'First major promotion' : undefined
      });
    });
    
    return stages;
  };

  const lifeStages = generateLifeStages();
  const currentStage = lifeStages.find(stage => stage.age === currentAge) || lifeStages[0];

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentAge(prev => {
          const currentIndex = lifeStages.findIndex(stage => stage.age === prev);
          if (currentIndex < lifeStages.length - 1) {
            return lifeStages[currentIndex + 1].age;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [isPlaying, lifeStages]);

  const formatCurrency = (amount: number) => {
    if (isIndianLocation) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    return `$${(amount / 1000).toFixed(0)}k`;
  };

  const handleDecisionClick = (age: number) => {
    const decisions = {
      25: {
        year: 2027,
        title: "Career Crossroads",
        description: "You've been offered a senior role at a bigger company with higher pay, but it means leaving your current team.",
        options: [
          {
            id: 1,
            text: "Take the promotion",
            impact: "Higher salary but more pressure",
            consequences: { career: 20, finances: 25, relationships: -10, happiness: 5 }
          },
          {
            id: 2,
            text: "Stay and grow internally", 
            impact: "Better work-life balance",
            consequences: { career: 5, finances: 5, relationships: 15, happiness: 15 }
          }
        ]
      }
    };

    const decision = decisions[age as keyof typeof decisions];
    if (decision) {
      setCurrentDecision(decision);
      setShowDecisionModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Button
          variant="outline"
          onClick={onBack}
          className="text-white border-white/50 hover:bg-white/20 hover:text-white bg-black/30 backdrop-blur-sm"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Career Selection
        </Button>
        
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Your Life Timeline
        </h1>
        
        <Button
          variant="outline"
          onClick={() => setIsPlaying(!isPlaying)}
          className="text-white border-green-400/70 hover:bg-green-500/30 hover:text-white bg-green-600/20 backdrop-blur-sm"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {isPlaying ? 'Pause' : 'Play'}
        </Button>
      </div>

      {/* Current Stage Highlight */}
      <Card className="mb-8 bg-gradient-to-r from-blue-600/30 to-purple-600/30 border-blue-400/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold text-white">Age {currentStage.age}</h2>
              <p className="text-blue-200 text-lg">{currentStage.title}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-300">{formatCurrency(currentStage.income)}</p>
              <p className="text-gray-200">per year</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <Briefcase className="h-5 w-5 text-blue-300" />
              <div>
                <p className="text-sm text-gray-200">Career</p>
                <p className="text-white font-medium">{currentStage.career}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Home className="h-5 w-5 text-orange-300" />
              <div>
                <p className="text-sm text-gray-200">Housing</p>
                <p className="text-white font-medium">{currentStage.housing}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-pink-300" />
              <div>
                <p className="text-sm text-gray-200">Relationship</p>
                <p className="text-white font-medium">{currentStage.relationship}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-green-300" />
              <div>
                <p className="text-sm text-gray-200">Location</p>
                <p className="text-white font-medium">{currentStage.location}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline Visualization */}
      <Card className="mb-6 bg-black/30 border-white/20 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
            
            {/* Timeline Nodes */}
            <div className="flex justify-between relative">
              {lifeStages.map((stage, index) => (
                <div
                  key={stage.age}
                  className={`relative cursor-pointer transition-all duration-300 ${
                    stage.age === currentAge ? 'scale-125 z-10' : 'hover:scale-110'
                  }`}
                  onClick={() => setCurrentAge(stage.age)}
                >
                  {/* Decision Indicator */}
                  {stage.hasDecision && (
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDecisionClick(stage.age);
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white text-xs animate-pulse"
                      >
                        Decision!
                      </Button>
                    </div>
                  )}
                  
                  {/* Milestone Indicator */}
                  {stage.milestone && (
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <Trophy className="h-5 w-5 text-yellow-400" />
                    </div>
                  )}
                  
                  {/* Node Circle */}
                  <div className={`
                    w-16 h-16 rounded-full border-4 flex items-center justify-center text-center relative
                    ${stage.age === currentAge 
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500 border-white ring-4 ring-white/50' 
                      : stage.age < currentAge
                      ? 'bg-gradient-to-br from-blue-500 to-purple-500 border-blue-300' 
                      : 'bg-gray-700 border-gray-400'
                    }
                  `}>
                    <div className="text-sm font-bold text-white">{stage.age}</div>
                  </div>
                  
                  {/* Year Label */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                    <div className="text-sm font-medium text-white">{stage.year}</div>
                    <div className="text-xs text-gray-300">{stage.career.split(' ')[0]}</div>
                  </div>
                  
                  {/* Progress Bars */}
                  <div className="absolute top-20 left-1/2 transform -translate-x-1/2 space-y-1">
                    {/* Career Progress */}
                    <div className="w-3 bg-blue-500 rounded opacity-70" style={{ height: `${20 + index * 8}px` }}></div>
                    {/* Financial Progress */}
                    <div className="w-3 bg-green-500 rounded opacity-70" style={{ height: `${10 + index * 6}px` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline Scrubber */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-gray-200">Navigate Timeline</span>
          <span className="text-sm text-blue-200">{currentStage.year} • {currentStage.location}</span>
        </div>
        <Slider
          value={[currentAge]}
          onValueChange={([value]) => setCurrentAge(value)}
          min={22}
          max={50}
          step={1}
          className="w-full"
        />
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-green-600/30 border-green-400/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-300" />
              <div>
                <p className="text-sm text-green-100">Annual Income</p>
                <p className="text-xl font-bold text-white">{formatCurrency(currentStage.income)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-blue-600/30 border-blue-400/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-blue-300" />
              <div>
                <p className="text-sm text-blue-100">Total Savings</p>
                <p className="text-xl font-bold text-white">{formatCurrency(currentStage.savings)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-600/30 border-purple-400/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Briefcase className="h-5 w-5 text-purple-300" />
              <div>
                <p className="text-sm text-purple-100">Career Level</p>
                <p className="text-xl font-bold text-white">{currentStage.career}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Decision Modal */}
      {showDecisionModal && currentDecision && (
        <LifeDecisionModal
          decision={currentDecision}
          onDecisionMade={(decisionId) => {
            console.log(`Decision made: ${decisionId}`);
            setShowDecisionModal(false);
            setCurrentDecision(null);
          }}
          onClose={() => setShowDecisionModal(false)}
        />
      )}
    </div>
  );
};

export default SimpleTimeline;
