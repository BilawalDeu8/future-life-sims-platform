
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Users, MessageSquare, Calendar, Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

interface PeerGroup {
  id: string;
  name: string;
  description: string;
  category: string;
  memberCount: number;
  activity: string;
  image: string;
  tags: string[];
  isJoined: boolean;
  recentActivity: string;
}

interface PeerGroupsProps {
  onBack: () => void;
}

const PeerGroups: React.FC<PeerGroupsProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [groups, setGroups] = useState<PeerGroup[]>([
    {
      id: '1',
      name: 'Tech Career Switchers',
      description: 'Supporting professionals transitioning into tech from other industries',
      category: 'Career Transition',
      memberCount: 1247,
      activity: 'Very Active',
      image: 'id_4',
      tags: ['Tech', 'Career Change', 'Bootcamp'],
      isJoined: false,
      recentActivity: '23 new posts this week'
    },
    {
      id: '2',
      name: 'Remote Work Pioneers',
      description: 'Building successful remote careers and lifestyle design',
      category: 'Lifestyle',
      memberCount: 892,
      activity: 'Active',
      image: 'id_5',
      tags: ['Remote Work', 'Digital Nomad', 'Work-Life Balance'],
      isJoined: true,
      recentActivity: '15 new posts this week'
    },
    {
      id: '3',
      name: 'Creative Entrepreneurs',
      description: 'Artists, designers, and creators building sustainable businesses',
      category: 'Entrepreneurship',
      memberCount: 634,
      activity: 'Active',
      image: 'id_6',
      tags: ['Creative', 'Business', 'Freelancing'],
      isJoined: false,
      recentActivity: '18 new posts this week'
    },
    {
      id: '4',
      name: 'Women in Leadership',
      description: 'Supporting women advancing to senior leadership roles',
      category: 'Leadership',
      memberCount: 2156,
      activity: 'Very Active',
      image: 'id_7',
      tags: ['Leadership', 'Women', 'Executive'],
      isJoined: true,
      recentActivity: '31 new posts this week'
    },
    {
      id: '5',
      name: 'Finance to Freedom',
      description: 'Financial professionals exploring diverse career paths',
      category: 'Career Transition',
      memberCount: 743,
      activity: 'Moderate',
      image: 'id_8',
      tags: ['Finance', 'Career Change', 'Investment'],
      isJoined: false,
      recentActivity: '12 new posts this week'
    },
    {
      id: '6',
      name: 'Startup Founders Circle',
      description: 'Early-stage founders sharing experiences and resources',
      category: 'Entrepreneurship',
      memberCount: 1089,
      activity: 'Very Active',
      image: 'id_9',
      tags: ['Startup', 'Founder', 'Venture Capital'],
      isJoined: false,
      recentActivity: '27 new posts this week'
    }
  ]);

  const categories = ['all', 'Career Transition', 'Lifestyle', 'Entrepreneurship', 'Leadership'];

  const toggleJoinGroup = (groupId: string) => {
    setGroups(groups.map(group => 
      group.id === groupId 
        ? { ...group, isJoined: !group.isJoined, memberCount: group.isJoined ? group.memberCount - 1 : group.memberCount + 1 }
        : group
    ));
  };

  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         group.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || group.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const joinedGroups = groups.filter(group => group.isJoined);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="text-white hover:bg-white/10">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Community
        </Button>
        <h1 className="text-3xl font-bold text-white">Peer Groups</h1>
        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Group
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search groups by name, description, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
                ? "bg-blue-600 hover:bg-blue-700" 
                : "border-gray-400 text-gray-300 hover:bg-white/10"
              }
            >
              {category === 'all' ? 'All Categories' : category}
            </Button>
          ))}
        </div>
      </div>

      {/* Joined Groups */}
      {joinedGroups.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Your Groups ({joinedGroups.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {joinedGroups.map((group) => (
              <Card key={group.id} className="bg-white/10 backdrop-blur-sm border-white/20 hover:scale-105 transition-transform">
                <div className="relative">
                  <img 
                    src={`https://images.unsplash.com/${group.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`}
                    alt={group.name}
                    className="w-full h-32 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-2 right-2 bg-green-600 text-white">
                    Joined
                  </Badge>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-lg">{group.name}</CardTitle>
                  <p className="text-gray-300 text-sm">{group.description}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {group.memberCount.toLocaleString()} members
                    </span>
                    <span>{group.activity}</span>
                  </div>
                  <p className="text-xs text-gray-400">{group.recentActivity}</p>
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Chat
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-400 text-gray-300 hover:bg-white/10">
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Discover Groups */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">
          Discover Groups ({filteredGroups.filter(g => !g.isJoined).length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups
            .filter(group => !group.isJoined)
            .map((group) => (
              <Card key={group.id} className="bg-white/10 backdrop-blur-sm border-white/20 hover:scale-105 transition-transform">
                <div className="relative">
                  <img 
                    src={`https://images.unsplash.com/${group.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`}
                    alt={group.name}
                    className="w-full h-32 object-cover rounded-t-lg"
                  />
                  <Badge variant="outline" className="absolute top-2 right-2 text-blue-300 border-blue-400">
                    {group.category}
                  </Badge>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-lg">{group.name}</CardTitle>
                  <p className="text-gray-300 text-sm">{group.description}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex flex-wrap gap-1">
                    {group.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs text-purple-300 border-purple-400">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-between text-sm text-gray-400">
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {group.memberCount.toLocaleString()} members
                    </span>
                    <span>{group.activity}</span>
                  </div>
                  <p className="text-xs text-gray-400">{group.recentActivity}</p>
                  <Button 
                    onClick={() => toggleJoinGroup(group.id)}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Join Group
                  </Button>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PeerGroups;
