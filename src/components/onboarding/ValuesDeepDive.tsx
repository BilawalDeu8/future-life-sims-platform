
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { OnboardingData } from "@/pages/Onboarding";
import { Scale, Compass, Users, MapPin, Plane } from "lucide-react";

interface ValuesDeepDiveProps {
  data: OnboardingData;
  updateData: (section: keyof OnboardingData, data: any) => void;
}

const ValuesDeepDive: React.FC<ValuesDeepDiveProps> = ({ data, updateData }) => {
  const lifestyleLocations = [
    { id: "urban", label: "Urban City Life", desc: "Skyscrapers, nightlife, public transit", emoji: "🏙️" },
    { id: "suburban", label: "Suburban Comfort", desc: "Family neighborhoods, yards, quiet streets", emoji: "🏡" },
    { id: "rural", label: "Rural Peace", desc: "Nature, space, small communities", emoji: "🌾" }
  ];

  const getSliderLabel = (value: number, leftLabel: string, rightLabel: string) => {
    if (value < 30) return leftLabel;
    if (value > 70) return rightLabel;
    return "Balanced";
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
          What Drives You?
        </h2>
        <p className="text-blue-100 text-lg">
          Understanding your core values helps us create futures that truly align with who you are
        </p>
      </div>

      {/* Work-Life Balance */}
      <Card className="bg-white/5 border-white/20">
        <CardContent className="p-6">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
              <Scale className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <Label className="text-white text-lg font-semibold">Work-Life Balance vs Career Advancement</Label>
              <p className="text-blue-200 text-sm">What matters more to you?</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="text-center">
              <span className="text-2xl font-bold text-white">
                {getSliderLabel(data.values.workLifeBalance, "Work-Life Balance", "Career Advancement")}
              </span>
            </div>
            <Slider
              value={[data.values.workLifeBalance]}
              onValueChange={(value) => updateData('values', { workLifeBalance: value[0] })}
              max={100}
              min={0}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-blue-300">
              <span>Time for life outside work</span>
              <span>Climbing the career ladder</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stability vs Adventure */}
      <Card className="bg-white/5 border-white/20">
        <CardContent className="p-6">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
              <Compass className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <Label className="text-white text-lg font-semibold">Stability vs Adventure</Label>
              <p className="text-blue-200 text-sm">Do you prefer predictability or excitement?</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="text-center">
              <span className="text-2xl font-bold text-white">
                {getSliderLabel(data.values.stabilityAdventure, "Stability Focused", "Adventure Seeking")}
              </span>
            </div>
            <Slider
              value={[data.values.stabilityAdventure]}
              onValueChange={(value) => updateData('values', { stabilityAdventure: value[0] })}
              max={100}
              min={0}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-blue-300">
              <span>Predictable, secure path</span>
              <span>Exciting, varied experiences</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Individual vs Team */}
      <Card className="bg-white/5 border-white/20">
        <CardContent className="p-6">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
              <Users className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <Label className="text-white text-lg font-semibold">Individual Achievement vs Team Collaboration</Label>
              <p className="text-blue-200 text-sm">How do you prefer to work and succeed?</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="text-center">
              <span className="text-2xl font-bold text-white">
                {getSliderLabel(data.values.individualTeam, "Individual Focus", "Team Collaboration")}
              </span>
            </div>
            <Slider
              value={[data.values.individualTeam]}
              onValueChange={(value) => updateData('values', { individualTeam: value[0] })}
              max={100}
              min={0}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-blue-300">
              <span>Personal achievements</span>
              <span>Group success</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lifestyle Location */}
      <Card className="bg-white/5 border-white/20">
        <CardContent className="p-6">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center mr-3">
              <MapPin className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <Label className="text-white text-lg font-semibold">Ideal Living Environment</Label>
              <p className="text-blue-200 text-sm">Where do you thrive best?</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {lifestyleLocations.map((location) => (
              <button
                key={location.id}
                onClick={() => updateData('values', { lifestyleLocation: location.id })}
                className={`p-6 rounded-lg border-2 transition-all duration-200 text-center ${
                  data.values.lifestyleLocation === location.id
                    ? 'border-yellow-400 bg-yellow-500/20 text-white'
                    : 'border-white/20 bg-white/5 text-blue-100 hover:border-yellow-400/50 hover:bg-white/10'
                }`}
              >
                <div className="text-3xl mb-2">{location.emoji}</div>
                <div className="font-semibold text-lg mb-1">{location.label}</div>
                <div className="text-sm opacity-80">{location.desc}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Travel vs Roots */}
      <Card className="bg-white/5 border-white/20">
        <CardContent className="p-6">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center mr-3">
              <Plane className="h-5 w-5 text-pink-400" />
            </div>
            <div>
              <Label className="text-white text-lg font-semibold">Travel & Exploration vs Community Roots</Label>
              <p className="text-blue-200 text-sm">Do you want to explore the world or build deep local connections?</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="text-center">
              <span className="text-2xl font-bold text-white">
                {getSliderLabel(data.values.travelImportance, "Community Roots", "World Explorer")}
              </span>
            </div>
            <Slider
              value={[data.values.travelImportance]}
              onValueChange={(value) => updateData('values', { travelImportance: value[0] })}
              max={100}
              min={0}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-blue-300">
              <span>Deep local community</span>
              <span>Travel & new experiences</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ValuesDeepDive;
