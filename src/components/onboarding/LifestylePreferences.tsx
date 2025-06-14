
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { OnboardingData } from "@/pages/Onboarding";
import { Clock, Users, Zap, BookOpen, Palette } from "lucide-react";

interface LifestylePreferencesProps {
  data: OnboardingData;
  updateData: (section: keyof OnboardingData, data: any) => void;
}

const LifestylePreferences: React.FC<LifestylePreferencesProps> = ({ data, updateData }) => {
  const scheduleOptions = [
    { id: "early_bird", label: "Early Bird", desc: "Up at sunrise, peak energy in morning", emoji: "🌅" },
    { id: "standard", label: "Standard Schedule", desc: "9-5 rhythm, consistent routine", emoji: "⏰" },
    { id: "night_owl", label: "Night Owl", desc: "Late riser, energized in evening", emoji: "🌙" }
  ];

  const socialOptions = [
    { id: "large_groups", label: "Large Groups", desc: "Parties, networking events, big gatherings", emoji: "🎉" },
    { id: "small_circles", label: "Small Circles", desc: "Close friends, intimate dinners", emoji: "👥" },
    { id: "solo_time", label: "Solo Focus", desc: "Individual activities, quiet time", emoji: "🧘" }
  ];

  const learningStyles = [
    { id: "hands_on", label: "Hands-On Learning", desc: "Learn by doing, practical experience", emoji: "🔨" },
    { id: "collaborative", label: "Collaborative Learning", desc: "Group discussions, team projects", emoji: "👥" },
    { id: "independent", label: "Independent Study", desc: "Self-paced, books, online courses", emoji: "📚" },
    { id: "mentorship", label: "Mentorship", desc: "One-on-one guidance, apprenticeship", emoji: "🎯" }
  ];

  const getSliderLabel = (value: number, leftLabel: string, rightLabel: string) => {
    if (value < 30) return leftLabel;
    if (value > 70) return rightLabel;
    return "Balanced";
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          How Do You Live?
        </h2>
        <p className="text-blue-100 text-lg">
          Your daily rhythms and preferences shape what futures will feel natural to you
        </p>
      </div>

      {/* Daily Schedule */}
      <Card className="bg-white/5 border-white/20">
        <CardContent className="p-6">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
              <Clock className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <Label className="text-white text-lg font-semibold">Ideal Daily Schedule</Label>
              <p className="text-blue-200 text-sm">When are you most productive and energized?</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {scheduleOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => updateData('lifestyle', { dailySchedule: option.id })}
                className={`p-6 rounded-lg border-2 transition-all duration-200 text-center ${
                  data.lifestyle.dailySchedule === option.id
                    ? 'border-blue-400 bg-blue-500/20 text-white'
                    : 'border-white/20 bg-white/5 text-blue-100 hover:border-blue-400/50 hover:bg-white/10'
                }`}
              >
                <div className="text-3xl mb-2">{option.emoji}</div>
                <div className="font-semibold text-lg mb-1">{option.label}</div>
                <div className="text-sm opacity-80">{option.desc}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Social Interaction */}
      <Card className="bg-white/5 border-white/20">
        <CardContent className="p-6">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
              <Users className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <Label className="text-white text-lg font-semibold">Social Interaction Style</Label>
              <p className="text-blue-200 text-sm">How do you prefer to connect with others?</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {socialOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => updateData('lifestyle', { socialInteraction: option.id })}
                className={`p-6 rounded-lg border-2 transition-all duration-200 text-center ${
                  data.lifestyle.socialInteraction === option.id
                    ? 'border-green-400 bg-green-500/20 text-white'
                    : 'border-white/20 bg-white/5 text-blue-100 hover:border-green-400/50 hover:bg-white/10'
                }`}
              >
                <div className="text-3xl mb-2">{option.emoji}</div>
                <div className="font-semibold text-lg mb-1">{option.label}</div>
                <div className="text-sm opacity-80">{option.desc}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stress Tolerance */}
      <Card className="bg-white/5 border-white/20">
        <CardContent className="p-6">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center mr-3">
              <Zap className="h-5 w-5 text-red-400" />
            </div>
            <div>
              <Label className="text-white text-lg font-semibold">Stress Tolerance</Label>
              <p className="text-blue-200 text-sm">How much pressure and uncertainty can you handle?</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="text-center">
              <span className="text-2xl font-bold text-white">
                {getSliderLabel(data.lifestyle.stressTolerance, "Low Stress Preferred", "High Stress Tolerance")}
              </span>
            </div>
            <Slider
              value={[data.lifestyle.stressTolerance]}
              onValueChange={(value) => updateData('lifestyle', { stressTolerance: value[0] })}
              max={100}
              min={0}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-blue-300">
              <span>Calm, predictable environment</span>
              <span>High-pressure, fast-paced</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Style */}
      <Card className="bg-white/5 border-white/20">
        <CardContent className="p-6">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
              <BookOpen className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <Label className="text-white text-lg font-semibold">Learning Style</Label>
              <p className="text-blue-200 text-sm">How do you best acquire new skills and knowledge?</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {learningStyles.map((style) => (
              <button
                key={style.id}
                onClick={() => updateData('lifestyle', { learningStyle: style.id })}
                className={`p-5 rounded-lg border-2 transition-all duration-200 text-left ${
                  data.lifestyle.learningStyle === style.id
                    ? 'border-purple-400 bg-purple-500/20 text-white'
                    : 'border-white/20 bg-white/5 text-blue-100 hover:border-purple-400/50 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-3">{style.emoji}</span>
                  <div className="font-semibold">{style.label}</div>
                </div>
                <div className="text-sm opacity-80">{style.desc}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Creativity vs Analytical */}
      <Card className="bg-white/5 border-white/20">
        <CardContent className="p-6">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center mr-3">
              <Palette className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <Label className="text-white text-lg font-semibold">Creativity vs Analytical Thinking</Label>
              <p className="text-blue-200 text-sm">What type of thinking energizes you most?</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="text-center">
              <span className="text-2xl font-bold text-white">
                {getSliderLabel(data.lifestyle.creativityAnalytical, "Creative Thinker", "Analytical Thinker")}
              </span>
            </div>
            <Slider
              value={[data.lifestyle.creativityAnalytical]}
              onValueChange={(value) => updateData('lifestyle', { creativityAnalytical: value[0] })}
              max={100}
              min={0}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-blue-300">
              <span>Art, design, innovation</span>
              <span>Data, logic, systems</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LifestylePreferences;
