
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Heart, X, Star, MapPin, Calendar, MessageSquare, Video, Filter } from "lucide-react";
import MentorProfile from './MentorProfile';

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

interface MentorDiscoveryProps {
  onBack: () => void;
}

const MentorDiscovery: React.FC<MentorDiscoveryProps> = ({ onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedMentors, setLikedMentors] = useState<string[]>([]);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const mentors: Mentor[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      title: 'Senior Software Engineer',
      company: 'Google',
      location: 'San Francisco, CA',
      avatar: 'id_1',
      background: 'Transitioned from finance to tech, self-taught programmer',
      expertise: ['Career Transition', 'Tech Industry', 'Work-Life Balance'],
      experience: 8,
      rating: 4.9,
      responseTime: '< 2 hours',
      callPrice: 75,
      bio: 'Helping ambitious professionals navigate tech careers and maintain sanity.',
      compatibility: 94,
      lifestyle: ['Remote Work', 'Travel', 'Minimalist'],
      values: ['Growth', 'Innovation', 'Balance'],
      videoIntro: 'intro1.mp4'
    },
    {
      id: '2',
      name: 'Marcus Johnson',
      title: 'Creative Director',
      company: 'Nike',
      location: 'Portland, OR',
      avatar: 'id_2',
      background: 'Built creative agency from scratch, sold to Fortune 500',
      expertise: ['Creative Leadership', 'Entrepreneurship', 'Brand Strategy'],
      experience: 12,
      rating: 4.8,
      responseTime: '< 4 hours',
      callPrice: 120,
      bio: 'Passionate about helping creatives build sustainable, profitable careers.',
      compatibility: 87,
      lifestyle: ['Creative Freedom', 'Urban Living', 'Health Focused'],
      values: ['Creativity', 'Authenticity', 'Impact'],
      videoIntro: 'intro2.mp4'
    },
    {
      id: '3',
      name: 'Dr. Priya Patel',
      title: 'Medical Director',
      company: 'Johns Hopkins',
      location: 'Baltimore, MD',
      avatar: 'id_3',
      background: 'First-generation immigrant, Harvard Med, healthcare innovation leader',
      expertise: ['Healthcare Leadership', 'Work-Life Integration', 'Career Resilience'],
      experience: 15,
      rating: 5.0,
      responseTime: '< 1 day',
      callPrice: 200,
      bio: 'Mentoring the next generation of healthcare leaders and change-makers.',
      compatibility: 91,
      lifestyle: ['Purpose-Driven', 'Family Focused', 'Community Involved'],
      values: ['Service', 'Excellence', 'Compassion'],
      videoIntro: 'intro3.mp4'
    }
  ];

  const currentMentor = mentors[currentIndex];

  const handleSwipeLeft = () => {
    if (currentIndex < mentors.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSwipeRight = () => {
    setLikedMentors([...likedMentors, currentMentor.id]);
    if (currentIndex < mentors.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (selectedMentor) {
    return <MentorProfile mentor={selectedMentor} onBack={() => setSelectedMentor(null)} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="text-white hover:bg-white/10">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Community
        </Button>
        <h1 className="text-3xl font-bold text-white">Discover Mentors</h1>
        <Button variant="ghost" className="text-white hover:bg-white/10">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Search */}
      <div className="flex space-x-4">
        <Input
          placeholder="Search by expertise, industry, or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
        />
      </div>

      {/* Swipe Interface */}
      <div className="max-w-md mx-auto">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 overflow-hidden">
          <div className="relative">
            <img 
              src={`https://images.unsplash.com/${currentMentor.avatar}?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`}
              alt={currentMentor.name}
              className="w-full h-64 object-cover"
            />
            <div className="absolute top-4 right-4">
              <Badge className="bg-green-600 text-white">
                {currentMentor.compatibility}% Match
              </Badge>
            </div>
          </div>

          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-white text-xl">{currentMentor.name}</CardTitle>
                <p className="text-gray-300">{currentMentor.title}</p>
                <p className="text-gray-400 text-sm">{currentMentor.company}</p>
              </div>
              <div className="flex items-center text-yellow-400">
                <Star className="h-4 w-4 fill-current" />
                <span className="ml-1 text-white">{currentMentor.rating}</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center text-gray-300 text-sm">
              <MapPin className="h-4 w-4 mr-1" />
              {currentMentor.location}
            </div>

            <p className="text-gray-300 text-sm">{currentMentor.bio}</p>

            <div className="space-y-2">
              <p className="text-white font-medium">Expertise:</p>
              <div className="flex flex-wrap gap-2">
                {currentMentor.expertise.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-blue-300 border-blue-400">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-white font-medium">Lifestyle:</p>
              <div className="flex flex-wrap gap-2">
                {currentMentor.lifestyle.map((item) => (
                  <Badge key={item} variant="outline" className="text-purple-300 border-purple-400">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <p className="text-gray-400">Experience</p>
                <p className="text-white font-medium">{currentMentor.experience} years</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400">Response Time</p>
                <p className="text-white font-medium">{currentMentor.responseTime}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-6 pt-4">
              <Button
                onClick={handleSwipeLeft}
                size="lg"
                variant="outline"
                className="rounded-full w-16 h-16 border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
              >
                <X className="h-6 w-6" />
              </Button>

              <Button
                onClick={() => setSelectedMentor(currentMentor)}
                size="lg"
                variant="outline"
                className="rounded-full w-16 h-16 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
              >
                <MessageSquare className="h-6 w-6" />
              </Button>

              <Button
                onClick={handleSwipeRight}
                size="lg"
                variant="outline"
                className="rounded-full w-16 h-16 border-green-400 text-green-400 hover:bg-green-400 hover:text-white"
              >
                <Heart className="h-6 w-6" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-4 text-gray-400">
          {currentIndex + 1} of {mentors.length} mentors
        </div>
      </div>

      {/* Liked Mentors */}
      {likedMentors.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold text-white mb-4">Your Matches ({likedMentors.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mentors
              .filter(mentor => likedMentors.includes(mentor.id))
              .map((mentor) => (
                <Card key={mentor.id} className="bg-white/10 backdrop-blur-sm border-white/20 cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => setSelectedMentor(mentor)}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={`https://images.unsplash.com/${mentor.avatar}?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80`} />
                        <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-white font-medium">{mentor.name}</p>
                        <p className="text-gray-400 text-sm">{mentor.title}</p>
                      </div>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorDiscovery;
