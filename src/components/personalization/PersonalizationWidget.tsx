
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { X, Settings, Brain, Target } from "lucide-react";
import { PersonalizationProfile } from '@/types/dataIntegration';

interface PersonalizationWidgetProps {
  profile: PersonalizationProfile | null;
  onUpdateProfile: (updates: Partial<PersonalizationProfile>) => void;
  onClose: () => void;
}

interface LocalProfileState {
  workLifeBalanceWeight: number;
  salaryWeight: number;
  growthWeight: number;
  stabilityWeight: number;
  riskTolerance: 'low' | 'medium' | 'high';
  preferredLocations: string[];
  careerInterests: string[];
}

const PersonalizationWidget: React.FC<PersonalizationWidgetProps> = ({
  profile,
  onUpdateProfile,
  onClose
}) => {
  const [localProfile, setLocalProfile] = useState<LocalProfileState>(profile || {
    workLifeBalanceWeight: 50,
    salaryWeight: 30,
    growthWeight: 15,
    stabilityWeight: 5,
    riskTolerance: 'medium' as const,
    preferredLocations: [],
    careerInterests: []
  });

  const handleWeightChange = (key: keyof LocalProfileState, value: number[]) => {
    setLocalProfile(prev => ({ ...prev, [key]: value[0] }));
  };

  const handleSave = () => {
    onUpdateProfile(localProfile);
    onClose();
  };

  const addLocation = (location: string) => {
    if (location && !localProfile.preferredLocations?.includes(location)) {
      setLocalProfile(prev => ({
        ...prev,
        preferredLocations: [...(prev.preferredLocations || []), location]
      }));
    }
  };

  const removeLocation = (location: string) => {
    setLocalProfile(prev => ({
      ...prev,
      preferredLocations: prev.preferredLocations?.filter(l => l !== location) || []
    }));
  };

  const popularLocations = ["San Francisco", "New York", "Austin", "Seattle", "Denver", "Remote"];
  const careerOptions = ["Technology", "Finance", "Creative", "Healthcare", "Education", "Consulting"];

  return (
    <Card className="bg-black/90 backdrop-blur-sm border-purple-500/50 text-white">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="flex items-center text-lg">
          <Brain className="h-5 w-5 mr-2 text-purple-400" />
          AI Personalization
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-300 hover:text-white hover:bg-white/10">
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Priority Weights */}
        <div>
          <h3 className="text-sm font-semibold text-purple-300 mb-3 flex items-center">
            <Target className="h-4 w-4 mr-2" />
            What matters most to you?
          </h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span>Work-Life Balance</span>
                <span>{localProfile.workLifeBalanceWeight}%</span>
              </div>
              <Slider
                value={[localProfile.workLifeBalanceWeight || 50]}
                onValueChange={(value) => handleWeightChange('workLifeBalanceWeight', value)}
                max={100}
                step={5}
                className="w-full"
              />
            </div>
            
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span>Salary Growth</span>
                <span>{localProfile.salaryWeight}%</span>
              </div>
              <Slider
                value={[localProfile.salaryWeight || 30]}
                onValueChange={(value) => handleWeightChange('salaryWeight', value)}
                max={100}
                step={5}
                className="w-full"
              />
            </div>
            
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span>Career Growth</span>
                <span>{localProfile.growthWeight}%</span>
              </div>
              <Slider
                value={[localProfile.growthWeight || 15]}
                onValueChange={(value) => handleWeightChange('growthWeight', value)}
                max={100}
                step={5}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Risk Tolerance */}
        <div>
          <h3 className="text-sm font-semibold text-blue-300 mb-3">Risk Tolerance</h3>
          <div className="flex space-x-2">
            {(['low', 'medium', 'high'] as const).map((risk) => (
              <Button
                key={risk}
                variant={localProfile.riskTolerance === risk ? "default" : "outline"}
                size="sm"
                onClick={() => setLocalProfile(prev => ({ ...prev, riskTolerance: risk }))}
                className={`flex-1 text-xs ${
                  localProfile.riskTolerance === risk 
                    ? "bg-purple-600 text-white hover:bg-purple-700" 
                    : "border-gray-500 text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                {risk.charAt(0).toUpperCase() + risk.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Preferred Locations */}
        <div>
          <h3 className="text-sm font-semibold text-green-300 mb-3">Preferred Locations</h3>
          <div className="flex flex-wrap gap-1 mb-2">
            {localProfile.preferredLocations?.map((location) => (
              <Badge
                key={location}
                variant="secondary"
                className="text-xs cursor-pointer hover:bg-red-500/20 bg-gray-700 text-gray-200"
                onClick={() => removeLocation(location)}
              >
                {location} ×
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-1">
            {popularLocations
              .filter(loc => !localProfile.preferredLocations?.includes(loc))
              .map((location) => (
                <Button
                  key={location}
                  variant="outline"
                  size="sm"
                  onClick={() => addLocation(location)}
                  className="text-xs h-7 border-gray-500 text-gray-300 hover:bg-white/10 hover:text-white"
                >
                  + {location}
                </Button>
              ))}
          </div>
        </div>

        {/* Career Interests */}
        <div>
          <h3 className="text-sm font-semibold text-pink-300 mb-3">Career Interests</h3>
          <div className="flex flex-wrap gap-1">
            {careerOptions.map((career) => (
              <Button
                key={career}
                variant={localProfile.careerInterests?.includes(career) ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  const interests = localProfile.careerInterests || [];
                  const updated = interests.includes(career)
                    ? interests.filter(c => c !== career)
                    : [...interests, career];
                  setLocalProfile(prev => ({ ...prev, careerInterests: updated }));
                }}
                className={`text-xs h-7 ${
                  localProfile.careerInterests?.includes(career)
                    ? "bg-pink-600 text-white hover:bg-pink-700"
                    : "border-gray-500 text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                {career}
              </Button>
            ))}
          </div>
        </div>

        {/* Engagement Level Display */}
        {profile?.engagementLevel !== undefined && (
          <div>
            <h3 className="text-sm font-semibold text-yellow-300 mb-2">Engagement Level</h3>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${profile.engagementLevel}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">
              {profile.engagementLevel < 20 ? 'Getting Started' :
               profile.engagementLevel < 50 ? 'Active Explorer' :
               profile.engagementLevel < 80 ? 'Engaged User' : 'Power User'}
            </p>
          </div>
        )}

        <div className="flex space-x-2 pt-2">
          <Button 
            variant="outline" 
            onClick={onClose} 
            className="flex-1 border-gray-500 text-gray-300 hover:bg-white/10 hover:text-white"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
          >
            Save Preferences
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalizationWidget;
