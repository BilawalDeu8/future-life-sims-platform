
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, Home, Users, Car, Heart, TrendingUp } from "lucide-react";

interface LifeSnapshot {
  year: number;
  title: string;
  description: string;
  livingSpace: string;
  relationships: string;
  possessions: string[];
  achievements: string[];
  challenges: string[];
  mood: number;
  financial: string;
  image: string;
}

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

interface LifeSnapshotsGalleryProps {
  scenario: LifeScenario;
  onBack: () => void;
}

const getLifeSnapshots = (scenarioId: string): LifeSnapshot[] => {
  const snapshots: Record<string, LifeSnapshot[]> = {
    "tech-startup": [
      {
        year: 1,
        title: "Getting Established",
        description: "You've survived your first year in tech. The learning curve was steep, but you're finding your rhythm.",
        livingSpace: "Shared apartment with roommates in SOMA",
        relationships: "Dating casually, building friendships with coworkers",
        possessions: ["Latest MacBook Pro", "Standing desk setup", "Bicycle for commuting"],
        achievements: ["Shipped first major feature", "Completed coding bootcamp alumni network", "Built side project"],
        challenges: ["Imposter syndrome", "Work-life balance", "High cost of living"],
        mood: 75,
        financial: "Building emergency fund, paying off student loans",
        image: "photo-1581091226825-a6a2a5aee158"
      },
      {
        year: 5,
        title: "Rising Star",
        description: "You're now a senior developer with equity that's actually worth something. The startup is growing fast.",
        livingSpace: "One-bedroom apartment in Mission Bay",
        relationships: "In a serious relationship, professional network growing",
        possessions: ["Tesla Model 3", "High-end gaming setup", "Investment portfolio"],
        achievements: ["Promoted to tech lead", "Equity vest milestone", "Speaking at conferences"],
        challenges: ["Startup pressure", "Relationship vs career balance", "Stock volatility"],
        mood: 80,
        financial: "Six-figure savings, considering property investment",
        image: "photo-1487958449943-2429e8be8625"
      },
      {
        year: 10,
        title: "Tech Executive",
        description: "You're now a CTO at a successful scale-up. Your early equity paid off big time.",
        livingSpace: "Luxury condo in Pacific Heights",
        relationships: "Married with first child on the way",
        possessions: ["Porsche 911", "Smart home automation", "Vacation home in Tahoe"],
        achievements: ["IPO success", "Industry recognition", "Angel investor portfolio"],
        challenges: ["Work stress", "Family planning", "Wealth management"],
        mood: 85,
        financial: "Multi-millionaire, planning early retirement",
        image: "photo-1470071459604-3b5ec3a7fe05"
      }
    ]
    // Add other scenarios...
  };

  return snapshots[scenarioId] || snapshots["tech-startup"];
};

const LifeSnapshotsGallery: React.FC<LifeSnapshotsGalleryProps> = ({ scenario, onBack }) => {
  const [selectedYear, setSelectedYear] = useState(1);
  const snapshots = getLifeSnapshots(scenario.id);
  const currentSnapshot = snapshots.find(s => s.year === selectedYear) || snapshots[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-white hover:bg-white/10"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Overview
        </Button>
        <div className="text-center">
          <h2 className="text-3xl font-bold">Your Life Journey</h2>
          <p className="text-blue-200">See how your life evolves over time</p>
        </div>
        <div></div>
      </div>

      {/* Year Selector */}
      <div className="flex justify-center space-x-4">
        {snapshots.map((snapshot) => (
          <Button
            key={snapshot.year}
            variant={selectedYear === snapshot.year ? "default" : "outline"}
            onClick={() => setSelectedYear(snapshot.year)}
            className={selectedYear === snapshot.year 
              ? "bg-gradient-to-r from-purple-600 to-pink-600" 
              : "border-white/30 text-white hover:bg-white/10"
            }
          >
            <Calendar className="mr-2 h-4 w-4" />
            Year {snapshot.year}
          </Button>
        ))}
      </div>

      {/* Main Snapshot View */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <div className="relative h-96 overflow-hidden rounded-t-lg">
          <img 
            src={`https://images.unsplash.com/${currentSnapshot.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80`}
            alt={currentSnapshot.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <h3 className="text-4xl font-bold text-white mb-2">{currentSnapshot.title}</h3>
            <p className="text-xl text-blue-200">{currentSnapshot.description}</p>
          </div>
        </div>

        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Living Situation */}
            <div className="space-y-6">
              <div className="bg-white/5 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <Home className="h-6 w-6 text-blue-400 mr-3" />
                  <h4 className="text-xl font-semibold text-white">Living Space</h4>
                </div>
                <p className="text-gray-300">{currentSnapshot.livingSpace}</p>
              </div>

              <div className="bg-white/5 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <Users className="h-6 w-6 text-pink-400 mr-3" />
                  <h4 className="text-xl font-semibold text-white">Relationships</h4>
                </div>
                <p className="text-gray-300">{currentSnapshot.relationships}</p>
              </div>

              <div className="bg-white/5 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <TrendingUp className="h-6 w-6 text-green-400 mr-3" />
                  <h4 className="text-xl font-semibold text-white">Financial Status</h4>
                </div>
                <p className="text-gray-300">{currentSnapshot.financial}</p>
              </div>
            </div>

            {/* Achievements & Possessions */}
            <div className="space-y-6">
              <div className="bg-white/5 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <Car className="h-6 w-6 text-purple-400 mr-3" />
                  <h4 className="text-xl font-semibold text-white">Major Possessions</h4>
                </div>
                <ul className="space-y-2">
                  {currentSnapshot.possessions.map((item, index) => (
                    <li key={index} className="text-gray-300 flex items-center">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-3" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/5 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <Heart className="h-6 w-6 text-yellow-400 mr-3" />
                  <h4 className="text-xl font-semibold text-white">Key Achievements</h4>
                </div>
                <ul className="space-y-2">
                  {currentSnapshot.achievements.map((achievement, index) => (
                    <li key={index} className="text-gray-300 flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-3" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/5 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="h-6 w-6 text-red-400 mr-3 flex items-center justify-center">⚠️</div>
                  <h4 className="text-xl font-semibold text-white">Current Challenges</h4>
                </div>
                <ul className="space-y-2">
                  {currentSnapshot.challenges.map((challenge, index) => (
                    <li key={index} className="text-gray-300 flex items-center">
                      <div className="w-2 h-2 bg-red-400 rounded-full mr-3" />
                      {challenge}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Overall Satisfaction */}
          <div className="mt-8 text-center bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-6">
            <h4 className="text-xl font-semibold text-white mb-4">Overall Life Satisfaction</h4>
            <div className="w-full max-w-md mx-auto bg-white/20 rounded-full h-4">
              <div 
                className="bg-gradient-to-r from-purple-400 to-pink-400 h-4 rounded-full transition-all duration-1000"
                style={{ width: `${currentSnapshot.mood}%` }}
              />
            </div>
            <div className="text-2xl font-bold text-white mt-2">{currentSnapshot.mood}%</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LifeSnapshotsGallery;
