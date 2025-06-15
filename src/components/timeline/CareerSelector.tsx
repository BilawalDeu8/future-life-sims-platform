
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Building, MapPin, DollarSign, Users, Heart, Star, Search, Plus, Loader2 } from "lucide-react";
import { useRealWorldData } from '@/hooks/useRealWorldData';
import CustomCareerForm from './CustomCareerForm';

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
  
  const { 
    salaryData, 
    costOfLivingData, 
    isLoading: dataLoading, 
    fetchScenarioData 
  } = useRealWorldData();

  const careers: Career[] = [
    {
      id: 'software-engineer',
      title: 'Software Engineer',
      category: 'Technology',
      salaryRange: '₹8L - ₹25L',
      growthPotential: 90,
      workLifeBalance: 75,
      description: 'Design, develop, and maintain software applications and systems.'
    },
    {
      id: 'product-manager',
      title: 'Product Manager',
      category: 'Technology',
      salaryRange: '₹15L - ₹50L',
      growthPotential: 85,
      workLifeBalance: 70,
      description: 'Lead product development from conception to launch.'
    },
    {
      id: 'data-scientist',
      title: 'Data Scientist',
      category: 'Technology',
      salaryRange: '₹10L - ₹35L',
      growthPotential: 88,
      workLifeBalance: 80,
      description: 'Analyze complex data to help companies make better decisions.'
    },
    {
      id: 'marketing-manager',
      title: 'Marketing Manager',
      category: 'Business',
      salaryRange: '₹8L - ₹30L',
      growthPotential: 80,
      workLifeBalance: 85,
      description: 'Develop and execute marketing strategies to promote products.'
    },
    {
      id: 'financial-analyst',
      title: 'Financial Analyst',
      category: 'Finance',
      salaryRange: '₹6L - ₹20L',
      growthPotential: 75,
      workLifeBalance: 70,
      description: 'Analyze financial data to guide investment decisions.'
    },
    {
      id: 'ux-designer',
      title: 'UX Designer',
      category: 'Design',
      salaryRange: '₹7L - ₹25L',
      growthPotential: 82,
      workLifeBalance: 85,
      description: 'Design user-friendly interfaces and experiences.'
    }
  ];

  const companies: Company[] = [
    {
      id: 'tcs',
      name: 'Tata Consultancy Services',
      industry: 'Technology',
      size: 'Large (500k+ employees)',
      locations: ['Bangalore, India', 'Mumbai, India', 'Chennai, India', 'Hyderabad, India'],
      culture: 'Traditional, process-oriented, growth-focused',
      benefits: ['Health insurance', 'Learning platform', 'Employee development', 'Global opportunities'],
      avgSalary: '₹6L - ₹25L',
      workLifeBalance: 75,
      logo: '🏢'
    },
    {
      id: 'infosys',
      name: 'Infosys',
      industry: 'Technology',
      size: 'Large (300k+ employees)',
      locations: ['Bangalore, India', 'Pune, India', 'Mysore, India', 'Hyderabad, India'],
      culture: 'Innovation-driven, employee-centric, learning culture',
      benefits: ['Healthcare', 'Stock options', 'Training programs', 'Flexible work'],
      avgSalary: '₹7L - ₹30L',
      workLifeBalance: 80,
      logo: '💼'
    },
    {
      id: 'flipkart',
      name: 'Flipkart',
      industry: 'E-commerce/Technology',
      size: 'Large (50k+ employees)',
      locations: ['Bangalore, India', 'Delhi, India', 'Mumbai, India', 'Chennai, India'],
      culture: 'Fast-paced, customer-obsessed, innovative',
      benefits: ['Stock options', 'Flexible PTO', 'Learning budget', 'Health coverage'],
      avgSalary: '₹15L - ₹60L',
      workLifeBalance: 70,
      logo: '🛒'
    },
    {
      id: 'startup',
      name: 'Indian Tech Startup',
      industry: 'Technology',
      size: 'Small (10-100 employees)',
      locations: ['Bangalore, India', 'Delhi, India', 'Mumbai, India', 'Pune, India'],
      culture: 'Fast-paced, entrepreneurial, equity-focused',
      benefits: ['Equity', 'Flexible hours', 'Learning opportunities', 'Rapid growth'],
      avgSalary: '₹8L - ₹35L + equity',
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

  const handleCustomCareerCreated = (career: Career) => {
    onSelectCareer(career);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700 text-white">
        <CardHeader className="pb-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl text-white">Choose Your Career Path</CardTitle>
            <Button 
              variant="ghost" 
              onClick={onClose} 
              className="text-white hover:bg-gray-800 hover:text-white"
            >
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
                className="pl-10 bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500"
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
                      ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600' 
                      : 'bg-gray-800 border-gray-600 text-white hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {category === 'all' ? 'All' : category}
                </Button>
              ))}
            </div>
          </div>

          {/* Create Custom Path Button */}
          <div className="flex gap-2 mt-4">
            <Button
              onClick={() => setShowCustomForm(!showCustomForm)}
              className="bg-purple-600 hover:bg-purple-700 text-white border-purple-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              {showCustomForm ? 'Hide Custom Form' : 'Create Custom Path'}
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Custom Career Form */}
          {showCustomForm && (
            <div className="mb-6">
              <CustomCareerForm 
                onCareerCreated={handleCustomCareerCreated}
                onCancel={() => setShowCustomForm(false)}
              />
            </div>
          )}

          {/* Career Selection */}
          {!selectedCareer ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCareers.map((career) => (
                <Card
                  key={career.id}
                  className="cursor-pointer transition-all hover:scale-105 bg-gray-800 border-gray-700 hover:border-blue-500"
                  onClick={() => setSelectedCareer(career)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-white">{career.title}</h3>
                      <Badge className="bg-blue-600 text-white hover:bg-blue-700">
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
                  className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700 hover:text-white"
                >
                  Back to Careers
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {companies.map((company) => (
                  <Card
                    key={company.id}
                    className="cursor-pointer transition-all hover:scale-105 bg-gray-800 border-gray-700 hover:border-green-500"
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

                        <div className="pt-2 border-t border-gray-700">
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
                  className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700 hover:text-white"
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
