
import React from 'react';

interface Enhanced3DModelsProps {
  stage: any;
  isSelected: boolean;
  onHover: () => void;
  onClick: () => void;
}

// Get user's location to determine display content
const getUserLocation = () => {
  const onboardingData = localStorage.getItem('onboardingData');
  if (onboardingData) {
    const data = JSON.parse(onboardingData);
    return data.personalFoundation?.location || 'Bangalore, India';
  }
  return 'Bangalore, India';
};

export const EnhancedHomeModel: React.FC<Enhanced3DModelsProps> = ({ 
  stage, isSelected, onHover, onClick 
}) => {
  const userLocation = getUserLocation();
  const isIndianLocation = userLocation.toLowerCase().includes('india');
  
  return (
    <div 
      className={`enhanced-3d-model home-model ${isSelected ? 'selected' : ''}`}
      onMouseEnter={onHover}
      onClick={onClick}
    >
      <div className="model-container bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-4 rounded-lg border border-white/30 backdrop-blur-sm">
        <div className="model-icon text-4xl mb-2">🏠</div>
        <h3 className="text-white font-bold">{stage.home.type.toUpperCase()}</h3>
        <p className="text-gray-300 text-sm">
          {isIndianLocation ? `${stage.location}, India` : stage.location}
        </p>
        <div className="mt-2 text-xs text-blue-300">
          {stage.environment.neighborhood} area
        </div>
      </div>
    </div>
  );
};

export const EnhancedWorkplaceModel: React.FC<Enhanced3DModelsProps> = ({ 
  stage, isSelected, onHover, onClick 
}) => {
  const userLocation = getUserLocation();
  const isIndianLocation = userLocation.toLowerCase().includes('india');
  
  return (
    <div 
      className={`enhanced-3d-model workplace-model ${isSelected ? 'selected' : ''}`}
      onMouseEnter={onHover}
      onClick={onClick}
    >
      <div className="model-container bg-gradient-to-br from-green-500/20 to-blue-500/20 p-4 rounded-lg border border-white/30 backdrop-blur-sm">
        <div className="model-icon text-4xl mb-2">🏢</div>
        <h3 className="text-white font-bold">{stage.workplace.type.toUpperCase()}</h3>
        <p className="text-gray-300 text-sm">
          {isIndianLocation ? `${stage.location}, India` : stage.location}
        </p>
        <div className="mt-2 text-xs text-green-300">
          {stage.career.level} level
        </div>
      </div>
    </div>
  );
};

export const EnhancedVehicleModel: React.FC<Enhanced3DModelsProps> = ({ 
  stage, isSelected, onHover, onClick 
}) => {
  const userLocation = getUserLocation();
  const isIndianLocation = userLocation.toLowerCase().includes('india');
  
  const getVehicleIcon = (type: string) => {
    switch (type) {
      case 'bike': return '🏍️';
      case 'car': return '🚗';
      case 'luxury': return '🚘';
      case 'electric': return '⚡🚗';
      default: return '🚌'; // public transport
    }
  };
  
  return (
    <div 
      className={`enhanced-3d-model vehicle-model ${isSelected ? 'selected' : ''}`}
      onMouseEnter={onHover}
      onClick={onClick}
    >
      <div className="model-container bg-gradient-to-br from-yellow-500/20 to-red-500/20 p-4 rounded-lg border border-white/30 backdrop-blur-sm">
        <div className="model-icon text-4xl mb-2">{getVehicleIcon(stage.vehicle.type)}</div>
        <h3 className="text-white font-bold">
          {stage.vehicle.type === 'none' ? 'PUBLIC TRANSPORT' : stage.vehicle.type.toUpperCase()}
        </h3>
        <p className="text-gray-300 text-sm">
          {isIndianLocation ? `${stage.location}, India` : stage.location}
        </p>
        <div className="mt-2 text-xs text-yellow-300">
          {stage.vehicle.type === 'none' ? 'Metro/Bus' : 'Personal vehicle'}
        </div>
      </div>
    </div>
  );
};
