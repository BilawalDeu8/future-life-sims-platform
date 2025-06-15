
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";
import RealWorldDataDisplay from "@/components/data/RealWorldDataDisplay";
import { useRealWorldData } from '@/hooks/useRealWorldData';
import { useEffect } from 'react';

const RealWorldData = () => {
  const { salaryData, costOfLivingData, jobMarketData, isLoading, fetchScenarioData } = useRealWorldData();

  useEffect(() => {
    // Get occupation and location from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const occupation = urlParams.get('occupation') || 'Software Developer';
    const location = urlParams.get('location') || 'San Francisco, CA';
    
    fetchScenarioData(occupation, location);
  }, [fetchScenarioData]);

  const handleClose = () => {
    window.close();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-full px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={handleClose}
              className="text-white hover:bg-white/20 border border-white/30 bg-white/10"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Close
            </Button>
            
            <div className="text-center">
              <h1 className="text-2xl font-bold text-white">Real World Career Data</h1>
              <p className="text-blue-200">Live market insights for your career path</p>
            </div>

            <div className="flex items-center space-x-2">
              <ExternalLink className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Market Analysis</h2>
          <p className="text-gray-300">
            Real-time data to help you make informed career decisions
          </p>
        </div>

        <RealWorldDataDisplay
          salaryData={salaryData}
          costOfLivingData={costOfLivingData}
          jobMarketData={jobMarketData}
          isLoading={isLoading}
        />

        {/* Data Sources */}
        <div className="mt-12 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Data Sources</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
            <div>
              <strong className="text-white">Salary Data:</strong>
              <p>Bureau of Labor Statistics, Glassdoor, PayScale</p>
            </div>
            <div>
              <strong className="text-white">Cost of Living:</strong>
              <p>Numbeo, Council for Community & Economic Research</p>
            </div>
            <div>
              <strong className="text-white">Job Market:</strong>
              <p>LinkedIn, Indeed, Monster Job Analytics</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealWorldData;
