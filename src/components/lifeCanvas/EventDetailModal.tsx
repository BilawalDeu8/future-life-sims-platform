
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { LifeEvent } from '@/types/lifeCanvas';
import { Calendar, MapPin, DollarSign, Camera, Link2, Trash2, Star } from 'lucide-react';
import { toast } from 'sonner';

interface EventDetailModalProps {
  event: LifeEvent;
  onClose: () => void;
  onUpdate: (eventId: string, updates: Partial<LifeEvent>) => void;
  onDelete: (eventId: string) => void;
  allEvents: LifeEvent[];
  onConnect: (eventId1: string, eventId2: string) => void;
}

const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  onClose,
  onUpdate,
  onDelete,
  allEvents,
  onConnect
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: event.title,
    description: event.description,
    satisfactionRating: event.satisfactionRating,
    financialImpact: event.financialImpact || 0,
    location: event.location || '',
    mood: event.mood,
    tags: event.tags.join(', ')
  });

  const handleSave = () => {
    onUpdate(event.id, {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      updatedAt: new Date()
    });
    setIsEditing(false);
    toast.success('Event updated successfully!');
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      onDelete(event.id);
      onClose();
      toast.success('Event deleted successfully');
    }
  };

  const renderSatisfactionStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
      />
    ));
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getRelatedEvents = () => {
    return allEvents.filter(e => 
      e.id !== event.id && 
      (event.connections.includes(e.id) || e.connections.includes(event.id))
    );
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-gradient-to-br from-purple-900/95 via-blue-900/95 to-indigo-900/95 backdrop-blur-lg border-white/20 text-white">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold flex items-center">
              <span className="text-3xl mr-3">{event.category.icon}</span>
              {isEditing ? (
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="bg-white/10 border-white/20 text-white text-xl font-bold"
                />
              ) : (
                event.title
              )}
            </DialogTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
                className="border-white/30 text-white hover:bg-white/10"
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDelete}
                className="border-red-400/50 text-red-400 hover:bg-red-500/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Event Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center text-blue-200">
                <Calendar className="h-4 w-4 mr-2" />
                Date
              </Label>
              <div className="text-white font-medium">
                {formatDate(event.date)}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center text-blue-200">
                <Star className="h-4 w-4 mr-2" />
                Satisfaction Rating
              </Label>
              {isEditing ? (
                <div className="space-y-2">
                  <Slider
                    value={[formData.satisfactionRating]}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, satisfactionRating: value[0] }))}
                    max={5}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-center">
                    {renderSatisfactionStars(formData.satisfactionRating)}
                  </div>
                </div>
              ) : (
                <div className="flex">
                  {renderSatisfactionStars(event.satisfactionRating)}
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label className="text-blue-200">Description</Label>
            {isEditing ? (
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe this life event..."
                className="bg-white/10 border-white/20 text-white min-h-[100px]"
              />
            ) : (
              <p className="text-white/90 bg-white/5 p-3 rounded-lg">
                {event.description || 'No description added yet.'}
              </p>
            )}
          </div>

          {/* Financial Impact & Location */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center text-blue-200">
                <DollarSign className="h-4 w-4 mr-2" />
                Financial Impact
              </Label>
              {isEditing ? (
                <Input
                  type="number"
                  value={formData.financialImpact}
                  onChange={(e) => setFormData(prev => ({ ...prev, financialImpact: Number(e.target.value) }))}
                  placeholder="Enter amount (+ or -)"
                  className="bg-white/10 border-white/20 text-white"
                />
              ) : (
                <div className={`font-medium ${event.financialImpact ? (event.financialImpact > 0 ? 'text-green-400' : 'text-red-400') : 'text-gray-400'}`}>
                  {event.financialImpact ? `$${event.financialImpact.toLocaleString()}` : 'Not specified'}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="flex items-center text-blue-200">
                <MapPin className="h-4 w-4 mr-2" />
                Location
              </Label>
              {isEditing ? (
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Where did this happen?"
                  className="bg-white/10 border-white/20 text-white"
                />
              ) : (
                <div className="text-white/90">
                  {event.location || 'No location specified'}
                </div>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label className="text-blue-200">Tags</Label>
            {isEditing ? (
              <Input
                value={formData.tags}
                onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                placeholder="Enter tags separated by commas"
                className="bg-white/10 border-white/20 text-white"
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {event.tags.length > 0 ? (
                  event.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="bg-blue-500/20 text-blue-200">
                      {tag}
                    </Badge>
                  ))
                ) : (
                  <span className="text-gray-400 text-sm">No tags added</span>
                )}
              </div>
            )}
          </div>

          {/* Connected Events */}
          {getRelatedEvents().length > 0 && (
            <div className="space-y-2">
              <Label className="flex items-center text-blue-200">
                <Link2 className="h-4 w-4 mr-2" />
                Connected Events
              </Label>
              <div className="space-y-2">
                {getRelatedEvents().map(relatedEvent => (
                  <div key={relatedEvent.id} className="flex items-center p-2 bg-white/5 rounded-lg">
                    <span className="text-xl mr-3">{relatedEvent.category.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium text-white">{relatedEvent.title}</div>
                      <div className="text-sm text-white/70">{formatDate(relatedEvent.date)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          {isEditing ? (
            <div className="flex gap-2">
              <Button
                onClick={() => setIsEditing(false)}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              >
                Save Changes
              </Button>
            </div>
          ) : (
            <Button
              onClick={onClose}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              Close
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailModal;
