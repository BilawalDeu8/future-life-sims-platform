
import { SalaryData, CostOfLivingData, JobMarketData, PersonalizationProfile } from '@/types/dataIntegration';

class DataIntegrationService {
  private supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  private supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  async fetchSalaryData(occupation: string, location: string): Promise<SalaryData | null> {
    try {
      // Call edge function that securely handles API keys
      const response = await fetch(`${this.supabaseUrl}/functions/v1/fetch-salary-data`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.supabaseKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ occupation, location }),
      });

      if (!response.ok) {
        console.warn('Failed to fetch salary data, using fallback');
        return this.getFallbackSalaryData(occupation, location);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching salary data:', error);
      return this.getFallbackSalaryData(occupation, location);
    }
  }

  async fetchCostOfLivingData(city: string, state: string): Promise<CostOfLivingData | null> {
    try {
      const response = await fetch(`${this.supabaseUrl}/functions/v1/fetch-cost-of-living`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.supabaseKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ city, state }),
      });

      if (!response.ok) {
        return this.getFallbackCostOfLivingData(city, state);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching cost of living data:', error);
      return this.getFallbackCostOfLivingData(city, state);
    }
  }

  async fetchJobMarketData(occupation: string, location: string): Promise<JobMarketData | null> {
    try {
      const response = await fetch(`${this.supabaseUrl}/functions/v1/fetch-job-market`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.supabaseKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ occupation, location }),
      });

      if (!response.ok) {
        return this.getFallbackJobMarketData(occupation, location);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching job market data:', error);
      return this.getFallbackJobMarketData(occupation, location);
    }
  }

  async updatePersonalizationProfile(profile: Partial<PersonalizationProfile>): Promise<void> {
    try {
      await fetch(`${this.supabaseUrl}/functions/v1/update-personalization`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.supabaseKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      });
    } catch (error) {
      console.error('Error updating personalization profile:', error);
    }
  }

  async getPersonalizedRecommendations(userId: string): Promise<any[]> {
    try {
      const response = await fetch(`${this.supabaseUrl}/functions/v1/get-recommendations`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.supabaseKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        return [];
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      return [];
    }
  }

  // Fallback data for when APIs are unavailable
  private getFallbackSalaryData(occupation: string, location: string): SalaryData {
    const baseSalaries: { [key: string]: number } = {
      'software developer': 95000,
      'marketing creative': 75000,
      'financial analyst': 120000,
      'strategy consultant': 100000,
      'registered nurse': 75000,
      'teacher': 65000,
    };

    const locationMultipliers: { [key: string]: number } = {
      'san francisco': 1.4,
      'new york': 1.3,
      'austin': 1.1,
      'denver': 1.05,
      'minneapolis': 1.0,
    };

    const baseKey = occupation.toLowerCase();
    const locationKey = location.toLowerCase();
    
    const baseSalary = baseSalaries[baseKey] || 70000;
    const multiplier = locationMultipliers[locationKey] || 1.0;
    const medianSalary = Math.round(baseSalary * multiplier);

    return {
      occupation,
      location,
      medianSalary,
      percentile25: Math.round(medianSalary * 0.8),
      percentile75: Math.round(medianSalary * 1.3),
      growthProjection: Math.random() * 15 + 5, // 5-20% growth
      source: 'Fallback Data',
      lastUpdated: new Date(),
    };
  }

  private getFallbackCostOfLivingData(city: string, state: string): CostOfLivingData {
    const baseCosts: { [key: string]: any } = {
      'san francisco': { housing: 180, grocery: 115, transport: 120, overall: 150, rent1br: 3500, rent2br: 4800, homePrice: 1200000 },
      'new york': { housing: 160, grocery: 110, transport: 115, overall: 140, rent1br: 3200, rent2br: 4200, homePrice: 800000 },
      'austin': { housing: 110, grocery: 95, transport: 95, overall: 105, rent1br: 1800, rent2br: 2400, homePrice: 450000 },
      'denver': { housing: 105, grocery: 100, transport: 100, overall: 103, rent1br: 1600, rent2br: 2100, homePrice: 420000 },
      'minneapolis': { housing: 95, grocery: 98, transport: 95, overall: 97, rent1br: 1400, rent2br: 1800, homePrice: 320000 },
    };

    const cityKey = city.toLowerCase();
    const data = baseCosts[cityKey] || baseCosts['minneapolis'];

    return {
      city,
      state,
      housingCostIndex: data.housing,
      groceryCostIndex: data.grocery,
      transportationCostIndex: data.transport,
      overallCostIndex: data.overall,
      averageRent1BR: data.rent1br,
      averageRent2BR: data.rent2br,
      medianHomePrice: data.homePrice,
    };
  }

  private getFallbackJobMarketData(occupation: string, location: string): JobMarketData {
    const jobData: { [key: string]: any } = {
      'software developer': { openings: 15000, competition: 'medium', education: ['Bachelor\'s in CS', 'Coding Bootcamp'], skills: ['JavaScript', 'React', 'Python'], growth: 22, automation: 15 },
      'marketing creative': { openings: 8000, competition: 'high', education: ['Bachelor\'s in Marketing', 'Portfolio'], skills: ['Adobe Creative', 'Strategy', 'Analytics'], growth: 8, automation: 25 },
      'financial analyst': { openings: 12000, competition: 'high', education: ['Bachelor\'s in Finance', 'CFA'], skills: ['Excel', 'Financial Modeling', 'SQL'], growth: 5, automation: 35 },
    };

    const occKey = occupation.toLowerCase();
    const data = jobData[occKey] || jobData['software developer'];

    return {
      occupation,
      location,
      jobOpenings: data.openings,
      competitionLevel: data.competition,
      requiredEducation: data.education,
      topSkills: data.skills,
      industryGrowth: data.growth,
      automationRisk: data.automation,
    };
  }
}

export const dataIntegrationService = new DataIntegrationService();
