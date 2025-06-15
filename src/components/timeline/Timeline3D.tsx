
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Home, Building, Car, MapPin, Play, Pause, ZoomIn, ZoomOut, Users, Plane, Heart, Trophy } from "lucide-react";

interface LifeStage {
  age: number;
  year: number;
  home: {
    type: 'studio' | 'apartment' | 'house' | 'mansion';
    size: number;
    position: [number, number, number];
    color: string;
  };
  workplace: {
    type: 'startup' | 'corporate' | 'remote' | 'enterprise';
    position: [number, number, number];
    height: number;
    color: string;
  };
  vehicle: {
    type: 'none' | 'bike' | 'car' | 'luxury' | 'electric';
    position: [number, number, number];
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
  const [cameraZoom, setCameraZoom] = useState(1);
  const [selectedStage, setSelectedStage] = useState<LifeStage | null>(null);

  // Get user's location from localStorage
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

  // Generate life stages based on career path and user location
  const generateLifeStages = (): LifeStage[] => {
    const stages: LifeStage[] = [];
    const ages = [22, 25, 28, 32, 35, 40, 45, 50];
    
    // Location-specific data
    const locationData = isIndianLocation ? {
      baseIncome: careerPath.id === 'tech-bangalore' ? 1200000 : // ₹12L
                  careerPath.id === 'finance-mumbai' ? 1500000 : // ₹15L
                  careerPath.id === 'startup-delhi' ? 800000 : // ₹8L
                  careerPath.id === 'consulting-pune' ? 1800000 : // ₹18L
                  careerPath.id === 'remote-anywhere' ? 2000000 : // ₹20L
                  1000000, // ₹10L default
      currency: '₹',
      cities: ['Bangalore', 'Mumbai', 'Delhi NCR', 'Pune', 'Hyderabad', 'Chennai'],
      neighborhoods: ['Koramangala', 'Bandra', 'Gurgaon', 'Koregaon Park', 'HITEC City', 'Anna Nagar']
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
      const cityIndex = Math.min(Math.floor(progressFactor * locationData.cities.length), locationData.cities.length - 1);
      const currentLocation = locationData.cities[cityIndex];
      
      stages.push({
        age,
        year: 2024 + yearOffset,
        home: {
          type: progressFactor < 0.2 ? 'studio' : 
                progressFactor < 0.5 ? 'apartment' : 
                progressFactor < 0.8 ? 'house' : 'mansion',
          size: 1 + progressFactor * 2,
          position: [0, 0, 0],
          color: progressFactor < 0.3 ? '#8B4513' : 
                 progressFactor < 0.6 ? '#DEB887' : '#F5DEB3'
        },
        workplace: {
          type: careerPath.id.includes('tech') ? 'startup' :
                 careerPath.id.includes('finance') ? 'corporate' :
                 careerPath.id.includes('remote') ? 'remote' : 'enterprise',
          position: [5, 0, 3],
          height: 2 + progressFactor * 4,
          color: careerPath.id.includes('tech') ? '#4A90E2' :
                 careerPath.id.includes('finance') ? '#2C3E50' : '#7B68EE'
        },
        vehicle: {
          type: progressFactor < 0.2 ? 'none' :
                progressFactor < 0.4 ? 'bike' :
                progressFactor < 0.7 ? 'car' :
                progressFactor < 0.9 ? 'luxury' : 'electric',
          position: [2, 0, -2],
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
          savings: currentIncome * 0.15 * yearOffset,
          netWorth: currentIncome * 0.25 * yearOffset
        },
        career: {
          title: careerPath.career,
          level: progressFactor < 0.3 ? 'Junior' :
                 progressFactor < 0.6 ? 'Mid-level' :
                 progressFactor < 0.8 ? 'Senior' : 'Executive',
          satisfaction: careerPath.workLifeBalance
        },
        environment: {
          neighborhood: progressFactor < 0.3 ? 'urban' :
                       progressFactor < 0.6 ? 'suburban' :
                       progressFactor < 0.8 ? 'premium' : 'luxury',
          skyColor: progressFactor < 0.5 ? '#87CEEB' : '#FFB6C1',
          ambientColor: '#FFFFFF'
        },
        location: currentLocation
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-full px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-white hover:bg-white/20 border border-white/30 bg-white/10"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Simulation
            </Button>
            
            <div className="text-center">
              <h1 className="text-2xl font-bold">3D Life Timeline</h1>
              <p className="text-blue-200">Age {currentAge} • {careerPath.title}</p>
              <p className="text-sm text-purple-200">{currentStage.career.level} • {formatCurrency(currentStage.financials.income)}/year</p>
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
                onClick={() => setCameraZoom(prev => Math.max(0.5, prev - 0.2))}
                className="text-white border-orange-400 hover:bg-orange-500/30 hover:text-white bg-orange-500/20"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCameraZoom(prev => Math.min(3, prev + 0.2))}
                className="text-white border-orange-400 hover:bg-orange-500/30 hover:text-white bg-orange-500/20"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Visualization Area - Enhanced with interactive models */}
      <div className="relative h-[70vh] bg-gradient-to-b from-blue-900/30 to-purple-900/30 overflow-hidden">
        {/* Sky/Environment Background */}
        <div 
          className="absolute inset-0 transition-colors duration-1000"
          style={{ backgroundColor: currentStage.environment.skyColor + '20' }}
        />
        
        {/* 3D Scene Container */}
        <div className="relative h-full flex items-center justify-center perspective-1000">
          {/* Neighborhood Grid */}
          <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 gap-2 p-8 opacity-20">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="bg-white/10 rounded border border-white/20" />
            ))}
          </div>

          {/* Interactive Life Elements */}
          <div 
            className="relative transform transition-all duration-1000"
            style={{ 
              transform: `scale(${cameraZoom}) rotateX(10deg) rotateY(${currentAge * 2}deg)`,
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Home Model */}
            <div 
              className="absolute transform-gpu transition-all duration-1000 cursor-pointer hover:scale-110"
              style={{ 
                left: '200px', 
                top: '100px',
                transform: `translateZ(${currentStage.home.size * 20}px)`,
                filter: `hue-rotate(${currentAge * 5}deg)`
              }}
              onClick={() => setSelectedStage(currentStage)}
            >
              <div className="relative">
                <div 
                  className="w-24 h-24 rounded-lg border-2 border-white/40 flex items-center justify-center transition-colors duration-500 shadow-2xl backdrop-blur-sm"
                  style={{ backgroundColor: currentStage.home.color + '80' }}
                >
                  <Home className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-white bg-black/60 px-2 py-1 rounded">
                  {currentStage.home.type.toUpperCase()}
                </div>
              </div>
            </div>

            {/* Workplace Model */}
            <div 
              className="absolute transform-gpu transition-all duration-1000 cursor-pointer hover:scale-110"
              style={{ 
                left: '350px', 
                top: '150px',
                transform: `translateZ(${currentStage.workplace.height * 10}px)`,
                filter: `hue-rotate(${currentAge * 3}deg)`
              }}
              onClick={() => setSelectedStage(currentStage)}
            >
              <div className="relative">
                <div 
                  className="w-20 h-32 rounded border-2 border-white/40 flex items-center justify-center transition-colors duration-500 shadow-2xl backdrop-blur-sm"
                  style={{ 
                    backgroundColor: currentStage.workplace.color + '80',
                    height: `${currentStage.workplace.height * 8}px`
                  }}
                >
                  <Building className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-white bg-black/60 px-2 py-1 rounded whitespace-nowrap">
                  {currentStage.workplace.type.toUpperCase()}
                </div>
              </div>
            </div>

            {/* Vehicle Model */}
            {currentStage.vehicle.type !== 'none' && (
              <div 
                className="absolute transform-gpu transition-all duration-1000 cursor-pointer hover:scale-110"
                style={{ 
                  left: '120px', 
                  top: '200px',
                  transform: `translateZ(20px)`,
                  filter: `hue-rotate(${currentAge * 4}deg)`
                }}
                onClick={() => setSelectedStage(currentStage)}
              >
                <div className="relative">
                  <div 
                    className="w-16 h-12 rounded border-2 border-white/40 flex items-center justify-center transition-colors duration-500 shadow-2xl backdrop-blur-sm"
                    style={{ backgroundColor: currentStage.vehicle.color + '80' }}
                  >
                    <Car className="h-6 w-6 text-white" />
                  </div>
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-white bg-black/60 px-2 py-1 rounded">
                    {currentStage.vehicle.type.toUpperCase()}
                  </div>
                </div>
              </div>
            )}

            {/* Lifestyle Elements */}
            {currentStage.lifestyle.gym && (
              <div className="absolute w-8 h-8 bg-red-500/60 rounded border border-white/40 flex items-center justify-center" style={{ left: '300px', top: '80px' }}>
                <Trophy className="h-4 w-4 text-white" />
              </div>
            )}

            {currentStage.lifestyle.travel && (
              <div className="absolute w-8 h-8 bg-blue-500/60 rounded border border-white/40 flex items-center justify-center" style={{ left: '400px', top: '120px' }}>
                <Plane className="h-4 w-4 text-white" />
              </div>
            )}

            {currentStage.lifestyle.family && (
              <div className="absolute w-8 h-8 bg-pink-500/60 rounded border border-white/40 flex items-center justify-center" style={{ left: '250px', top: '250px' }}>
                <Heart className="h-4 w-4 text-white" />
              </div>
            )}
          </div>

          {/* Location Badge */}
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-green-400" />
              <span className="text-sm font-medium">{currentStage.location}</span>
            </div>
            <div className="text-xs text-gray-300">{currentStage.environment.neighborhood} area</div>
          </div>
        </div>
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

      {/* Enhanced Details Panel */}
      <Card className="fixed bottom-8 left-8 right-8 bg-black/80 backdrop-blur-sm border-white/20 max-h-60 overflow-y-auto">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-blue-300 mb-2 flex items-center">
                <Home className="h-4 w-4 mr-2" />
                Living
              </h3>
              <p className="text-white font-medium">{currentStage.home.type.toUpperCase()}</p>
              <p className="text-gray-300 text-sm">{currentStage.environment.neighborhood} neighborhood</p>
              <p className="text-xs text-green-300">{currentStage.location}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-300 mb-2 flex items-center">
                <Building className="h-4 w-4 mr-2" />
                Career
              </h3>
              <p className="text-white font-medium">{currentStage.career.level} {currentStage.career.title}</p>
              <p className="text-gray-300 text-sm">{formatCurrency(currentStage.financials.income)}/year</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-yellow-300 mb-2 flex items-center">
                <Car className="h-4 w-4 mr-2" />
                Transportation
              </h3>
              <p className="text-white font-medium">{currentStage.vehicle.type.toUpperCase()}</p>
              <p className="text-gray-300 text-sm">
                {currentStage.vehicle.type === 'none' ? 'Public transport' : 'Personal vehicle'}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-300 mb-2 flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Lifestyle
              </h3>
              <p className="text-white font-medium">
                {currentStage.lifestyle.family ? 'Family life' : 'Single/Dating'}
              </p>
              <div className="flex space-x-2 mt-1">
                {currentStage.lifestyle.gym && <Trophy className="h-3 w-3 text-red-400" />}
                {currentStage.lifestyle.travel && <Plane className="h-3 w-3 text-blue-400" />}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-pink-300 mb-2">Finances</h3>
              <p className="text-white font-medium">
                {formatCurrency(currentStage.financials.savings)} saved
              </p>
              <p className="text-gray-300 text-sm">
                Net worth: {formatCurrency(currentStage.financials.netWorth)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Timeline3D;
