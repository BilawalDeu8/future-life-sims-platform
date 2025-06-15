
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Calendar, Clock, Users, Star } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Meetup {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  address: string;
  attendees: number;
  maxAttendees: number;
  category: string;
  host: string;
  rating: number;
  price: number;
  image: string;
  isAttending: boolean;
}

interface LocalMeetupsProps {
  onBack: () => void;
}

const LocalMeetups: React.FC<LocalMeetupsProps> = ({ onBack }) => {
  const [location, setLocation] = useState('San Francisco, CA');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [meetups, setMeetups] = useState<Meetup[]>([
    {
      id: '1',
      title: 'Tech Career Transition Workshop',
      description: 'Learn from professionals who successfully transitioned into tech',
      date: '2024-01-20',
      time: '2:00 PM',
      location: 'WeWork Mission',
      address: '535 Mission St, San Francisco',
      attendees: 23,
      maxAttendees: 30,
      category: 'Workshop',
      host: 'Sarah Chen',
      rating: 4.8,
      price: 25,
      image: 'id_10',
      isAttending: false
    },
    {
      id: '2',
      title: 'Startup Founders Coffee Chat',
      description: 'Casual networking for early-stage startup founders',
      date: '2024-01-22',
      time: '9:00 AM',
      location: 'Blue Bottle Coffee',
      address: '66 Mint St, San Francisco',
      attendees: 12,
      maxAttendees: 15,
      category: 'Networking',
      host: 'Marcus Johnson',
      rating: 4.9,
      price: 0,
      image: 'id_11',
      isAttending: true
    },
    {
      id: '3',
      title: 'Women in Leadership Panel',
      description: 'Panel discussion with female executives from top companies',
      date: '2024-01-25',
      time: '6:30 PM',
      location: 'Salesforce Tower',
      address: '415 Mission St, San Francisco',
      attendees: 87,
      maxAttendees: 100,
      category: 'Panel',
      host: 'Dr. Priya Patel',
      rating: 5.0,
      price: 15,
      image: 'id_12',
      isAttending: false
    },
    {
      id: '4',
      title: 'Creative Freelancers Meetup',
      description: 'Monthly gathering for designers, writers, and creative professionals',
      date: '2024-01-27',
      time: '7:00 PM',
      location: 'The Ramp Gallery',
      address: '1833 Mission St, San Francisco',
      attendees: 34,
      maxAttendees: 40,
      category: 'Social',
      host: 'Creative Collective',
      rating: 4.7,
      price: 10,
      image: 'id_13',
      isAttending: false
    },
    {
      id: '5',
      title: 'Remote Work Best Practices',
      description: 'Workshop on building effective remote work routines and habits',
      date: '2024-01-30',
      time: '1:00 PM',
      location: 'General Assembly',
      address: '225 Bush St, San Francisco',
      attendees: 18,
      maxAttendees: 25,
      category: 'Workshop',
      host: 'Remote Work Hub',
      rating: 4.6,
      price: 30,
      image: 'id_14',
      isAttending: false
    }
  ]);

  const categories = ['all', 'Workshop', 'Networking', 'Panel', 'Social'];

  const toggleAttendance = (meetupId: string) => {
    setMeetups(meetups.map(meetup => 
      meetup.id === meetupId 
        ? { 
            ...meetup, 
            isAttending: !meetup.isAttending,
            attendees: meetup.isAttending ? meetup.attendees - 1 : meetup.attendees + 1
          }
        : meetup
    ));
  };

  const filteredMeetups = meetups.filter(meetup => 
    selectedCategory === 'all' || meetup.category === selectedCategory
  );

  const attendingMeetups = meetups.filter(meetup => meetup.isAttending);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="text-white hover:bg-white/10">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Community
        </Button>
        <h1 className="text-3xl font-bold text-white">Local Meetups</h1>
        <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
          Host Event
        </Button>
      </div>

      {/* Location and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Enter your city..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
          />
        </div>
        <div className="flex space-x-2">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "default" : "outline"}
              className={selectedCategory === category 
                ? "bg-green-600 hover:bg-green-700" 
                : "border-gray-400 text-gray-300 hover:bg-white/10"
              }
            >
              {category === 'all' ? 'All Events' : category}
            </Button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center p-4">
          <div className="text-2xl font-bold text-green-400">{filteredMeetups.length}</div>
          <p className="text-gray-400 text-sm">Upcoming Events</p>
        </Card>
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center p-4">
          <div className="text-2xl font-bold text-blue-400">{attendingMeetups.length}</div>
          <p className="text-gray-400 text-sm">You're Attending</p>
        </Card>
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center p-4">
          <div className="text-2xl font-bold text-purple-400">
            {meetups.reduce((sum, meetup) => sum + meetup.attendees, 0)}
          </div>
          <p className="text-gray-400 text-sm">Total Attendees</p>
        </Card>
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center p-4">
          <div className="text-2xl font-bold text-orange-400">4.8</div>
          <p className="text-gray-400 text-sm">Avg Rating</p>
        </Card>
      </div>

      {/* Your Events */}
      {attendingMeetups.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Your Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {attendingMeetups.map((meetup) => (
              <Card key={meetup.id} className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 backdrop-blur-sm border-green-500/30">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <Badge className="bg-green-600 text-white">Attending</Badge>
                    <div className="flex items-center text-yellow-400">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="ml-1 text-white">{meetup.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-white text-lg font-bold mb-2">{meetup.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{meetup.description}</p>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {meetup.date} at {meetup.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {meetup.location}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      {meetup.attendees}/{meetup.maxAttendees} attending
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* All Events */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Discover Events in {location}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMeetups.map((meetup) => (
            <Card key={meetup.id} className="bg-white/10 backdrop-blur-sm border-white/20 overflow-hidden hover:scale-105 transition-transform">
              <div className="relative">
                <img 
                  src={`https://images.unsplash.com/${meetup.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`}
                  alt={meetup.title}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute top-2 left-2">
                  <Badge className="bg-blue-600 text-white">{meetup.category}</Badge>
                </div>
                <div className="absolute top-2 right-2">
                  <div className="flex items-center bg-black/50 rounded px-2 py-1 text-yellow-400">
                    <Star className="h-3 w-3 fill-current" />
                    <span className="ml-1 text-white text-xs">{meetup.rating}</span>
                  </div>
                </div>
              </div>

              <CardHeader className="pb-2">
                <CardTitle className="text-white text-lg">{meetup.title}</CardTitle>
                <p className="text-gray-300 text-sm">{meetup.description}</p>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {meetup.date} at {meetup.time}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {meetup.location}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {meetup.attendees}/{meetup.maxAttendees}
                    </div>
                    <div className="text-green-400 font-medium">
                      {meetup.price === 0 ? 'Free' : `$${meetup.price}`}
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={() => toggleAttendance(meetup.id)}
                  className={`w-full ${
                    meetup.isAttending 
                      ? 'bg-red-600 hover:bg-red-700' 
                      : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
                  }`}
                >
                  {meetup.isAttending ? 'Cancel Attendance' : 'Attend Event'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocalMeetups;
