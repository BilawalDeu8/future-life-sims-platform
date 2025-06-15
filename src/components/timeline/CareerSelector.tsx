
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Building, MapPin, DollarSign, Users, Heart, Star, Search, Plus } from "lucide-react";

interface Career {
  id: string;
  title: string;
  category: string;
  salaryRange: string;
  growthPotential: number;
  workLifeBalance: number;
  description: string;
}

interface Company {
  id: string;
  name: string;
  industry: string;
  size: string;
  locations: string[];
  culture: string;
  benefits: string[];
  avgSalary: string;
  workLifeBalance: number;
  logo: string;
}

interface CareerSelectorProps {
  onSelectCareer: (career: Career, company?: Company) => void;
  onClose: () => void;
}

const CareerSelector: React.FC<CareerSelectorProps> = ({ onSelectCareer, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customCareer, setCustomCareer] = useState({
    title: '',
    category: '',
    salaryRange: '',
    description: ''
  });

  const careers: Career[] = [
    {
      id: 'software-engineer',
      title: 'Software Engineer',
      category: 'Technology',
      salaryRange: '$70k - $200k',
      growthPotential: 90,
      workLifeBalance: 75,
      description: 'Design, develop, and maintain software applications and systems.'
    },
    {
      id: 'product-manager',
      title: 'Product Manager',
      category: 'Technology',
      salaryRange: '$90k - $250k',
      growthPotential: 85,
      workLifeBalance: 70,
      description: 'Lead product development from conception to launch.'
    },
    {
      id: 'data-scientist',
      title: 'Data Scientist',
      category: 'Technology',
      salaryRange: '$80k - $220k',
      growthPotential: 88,
      workLifeBalance: 80,
      description: 'Analyze complex data to help companies make better decisions.'
    },
    {
      id: 'marketing-manager',
      title: 'Marketing Manager',
      category: 'Business',
      salaryRange: '$60k - $180k',
      growthPotential: 80,
      workLifeBalance: 85,
      description: 'Develop and execute marketing strategies to promote products.'
    },
    {
      id: 'financial-analyst',
      title: 'Financial Analyst',
      category: 'Finance',
      salaryRange: '$55k - $150k',
      growthPotential: 75,
      workLifeBalance: 70,
      description: 'Analyze financial data to guide investment decisions.'
    },
    {
      id: 'ux-designer',
      title: 'UX Designer',
      category: 'Design',
      salaryRange: '$65k - $160k',
      growthPotential: 82,
      workLifeBalance: 85,
      description: 'Design user-friendly interfaces and experiences.'
    }
  ];

  const companies: Company[] = [
    {
      id: 'google',
      name: 'Google',
      industry: 'Technology',
      size: 'Large (100k+ employees)',
      locations: ['Mountain View, CA', 'Seattle, WA', 'New York, NY', 'Bangalore, India'],
      culture: 'Innovation-focused, collaborative, data-driven',
      benefits: ['Health insurance', 'Stock options', 'Free meals', '20% time'],
      avgSalary: '$150k - $400k',
      workLifeBalance: 75,
      logo: '🔍'
    },
    {
      id: 'microsoft',
      name: 'Microsoft',
      industry: 'Technology',
      size: 'Large (200k+ employees)',
      locations: ['Redmond, WA', 'San Francisco, CA', 'Austin, TX', 'Hyderabad, India'],
      culture: 'Inclusive, growth mindset, customer-focused',
      benefits: ['Healthcare', 'Stock purchase plan', 'Learning budget', 'Flexible work'],
      avgSalary: '$140k - $350k',
      workLifeBalance: 80,
      logo: '🪟'
    },
    {
      id: 'netflix',
      name: 'Netflix',
      industry: 'Entertainment/Technology',
      size: 'Medium (12k employees)',
      locations: ['Los Gatos, CA', 'Los Angeles, CA', 'Amsterdam, NL', 'Mumbai, India'],
      culture: 'Freedom & responsibility, high performance, creative',
      benefits: ['Unlimited PTO', 'Stock options', 'Top-tier compensation', 'Creative freedom'],
      avgSalary: '$160k - $500k',
      workLifeBalance: 70,
      logo: '📺'
    },
    {
      id: 'startup',
      name: 'Tech Startup',
      industry: 'Technology',
      size: 'Small (10-100 employees)',
      locations: ['San Francisco, CA', 'Austin, TX', 'Berlin, Germany', 'Bangalore, India'],
      culture: 'Fast-paced, entrepreneurial, equity-focused',
      benefits: ['Equity', 'Flexible hours', 'Learning opportunities', 'Rapid growth'],
      avgSalary: '$70k - $180k + equity',
      workLifeBalance: 60,
      logo: '🚀'
    }
  ];

  const categories = ['all', 'Technology', 'Business', 'Finance', 'Design', 'Healthcare'];

  const filteredCareers = careers.filter(career => {
    const matchesCategory = selectedCategory === 'all' || career.category === selectedCategory;
    const matchesSearch = career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         career.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCreateCustomPath = () => {
    if (customCareer.title && customCareer.category) {
      const newCareer: Career = {
        id: `custom-${Date.now()}`,
        title: customCareer.title,
        category: customCareer.category,
        salaryRange: customCareer.salaryRange || '$50k - $150k',
        growthPotential: 75,
        workLifeBalance: 80,
        description: customCareer.description || `Custom career path in ${customCareer.title}`
      };
      onSelectCareer(newCareer);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-black/90 border-white/20 text-white">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl text-white">Choose Your Career Path</CardTitle>
            <Button variant="ghost" onClick={onClose} className="text-white hover:bg-white/10">
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Search and Category Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search careers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`${
                    selectedCategory === category 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                  }`}
                >
                  {category === 'all' ? 'All' : category}
                </Button>
              ))}
            </div>
          </div>

          {/* Create Custom Path Button */}
          <Button
            onClick={() => setShowCustomForm(!showCustomForm)}
            className="mt-4 bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Custom Path
          </Button>
        </CardHeader>

        <CardContent>
          {/* Custom Career Form */}
          {showCustomForm && (
            <Card className="mb-6 bg-purple-900/30 border-purple-400">
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-white mb-4">Create Your Custom Career Path</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Career Title (e.g., AI Researcher)"
                    value={customCareer.title}
                    onChange={(e) => setCustomCareer(prev => ({ ...prev, title: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                  <Input
                    placeholder="Category (e.g., Technology)"
                    value={customCareer.category}
                    onChange={(e) => setCustomCareer(prev => ({ ...prev, category: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                  <Input
                    placeholder="Salary Range (e.g., $80k - $200k)"
                    value={customCareer.salaryRange}
                    onChange={(e) => setCustomCareer(prev => ({ ...prev, salaryRange: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                  <Input
                    placeholder="Description"
                    value={customCareer.description}
                    onChange={(e) => setCustomCareer(prev => ({ ...prev, description: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
                <Button
                  onClick={handleCreateCustomPath}
                  disabled={!customCareer.title || !customCareer.category}
                  className="mt-4 bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50"
                >
                  Create Career Path
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Career Selection */}
          {!selectedCareer ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCareers.map((career) => (
                <Card
                  key={career.id}
                  className="cursor-pointer transition-all hover:scale-105 bg-white/5 border-white/20 hover:border-blue-400"
                  onClick={() => setSelectedCareer(career)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-white">{career.title}</h3>
                      <Badge variant="secondary" className="bg-blue-600 text-white">
                        {career.category}
                      </Badge>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{career.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <DollarSign className="h-4 w-4 text-green-400 mr-2" />
                        <span className="text-green-300">{career.salaryRange}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span className="text-gray-300">Growth: {career.growthPotential}%</span>
                        </div>
                        <div className="flex items-center">
                          <Heart className="h-4 w-4 text-pink-400 mr-1" />
                          <span className="text-gray-300">Balance: {career.workLifeBalance}%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            // Company Selection
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">
                  Choose a Company for {selectedCareer.title}
                </h2>
                <Button
                  variant="outline"
                  onClick={() => setSelectedCareer(null)}
                  className="text-white border-white/20 hover:bg-white/10"
                >
                  Back to Careers
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {companies.map((company) => (
                  <Card
                    key={company.id}
                    className="cursor-pointer transition-all hover:scale-105 bg-white/5 border-white/20 hover:border-green-400"
                    onClick={() => onSelectCareer(selectedCareer, company)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <span className="text-3xl mr-3">{company.logo}</span>
                        <div>
                          <h3 className="font-semibold text-xl text-white">{company.name}</h3>
                          <p className="text-gray-300 text-sm">{company.industry}</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center text-sm">
                          <Users className="h-4 w-4 text-blue-400 mr-2" />
                          <span className="text-gray-300">{company.size}</span>
                        </div>

                        <div className="flex items-center text-sm">
                          <DollarSign className="h-4 w-4 text-green-400 mr-2" />
                          <span className="text-green-300">{company.avgSalary}</span>
                        </div>

                        <div className="flex items-center text-sm">
                          <Heart className="h-4 w-4 text-pink-400 mr-2" />
                          <span className="text-gray-300">Work-Life Balance: {company.workLifeBalance}%</span>
                        </div>

                        <div className="text-sm">
                          <div className="flex items-start">
                            <MapPin className="h-4 w-4 text-orange-400 mr-2 mt-0.5" />
                            <div>
                              <span className="text-gray-300">Locations:</span>
                              <div className="text-orange-300 text-xs mt-1">
                                {company.locations.slice(0, 2).join(', ')}
                                {company.locations.length > 2 && ` +${company.locations.length - 2} more`}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-white/20">
                          <p className="text-gray-400 text-xs italic">{company.culture}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Option to proceed without company */}
              <div className="mt-6 text-center">
                <Button
                  variant="outline"
                  onClick={() => onSelectCareer(selectedCareer)}
                  className="text-white border-white/20 hover:bg-white/10"
                >
                  Continue without specific company
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CareerSelector;
