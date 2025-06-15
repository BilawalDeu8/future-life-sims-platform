
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Plus, Home, Briefcase, Heart, DollarSign, Plane, Award, Activity, User } from 'lucide-react';
import { LifeEvent, EventCategory } from '@/types/lifeCanvas';
import { motion, AnimatePresence } from 'framer-motion';

interface EventCreationFABProps {
  onEventCreate: (event: Partial<LifeEvent>) => void;
  currentAge: number;
}

const eventCategories: EventCategory[] = [
  { id: 'housing', name: 'Housing', icon: '🏠', color: 'housing', description: 'Move, rent, buy home' },
  { id: 'career', name: 'Career', icon: '💼', color: 'career', description: 'Job, promotion, education' },
  { id: 'relationships', name: 'Relationships', icon: '❤️', color: 'relationships', description: 'Dating, marriage, family' },
  { id: 'finance', name: 'Finance', icon: '💰', color: 'finance', description: 'Investment, purchase, debt' },
  { id: 'health', name: 'Health', icon: '🏃', color: 'health', description: 'Fitness, medical, wellness' },
  { id: 'travel', name: 'Travel', icon: '✈️', color: 'travel', description: 'Vacation, relocation' },
  { id: 'achievements', name: 'Achievements', icon: '🏆', color: 'achievements', description: 'Awards, certifications' },
  { id: 'custom', name: 'Custom', icon: '⭐', color: 'custom', description: 'Personal milestone' }
];

const EventCreationFAB: React.FC<EventCreationFABProps> = ({ onEventCreate, currentAge }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | null>(null);

  const handleCategorySelect = (category: EventCategory) => {
    setSelectedCategory(category);
    setIsOpen(false);
    
    // Create basic event with current date and category
    const newEvent: Partial<LifeEvent> = {
      title: `New ${category.name} Event`,
      description: '',
      date: new Date(),
      category,
      position: { x: 0, y: 300 }, // Default position
      satisfactionRating: 3,
      photos: [],
      mood: 'neutral',
      isConnectedToPrediction: false,
      connections: [],
      tags: [],
      isPrivate: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    onEventCreate(newEvent);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-16 right-0 grid grid-cols-2 gap-2 p-4 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20"
          >
            {eventCategories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: index * 0.05 }
                }}
                exit={{ opacity: 0, y: 20 }}
                onClick={() => handleCategorySelect(category)}
                className="flex flex-col items-center p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200 group min-w-[100px]"
              >
                <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">
                  {category.icon}
                </span>
                <span className="text-xs text-white font-medium text-center">
                  {category.name}
                </span>
                <span className="text-xs text-white/60 text-center mt-1 leading-tight">
                  {category.description}
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${
          isOpen 
            ? 'bg-red-500 hover:bg-red-600 rotate-45' 
            : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600'
        }`}
        size="icon"
      >
        <Plus className="h-6 w-6 text-white" />
      </Button>

      {/* Quick hint for first-time users */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-2 right-16 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none"
        >
          Add life event
        </motion.div>
      )}
    </div>
  );
};

export default EventCreationFAB;
