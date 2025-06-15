
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building, MapPin, DollarSign, TrendingUp, Users, X } from "lucide-react";

interface CareerPath {
  id: string;
  title: string;
  industry: string;
  companies: Company[];
  salaryRange: string;
  growthPotential: string;
  workLifeBalance: number;
  description: string;
}

interface Company {
  name: string;
  size: string;
  culture: string;
  benefits: string[];
  locations: string[];
  avgSalary: number;
  workLifeRating: number;
}

interface CareerSelectorProps {
  onSelectCareer: (career: CareerPath, company?: Company) => void;
  onClose: () => void;
}

const CareerSelector: React.FC<CareerSelectorProps> = ({ onSelectCareer, onClose }) => {
  const [selectedCareer, setSelectedCareer] = useState<CareerPath | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const careerPaths: CareerPath[] = [
    {
      id: 'software-engineer',
      title: 'Software Engineer',
      industry: 'Technology',
      salaryRange: '$80k - $180k',
      growthPotential: 'High',
      workLifeBalance: 70,
      description: 'Build innovative software solutions and shape the digital future',
      companies: [
        {
          name: 'Google',
          size: 'Large (100k+ employees)',
          culture: 'Innovation-focused, data-driven',
          benefits: ['$200k+ salary', 'Free meals', 'Learning budget', '20% time'],
          locations: ['Mountain View', 'NYC', 'Austin', 'Remote'],
          avgSalary: 180000,
          workLifeRating: 75
        },
        {
          name: 'Netflix',
          size: 'Large (11k employees)',
          culture: 'Freedom & responsibility, high performance',
          benefits: ['Unlimited PTO', 'Top market pay', 'Stock options'],
          locations: ['Los Gatos', 'LA', 'Remote'],
          avgSalary: 220000,
          workLifeRating: 80
        },
        {
          name: 'Stripe',
          size: 'Medium (4k employees)',
          culture: 'Fast-paced, mission-driven',
          benefits: ['Equity', 'Health benefits', 'Learning stipend'],
          locations: ['San Francisco', 'NYC', 'Remote'],
          avgSalary: 200000,
          workLifeRating: 78
        }
      ]
    },
    {
      id: 'product-manager',
      title: 'Product Manager',
      industry: 'Technology',
      salaryRange: '$90k - $200k',
      growthPotential: 'High',
      workLifeBalance: 65,
      description: 'Drive product strategy and bring ideas to life',
      companies: [
        {
          name: 'Apple',
          size: 'Large (150k+ employees)',
          culture: 'Design-focused, perfectionist',
          benefits: ['Stock purchase plan', 'Health benefits', 'Product discounts'],
          locations: ['Cupertino', 'Austin', 'NYC'],
          avgSalary: 190000,
          workLifeRating: 72
        },
        {
          name: 'Airbnb',
          size: 'Medium (6k employees)',
          culture: 'Belong anywhere, inclusive',
          benefits: ['Travel credits', 'Equity', 'Flexible work'],
          locations: ['San Francisco', 'Remote'],
          avgSalary: 185000,
          workLifeRating: 82
        }
      ]
    },
    {
      id: 'data-scientist',
      title: 'Data Scientist',
      industry: 'Technology/Analytics',
      salaryRange: '$85k - $170k',
      growthPotential: 'Very High',
      workLifeBalance: 75,
      description: 'Extract insights from data to drive business decisions',
      companies: [
        {
          name: 'Meta',
          size: 'Large (70k+ employees)',
          culture: 'Move fast, be bold',
          benefits: ['$180k+ salary', 'RSUs', 'Wellness programs'],
          locations: ['Menlo Park', 'NYC', 'Austin', 'Remote'],
          avgSalary: 175000,
          workLifeRating: 68
        },
        {
          name: 'Spotify',
          size: 'Medium (8k employees)',
          culture: 'Creative, music-loving',
          benefits: ['Spotify Premium', 'Flexible hours', 'Parental leave'],
          locations: ['NYC', 'Boston', 'Remote'],
          avgSalary: 155000,
          workLifeRating: 85
        }
      ]
    },
    {
      id: 'marketing-manager',
      title: 'Marketing Manager',
      industry: 'Marketing/Creative',
      salaryRange: '$60k - $130k',
      growthPotential: 'Medium',
      workLifeBalance: 72,
      description: 'Create compelling campaigns and build brand awareness',
      companies: [
        {
          name: 'Nike',
          size: 'Large (75k+ employees)',
          culture: 'Athletic, competitive, inspiring',
          benefits: ['Product discounts', 'Fitness facilities', 'Performance bonuses'],
          locations: ['Portland', 'NYC', 'Chicago'],
          avgSalary: 95000,
          workLifeRating: 78
        },
        {
          name: 'HubSpot',
          size: 'Medium (7k employees)',
          culture: 'Inbound, helpful, transparent',
          benefits: ['Unlimited PTO', 'Learning budget', 'Flexible work'],
          locations: ['Boston', 'Remote'],
          avgSalary: 85000,
          workLifeRating: 88
        }
      ]
    },
    {
      id: 'financial-analyst',
      title: 'Financial Analyst',
      industry: 'Finance',
      salaryRange: '$65k - $150k',
      growthPotential: 'High',
      workLifeBalance: 60,
      description: 'Analyze financial data and drive investment decisions',
      companies: [
        {
          name: 'Goldman Sachs',
          size: 'Large (45k+ employees)',
          culture: 'High-performance, competitive',
          benefits: ['High compensation', 'Prestige', 'Global opportunities'],
          locations: ['NYC', 'London', 'Hong Kong'],
          avgSalary: 140000,
          workLifeRating: 55
        },
        {
          name: 'Robinhood',
          size: 'Medium (3k employees)',
          culture: 'Democratizing finance, innovative',
          benefits: ['Equity', 'Free trading', 'Flexible benefits'],
          locations: ['Menlo Park', 'NYC', 'Remote'],
          avgSalary: 120000,
          workLifeRating: 75
        }
      ]
    }
  ];

  const handleConfirmSelection = () => {
    if (selectedCareer) {
      onSelectCareer(selectedCareer, selectedCompany || undefined);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="bg-gray-900/95 border-purple-500/50 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-xl text-white flex items-center">
            <Building className="h-5 w-5 mr-2 text-blue-400" />
            Choose Your Career Path
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {!selectedCareer ? (
            // Career Selection
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {careerPaths.map((career) => (
                <div
                  key={career.id}
                  className="cursor-pointer p-4 rounded-lg border-2 border-gray-600 hover:border-purple-500 bg-gray-800/50 transition-all"
                  onClick={() => setSelectedCareer(career)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white">{career.title}</h3>
                    <Badge variant="outline" className="text-blue-300 border-blue-500">
                      {career.industry}
                    </Badge>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">{career.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <DollarSign className="h-4 w-4 text-green-400 mr-2" />
                      <span className="text-gray-300">{career.salaryRange}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <TrendingUp className="h-4 w-4 text-purple-400 mr-2" />
                      <span className="text-gray-300">Growth: {career.growthPotential}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 text-pink-400 mr-2" />
                      <span className="text-gray-300">Work-Life: {career.workLifeBalance}%</span>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <p className="text-xs text-gray-400">
                      {career.companies.length} companies available
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Company Selection
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl text-white">{selectedCareer.title}</h2>
                  <p className="text-gray-400">Choose a company to work for:</p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedCareer(null)}
                  className="border-gray-500 text-gray-300 hover:bg-white/10"
                >
                  Back to Careers
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-4 mb-6">
                {selectedCareer.companies.map((company) => (
                  <div
                    key={company.name}
                    className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                      selectedCompany?.name === company.name
                        ? 'border-purple-500 bg-purple-500/20'
                        : 'border-gray-600 hover:border-gray-500 bg-gray-800/50'
                    }`}
                    onClick={() => setSelectedCompany(company)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{company.name}</h3>
                        <p className="text-gray-400 text-sm">{company.size}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-green-400 font-semibold">
                          ${company.avgSalary.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-400">Average Salary</p>
                      </div>
                    </div>

                    <p className="text-gray-300 text-sm mb-3">{company.culture}</p>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-semibold text-blue-300 mb-2">Benefits</h4>
                        <div className="flex flex-wrap gap-1">
                          {company.benefits.slice(0, 3).map((benefit) => (
                            <Badge key={benefit} variant="secondary" className="text-xs bg-gray-700 text-gray-200">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-green-300 mb-2">Locations</h4>
                        <div className="flex flex-wrap gap-1">
                          {company.locations.slice(0, 3).map((location) => (
                            <Badge key={location} variant="outline" className="text-xs border-gray-500 text-gray-300">
                              {location}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Work-Life Balance</span>
                        <span className="text-white">{company.workLifeRating}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                        <div 
                          className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full"
                          style={{ width: `${company.workLifeRating}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => onSelectCareer(selectedCareer)}
                  className="flex-1 border-gray-500 text-gray-300 hover:bg-white/10"
                >
                  Continue without Company
                </Button>
                <Button
                  onClick={handleConfirmSelection}
                  disabled={!selectedCompany}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50"
                >
                  Start Journey at {selectedCompany?.name || 'Company'}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CareerSelector;
