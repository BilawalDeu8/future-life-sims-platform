
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { UserStats } from '@/types/gamification';
import { Star, Target, Users, Trophy, Flame, TrendingUp } from 'lucide-react';

interface UserStatsOverviewProps {
  stats: UserStats;
  isCompact?: boolean;
}

const UserStatsOverview: React.FC<UserStatsOverviewProps> = ({ stats, isCompact = false }) => {
  const levelProgress = (stats.totalPoints % 500) / 500 * 100;
  const nextLevelPoints = (stats.level * 500) - stats.totalPoints;

  if (isCompact) {
    return (
      <div className="flex items-center space-x-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm rounded-lg p-4 border border-white/20">
        <div className="text-center">
          <div className="text-2xl font-bold text-white">{stats.level}</div>
          <div className="text-xs text-gray-300">Level</div>
        </div>
        <div className="flex-1">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-300">Progress to Level {stats.level + 1}</span>
            <span className="text-purple-300">{nextLevelPoints} pts to go</span>
          </div>
          <Progress value={levelProgress} className="h-2" />
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-yellow-400">{stats.totalPoints}</div>
          <div className="text-xs text-gray-300">Points</div>
        </div>
      </div>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-sm border-white/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center">
            <Star className="h-6 w-6 mr-2 text-yellow-400" />
            Your Progress
          </CardTitle>
          <Badge className="bg-purple-600 text-white text-lg px-3 py-1">
            Level {stats.level}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Level Progress */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-300">Progress to Level {stats.level + 1}</span>
            <span className="text-purple-300">{nextLevelPoints} points to go</span>
          </div>
          <Progress value={levelProgress} className="h-3" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="text-center bg-white/10 rounded-lg p-3">
            <Trophy className="h-6 w-6 mx-auto text-yellow-400 mb-1" />
            <div className="text-xl font-bold text-white">{stats.totalPoints}</div>
            <div className="text-xs text-gray-300">Total Points</div>
          </div>
          
          <div className="text-center bg-white/10 rounded-lg p-3">
            <Target className="h-6 w-6 mx-auto text-blue-400 mb-1" />
            <div className="text-xl font-bold text-white">{stats.achievementsUnlocked}</div>
            <div className="text-xs text-gray-300">Achievements</div>
          </div>
          
          <div className="text-center bg-white/10 rounded-lg p-3">
            <Flame className="h-6 w-6 mx-auto text-orange-400 mb-1" />
            <div className="text-xl font-bold text-white">{stats.currentStreak}</div>
            <div className="text-xs text-gray-300">Day Streak</div>
          </div>
          
          <div className="text-center bg-white/10 rounded-lg p-3">
            <TrendingUp className="h-6 w-6 mx-auto text-green-400 mb-1" />
            <div className="text-xl font-bold text-white">{stats.scenariosExplored}</div>
            <div className="text-xs text-gray-300">Scenarios</div>
          </div>
          
          <div className="text-center bg-white/10 rounded-lg p-3">
            <Users className="h-6 w-6 mx-auto text-pink-400 mb-1" />
            <div className="text-xl font-bold text-white">{stats.mentorConnections}</div>
            <div className="text-xs text-gray-300">Connections</div>
          </div>
          
          <div className="text-center bg-white/10 rounded-lg p-3">
            <Star className="h-6 w-6 mx-auto text-purple-400 mb-1" />
            <div className="text-xl font-bold text-white">{stats.communityPosts}</div>
            <div className="text-xs text-gray-300">Posts</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserStatsOverview;
