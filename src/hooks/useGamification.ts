
import { useState, useEffect } from 'react';
import { Achievement, UserStats, Milestone } from '@/types/gamification';
import { toast } from '@/hooks/use-toast';

const defaultStats: UserStats = {
  totalPoints: 0,
  level: 1,
  currentStreak: 0,
  longestStreak: 0,
  scenariosExplored: 0,
  mentorConnections: 0,
  communityPosts: 0,
  achievementsUnlocked: 0,
  lastActiveDate: new Date()
};

const achievements: Achievement[] = [
  // Explorer Achievements
  {
    id: 'deep-diver',
    title: 'Deep Diver',
    description: 'Thoroughly explore 5 different life scenarios',
    category: 'explorer',
    icon: '🏊‍♂️',
    points: 100,
    isUnlocked: false,
    progress: 0,
    maxProgress: 5,
    requirements: ['Explore 5 scenarios completely']
  },
  {
    id: 'reality-checker',
    title: 'Reality Checker',
    description: 'Complete 10 challenging scenario exercises',
    category: 'explorer',
    icon: '🔍',
    points: 150,
    isUnlocked: false,
    progress: 0,
    maxProgress: 10,
    requirements: ['Complete challenging reality simulations']
  },
  {
    id: 'perspective-seeker',
    title: 'Perspective Seeker',
    description: 'Connect with mentors from 3 different career backgrounds',
    category: 'explorer',
    icon: '🌍',
    points: 200,
    isUnlocked: false,
    progress: 0,
    maxProgress: 3,
    requirements: ['Connect with diverse mentors']
  },
  {
    id: 'decision-maker',
    title: 'Decision Maker',
    description: 'Use comparison tools to analyze 5 scenario pairs',
    category: 'explorer',
    icon: '⚖️',
    points: 120,
    isUnlocked: false,
    progress: 0,
    maxProgress: 5,
    requirements: ['Use advanced comparison features']
  },
  // Growth Achievements
  {
    id: 'skill-builder',
    title: 'Skill Builder',
    description: 'Complete 5 recommended skill development activities',
    category: 'growth',
    icon: '🎯',
    points: 180,
    isUnlocked: false,
    progress: 0,
    maxProgress: 5,
    requirements: ['Engage with skill development resources']
  },
  {
    id: 'network-expander',
    title: 'Network Expander',
    description: 'Make meaningful connections with 10 mentors or peers',
    category: 'growth',
    icon: '🤝',
    points: 250,
    isUnlocked: false,
    progress: 0,
    maxProgress: 10,
    requirements: ['Build your professional network']
  },
  {
    id: 'goal-setter',
    title: 'Goal Setter',
    description: 'Create and track 5 specific future milestones',
    category: 'growth',
    icon: '🎯',
    points: 160,
    isUnlocked: false,
    progress: 0,
    maxProgress: 5,
    requirements: ['Set concrete goals for your future']
  },
  {
    id: 'action-taker',
    title: 'Action Taker',
    description: 'Implement 3 real-world changes based on insights',
    category: 'growth',
    icon: '🚀',
    points: 300,
    isUnlocked: false,
    progress: 0,
    maxProgress: 3,
    requirements: ['Take concrete steps towards your goals']
  },
  // Community Achievements
  {
    id: 'mentor',
    title: 'Mentor',
    description: 'Help 5 other users through their decision process',
    category: 'community',
    icon: '👨‍🏫',
    points: 220,
    isUnlocked: false,
    progress: 0,
    maxProgress: 5,
    requirements: ['Guide others in their journey']
  },
  {
    id: 'story-sharer',
    title: 'Story Sharer',
    description: 'Share 3 experiences to help other users',
    category: 'community',
    icon: '📖',
    points: 140,
    isUnlocked: false,
    progress: 0,
    maxProgress: 3,
    requirements: ['Contribute your experiences']
  },
  {
    id: 'group-leader',
    title: 'Group Leader',
    description: 'Organize or lead 2 community activities',
    category: 'community',
    icon: '👑',
    points: 280,
    isUnlocked: false,
    progress: 0,
    maxProgress: 2,
    requirements: ['Take leadership in the community']
  },
  {
    id: 'connector',
    title: 'Connector',
    description: 'Facilitate 5 introductions between users',
    category: 'community',
    icon: '🔗',
    points: 200,
    isUnlocked: false,
    progress: 0,
    maxProgress: 5,
    requirements: ['Help others connect']
  }
];

export const useGamification = () => {
  const [userStats, setUserStats] = useState<UserStats>(defaultStats);
  const [userAchievements, setUserAchievements] = useState<Achievement[]>(achievements);
  const [milestones, setMilestones] = useState<Milestone[]>([]);

  const updateStats = (statUpdate: Partial<UserStats>) => {
    setUserStats(prev => {
      const newStats = { ...prev, ...statUpdate };
      newStats.level = Math.floor(newStats.totalPoints / 500) + 1;
      return newStats;
    });
  };

  const checkAchievements = () => {
    setUserAchievements(prev => {
      return prev.map(achievement => {
        if (!achievement.isUnlocked && achievement.progress >= achievement.maxProgress) {
          toast({
            title: "🎉 Achievement Unlocked!",
            description: `${achievement.icon} ${achievement.title} - ${achievement.description}`,
          });
          updateStats({ 
            totalPoints: userStats.totalPoints + achievement.points,
            achievementsUnlocked: userStats.achievementsUnlocked + 1
          });
          return { ...achievement, isUnlocked: true, unlockedAt: new Date() };
        }
        return achievement;
      });
    });
  };

  const trackAction = (actionType: string, value = 1) => {
    console.log(`Tracking action: ${actionType} with value: ${value}`);
    
    setUserAchievements(prev => {
      return prev.map(achievement => {
        let newProgress = achievement.progress;
        
        // Update progress based on action type
        switch (actionType) {
          case 'scenario_explored':
            if (achievement.id === 'deep-diver') newProgress = Math.min(achievement.maxProgress, newProgress + value);
            break;
          case 'challenge_completed':
            if (achievement.id === 'reality-checker') newProgress = Math.min(achievement.maxProgress, newProgress + value);
            break;
          case 'mentor_connected':
            if (achievement.id === 'perspective-seeker' || achievement.id === 'network-expander') {
              newProgress = Math.min(achievement.maxProgress, newProgress + value);
            }
            break;
          case 'comparison_used':
            if (achievement.id === 'decision-maker') newProgress = Math.min(achievement.maxProgress, newProgress + value);
            break;
          case 'skill_developed':
            if (achievement.id === 'skill-builder') newProgress = Math.min(achievement.maxProgress, newProgress + value);
            break;
          case 'goal_created':
            if (achievement.id === 'goal-setter') newProgress = Math.min(achievement.maxProgress, newProgress + value);
            break;
          case 'action_implemented':
            if (achievement.id === 'action-taker') newProgress = Math.min(achievement.maxProgress, newProgress + value);
            break;
          case 'user_helped':
            if (achievement.id === 'mentor') newProgress = Math.min(achievement.maxProgress, newProgress + value);
            break;
          case 'story_shared':
            if (achievement.id === 'story-sharer') newProgress = Math.min(achievement.maxProgress, newProgress + value);
            break;
          case 'activity_organized':
            if (achievement.id === 'group-leader') newProgress = Math.min(achievement.maxProgress, newProgress + value);
            break;
          case 'introduction_made':
            if (achievement.id === 'connector') newProgress = Math.min(achievement.maxProgress, newProgress + value);
            break;
        }
        
        return { ...achievement, progress: newProgress };
      });
    });
    
    setTimeout(checkAchievements, 100);
  };

  const addMilestone = (milestone: Omit<Milestone, 'id'>) => {
    const newMilestone: Milestone = {
      ...milestone,
      id: Date.now().toString(),
    };
    setMilestones(prev => [...prev, newMilestone]);
    trackAction('goal_created');
  };

  const completeMilestone = (milestoneId: string) => {
    setMilestones(prev => 
      prev.map(milestone => 
        milestone.id === milestoneId 
          ? { ...milestone, isCompleted: true, completedAt: new Date() }
          : milestone
      )
    );
    updateStats({ totalPoints: userStats.totalPoints + 50 });
    trackAction('action_implemented');
  };

  useEffect(() => {
    checkAchievements();
  }, [userAchievements]);

  return {
    userStats,
    userAchievements,
    milestones,
    trackAction,
    addMilestone,
    completeMilestone,
    updateStats
  };
};
