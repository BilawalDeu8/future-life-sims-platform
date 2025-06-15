
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Settings, Target, MapPin, TrendingUp } from "lucide-react";
import { PersonalizationProfile } from '@/types/dataIntegration';
import { usePersonalization } from '@/hooks/usePersonalization';

interface PersonalizationWidgetProps {
  userId?: string;
  isExpanded?: boolean;
  onToggleExpanded?: () => void;
}

const PersonalizationWidget: React.FC<PersonalizationWidgetProps> = ({
  userId,
  isExpanded = false,
  onToggleExpanded
}) => {
  const { profile, updateProfile, isLoading } = usePersonalization(userId);
  const [localProfile, setLocalProfile] = useState<Partial<PersonalizationProfile>>(profile || {});

  const handleSaveChanges = async () => {
    await updateProfile(localProfile);
  };

  if (!profile) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-6 text-center">
          <Settings className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-300">Personalization not available</p>
        </CardContent>
      </Card>
    );
  }

  if (!isExpanded) {
    return (
      <Card className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm border-white/20 cursor-pointer" onClick={onToggleExpanded}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Target className="h-5 w-5 text-purple-400 mr-2" />
              <span className="text-white font-medium">Personalization</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="border-purple-400 text-purple-300">
                Level {Math.floor(profile.engagementLevel / 10)}
              </Badge>
              <Settings className="h-4 w-4 text-purple-400" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-white">
          <div className="flex items-center">
            <Target className="h-5 w-5 mr-2 text-purple-400" />
            Personalization Settings
          </div>
          <Button variant="ghost" size="sm" onClick={onToggleExpanded}>
            <Settings className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Priority Weights */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white">What matters most to you?</h4>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-blue-200">Work-Life Balance</span>
                <span className="text-white">{localProfile.workLifeBalanceWeight || profile.workLifeBalanceWeight}%</span>
              </div>
              <Slider
                value={[localProfile.workLifeBalanceWeight || profile.workLifeBalanceWeight]}
                onValueChange={(value) => setLocalProfile(prev => ({ ...prev, workLifeBalanceWeight: value[0] }))}
                max={100}
                step={5}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-green-200">Salary Potential</span>
                <span className="text-white">{localProfile.salaryWeight || profile.salaryWeight}%</span>
              </div>
              <Slider
                value={[localProfile.salaryWeight || profile.salaryWeight]}
                onValueChange={(value) => setLocalProfile(prev => ({ ...prev, salaryWeight: value[0] }))}
                max={100}
                step={5}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-purple-200">Growth Opportunities</span>
                <span className="text-white">{localProfile.growthWeight || profile.growthWeight}%</span>
              </div>
              <Slider
                value={[localProfile.growthWeight || profile.growthWeight]}
                onValueChange={(value) => setLocalProfile(prev => ({ ...prev, growthWeight: value[0] }))}
                max={100}
                step={5}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-yellow-200">Job Security</span>
                <span className="text-white">{localProfile.stabilityWeight || profile.stabilityWeight}%</span>
              </div>
              <Slider
                value={[localProfile.stabilityWeight || profile.stabilityWeight]}
                onValueChange={(value) => setLocalProfile(prev => ({ ...prev, stabilityWeight: value[0] }))}
                max={100}
                step={5}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Risk Tolerance */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Risk Tolerance</h4>
          <div className="flex space-x-2">
            {['low', 'medium', 'high'].map((risk) => (
              <Button
                key={risk}
                variant={
                  (localProfile.riskTolerance || profile.riskTolerance) === risk 
                    ? "default" 
                    : "outline"
                }
                onClick={() => setLocalProfile(prev => ({ ...prev, riskTolerance: risk as any }))}
                className={
                  (localProfile.riskTolerance || profile.riskTolerance) === risk 
                    ? "bg-purple-600" 
                    : "border-white/30 text-white hover:bg-white/10"
                }
              >
                {risk.charAt(0).toUpperCase() + risk.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Engagement Stats */}
        <div className="bg-white/5 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-3">Your Journey</h4>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-purple-400">{profile.engagementLevel}</div>
              <div className="text-sm text-gray-300">Engagement Score</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">{profile.completedScenarios.length}</div>
              <div className="text-sm text-gray-300">Scenarios Explored</div>
            </div>
          </div>
        </div>

        <Button 
          onClick={handleSaveChanges}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          {isLoading ? 'Saving...' : 'Save Preferences'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PersonalizationWidget;
