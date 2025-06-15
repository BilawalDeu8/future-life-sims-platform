
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Achievement } from '@/types/gamification';
import { Trophy, Clock } from 'lucide-react';

interface AchievementCardProps {
  achievement: Achievement;
  isCompact?: boolean;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement, isCompact = false }) => {
  const progressPercentage = (achievement.progress / achievement.maxProgress) * 100;
  
  const categoryColors = {
    explorer: 'bg-blue-600',
    growth: 'bg-green-600',
    community: 'bg-purple-600'
  };

  if (isCompact) {
    return (
      <div className={`flex items-center space-x-3 p-3 rounded-lg ${achievement.isUnlocked ? 'bg-white/10' : 'bg-white/5'} border border-white/20`}>
        <div className="text-2xl">{achievement.icon}</div>
        <div className="flex-1">
          <h4 className={`font-semibold ${achievement.isUnlocked ? 'text-white' : 'text-gray-400'}`}>
            {achievement.title}
          </h4>
          <Progress value={progressPercentage} className="h-2 mt-1" />
        </div>
        <div className="text-right">
          <div className={`text-sm font-bold ${achievement.isUnlocked ? 'text-yellow-400' : 'text-gray-400'}`}>
            {achievement.points} pts
          </div>
          <div className="text-xs text-gray-500">
            {achievement.progress}/{achievement.maxProgress}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className={`${achievement.isUnlocked ? 'bg-white/10 border-yellow-500/50' : 'bg-white/5 border-white/20'} backdrop-blur-sm transition-all duration-300 hover:scale-105`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="text-4xl">{achievement.icon}</div>
            <div>
              <h3 className={`text-lg font-bold ${achievement.isUnlocked ? 'text-white' : 'text-gray-400'}`}>
                {achievement.title}
              </h3>
              <Badge className={`${categoryColors[achievement.category]} text-white`}>
                {achievement.category.charAt(0).toUpperCase() + achievement.category.slice(1)}
              </Badge>
            </div>
          </div>
          {achievement.isUnlocked && (
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-yellow-400" />
              <span className="text-yellow-400 font-bold">{achievement.points} pts</span>
            </div>
          )}
        </div>

        <p className={`text-sm mb-4 ${achievement.isUnlocked ? 'text-gray-300' : 'text-gray-500'}`}>
          {achievement.description}
        </p>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Progress</span>
            <span className={achievement.isUnlocked ? 'text-green-400' : 'text-gray-400'}>
              {achievement.progress}/{achievement.maxProgress}
            </span>
          </div>
          
          <Progress value={progressPercentage} className="h-3" />
          
          {achievement.isUnlocked && achievement.unlockedAt && (
            <div className="flex items-center text-xs text-gray-400">
              <Clock className="h-3 w-3 mr-1" />
              Unlocked {achievement.unlockedAt.toLocaleDateString()}
            </div>
          )}
        </div>

        {!achievement.isUnlocked && (
          <div className="mt-4 space-y-2">
            <h4 className="text-sm font-semibold text-gray-400">Requirements:</h4>
            <ul className="text-xs text-gray-500 space-y-1">
              {achievement.requirements.map((req, index) => (
                <li key={index} className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-gray-500 rounded-full mr-2"></div>
                  {req}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AchievementCard;
