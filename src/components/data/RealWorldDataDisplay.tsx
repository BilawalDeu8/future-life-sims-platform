
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Home, DollarSign, Users, AlertTriangle } from "lucide-react";
import { SalaryData, CostOfLivingData, JobMarketData } from '@/types/dataIntegration';

interface RealWorldDataDisplayProps {
  salaryData: SalaryData | null;
  costOfLivingData: CostOfLivingData | null;
  jobMarketData: JobMarketData | null;
  isLoading: boolean;
}

const RealWorldDataDisplay: React.FC<RealWorldDataDisplayProps> = ({
  salaryData,
  costOfLivingData,
  jobMarketData,
  isLoading
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <Card key={i} className="bg-white/10 backdrop-blur-sm border-white/20 animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-white/20 rounded mb-4"></div>
              <div className="h-8 bg-white/20 rounded mb-2"></div>
              <div className="h-4 bg-white/20 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const formatSalary = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Salary Information */}
      {salaryData && (
        <Card className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <DollarSign className="h-5 w-5 mr-2 text-green-400" />
              Salary Data for {salaryData.occupation}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{formatSalary(salaryData.medianSalary)}</div>
              <div className="text-sm text-green-200">Median Salary</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-white">{formatSalary(salaryData.percentile25)} - {formatSalary(salaryData.percentile75)}</div>
              <div className="text-sm text-green-200">25th - 75th Percentile</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                <span className="text-lg font-semibold text-white">{salaryData.growthProjection.toFixed(1)}%</span>
              </div>
              <div className="text-sm text-green-200">5-year Growth</div>
            </div>
            <div className="text-center">
              <Badge variant="outline" className="border-green-400 text-green-300">
                {salaryData.source}
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Cost of Living & Job Market Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cost of Living */}
        {costOfLivingData && (
          <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Home className="h-5 w-5 mr-2 text-blue-400" />
                Cost of Living - {costOfLivingData.city}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-blue-200">Housing Index</div>
                  <div className="text-xl font-bold text-white">{costOfLivingData.housingCostIndex}</div>
                </div>
                <div>
                  <div className="text-sm text-blue-200">Overall Index</div>
                  <div className="text-xl font-bold text-white">{costOfLivingData.overallCostIndex}</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-blue-200">1BR Apartment</span>
                  <span className="text-white font-semibold">{formatSalary(costOfLivingData.averageRent1BR)}/mo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-200">Median Home Price</span>
                  <span className="text-white font-semibold">{formatSalary(costOfLivingData.medianHomePrice)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Job Market */}
        {jobMarketData && (
          <Card className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Users className="h-5 w-5 mr-2 text-purple-400" />
                Job Market Outlook
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-purple-200">Open Positions</div>
                  <div className="text-xl font-bold text-white">{jobMarketData.jobOpenings.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-purple-200">Industry Growth</div>
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                    <span className="text-xl font-bold text-white">{jobMarketData.industryGrowth}%</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-sm text-purple-200 mb-2">Competition Level</div>
                <Badge 
                  variant="outline" 
                  className={`border-${
                    jobMarketData.competitionLevel === 'low' ? 'green' : 
                    jobMarketData.competitionLevel === 'medium' ? 'yellow' : 'red'
                  }-400 text-${
                    jobMarketData.competitionLevel === 'low' ? 'green' : 
                    jobMarketData.competitionLevel === 'medium' ? 'yellow' : 'red'
                  }-300`}
                >
                  {jobMarketData.competitionLevel.toUpperCase()}
                </Badge>
              </div>
              {jobMarketData.automationRisk > 30 && (
                <div className="flex items-center text-orange-300 text-sm">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  {jobMarketData.automationRisk}% automation risk
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RealWorldDataDisplay;
