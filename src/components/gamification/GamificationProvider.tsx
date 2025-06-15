
import React, { createContext, useContext, ReactNode } from 'react';
import { useGamification } from '@/hooks/useGamification';
import { UserStats, Achievement, Milestone } from '@/types/gamification';

interface GamificationContextType {
  userStats: UserStats;
  userAchievements: Achievement[];
  milestones: Milestone[];
  trackAction: (actionType: string, value?: number) => void;
  addMilestone: (milestone: Omit<Milestone, 'id'>) => void;
  completeMilestone: (milestoneId: string) => void;
  updateStats: (statUpdate: Partial<UserStats>) => void;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export const useGamificationContext = () => {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamificationContext must be used within a GamificationProvider');
  }
  return context;
};

interface GamificationProviderProps {
  children: ReactNode;
}

export const GamificationProvider: React.FC<GamificationProviderProps> = ({ children }) => {
  const gamificationData = useGamification();

  return (
    <GamificationContext.Provider value={gamificationData}>
      {children}
    </GamificationContext.Provider>
  );
};
