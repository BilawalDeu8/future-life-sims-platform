
import { useState, useEffect } from 'react';
import { SalaryData, CostOfLivingData, JobMarketData } from '@/types/dataIntegration';
import { dataIntegrationService } from '@/services/dataIntegrationService';

export const useRealWorldData = () => {
  const [salaryData, setSalaryData] = useState<SalaryData | null>(null);
  const [costOfLivingData, setCostOfLivingData] = useState<CostOfLivingData | null>(null);
  const [jobMarketData, setJobMarketData] = useState<JobMarketData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchScenarioData = async (occupation: string, location: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const [salary, costOfLiving, jobMarket] = await Promise.all([
        dataIntegrationService.fetchSalaryData(occupation, location),
        dataIntegrationService.fetchCostOfLivingData(
          location.split(',')[0].trim(),
          location.split(',')[1]?.trim() || ''
        ),
        dataIntegrationService.fetchJobMarketData(occupation, location),
      ]);

      setSalaryData(salary);
      setCostOfLivingData(costOfLiving);
      setJobMarketData(jobMarket);
    } catch (err) {
      setError('Failed to fetch real-world data');
      console.error('Error fetching scenario data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateAdjustedSalary = (baseSalary: number, location: string): number => {
    if (!costOfLivingData) return baseSalary;
    
    // Adjust salary based on cost of living index
    const adjustment = costOfLivingData.overallCostIndex / 100;
    return Math.round(baseSalary * adjustment);
  };

  const getAffordabilityMetrics = (salary: number) => {
    if (!costOfLivingData) return null;

    const monthlyGross = salary / 12;
    const monthlyNet = monthlyGross * 0.75; // Rough after-tax estimate
    
    const housingAffordability = (costOfLivingData.averageRent1BR / monthlyNet) * 100;
    const homeAffordability = costOfLivingData.medianHomePrice / salary;

    return {
      monthlyNet,
      housingAffordabilityPercent: Math.round(housingAffordability),
      yearsToAffordHome: Math.round(homeAffordability),
      isHousingAffordable: housingAffordability <= 30, // 30% rule
      recommendedHousingBudget: Math.round(monthlyNet * 0.3),
    };
  };

  return {
    salaryData,
    costOfLivingData,
    jobMarketData,
    isLoading,
    error,
    fetchScenarioData,
    calculateAdjustedSalary,
    getAffordabilityMetrics,
  };
};
