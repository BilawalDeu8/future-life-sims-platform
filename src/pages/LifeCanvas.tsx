
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen } from 'lucide-react';
import LifeCanvas from '@/components/lifeCanvas/LifeCanvas';
import { usePersonalization } from '@/hooks/usePersonalization';
import { toast } from 'sonner';

const LifeCanvasPage: React.FC = () => {
  const navigate = useNavigate();
  const userId = "demo-user"; // In a real app, get from auth
  const currentAge = 25; // In a real app, calculate from user profile
  const birthYear = new Date().getFullYear() - currentAge;
  
  const { profile, trackEngagement } = usePersonalization(userId);

  useEffect(() => {
    if (profile) {
      trackEngagement("life_canvas_view");
    }
  }, [profile]);

  useEffect(() => {
    // Welcome message for first-time users
    const hasVisited = localStorage.getItem('life-canvas-visited');
    if (!hasVisited) {
      setTimeout(() => {
        toast.success("Welcome to Life Canvas! Start documenting your real-life journey by clicking the + button.", {
          duration: 5000
        });
      }, 1000);
      localStorage.setItem('life-canvas-visited', 'true');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/30 to-transparent">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              size="sm"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            
            <div className="text-white">
              <h1 className="text-2xl font-bold flex items-center">
                <BookOpen className="h-6 w-6 mr-3" />
                Life Canvas
              </h1>
              <p className="text-blue-200 text-sm">Document your real-life journey in real-time</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => navigate('/simulation')}
              variant="outline"
              size="sm"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Future Simulator
            </Button>
            <Button
              onClick={() => navigate('/timeline')}
              variant="outline"
              size="sm"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Career Timeline
            </Button>
          </div>
        </div>
      </div>

      {/* Life Canvas Component */}
      <div className="pt-20 h-screen">
        <LifeCanvas
          userId={userId}
          currentAge={currentAge}
          birthYear={birthYear}
        />
      </div>

      {/* Tutorial Hint (for new users) */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-lg text-sm pointer-events-none animate-fade-in">
        <div className="text-center">
          🎯 <strong>Pro Tip:</strong> Click the timeline to quick-add events, or use the + button for detailed entries
        </div>
      </div>
    </div>
  );
};

export default LifeCanvasPage;
