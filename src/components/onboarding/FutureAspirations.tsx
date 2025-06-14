
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { OnboardingData } from "@/pages/Onboarding";
import { Heart, Star, DollarSign, Globe } from "lucide-react";

interface FutureAspirationsProps {
  data: OnboardingData;
  updateData: (section: keyof OnboardingData, data: any) => void;
}

const FutureAspirations: React.FC<FutureAspirationsProps> = ({ data, updateData }) => {
  const familyOptions = [
    { id: "no_family", label: "No Family Plans", desc: "Focus on career and personal growth" },
    { id: "maybe_later", label: "Maybe Later (30s+)", desc: "Open to family but not a priority now" },
    { id: "within_decade", label: "Within 10 Years", desc: "Want to start a family by early 30s" },
    { id: "soon", label: "Soon (5 years)", desc: "Family is a near-term priority" }
  ];

  const lifeExperiences = [
    "Travel to 6+ continents",
    "Start my own business", 
    "Live in a foreign country",
    "Write a book or create art",
    "Learn multiple languages",
    "Own a home",
    "Master a musical instrument",
    "Run a marathon or athletic goal",
    "Volunteer for meaningful causes",
    "Build a significant investment portfolio",
    "Become an expert in my field",
    "Have adventures (skydiving, climbing, etc.)"
  ];

  const financialGoals = [
    { id: "comfortable", label: "Comfortable Living", desc: "$50-80k annually, stable lifestyle" },
    { id: "affluent", label: "Affluent Lifestyle", desc: "$80-150k annually, nice home, travel" },
    { id: "wealthy", label: "Wealthy", desc: "$150k+ annually, luxury, investment freedom" },
    { id: "entrepreneur", label: "Entrepreneurial Wealth", desc: "Build significant business value" }
  ];

  const handleExperienceToggle = (experience: string) => {
    const current = data.aspirations.lifeExperiences || [];
    const updated = current.includes(experience)
      ? current.filter(exp => exp !== experience)
      : [...current, experience];
    updateData('aspirations', { lifeExperiences: updated });
  };

  const getSliderLabel = (value: number) => {
    if (value < 25) return "Prefer to Stay Local";
    if (value < 50) return "Some Flexibility";
    if (value < 75) return "Very Flexible";
    return "Will Go Anywhere";
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
          Dream Your Future
        </h2>
        <p className="text-blue-100 text-lg">
          What would make your life feel truly fulfilling and complete?
        </p>
      </div>

      {/* Family Planning */}
      <Card className="bg-white/5 border-white/20">
        <CardContent className="p-6">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center mr-3">
              <Heart className="h-5 w-5 text-pink-400" />
            </div>
            <div>
              <Label className="text-white text-lg font-semibold">Family Planning Timeline</Label>
              <p className="text-blue-200 text-sm">How do you see family fitting into your future?</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {familyOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => updateData('aspirations', { familyPlanning: option.id })}
                className={`p-5 rounded-lg border-2 transition-all duration-200 text-left ${
                  data.aspirations.familyPlanning === option.id
                    ? 'border-pink-400 bg-pink-500/20 text-white'
                    : 'border-white/20 bg-white/5 text-blue-100 hover:border-pink-400/50 hover:bg-white/10'
                }`}
              >
                <div className="font-semibold text-lg mb-1">{option.label}</div>
                <div className="text-sm opacity-80">{option.desc}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Life Experiences */}
      <Card className="bg-white/5 border-white/20">
        <CardContent className="p-6">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
              <Star className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <Label className="text-white text-lg font-semibold">Major Life Experiences</Label>
              <p className="text-blue-200 text-sm">What experiences would make your life feel complete? (Select all that resonate)</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {lifeExperiences.map((experience) => (
              <div key={experience} className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <Checkbox
                  checked={data.aspirations.lifeExperiences?.includes(experience) || false}
                  onCheckedChange={() => handleExperienceToggle(experience)}
                  className="border-purple-400 data-[state=checked]:bg-purple-500"
                />
                <label className="text-white cursor-pointer">{experience}</label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Financial Goals */}
      <Card className="bg-white/5 border-white/20">
        <CardContent className="p-6">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
              <DollarSign className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <Label className="text-white text-lg font-semibold">Financial Goals & Lifestyle</Label>
              <p className="text-blue-200 text-sm">What level of financial success do you aspire to?</p>
            </div>
          </div>
          <div className="space-y-3">
            {financialGoals.map((goal) => (
              <button
                key={goal.id}
                onClick={() => updateData('aspirations', { financialGoals: goal.id })}
                className={`w-full p-5 rounded-lg border-2 transition-all duration-200 text-left ${
                  data.aspirations.financialGoals === goal.id
                    ? 'border-green-400 bg-green-500/20 text-white'
                    : 'border-white/20 bg-white/5 text-blue-100 hover:border-green-400/50 hover:bg-white/10'
                }`}
              >
                <div className="font-semibold text-lg mb-1">{goal.label}</div>
                <div className="text-sm opacity-80">{goal.desc}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Geographic Flexibility */}
      <Card className="bg-white/5 border-white/20">
        <CardContent className="p-6">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
              <Globe className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <Label className="text-white text-lg font-semibold">Geographic Flexibility</Label>
              <p className="text-blue-200 text-sm">How willing are you to relocate for the right opportunity?</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="text-center">
              <span className="text-2xl font-bold text-white">
                {getSliderLabel(data.aspirations.geographicFlexibility)}
              </span>
            </div>
            <Slider
              value={[data.aspirations.geographicFlexibility]}
              onValueChange={(value) => updateData('aspirations', { geographicFlexibility: value[0] })}
              max={100}
              min={0}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-blue-300">
              <span>Stay in current area</span>
              <span>Open to anywhere globally</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center p-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-400/30">
        <h3 className="text-xl font-bold text-white mb-2">🎉 Almost Ready!</h3>
        <p className="text-blue-100">
          You're about to experience what your different futures could look like. 
          We'll create personalized life simulations based on everything you've shared.
        </p>
      </div>
    </div>
  );
};

export default FutureAspirations;
