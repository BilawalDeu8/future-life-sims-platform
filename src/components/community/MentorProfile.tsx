
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Star, MapPin, Calendar, MessageSquare, Video, Clock, DollarSign, Heart, Users } from "lucide-react";
import QuestionSubmission from './QuestionSubmission';
import VideoCallScheduler from './VideoCallScheduler';

interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  location: string;
  avatar: string;
  background: string;
  expertise: string[];
  experience: number;
  rating: number;
  responseTime: string;
  callPrice: number;
  bio: string;
  compatibility: number;
  lifestyle: string[];
  values: string[];
  videoIntro: string;
}

interface MentorProfileProps {
  mentor: Mentor;
  onBack: () => void;
}

type ProfileSection = 'overview' | 'question' | 'schedule';

const MentorProfile: React.FC<MentorProfileProps> = ({ mentor, onBack }) => {
  const [currentSection, setCurrentSection] = useState<ProfileSection>('overview');
  const [isFollowing, setIsFollowing] = useState(false);

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'question':
        return <QuestionSubmission mentor={mentor} onBack={() => setCurrentSection('overview')} />;
      case 'schedule':
        return <VideoCallScheduler mentor={mentor} onBack={() => setCurrentSection('overview')} />;
      default:
        return (
          <div className="space-y-6">
            {/* Hero Section */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 overflow-hidden">
              <div className="relative">
                <img 
                  src={`https://images.unsplash.com/${mentor.avatar}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`}
                  alt={mentor.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <h1 className="text-3xl font-bold text-white mb-2">{mentor.name}</h1>
                      <p className="text-xl text-blue-200">{mentor.title}</p>
                      <p className="text-lg text-gray-300">{mentor.company}</p>
                      <div className="flex items-center mt-2 text-gray-300">
                        <MapPin className="h-4 w-4 mr-1" />
                        {mentor.location}
                      </div>
                    </div>
                    <Badge className="bg-green-600 text-white text-lg px-3 py-1">
                      {mentor.compatibility}% Match
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center p-4">
                <div className="flex items-center justify-center text-yellow-400 mb-2">
                  <Star className="h-5 w-5 fill-current" />
                  <span className="ml-1 text-white font-bold">{mentor.rating}</span>
                </div>
                <p className="text-gray-400 text-sm">Rating</p>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center p-4">
                <div className="flex items-center justify-center text-blue-400 mb-2">
                  <Clock className="h-5 w-5" />
                  <span className="ml-1 text-white font-bold">{mentor.responseTime}</span>
                </div>
                <p className="text-gray-400 text-sm">Response Time</p>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center p-4">
                <div className="flex items-center justify-center text-green-400 mb-2">
                  <DollarSign className="h-5 w-5" />
                  <span className="ml-1 text-white font-bold">{mentor.callPrice}</span>
                </div>
                <p className="text-gray-400 text-sm">Per Call</p>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center p-4">
                <div className="flex items-center justify-center text-purple-400 mb-2">
                  <Users className="h-5 w-5" />
                  <span className="ml-1 text-white font-bold">{mentor.experience}y</span>
                </div>
                <p className="text-gray-400 text-sm">Experience</p>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                onClick={() => setCurrentSection('question')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-16"
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                Ask Question ($Free)
              </Button>

              <Button 
                onClick={() => setCurrentSection('schedule')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 h-16"
              >
                <Video className="h-5 w-5 mr-2" />
                Schedule Call (${mentor.callPrice})
              </Button>

              <Button 
                onClick={() => setIsFollowing(!isFollowing)}
                variant={isFollowing ? "default" : "outline"}
                className={`h-16 ${isFollowing ? 'bg-green-600 hover:bg-green-700' : 'border-gray-400 text-gray-300 hover:bg-white/10'}`}
              >
                <Heart className={`h-5 w-5 mr-2 ${isFollowing ? 'fill-current' : ''}`} />
                {isFollowing ? 'Following' : 'Follow'}
              </Button>
            </div>

            {/* About Section */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">About {mentor.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300 leading-relaxed">{mentor.bio}</p>
                <p className="text-gray-300 leading-relaxed">{mentor.background}</p>
              </CardContent>
            </Card>

            {/* Expertise & Skills */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Expertise & Mentoring Focus</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-gray-400 mb-2">Areas of Expertise:</p>
                  <div className="flex flex-wrap gap-2">
                    {mentor.expertise.map((skill) => (
                      <Badge key={skill} className="bg-blue-600/20 text-blue-300 border-blue-400">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-gray-400 mb-2">Lifestyle & Values:</p>
                  <div className="flex flex-wrap gap-2">
                    {mentor.lifestyle.map((item) => (
                      <Badge key={item} variant="outline" className="text-purple-300 border-purple-400">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-gray-400 mb-2">Core Values:</p>
                  <div className="flex flex-wrap gap-2">
                    {mentor.values.map((value) => (
                      <Badge key={value} variant="outline" className="text-green-300 border-green-400">
                        {value}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Video Introduction */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Video Introduction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-black/30 rounded-lg aspect-video flex items-center justify-center">
                  <Button className="bg-white/20 hover:bg-white/30 rounded-full w-16 h-16">
                    <Video className="h-8 w-8" />
                  </Button>
                </div>
                <p className="text-gray-400 text-sm mt-2">
                  Watch {mentor.name}'s personal introduction and get to know their mentoring style
                </p>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="text-white hover:bg-white/10">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Discovery
        </Button>
        <h1 className="text-2xl font-bold text-white">Mentor Profile</h1>
        <div></div>
      </div>

      {renderCurrentSection()}
    </div>
  );
};

export default MentorProfile;
