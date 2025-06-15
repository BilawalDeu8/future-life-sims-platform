
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Car, Home, Plane, Heart, GraduationCap, Baby } from "lucide-react";

interface MajorPurchaseTimelineProps {
  salary: number;
  location: string;
}

interface Purchase {
  id: string;
  name: string;
  icon: React.ReactNode;
  baseCost: number;
  downPaymentPercent: number;
  description: string;
  color: string;
  options: {
    name: string;
    cost: number;
    description: string;
  }[];
}

const MajorPurchaseTimeline: React.FC<MajorPurchaseTimelineProps> = ({ salary, location }) => {
  const monthlyIncome = Math.round(salary * 0.75 / 12);
  const monthlySavings = Math.round(monthlyIncome * 0.2); // Assume 20% savings rate
  
  const [purchases] = useState<Purchase[]>([
    {
      id: 'car',
      name: 'Vehicle',
      icon: <Car className="h-6 w-6" />,
      baseCost: 25000,
      downPaymentPercent: 20,
      description: 'Transportation independence',
      color: 'bg-blue-500',
      options: [
        { name: 'Used Car', cost: 15000, description: 'Reliable transportation' },
        { name: 'New Car', cost: 25000, description: 'Latest features and warranty' },
        { name: 'Luxury Car', cost: 45000, description: 'Premium experience' },
        { name: 'Electric Vehicle', cost: 35000, description: 'Eco-friendly choice' }
      ]
    },
    {
      id: 'home',
      name: 'Home Purchase',
      icon: <Home className="h-6 w-6" />,
      baseCost: 300000,
      downPaymentPercent: 20,
      description: 'Building equity and stability',
      color: 'bg-green-500',
      options: [
        { name: 'Starter Home', cost: 250000, description: 'Entry-level homeownership' },
        { name: 'Family Home', cost: 350000, description: 'Room to grow' },
        { name: 'Dream Home', cost: 500000, description: 'Everything you want' },
        { name: 'Investment Property', cost: 300000, description: 'Rental income potential' }
      ]
    },
    {
      id: 'vacation',
      name: 'Dream Vacation',
      icon: <Plane className="h-6 w-6" />,
      baseCost: 5000,
      downPaymentPercent: 100,
      description: 'Life experiences and memories',
      color: 'bg-purple-500',
      options: [
        { name: 'Weekend Getaway', cost: 1500, description: 'Quick refresh' },
        { name: 'International Trip', cost: 5000, description: 'Cultural exploration' },
        { name: 'Luxury Vacation', cost: 10000, description: 'First-class experience' },
        { name: 'Adventure Expedition', cost: 15000, description: 'Once-in-a-lifetime journey' }
      ]
    },
    {
      id: 'wedding',
      name: 'Wedding',
      icon: <Heart className="h-6 w-6" />,
      baseCost: 30000,
      downPaymentPercent: 100,
      description: 'Celebrating your special day',
      color: 'bg-pink-500',
      options: [
        { name: 'Intimate Ceremony', cost: 15000, description: 'Close family and friends' },
        { name: 'Traditional Wedding', cost: 30000, description: 'Classic celebration' },
        { name: 'Luxury Wedding', cost: 60000, description: 'Dream venue and catering' },
        { name: 'Destination Wedding', cost: 45000, description: 'Exotic location' }
      ]
    },
    {
      id: 'education',
      name: 'Advanced Education',
      icon: <GraduationCap className="h-6 w-6" />,
      baseCost: 50000,
      downPaymentPercent: 100,
      description: 'Investing in your future',
      color: 'bg-orange-500',
      options: [
        { name: 'Professional Certification', cost: 5000, description: 'Skill enhancement' },
        { name: 'MBA Program', cost: 80000, description: 'Career advancement' },
        { name: 'Bootcamp', cost: 15000, description: 'Quick skill acquisition' },
        { name: 'Graduate Degree', cost: 50000, description: 'Academic achievement' }
      ]
    },
    {
      id: 'family',
      name: 'Starting a Family',
      icon: <Baby className="h-6 w-6" />,
      baseCost: 25000,
      downPaymentPercent: 100,
      description: 'First year baby expenses',
      color: 'bg-yellow-500',
      options: [
        { name: 'Basic Preparation', cost: 15000, description: 'Essential baby items' },
        { name: 'Comprehensive Setup', cost: 25000, description: 'Full nursery and supplies' },
        { name: 'Premium Experience', cost: 40000, description: 'Top-quality everything' },
        { name: 'Adoption Costs', cost: 35000, description: 'Legal and agency fees' }
      ]
    }
  ]);

  const [selectedOptions, setSelectedOptions] = useState<Record<string, number>>({});

  const calculateTimeToAfford = (cost: number, downPayment: number) => {
    if (monthlySavings <= 0) return Infinity;
    return Math.ceil(downPayment / monthlySavings);
  };

  const getSelectedCost = (purchase: Purchase) => {
    const selectedIndex = selectedOptions[purchase.id] || 0;
    return purchase.options[selectedIndex].cost;
  };

  const getDownPayment = (purchase: Purchase) => {
    const cost = getSelectedCost(purchase);
    return Math.round(cost * purchase.downPaymentPercent / 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-center text-white">
            Major Purchase Timeline
          </CardTitle>
          <div className="text-center space-y-2">
            <div className="text-sm text-gray-400">Monthly Savings Capacity</div>
            <div className="text-2xl font-bold text-green-400">
              ${monthlySavings.toLocaleString()}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Purchase Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {purchases.map((purchase) => {
          const selectedCost = getSelectedCost(purchase);
          const downPayment = getDownPayment(purchase);
          const monthsToAfford = calculateTimeToAfford(selectedCost, downPayment);
          const yearsToAfford = monthsToAfford / 12;
          const selectedOption = purchase.options[selectedOptions[purchase.id] || 0];

          return (
            <Card key={purchase.id} className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-lg ${purchase.color} text-white`}>
                    {purchase.icon}
                  </div>
                  <div>
                    <CardTitle className="text-white">{purchase.name}</CardTitle>
                    <p className="text-sm text-gray-400">{purchase.description}</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Option Selection */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Choose Your Option</label>
                  <div className="space-y-2">
                    {purchase.options.map((option, index) => (
                      <Button
                        key={index}
                        variant={selectedOptions[purchase.id] === index ? "default" : "outline"}
                        className={`w-full text-left justify-start ${
                          selectedOptions[purchase.id] === index 
                            ? 'bg-purple-600 hover:bg-purple-700' 
                            : 'border-white/30 text-white hover:bg-white/10'
                        }`}
                        onClick={() => setSelectedOptions(prev => ({ ...prev, [purchase.id]: index }))}
                      >
                        <div>
                          <div className="font-medium">{option.name}</div>
                          <div className="text-sm opacity-70">${option.cost.toLocaleString()} - {option.description}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Financial Breakdown */}
                <div className="bg-white/5 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Cost</span>
                    <span className="text-white font-bold">${selectedCost.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-400">Down Payment ({purchase.downPaymentPercent}%)</span>
                    <span className="text-white font-bold">${downPayment.toLocaleString()}</span>
                  </div>

                  <div className="border-t border-white/20 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Time to Afford</span>
                      <div className="text-right">
                        {monthsToAfford === Infinity ? (
                          <span className="text-red-400">Need to increase savings</span>
                        ) : (
                          <>
                            <div className="text-white font-bold">
                              {yearsToAfford < 1 
                                ? `${monthsToAfford} months`
                                : `${yearsToAfford.toFixed(1)} years`
                              }
                            </div>
                            <div className="text-sm text-gray-400">
                              Available in {new Date(Date.now() + monthsToAfford * 30 * 24 * 60 * 60 * 1000).getFullYear()}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Visualization */}
                {monthsToAfford !== Infinity && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Savings Progress</span>
                      <span className="text-purple-400">0% Complete</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full w-0" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Timeline Summary */}
      <Card className="bg-gradient-to-r from-blue-600/80 to-purple-600/80 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white text-center">Your Purchase Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {purchases
              .map(purchase => ({
                ...purchase,
                monthsToAfford: calculateTimeToAfford(getSelectedCost(purchase), getDownPayment(purchase))
              }))
              .filter(purchase => purchase.monthsToAfford !== Infinity)
              .sort((a, b) => a.monthsToAfford - b.monthsToAfford)
              .map((purchase, index) => (
                <div key={purchase.id} className="flex items-center justify-between bg-white/10 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl font-bold text-purple-300">#{index + 1}</div>
                    <div className={`p-2 rounded-lg ${purchase.color} text-white`}>
                      {purchase.icon}
                    </div>
                    <div>
                      <div className="text-white font-medium">{purchase.name}</div>
                      <div className="text-sm text-gray-400">
                        ${getDownPayment(purchase).toLocaleString()} needed
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold">
                      {purchase.monthsToAfford < 12 
                        ? `${purchase.monthsToAfford} months`
                        : `${(purchase.monthsToAfford / 12).toFixed(1)} years`
                      }
                    </div>
                    <div className="text-sm text-gray-400">
                      {new Date(Date.now() + purchase.monthsToAfford * 30 * 24 * 60 * 60 * 1000).getFullYear()}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MajorPurchaseTimeline;
