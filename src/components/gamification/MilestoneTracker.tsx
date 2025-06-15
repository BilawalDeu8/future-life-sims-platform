
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Milestone } from '@/types/gamification';
import { Calendar, Plus, CheckCircle, Target, Clock } from 'lucide-react';

interface MilestoneTrackerProps {
  milestones: Milestone[];
  onAddMilestone: (milestone: Omit<Milestone, 'id'>) => void;
  onCompleteMilestone: (milestoneId: string) => void;
}

const MilestoneTracker: React.FC<MilestoneTrackerProps> = ({ 
  milestones, 
  onAddMilestone, 
  onCompleteMilestone 
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMilestone, setNewMilestone] = useState({
    title: '',
    description: '',
    targetDate: '',
    category: 'career',
    maxProgress: 1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMilestone.title && newMilestone.targetDate) {
      onAddMilestone({
        ...newMilestone,
        targetDate: new Date(newMilestone.targetDate),
        isCompleted: false,
        progress: 0,
        maxProgress: newMilestone.maxProgress
      });
      setNewMilestone({
        title: '',
        description: '',
        targetDate: '',
        category: 'career',
        maxProgress: 1
      });
      setShowAddForm(false);
    }
  };

  const activeMilestones = milestones.filter(m => !m.isCompleted);
  const completedMilestones = milestones.filter(m => m.isCompleted);

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center">
            <Target className="h-6 w-6 mr-2 text-green-400" />
            Personal Milestones
          </CardTitle>
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Goal
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {showAddForm && (
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm text-gray-300 mb-1 block">Goal Title</label>
                  <input
                    type="text"
                    value={newMilestone.title}
                    onChange={(e) => setNewMilestone(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                    placeholder="e.g., Complete coding bootcamp"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-300 mb-1 block">Description</label>
                  <textarea
                    value={newMilestone.description}
                    onChange={(e) => setNewMilestone(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                    placeholder="Describe your goal..."
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-300 mb-1 block">Target Date</label>
                    <input
                      type="date"
                      value={newMilestone.targetDate}
                      onChange={(e) => setNewMilestone(prev => ({ ...prev, targetDate: e.target.value }))}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-300 mb-1 block">Category</label>
                    <select
                      value={newMilestone.category}
                      onChange={(e) => setNewMilestone(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                    >
                      <option value="career" className="bg-gray-900">Career</option>
                      <option value="education" className="bg-gray-900">Education</option>
                      <option value="personal" className="bg-gray-900">Personal</option>
                      <option value="financial" className="bg-gray-900">Financial</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddForm(false)}
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    Add Goal
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-300">Active Goals ({activeMilestones.length})</h4>
          {activeMilestones.length === 0 ? (
            <p className="text-gray-500 text-sm">No active goals. Add your first milestone!</p>
          ) : (
            activeMilestones.map(milestone => (
              <div key={milestone.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h5 className="font-semibold text-white">{milestone.title}</h5>
                    <p className="text-sm text-gray-300">{milestone.description}</p>
                  </div>
                  <Badge className="bg-blue-600 text-white ml-2">
                    {milestone.category}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center text-sm text-gray-400">
                    <Calendar className="h-4 w-4 mr-1" />
                    {milestone.targetDate.toLocaleDateString()}
                  </div>
                  <Button
                    onClick={() => onCompleteMilestone(milestone.id)}
                    className="bg-green-600 hover:bg-green-700 px-3 py-1 text-sm"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Complete
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {completedMilestones.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-300">Completed Goals ({completedMilestones.length})</h4>
            {completedMilestones.map(milestone => (
              <div key={milestone.id} className="bg-green-600/20 rounded-lg p-4 border border-green-500/30">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h5 className="font-semibold text-white flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                      {milestone.title}
                    </h5>
                    <p className="text-sm text-gray-300">{milestone.description}</p>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-600 text-white">Completed</Badge>
                    <div className="text-xs text-gray-400 mt-1">
                      {milestone.completedAt?.toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MilestoneTracker;
