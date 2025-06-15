
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { LifeEvent } from '@/types/lifeCanvas';
import { motion } from 'framer-motion';

interface ComparisonOverlayProps {
  events: LifeEvent[];
  predictions: any[]; // TODO: Define prediction type
  onClose: () => void;
}

const ComparisonOverlay: React.FC<ComparisonOverlayProps> = ({
  events,
  predictions,
  onClose
}) => {
  // Calculate comparison metrics
  const calculateComparison = () => {
    const currentAge = 25; // TODO: Get from props
    const predictedEvents = predictions.filter(p => p.age <= currentAge);
    const actualEvents = events.filter(e => {
      const eventAge = new Date().getFullYear() - new Date(e.date).getFullYear();
      return eventAge <= currentAge;
    });

    return {
      predictedCount: predictedEvents.length,
      actualCount: actualEvents.length,
      accuracyRate: predictedEvents.length > 0 ? (actualEvents.length / predictedEvents.length) * 100 : 0,
      categories: {
        career: {
          predicted: predictedEvents.filter(p => p.category === 'career').length,
          actual: actualEvents.filter(e => e.category.id === 'career').length
        },
        relationships: {
          predicted: predictedEvents.filter(p => p.category === 'relationships').length,
          actual: actualEvents.filter(e => e.category.id === 'relationships').length
        },
        achievements: {
          predicted: predictedEvents.filter(p => p.category === 'achievements').length,
          actual: actualEvents.filter(e => e.category.id === 'achievements').length
        }
      }
    };
  };

  const comparison = calculateComparison();

  const getChangeIcon = (predicted: number, actual: number) => {
    if (actual > predicted) return <TrendingUp className="h-4 w-4 text-green-400" />;
    if (actual < predicted) return <TrendingDown className="h-4 w-4 text-red-400" />;
    return <Minus className="h-4 w-4 text-gray-400" />;
  };

  const getChangeText = (predicted: number, actual: number) => {
    const diff = actual - predicted;
    if (diff > 0) return `+${diff} ahead`;
    if (diff < 0) return `${diff} behind`;
    return 'On track';
  };

  const getChangeColor = (predicted: number, actual: number) => {
    if (actual > predicted) return 'text-green-400';
    if (actual < predicted) return 'text-red-400';
    return 'text-gray-400';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gradient-to-br from-purple-900/95 via-blue-900/95 to-indigo-900/95 backdrop-blur-lg border border-white/20 rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Prediction vs Reality</h2>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Overall Comparison */}
          <Card className="bg-white/5 border-white/20 mb-6">
            <CardHeader>
              <CardTitle className="text-white">Overall Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">
                    {comparison.predictedCount}
                  </div>
                  <div className="text-white/70 text-sm">Predicted Events</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    {comparison.actualCount}
                  </div>
                  <div className="text-white/70 text-sm">Actual Events</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">
                    {Math.round(comparison.accuracyRate)}%
                  </div>
                  <div className="text-white/70 text-sm">Accuracy Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category Breakdown */}
          <Card className="bg-white/5 border-white/20 mb-6">
            <CardHeader>
              <CardTitle className="text-white">Category Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(comparison.categories).map(([category, data]) => (
                  <div key={category} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                        {category === 'career' && '💼'}
                        {category === 'relationships' && '❤️'}
                        {category === 'achievements' && '🏆'}
                      </div>
                      <div>
                        <div className="text-white font-medium capitalize">{category}</div>
                        <div className="text-white/60 text-sm">
                          {data.predicted} predicted → {data.actual} actual
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getChangeIcon(data.predicted, data.actual)}
                      <span className={`text-sm font-medium ${getChangeColor(data.predicted, data.actual)}`}>
                        {getChangeText(data.predicted, data.actual)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Insights and Recommendations */}
          <Card className="bg-white/5 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Key Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {comparison.actualCount > comparison.predictedCount && (
                  <div className="flex items-start gap-3 p-3 bg-green-500/10 border border-green-400/30 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-green-400 mt-0.5" />
                    <div>
                      <div className="text-green-200 font-medium">Exceeding Expectations</div>
                      <div className="text-green-300/80 text-sm">
                        You're ahead of your predicted timeline! You've documented {comparison.actualCount - comparison.predictedCount} more life events than originally simulated.
                      </div>
                    </div>
                  </div>
                )}
                
                {comparison.actualCount < comparison.predictedCount && (
                  <div className="flex items-start gap-3 p-3 bg-orange-500/10 border border-orange-400/30 rounded-lg">
                    <TrendingDown className="h-5 w-5 text-orange-400 mt-0.5" />
                    <div>
                      <div className="text-orange-200 font-medium">Room for Growth</div>
                      <div className="text-orange-300/80 text-sm">
                        You're behind your predicted timeline by {comparison.predictedCount - comparison.actualCount} events. Consider what opportunities you might be missing.
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3 p-3 bg-blue-500/10 border border-blue-400/30 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-blue-400 mt-0.5" />
                  <div>
                    <div className="text-blue-200 font-medium">Prediction Accuracy</div>
                    <div className="text-blue-300/80 text-sm">
                      Your life simulation had a {Math.round(comparison.accuracyRate)}% accuracy rate. 
                      {comparison.accuracyRate > 70 ? ' Excellent prediction skills!' : ' Life is full of surprises!'}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ComparisonOverlay;
