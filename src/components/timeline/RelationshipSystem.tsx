
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, UserPlus, MessageSquare, Phone, Calendar, Star, AlertCircle } from "lucide-react";

interface Relationship {
  id: string;
  name: string;
  type: 'friend' | 'romantic' | 'family' | 'mentor' | 'colleague';
  strength: number; // 1-100
  status: 'strong' | 'stable' | 'declining' | 'distant';
  metAt: string;
  lastInteraction: string;
  sharedEvents: string[];
  careerImpact: number;
  location: string;
}

interface RelationshipSystemProps {
  currentAge: number;
  careerPath: any;
  userLocation: string;
  onRelationshipAction: (action: string, relationshipId: string) => void;
}

const RelationshipSystem: React.FC<RelationshipSystemProps> = ({
  currentAge,
  careerPath,
  userLocation,
  onRelationshipAction
}) => {
  const [selectedRelationship, setSelectedRelationship] = useState<Relationship | null>(null);
  const [viewMode, setViewMode] = useState<'network' | 'timeline' | 'calendar'>('network');

  // Generate relationships based on age and career
  const generateRelationships = (): Relationship[] => {
    const baseRelationships: Relationship[] = [
      {
        id: 'family-parents',
        name: 'Parents',
        type: 'family',
        strength: 85,
        status: 'strong',
        metAt: 'Birth',
        lastInteraction: '2 days ago',
        sharedEvents: ['Birthday celebrations', 'Career milestones', 'Holiday visits'],
        careerImpact: 10,
        location: userLocation
      },
      {
        id: 'college-best-friend',
        name: 'Alex (College Friend)',
        type: 'friend',
        strength: currentAge < 30 ? 75 : 65,
        status: currentAge < 30 ? 'strong' : 'stable',
        metAt: 'College',
        lastInteraction: currentAge < 30 ? '1 week ago' : '3 weeks ago',
        sharedEvents: ['College graduation', 'Weekend trips', 'Career discussions'],
        careerImpact: 15,
        location: currentAge < 30 ? userLocation : 'Different city'
      }
    ];

    // Add career-specific relationships
    if (currentAge >= 23) {
      baseRelationships.push({
        id: 'work-mentor',
        name: 'Sarah (Mentor)',
        type: 'mentor',
        strength: 70,
        status: 'strong',
        metAt: 'First job',
        lastInteraction: '5 days ago',
        sharedEvents: ['Coffee meetings', 'Project guidance', 'Industry conferences'],
        careerImpact: 35,
        location: userLocation
      });
    }

    // Add romantic relationship based on age
    if (currentAge >= 26) {
      baseRelationships.push({
        id: 'romantic-partner',
        name: currentAge >= 32 ? 'Jamie (Spouse)' : 'Jamie (Partner)',
        type: 'romantic',
        strength: 90,
        status: 'strong',
        metAt: currentAge >= 32 ? 'Dating app (2028)' : 'Through friends',
        lastInteraction: 'Today',
        sharedEvents: ['Date nights', 'Travel', currentAge >= 32 ? 'Wedding' : 'Moving in together'],
        careerImpact: currentAge >= 32 ? 25 : 15,
        location: userLocation
      });
    }

    // Add work colleagues
    if (currentAge >= 25) {
      baseRelationships.push({
        id: 'work-colleague',
        name: 'Mike (Colleague)',
        type: 'colleague',
        strength: 60,
        status: 'stable',
        metAt: 'Current workplace',
        lastInteraction: '1 day ago',
        sharedEvents: ['Team lunches', 'Project collaborations', 'Office events'],
        careerImpact: 20,
        location: userLocation
      });
    }

    return baseRelationships;
  };

  const relationships = generateRelationships();

  const getRelationshipIcon = (type: string) => {
    switch (type) {
      case 'romantic': return <Heart className="h-4 w-4 text-red-400" />;
      case 'family': return <Users className="h-4 w-4 text-blue-400" />;
      case 'friend': return <UserPlus className="h-4 w-4 text-green-400" />;
      case 'mentor': return <Star className="h-4 w-4 text-yellow-400" />;
      case 'colleague': return <Users className="h-4 w-4 text-purple-400" />;
      default: return <Users className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'strong': return 'bg-green-500';
      case 'stable': return 'bg-blue-500';
      case 'declining': return 'bg-yellow-500';
      case 'distant': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const NetworkView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {relationships.map((relationship) => (
        <Card 
          key={relationship.id} 
          className="bg-black/60 border-white/20 hover:bg-black/70 transition-colors cursor-pointer"
          onClick={() => setSelectedRelationship(relationship)}
        >
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getRelationshipIcon(relationship.type)}
                <CardTitle className="text-sm text-white">{relationship.name}</CardTitle>
              </div>
              <Badge variant="secondary" className={`${getStatusColor(relationship.status)} text-white`}>
                {relationship.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-300">Strength</span>
                <div className="w-16 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-400 h-2 rounded-full" 
                    style={{ width: `${relationship.strength}%` }}
                  />
                </div>
              </div>
              <div className="text-xs text-gray-400">
                Last contact: {relationship.lastInteraction}
              </div>
              <div className="text-xs text-gray-400">
                Location: {relationship.location}
              </div>
              <div className="flex space-x-1 mt-2">
                <Button size="sm" variant="ghost" className="p-1">
                  <MessageSquare className="h-3 w-3" />
                </Button>
                <Button size="sm" variant="ghost" className="p-1">
                  <Phone className="h-3 w-3" />
                </Button>
                <Button size="sm" variant="ghost" className="p-1">
                  <Calendar className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Social Network (Age {currentAge})</h3>
        <div className="flex space-x-2">
          <Button
            variant={viewMode === 'network' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('network')}
          >
            Network
          </Button>
          <Button
            variant={viewMode === 'timeline' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('timeline')}
          >
            Timeline
          </Button>
          <Button
            variant={viewMode === 'calendar' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('calendar')}
          >
            Calendar
          </Button>
        </div>
      </div>

      {viewMode === 'network' && <NetworkView />}

      {/* Relationship Detail Modal */}
      {selectedRelationship && (
        <Card className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-black/90 border-white/20 z-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getRelationshipIcon(selectedRelationship.type)}
                <CardTitle className="text-white">{selectedRelationship.name}</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedRelationship(null)}
                className="text-white"
              >
                ×
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Type:</span>
                <span className="text-white ml-2 capitalize">{selectedRelationship.type}</span>
              </div>
              <div>
                <span className="text-gray-400">Status:</span>
                <Badge className={`ml-2 ${getStatusColor(selectedRelationship.status)} text-white`}>
                  {selectedRelationship.status}
                </Badge>
              </div>
              <div>
                <span className="text-gray-400">Met:</span>
                <span className="text-white ml-2">{selectedRelationship.metAt}</span>
              </div>
              <div>
                <span className="text-gray-400">Career Impact:</span>
                <span className="text-white ml-2">{selectedRelationship.careerImpact}%</span>
              </div>
            </div>
            
            <div>
              <span className="text-gray-400 text-sm">Shared Events:</span>
              <div className="mt-2 space-y-1">
                {selectedRelationship.sharedEvents.map((event, index) => (
                  <Badge key={index} variant="secondary" className="mr-2 mb-1">
                    {event}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex space-x-2">
              <Button 
                size="sm" 
                className="flex-1"
                onClick={() => onRelationshipAction('message', selectedRelationship.id)}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Message
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="flex-1"
                onClick={() => onRelationshipAction('call', selectedRelationship.id)}
              >
                <Phone className="h-4 w-4 mr-2" />
                Call
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="flex-1"
                onClick={() => onRelationshipAction('schedule', selectedRelationship.id)}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Meet
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Relationship Insights */}
      <Card className="bg-black/60 border-white/20">
        <CardHeader>
          <CardTitle className="text-white text-sm">Relationship Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-center space-x-2">
              <Heart className="h-4 w-4 text-red-400" />
              <span className="text-gray-300">
                {relationships.filter(r => r.type === 'romantic').length > 0 
                  ? 'In a committed relationship' 
                  : 'Single and focusing on career'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-blue-400" />
              <span className="text-gray-300">
                {relationships.filter(r => r.status === 'strong').length} strong relationships
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-yellow-400" />
              <span className="text-gray-300">
                Professional network providing {relationships.reduce((sum, r) => sum + r.careerImpact, 0)}% career boost
              </span>
            </div>
            {currentAge >= 30 && (
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-orange-400" />
                <span className="text-gray-300">
                  Consider work-life balance as career demands increase
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RelationshipSystem;
