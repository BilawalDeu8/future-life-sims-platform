
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder, Sphere, Cone, Text } from '@react-three/drei';
import * as THREE from 'three';

interface Enhanced3DModelsProps {
  stage: any;
  isSelected: boolean;
  onHover: () => void;
  onClick: () => void;
}

export const EnhancedHomeModel: React.FC<Enhanced3DModelsProps> = ({ 
  stage, isSelected, onHover, onClick 
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = React.useState(false);

  useFrame((state) => {
    if (groupRef.current && isSelected) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  const getHomeConfig = () => {
    switch (stage.home.type) {
      case 'studio':
        return { size: [1.2, 1.5, 1.2], color: '#8B7D6B', windows: 2 };
      case 'apartment':
        return { size: [2, 2.5, 1.8], color: '#A0896C', windows: 4 };
      case 'house':
        return { size: [3, 2.8, 2.5], color: '#D2B48C', windows: 6 };
      case 'mansion':
        return { size: [4.5, 3.5, 3.8], color: '#F5DEB3', windows: 12 };
      default:
        return { size: [1.2, 1.5, 1.2], color: '#8B7D6B', windows: 2 };
    }
  };

  const config = getHomeConfig();
  const [width, height, depth] = config.size;

  return (
    <group 
      ref={groupRef}
      position={stage.home.position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClick={onClick}
      scale={hovered ? 1.05 : 1}
    >
      {/* Main building */}
      <Box args={[width, height, depth]} position={[0, height/2, 0]}>
        <meshStandardMaterial 
          color={config.color} 
          roughness={0.8}
          metalness={0.1}
        />
      </Box>
      
      {/* Roof */}
      <Cone args={[width * 0.7, 0.8, 4]} position={[0, height + 0.4, 0]}>
        <meshStandardMaterial color="#8B4513" />
      </Cone>
      
      {/* Windows */}
      {Array.from({ length: config.windows }, (_, i) => {
        const row = Math.floor(i / 2);
        const col = i % 2;
        return (
          <Box 
            key={i}
            args={[0.3, 0.4, 0.05]} 
            position={[
              (col - 0.5) * (width * 0.6),
              0.8 + row * 0.8,
              depth/2 + 0.02
            ]}
          >
            <meshStandardMaterial color="#87CEEB" emissive="#001122" emissiveIntensity={0.2} />
          </Box>
        );
      })}
      
      {/* Door */}
      <Box args={[0.4, 0.8, 0.1]} position={[0, 0.4, depth/2 + 0.05]}>
        <meshStandardMaterial color="#654321" />
      </Box>
      
      {/* Garden/Yard */}
      <Cylinder args={[width * 0.8, width * 0.8, 0.05]} position={[0, -0.02, 0]}>
        <meshStandardMaterial color="#228B22" />
      </Cylinder>
      
      {/* Trees for house/mansion */}
      {(stage.home.type === 'house' || stage.home.type === 'mansion') && (
        <>
          <Cylinder args={[0.1, 0.1, 1.5]} position={[width/2 + 0.5, 0.75, 0]}>
            <meshStandardMaterial color="#8B4513" />
          </Cylinder>
          <Sphere args={[0.5]} position={[width/2 + 0.5, 1.8, 0]}>
            <meshStandardMaterial color="#228B22" />
          </Sphere>
        </>
      )}
      
      {/* Pool for mansion */}
      {stage.home.type === 'mansion' && (
        <Cylinder args={[1, 1, 0.2]} position={[-width/2 - 1, 0.1, -depth/2]}>
          <meshStandardMaterial color="#00CED1" transparent opacity={0.8} />
        </Cylinder>
      )}
      
      {isSelected && (
        <Text
          position={[0, height + 1.5, 0]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {stage.home.type.toUpperCase()}
          {"\n"}${(stage.financials.income * 0.25 / 12).toLocaleString()}/mo
        </Text>
      )}
    </group>
  );
};

export const EnhancedWorkplaceModel: React.FC<Enhanced3DModelsProps> = ({ 
  stage, isSelected, onHover, onClick 
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = React.useState(false);

  useFrame((state) => {
    if (groupRef.current && hovered) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const getWorkplaceConfig = () => {
    switch (stage.workplace.type) {
      case 'startup':
        return { 
          size: [2.5, 3, 2.5], 
          color: '#4A90E2', 
          floors: 3,
          style: 'modern'
        };
      case 'corporate':
        return { 
          size: [3, 8, 3], 
          color: '#2C3E50', 
          floors: 8,
          style: 'corporate'
        };
      case 'remote':
        return { 
          size: [1.5, 1.5, 1.5], 
          color: '#7B68EE', 
          floors: 1,
          style: 'home_office'
        };
      case 'enterprise':
        return { 
          size: [4, 12, 4], 
          color: '#34495E', 
          floors: 12,
          style: 'skyscraper'
        };
      default:
        return { 
          size: [2.5, 3, 2.5], 
          color: '#4A90E2', 
          floors: 3,
          style: 'modern'
        };
    }
  };

  const config = getWorkplaceConfig();
  const [width, height, depth] = config.size;

  return (
    <group 
      ref={groupRef}
      position={stage.workplace.position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClick={onClick}
      scale={hovered ? 1.02 : 1}
    >
      {/* Main building */}
      <Box args={[width, height, depth]} position={[0, height/2, 0]}>
        <meshStandardMaterial 
          color={config.color}
          roughness={0.3}
          metalness={0.7}
        />
      </Box>
      
      {/* Windows pattern */}
      {Array.from({ length: config.floors }, (_, floor) =>
        Array.from({ length: 4 }, (_, window) => (
          <Box 
            key={`${floor}-${window}`}
            args={[0.25, 0.35, 0.02]} 
            position={[
              (window - 1.5) * 0.4,
              0.5 + floor * (height / config.floors),
              depth/2 + 0.01
            ]}
          >
            <meshStandardMaterial 
              color="#87CEEB" 
              emissive={stage.workplace.type === 'startup' ? '#FFD700' : '#001122'} 
              emissiveIntensity={0.3}
            />
          </Box>
        ))
      )}
      
      {/* Logo/Sign */}
      <Box args={[1, 0.3, 0.05]} position={[0, height - 0.5, depth/2 + 0.02]}>
        <meshStandardMaterial color="#FFFFFF" />
      </Box>
      
      {/* Antenna for tech companies */}
      {(stage.workplace.type === 'startup' || stage.workplace.type === 'enterprise') && (
        <Cylinder args={[0.02, 0.02, 1]} position={[0, height + 0.5, 0]}>
          <meshStandardMaterial color="#FF0000" emissive="#FF0000" emissiveIntensity={0.5} />
        </Cylinder>
      )}
      
      {isSelected && (
        <Text
          position={[0, height + 1, 0]}
          fontSize={0.25}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {stage.career.title}
          {"\n"}${stage.financials.income.toLocaleString()}/year
        </Text>
      )}
    </group>
  );
};

export const EnhancedVehicleModel: React.FC<Enhanced3DModelsProps> = ({ 
  stage, isSelected, onHover, onClick 
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = React.useState(false);

  useFrame((state) => {
    if (groupRef.current && hovered) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 3) * 0.05 + 0.2;
    }
  });

  if (stage.vehicle.type === 'none') return null;

  const getVehicleConfig = () => {
    switch (stage.vehicle.type) {
      case 'bike':
        return { 
          size: [0.3, 0.15, 0.8], 
          color: '#FF4444',
          wheels: 2,
          luxury: false
        };
      case 'car':
        return { 
          size: [0.9, 0.4, 1.8], 
          color: '#4444FF',
          wheels: 4,
          luxury: false
        };
      case 'luxury':
        return { 
          size: [1.1, 0.45, 2.2], 
          color: '#000000',
          wheels: 4,
          luxury: true
        };
      case 'electric':
        return { 
          size: [1, 0.42, 2], 
          color: '#00FF88',
          wheels: 4,
          luxury: true
        };
      default:
        return { 
          size: [0.9, 0.4, 1.8], 
          color: '#4444FF',
          wheels: 4,
          luxury: false
        };
    }
  };

  const config = getVehicleConfig();
  const [width, height, length] = config.size;

  return (
    <group 
      ref={groupRef}
      position={stage.vehicle.position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClick={onClick}
      scale={hovered ? 1.1 : 1}
    >
      {/* Main body */}
      <Box args={[width, height, length]} position={[0, height/2, 0]}>
        <meshStandardMaterial 
          color={config.color}
          roughness={config.luxury ? 0.1 : 0.5}
          metalness={config.luxury ? 0.9 : 0.3}
        />
      </Box>
      
      {/* Windshield */}
      <Box args={[width - 0.1, height * 0.6, 0.05]} position={[0, height * 0.7, length/2 - 0.2]}>
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.8} />
      </Box>
      
      {/* Wheels */}
      {Array.from({ length: config.wheels }, (_, i) => {
        const positions = config.wheels === 2 ? 
          [[0, 0.1, length/2 - 0.2], [0, 0.1, -length/2 + 0.2]] :
          [
            [width/2 - 0.1, 0.1, length/2 - 0.2],
            [-width/2 + 0.1, 0.1, length/2 - 0.2],
            [width/2 - 0.1, 0.1, -length/2 + 0.2],
            [-width/2 + 0.1, 0.1, -length/2 + 0.2]
          ];
        
        return (
          <Cylinder 
            key={i}
            args={[0.15, 0.15, 0.08]} 
            position={positions[i] as [number, number, number]} 
            rotation={[0, 0, Math.PI/2]}
          >
            <meshStandardMaterial color="#333333" />
          </Cylinder>
        );
      })}
      
      {/* Luxury features */}
      {config.luxury && (
        <>
          {/* Chrome details */}
          <Box args={[width + 0.05, 0.05, length + 0.05]} position={[0, height * 0.3, 0]}>
            <meshStandardMaterial color="#C0C0C0" metalness={1} roughness={0} />
          </Box>
          
          {/* Spoiler for luxury cars */}
          <Box args={[width * 0.8, 0.1, 0.15]} position={[0, height + 0.05, -length/2 + 0.1]}>
            <meshStandardMaterial color={config.color} />
          </Box>
        </>
      )}
      
      {/* Electric car charging port */}
      {stage.vehicle.type === 'electric' && (
        <Cylinder args={[0.05, 0.05, 0.1]} position={[width/2, height/2, 0]} rotation={[0, 0, Math.PI/2]}>
          <meshStandardMaterial color="#00FF00" emissive="#00FF00" emissiveIntensity={0.3} />
        </Cylinder>
      )}
    </group>
  );
};
