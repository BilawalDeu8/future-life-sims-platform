
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, DollarSign, Clock, Zap } from "lucide-react";
import ScenarioDetail from "@/components/simulation/ScenarioDetail";

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

const scenarios: LifeScenario[] = [
  {
    id: "tech-startup",
    title: "Tech Innovator",
    career: "Software Developer at Startup",
    location: "San Francisco, CA",
    salaryRange: "$95k - $140k",
    workLifeBalance: 65,
    stressLevel: 75,
    lifestyle: "Fast-paced urban professional",
    image: "photo-1581091226825-a6a2a5aee158",
    description: "Living the Silicon Valley dream with cutting-edge technology and high growth potential",
    livingSpace: "Modern studio apartment in SOMA",
    socialLife: "Tech meetups, rooftop bars, weekend hackathons"
  },
  {
    id: "creative-agency",
    title: "Creative Director",
    career: "Marketing Creative in Agency",
    location: "Austin, TX",
    salaryRange: "$75k - $95k",
    workLifeBalance: 70,
    stressLevel: 60,
    lifestyle: "Artistic urban bohemian",
    image: "photo-1487958449943-2429e8be8625",
    description: "Channel your creativity while building brands that matter",
    livingSpace: "Converted loft in the arts district",
    socialLife: "Art galleries, live music, creative collaborations"
  },
  {
    id: "corporate-finance",
    title: "Financial Analyst",
    career: "Investment Banking Analyst",
    location: "New York, NY",
    salaryRange: "$120k - $180k",
    workLifeBalance: 40,
    stressLevel: 85,
    lifestyle: "High-powered corporate professional",
    image: "photo-1470071459604-3b5ec3a7fe05",
    description: "Fast track to financial success in the heart of global finance",
    livingSpace: "Luxury high-rise apartment in Manhattan",
    socialLife: "Corporate events, fine dining, exclusive networking"
  },
  {
    id: "remote-consultant",
    title: "Digital Nomad",
    career: "Remote Strategy Consultant",
    location: "Location Independent",
    salaryRange: "$80k - $120k",
    workLifeBalance: 85,
    stressLevel: 45,
    lifestyle: "Freedom-focused traveler",
    image: "photo-1500673922987-e212871fec22",
    description: "Work from anywhere while building a global client base",
    livingSpace: "Co-living spaces and Airbnbs worldwide",
    socialLife: "Digital nomad communities, local cultural experiences"
  },
  {
    id: "healthcare-professional",
    title: "Healthcare Hero",
    career: "Registered Nurse",
    location: "Denver, CO",
    salaryRange: "$70k - $85k",
    workLifeBalance: 75,
    stressLevel: 70,
    lifestyle: "Purpose-driven community member",
    image: "photo-1523712999610-f77fbcfc3843",
    description: "Make a real difference in people's lives every day",
    livingSpace: "Cozy townhouse near outdoor recreation",
    socialLife: "Healthcare community, outdoor adventures, volunteer work"
  },
  {
    id: "education-leader",
    title: "Education Innovator",
    career: "High School Teacher & Coach",
    location: "Suburban Minneapolis, MN",
    salaryRange: "$55k - $75k",
    workLifeBalance: 80,
    stressLevel: 55,
    lifestyle: "Community-centered educator",
    image: "photo-1721322800607-8c38375eef04",
    description: "Shape the next generation while enjoying work-life balance",
    livingSpace: "Family-friendly suburban home",
    socialLife: "School events, community sports, family gatherings"
  }
];

const Simulation = () => {
  const [selectedScenario, setSelectedScenario] = useState<LifeScenario | null>(null);

  if (selectedScenario) {
    return (
      <ScenarioDetail 
        scenario={selectedScenario} 
        onBack={() => setSelectedScenario(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Your Future Lives Await
            </h1>
            <p className="text-xl text-blue-200 mb-4">
              Experience different career paths before you choose. Click any scenario to live that future.
            </p>
            <Button 
              onClick={() => window.location.href = '/timeline'}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Clock className="mr-2 h-4 w-4" />
              Experience Your Life Timeline
            </Button>
          </div>
        </div>
      </div>

      {/* Scenario Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {scenarios.map((scenario) => (
            <Card 
              key={scenario.id}
              className="group bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer"
              onClick={() => setSelectedScenario(scenario)}
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img 
                  src={`https://images.unsplash.com/${scenario.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`}
                  alt={scenario.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-1">{scenario.title}</h3>
                  <p className="text-blue-200">{scenario.career}</p>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-purple-400" />
                      <span>{scenario.location}</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1 text-green-400" />
                      <span>{scenario.salaryRange}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-blue-400" />
                        <span className="text-sm">Work-Life Balance</span>
                      </div>
                      <div className="w-24 bg-white/20 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${scenario.workLifeBalance}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Zap className="h-4 w-4 mr-2 text-yellow-400" />
                        <span className="text-sm">Stress Level</span>
                      </div>
                      <div className="w-24 bg-white/20 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-yellow-400 to-red-400 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${scenario.stressLevel}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-blue-200 text-sm leading-relaxed">
                    {scenario.description}
                  </p>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 group-hover:shadow-lg transition-all duration-300"
                  >
                    Live This Future
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Simulation;
