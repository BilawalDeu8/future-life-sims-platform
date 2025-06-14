
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Clock, Heart, Zap, Coffee, Briefcase, Home } from "lucide-react";

interface DaySegment {
  id: string;
  time: string;
  activity: string;
  location: string;
  description: string;
  mood: number;
  energy: number;
  stress: number;
  image: string;
  choices?: {
    text: string;
    impact: string;
  }[];
}

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

interface DayInLifeSimulatorProps {
  scenario: LifeScenario;
  onBack: () => void;
}

const getDaySegments = (scenarioId: string): DaySegment[] => {
  const baseDaySegments: DaySegment[] = [
    {
      id: "wake-up",
      time: "7:00 AM",
      activity: "Morning Routine",
      location: "Home",
      description: "Start your day with the perfect morning routine",
      mood: 75,
      energy: 85,
      stress: 20,
      image: "photo-1721322800607-8c38375eef04",
      choices: [
        { text: "Quick workout and healthy breakfast", impact: "+Energy, +Mood" },
        { text: "Extra sleep and grab coffee on the way", impact: "+Energy, +Stress" }
      ]
    },
    {
      id: "commute",
      time: "8:30 AM",
      activity: "Commute",
      location: "Transit",
      description: "Your daily journey to work",
      mood: 65,
      energy: 75,
      stress: 35,
      image: "photo-1581091226825-a6a2a5aee158"
    },
    {
      id: "work-morning",
      time: "9:00 AM",
      activity: "Morning Work",
      location: "Office",
      description: "Dive into your most important work of the day",
      mood: 70,
      energy: 80,
      stress: 45,
      image: "photo-1487958449943-2429e8be8625",
      choices: [
        { text: "Tackle the hardest project first", impact: "+Satisfaction, +Stress" },
        { text: "Start with easier tasks to build momentum", impact: "+Confidence, +Energy" }
      ]
    },
    {
      id: "lunch",
      time: "12:30 PM",
      activity: "Lunch Break",
      location: "Restaurant/Office",
      description: "Recharge with food and social connection",
      mood: 80,
      energy: 70,
      stress: 30,
      image: "photo-1523712999610-f77fbcfc3843"
    },
    {
      id: "work-afternoon",
      time: "2:00 PM",
      activity: "Afternoon Work",
      location: "Office",
      description: "Push through the afternoon productivity dip",
      mood: 60,
      energy: 60,
      stress: 55,
      image: "photo-1470071459604-3b5ec3a7fe05"
    },
    {
      id: "evening-activity",
      time: "6:30 PM",
      activity: "Evening Plans",
      location: "Various",
      description: "How you spend your evening matters",
      mood: 70,
      energy: 55,
      stress: 40,
      image: "photo-1500673922987-e212871fec22",
      choices: [
        { text: "Networking event or work dinner", impact: "+Career, +Stress" },
        { text: "Gym and personal time", impact: "+Health, +Mood" },
        { text: "Social time with friends", impact: "+Relationships, +Happiness" }
      ]
    }
  ];

  return baseDaySegments;
};

const DayInLifeSimulator: React.FC<DayInLifeSimulatorProps> = ({ scenario, onBack }) => {
  const [currentSegment, setCurrentSegment] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState<string[]>([]);
  const daySegments = getDaySegments(scenario.id);

  const handleNext = () => {
    if (currentSegment < daySegments.length - 1) {
      setCurrentSegment(currentSegment + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSegment > 0) {
      setCurrentSegment(currentSegment - 1);
    }
  };

  const handleChoice = (choice: string) => {
    const newChoices = [...selectedChoices];
    newChoices[currentSegment] = choice;
    setSelectedChoices(newChoices);
  };

  const current = daySegments[currentSegment];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-white hover:bg-white/10"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Overview
        </Button>
        <div className="text-center">
          <h2 className="text-3xl font-bold">A Day as a {scenario.title}</h2>
          <p className="text-blue-200">Experience every moment of this lifestyle</p>
        </div>
        <div></div>
      </div>

      {/* Progress Timeline */}
      <div className="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded-xl p-4">
        {daySegments.map((segment, index) => (
          <div 
            key={segment.id}
            className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
              index === currentSegment 
                ? 'text-white scale-110' 
                : index < currentSegment 
                  ? 'text-green-400' 
                  : 'text-gray-400'
            }`}
            onClick={() => setCurrentSegment(index)}
          >
            <div className={`w-4 h-4 rounded-full mb-2 ${
              index === currentSegment 
                ? 'bg-purple-400' 
                : index < currentSegment 
                  ? 'bg-green-400' 
                  : 'bg-gray-600'
            }`} />
            <span className="text-sm font-medium">{segment.time}</span>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <div className="relative h-80 overflow-hidden rounded-t-lg">
          <img 
            src={`https://images.unsplash.com/${current.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80`}
            alt={current.activity}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center mb-2">
              <Clock className="h-5 w-5 mr-2 text-purple-400" />
              <span className="text-lg font-semibold text-white">{current.time}</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">{current.activity}</h3>
            <p className="text-blue-200 text-lg">{current.location}</p>
          </div>
        </div>

        <CardContent className="p-8">
          <p className="text-xl text-gray-300 mb-6 leading-relaxed">
            {current.description}
          </p>

          {/* Mood Indicators */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <Heart className="h-8 w-8 text-pink-400 mx-auto mb-2" />
              <div className="text-sm text-gray-400 mb-1">Mood</div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-pink-400 to-purple-400 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${current.mood}%` }}
                />
              </div>
              <div className="text-sm text-white mt-1">{current.mood}%</div>
            </div>

            <div className="text-center">
              <Zap className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-sm text-gray-400 mb-1">Energy</div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${current.energy}%` }}
                />
              </div>
              <div className="text-sm text-white mt-1">{current.energy}%</div>
            </div>

            <div className="text-center">
              <Briefcase className="h-8 w-8 text-red-400 mx-auto mb-2" />
              <div className="text-sm text-gray-400 mb-1">Stress</div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-green-400 to-red-400 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${current.stress}%` }}
                />
              </div>
              <div className="text-sm text-white mt-1">{current.stress}%</div>
            </div>
          </div>

          {/* Choices */}
          {current.choices && (
            <div className="space-y-4 mb-8">
              <h4 className="text-xl font-semibold text-white">How do you want to handle this?</h4>
              <div className="space-y-3">
                {current.choices.map((choice, index) => (
                  <button
                    key={index}
                    onClick={() => handleChoice(choice.text)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 ${
                      selectedChoices[currentSegment] === choice.text
                        ? 'border-purple-400 bg-purple-400/20'
                        : 'border-white/30 bg-white/10 hover:border-purple-400/50 hover:bg-white/15'
                    }`}
                  >
                    <div className="text-white font-medium mb-1">{choice.text}</div>
                    <div className="text-sm text-purple-300">{choice.impact}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentSegment === 0}
              className="border-white/30 text-white hover:bg-white/10"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            <div className="text-center">
              <div className="text-sm text-gray-400">
                {currentSegment + 1} of {daySegments.length}
              </div>
            </div>

            <Button
              onClick={handleNext}
              disabled={currentSegment === daySegments.length - 1}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {currentSegment === daySegments.length - 1 ? 'Complete Day' : 'Continue'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DayInLifeSimulator;
