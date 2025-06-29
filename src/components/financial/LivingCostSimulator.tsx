
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Home, Car, ShoppingCart, Heart, Gamepad2, Coffee } from "lucide-react";

interface LivingCostSimulatorProps {
  salary: number;
  location: string;
}

interface BudgetCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  percentage: number;
  color: string;
  description: string;
  examples: string[];
}

const LivingCostSimulator: React.FC<LivingCostSimulatorProps> = ({ salary, location }) => {
  const monthlyIncome = Math.round(salary * 0.75 / 12);
  
  const [budgetCategories, setBudgetCategories] = useState<BudgetCategory[]>([
    {
      id: 'housing',
      name: 'Housing',
      icon: <Home className="h-5 w-5" />,
      percentage: 30,
      color: 'bg-blue-500',
      description: 'Rent/mortgage, utilities, insurance',
      examples: ['Studio apartment', '1BHK apartment', '2BHK apartment', 'House rental']
    },
    {
      id: 'transportation',
      name: 'Transportation',
      icon: <Car className="h-5 w-5" />,
      percentage: 15,
      color: 'bg-green-500',
      description: 'Car payment, gas, public transit, maintenance',
      examples: ['Public transit only', 'Used car', 'New car lease', 'Luxury vehicle']
    },
    {
      id: 'food',
      name: 'Food and Dining',
      icon: <Coffee className="h-5 w-5" />,
      percentage: 12,
      color: 'bg-orange-500',
      description: 'Groceries, restaurants, meal delivery',
      examples: ['Home cooking', 'Occasional dining', 'Regular takeout', 'Fine dining']
    },
    {
      id: 'entertainment',
      name: 'Entertainment',
      icon: <Gamepad2 className="h-5 w-5" />,
      percentage: 8,
      color: 'bg-purple-500',
      description: 'Movies, concerts, hobbies, subscriptions',
      examples: ['Basic streaming', 'Movie nights', 'Concert tickets', 'Premium lifestyle']
    },
    {
      id: 'shopping',
      name: 'Shopping',
      icon: <ShoppingCart className="h-5 w-5" />,
      percentage: 10,
      color: 'bg-pink-500',
      description: 'Clothing, personal items, household goods',
      examples: ['Thrift shopping', 'Mid-range brands', 'Designer items', 'Luxury shopping']
    },
    {
      id: 'healthcare',
      name: 'Healthcare',
      icon: <Heart className="h-5 w-5" />,
      percentage: 5,
      color: 'bg-red-500',
      description: 'Insurance, medications, fitness',
      examples: ['Basic coverage', 'Premium insurance', 'Gym membership', 'Personal trainer']
    }
  ]);

  const updateBudgetCategory = (categoryId: string, newPercentage: number) => {
    setBudgetCategories(prev => 
      prev.map(cat => 
        cat.id === categoryId 
          ? { ...cat, percentage: newPercentage }
          : cat
      )
    );
  };

  const totalAllocated = budgetCategories.reduce((sum, cat) => sum + cat.percentage, 0);
  const savingsPercentage = Math.max(0, 100 - totalAllocated);
  const monthlyAmount = (amount: number) => Math.round(monthlyIncome * amount / 100);

  const getLifestyleLevel = (category: BudgetCategory) => {
    if (category.percentage <= 5) return { level: 'Minimal', example: category.examples[0] };
    if (category.percentage <= 15) return { level: 'Moderate', example: category.examples[1] };
    if (category.percentage <= 25) return { level: 'Comfortable', example: category.examples[2] };
    return { level: 'Premium', example: category.examples[3] };
  };

  return (
    <div className="space-y-6">
      {/* Budget Allocation Header */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-center text-white">
            Interactive Budget Planner - {location}
          </CardTitle>
          <div className="text-center">
            <div className="text-sm text-gray-400">Monthly Take-Home Income</div>
            <div className="text-3xl font-bold text-green-400">
              ${monthlyIncome.toLocaleString()}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Budget Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {budgetCategories.map((category) => {
          const lifestyle = getLifestyleLevel(category);
          return (
            <Card key={category.id} className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${category.color} text-white`}>
                      {category.icon}
                    </div>
                    <div>
                      <CardTitle className="text-white">{category.name}</CardTitle>
                      <p className="text-sm text-gray-400">{category.description}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-white bg-white/20">
                    {lifestyle.level}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Budget Allocation</span>
                    <span className="text-lg font-bold text-white">
                      {category.percentage}% (${monthlyAmount(category.percentage).toLocaleString()})
                    </span>
                  </div>
                  
                  <Slider
                    value={[category.percentage]}
                    onValueChange={(value) => updateBudgetCategory(category.id, value[0])}
                    max={40}
                    step={1}
                    className="w-full"
                  />
                </div>
                
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="text-sm text-gray-400 mb-1">Your Lifestyle</div>
                  <div className="text-white font-medium">{lifestyle.example}</div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Savings Summary */}
      <Card className="bg-gradient-to-r from-green-600/80 to-blue-600/80 backdrop-blur-sm border-white/20">
        <CardContent className="p-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-white">Monthly Savings</h3>
            <div className="text-4xl font-bold text-white">
              ${monthlyAmount(savingsPercentage).toLocaleString()}
            </div>
            <div className="text-lg text-blue-100">
              {savingsPercentage.toFixed(1)}% of income
            </div>
            {savingsPercentage < 10 && (
              <div className="text-yellow-300 text-sm mt-2">
                ⚠️ Consider reducing expenses to increase savings
              </div>
            )}
            {savingsPercentage >= 20 && (
              <div className="text-green-300 text-sm mt-2">
                🎉 Excellent savings rate! You're on track for financial success
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Annual Projections */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Annual Financial Projections</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-sm text-gray-400">Annual Savings</div>
              <div className="text-2xl font-bold text-green-400">
                ${(monthlyAmount(savingsPercentage) * 12).toLocaleString()}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-400">Emergency Fund (6 months)</div>
              <div className="text-2xl font-bold text-blue-400">
                ${(monthlyIncome * 6).toLocaleString()}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-400">Time to Emergency Fund</div>
              <div className="text-2xl font-bold text-purple-400">
                {savingsPercentage > 0 ? Math.ceil(6 / (savingsPercentage / 100)) : '∞'} months
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LivingCostSimulator;
