
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { OnboardingData } from "@/pages/Onboarding";
import { MapPin, GraduationCap, DollarSign, Home, Calendar } from "lucide-react";

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

  const ageRanges = [
    { label: "16-20", value: 18 },
    { label: "21-25", value: 23 },
    { label: "26-30", value: 28 },
    { label: "31-35", value: 33 },
    { label: "36-40", value: 38 },
    { label: "41-45", value: 43 },
    { label: "46-50", value: 48 },
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

      {/* Age Selection */}
      <Card className="bg-white/5 border-white/20">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
              <Calendar className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <Label className="text-white text-lg font-semibold">Age Range</Label>
              <p className="text-blue-200 text-sm">Select your current age range</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {ageRanges.map((range) => (
              <Button
                key={range.label}
                variant={data.personalFoundation.age === range.value ? "default" : "outline"}
                onClick={() => updateData('personalFoundation', { age: range.value })}
                className={`p-4 h-auto flex flex-col ${
                  data.personalFoundation.age === range.value
                    ? 'bg-blue-600 text-white hover:bg-blue-700 border-blue-500'
                    : 'border-white/20 bg-white/5 text-blue-100 hover:border-blue-400/50 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="text-lg font-semibold">{range.label}</span>
                <span className="text-xs opacity-80">years</span>
              </Button>
            ))}
          </div>
          <div className="mt-4">
            <Label className="text-white text-sm">Or enter exact age:</Label>
            <Input
              type="number"
              min="16"
              max="60"
              value={data.personalFoundation.age}
              onChange={(e) => updateData('personalFoundation', { age: parseInt(e.target.value) || 22 })}
              className="mt-2 bg-white/10 border-white/20 text-white placeholder:text-blue-300 max-w-32"
              placeholder="Age"
            />
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
            placeholder="e.g., Bangalore, India or Mumbai, India"
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
