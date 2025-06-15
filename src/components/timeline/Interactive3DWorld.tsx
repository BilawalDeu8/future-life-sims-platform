
import React, { useState } from 'react';

interface Building3DProps {
  position: { x: number; y: number; z: number };
  size: { width: number; height: number; depth: number };
  color: string;
  type: 'home' | 'office' | 'lifestyle';
  onClick: () => void;
  label: string;
}

const Building3D: React.FC<Building3DProps> = ({ position, size, color, type, onClick, label }) => {
  const [hovered, setHovered] = useState(false);

  const buildingStyle = {
    position: 'absolute' as const,
    left: `${position.x}%`,
    top: `${position.y}%`,
    width: `${size.width}px`,
    height: `${size.height}px`,
    backgroundColor: hovered ? '#ffffff' : color,
    transform: `translateZ(${position.z}px) rotateX(45deg) rotateY(-15deg)`,
    transformStyle: 'preserve-3d' as const,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: '2px solid rgba(255,255,255,0.3)',
    borderRadius: '4px',
    boxShadow: hovered ? '0 10px 20px rgba(255,255,255,0.3)' : '0 5px 15px rgba(0,0,0,0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 'bold',
    color: hovered ? '#333' : '#fff',
    textShadow: hovered ? 'none' : '1px 1px 2px rgba(0,0,0,0.7)'
  };

  return (
    <div
      style={buildingStyle}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={label}
    >
      {label}
    </div>
  );
};

interface Vehicle3DProps {
  position: { x: number; y: number };
  type: string;
  color: string;
}

const Vehicle3D: React.FC<Vehicle3DProps> = ({ position, type, color }) => {
  if (type === 'none') return null;

  const vehicleEmoji = {
    'bike': '🏍️',
    'car': '🚗',
    'luxury': '🚘',
    'electric': '⚡'
  }[type] || '🚌';

  const vehicleStyle = {
    position: 'absolute' as const,
    left: `${position.x}%`,
    top: `${position.y}%`,
    fontSize: '24px',
    transform: 'rotateX(45deg) rotateY(-15deg)',
    transformStyle: 'preserve-3d' as const,
    filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))'
  };

  return (
    <div style={vehicleStyle} title={type.toUpperCase()}>
      {vehicleEmoji}
    </div>
  );
};

interface Interactive3DWorldProps {
  currentAge: number;
  lifeStage: any;
  onBuildingClick: (building: any) => void;
  userLocation: string;
}

const Interactive3DWorld: React.FC<Interactive3DWorldProps> = ({ 
  currentAge, 
  lifeStage, 
  onBuildingClick,
  userLocation 
}) => {
  const isIndianLocation = userLocation.toLowerCase().includes('india');
  const [viewAngle, setViewAngle] = useState(0);

  // Generate neighborhood quality based on progression
  const progressFactor = (currentAge - 22) / 28;
  const neighborhoodQuality = progressFactor < 0.3 ? 'urban' : 
                             progressFactor < 0.6 ? 'suburban' : 
                             progressFactor < 0.8 ? 'premium' : 'luxury';

  const skyColor = progressFactor < 0.5 ? '#87CEEB' : '#98D8E8';
  const grassColor = '#90EE90';

  const containerStyle = {
    width: '100%',
    height: '100%',
    background: `linear-gradient(to bottom, ${skyColor}, #E0F6FF)`,
    position: 'relative' as const,
    overflow: 'hidden',
    perspective: '1000px',
    transform: `rotateY(${viewAngle}deg)`,
    transition: 'transform 0.5s ease'
  };

  const groundStyle = {
    position: 'absolute' as const,
    bottom: '0',
    left: '0',
    right: '0',
    height: '60%',
    background: `linear-gradient(45deg, ${grassColor}, #7FDD7F)`,
    transform: 'rotateX(60deg) translateZ(-50px)',
    transformOrigin: 'bottom',
    borderTop: '3px solid #228B22'
  };

  const roadStyle = {
    position: 'absolute' as const,
    bottom: '30%',
    left: '0',
    right: '0',
    height: '8px',
    backgroundColor: '#696969',
    transform: 'rotateX(60deg) translateZ(10px)',
    boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
  };

  const roadVerticalStyle = {
    position: 'absolute' as const,
    left: '45%',
    bottom: '0',
    width: '8px',
    height: '100%',
    backgroundColor: '#696969',
    transform: 'rotateY(15deg) translateZ(10px)',
    boxShadow: '2px 0 4px rgba(0,0,0,0.3)'
  };

  return (
    <div style={containerStyle}>
      {/* Ground */}
      <div style={groundStyle} />
      
      {/* Roads */}
      <div style={roadStyle} />
      <div style={roadVerticalStyle} />

      {/* Main Home */}
      <Building3D
        position={{ x: 20, y: 40, z: 0 }}
        size={{ 
          width: lifeStage.home.size[0] * 20, 
          height: lifeStage.home.size[1] * 25, 
          depth: lifeStage.home.size[2] * 20 
        }}
        color={lifeStage.home.color}
        type="home"
        onClick={() => onBuildingClick({ type: 'home', data: lifeStage.home })}
        label={lifeStage.home.type.toUpperCase()}
      />

      {/* Workplace */}
      <Building3D
        position={{ x: 65, y: 25, z: 20 }}
        size={{ width: 60, height: lifeStage.workplace.height * 30, depth: 60 }}
        color={lifeStage.workplace.color}
        type="office"
        onClick={() => onBuildingClick({ type: 'workplace', data: lifeStage.workplace })}
        label="OFFICE"
      />

      {/* Vehicle */}
      <Vehicle3D
        position={{ x: 28, y: 42 }}
        type={lifeStage.vehicle.type}
        color={lifeStage.vehicle.color}
      />

      {/* Lifestyle Buildings */}
      {lifeStage.lifestyle.gym && (
        <Building3D
          position={{ x: 50, y: 60, z: 10 }}
          size={{ width: 40, height: 50, depth: 40 }}
          color="#FF6B6B"
          type="lifestyle"
          onClick={() => onBuildingClick({ type: 'gym', data: { name: 'Fitness Center' } })}
          label="GYM"
        />
      )}

      {lifeStage.lifestyle.travel && (
        <Building3D
          position={{ x: 10, y: 20, z: 15 }}
          size={{ width: 35, height: 60, depth: 35 }}
          color="#4ECDC4"
          type="lifestyle"
          onClick={() => onBuildingClick({ type: 'travel', data: { name: 'Travel Hub' } })}
          label="TRAVEL"
        />
      )}

      {/* Neighborhood Buildings */}
      {Array.from({ length: 6 }).map((_, i) => (
        <Building3D
          key={i}
          position={{
            x: 10 + (i % 3) * 25 + Math.random() * 5,
            y: 70 + Math.floor(i / 3) * 15,
            z: Math.random() * 10
          }}
          size={{
            width: 25 + Math.random() * 15,
            height: 30 + Math.random() * 40,
            depth: 25 + Math.random() * 15
          }}
          color="#D3D3D3"
          type="lifestyle"
          onClick={() => {}}
          label="BLDG"
        />
      ))}

      {/* Age/Location Label */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#333',
          textShadow: '2px 2px 4px rgba(255,255,255,0.8)',
          backgroundColor: 'rgba(255,255,255,0.1)',
          padding: '10px 20px',
          borderRadius: '10px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.3)'
        }}
      >
        Age {currentAge} • {lifeStage.location}
      </div>

      {/* Navigation Controls */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}
      >
        <button
          onClick={() => setViewAngle(viewAngle - 15)}
          style={{
            padding: '10px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '50%',
            color: 'white',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)'
          }}
        >
          ↶
        </button>
        <button
          onClick={() => setViewAngle(viewAngle + 15)}
          style={{
            padding: '10px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '50%',
            color: 'white',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)'
          }}
        >
          ↷
        </button>
      </div>
    </div>
  );
};

export default Interactive3DWorld;
