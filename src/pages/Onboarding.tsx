import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import PersonalFoundation from "@/components/onboarding/PersonalFoundation";
import ValuesDeepDive from "@/components/onboarding/ValuesDeepDive";
import LifestylePreferences from "@/components/onboarding/LifestylePreferences";
import FutureAspirations from "@/components/onboarding/FutureAspirations";

export interface OnboardingData {
  personalFoundation: {
    age: number;
    education: string;
    location: string;
    financialSituation: string;
    livingPreference: string;
  };
  values: {
    workLifeBalance: number;
    stabilityAdventure: number;
    individualTeam: number;
    lifestyleLocation: string;
    travelImportance: number;
  };
  lifestyle: {
    dailySchedule: string;
    socialInteraction: string;
    stressTolerance: number;
    learningStyle: string;
    creativityAnalytical: number;
  };
  aspirations: {
    familyPlanning: string;
    lifeExperiences: string[];
    financialGoals: string;
    geographicFlexibility: number;
  };
}

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    personalFoundation: {
      age: 22,
      education: "",
      location: "",
      financialSituation: "",
      livingPreference: ""
    },
    values: {
      workLifeBalance: 50,
      stabilityAdventure: 50,
      individualTeam: 50,
      lifestyleLocation: "",
      travelImportance: 50
    },
    lifestyle: {
      dailySchedule: "",
      socialInteraction: "",
      stressTolerance: 50,
      learningStyle: "",
      creativityAnalytical: 50
    },
    aspirations: {
      familyPlanning: "",
      lifeExperiences: [],
      financialGoals: "",
      geographicFlexibility: 50
    }
  });

  const steps = [
    {
      title: "Personal Foundation",
      description: "Let's start with who you are today",
      component: PersonalFoundation
    },
    {
      title: "Values Deep Dive", 
      description: "What matters most to you in life?",
      component: ValuesDeepDive
    },
    {
      title: "Lifestyle Preferences",
      description: "How do you like to live day-to-day?",
      component: LifestylePreferences
    },
    {
      title: "Future Aspirations",
      description: "What does your ideal future look like?",
      component: FutureAspirations
    }
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding - redirect to simulation
      console.log("Onboarding completed:", onboardingData);
      navigate('/simulation');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateData = (section: keyof OnboardingData, data: any) => {
    setOnboardingData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* Header with Progress */}
      <div className="sticky top-0 z-10 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Sparkles className="h-6 w-6 text-yellow-400 mr-2" />
              <span className="text-lg font-semibold">Future Self Simulator</span>
            </div>
            <div className="text-sm text-blue-200">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>
          
          <Progress value={progress} className="h-2 bg-white/20" />
          
          <div className="mt-4">
            <h1 className="text-2xl font-bold mb-2">{steps[currentStep].title}</h1>
            <p className="text-blue-200">{steps[currentStep].description}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-8">
            <CurrentStepComponent 
              data={onboardingData}
              updateData={updateData}
            />
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="border-white/30 text-white hover:bg-white/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          <Button
            onClick={handleNext}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {currentStep === steps.length - 1 ? "Start My Simulation" : "Continue"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
