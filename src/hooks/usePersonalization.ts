
import { useState, useEffect } from 'react';
import { PersonalizationProfile } from '@/types/dataIntegration';
import { dataIntegrationService } from '@/services/dataIntegrationService';

export const usePersonalization = (userId?: string) => {
  const [profile, setProfile] = useState<PersonalizationProfile | null>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const updateProfile = async (updates: Partial<PersonalizationProfile>) => {
    if (!userId) return;

    setIsLoading(true);
    try {
      await dataIntegrationService.updatePersonalizationProfile({
        ...updates,
        userId,
        lastUpdated: new Date(),
      });
      
      setProfile(prev => prev ? { ...prev, ...updates } : null);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const trackEngagement = async (action: string, value?: number) => {
    if (!userId || !profile) return;

    const newEngagementLevel = Math.min(100, profile.engagementLevel + (value || 1));
    
    await updateProfile({
      engagementLevel: newEngagementLevel,
      behaviorPattern: {
        ...profile.behaviorPattern,
        featuresUsed: [...new Set([...profile.behaviorPattern.featuresUsed, action])],
      },
    });
  };

  const getPersonalizedRecommendations = async () => {
    if (!userId) return;

    setIsLoading(true);
    try {
      const recs = await dataIntegrationService.getPersonalizedRecommendations(userId);
      setRecommendations(recs);
    } catch (error) {
      console.error('Failed to get recommendations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      // Initialize profile with default values if not exists
      const defaultProfile: PersonalizationProfile = {
        userId,
        preferredLocations: [],
        careerInterests: [],
        riskTolerance: 'medium',
        workLifeBalanceWeight: 50,
        salaryWeight: 30,
        growthWeight: 15,
        stabilityWeight: 5,
        lastUpdated: new Date(),
        engagementLevel: 0,
        completedScenarios: [],
        behaviorPattern: {
          sessionDuration: 0,
          featuresUsed: [],
          decisionMakingSpeed: 'deliberate',
        },
      };
      
      setProfile(defaultProfile);
      getPersonalizedRecommendations();
    }
  }, [userId]);

  return {
    profile,
    recommendations,
    isLoading,
    updateProfile,
    trackEngagement,
    getPersonalizedRecommendations,
  };
};
