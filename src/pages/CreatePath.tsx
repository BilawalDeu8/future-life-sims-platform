
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Plus, Sparkles } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import CustomCareerForm from "@/components/timeline/CustomCareerForm";

interface Career {
  id: string;
  title: string;
  category: string;
  salaryRange: string;
  growthPotential: number;
  workLifeBalance: number;
  description: string;
}

const CreatePath = () => {
  const navigate = useNavigate();
  const [showCustomForm, setShowCustomForm] = useState(false);

  const handleCareerCreated = (career: Career) => {
    console.log('Career created:', career);
    // Navigate to timeline with the created career
    navigate('/timeline', { state: { customCareer: career } });
  };

  const handleCancel = () => {
    setShowCustomForm(false);
  };

  if (showCustomForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div className="sticky top-0 z-20 bg-black/20 backdrop-blur-sm border-b border-white/10">
          <div className="max-w-full px-4 py-4">
            <Button
              variant="ghost"
              onClick={() => setShowCustomForm(false)}
              className="text-white hover:bg-white/20 border border-white/30 bg-white/10"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Path Creation
            </Button>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <CustomCareerForm 
            onCareerCreated={handleCareerCreated}
            onCancel={handleCancel}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-full px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/simulation')}
            className="text-white hover:bg-white/20 border border-white/30 bg-white/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Simulation
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Create Your Custom Life Path
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            Design a personalized career journey tailored to your dreams
          </p>
          <p className="text-sm text-blue-200">
            Build your unique path with real-world data and personalized insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Quick Path Builder */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:scale-105 transition-all duration-300 cursor-pointer group">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Sparkles className="h-6 w-6 mr-3 text-purple-400" />
                AI-Assisted Path Builder
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">
                Let our AI help you create a personalized career path based on your interests, skills, and goals.
              </p>
              <ul className="text-sm text-blue-200 space-y-1">
                <li>• Personalized career recommendations</li>
                <li>• Real-world salary and market data</li>
                <li>• Location-based insights</li>
                <li>• Timeline visualization</li>
              </ul>
              <Button 
                onClick={() => setShowCustomForm(true)}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white mt-4"
              >
                Start Building
              </Button>
            </CardContent>
          </Card>

          {/* Manual Path Creation */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:scale-105 transition-all duration-300 cursor-pointer group">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Plus className="h-6 w-6 mr-3 text-green-400" />
                Manual Path Creation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">
                Take full control and manually design every aspect of your career journey.
              </p>
              <ul className="text-sm text-blue-200 space-y-1">
                <li>• Complete customization</li>
                <li>• Add your own milestones</li>
                <li>• Set custom salary progression</li>
                <li>• Define life decisions</li>
              </ul>
              <Button 
                onClick={() => navigate('/timeline')}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white mt-4"
              >
                Create Manually
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Additional Options */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Need Inspiration?</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={() => navigate('/simulation')}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/20"
            >
              Browse Sample Paths
            </Button>
            <Button
              onClick={() => navigate('/community')}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/20"
            >
              See Community Paths
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePath;
