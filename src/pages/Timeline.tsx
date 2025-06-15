
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Timeline3D from "@/components/timeline/Timeline3D";
import CareerSelector from "@/components/timeline/CareerSelector";
import { usePersonalization } from "@/hooks/usePersonalization";

const Timeline = () => {
  const navigate = useNavigate();
  const [selectedCareerPath, setSelectedCareerPath] = useState<any>(null);
  const [showCareerSelector, setShowCareerSelector] = useState(true);
  
  // Initialize personalization
  const userId = "demo-user";
  const { profile, trackEngagement } = usePersonalization(userId);

  useEffect(() => {
    if (profile) {
      trackEngagement("timeline_view");
    }
  }, [profile]);

  const handleCareerSelection = (career: any, company?: any) => {
    setSelectedCareerPath({ ...career, company });
    setShowCareerSelector(false);
    
    if (profile) {
      trackEngagement("career_selected", 3);
    }
  };

  const handleBackToSelection = () => {
    setShowCareerSelector(true);
    setSelectedCareerPath(null);
  };

  const handleBackToSimulation = () => {
    navigate('/simulation');
  };

  if (showCareerSelector) {
    return (
      <CareerSelector
        onSelectCareer={handleCareerSelection}
        onClose={handleBackToSimulation}
      />
    );
  }

  if (selectedCareerPath) {
    return (
      <Timeline3D
        careerPath={selectedCareerPath}
        onBack={handleBackToSelection}
      />
    );
  }

  return null;
};

export default Timeline;
