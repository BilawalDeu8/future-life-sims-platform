
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { OnboardingData } from "@/pages/Onboarding";
import { MapPin, GraduationCap, DollarSign, Home } from "lucide-react";

interface PersonalFoundationProps {
  data: OnboardingData;
  updateData: (section: keyof OnboardingData, data: any) => void;
}

const PersonalFoundation: React.FC<PersonalFoundationProps> = ({ data, updateData }) => {
  const educationOptions = [
    "High School",
    "Some College", 
    "Bachelor's Degree",
    "Master's Degree",
    "PhD/Doctorate"
  ];

  const financialOptions = [
    "Student loans, minimal savings",
    "Some debt, building savings", 
    "Stable income, moderate savings",
    "Good savings, minimal debt",
    "Financially independent"
  ];

  const livingOptions = [
    "Shared apartment with roommates",
    "Studio/1BR apartment alone",
    "Living with family",
    "Shared house with friends",
    "Own place (house/condo)"
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Let's Get to Know You
        </h2>
        <p className="text-blue-100 text-lg">
          These details help us create realistic simulations tailored to your starting point
        </p>
      </div>

      {/* Age Slider */}
      <Card className="bg-white/5 border-white/20">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
              <span className="text-blue-400 font-bold">🎂</span>
            </div>
            <div>
              <Label className="text-white text-lg font-semibold">Current Age</Label>
              <p className="text-blue-200 text-sm">Help us understand your life stage</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="text-center">
              <span className="text-3xl font-bold text-white">{data.personalFoundation.age}</span>
              <span className="text-blue-200 ml-2">years old</span>
            </div>
            <Slider
              value={[data.personalFoundation.age]}
              onValueChange={(value) => updateData('personalFoundation', { age: value[0] })}
              max={30}
              min={16}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-blue-300">
              <span>16</span>
              <span>30</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Education Level */}
      <Card className="bg-white/5 border-white/20">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
              <GraduationCap className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <Label className="text-white text-lg font-semibold">Education Level</Label>
              <p className="text-blue-200 text-sm">Your current educational background</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {educationOptions.map((option) => (
              <button
                key={option}
                onClick={() => updateData('personalFoundation', { education: option })}
                className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                  data.personalFoundation.education === option
                    ? 'border-green-400 bg-green-500/20 text-white'
                    : 'border-white/20 bg-white/5 text-blue-100 hover:border-green-400/50 hover:bg-white/10'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Location */}
      <Card className="bg-white/5 border-white/20">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
              <MapPin className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <Label className="text-white text-lg font-semibold">Current Location</Label>
              <p className="text-blue-200 text-sm">City and state/country you're in now</p>
            </div>
          </div>
          <Input
            value={data.personalFoundation.location}
            onChange={(e) => updateData('personalFoundation', { location: e.target.value })}
            placeholder="e.g., Austin, TX or London, UK"
            className="bg-white/10 border-white/20 text-white placeholder:text-blue-300"
          />
        </CardContent>
      </Card>

      {/* Financial Situation */}
      <Card className="bg-white/5 border-white/20">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center mr-3">
              <DollarSign className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <Label className="text-white text-lg font-semibold">Financial Starting Point</Label>
              <p className="text-blue-200 text-sm">Your current financial situation</p>
            </div>
          </div>
          <div className="space-y-3">
            {financialOptions.map((option) => (
              <button
                key={option}
                onClick={() => updateData('personalFoundation', { financialSituation: option })}
                className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                  data.personalFoundation.financialSituation === option
                    ? 'border-yellow-400 bg-yellow-500/20 text-white'
                    : 'border-white/20 bg-white/5 text-blue-100 hover:border-yellow-400/50 hover:bg-white/10'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Living Situation */}
      <Card className="bg-white/5 border-white/20">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center mr-3">
              <Home className="h-5 w-5 text-pink-400" />
            </div>
            <div>
              <Label className="text-white text-lg font-semibold">Living Preference</Label>
              <p className="text-blue-200 text-sm">How you prefer to live</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {livingOptions.map((option) => (
              <button
                key={option}
                onClick={() => updateData('personalFoundation', { livingPreference: option })}
                className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                  data.personalFoundation.livingPreference === option
                    ? 'border-pink-400 bg-pink-500/20 text-white'
                    : 'border-white/20 bg-white/5 text-blue-100 hover:border-pink-400/50 hover:bg-white/10'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalFoundation;
