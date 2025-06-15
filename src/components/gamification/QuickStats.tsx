
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Star, Target, Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGamificationContext } from './GamificationProvider';

const QuickStats: React.FC = () => {
  const navigate = useNavigate();
  const { userStats, userAchievements } = useGamificationContext();
  
  const recentAchievements = userAchievements
    .filter(a => a.isUnlocked)
    .sort((a, b) => (b.unlockedAt?.getTime() || 0) - (a.unlockedAt?.getTime() || 0))
    .slice(0, 3);

  return (
    <Card className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm border-white/20">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <Trophy className="h-5 w-5 mr-2 text-yellow-400" />
            Your Progress
          </h3>
          <Button
            onClick={() => navigate('/achievements')}
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 text-sm"
          >
            View All
          </Button>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Star className="h-4 w-4 text-purple-400" />
            </div>
            <div className="text-lg font-bold text-white">{userStats.level}</div>
            <div className="text-xs text-gray-400">Level</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Trophy className="h-4 w-4 text-yellow-400" />
            </div>
            <div className="text-lg font-bold text-white">{userStats.totalPoints}</div>
            <div className="text-xs text-gray-400">Points</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Target className="h-4 w-4 text-green-400" />
            </div>
            <div className="text-lg font-bold text-white">{userStats.achievementsUnlocked}</div>
            <div className="text-xs text-gray-400">Badges</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Flame className="h-4 w-4 text-orange-400" />
            </div>
            <div className="text-lg font-bold text-white">{userStats.currentStreak}</div>
            <div className="text-xs text-gray-400">Streak</div>
          </div>
        </div>

        {recentAchievements.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">Recent Achievements</h4>
            <div className="space-y-1">
              {recentAchievements.map(achievement => (
                <div key={achievement.id} className="flex items-center text-sm bg-white/5 rounded p-2">
                  <span className="text-lg mr-2">{achievement.icon}</span>
                  <span className="text-white font-medium">{achievement.title}</span>
                  <span className="ml-auto text-yellow-400 text-xs">+{achievement.points} pts</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuickStats;
