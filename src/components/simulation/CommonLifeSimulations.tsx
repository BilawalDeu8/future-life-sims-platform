
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, RefreshCw, Rocket, Briefcase, Code, Heart } from "lucide-react";

interface CommonLifeSimulationsProps {
  onSelectScenario: (scenario: any) => void;
}

const CommonLifeSimulations: React.FC<CommonLifeSimulationsProps> = ({ onSelectScenario }) => {
  const commonScenarios = [
    {
      id: "fresh-graduate",
      title: "Fresh Graduate",
      icon: GraduationCap,
      description: "Just graduated from college, looking for your first job",
      career: "Entry Level Professional",
      location: "Major City",
      salaryRange: "$45k - $65k",
      workLifeBalance: 70,
      stressLevel: 60,
      lifestyle: "Learning and growing professional",
      image: "photo-1523240795612-9a054b0db644",
      livingSpace: "Shared apartment or studio",
      socialLife: "Young professional networks, college friends"
    },
    {
      id: "career-changer",
      title: "Career Changer", 
      icon: RefreshCw,
      description: "Switching careers after 5+ years in another field",
      career: "Transitioning Professional",
      location: "Current City",
      salaryRange: "$50k - $80k",
      workLifeBalance: 65,
      stressLevel: 75,
      lifestyle: "Adaptable and determined",
      image: "photo-1560472354-b33ff0c44a43",
      livingSpace: "1-2 bedroom apartment",
      socialLife: "Mixed networks from old and new career"
    },
    {
      id: "entrepreneur",
      title: "Entrepreneur",
      icon: Rocket,
      description: "Starting your own business or startup",
      career: "Startup Founder",
      location: "Startup Hub",
      salaryRange: "$0 - $200k+",
      workLifeBalance: 30,
      stressLevel: 90,
      lifestyle: "High-risk, high-reward innovator",
      image: "photo-1522202176988-66273c2fd55f",
      livingSpace: "Modest while bootstrapping",
      socialLife: "Investor meetups, startup communities"
    },
    {
      id: "remote-worker",
      title: "Remote Worker",
      icon: Code,
      description: "Working remotely for a company or as a freelancer",
      career: "Remote Professional",
      location: "Location Independent",
      salaryRange: "$60k - $120k",
      workLifeBalance: 85,
      stressLevel: 45,
      lifestyle: "Flexible and location-independent",
      image: "photo-1500673922987-e212871fec22",
      livingSpace: "Flexible living arrangements",
      socialLife: "Digital communities, co-working spaces"
    },
    {
      id: "corporate-climber",
      title: "Corporate Climber",
      icon: Briefcase,
      description: "Focused on climbing the corporate ladder",
      career: "Corporate Professional",
      location: "Business District",
      salaryRange: "$80k - $150k",
      workLifeBalance: 50,
      stressLevel: 70,
      lifestyle: "Ambitious and goal-oriented",
      image: "photo-1507003211169-0a1dd7228f2d",
      livingSpace: "Upscale apartment",
      socialLife: "Professional networking, corporate events"
    },
    {
      id: "work-life-balance",
      title: "Work-Life Balance Seeker",
      icon: Heart,
      description: "Prioritizing family and personal life over career advancement",
      career: "Balanced Professional",
      location: "Family-Friendly Area",
      salaryRange: "$55k - $85k",
      workLifeBalance: 90,
      stressLevel: 35,
      lifestyle: "Family-focused and community-oriented",
      image: "photo-1519085360753-af0119f7cbe7",
      livingSpace: "Family home or spacious apartment",
      socialLife: "Family gatherings, community groups"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Quick Life Simulations</h2>
        <p className="text-gray-300">Get started with these common life paths</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {commonScenarios.map((scenario) => {
          const IconComponent = scenario.icon;
          return (
            <Card 
              key={scenario.id}
              className="bg-white/10 backdrop-blur-sm border-white/20 hover:scale-105 transition-all duration-300 cursor-pointer group"
              onClick={() => onSelectScenario(scenario)}
            >
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{scenario.title}</h3>
                  <p className="text-gray-300 text-sm">{scenario.description}</p>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Salary Range</span>
                    <span className="text-green-400">{scenario.salaryRange}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Work-Life Balance</span>
                    <div className="w-16 bg-white/20 rounded-full h-1.5">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-blue-400 h-1.5 rounded-full"
                        style={{ width: `${scenario.workLifeBalance}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Stress Level</span>
                    <div className="w-16 bg-white/20 rounded-full h-1.5">
                      <div 
                        className="bg-gradient-to-r from-yellow-400 to-red-400 h-1.5 rounded-full"
                        style={{ width: `${scenario.stressLevel}%` }}
                      />
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  Try This Path
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CommonLifeSimulations;
