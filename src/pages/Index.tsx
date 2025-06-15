
import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has completed onboarding
    const onboardingCompleted = localStorage.getItem('onboardingCompleted');
    
    if (!onboardingCompleted) {
      navigate('/onboarding');
    } else {
      navigate('/simulation');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p>Loading your life simulator...</p>
      </div>
    </div>
  );
};

export default Index;
