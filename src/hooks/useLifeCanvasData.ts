
import { useState, useEffect, useCallback } from 'react';
import { LifeEvent, TimelineMarker, LifeInsight } from '@/types/lifeCanvas';
import { toast } from 'sonner';

export const useLifeCanvasData = (userId: string, currentAge: number, birthYear: number) => {
  const [events, setEvents] = useState<LifeEvent[]>([]);
  const [timelineMarkers, setTimelineMarkers] = useState<TimelineMarker[]>([]);
  const [insights, setInsights] = useState<LifeInsight[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize timeline markers
  useEffect(() => {
    const markers: TimelineMarker[] = [];
    
    for (let age = 18; age <= currentAge + 10; age++) {
      for (let quarter = 0; quarter < 4; quarter++) {
        markers.push({
          year: birthYear + age,
          quarter,
          position: (age - 18 + quarter * 0.25) * 100,
          isCurrentAge: age === Math.floor(currentAge) && quarter === Math.floor((currentAge % 1) * 4),
          isFuture: age > currentAge
        });
      }
    }
    
    setTimelineMarkers(markers);
  }, [currentAge, birthYear]);

  // Load user's life events
  const loadEvents = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // In a real app, this would be an API call
      const savedEvents = localStorage.getItem(`life-events-${userId}`);
      if (savedEvents) {
        const parsed = JSON.parse(savedEvents);
        setEvents(parsed.map((event: any) => ({
          ...event,
          date: new Date(event.date),
          createdAt: new Date(event.createdAt),
          updatedAt: new Date(event.updatedAt)
        })));
      } else {
        // Create some sample events for demo
        const sampleEvents: LifeEvent[] = [
          {
            id: '1',
            title: 'Started College',
            description: 'Began studying Computer Science at State University',
            date: new Date(birthYear + 18, 8, 1),
            category: { id: 'career', name: 'Career', icon: '🎓', color: 'career', description: 'Education milestone' },
            position: { x: 0, y: 200 },
            satisfactionRating: 4,
            financialImpact: -50000,
            photos: [],
            mood: 'excited',
            isConnectedToPrediction: false,
            connections: [],
            tags: ['education', 'milestone'],
            isPrivate: false,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ];
        setEvents(sampleEvents);
      }
    } catch (error) {
      console.error('Failed to load events:', error);
      toast.error('Failed to load your life events');
    } finally {
      setIsLoading(false);
    }
  }, [userId, birthYear]);

  // Save events to storage
  const saveEvents = useCallback((newEvents: LifeEvent[]) => {
    try {
      localStorage.setItem(`life-events-${userId}`, JSON.stringify(newEvents));
    } catch (error) {
      console.error('Failed to save events:', error);
      toast.error('Failed to save changes');
    }
  }, [userId]);

  // Add new event
  const addEvent = useCallback(async (eventData: Partial<LifeEvent>) => {
    const newEvent: LifeEvent = {
      id: Date.now().toString(),
      title: eventData.title || 'New Event',
      description: eventData.description || '',
      date: eventData.date || new Date(),
      category: eventData.category!,
      position: eventData.position || { x: 0, y: 300 },
      satisfactionRating: eventData.satisfactionRating || 3,
      financialImpact: eventData.financialImpact,
      photos: eventData.photos || [],
      mood: eventData.mood || 'neutral',
      isConnectedToPrediction: eventData.isConnectedToPrediction || false,
      predictionId: eventData.predictionId,
      connections: eventData.connections || [],
      tags: eventData.tags || [],
      isPrivate: eventData.isPrivate || false,
      location: eventData.location,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    saveEvents(updatedEvents);
    
    // Generate new insights after adding event
    generateInsights(updatedEvents);
  }, [events, saveEvents]);

  // Update existing event
  const updateEvent = useCallback(async (eventId: string, updates: Partial<LifeEvent>) => {
    const updatedEvents = events.map(event => 
      event.id === eventId 
        ? { ...event, ...updates, updatedAt: new Date() }
        : event
    );
    
    setEvents(updatedEvents);
    saveEvents(updatedEvents);
    generateInsights(updatedEvents);
  }, [events, saveEvents]);

  // Delete event
  const deleteEvent = useCallback(async (eventId: string) => {
    const updatedEvents = events.filter(event => event.id !== eventId);
    setEvents(updatedEvents);
    saveEvents(updatedEvents);
    generateInsights(updatedEvents);
  }, [events, saveEvents]);

  // Connect events
  const connectEvents = useCallback(async (eventId1: string, eventId2: string) => {
    const updatedEvents = events.map(event => {
      if (event.id === eventId1) {
        return {
          ...event,
          connections: [...event.connections, eventId2],
          updatedAt: new Date()
        };
      }
      if (event.id === eventId2) {
        return {
          ...event,
          connections: [...event.connections, eventId1],
          updatedAt: new Date()
        };
      }
      return event;
    });
    
    setEvents(updatedEvents);
    saveEvents(updatedEvents);
  }, [events, saveEvents]);

  // Generate insights
  const generateInsights = useCallback((eventData: LifeEvent[] = events) => {
    const newInsights: LifeInsight[] = [];

    // Pattern: High satisfaction events
    const highSatisfactionEvents = eventData.filter(e => e.satisfactionRating >= 4);
    if (highSatisfactionEvents.length >= 3) {
      newInsights.push({
        id: 'high-satisfaction-pattern',
        type: 'pattern',
        title: 'Success Pattern Identified',
        description: `You've had ${highSatisfactionEvents.length} highly satisfying life events. Common themes include ${getCommonCategories(highSatisfactionEvents)}.`,
        events: highSatisfactionEvents.map(e => e.id),
        importance: 'high',
        actionable: true,
        suggestion: 'Consider planning more events in these categories for continued satisfaction.'
      });
    }

    // Achievement tracking
    const recentAchievements = eventData.filter(e => 
      e.category.id === 'achievements' && 
      (new Date().getTime() - e.date.getTime()) < 365 * 24 * 60 * 60 * 1000
    );
    
    if (recentAchievements.length > 0) {
      newInsights.push({
        id: 'recent-achievements',
        type: 'achievement',
        title: 'Achievement Momentum',
        description: `You've unlocked ${recentAchievements.length} achievements this year. Keep up the great work!`,
        events: recentAchievements.map(e => e.id),
        importance: 'medium',
        actionable: false
      });
    }

    // Career progression analysis
    const careerEvents = eventData.filter(e => e.category.id === 'career').sort((a, b) => a.date.getTime() - b.date.getTime());
    if (careerEvents.length >= 2) {
      const avgSatisfaction = careerEvents.reduce((sum, e) => sum + e.satisfactionRating, 0) / careerEvents.length;
      
      newInsights.push({
        id: 'career-progression',
        type: 'pattern',
        title: 'Career Journey Analysis',
        description: `Your career satisfaction average is ${avgSatisfaction.toFixed(1)}/5. ${avgSatisfaction >= 3.5 ? 'You\'re on a positive trajectory!' : 'Consider exploring new opportunities.'}`,
        events: careerEvents.map(e => e.id),
        importance: 'high',
        actionable: avgSatisfaction < 3.5,
        suggestion: avgSatisfaction < 3.5 ? 'Explore career coaching or new opportunities to boost satisfaction.' : undefined
      });
    }

    setInsights(newInsights);
  }, [events]);

  // Helper function to get common categories
  const getCommonCategories = (events: LifeEvent[]) => {
    const categoryCount: { [key: string]: number } = {};
    events.forEach(event => {
      categoryCount[event.category.name] = (categoryCount[event.category.name] || 0) + 1;
    });
    
    return Object.entries(categoryCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([category]) => category)
      .join(', ');
  };

  // Initialize data
  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  return {
    events,
    timelineMarkers,
    insights,
    isLoading,
    addEvent,
    updateEvent,
    deleteEvent,
    connectEvents,
    generateInsights: () => generateInsights()
  };
};
