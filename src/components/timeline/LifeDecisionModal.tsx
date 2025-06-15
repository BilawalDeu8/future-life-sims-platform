
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Clock, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

interface Decision {
  year: number;
  title: string;
  description: string;
  options: {
    id: number;
    text: string;
    impact: string;
    consequences?: {
      career: number;
      finances: number;
      relationships: number;
      happiness: number;
    };
  }[];
}

interface LifeDecisionModalProps {
  decision: Decision;
  onDecisionMade: (decisionId: number) => void;
  onClose: () => void;
}

const LifeDecisionModal: React.FC<LifeDecisionModalProps> = ({
  decision,
  onDecisionMade,
  onClose
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleConfirmDecision = () => {
    if (selectedOption !== null) {
      onDecisionMade(selectedOption);
    }
  };

  const getImpactColor = (value: number) => {
    if (value > 0) return 'text-green-400';
    if (value < 0) return 'text-red-400';
    return 'text-gray-400';
  };

  const getImpactIcon = (value: number) => {
    if (value > 0) return <TrendingUp className="h-4 w-4" />;
    if (value < 0) return <TrendingDown className="h-4 w-4" />;
    return null;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 z-[100]">
      <Card className="bg-gray-900/98 border-purple-500/50 max-w-2xl w-full mx-4 animate-scale-in shadow-2xl">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute right-2 top-2 text-gray-400 hover:text-white hover:bg-white/10 z-10"
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="h-5 w-5 text-blue-400" />
            <Badge variant="outline" className="text-blue-300 border-blue-500 bg-blue-500/10">
              Year {decision.year}
            </Badge>
          </div>
          
          <CardTitle className="text-2xl text-white pr-8">{decision.title}</CardTitle>
          <p className="text-gray-300">{decision.description}</p>
          
          <div className="flex items-center space-x-2 mt-2">
            <AlertTriangle className="h-4 w-4 text-yellow-400" />
            <span className="text-sm text-yellow-300">This decision will impact your future timeline</span>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-3">
            {decision.options.map((option) => (
              <div
                key={option.id}
                className={`cursor-pointer rounded-lg border-2 p-4 transition-all duration-300 ${
                  selectedOption === option.id
                    ? 'border-purple-500 bg-purple-500/20'
                    : 'border-gray-600 hover:border-gray-500 bg-gray-800/50'
                }`}
                onClick={() => setSelectedOption(option.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-2">{option.text}</h4>
                    <p className="text-sm text-gray-300 mb-3">{option.impact}</p>
                    
                    {option.consequences && selectedOption === option.id && (
                      <div className="grid grid-cols-2 gap-3 mt-3 p-3 bg-black/30 rounded">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-blue-300">Career</span>
                          <div className={`flex items-center ${getImpactColor(option.consequences.career)}`}>
                            {getImpactIcon(option.consequences.career)}
                            <span className="ml-1 text-xs">
                              {option.consequences.career > 0 ? '+' : ''}{option.consequences.career}%
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-green-300">Finances</span>
                          <div className={`flex items-center ${getImpactColor(option.consequences.finances)}`}>
                            {getImpactIcon(option.consequences.finances)}
                            <span className="ml-1 text-xs">
                              {option.consequences.finances > 0 ? '+' : ''}{option.consequences.finances}%
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-pink-300">Relationships</span>
                          <div className={`flex items-center ${getImpactColor(option.consequences.relationships)}`}>
                            {getImpactIcon(option.consequences.relationships)}
                            <span className="ml-1 text-xs">
                              {option.consequences.relationships > 0 ? '+' : ''}{option.consequences.relationships}%
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-yellow-300">Happiness</span>
                          <div className={`flex items-center ${getImpactColor(option.consequences.happiness)}`}>
                            {getImpactIcon(option.consequences.happiness)}
                            <span className="ml-1 text-xs">
                              {option.consequences.happiness > 0 ? '+' : ''}{option.consequences.happiness}%
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {selectedOption === option.id && (
                    <div className="ml-4">
                      <div className="w-4 h-4 rounded-full bg-purple-500 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              Think More
            </Button>
            <Button
              onClick={handleConfirmDecision}
              disabled={selectedOption === null}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 text-white"
            >
              Make Decision
            </Button>
          </div>
          
          <p className="text-xs text-gray-500 text-center">
            You can always come back and explore different choices
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LifeDecisionModal;
