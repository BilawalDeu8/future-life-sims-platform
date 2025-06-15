
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Home, Building, Car, MapPin, Play, Pause, ZoomIn, ZoomOut, Users, Plane } from "lucide-react";

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
}

interface Timeline3DProps {
  careerPath: any;
  onBack: () => void;
}

const Timeline3D: React.FC<Timeline3DProps> = ({ careerPath, onBack }) => {
  const [currentAge, setCurrentAge] = useState(22);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [cameraZoom, setCameraZoom] = useState(1);

  // Generate life stages based on career path
  const generateLifeStages = (): LifeStage[] => {
    const stages: LifeStage[] = [];
    const ages = [22, 25, 28, 32, 35, 40, 45, 50];
    
    ages.forEach((age, index) => {
      const yearOffset = age - 22;
      const progressFactor = index / (ages.length - 1);
      
      // Calculate income based on career path
      const baseIncome = careerPath.id === 'tech-startup' ? 95000 :
                        careerPath.id === 'corporate-finance' ? 120000 :
                        careerPath.id === 'creative-agency' ? 75000 : 80000;
      
      const currentIncome = baseIncome + (yearOffset * 8000 * (1 + progressFactor));
      
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
          type: careerPath.id === 'tech-startup' ? 'startup' :
                 careerPath.id === 'corporate-finance' ? 'corporate' :
                 careerPath.id === 'remote-consultant' ? 'remote' : 'enterprise',
          position: [5, 0, 3],
          height: 2 + progressFactor * 4,
          color: careerPath.id === 'tech-startup' ? '#4A90E2' :
                 careerPath.id === 'corporate-finance' ? '#2C3E50' : '#7B68EE'
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
        }
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
              <p className="text-sm text-purple-200">{currentStage.career.level} • ${currentStage.financials.income.toLocaleString()}/year</p>
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

      {/* Placeholder for 3D Canvas */}
      <div className="relative h-[70vh] flex items-center justify-center">
        <div className="text-center bg-black/30 backdrop-blur-sm p-8 rounded-lg border border-white/20">
          <h2 className="text-3xl font-bold mb-4">3D Life Timeline Loading...</h2>
          <p className="text-lg text-blue-200 mb-4">
            Revolutionary 3D experience coming soon!
          </p>
          <div className="flex items-center justify-center space-x-4">
            <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce"></div>
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-4 h-4 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>

      {/* Timeline Scrubber */}
      <div className="px-8 py-6 bg-black/20">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Life Timeline (Age {currentAge})
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
              <span key={stage.age}>{stage.age}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Details Panel */}
      <Card className="fixed bottom-8 left-8 right-8 bg-black/80 backdrop-blur-sm border-white/20 max-h-60 overflow-y-auto">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-blue-300 mb-2 flex items-center">
                <Home className="h-4 w-4 mr-2" />
                Living
              </h3>
              <p className="text-white font-medium">{currentStage.home.type.toUpperCase()}</p>
              <p className="text-gray-300 text-sm">{currentStage.environment.neighborhood} neighborhood</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-300 mb-2 flex items-center">
                <Building className="h-4 w-4 mr-2" />
                Career
              </h3>
              <p className="text-white font-medium">{currentStage.career.level} {currentStage.career.title}</p>
              <p className="text-gray-300 text-sm">${currentStage.financials.income.toLocaleString()}/year</p>
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
              <h3 className="text-lg font-semibold text-purple-300 mb-2">Lifestyle</h3>
              <p className="text-white font-medium">
                {currentStage.lifestyle.family ? 'Family life' : 'Single/Dating'}
              </p>
              <p className="text-gray-300 text-sm">
                Savings: ${currentStage.financials.savings.toLocaleString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Timeline3D;
