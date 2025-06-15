
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Sparkles, X } from "lucide-react";

interface Milestone {
  year: number;
  title: string;
  description: string;
  impact: string;
}

interface CareerMilestoneModalProps {
  milestone: Milestone;
  onClose: () => void;
}

const CareerMilestoneModal: React.FC<CareerMilestoneModalProps> = ({
  milestone,
  onClose
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <Card className="bg-gradient-to-br from-yellow-900/95 to-orange-900/95 border-yellow-500/50 max-w-xl w-full mx-4 animate-scale-in">
        <CardHeader className="relative text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute right-2 top-2 text-yellow-200 hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Trophy className="h-8 w-8 text-yellow-400 animate-bounce" />
            <Sparkles className="h-6 w-6 text-yellow-300 animate-pulse" />
            <Trophy className="h-8 w-8 text-yellow-400 animate-bounce" />
          </div>
          
          <Badge variant="outline" className="text-yellow-300 border-yellow-500 mb-4">
            Career Milestone {milestone.year}
          </Badge>
          
          <CardTitle className="text-3xl text-yellow-100 mb-2">
            🎉 {milestone.title}
          </CardTitle>
          
          <div className="flex justify-center space-x-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-lg text-yellow-100 mb-4 leading-relaxed">
              {milestone.description}
            </p>
            
            <div className="bg-black/30 rounded-lg p-4 border border-yellow-500/30">
              <h4 className="text-sm font-semibold text-yellow-300 mb-2 flex items-center justify-center">
                <Sparkles className="h-4 w-4 mr-2" />
                Impact on Your Journey
              </h4>
              <p className="text-sm text-yellow-200">
                {milestone.impact}
              </p>
            </div>
          </div>

          <div className="text-center space-y-3">
            <div className="animate-pulse">
              <div className="text-6xl mb-2">🚀</div>
              <p className="text-yellow-300 font-semibold">
                Your career is accelerating!
              </p>
            </div>
            
            <Button
              onClick={onClose}
              className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-semibold px-8 py-3"
            >
              Continue Journey
            </Button>
          </div>
          
          <p className="text-xs text-yellow-400 text-center opacity-80">
            This milestone will boost your career progression and open new opportunities
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CareerMilestoneModal;
