
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Heart, MessageSquare, Share, Trophy, TrendingUp, Star } from "lucide-react";

interface SuccessStory {
  id: string;
  author: string;
  avatar: string;
  title: string;
  summary: string;
  story: string;
  beforeRole: string;
  afterRole: string;
  timeline: string;
  salaryIncrease: string;
  category: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  tags: string[];
  image: string;
}

interface SuccessStoriesProps {
  onBack: () => void;
}

const SuccessStories: React.FC<SuccessStoriesProps> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [stories, setStories] = useState<SuccessStory[]>([
    {
      id: '1',
      author: 'Jessica Kim',
      avatar: 'id_15',
      title: 'From Teacher to Tech Product Manager in 18 Months',
      summary: 'How I transitioned from elementary education to leading product teams at a unicorn startup',
      story: 'After 8 years of teaching, I felt burned out and wanted a career that offered more growth and financial stability. I started learning about product management through online courses and connecting with mentors in tech. The transition wasn\'t easy - I faced rejections and self-doubt, but my teaching background actually gave me unique skills in communication and problem-solving that made me stand out.',
      beforeRole: 'Elementary School Teacher',
      afterRole: 'Senior Product Manager',
      timeline: '18 months',
      salaryIncrease: '185%',
      category: 'Career Transition',
      likes: 342,
      comments: 89,
      isLiked: false,
      tags: ['Education to Tech', 'Product Management', 'Career Change'],
      image: 'id_16'
    },
    {
      id: '2',
      author: 'David Chen',
      avatar: 'id_17',
      title: 'Building a Million-Dollar Freelance Design Business',
      summary: 'How I went from corporate designer to running a 7-figure creative agency',
      story: 'I was stuck in a corporate design role that felt soul-crushing. I started freelancing on weekends and slowly built a client base. The key was specializing in a niche (fintech design) and delivering exceptional results. Within 3 years, I was able to quit my job and scale my freelance work into a full agency with 12 employees.',
      beforeRole: 'Corporate UX Designer',
      afterRole: 'Agency Founder & CEO',
      timeline: '3 years',
      salaryIncrease: '400%',
      category: 'Entrepreneurship',
      likes: 567,
      comments: 123,
      isLiked: true,
      tags: ['Design', 'Freelancing', 'Agency', 'Entrepreneurship'],
      image: 'id_18'
    },
    {
      id: '3',
      author: 'Maria Rodriguez',
      avatar: 'id_19',
      title: 'From Nurse to Healthcare Tech Founder',
      summary: 'Solving healthcare problems through technology after 10 years on the frontlines',
      story: 'Working as an ICU nurse showed me countless inefficiencies in healthcare systems. I taught myself to code and built a simple app to help nurses manage patient data more efficiently. That app grew into a healthcare tech startup that now serves 200+ hospitals nationwide. My clinical background was crucial in understanding real user needs.',
      beforeRole: 'ICU Nurse',
      afterRole: 'Healthcare Tech CEO',
      timeline: '4 years',
      salaryIncrease: '320%',
      category: 'Healthcare Innovation',
      likes: 789,
      comments: 156,
      isLiked: false,
      tags: ['Healthcare', 'Nursing', 'Tech Startup', 'Problem Solving'],
      image: 'id_20'
    },
    {
      id: '4',
      author: 'Alex Thompson',
      avatar: 'id_21',
      title: 'Remote Work Revolution: Building a Global Career',
      summary: 'How I created a location-independent career and traveled to 30+ countries',
      story: 'I was tired of the 9-5 office grind and wanted to see the world. I strategically developed skills in digital marketing and slowly transitioned to remote work. Now I run marketing for three different startups while living in different countries each quarter. The key was proving my value through results, not hours worked.',
      beforeRole: 'Office Marketing Coordinator',
      afterRole: 'Remote Marketing Consultant',
      timeline: '2 years',
      salaryIncrease: '150%',
      category: 'Remote Work',
      likes: 445,
      comments: 67,
      isLiked: true,
      tags: ['Remote Work', 'Digital Nomad', 'Marketing', 'Lifestyle Design'],
      image: 'id_22'
    }
  ]);

  const categories = ['all', 'Career Transition', 'Entrepreneurship', 'Healthcare Innovation', 'Remote Work'];

  const toggleLike = (storyId: string) => {
    setStories(stories.map(story => 
      story.id === storyId 
        ? { 
            ...story, 
            isLiked: !story.isLiked,
            likes: story.isLiked ? story.likes - 1 : story.likes + 1
          }
        : story
    ));
  };

  const filteredStories = stories.filter(story => 
    selectedCategory === 'all' || story.category === selectedCategory
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="text-white hover:bg-white/10">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Community
        </Button>
        <h1 className="text-3xl font-bold text-white">Success Stories</h1>
        <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
          Share Your Story
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center p-4">
          <div className="text-2xl font-bold text-orange-400">856</div>
          <p className="text-gray-400 text-sm">Success Stories</p>
        </Card>
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center p-4">
          <div className="text-2xl font-bold text-green-400">$47k</div>
          <p className="text-gray-400 text-sm">Avg Salary Increase</p>
        </Card>
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center p-4">
          <div className="text-2xl font-bold text-blue-400">2.1 years</div>
          <p className="text-gray-400 text-sm">Avg Transition Time</p>
        </Card>
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center p-4">
          <div className="text-2xl font-bold text-purple-400">94%</div>
          <p className="text-gray-400 text-sm">Satisfaction Rate</p>
        </Card>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => setSelectedCategory(category)}
            variant={selectedCategory === category ? "default" : "outline"}
            className={selectedCategory === category 
              ? "bg-orange-600 hover:bg-orange-700" 
              : "border-gray-400 text-gray-300 hover:bg-white/10"
            }
          >
            {category === 'all' ? 'All Stories' : category}
          </Button>
        ))}
      </div>

      {/* Success Stories */}
      <div className="space-y-6">
        {filteredStories.map((story) => (
          <Card key={story.id} className="bg-white/10 backdrop-blur-sm border-white/20 overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3">
                <img 
                  src={`https://images.unsplash.com/${story.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`}
                  alt={story.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-2/3 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={`https://images.unsplash.com/${story.avatar}?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80`} />
                      <AvatarFallback>{story.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-white font-medium">{story.author}</p>
                      <p className="text-gray-400 text-sm">{story.afterRole}</p>
                    </div>
                  </div>
                  <Badge className="bg-orange-600 text-white">{story.category}</Badge>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{story.title}</h3>
                <p className="text-blue-300 text-sm mb-4">{story.summary}</p>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">{story.story}</p>

                {/* Transformation Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="bg-white/10 rounded p-3 text-center">
                    <p className="text-gray-400 text-xs">Before</p>
                    <p className="text-white text-sm font-medium">{story.beforeRole}</p>
                  </div>
                  <div className="bg-white/10 rounded p-3 text-center">
                    <p className="text-gray-400 text-xs">Timeline</p>
                    <p className="text-green-400 text-sm font-medium">{story.timeline}</p>
                  </div>
                  <div className="bg-white/10 rounded p-3 text-center">
                    <p className="text-gray-400 text-xs">Salary Increase</p>
                    <p className="text-green-400 text-sm font-medium">+{story.salaryIncrease}</p>
                  </div>
                  <div className="bg-white/10 rounded p-3 text-center">
                    <p className="text-gray-400 text-xs">Impact</p>
                    <div className="flex items-center justify-center text-yellow-400">
                      <Trophy className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {story.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-purple-300 border-purple-400 text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex space-x-4">
                    <button
                      onClick={() => toggleLike(story.id)}
                      className={`flex items-center space-x-1 text-sm transition-colors ${
                        story.isLiked ? 'text-red-400' : 'text-gray-400 hover:text-red-400'
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${story.isLiked ? 'fill-current' : ''}`} />
                      <span>{story.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-sm text-gray-400 hover:text-blue-400 transition-colors">
                      <MessageSquare className="h-4 w-4" />
                      <span>{story.comments}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-sm text-gray-400 hover:text-green-400 transition-colors">
                      <Share className="h-4 w-4" />
                      <span>Share</span>
                    </button>
                  </div>
                  <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Read Full Story
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SuccessStories;
