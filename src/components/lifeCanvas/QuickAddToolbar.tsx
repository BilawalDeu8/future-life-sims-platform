
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Mic, Camera, MapPin } from 'lucide-react';
import { LifeEvent, EventCategory } from '@/types/lifeCanvas';
import { motion } from 'framer-motion';

interface QuickAddToolbarProps {
  onEventCreate: (event: Partial<LifeEvent>) => void;
  onClose: () => void;
  suggestedAge: number;
}

const quickCategories: EventCategory[] = [
  { id: 'achievements', name: 'Achievement', icon: '🏆', color: 'achievements', description: 'Quick win' },
  { id: 'career', name: 'Work', icon: '💼', color: 'career', description: 'Job related' },
  { id: 'relationships', name: 'Social', icon: '❤️', color: 'relationships', description: 'People' },
  { id: 'health', name: 'Health', icon: '🏃', color: 'health', description: 'Wellness' },
  { id: 'travel', name: 'Travel', icon: '✈️', color: 'travel', description: 'Adventure' },
  { id: 'custom', name: 'Other', icon: '⭐', color: 'custom', description: 'Misc' }
];

const QuickAddToolbar: React.FC<QuickAddToolbarProps> = ({ 
  onEventCreate, 
  onClose, 
  suggestedAge 
}) => {
  const [title, setTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const handleQuickAdd = () => {
    if (!title.trim() || !selectedCategory) return;

    const newEvent: Partial<LifeEvent> = {
      title: title.trim(),
      description: '',
      date: new Date(),
      category: selectedCategory,
      position: { x: 0, y: 300 },
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
    onClose();
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser');
      return;
    }

    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    setIsRecording(true);
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setTitle(transcript);
      setIsRecording(false);
    };

    recognition.onerror = () => {
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-lg border-t border-white/20 p-4 z-40"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold text-lg">Quick Add Life Event</h3>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          {/* Event Title Input */}
          <div className="flex gap-2">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What happened? (e.g., 'Got promoted to Senior Developer')"
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
              onKeyPress={(e) => e.key === 'Enter' && handleQuickAdd()}
            />
            <Button
              onClick={handleVoiceInput}
              variant="outline"
              size="icon"
              className={`border-white/20 text-white hover:bg-white/20 ${isRecording ? 'bg-red-500/20 border-red-400' : ''}`}
            >
              <Mic className={`h-4 w-4 ${isRecording ? 'text-red-400' : ''}`} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="border-white/20 text-white hover:bg-white/20"
            >
              <Camera className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="border-white/20 text-white hover:bg-white/20"
            >
              <MapPin className="h-4 w-4" />
            </Button>
          </div>

          {/* Quick Category Selection */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {quickCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category)}
                className={`flex-shrink-0 flex items-center px-3 py-2 rounded-lg border-2 transition-all ${
                  selectedCategory?.id === category.id
                    ? 'border-blue-400 bg-blue-500/20 text-white'
                    : 'border-white/20 bg-white/5 text-white/80 hover:border-blue-400/50'
                }`}
              >
                <span className="text-lg mr-2">{category.icon}</span>
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>

          {/* Quick Add Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleQuickAdd}
              disabled={!title.trim() || !selectedCategory}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:opacity-50"
            >
              Add to Timeline
            </Button>
          </div>
        </div>

        {isRecording && (
          <div className="absolute inset-0 bg-red-500/10 flex items-center justify-center">
            <div className="bg-red-500/20 rounded-full p-4">
              <div className="animate-pulse text-red-400 text-center">
                <Mic className="h-8 w-8 mx-auto mb-2" />
                <div className="text-sm">Listening...</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default QuickAddToolbar;
