
export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'explorer' | 'growth' | 'community';
  icon: string;
  points: number;
  isUnlocked: boolean;
  unlockedAt?: Date;
  progress: number;
  maxProgress: number;
  requirements: string[];
}

export interface UserStats {
  totalPoints: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  scenariosExplored: number;
  mentorConnections: number;
  communityPosts: number;
  achievementsUnlocked: number;
  lastActiveDate: Date;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  targetDate: Date;
  isCompleted: boolean;
  completedAt?: Date;
  category: string;
  progress: number;
  maxProgress: number;
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  avatar: string;
  totalPoints: number;
  level: number;
  rank: number;
  achievements: Achievement[];
}
