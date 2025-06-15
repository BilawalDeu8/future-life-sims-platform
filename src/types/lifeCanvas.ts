
export interface LifeEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  category: EventCategory;
  position: {
    x: number;
    y: number;
  };
  satisfactionRating: number;
  financialImpact?: number;
  photos: string[];
  mood: string;
  isConnectedToPrediction: boolean;
  predictionId?: string;
  connections: string[]; // IDs of connected events
  tags: string[];
  isPrivate: boolean;
  location?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EventCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

export interface CanvasViewport {
  x: number;
  y: number;
  zoom: number;
  width: number;
  height: number;
}

export interface TimelineMarker {
  year: number;
  quarter: number;
  position: number;
  isCurrentAge: boolean;
  isFuture: boolean;
}

export interface LifeInsight {
  id: string;
  type: 'pattern' | 'deviation' | 'achievement' | 'suggestion';
  title: string;
  description: string;
  events: string[];
  importance: 'low' | 'medium' | 'high';
  actionable: boolean;
  suggestion?: string;
}

export interface PredictionComparison {
  predictionId: string;
  actualEventId: string;
  accuracy: number;
  deviation: string;
  insights: string[];
}
