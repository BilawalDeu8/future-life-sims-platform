
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Trophy, Target, Users, Filter } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useGamification } from '@/hooks/useGamification';
import UserStatsOverview from '@/components/gamification/UserStatsOverview';
import AchievementCard from '@/components/gamification/AchievementCard';
import MilestoneTracker from '@/components/gamification/MilestoneTracker';

const Achievements = () => {
  const navigate = useNavigate();
  const { userStats, userAchievements, milestones, addMilestone, completeMilestone } = useGamification();
  const [filter, setFilter] = useState<'all' | 'explorer' | 'growth' | 'community'>('all');
  const [showCompleted, setShowCompleted] = useState(true);

  const filteredAchievements = userAchievements.filter(achievement => {
    if (filter !== 'all' && achievement.category !== filter) return false;
    if (!showCompleted && achievement.isUnlocked) return false;
    return true;
  });

  const unlockedCount = userAchievements.filter(a => a.isUnlocked).length;
  const totalCount = userAchievements.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            
            <div className="text-center">
              <h1 className="text-2xl font-bold">Achievements & Progress</h1>
              <p className="text-blue-200">{unlockedCount}/{totalCount} achievements unlocked</p>
            </div>

            <div className="flex space-x-2">
              <Button
                variant={showCompleted ? "default" : "outline"}
                onClick={() => setShowCompleted(!showCompleted)}
                className={showCompleted 
                  ? "bg-purple-600" 
                  : "border-white/30 text-white hover:bg-white/10"
                }
              >
                Show Completed
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Stats Overview */}
        <UserStatsOverview stats={userStats} />

        {/* Filter Tabs */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filter Achievements
              </h3>
              <div className="text-sm text-gray-300">
                Showing {filteredAchievements.length} achievements
              </div>
            </div>
            <div className="flex space-x-2">
              {[
                { key: 'all', label: 'All', icon: Trophy },
                { key: 'explorer', label: 'Explorer', icon: Target },
                { key: 'growth', label: 'Growth', icon: TrendingUp },
                { key: 'community', label: 'Community', icon: Users }
              ].map(({ key, label, icon: Icon }) => (
                <Button
                  key={key}
                  variant={filter === key ? "default" : "outline"}
                  onClick={() => setFilter(key as any)}
                  className={filter === key 
                    ? "bg-purple-600" 
                    : "border-white/30 text-white hover:bg-white/10"
                  }
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map(achievement => (
            <AchievementCard 
              key={achievement.id} 
              achievement={achievement}
            />
          ))}
        </div>

        {/* Milestone Tracker */}
        <MilestoneTracker
          milestones={milestones}
          onAddMilestone={addMilestone}
          onCompleteMilestone={completeMilestone}
        />
      </div>
    </div>
  );
};

export default Achievements;
