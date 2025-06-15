
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Zap, Heart, TrendingUp, DollarSign, Clock, Users, Home, Star } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface LifeScenario {
  id: string;
  title: string;
  career: string;
  location: string;
  salaryRange: string;
  workLifeBalance: number;
  stressLevel: number;
  lifestyle: string;
  image: string;
  description: string;
  livingSpace: string;
  socialLife: string;
}

interface ScenarioComparisonProps {
  scenarios: LifeScenario[];
  onBack: () => void;
}

interface ComparisonData {
  category: string;
  scenario1: number;
  scenario2: number;
  fullMark: 100;
}

const ScenarioComparison: React.FC<ScenarioComparisonProps> = ({ scenarios, onBack }) => {
  const [selectedScenarios, setSelectedScenarios] = useState<[number, number]>([0, 1]);
  const [currentView, setCurrentView] = useState<'overview' | 'timeline' | 'regret' | 'decision'>('overview');
  const [userValues, setUserValues] = useState({
    career: 85,
    family: 70,
    finances: 75,
    lifestyle: 80,
    location: 60
  });

  const scenario1 = scenarios[selectedScenarios[0]];
  const scenario2 = scenarios[selectedScenarios[1]];

  const generateComparisonData = (): ComparisonData[] => {
    return [
      {
        category: 'Career Growth',
        scenario1: scenario1.career.includes('Software') ? 90 : scenario1.career.includes('Creative') ? 75 : 85,
        scenario2: scenario2.career.includes('Software') ? 90 : scenario2.career.includes('Creative') ? 75 : 85,
        fullMark: 100
      },
      {
        category: 'Work-Life Balance',
        scenario1: scenario1.workLifeBalance,
        scenario2: scenario2.workLifeBalance,
        fullMark: 100
      },
      {
        category: 'Financial Security',
        scenario1: parseInt(scenario1.salaryRange.split('k')[0].replace('$', '')) / 2,
        scenario2: parseInt(scenario2.salaryRange.split('k')[0].replace('$', '')) / 2,
        fullMark: 100
      },
      {
        category: 'Stress Level',
        scenario1: 100 - scenario1.stressLevel,
        scenario2: 100 - scenario2.stressLevel,
        fullMark: 100
      },
      {
        category: 'Social Life',
        scenario1: scenario1.socialLife.includes('networking') ? 85 : scenario1.socialLife.includes('creative') ? 80 : 75,
        scenario2: scenario2.socialLife.includes('networking') ? 85 : scenario2.socialLife.includes('creative') ? 80 : 75,
        fullMark: 100
      },
      {
        category: 'Location Appeal',
        scenario1: scenario1.location.includes('San Francisco') ? 95 : scenario1.location.includes('New York') ? 90 : 75,
        scenario2: scenario2.location.includes('San Francisco') ? 95 : scenario2.location.includes('New York') ? 90 : 75,
        fullMark: 100
      }
    ];
  };

  const calculateWeightedScore = (scenarioIndex: number): number => {
    const data = generateComparisonData();
    const scenario = scenarioIndex === 0 ? scenario1 : scenario2;
    
    let totalScore = 0;
    let totalWeight = 0;
    
    data.forEach(item => {
      const value = scenarioIndex === 0 ? item.scenario1 : item.scenario2;
      let weight = 1;
      
      if (item.category === 'Career Growth') weight = userValues.career / 100;
      if (item.category === 'Financial Security') weight = userValues.finances / 100;
      if (item.category === 'Work-Life Balance') weight = userValues.lifestyle / 100;
      
      totalScore += value * weight;
      totalWeight += weight;
    });
    
    return Math.round(totalScore / totalWeight);
  };

  const getRegretAnalysis = (scenario: LifeScenario) => {
    return {
      potentialRegrets: [
        scenario.stressLevel > 70 ? "High stress may impact health and relationships" : null,
        scenario.workLifeBalance < 60 ? "Limited time for personal interests and family" : null,
        scenario.location === "San Francisco, CA" ? "High cost of living may limit financial freedom" : null
      ].filter(Boolean),
      at30: `At 30, you might regret not ${scenario.stressLevel > 70 ? 'prioritizing work-life balance' : 'taking bigger career risks'}`,
      at40: `At 40, you might regret not ${scenario.workLifeBalance < 60 ? 'spending more time with family' : 'building stronger financial security'}`,
      at50: `At 50, you might regret not ${scenario.location.includes('expensive') ? 'choosing a more affordable location' : 'pursuing more meaningful work'}`
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Scenarios
            </Button>
            
            <div className="text-center">
              <h1 className="text-2xl font-bold">Advanced Scenario Comparison</h1>
              <p className="text-blue-200">Make informed decisions about your future</p>
            </div>

            <div className="flex space-x-2">
              {['overview', 'timeline', 'regret', 'decision'].map((view) => (
                <Button
                  key={view}
                  variant={currentView === view ? "default" : "outline"}
                  onClick={() => setCurrentView(view as any)}
                  className={currentView === view 
                    ? "bg-purple-600" 
                    : "border-white/30 text-white hover:bg-white/10"
                  }
                >
                  {view.charAt(0).toUpperCase() + view.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Scenario Selector */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Select Scenarios to Compare</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-300 mb-2 block">Scenario 1</label>
              <select
                value={selectedScenarios[0]}
                onChange={(e) => setSelectedScenarios([parseInt(e.target.value), selectedScenarios[1]])}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
              >
                {scenarios.map((scenario, index) => (
                  <option key={scenario.id} value={index} className="bg-gray-900">
                    {scenario.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-300 mb-2 block">Scenario 2</label>
              <select
                value={selectedScenarios[1]}
                onChange={(e) => setSelectedScenarios([selectedScenarios[0], parseInt(e.target.value)])}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
              >
                {scenarios.map((scenario, index) => (
                  <option key={scenario.id} value={index} className="bg-gray-900">
                    {scenario.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {currentView === 'overview' && (
          <div className="space-y-8">
            {/* Split Screen Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[scenario1, scenario2].map((scenario, index) => (
                <Card key={scenario.id} className="bg-white/10 backdrop-blur-sm border-white/20">
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <img 
                      src={`https://images.unsplash.com/${scenario.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`}
                      alt={scenario.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white">{scenario.title}</h3>
                      <p className="text-blue-200">{scenario.career}</p>
                    </div>
                    <Badge className={`absolute top-4 right-4 ${index === 0 ? 'bg-purple-600' : 'bg-pink-600'}`}>
                      Scenario {index + 1}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-2 text-green-400" />
                        {scenario.salaryRange}
                      </div>
                      <div className="flex items-center">
                        <Home className="h-4 w-4 mr-2 text-blue-400" />
                        {scenario.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-yellow-400" />
                        {scenario.workLifeBalance}% Balance
                      </div>
                      <div className="flex items-center">
                        <Zap className="h-4 w-4 mr-2 text-red-400" />
                        {scenario.stressLevel}% Stress
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-1">
                        {calculateWeightedScore(index)}%
                      </div>
                      <div className="text-sm text-gray-300">Weighted Score</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Radar Chart Comparison */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Multi-Dimensional Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={generateComparisonData()}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="category" className="text-white text-sm" />
                      <PolarRadiusAxis domain={[0, 100]} className="text-gray-400 text-xs" />
                      <Radar
                        name={scenario1.title}
                        dataKey="scenario1"
                        stroke="#8b5cf6"
                        fill="#8b5cf6"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                      <Radar
                        name={scenario2.title}
                        dataKey="scenario2"
                        stroke="#ec4899"
                        fill="#ec4899"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Values Weight Adjuster */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Adjust Your Priorities</CardTitle>
                <p className="text-gray-300">Weight different factors based on what matters most to you</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(userValues).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-white capitalize">{key}</label>
                      <span className="text-purple-300">{value}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={value}
                      onChange={(e) => setUserValues(prev => ({ ...prev, [key]: parseInt(e.target.value) }))}
                      className="w-full h-2 bg-white/20 rounded-lg appearance-none slider"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {currentView === 'regret' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Future Regret Prevention</h2>
              <p className="text-xl text-gray-300">What would your future self think about these choices?</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[scenario1, scenario2].map((scenario, index) => {
                const regretAnalysis = getRegretAnalysis(scenario);
                return (
                  <Card key={scenario.id} className="bg-white/10 backdrop-blur-sm border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white">{scenario.title}</CardTitle>
                      <Badge className={index === 0 ? 'bg-purple-600' : 'bg-pink-600'}>
                        Scenario {index + 1}
                      </Badge>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold text-red-300 mb-3">Potential Regrets</h4>
                        <ul className="space-y-2">
                          {regretAnalysis.potentialRegrets.map((regret, i) => (
                            <li key={i} className="flex items-start">
                              <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                              <span className="text-gray-300">{regret}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-white/5 rounded-lg p-4">
                          <div className="flex items-center mb-2">
                            <span className="text-2xl mr-2">🔮</span>
                            <span className="font-semibold text-purple-300">At Age 30</span>
                          </div>
                          <p className="text-gray-300">{regretAnalysis.at30}</p>
                        </div>

                        <div className="bg-white/5 rounded-lg p-4">
                          <div className="flex items-center mb-2">
                            <span className="text-2xl mr-2">⏰</span>
                            <span className="font-semibold text-blue-300">At Age 40</span>
                          </div>
                          <p className="text-gray-300">{regretAnalysis.at40}</p>
                        </div>

                        <div className="bg-white/5 rounded-lg p-4">
                          <div className="flex items-center mb-2">
                            <span className="text-2xl mr-2">🎯</span>
                            <span className="font-semibold text-green-300">At Age 50</span>
                          </div>
                          <p className="text-gray-300">{regretAnalysis.at50}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {currentView === 'decision' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Final Decision Support</h2>
              <p className="text-xl text-gray-300">Which path aligns best with your values and goals?</p>
            </div>

            <Card className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border-white/20">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-purple-400 mb-2">
                      {calculateWeightedScore(0)}%
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{scenario1.title}</h3>
                    <p className="text-gray-300">Match Score</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-6xl font-bold text-pink-400 mb-2">
                      {calculateWeightedScore(1)}%
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{scenario2.title}</h3>
                    <p className="text-gray-300">Match Score</p>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-3 text-lg">
                    <Star className="mr-2 h-5 w-5" />
                    Choose {calculateWeightedScore(0) > calculateWeightedScore(1) ? scenario1.title : scenario2.title}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScenarioComparison;
