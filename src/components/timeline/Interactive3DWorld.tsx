
import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Box, Cylinder, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface Building3DProps {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  type: 'home' | 'office' | 'lifestyle';
  onClick: () => void;
}

const Building3D: React.FC<Building3DProps> = ({ position, size, color, type, onClick }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.scale.y = hovered ? 1.1 : 1;
    }
  });

  return (
    <Box
      ref={meshRef}
      position={position}
      args={size}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <meshStandardMaterial color={hovered ? '#ffffff' : color} />
    </Box>
  );
};

interface Vehicle3DProps {
  position: [number, number, number];
  type: string;
  color: string;
}

const Vehicle3D: React.FC<Vehicle3DProps> = ({ position, type, color }) => {
  if (type === 'none') return null;

  return (
    <Box position={position} args={[1.5, 0.5, 3]}>
      <meshStandardMaterial color={color} />
    </Box>
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

  // Generate 3D neighborhood based on age and location
  const generateNeighborhood = () => {
    const progressFactor = (currentAge - 22) / 28; // 22 to 50 age range
    
    // Neighborhood quality improves with age/income
    const neighborhoodQuality = progressFactor < 0.3 ? 'urban' : 
                               progressFactor < 0.6 ? 'suburban' : 
                               progressFactor < 0.8 ? 'premium' : 'luxury';
    
    // Building density based on location and progress
    const buildingDensity = isIndianLocation ? 
      (neighborhoodQuality === 'urban' ? 'high' : 'medium') : 
      (neighborhoodQuality === 'luxury' ? 'low' : 'medium');

    return {
      neighborhoodQuality,
      buildingDensity,
      skyColor: progressFactor < 0.5 ? '#87CEEB' : '#98D8E8',
      grassColor: '#90EE90',
      roadColor: '#696969'
    };
  };

  const neighborhood = generateNeighborhood();

  return (
    <Canvas
      camera={{ position: [0, 15, 15], fov: 60 }}
      style={{ background: `linear-gradient(to bottom, ${neighborhood.skyColor}, #E0F6FF)` }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      {/* Ground */}
      <Box position={[0, -0.5, 0]} args={[40, 1, 40]}>
        <meshStandardMaterial color={neighborhood.grassColor} />
      </Box>

      {/* Roads */}
      <Box position={[0, -0.25, 0]} args={[40, 0.1, 2]}>
        <meshStandardMaterial color={neighborhood.roadColor} />
      </Box>
      <Box position={[0, -0.25, 0]} args={[2, 0.1, 40]}>
        <meshStandardMaterial color={neighborhood.roadColor} />
      </Box>

      {/* Main Home */}
      <Building3D
        position={[-5, 1, -5]}
        size={lifeStage.home.size}
        color={lifeStage.home.color}
        type="home"
        onClick={() => onBuildingClick({ type: 'home', data: lifeStage.home })}
      />

      {/* Workplace */}
      <Building3D
        position={[8, 2, 3]}
        size={[3, lifeStage.workplace.height, 3]}
        color={lifeStage.workplace.color}
        type="office"
        onClick={() => onBuildingClick({ type: 'workplace', data: lifeStage.workplace })}
      />

      {/* Vehicle */}
      <Vehicle3D
        position={[-3, 0.25, -5]}
        type={lifeStage.vehicle.type}
        color={lifeStage.vehicle.color}
      />

      {/* Lifestyle Buildings */}
      {lifeStage.lifestyle.gym && (
        <Building3D
          position={[5, 1, -8]}
          size={[2, 2, 2]}
          color="#FF6B6B"
          type="lifestyle"
          onClick={() => onBuildingClick({ type: 'gym', data: { name: 'Fitness Center' } })}
        />
      )}

      {lifeStage.lifestyle.travel && (
        <Building3D
          position={[-8, 1, 5]}
          size={[2, 3, 2]}
          color="#4ECDC4"
          type="lifestyle"
          onClick={() => onBuildingClick({ type: 'travel', data: { name: 'Travel Agency' } })}
        />
      )}

      {/* Neighborhood Buildings (background) */}
      {Array.from({ length: 8 }).map((_, i) => (
        <Building3D
          key={i}
          position={[
            (i % 4 - 1.5) * 6 + Math.random() * 2,
            0.5 + Math.random(),
            (Math.floor(i / 4) - 0.5) * 15 + Math.random() * 3
          ]}
          size={[1.5, 1 + Math.random() * 2, 1.5]}
          color="#D3D3D3"
          type="lifestyle"
          onClick={() => {}}
        />
      ))}

      {/* Age/Location Label */}
      <Text
        position={[0, 8, 0]}
        fontSize={1}
        color="#333"
        anchorX="center"
        anchorY="middle"
      >
        {`Age ${currentAge} • ${lifeStage.location}`}
      </Text>

      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        maxPolarAngle={Math.PI / 2.2}
        minDistance={5}
        maxDistance={30}
      />
    </Canvas>
  );
};

export default Interactive3DWorld;
