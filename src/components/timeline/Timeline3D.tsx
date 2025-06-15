
import React, { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Text, Box, Cylinder, Sphere } from '@react-three/drei';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Home, Building, Car, MapPin, Play, Pause, ZoomIn, ZoomOut, Users, Plane } from "lucide-react";
import { EnhancedHomeModel, EnhancedWorkplaceModel, EnhancedVehicleModel } from './Enhanced3DModels';
import * as THREE from 'three';

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

const Scene3D: React.FC<{ currentStage: any; onStageClick: () => void }> = ({ currentStage, onStageClick }) => {
  const { camera } = useThree();
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);
  
  useEffect(() => {
    camera.position.set(12, 10, 12);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return (
    <>
      {/* Dynamic sky based on stage */}
      <color attach="background" args={[currentStage.environment.skyColor]} />
      
      {/* Advanced lighting setup */}
      <ambientLight intensity={0.4} color={currentStage.environment.ambientColor} />
      <directionalLight 
        position={[10, 15, 5]} 
        intensity={1.2} 
        castShadow 
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[0, 10, 0]} intensity={0.5} color="#FFD700" />
      
      {/* Enhanced ground with patterns */}
      <Box args={[25, 0.1, 25]} position={[0, -0.05, 0]} receiveShadow>
        <meshStandardMaterial 
          color={currentStage.environment.neighborhood === 'luxury' ? '#90EE90' : '#228B22'} 
          roughness={0.8}
        />
      </Box>
      
      {/* Road network */}
      <Box args={[25, 0.11, 1.2]} position={[0, -0.04, 0]}>
        <meshStandardMaterial color="#696969" />
      </Box>
      <Box args={[1.2, 0.11, 25]} position={[0, -0.04, 0]}>
        <meshStandardMaterial color="#696969" />
      </Box>
      
      {/* Road markings */}
      {Array.from({ length: 5 }, (_, i) => (
        <Box key={i} args={[0.1, 0.12, 2]} position={[0, -0.03, -8 + i * 4]}>
          <meshStandardMaterial color="#FFFF00" />
        </Box>
      ))}
      
      {/* Enhanced building models */}
      <EnhancedHomeModel 
        stage={currentStage} 
        isSelected={selectedBuilding === 'home'}
        onHover={() => {}}
        onClick={() => setSelectedBuilding('home')}
      />
      
      <EnhancedWorkplaceModel 
        stage={currentStage} 
        isSelected={selectedBuilding === 'work'}
        onHover={() => {}}
        onClick={() => setSelectedBuilding('work')}
      />
      
      <EnhancedVehicleModel 
        stage={currentStage} 
        isSelected={selectedBuilding === 'vehicle'}
        onHover={() => {}}
        onClick={() => setSelectedBuilding('vehicle')}
      />
      
      {/* Lifestyle elements with enhanced detail */}
      <group>
        {/* Gym with equipment visible */}
        {currentStage.lifestyle.gym && (
          <group position={[8, 0, 2]}>
            <Box args={[2, 1.5, 1.5]} position={[0, 0.75, 0]}>
              <meshStandardMaterial color="#FF6B6B" />
            </Box>
            <Text position={[0, 2, 0]} fontSize={0.2} color="white" anchorX="center">
              GYM
            </Text>
            {/* Equipment inside */}
            <Box args={[0.3, 0.3, 0.3]} position={[0.5, 0.15, 0]}>
              <meshStandardMaterial color="#333333" />
            </Box>
          </group>
        )}
        
        {/* Restaurant district */}
        {Array.from({ length: currentStage.lifestyle.restaurants }, (_, i) => (
          <group key={i} position={[10 + i * 1.5, 0, -3]}>
            <Cylinder args={[0.6, 0.6, 1.2]} position={[0, 0.6, 0]}>
              <meshStandardMaterial color="#FFA500" />
            </Cylinder>
            <Text position={[0, 1.5, 0]} fontSize={0.15} color="white" anchorX="center">
              RESTAURANT
            </Text>
            {/* Outdoor seating */}
            <Cylinder args={[0.2, 0.2, 0.05]} position={[0.8, 0.05, 0]}>
              <meshStandardMaterial color="#8B4513" />
            </Cylinder>
          </group>
        ))}
        
        {/* Family indicators with more detail */}
        {currentStage.lifestyle.family && (
          <group position={[currentStage.home.position[0] + 3, 0, currentStage.home.position[2] + 1]}>
            <Sphere args={[0.25]} position={[0, 0.25, 0]}>
              <meshStandardMaterial color="#FFB6C1" />
            </Sphere>
            <Sphere args={[0.18]} position={[0.5, 0.18, 0]}>
              <meshStandardMaterial color="#FFB6C1" />
            </Sphere>
            <Sphere args={[0.12]} position={[0.3, 0.12, 0.3]}>
              <meshStandardMaterial color="#FFB6C1" />
            </Sphere>
            <Text position={[0.3, 1, 0]} fontSize={0.2} color="white" anchorX="center">
              FAMILY
            </Text>
          </group>
        )}
        
        {/* Travel destinations */}
        {currentStage.lifestyle.travel && (
          <group position={[12, 0, 8]}>
            <Sphere args={[0.4]} position={[0, 2.5, 0]}>
              <meshStandardMaterial color="#00CED1" />
            </Sphere>
            <Cylinder args={[0.1, 0.1, 2]} position={[0, 1, 0]}>
              <meshStandardMaterial color="#FFFFFF" />
            </Cylinder>
            <Text position={[0, 3.2, 0]} fontSize={0.2} color="white" anchorX="center">
              TRAVEL
            </Text>
          </group>
        )}
      </group>
      
      {/* Neighborhood context buildings */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 15;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const height = 1.5 + Math.random() * 3;
        
        return (
          <Box 
            key={i}
            args={[1.2, height, 1.2]} 
            position={[x, height/2, z]}
          >
            <meshStandardMaterial 
              color={currentStage.environment.neighborhood === 'luxury' ? '#F5F5DC' : '#D3D3D3'} 
              opacity={0.6} 
              transparent 
            />
          </Box>
        );
      })}
      
      {/* Weather effects based on season/mood */}
      {currentStage.environment.neighborhood === 'luxury' && (
        <group>
          {Array.from({ length: 20 }, (_, i) => (
            <Sphere key={i} args={[0.02]} position={[
              (Math.random() - 0.5) * 30,
              Math.random() * 10 + 5,
              (Math.random() - 0.5) * 30
            ]}>
              <meshStandardMaterial color="#FFFFFF" opacity={0.8} transparent />
            </Sphere>
          ))}
        </group>
      )}
    </>
  );
};

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

      {/* 3D Canvas */}
      <div className="relative h-[70vh]">
        <Canvas shadows camera={{ position: [10, 8, 10], fov: 60 }}>
          <Suspense fallback={null}>
            <Scene3D 
              currentStage={currentStage} 
              onStageClick={() => console.log('Stage clicked')}
            />
            <OrbitControls 
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={5}
              maxDistance={20}
            />
            <Environment preset="sunset" />
          </Suspense>
        </Canvas>
        
        {/* Loading indicator */}
        <div className="absolute top-4 right-4 text-white text-sm opacity-70">
          Click and drag to explore • Scroll to zoom
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
