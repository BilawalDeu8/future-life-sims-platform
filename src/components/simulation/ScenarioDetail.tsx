import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, Calendar, Eye, Gamepad2, DollarSign } from "lucide-react";
import DayInLifeSimulator from "./DayInLifeSimulator";
import LifeSnapshotsGallery from "./LifeSnapshotsGallery";
import RealityChallenges from "./RealityChallenges";
import FinancialDashboard from "../financial/FinancialDashboard";
import CareerTimeline from "../timeline/CareerTimeline";

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

interface ScenarioDetailProps {
  scenario: LifeScenario;
  onBack: () => void;
}

type ExplorationMode = 'overview' | 'dayInLife' | 'lifeSnapshots' | 'challenges' | 'financial' | 'timeline';

const ScenarioDetail: React.FC<ScenarioDetailProps> = ({ scenario, onBack }) => {
  const [currentMode, setCurrentMode] = useState<ExplorationMode>('overview');

  const renderCurrentMode = () => {
    switch (currentMode) {
      case 'timeline':
        return <CareerTimeline scenario={scenario} onBack={() => setCurrentMode('overview')} />;
      case 'dayInLife':
        return <DayInLifeSimulator scenario={scenario} onBack={() => setCurrentMode('overview')} />;
      case 'lifeSnapshots':
        return <LifeSnapshotsGallery scenario={scenario} onBack={() => setCurrentMode('overview')} />;
      case 'challenges':
        return <RealityChallenges scenario={scenario} onBack={() => setCurrentMode('overview')} />;
      case 'financial':
        return <FinancialDashboard scenario={scenario} onBack={() => setCurrentMode('overview')} />;
      default:
        return (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <img 
                src={`https://images.unsplash.com/${scenario.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80`}
                alt={scenario.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <h1 className="text-5xl font-bold text-white mb-4">{scenario.title}</h1>
                <p className="text-2xl text-blue-200 mb-2">{scenario.career}</p>
                <p className="text-lg text-gray-300">{scenario.description}</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold mb-2 text-purple-300">Living Situation</h3>
                <p className="text-gray-300">{scenario.livingSpace}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold mb-2 text-blue-300">Social Life</h3>
                <p className="text-gray-300">{scenario.socialLife}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold mb-2 text-pink-300">Lifestyle</h3>
                <p className="text-gray-300">{scenario.lifestyle}</p>
              </div>
            </div>

            {/* Exploration Modes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <button 
                onClick={() => setCurrentMode('timeline')}
                className="group bg-gradient-to-br from-indigo-600/80 to-purple-600/80 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:from-indigo-500/80 hover:to-purple-500/80 transition-all duration-300 hover:scale-105 text-left"
              >
                <Calendar className="h-12 w-12 text-white mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-white mb-2">Life Timeline</h3>
                <p className="text-indigo-100 text-sm">Experience your career journey year by year</p>
              </button>

              <button 
                onClick={() => setCurrentMode('dayInLife')}
                className="group bg-gradient-to-br from-purple-600/80 to-blue-600/80 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:from-purple-500/80 hover:to-blue-500/80 transition-all duration-300 hover:scale-105 text-left"
              >
                <Play className="h-12 w-12 text-white mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-white mb-2">Day in the Life</h3>
                <p className="text-blue-100 text-sm">Experience a typical day from wake up to bedtime</p>
              </button>

              <button 
                onClick={() => setCurrentMode('lifeSnapshots')}
                className="group bg-gradient-to-br from-pink-600/80 to-purple-600/80 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:from-pink-500/80 hover:to-purple-500/80 transition-all duration-300 hover:scale-105 text-left"
              >
                <Eye className="h-12 w-12 text-white mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-white mb-2">Life Snapshots</h3>
                <p className="text-pink-100 text-sm">See your life 1, 5, and 10 years from now</p>
              </button>

              <button 
                onClick={() => setCurrentMode('challenges')}
                className="group bg-gradient-to-br from-orange-600/80 to-red-600/80 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:from-orange-500/80 hover:to-red-500/80 transition-all duration-300 hover:scale-105 text-left"
              >
                <Gamepad2 className="h-12 w-12 text-white mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-white mb-2">Reality Challenges</h3>
                <p className="text-orange-100 text-sm">Navigate real obstacles and decisions</p>
              </button>

              <button 
                onClick={() => setCurrentMode('financial')}
                className="group bg-gradient-to-br from-green-600/80 to-emerald-600/80 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:from-green-500/80 hover:to-emerald-500/80 transition-all duration-300 hover:scale-105 text-left"
              >
                <DollarSign className="h-12 w-12 text-white mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-white mb-2">Financial Reality</h3>
                <p className="text-green-100 text-sm">Explore budgets, investments, and financial planning</p>
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Scenarios
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {renderCurrentMode()}
      </div>
    </div>
  );
};

export default ScenarioDetail;
