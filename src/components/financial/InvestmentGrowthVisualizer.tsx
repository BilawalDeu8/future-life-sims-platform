
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, PiggyBank, Target, Shield, Zap } from "lucide-react";

interface InvestmentGrowthVisualizerProps {
  salary: number;
}

interface InvestmentScenario {
  id: string;
  name: string;
  description: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  expectedReturn: number;
  color: string;
  icon: React.ReactNode;
}

const InvestmentGrowthVisualizer: React.FC<InvestmentGrowthVisualizerProps> = ({ salary }) => {
  const monthlyIncome = Math.round(salary * 0.75 / 12);
  
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(800);
  const [investmentHorizon, setInvestmentHorizon] = useState<number>(30);
  const [selectedScenario, setSelectedScenario] = useState<string>('balanced');

  const scenarios: InvestmentScenario[] = [
    {
      id: 'conservative',
      name: 'Conservative',
      description: 'Bonds, CDs, savings accounts',
      riskLevel: 'Low',
      expectedReturn: 4,
      color: '#10B981',
      icon: <Shield className="h-5 w-5" />
    },
    {
      id: 'balanced',
      name: 'Balanced',
      description: '60% stocks, 40% bonds',
      riskLevel: 'Medium',
      expectedReturn: 7,
      color: '#3B82F6',
      icon: <PiggyBank className="h-5 w-5" />
    },
    {
      id: 'aggressive',
      name: 'Aggressive',
      description: '90% stocks, 10% bonds',
      riskLevel: 'High',
      expectedReturn: 10,
      color: '#8B5CF6',
      icon: <TrendingUp className="h-5 w-5" />
    },
    {
      id: 'growth',
      name: 'High Growth',
      description: 'Growth stocks, tech funds',
      riskLevel: 'High',
      expectedReturn: 12,
      color: '#F59E0B',
      icon: <Zap className="h-5 w-5" />
    }
  ];

  const calculateCompoundGrowth = (monthlyContribution: number, annualReturn: number, years: number) => {
    const monthlyReturn = annualReturn / 100 / 12;
    const totalMonths = years * 12;
    
    const data = [];
    let balance = 0;
    let totalContributions = 0;
    
    for (let month = 1; month <= totalMonths; month++) {
      balance = balance * (1 + monthlyReturn) + monthlyContribution;
      totalContributions += monthlyContribution;
      
      if (month % 12 === 0) { // Annual data points
        const year = month / 12;
        data.push({
          year,
          balance: Math.round(balance),
          contributions: totalContributions,
          gains: Math.round(balance - totalContributions)
        });
      }
    }
    
    return data;
  };

  const currentScenario = scenarios.find(s => s.id === selectedScenario)!;
  const projectionData = calculateCompoundGrowth(monthlyInvestment, currentScenario.expectedReturn, investmentHorizon);
  const finalValue = projectionData[projectionData.length - 1];
  const totalContributions = monthlyInvestment * 12 * investmentHorizon;
  const totalGains = finalValue?.balance - totalContributions || 0;

  // Calculate retirement scenarios
  const retirementAge = 65;
  const currentAge = 25; // Assume starting age
  const yearsToRetirement = retirementAge - currentAge;
  const retirementProjection = calculateCompoundGrowth(monthlyInvestment, currentScenario.expectedReturn, yearsToRetirement);
  const retirementValue = retirementProjection[retirementProjection.length - 1];

  const formatTooltip = (value: any, name: string) => {
    if (name === 'balance') {
      return [`$${value?.toLocaleString()}`, 'Total Value'];
    }
    if (name === 'contributions') {
      return [`$${value?.toLocaleString()}`, 'Contributions'];
    }
    if (name === 'gains') {
      return [`$${value?.toLocaleString()}`, 'Investment Gains'];
    }
    return [value, name];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-center text-white">
            Investment Growth Visualizer
          </CardTitle>
          <div className="text-center">
            <div className="text-sm text-gray-400">Start building wealth with compound interest</div>
          </div>
        </CardHeader>
      </Card>

      {/* Investment Controls */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Investment Parameters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-white">Monthly Investment</span>
              <span className="text-green-400 font-bold">${monthlyInvestment.toLocaleString()}</span>
            </div>
            <Slider
              value={[monthlyInvestment]}
              onValueChange={(value) => setMonthlyInvestment(value[0])}
              max={Math.min(3000, monthlyIncome * 0.5)}
              step={50}
              className="w-full"
            />
            <div className="text-sm text-gray-400">
              {((monthlyInvestment / monthlyIncome) * 100).toFixed(1)}% of monthly income
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-white">Investment Timeline</span>
              <span className="text-blue-400 font-bold">{investmentHorizon} years</span>
            </div>
            <Slider
              value={[investmentHorizon]}
              onValueChange={(value) => setInvestmentHorizon(value[0])}
              min={5}
              max={40}
              step={1}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* Investment Strategy Selection */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Choose Your Investment Strategy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scenarios.map((scenario) => (
              <Button
                key={scenario.id}
                variant={selectedScenario === scenario.id ? 'default' : 'outline'}
                className={`h-auto p-4 ${
                  selectedScenario === scenario.id 
                    ? 'bg-purple-600 hover:bg-purple-700' 
                    : 'border-white/30 text-white hover:bg-white/10'
                }`}
                onClick={() => setSelectedScenario(scenario.id)}
              >
                <div className="flex items-start space-x-3 text-left w-full">
                  <div className="p-2 rounded-lg bg-white/20">
                    {scenario.icon}
                  </div>
                  <div>
                    <div className="font-bold">{scenario.name}</div>
                    <div className="text-sm opacity-80">{scenario.description}</div>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge 
                        variant={scenario.riskLevel === 'Low' ? 'secondary' : scenario.riskLevel === 'Medium' ? 'outline' : 'destructive'}
                        className="text-xs"
                      >
                        {scenario.riskLevel} Risk
                      </Badge>
                      <span className="text-xs opacity-60">{scenario.expectedReturn}% return</span>
                    </div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Growth Visualization */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Growth Projection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={projectionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="year" 
                  stroke="rgba(255,255,255,0.6)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.6)"
                  fontSize={12}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip 
                  formatter={formatTooltip}
                  labelFormatter={(year) => `Year ${year}`}
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="contributions"
                  stackId="1"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="gains"
                  stackId="1"
                  stroke={currentScenario.color}
                  fill={currentScenario.color}
                  fillOpacity={0.8}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center bg-white/5 rounded-lg p-4">
              <div className="text-sm text-gray-400">Total Contributions</div>
              <div className="text-2xl font-bold text-green-400">
                ${totalContributions.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">
                ${monthlyInvestment}/month for {investmentHorizon} years
              </div>
            </div>

            <div className="text-center bg-white/5 rounded-lg p-4">
              <div className="text-sm text-gray-400">Investment Gains</div>
              <div className="text-2xl font-bold text-purple-400">
                ${totalGains.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">
                From compound growth
              </div>
            </div>

            <div className="text-center bg-white/5 rounded-lg p-4">
              <div className="text-sm text-gray-400">Final Value</div>
              <div className="text-2xl font-bold text-blue-400">
                ${finalValue?.balance.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">
                {((totalGains / totalContributions) * 100).toFixed(0)}% total return
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Retirement Planning */}
      <Card className="bg-gradient-to-r from-purple-600/80 to-pink-600/80 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Target className="h-6 w-6 mr-2" />
            Retirement Planning
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Retirement Projection</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">Retirement Age:</span>
                  <span className="text-white font-bold">{retirementAge} years old</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Years to Save:</span>
                  <span className="text-white font-bold">{yearsToRetirement} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Expected Value:</span>
                  <span className="text-green-400 font-bold text-xl">
                    ${retirementValue?.balance.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Retirement Income</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">4% Withdrawal Rule:</span>
                  <span className="text-white font-bold">
                    ${Math.round((retirementValue?.balance || 0) * 0.04).toLocaleString()}/year
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Monthly Income:</span>
                  <span className="text-green-400 font-bold text-xl">
                    ${Math.round((retirementValue?.balance || 0) * 0.04 / 12).toLocaleString()}
                  </span>
                </div>
                <div className="text-sm text-gray-300 mt-2">
                  Based on the 4% safe withdrawal rate for retirement
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestmentGrowthVisualizer;
