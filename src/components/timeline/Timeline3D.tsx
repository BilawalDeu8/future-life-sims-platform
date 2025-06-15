
import React from 'react';
import SimpleTimeline from './SimpleTimeline';

interface Timeline3DProps {
  careerPath: any;
  onBack: () => void;
}

const Timeline3D: React.FC<Timeline3DProps> = ({ careerPath, onBack }) => {
  return <SimpleTimeline careerPath={careerPath} onBack={onBack} />;
};

export default Timeline3D;
