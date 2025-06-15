
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, TrendingUp, Target, AlertCircle, Lightbulb, Refresh } from 'lucide-react';
import { LifeInsight } from '@/types/lifeCanvas';
import { motion } from 'framer-motion';

interface LifeInsightsPanelProps {
  insights: LifeInsight[];
  onClose: () => void;
  onGenerateInsights: () => void;
}

const LifeInsightsPanel: React.FC<LifeInsightsPanelProps> = ({
  insights,
  onClose,
  onGenerateInsights
}) => {
  const getInsightIcon = (type: string, importance: string) => {
    switch (type) {
      case 'pattern':
        return <TrendingUp className={`h-5 w-5 ${importance === 'high' ? 'text-green-400' : 'text-blue-400'}`} />;
      case 'achievement':
        return <Target className="h-5 w-5 text-yellow-400" />;
      case 'deviation':
        return <AlertCircle className="h-5 w-5 text-orange-400" />;
      case 'suggestion':
        return <Lightbulb className="h-5 w-5 text-purple-400" />;
      default:
        return <TrendingUp className="h-5 w-5 text-blue-400" />;
    }
  };

  const getImportanceBadge = (importance: string) => {
    const colors = {
      high: 'bg-red-500/20 text-red-400 border-red-400/50',
      medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-400/50',
      low: 'bg-green-500/20 text-green-400 border-green-400/50'
    };
    
    return (
      <span className={`px-2 py-1 text-xs rounded-full border ${colors[importance as keyof typeof colors]}`}>
        {importance.toUpperCase()}
      </span>
    );
  };

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      className="fixed top-0 right-0 h-full w-96 bg-gradient-to-b from-purple-900/95 via-blue-900/95 to-indigo-900/95 backdrop-blur-lg border-l border-white/20 z-30 overflow-y-auto"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Life Insights</h2>
          <div className="flex gap-2">
            <Button
              onClick={onGenerateInsights}
              variant="outline"
              size="sm"
              className="border-white/30 text-white hover:bg-white/10"
            >
              <Refresh className="h-4 w-4" />
            </Button>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {insights.length === 0 ? (
            <Card className="bg-white/5 border-white/20">
              <CardContent className="p-6 text-center">
                <Lightbulb className="h-12 w-12 text-white/40 mx-auto mb-4" />
                <p className="text-white/70 mb-4">
                  No insights generated yet. Add more life events to unlock powerful analytics about your journey.
                </p>
                <Button
                  onClick={onGenerateInsights}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                >
                  Generate Insights
                </Button>
              </CardContent>
            </Card>
          ) : (
            insights.map((insight, index) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: index * 0.1 }
                }}
              >
                <Card className="bg-white/5 border-white/20 hover:bg-white/10 transition-all">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        {getInsightIcon(insight.type, insight.importance)}
                        <CardTitle className="text-white text-lg">
                          {insight.title}
                        </CardTitle>
                      </div>
                      {getImportanceBadge(insight.importance)}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-white/80 mb-4 leading-relaxed">
                      {insight.description}
                    </p>
                    
                    {insight.suggestion && (
                      <div className="bg-purple-500/10 border border-purple-400/30 rounded-lg p-3 mb-4">
                        <div className="flex items-start gap-2">
                          <Lightbulb className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                          <p className="text-purple-200 text-sm">
                            {insight.suggestion}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/60">
                        {insight.events.length} event{insight.events.length !== 1 ? 's' : ''} analyzed
                      </span>
                      {insight.actionable && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-white/30 text-white hover:bg-white/10 text-xs"
                        >
                          Take Action
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>

        {/* Insight Categories */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-white mb-4">Available Analytics</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 rounded-lg p-3 border border-white/10">
              <TrendingUp className="h-5 w-5 text-blue-400 mb-2" />
              <div className="text-sm text-white font-medium">Patterns</div>
              <div className="text-xs text-white/60">Life trends & habits</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3 border border-white/10">
              <Target className="h-5 w-5 text-yellow-400 mb-2" />
              <div className="text-sm text-white font-medium">Goals</div>
              <div className="text-xs text-white/60">Achievement tracking</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3 border border-white/10">
              <AlertCircle className="h-5 w-5 text-orange-400 mb-2" />
              <div className="text-sm text-white font-medium">Deviations</div>
              <div className="text-xs text-white/60">Path changes</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3 border border-white/10">
              <Lightbulb className="h-5 w-5 text-purple-400 mb-2" />
              <div className="text-sm text-white font-medium">Suggestions</div>
              <div className="text-xs text-white/60">Next steps</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LifeInsightsPanel;
