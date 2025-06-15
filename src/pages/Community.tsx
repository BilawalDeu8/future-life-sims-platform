
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, UserCheck, Calendar, MessageSquare, Video, MapPin, Trophy } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import MentorDiscovery from '../components/community/MentorDiscovery';
import PeerGroups from '../components/community/PeerGroups';
import LocalMeetups from '../components/community/LocalMeetups';
import SuccessStories from '../components/community/SuccessStories';

type CommunitySection = 'overview' | 'mentors' | 'peers' | 'meetups' | 'stories';

const Community = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState<CommunitySection>('overview');

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'mentors':
        return <MentorDiscovery onBack={() => setCurrentSection('overview')} />;
      case 'peers':
        return <PeerGroups onBack={() => setCurrentSection('overview')} />;
      case 'meetups':
        return <LocalMeetups onBack={() => setCurrentSection('overview')} />;
      case 'stories':
        return <SuccessStories onBack={() => setCurrentSection('overview')} />;
      default:
        return (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Connect. Learn. Grow.
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Transform your career journey with mentors, peers, and real-world connections
              </p>
              <div className="flex justify-center space-x-4 text-sm text-gray-400">
                <span className="flex items-center"><Users className="h-4 w-4 mr-1" />2,847 Active Members</span>
                <span className="flex items-center"><UserCheck className="h-4 w-4 mr-1" />342 Verified Mentors</span>
                <span className="flex items-center"><MapPin className="h-4 w-4 mr-1" />89 Cities</span>
              </div>
            </div>

            {/* Main Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <button 
                onClick={() => setCurrentSection('mentors')}
                className="group bg-gradient-to-br from-blue-600/80 to-purple-600/80 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:from-blue-500/80 hover:to-purple-500/80 transition-all duration-300 hover:scale-105 text-left"
              >
                <UserCheck className="h-12 w-12 text-white mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-white mb-2">Find Mentors</h3>
                <p className="text-blue-100 text-sm mb-4">Connect with professionals living your dream life</p>
                <Badge variant="outline" className="text-blue-200 border-blue-400">342 Mentors</Badge>
              </button>

              <button 
                onClick={() => setCurrentSection('peers')}
                className="group bg-gradient-to-br from-purple-600/80 to-pink-600/80 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:from-purple-500/80 hover:to-pink-500/80 transition-all duration-300 hover:scale-105 text-left"
              >
                <Users className="h-12 w-12 text-white mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-white mb-2">Join Peers</h3>
                <p className="text-purple-100 text-sm mb-4">Connect with others exploring similar paths</p>
                <Badge variant="outline" className="text-purple-200 border-purple-400">127 Groups</Badge>
              </button>

              <button 
                onClick={() => setCurrentSection('meetups')}
                className="group bg-gradient-to-br from-green-600/80 to-emerald-600/80 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:from-green-500/80 hover:to-emerald-500/80 transition-all duration-300 hover:scale-105 text-left"
              >
                <MapPin className="h-12 w-12 text-white mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-white mb-2">Local Meetups</h3>
                <p className="text-green-100 text-sm mb-4">Meet people in your city pursuing similar goals</p>
                <Badge variant="outline" className="text-green-200 border-green-400">43 This Week</Badge>
              </button>

              <button 
                onClick={() => setCurrentSection('stories')}
                className="group bg-gradient-to-br from-orange-600/80 to-red-600/80 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:from-orange-500/80 hover:to-red-500/80 transition-all duration-300 hover:scale-105 text-left"
              >
                <Trophy className="h-12 w-12 text-white mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-white mb-2">Success Stories</h3>
                <p className="text-orange-100 text-sm mb-4">Get inspired by real transformation journeys</p>
                <Badge variant="outline" className="text-orange-200 border-orange-400">856 Stories</Badge>
              </button>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 flex flex-col">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Quick Question
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-gray-300 text-sm mb-4 flex-1">Ask the community anything about your career journey</p>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Ask Question
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20 flex flex-col">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Video className="h-5 w-5 mr-2" />
                    Schedule Call
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-gray-300 text-sm mb-4 flex-1">Book a 1-on-1 video call with a mentor</p>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    Browse Mentors
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20 flex flex-col">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Join Event
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-gray-300 text-sm mb-4 flex-1">Attend networking events and career workshops</p>
                  <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                    See Events
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/simulation')}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Simulation
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {renderCurrentSection()}
      </div>
    </div>
  );
};

export default Community;
