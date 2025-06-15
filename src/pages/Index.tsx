
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Sparkles, Target, Users, TrendingUp, BookOpen, Palette } from 'lucide-react';
import { usePersonalization } from '@/hooks/usePersonalization';
import { useGamification } from '@/hooks/useGamification';
import UserStatsOverview from '@/components/gamification/UserStatsOverview';
import QuickStats from '@/components/gamification/QuickStats';

const Index = () => {
  const navigate = useNavigate();
  const userId = "demo-user"; // In a real app, get from auth
  const { profile, isLoading } = usePersonalization(userId);
  const { stats } = useGamification(userId);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    // Show welcome message for new users
    if (!isLoading && !profile?.hasCompletedOnboarding) {
      setTimeout(() => {
        navigate('/onboarding');
      }, 2000);
    }
  }, [profile, isLoading, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
            Life Path Simulator
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Explore different futures, make informed decisions, and document your real journey through life
          </p>
          
          {/* Quick Stats for existing users */}
          <QuickStats userId={userId} />
        </div>

        {/* Main Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Future Simulation */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:scale-105 transition-all duration-300 cursor-pointer group">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-white">Explore Future Paths</CardTitle>
              <CardDescription className="text-gray-300">
                Simulate different career and lifestyle scenarios
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                onClick={() => navigate('/simulation')}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white group-hover:shadow-lg transition-all"
              >
                Start Simulating
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>

          {/* Life Canvas - NEW FEATURE */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:scale-105 transition-all duration-300 cursor-pointer group relative overflow-hidden">
            <div className="absolute top-2 right-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
              NEW!
            </div>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-white">Life Canvas</CardTitle>
              <CardDescription className="text-gray-300">
                Document your real-life journey in real-time
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-blue-200 mb-4">
                🎨 Interactive timeline • 📸 Photo memories • 📊 Progress insights
              </p>
              <Button 
                onClick={() => navigate('/life-canvas')}
                className="w-full bg-gradient-to-r from-pink-600 to-orange-600 hover:from-pink-700 hover:to-orange-700 text-white group-hover:shadow-lg transition-all"
              >
                Start Documenting
                <Palette className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>

          {/* Career Timeline */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:scale-105 transition-all duration-300 cursor-pointer group">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Target className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-white">Career Timeline</CardTitle>
              <CardDescription className="text-gray-300">
                Experience detailed career progression paths
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                onClick={() => navigate('/timeline')}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white group-hover:shadow-lg transition-all"
              >
                View Timeline
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
            <CardHeader>
              <div className="flex items-center">
                <Users className="h-6 w-6 text-blue-400 mr-3" />
                <CardTitle className="text-xl text-white">Community & Mentorship</CardTitle>
              </div>
              <CardDescription className="text-gray-300">
                Connect with mentors and peers on similar journeys
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate('/community')}
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10"
              >
                Join Community
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
            <CardHeader>
              <div className="flex items-center">
                <TrendingUp className="h-6 w-6 text-green-400 mr-3" />
                <CardTitle className="text-xl text-white">Real-World Data</CardTitle>
              </div>
              <CardDescription className="text-gray-300">
                Get insights from actual career and salary data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate('/real-world-data')}
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10"
              >
                Explore Data
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* User Stats Overview */}
        {stats && (
          <div className="mb-16">
            <UserStatsOverview 
              userId={userId} 
              onToggle={() => setShowStats(!showStats)}
              isExpanded={showStats}
            />
          </div>
        )}

        {/* Getting Started */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Ready to Shape Your Future?</h2>
          <div className="space-x-4">
            <Button 
              onClick={() => navigate('/onboarding')}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              Get Started
            </Button>
            <Button 
              onClick={() => navigate('/simulation')}
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              Try Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
