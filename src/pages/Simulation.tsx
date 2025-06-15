
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, DollarSign, Clock, Zap, Users, GitCompare, Settings, Plus } from "lucide-react";
import ScenarioDetail from "@/components/simulation/ScenarioDetail";
import ScenarioComparison from "@/components/simulation/ScenarioComparison";
import PersonalizationWidget from "@/components/personalization/PersonalizationWidget";
import TouchOptimizedCard from "@/components/mobile/TouchOptimizedCard";
import SwipeNavigation from "@/components/mobile/SwipeNavigation";
import MobileHeader from "@/components/mobile/MobileHeader";
import CommonLifeSimulations from "@/components/simulation/CommonLifeSimulations";
import { useNavigate } from 'react-router-dom';
import { usePersonalization } from '@/hooks/usePersonalization';
import { useIsMobile } from '@/hooks/use-mobile';

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

const Simulation = () => {
  const navigate = useNavigate();
  const { profile, updateProfile } = usePersonalization();
  const [selectedScenario, setSelectedScenario] = useState<LifeScenario | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [showPersonalization, setShowPersonalization] = useState(false);
  const [scenarios, setScenarios] = useState<LifeScenario[]>([]);
  const [currentMobileView, setCurrentMobileView] = useState(0);
  const isMobile = useIsMobile();

  // Get user's location from localStorage (set during onboarding)
  const getUserLocation = () => {
    const onboardingData = localStorage.getItem('onboardingData');
    if (onboardingData) {
      const data = JSON.parse(onboardingData);
      return data.personalFoundation?.location || 'Bangalore, India';
    }
    return 'Bangalore, India';
  };

  const userLocation = getUserLocation();
  const isIndianLocation = userLocation.toLowerCase().includes('india');

  useEffect(() => {
    // Create personalized scenarios based on user's location and preferences
    const baseScenarios = isIndianLocation ? [
      {
        id: "tech-bangalore",
        title: "Tech Innovator",
        career: "Software Developer at Startup",
        location: "Bangalore, India",
        salaryRange: "₹12L - ₹25L",
        workLifeBalance: 65,
        stressLevel: 75,
        lifestyle: "Fast-paced tech hub professional",
        image: "photo-1581091226825-a6a2a5aee158",
        description: "Living the Silicon Valley of India dream with cutting-edge technology and high growth potential",
        livingSpace: "Modern 2BHK apartment in Koramangala",
        socialLife: "Tech meetups, craft breweries, weekend hackathons"
      },
      {
        id: "finance-mumbai",
        title: "Financial Analyst",
        career: "Investment Banking Analyst",
        location: "Mumbai, India",
        salaryRange: "₹15L - ₹35L",
        workLifeBalance: 45,
        stressLevel: 85,
        lifestyle: "High-powered financial district professional",
        image: "photo-1470071459604-3b5ec3a7fe05",
        description: "Fast track to financial success in India's financial capital",
        livingSpace: "Luxury high-rise apartment in Bandra",
        socialLife: "Corporate events, fine dining, exclusive networking"
      },
      {
        id: "startup-delhi",
        title: "Entrepreneur",
        career: "Startup Founder",
        location: "Delhi NCR, India",
        salaryRange: "₹8L - ₹50L+",
        workLifeBalance: 30,
        stressLevel: 90,
        lifestyle: "High-risk, high-reward innovator",
        image: "photo-1522202176988-66273c2fd55f",
        description: "Build the next unicorn in India's startup ecosystem",
        livingSpace: "Co-working space with attached living quarters",
        socialLife: "Investor meetups, startup events, networking dinners"
      },
      {
        id: "consulting-pune",
        title: "Strategy Consultant",
        career: "Management Consultant",
        location: "Pune, India",
        salaryRange: "₹18L - ₹40L",
        workLifeBalance: 55,
        stressLevel: 70,
        lifestyle: "Strategic problem-solver and advisor",
        image: "photo-1507003211169-0a1dd7228f2d",
        description: "Help transform businesses across industries in India's consulting hub",
        livingSpace: "Upscale apartment in Koregaon Park",
        socialLife: "Business networking, cultural events, weekend getaways"
      },
      {
        id: "remote-anywhere",
        title: "Digital Nomad",
        career: "Remote Product Manager",
        location: "Location Independent (India)",
        salaryRange: "₹20L - ₹45L",
        workLifeBalance: 85,
        stressLevel: 45,
        lifestyle: "Freedom-focused remote worker",
        image: "photo-1500673922987-e212871fec22",
        description: "Work from anywhere while managing global products for international companies",
        livingSpace: "Co-living spaces from Goa to Himachal",
        socialLife: "Digital nomad communities, local cultural experiences"
      },
      {
        id: "pharma-hyderabad",
        title: "Biotech Researcher",
        career: "Pharmaceutical Researcher",
        location: "Hyderabad, India",
        salaryRange: "₹10L - ₹28L",
        workLifeBalance: 75,
        stressLevel: 60,
        lifestyle: "Science-driven innovator",
        image: "photo-1523712999610-f77fbcfc3843",
        description: "Contribute to breakthrough medical research in India's pharma capital",
        livingSpace: "Modern apartment near HITEC City",
        socialLife: "Research conferences, science clubs, outdoor activities"
      }
    ] : [
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

    setScenarios(baseScenarios);
  }, [isIndianLocation]);

  if (showComparison) {
    return (
      <ScenarioComparison 
        scenarios={scenarios} 
        onBack={() => setShowComparison(false)}
      />
    );
  }

  if (selectedScenario) {
    return (
      <ScenarioDetail 
        scenario={selectedScenario} 
        onBack={() => setSelectedScenario(null)}
      />
    );
  }

  // Mobile view components
  const mobileViews = [
    // Header view
    <div key="header" className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-4 flex flex-col">
      <div className="text-center py-8 flex-shrink-0">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
          Life Path Simulator
        </h1>
        <p className="text-lg text-gray-300 mb-2">
          Explore different career paths
        </p>
        <p className="text-sm text-blue-200 mb-6">
          Personalized for {userLocation}
        </p>
      </div>
      
      <div className="flex-1 flex flex-col justify-center space-y-4 pb-8 px-2">
        <Button
          onClick={() => navigate('/timeline')}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 py-4 text-white text-lg"
        >
          Experience Your Life Timeline
        </Button>
        <Button
          onClick={() => navigate('/create-path')}
          className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 py-4 text-white text-lg"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create Custom Path
        </Button>
        <Button
          onClick={() => setShowComparison(true)}
          className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 py-4 text-white text-lg"
        >
          <GitCompare className="h-5 w-5 mr-2" />
          Compare Life Paths
        </Button>
        <Button
          onClick={() => navigate('/community')}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-4 text-white text-lg"
        >
          <Users className="h-5 w-5 mr-2" />
          Connect with Community
        </Button>
      </div>
    </div>,
    // Common simulations view
    <div key="common" className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <CommonLifeSimulations onSelectScenario={setSelectedScenario} />
    </div>,
    // Scenarios grid view
    <div key="scenarios" className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div className="p-4 pb-20">
        <div className="text-center mb-6 pt-4">
          <h2 className="text-2xl font-bold text-white mb-2">Career Scenarios</h2>
          <p className="text-blue-200">Tap any path to explore</p>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {scenarios.map((scenario) => (
            <TouchOptimizedCard
              key={scenario.id}
              scenario={scenario}
              onSelect={setSelectedScenario}
              index={scenarios.indexOf(scenario)}
            />
          ))}
        </div>
      </div>
    </div>
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* Personalization Widget */}
      {showPersonalization && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <PersonalizationWidget
            profile={profile}
            onUpdateProfile={updateProfile}
            onClose={() => setShowPersonalization(false)}
          />
        </div>
      )}

      {isMobile ? (
        <div className="h-screen flex flex-col">
          <MobileHeader
            onPersonalizationClick={() => setShowPersonalization(true)}
            onComparisonClick={() => setShowComparison(true)}
            onCommunityClick={() => navigate('/community')}
            onTimelineClick={() => navigate('/timeline')}
          />
          <div className="flex-1 overflow-hidden">
            <SwipeNavigation
              currentIndex={currentMobileView}
              onIndexChange={setCurrentMobileView}
              className="h-full"
            >
              {mobileViews}
            </SwipeNavigation>
          </div>
        </div>
      ) : (
        <>
          {/* Desktop Header */}
          <div className="text-center py-12">
            <div className="flex justify-center items-center mb-4">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Life Path Simulator
              </h1>
              <Button
                onClick={() => setShowPersonalization(true)}
                className="ml-4 bg-purple-600/20 border border-purple-400 text-purple-300 hover:bg-purple-600/30 hover:text-white"
                size="sm"
              >
                <Settings className="h-4 w-4 mr-2" />
                Personalize
              </Button>
            </div>
            <p className="text-xl text-gray-300 mb-4">
              Explore different career paths and see where they lead in {userLocation}
            </p>
            <p className="text-sm text-blue-200 mb-8">
              Scenarios personalized based on your location and preferences
            </p>
            
            {/* Fixed Desktop Button Layout */}
            <div className="max-w-5xl mx-auto px-4">
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Button
                  onClick={() => navigate('/timeline')}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 px-6 py-3 text-white flex-shrink-0"
                >
                  Experience Your Life Timeline
                </Button>
                <Button
                  onClick={() => navigate('/create-path')}
                  className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 px-6 py-3 text-white flex-shrink-0"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Create Custom Path
                </Button>
                <Button
                  onClick={() => setShowComparison(true)}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 px-6 py-3 text-white flex-shrink-0"
                >
                  <GitCompare className="h-5 w-5 mr-2" />
                  Compare Life Paths
                </Button>
                <Button
                  onClick={() => navigate('/community')}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-3 text-white flex-shrink-0"
                >
                  <Users className="h-5 w-5 mr-2" />
                  Connect with Community
                </Button>
              </div>
            </div>
          </div>

          {/* Common Life Simulations Section */}
          <div className="mb-12">
            <CommonLifeSimulations onSelectScenario={setSelectedScenario} />
          </div>

          {/* Desktop Content */}
          <div className="max-w-6xl mx-auto px-4 pb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Detailed Career Scenarios</h2>
              <p className="text-gray-300">Deep dive into specific career paths</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {scenarios.map((scenario) => (
                <Card 
                  key={scenario.id}
                  className="bg-white/10 backdrop-blur-sm border-white/20 hover:scale-105 transition-all duration-300 cursor-pointer group overflow-hidden"
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
                          <span className="text-gray-300">{scenario.location}</span>
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1 text-green-400" />
                          <span className="text-gray-300">{scenario.salaryRange}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-blue-400" />
                            <span className="text-sm text-gray-300">Work-Life Balance</span>
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
                            <span className="text-sm text-gray-300">Stress Level</span>
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
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 group-hover:shadow-lg transition-all duration-300 text-white"
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
        </>
      )}
    </div>
  );
};

export default Simulation;
