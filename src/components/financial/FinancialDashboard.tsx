
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, Home, Car, TrendingUp, CreditCard, PiggyBank } from "lucide-react";
import LivingCostSimulator from "./LivingCostSimulator";
import MajorPurchaseTimeline from "./MajorPurchaseTimeline";
import DebtPayoffSimulator from "./DebtPayoffSimulator";
import InvestmentGrowthVisualizer from "./InvestmentGrowthVisualizer";

interface FinancialDashboardProps {
  scenario: {
    id: string;
    title: string;
    salaryRange: string;
    location: string;
  };
  onBack: () => void;
}

const FinancialDashboard: React.FC<FinancialDashboardProps> = ({ scenario, onBack }) => {
  const [activeTab, setActiveTab] = useState("living-costs");

  // Extract salary data from scenario
  const salaryData = scenario.salaryRange.replace(/[$k,-]/g, '').split(' ');
  const minSalary = parseInt(salaryData[0]) * 1000;
  const maxSalary = parseInt(salaryData[1]) * 1000;
  const avgSalary = (minSalary + maxSalary) / 2;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-white hover:bg-white/10"
            >
              ← Back to Scenario
            </Button>
            <div className="text-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Financial Reality Check
              </h1>
              <p className="text-blue-200">{scenario.title} in {scenario.location}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">Annual Salary Range</div>
              <div className="text-xl font-bold text-green-400">{scenario.salaryRange}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Overview Cards */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-green-400">
                <DollarSign className="h-5 w-5 mr-2" />
                Monthly Take-Home
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                ${Math.round(avgSalary * 0.75 / 12).toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">After taxes & deductions</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-blue-400">
                <Home className="h-5 w-5 mr-2" />
                Housing Budget
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                ${Math.round(avgSalary * 0.75 / 12 * 0.3).toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">30% of take-home pay</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-purple-400">
                <PiggyBank className="h-5 w-5 mr-2" />
                Savings Potential
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                ${Math.round(avgSalary * 0.75 / 12 * 0.2).toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">20% savings rate</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-orange-400">
                <Car className="h-5 w-5 mr-2" />
                Lifestyle Budget
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                ${Math.round(avgSalary * 0.75 / 12 * 0.5).toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">Food, transport, entertainment</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Financial Simulation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-sm">
            <TabsTrigger value="living-costs" className="text-white data-[state=active]:bg-purple-600">
              Living Costs
            </TabsTrigger>
            <TabsTrigger value="major-purchases" className="text-white data-[state=active]:bg-purple-600">
              Major Purchases
            </TabsTrigger>
            <TabsTrigger value="debt-payoff" className="text-white data-[state=active]:bg-purple-600">
              Debt Strategy
            </TabsTrigger>
            <TabsTrigger value="investments" className="text-white data-[state=active]:bg-purple-600">
              Investments
            </TabsTrigger>
          </TabsList>

          <TabsContent value="living-costs">
            <LivingCostSimulator 
              salary={avgSalary}
              location={scenario.location}
            />
          </TabsContent>

          <TabsContent value="major-purchases">
            <MajorPurchaseTimeline 
              salary={avgSalary}
              location={scenario.location}
            />
          </TabsContent>

          <TabsContent value="debt-payoff">
            <DebtPayoffSimulator 
              salary={avgSalary}
            />
          </TabsContent>

          <TabsContent value="investments">
            <InvestmentGrowthVisualizer 
              salary={avgSalary}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FinancialDashboard;
