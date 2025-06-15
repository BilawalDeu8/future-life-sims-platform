import React, { useState, useEffect, Suspense } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Home, Building, Car, MapPin, Play, Pause, ZoomIn, ZoomOut, Users, Plane, Heart, Trophy, Gamepad2 } from "lucide-react";
import Interactive3DWorld from './Interactive3DWorld';
import LifeDecisionModal from './LifeDecisionModal';
import RelationshipSystem from './RelationshipSystem';

interface LifeStage {
  age: number;
  year: number;
  home: {
    type: 'studio' | 'apartment' | 'house' | 'mansion';
    size: [number, number, number];
    color: string;
  };
  workplace: {
    type: 'startup' | 'corporate' | 'remote' | 'enterprise';
    height: number;
    color: string;
  };
  vehicle: {
    type: 'none' | 'bike' | 'car' | 'luxury' | 'electric';
    color: string;
  };
  lifestyle: {
    gym: boolean;
    restaurants: number;
    travel: boolean;
    family: boolean;
  };
  financials: {
    income: number;
    expenses: number;
    savings: number;
    netWorth: number;
  };
  career: {
    title: string;
    level: string;
    satisfaction: number;
  };
  environment: {
    neighborhood: 'urban' | 'suburban' | 'premium' | 'luxury';
    skyColor: string;
    ambientColor: string;
  };
  location: string;
}

interface Timeline3DProps {
  careerPath: any;
  onBack: () => void;
}

const Timeline3D: React.FC<Timeline3DProps> = ({ careerPath, onBack }) => {
  const [currentAge, setCurrentAge] = useState(22);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'street' | 'city'>('city');
  const [showDecisionModal, setShowDecisionModal] = useState(false);
  const [currentDecision, setCurrentDecision] = useState<any>(null);

  // Get user's location from localStorage - Fixed to use correct location
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

  // Generate life stages based on career path and user location - Fixed location mapping
  const generateLifeStages = (): LifeStage[] => {
    const stages: LifeStage[] = [];
    const ages = [22, 25, 28, 32, 35, 40, 45, 50];
    
    // Location-specific data based on user's actual location
    const locationData = isIndianLocation ? {
      baseIncome: careerPath.id === 'tech-bangalore' ? 1200000 : // ₹12L
                  careerPath.id === 'finance-mumbai' ? 1500000 : // ₹15L
                  careerPath.id === 'startup-delhi' ? 800000 : // ₹8L
                  careerPath.id === 'consulting-pune' ? 1800000 : // ₹18L
                  careerPath.id === 'remote-anywhere' ? 2000000 : // ₹20L
                  careerPath.id === 'pharma-hyderabad' ? 1000000 : // ₹10L
                  1000000, // ₹10L default
      currency: '₹',
      cities: ['Bangalore', 'Mumbai', 'Pune', 'Hyderabad', 'Chennai', 'Delhi NCR', 'Gurgaon', 'Noida'],
      neighborhoods: ['Koramangala', 'Bandra', 'Koregaon Park', 'HITEC City', 'Anna Nagar', 'Cyber City']
    } : {
      baseIncome: careerPath.id === 'tech-startup' ? 95000 :
                  careerPath.id === 'corporate-finance' ? 120000 :
                  careerPath.id === 'creative-agency' ? 75000 : 80000,
      currency: '$',
      cities: ['San Francisco', 'New York', 'Austin', 'Seattle', 'Denver', 'Boston'],
      neighborhoods: ['SOMA', 'Manhattan', 'Downtown', 'Capitol Hill', 'LoDo', 'Back Bay']
    };
    
    ages.forEach((age, index) => {
      const yearOffset = age - 22;
      const progressFactor = index / (ages.length - 1);
      
      const currentIncome = locationData.baseIncome + (yearOffset * (isIndianLocation ? 200000 : 8000) * (1 + progressFactor));
      
      // Use appropriate cities based on user's location
      const cityIndex = Math.min(Math.floor(progressFactor * locationData.cities.length), locationData.cities.length - 1);
      const currentLocation = locationData.cities[cityIndex];
      
      stages.push({
        age,
        year: 2024 + yearOffset,
        home: {
          type: progressFactor < 0.2 ? 'studio' : 
                progressFactor < 0.5 ? 'apartment' : 
                progressFactor < 0.8 ? 'house' : 'mansion',
          size: progressFactor < 0.2 ? [2, 2, 2] : 
                progressFactor < 0.5 ? [3, 3, 3] : 
                progressFactor < 0.8 ? [4, 3, 4] : [6, 4, 6],
          color: progressFactor < 0.3 ? '#8B4513' : 
                 progressFactor < 0.6 ? '#DEB887' : '#F5DEB3'
        },
        workplace: {
          type: careerPath.id?.includes('tech') ? 'startup' :
                 careerPath.id?.includes('finance') ? 'corporate' :
                 careerPath.id?.includes('remote') ? 'remote' : 'enterprise',
          height: 2 + progressFactor * 4,
          color: careerPath.id?.includes('tech') ? '#4A90E2' :
                 careerPath.id?.includes('finance') ? '#2C3E50' : '#7B68EE'
        },
        vehicle: {
          type: progressFactor < 0.2 ? 'none' :
                progressFactor < 0.4 ? 'bike' :
                progressFactor < 0.7 ? 'car' :
                progressFactor < 0.9 ? 'luxury' : 'electric',
          color: progressFactor < 0.5 ? '#FF4444' : 
                 progressFactor < 0.8 ? '#4444FF' : '#FFD700'
        },
        lifestyle: {
          gym: progressFactor > 0.3,
          restaurants: Math.floor(progressFactor * 3) + 1,
          travel: progressFactor > 0.4,
          family: progressFactor > 0.6
        },
        financials: {
          income: currentIncome,
          expenses: Math.floor(currentIncome * 0.7),
          savings: Math.max(0, currentIncome * 0.15 * yearOffset),
          netWorth: Math.max(0, currentIncome * 0.25 * yearOffset)
        },
        career: {
          title: careerPath.career || 'Professional',
          level: progressFactor < 0.3 ? 'Junior' :
                 progressFactor < 0.6 ? 'Mid-level' :
                 progressFactor < 0.8 ? 'Senior' : 'Executive',
          satisfaction: careerPath.workLifeBalance || 70
        },
        environment: {
          neighborhood: progressFactor < 0.3 ? 'urban' :
                       progressFactor < 0.6 ? 'suburban' :
                       progressFactor < 0.8 ? 'premium' : 'luxury',
          skyColor: progressFactor < 0.5 ? '#87CEEB' : '#FFB6C1',
          ambientColor: '#FFFFFF'
        },
        location: currentLocation // Now correctly uses location-specific cities
      });
    });
    
    return stages;
  };

  const lifeStages = generateLifeStages();
  const currentStage = lifeStages.find(stage => stage.age === currentAge) || lifeStages[0];

  // Generate decisions for specific ages
  const generateDecision = (age: number) => {
    const decisions = {
      25: {
        year: 2027,
        title: "Career Crossroads",
        description: "You've been offered a senior role at a bigger company with higher pay, but it means leaving your current team where you're comfortable.",
        options: [
          {
            id: 1,
            text: "Take the promotion at the new company",
            impact: "Higher salary and faster career growth, but more pressure and longer hours",
            consequences: { career: 20, finances: 25, relationships: -10, happiness: 5 }
          },
          {
            id: 2,
            text: "Stay at current company and grow internally",
            impact: "Better work-life balance and team relationships, but slower financial growth",
            consequences: { career: 5, finances: 5, relationships: 15, happiness: 15 }
          },
          {
            id: 3,
            text: "Start your own side business",
            impact: "Potential for huge returns but high risk and significant time investment",
            consequences: { career: 30, finances: -15, relationships: -5, happiness: 20 }
          }
        ]
      },
      30: {
        year: 2032,
        title: "Life Priorities",
        description: "Your career is going well, but you're thinking about settling down. How do you want to prioritize the next phase of your life?",
        options: [
          {
            id: 1,
            text: "Focus on family and relationships",
            impact: "Start a family, buy a house, prioritize work-life balance",
            consequences: { career: -5, finances: -10, relationships: 25, happiness: 20 }
          },
          {
            id: 2,
            text: "Double down on career ambitions",
            impact: "Pursue executive roles, maximize earning potential",
            consequences: { career: 25, finances: 30, relationships: -10, happiness: 5 }
          },
          {
            id: 3,
            text: "Pursue passion projects and travel",
            impact: "Take a sabbatical, travel the world, explore creative interests",
            consequences: { career: -10, finances: -20, relationships: 10, happiness: 30 }
          }
        ]
      },
      35: {
        year: 2037,
        title: "Investment Opportunity",
        description: "A friend is starting a promising tech startup and has offered you a chance to invest or join as a co-founder.",
        options: [
          {
            id: 1,
            text: "Invest money but keep current job",
            impact: "Potential financial returns without career risk",
            consequences: { career: 0, finances: 15, relationships: 5, happiness: 5 }
          },
          {
            id: 2,
            text: "Join as co-founder and quit your job",
            impact: "High risk, high reward - could be life-changing",
            consequences: { career: 25, finances: -25, relationships: -5, happiness: 20 }
          },
          {
            id: 3,
            text: "Decline and focus on stability",
            impact: "Keep your secure job and avoid the risk",
            consequences: { career: 5, finances: 10, relationships: 10, happiness: -5 }
          }
        ]
      }
    };

    return decisions[age as keyof typeof decisions];
  };

  const handleDecisionClick = (age: number) => {
    const decision = generateDecision(age);
    if (decision) {
      setCurrentDecision(decision);
      setShowDecisionModal(true);
    }
  };

  const handleDecisionMade = (decisionId: number) => {
    console.log(`Decision made: ${decisionId} for age ${currentDecision?.year}`);
    setShowDecisionModal(false);
    setCurrentDecision(null);
    // Here you could update the life stages based on the decision
  };

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
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, lifeStages]);

  const formatCurrency = (amount: number) => {
    if (isIndianLocation) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    return `$${(amount / 1000).toFixed(0)}k`;
  };

  const handleBuildingClick = (building: any) => {
    setSelectedBuilding(building);
  };

  const handleRelationshipAction = (action: string, relationshipId: string) => {
    console.log(`Relationship action: ${action} for ${relationshipId}`);
    // Here you could implement relationship interaction logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      <div className="flex flex-col lg:flex-row h-screen">
        {/* 3D Interactive World */}
        <div className="flex-1 flex flex-col">
          <div className="relative flex-1 bg-gradient-to-b from-blue-900/30 to-purple-900/30">
            <Suspense fallback={
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
                  <p>Loading your 3D world...</p>
                </div>
              </div>
            }>
              <Interactive3DWorld
                currentAge={currentAge}
                lifeStage={currentStage}
                onBuildingClick={handleBuildingClick}
                userLocation={userLocation}
              />
            </Suspense>

            {/* Back Button - Top Left */}
            <div className="absolute top-4 left-4">
              <Button
                variant="ghost"
                onClick={onBack}
                className="text-white hover:bg-white/20 border border-white/30 bg-white/10"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Selection
              </Button>
            </div>

            {/* View Mode Indicator */}
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-green-400" />
                <span className="text-sm font-medium">{viewMode === 'city' ? 'City View' : 'Street View'}</span>
              </div>
            </div>

            {/* Controls - Top Center */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-sm px-6 py-2 rounded-lg border border-white/20">
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <h2 className="text-lg font-bold">Age {currentAge}</h2>
                  <p className="text-xs text-blue-200">{currentStage.career.level} • {formatCurrency(currentStage.financials.income)}/year</p>
                  <p className="text-xs text-green-200">{currentStage.location}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="text-white border-green-400 hover:bg-green-500/30 hover:text-white bg-green-500/20"
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setViewMode(viewMode === 'city' ? 'street' : 'city')}
                    className="text-white border-blue-400 hover:bg-blue-500/30 hover:text-white bg-blue-500/20"
                  >
                    <Gamepad2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Decision Trigger Button */}
            {[25, 30, 35].includes(currentAge) && (
              <div className="absolute bottom-20 right-4">
                <Button
                  onClick={() => handleDecisionClick(currentAge)}
                  className="bg-purple-600 hover:bg-purple-700 text-white animate-bounce"
                >
                  Big Decision Available!
                </Button>
              </div>
            )}
          </div>

          {/* Timeline Scrubber */}
          <div className="px-8 py-6 bg-black/20">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Life Timeline (Age {currentAge} • {currentStage.year})
              </label>
              <Slider
                value={[currentAge]}
                onValueChange={([value]) => setCurrentAge(value)}
                min={22}
                max={50}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                {lifeStages.map(stage => (
                  <div key={stage.age} className="text-center">
                    <div>{stage.age}</div>
                    <div className="text-[10px] text-green-300">{stage.location}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Relationship Panel */}
        <div className="lg:w-1/3 p-4 bg-black/10 border-l border-white/10 overflow-y-auto max-h-screen">
          <RelationshipSystem
            currentAge={currentAge}
            careerPath={careerPath}
            userLocation={userLocation}
            onRelationshipAction={handleRelationshipAction}
          />
        </div>
      </div>

      {/* Building Detail Panel */}
      {selectedBuilding && (
        <Card className="fixed bottom-8 right-8 w-80 bg-black/80 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-white capitalize">{selectedBuilding.type}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedBuilding(null)}
                className="text-white hover:bg-white/20"
              >
                ×
              </Button>
            </div>
            
            {selectedBuilding.type === 'home' && (
              <div className="space-y-2 text-sm text-gray-300">
                <p><strong>Type:</strong> {currentStage.home.type.toUpperCase()}</p>
                <p><strong>Neighborhood:</strong> {currentStage.environment.neighborhood}</p>
                <p><strong>Location:</strong> {currentStage.location}</p>
              </div>
            )}
            
            {selectedBuilding.type === 'workplace' && (
              <div className="space-y-2 text-sm text-gray-300">
                <p><strong>Position:</strong> {currentStage.career.level}</p>
                <p><strong>Company:</strong> {currentStage.workplace.type.toUpperCase()}</p>
                <p><strong>Salary:</strong> {formatCurrency(currentStage.financials.income)}/year</p>
              </div>
            )}
            
            {(selectedBuilding.type === 'gym' || selectedBuilding.type === 'travel') && (
              <div className="space-y-2 text-sm text-gray-300">
                <p><strong>Facility:</strong> {selectedBuilding.data.name}</p>
                <p><strong>Available:</strong> {currentStage.lifestyle[selectedBuilding.type as keyof typeof currentStage.lifestyle] ? 'Yes' : 'No'}</p>
              </div>
            )}
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

export default Timeline3D;
