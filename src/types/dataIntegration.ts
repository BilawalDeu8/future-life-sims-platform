
export interface SalaryData {
  occupation: string;
  location: string;
  medianSalary: number;
  percentile25: number;
  percentile75: number;
  growthProjection: number;
  source: string;
  lastUpdated: Date;
}

export interface CostOfLivingData {
  city: string;
  state: string;
  housingCostIndex: number;
  groceryCostIndex: number;
  transportationCostIndex: number;
  overallCostIndex: number;
  averageRent1BR: number;
  averageRent2BR: number;
  medianHomePrice: number;
}

export interface JobMarketData {
  occupation: string;
  location: string;
  jobOpenings: number;
  competitionLevel: 'low' | 'medium' | 'high';
  requiredEducation: string[];
  topSkills: string[];
  industryGrowth: number;
  automationRisk: number;
}

export interface PersonalizationProfile {
  userId: string;
  preferredLocations: string[];
  careerInterests: string[];
  riskTolerance: 'low' | 'medium' | 'high';
  workLifeBalanceWeight: number;
  salaryWeight: number;
  growthWeight: number;
  stabilityWeight: number;
  lastUpdated: Date;
  engagementLevel: number;
  completedScenarios: string[];
  behaviorPattern: {
    sessionDuration: number;
    featuresUsed: string[];
    decisionMakingSpeed: 'fast' | 'deliberate' | 'thorough';
  };
}

export interface DataSource {
  name: string;
  type: 'salary' | 'cost_of_living' | 'job_market' | 'housing';
  endpoint: string;
  rateLimitPerDay: number;
  lastFetched: Date;
  isActive: boolean;
}
