
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, AlertTriangle, CheckCircle, XCircle, RotateCcw } from "lucide-react";

interface Challenge {
  id: string;
  title: string;
  description: string;
  scenario: string;
  options: {
    text: string;
    outcome: 'success' | 'failure' | 'mixed';
    consequence: string;
    impact: string;
  }[];
  image: string;
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

interface RealityChallengesProps {
  scenario: LifeScenario;
  onBack: () => void;
}

const getChallenges = (scenarioId: string): Challenge[] => {
  const challenges: Record<string, Challenge[]> = {
    "tech-startup": [
      {
        id: "startup-funding",
        title: "Startup Funding Crisis",
        description: "Your startup is running out of money. The founders are scrambling to find investors, but it's been 3 months without a deal. How do you handle this uncertainty?",
        scenario: "The company has 2 months of runway left. Layoffs are being discussed.",
        options: [
          {
            text: "Start looking for a new job immediately",
            outcome: 'success',
            consequence: "You secure a new position before layoffs hit",
            impact: "+Job Security, -Equity Upside, +Peace of Mind"
          },
          {
            text: "Stay loyal and help the company pivot",
            outcome: 'mixed',
            consequence: "Company survives but with significant changes",
            impact: "+Leadership Experience, +/-Job Security, +Team Loyalty"
          },
          {
            text: "Negotiate a bridge loan from personal network",
            outcome: 'failure',
            consequence: "Your contacts can't help, and you miss other opportunities",
            impact: "-Time, -Options, +Entrepreneurial Experience"
          }
        ],
        image: "photo-1581091226825-a6a2a5aee158"
      },
      {
        id: "work-life-balance",
        title: "Burnout Warning",
        description: "You've been working 70-hour weeks for 6 months. Your health is suffering, and your relationship is strained. The company culture expects this level of commitment.",
        scenario: "A major product launch is in 2 weeks, but you're exhausted.",
        options: [
          {
            text: "Push through the launch, then take time off",
            outcome: 'mixed',
            consequence: "Launch succeeds but you develop anxiety issues",
            impact: "+Career Advancement, -Health, -Relationships"
          },
          {
            text: "Set boundaries and delegate more",
            outcome: 'success',
            consequence: "Team steps up and you maintain your health",
            impact: "+Leadership Skills, +Health, +Team Development"
          },
          {
            text: "Take medical leave immediately",
            outcome: 'failure',
            consequence: "Launch fails and you're viewed as unreliable",
            impact: "+Health, -Career Prospects, -Team Trust"
          }
        ],
        image: "photo-1470071459604-3b5ec3a7fe05"
      }
    ]
    // Add other scenario challenges...
  };

  return challenges[scenarioId] || challenges["tech-startup"];
};

const RealityChallenges: React.FC<RealityChallengesProps> = ({ scenario, onBack }) => {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [completedChallenges, setCompletedChallenges] = useState<{[key: number]: number}>({});

  const challenges = getChallenges(scenario.id);
  const challenge = challenges[currentChallenge];

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    setShowResult(true);
    setCompletedChallenges(prev => ({
      ...prev,
      [currentChallenge]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentChallenge < challenges.length - 1) {
      setCurrentChallenge(currentChallenge + 1);
      setSelectedOption(null);
      setShowResult(false);
    }
  };

  const handlePrevious = () => {
    if (currentChallenge > 0) {
      setCurrentChallenge(currentChallenge - 1);
      setSelectedOption(completedChallenges[currentChallenge - 1] ?? null);
      setShowResult(completedChallenges[currentChallenge - 1] !== undefined);
    }
  };

  const resetChallenge = () => {
    setSelectedOption(null);
    setShowResult(false);
    const newCompleted = { ...completedChallenges };
    delete newCompleted[currentChallenge];
    setCompletedChallenges(newCompleted);
  };

  const getOutcomeIcon = (outcome: 'success' | 'failure' | 'mixed') => {
    switch (outcome) {
      case 'success':
        return <CheckCircle className="h-8 w-8 text-green-400" />;
      case 'failure':
        return <XCircle className="h-8 w-8 text-red-400" />;
      case 'mixed':
        return <AlertTriangle className="h-8 w-8 text-yellow-400" />;
    }
  };

  const getOutcomeColor = (outcome: 'success' | 'failure' | 'mixed') => {
    switch (outcome) {
      case 'success':
        return 'from-green-600/20 to-green-400/20 border-green-400/30';
      case 'failure':
        return 'from-red-600/20 to-red-400/20 border-red-400/30';
      case 'mixed':
        return 'from-yellow-600/20 to-yellow-400/20 border-yellow-400/30';
    }
  };

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
          <h2 className="text-3xl font-bold">Reality Check</h2>
          <p className="text-blue-200">Navigate real challenges in this career path</p>
        </div>
        <div className="text-sm text-gray-400">
          {currentChallenge + 1} of {challenges.length}
        </div>
      </div>

      {/* Challenge Progress */}
      <div className="flex space-x-2">
        {challenges.map((_, index) => (
          <div 
            key={index}
            className={`flex-1 h-2 rounded-full ${
              index === currentChallenge 
                ? 'bg-purple-400' 
                : index in completedChallenges 
                  ? 'bg-green-400' 
                  : 'bg-white/20'
            }`}
          />
        ))}
      </div>

      {/* Challenge Card */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <div className="relative h-64 overflow-hidden rounded-t-lg">
          <img 
            src={`https://images.unsplash.com/${challenge.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80`}
            alt={challenge.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6">
            <h3 className="text-3xl font-bold text-white mb-2">{challenge.title}</h3>
          </div>
        </div>

        <CardContent className="p-8">
          <div className="space-y-6">
            <div>
              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                {challenge.description}
              </p>
              <div className="bg-orange-600/20 border border-orange-400/30 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400 mr-2" />
                  <span className="font-semibold text-orange-400">Current Situation</span>
                </div>
                <p className="text-gray-300">{challenge.scenario}</p>
              </div>
            </div>

            {!showResult ? (
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-white">What's your move?</h4>
                <div className="space-y-3">
                  {challenge.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionSelect(index)}
                      className="w-full text-left p-4 rounded-lg bg-white/10 border border-white/30 hover:border-purple-400/50 hover:bg-white/15 transition-all duration-300"
                    >
                      <p className="text-white font-medium">{option.text}</p>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className={`bg-gradient-to-r ${getOutcomeColor(challenge.options[selectedOption!].outcome)} border rounded-xl p-6`}>
                  <div className="flex items-center mb-4">
                    {getOutcomeIcon(challenge.options[selectedOption!].outcome)}
                    <h4 className="text-xl font-semibold text-white ml-3">Outcome</h4>
                  </div>
                  <p className="text-lg text-gray-300 mb-4">
                    {challenge.options[selectedOption!].consequence}
                  </p>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-1">Impact on your future:</div>
                    <div className="text-white font-medium">
                      {challenge.options[selectedOption!].impact}
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button
                    variant="outline"
                    onClick={resetChallenge}
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Try Different Choice
                  </Button>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center pt-6 border-t border-white/20">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentChallenge === 0}
                className="border-white/30 text-white hover:bg-white/10"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>

              {showResult && (
                <Button
                  onClick={handleNext}
                  disabled={currentChallenge === challenges.length - 1}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  {currentChallenge === challenges.length - 1 ? 'Complete Challenges' : 'Next Challenge'}
                  {currentChallenge < challenges.length - 1 && <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RealityChallenges;
