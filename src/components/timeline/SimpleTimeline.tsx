import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Play, Pause, Home, Briefcase, Heart, DollarSign, MapPin, Trophy, AlertCircle, TrendingUp, Calendar, Users, Zap, Target, Coffee, BookOpen, Plane } from "lucide-react";
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
  lifestyle: {
    happiness: number;
    stress: number;
    workLifeBalance: number;
    socialLife: string;
    hobbies: string[];
    healthStatus: string;
  };
  majorEvents: string[];
  monthlyExpenses: {
    rent: number;
    food: number;
    entertainment: number;
    transport: number;
    savings: number;
  };
  futureGoals: string[];
  personalGrowth: string;
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

  // Generate comprehensive life stages
  const generateLifeStages = (): LifeStage[] => {
    const stages: LifeStage[] = [];
    const ages = [22, 25, 28, 32, 35, 40, 45, 50];
    
    const baseIncome = isIndianLocation ? 1200000 : 80000;
    const currency = isIndianLocation ? '₹' : '$';
    const cities = isIndianLocation 
      ? ['Bangalore', 'Mumbai', 'Pune', 'Hyderabad', 'Delhi NCR'] 
      : ['San Francisco', 'New York', 'Austin', 'Seattle', 'Boston'];
    
    const lifestyleData = [
      {
        socialLife: 'Active nightlife, weekend parties',
        hobbies: ['Gaming', 'Coding side projects', 'Gym'],
        healthStatus: 'High energy, occasional stress',
        personalGrowth: 'Learning fundamentals, building confidence',
        majorEvents: ['First job', 'Moving to new city', 'College graduation'],
        futureGoals: ['Get promoted', 'Learn new technologies', 'Build emergency fund']
      },
      {
        socialLife: 'Dating, close friend groups',
        hobbies: ['Travel', 'Photography', 'Cooking'],
        healthStatus: 'Good, managing work stress',
        personalGrowth: 'Developing leadership skills, finding passion',
        majorEvents: ['First promotion', 'Serious relationship', 'First international trip'],
        futureGoals: ['Senior role', 'Buy a car', 'Consider marriage']
      },
      {
        socialLife: 'Settling down, fewer but deeper friendships',
        hobbies: ['Home improvement', 'Reading', 'Weekend getaways'],
        healthStatus: 'Stable, focus on mental health',
        personalGrowth: 'Mastering expertise, mentoring others',
        majorEvents: ['Marriage/Partnership', 'Buying first home', 'Career breakthrough'],
        futureGoals: ['Start family', 'Buy house', 'Leadership position']
      },
      {
        socialLife: 'Family-focused, professional networks',
        hobbies: ['Family activities', 'Gardening', 'Sports'],
        healthStatus: 'Managing responsibilities, regular checkups',
        personalGrowth: 'Balancing career and family, strategic thinking',
        majorEvents: ['First child', 'Home purchase', 'Major promotion'],
        futureGoals: ['Kids education fund', 'Expand family', 'Senior management']
      },
      {
        socialLife: 'School communities, family gatherings',
        hobbies: ['Kids sports', 'Community involvement', 'Fitness'],
        healthStatus: 'Health-conscious, preventive care',
        personalGrowth: 'Peak career phase, giving back to community',
        majorEvents: ['Second child', 'Career peak', 'Investment milestones'],
        futureGoals: ['Financial independence', 'Kids future', 'Legacy building']
      },
      {
        socialLife: 'Professional leadership, mentor role',
        hobbies: ['Mentoring', 'Investing', 'Travel planning'],
        healthStatus: 'Proactive health management',
        personalGrowth: 'Industry expert, strategic vision',
        majorEvents: ['Executive role', 'Major investments', 'Industry recognition'],
        futureGoals: ['Wealth building', 'Succession planning', 'Impact creation']
      },
      {
        socialLife: 'Industry veteran, advisory roles',
        hobbies: ['Consulting', 'Golf/leisure', 'Grandparent prep'],
        healthStatus: 'Age-aware health focus',
        personalGrowth: 'Wisdom sharing, legacy focus',
        majorEvents: ['C-suite role', 'Board positions', 'Wealth milestones'],
        futureGoals: ['Retirement planning', 'Legacy projects', 'Next generation']
      },
      {
        socialLife: 'Grandparent role, wisdom sharing',
        hobbies: ['Advisory work', 'Philanthropy', 'Slow travel'],
        healthStatus: 'Wellness-focused lifestyle',
        personalGrowth: 'Life reflection, knowledge transfer',
        majorEvents: ['Retirement transition', 'Grandchildren', 'Legacy establishment'],
        futureGoals: ['Peaceful retirement', 'Health maintenance', 'Family legacy']
      }
    ];
    
    ages.forEach((age, index) => {
      const yearOffset = age - 22;
      const progressFactor = index / (ages.length - 1);
      const currentIncome = baseIncome + (yearOffset * (isIndianLocation ? 200000 : 12000));
      const data = lifestyleData[index];
      
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
        milestone: progressFactor === 0.5 ? 'First major promotion' : undefined,
        lifestyle: {
          happiness: Math.floor(60 + progressFactor * 30),
          stress: Math.floor(30 + progressFactor * 40),
          workLifeBalance: Math.floor(50 + progressFactor * 30),
          socialLife: data.socialLife,
          hobbies: data.hobbies,
          healthStatus: data.healthStatus
        },
        majorEvents: data.majorEvents,
        monthlyExpenses: {
          rent: Math.floor(currentIncome * 0.25 / 12),
          food: Math.floor(currentIncome * 0.08 / 12),
          entertainment: Math.floor(currentIncome * 0.05 / 12),
          transport: Math.floor(currentIncome * 0.06 / 12),
          savings: Math.floor(currentIncome * 0.15 / 12)
        },
        futureGoals: data.futureGoals,
        personalGrowth: data.personalGrowth
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

      {/* Enhanced Current Stage Highlight */}
      <Card className="mb-8 bg-gradient-to-r from-blue-600/40 to-purple-600/40 border-blue-400/60 backdrop-blur-sm shadow-2xl">
        <CardContent className="p-8">
          {/* Age and Year Header with Better Contrast */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 rounded-2xl p-6 border border-white/30 shadow-lg">
                <h2 className="text-5xl font-bold text-white drop-shadow-lg">{currentStage.age}</h2>
                <p className="text-blue-200 text-lg font-medium mt-1">{currentStage.year}</p>
              </div>
              <div>
                <p className="text-blue-200 text-xl font-medium">{currentStage.title}</p>
                <p className="text-white/80 text-base mt-1">{currentStage.location}</p>
              </div>
            </div>
            <div className="text-right bg-gradient-to-br from-green-500/30 to-green-600/30 rounded-xl p-4 border border-green-400/50">
              <p className="text-3xl font-bold text-green-300">{formatCurrency(currentStage.income)}</p>
              <p className="text-green-200 text-sm">per year</p>
            </div>
          </div>
          
          {/* Life Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            <div className="flex items-center space-x-3 bg-blue-500/20 rounded-lg p-3 border border-blue-400/30">
              <Briefcase className="h-6 w-6 text-blue-300 flex-shrink-0" />
              <div>
                <p className="text-xs text-blue-200 font-medium">Career</p>
                <p className="text-white font-semibold text-sm">{currentStage.career}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 bg-orange-500/20 rounded-lg p-3 border border-orange-400/30">
              <Home className="h-6 w-6 text-orange-300 flex-shrink-0" />
              <div>
                <p className="text-xs text-orange-200 font-medium">Housing</p>
                <p className="text-white font-semibold text-sm">{currentStage.housing}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 bg-pink-500/20 rounded-lg p-3 border border-pink-400/30">
              <Heart className="h-6 w-6 text-pink-300 flex-shrink-0" />
              <div>
                <p className="text-xs text-pink-200 font-medium">Relationship</p>
                <p className="text-white font-semibold text-sm">{currentStage.relationship}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 bg-green-500/20 rounded-lg p-3 border border-green-400/30">
              <MapPin className="h-6 w-6 text-green-300 flex-shrink-0" />
              <div>
                <p className="text-xs text-green-200 font-medium">Location</p>
                <p className="text-white font-semibold text-sm">{currentStage.location}</p>
              </div>
            </div>
          </div>

          {/* Lifestyle Metrics */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-yellow-500/20 rounded-lg p-3 border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <span className="text-yellow-200 text-xs font-medium">Happiness</span>
                <span className="text-yellow-300 font-bold">{currentStage.lifestyle.happiness}%</span>
              </div>
              <div className="w-full bg-yellow-900/30 rounded-full h-2 mt-2">
                <div 
                  className="bg-yellow-400 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${currentStage.lifestyle.happiness}%` }}
                ></div>
              </div>
            </div>
            
            <div className="bg-red-500/20 rounded-lg p-3 border border-red-400/30">
              <div className="flex items-center justify-between">
                <span className="text-red-200 text-xs font-medium">Stress</span>
                <span className="text-red-300 font-bold">{currentStage.lifestyle.stress}%</span>
              </div>
              <div className="w-full bg-red-900/30 rounded-full h-2 mt-2">
                <div 
                  className="bg-red-400 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${currentStage.lifestyle.stress}%` }}
                ></div>
              </div>
            </div>
            
            <div className="bg-purple-500/20 rounded-lg p-3 border border-purple-400/30">
              <div className="flex items-center justify-between">
                <span className="text-purple-200 text-xs font-medium">Work-Life Balance</span>
                <span className="text-purple-300 font-bold">{currentStage.lifestyle.workLifeBalance}%</span>
              </div>
              <div className="w-full bg-purple-900/30 rounded-full h-2 mt-2">
                <div 
                  className="bg-purple-400 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${currentStage.lifestyle.workLifeBalance}%` }}
                ></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline Visualization */}
      <Card className="mb-6 bg-black/40 border-white/30 backdrop-blur-sm shadow-xl">
        <CardContent className="p-8">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-12 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-lg"></div>
            
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
                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDecisionClick(stage.age);
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white text-xs animate-pulse font-bold px-3 py-1"
                      >
                        Decision!
                      </Button>
                    </div>
                  )}
                  
                  {/* Milestone Indicator */}
                  {stage.milestone && (
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                      <Trophy className="h-6 w-6 text-yellow-400 animate-pulse" />
                    </div>
                  )}
                  
                  {/* Node Circle */}
                  <div className={`
                    w-20 h-20 rounded-full border-4 flex items-center justify-center text-center relative shadow-lg
                    ${stage.age === currentAge 
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500 border-white ring-4 ring-white/50' 
                      : stage.age < currentAge
                      ? 'bg-gradient-to-br from-blue-500 to-purple-500 border-blue-300' 
                      : 'bg-gray-700/80 border-gray-400'
                    }
                  `}>
                    <div className="text-sm font-bold text-white">{stage.age}</div>
                  </div>
                  
                  {/* Enhanced Labels with Better Spacing */}
                  <div className="absolute -bottom-28 left-1/2 transform -translate-x-1/2 text-center w-36">
                    <div className="bg-gray-900/95 backdrop-blur-sm rounded-xl p-4 border border-gray-600/50 shadow-lg space-y-2">
                      <div className="text-base font-bold text-white">{stage.year}</div>
                      <div className="text-sm text-gray-200 leading-relaxed">{stage.career}</div>
                      <div className="text-sm text-blue-300">{stage.location}</div>
                    </div>
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
          <span className="text-sm text-blue-200 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-400/30">
            {currentStage.year} • {currentStage.location}
          </span>
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

      {/* Comprehensive Life Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Financial Breakdown */}
        <Card className="bg-green-600/20 border-green-400/40 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-green-300 flex items-center">
              <DollarSign className="h-5 w-5 mr-2" />
              Financial Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-green-200 text-sm">Monthly Rent</p>
                <p className="text-white font-bold">{formatCurrency(currentStage.monthlyExpenses.rent * 12)}</p>
              </div>
              <div>
                <p className="text-green-200 text-sm">Food & Dining</p>
                <p className="text-white font-bold">{formatCurrency(currentStage.monthlyExpenses.food * 12)}</p>
              </div>
              <div>
                <p className="text-green-200 text-sm">Entertainment</p>
                <p className="text-white font-bold">{formatCurrency(currentStage.monthlyExpenses.entertainment * 12)}</p>
              </div>
              <div>
                <p className="text-green-200 text-sm">Monthly Savings</p>
                <p className="text-white font-bold">{formatCurrency(currentStage.monthlyExpenses.savings * 12)}</p>
              </div>
            </div>
            <div className="bg-green-500/20 rounded-lg p-3">
              <p className="text-green-200 text-sm">Total Savings</p>
              <p className="text-2xl font-bold text-green-300">{formatCurrency(currentStage.savings)}</p>
            </div>
          </CardContent>
        </Card>

        {/* Lifestyle & Social Life */}
        <Card className="bg-purple-600/20 border-purple-400/40 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-purple-300 flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Lifestyle & Social
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-purple-200 text-sm mb-2">Social Life</p>
              <p className="text-white text-sm">{currentStage.lifestyle.socialLife}</p>
            </div>
            <div>
              <p className="text-purple-200 text-sm mb-2">Health Status</p>
              <p className="text-white text-sm">{currentStage.lifestyle.healthStatus}</p>
            </div>
            <div>
              <p className="text-purple-200 text-sm mb-2">Current Hobbies</p>
              <div className="flex flex-wrap gap-2">
                {currentStage.lifestyle.hobbies.map((hobby, index) => (
                  <Badge key={index} variant="outline" className="text-purple-300 border-purple-400">
                    {hobby}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Major Events & Growth */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Major Life Events */}
        <Card className="bg-yellow-600/20 border-yellow-400/40 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-yellow-300 flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Major Life Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentStage.majorEvents.map((event, index) => (
                <div key={index} className="flex items-center space-x-3 bg-yellow-500/20 rounded-lg p-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <p className="text-white text-sm">{event}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Future Goals */}
        <Card className="bg-blue-600/20 border-blue-400/40 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-blue-300 flex items-center">
              <Target className="h-5 w-5 mr-2" />
              Future Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentStage.futureGoals.map((goal, index) => (
                <div key={index} className="flex items-center space-x-3 bg-blue-500/20 rounded-lg p-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <p className="text-white text-sm">{goal}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Personal Growth */}
      <Card className="mb-6 bg-indigo-600/20 border-indigo-400/40 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-indigo-300 flex items-center">
            <BookOpen className="h-5 w-5 mr-2" />
            Personal Growth Journey
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white text-lg leading-relaxed">{currentStage.personalGrowth}</p>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-green-600/40 border-green-400/60 backdrop-blur-sm shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <DollarSign className="h-8 w-8 text-green-300 bg-green-500/30 p-2 rounded-lg" />
              <div>
                <p className="text-sm text-green-200 font-medium">Annual Income</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(currentStage.income)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-blue-600/40 border-blue-400/60 backdrop-blur-sm shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Trophy className="h-8 w-8 text-blue-300 bg-blue-500/30 p-2 rounded-lg" />
              <div>
                <p className="text-sm text-blue-200 font-medium">Total Savings</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(currentStage.savings)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-600/40 border-purple-400/60 backdrop-blur-sm shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Briefcase className="h-8 w-8 text-purple-300 bg-purple-500/30 p-2 rounded-lg" />
              <div>
                <p className="text-sm text-purple-200 font-medium">Career Level</p>
                <p className="text-2xl font-bold text-white">{currentStage.career}</p>
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
