import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, MapPin, DollarSign, TrendingUp, Home, AlertCircle } from "lucide-react";
import { useRealWorldData } from '@/hooks/useRealWorldData';
import RealWorldDataDisplay from '@/components/data/RealWorldDataDisplay';

interface Career {
  id: string;
  title: string;
  category: string;
  salaryRange: string;
  growthPotential: number;
  workLifeBalance: number;
  description: string;
}

interface CustomCareerFormProps {
  onBack: () => void;
}

const CustomCareerForm: React.FC<CustomCareerFormProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    company: '',
    location: '',
    category: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDataPreview, setShowDataPreview] = useState(false);

  const { 
    salaryData, 
    costOfLivingData, 
    jobMarketData, 
    isLoading, 
    error, 
    fetchScenarioData,
    calculateAdjustedSalary,
    getAffordabilityMetrics
  } = useRealWorldData();

  const jobCategories = [
    'Technology',
    'Business',
    'Finance',
    'Healthcare',
    'Education',
    'Marketing',
    'Design',
    'Engineering',
    'Sales',
    'Operations',
    'Consulting',
    'Research'
  ];

  const indianCities = [
    'Bangalore, Karnataka',
    'Mumbai, Maharashtra',
    'Delhi, Delhi',
    'Hyderabad, Telangana',
    'Chennai, Tamil Nadu',
    'Pune, Maharashtra',
    'Kolkata, West Bengal',
    'Ahmedabad, Gujarat',
    'Jaipur, Rajasthan',
    'Surat, Gujarat',
    'Lucknow, Uttar Pradesh',
    'Kanpur, Uttar Pradesh',
    'Nagpur, Maharashtra',
    'Indore, Madhya Pradesh',
    'Thane, Maharashtra',
    'Bhopal, Madhya Pradesh',
    'Visakhapatnam, Andhra Pradesh',
    'Pimpri-Chinchwad, Maharashtra',
    'Patna, Bihar',
    'Vadodara, Gujarat'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setShowDataPreview(false);
  };

  const handlePreviewData = async () => {
    if (!formData.jobTitle || !formData.location) {
      return;
    }

    setShowDataPreview(true);
    await fetchScenarioData(formData.jobTitle, formData.location);
  };

  const handleCreateCareer = async () => {
    if (!formData.jobTitle || !formData.category) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Fetch real-world data if we haven't already
      if (!salaryData && formData.location) {
        await fetchScenarioData(formData.jobTitle, formData.location);
      }

      // Calculate salary range based on real data or use estimates
      let salaryRange = '₹5L - ₹20L';
      let growthPotential = 75;
      
      if (salaryData) {
        const adjustedSalary = calculateAdjustedSalary(salaryData.medianSalary, formData.location);
        const lowerBound = Math.round(adjustedSalary * 0.8);
        const upperBound = Math.round(adjustedSalary * 1.3);
        salaryRange = `₹${(lowerBound / 100000).toFixed(1)}L - ₹${(upperBound / 100000).toFixed(1)}L`;
        growthPotential = Math.round(salaryData.growthProjection);
      }

      const newCareer: Career = {
        id: `custom-${Date.now()}`,
        title: formData.jobTitle,
        category: formData.category,
        salaryRange,
        growthPotential,
        workLifeBalance: 80, // Default value, could be enhanced with ML prediction
        description: `Custom career path as ${formData.jobTitle}${formData.company ? ` at ${formData.company}` : ''}${formData.location ? ` in ${formData.location}` : ''}`
      };

      onCareerCreated(newCareer);
    } catch (error) {
      console.error('Error creating custom career:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.jobTitle.trim() && formData.category && formData.location;
  const affordabilityMetrics = salaryData && costOfLivingData ? 
    getAffordabilityMetrics(salaryData.medianSalary) : null;

  return (
    <Card className="bg-purple-900/20 border-purple-600">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Create Your Custom Career Path</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Job Title *
            </label>
            <Input
              placeholder="e.g., AI Research Scientist"
              value={formData.jobTitle}
              onChange={(e) => handleInputChange('jobTitle', e.target.value)}
              className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Company (Optional)
            </label>
            <Input
              placeholder="e.g., Google, Microsoft, TCS"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Location *
            </label>
            <Select value={formData.location} onValueChange={(value) => handleInputChange('location', value)}>
              <SelectTrigger className="bg-gray-800 border-gray-600 text-white focus:border-purple-500">
                <SelectValue placeholder="Select a city" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                {indianCities.map((city) => (
                  <SelectItem key={city} value={city} className="text-white hover:bg-gray-700">
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Category *
            </label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
              <SelectTrigger className="bg-gray-800 border-gray-600 text-white focus:border-purple-500">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                {jobCategories.map((category) => (
                  <SelectItem key={category} value={category} className="text-white hover:bg-gray-700">
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
          <Button
            onClick={handlePreviewData}
            disabled={!formData.jobTitle || !formData.location || isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Loading Data...
              </>
            ) : (
              <>
                <TrendingUp className="h-4 w-4 mr-2" />
                Preview Real Data
              </>
            )}
          </Button>

          <Button
            onClick={handleCreateCareer}
            disabled={!isFormValid || isSubmitting}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              'Create Career Path'
            )}
          </Button>

          <Button
            onClick={onCancel}
            variant="outline"
            className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700 hover:text-white"
          >
            Cancel
          </Button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-4 p-3 bg-red-900/20 border border-red-600 rounded-lg flex items-center">
            <AlertCircle className="h-4 w-4 text-red-400 mr-2" />
            <span className="text-red-300 text-sm">{error}</span>
          </div>
        )}

        {/* Real World Data Preview */}
        {showDataPreview && (salaryData || costOfLivingData || jobMarketData) && (
          <div className="mt-6">
            <h4 className="text-md font-semibold text-white mb-4">Real-World Data Preview</h4>
            <RealWorldDataDisplay
              salaryData={salaryData}
              costOfLivingData={costOfLivingData}
              jobMarketData={jobMarketData}
              isLoading={isLoading}
            />

            {/* Affordability Summary */}
            {affordabilityMetrics && (
              <div className="mt-4 p-4 bg-gray-800/50 rounded-lg">
                <h5 className="text-sm font-semibold text-white mb-2">Affordability Summary</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-300">Monthly Take-Home:</span>
                    <div className="text-green-300 font-semibold">
                      ₹{affordabilityMetrics.monthlyNet.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-300">Housing Budget:</span>
                    <div className="text-blue-300 font-semibold">
                      ₹{affordabilityMetrics.recommendedHousingBudget.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-300">Years to Buy Home:</span>
                    <div className={`font-semibold ${affordabilityMetrics.yearsToAffordHome > 10 ? 'text-red-300' : 'text-yellow-300'}`}>
                      {affordabilityMetrics.yearsToAffordHome} years
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CustomCareerForm;
