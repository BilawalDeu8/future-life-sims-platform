
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Calendar, Clock, Video, DollarSign, CheckCircle } from "lucide-react";

interface VideoCallSchedulerProps {
  mentor: {
    id: string;
    name: string;
    title: string;
    avatar: string;
    callPrice: number;
  };
  onBack: () => void;
}

const VideoCallScheduler: React.FC<VideoCallSchedulerProps> = ({ mentor, onBack }) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [callDuration, setCallDuration] = useState<30 | 60>(30);
  const [isBooked, setIsBooked] = useState(false);

  const availableDates = [
    { date: '2024-01-15', day: 'Mon', dayNum: '15' },
    { date: '2024-01-16', day: 'Tue', dayNum: '16' },
    { date: '2024-01-17', day: 'Wed', dayNum: '17' },
    { date: '2024-01-18', day: 'Thu', dayNum: '18' },
    { date: '2024-01-19', day: 'Fri', dayNum: '19' },
  ];

  const availableTimes = [
    '9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];

  const totalPrice = callDuration === 30 ? mentor.callPrice : mentor.callPrice * 1.8;

  const handleBookCall = () => {
    if (selectedDate && selectedTime) {
      setIsBooked(true);
    }
  };

  if (isBooked) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={onBack} className="text-white hover:bg-white/10">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Profile
        </Button>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center p-8">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-white mb-4">Call Booked!</h2>
          <p className="text-gray-300 mb-6">
            Your {callDuration}-minute video call with {mentor.name} is scheduled for {selectedDate} at {selectedTime}.
          </p>
          
          <div className="bg-white/10 rounded-lg p-4 mb-6">
            <h3 className="text-white font-medium mb-2">What's Next?</h3>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Calendar invite sent to your email</li>
              <li>• Video call link will be provided 24 hours before</li>
              <li>• Prepare questions you'd like to discuss</li>
              <li>• You can reschedule up to 24 hours before</li>
            </ul>
          </div>

          <div className="space-y-3">
            <Button 
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 w-full"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Add to Calendar
            </Button>
            <Button variant="outline" onClick={onBack} className="text-gray-300 border-gray-400 hover:bg-white/10 w-full">
              Back to Profile
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="text-white hover:bg-white/10">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Profile
        </Button>
        <h1 className="text-2xl font-bold text-white">Schedule Video Call</h1>
        <div></div>
      </div>

      {/* Mentor Info */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src={`https://images.unsplash.com/${mentor.avatar}?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80`} />
              <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-white font-medium">{mentor.name}</p>
              <p className="text-gray-400 text-sm">{mentor.title}</p>
            </div>
            <div className="flex items-center text-green-400 font-medium">
              <DollarSign className="h-4 w-4" />
              {mentor.callPrice}/30min
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call Duration */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Call Duration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setCallDuration(30)}
              className={`p-4 rounded-lg border transition-colors ${
                callDuration === 30
                  ? 'bg-blue-600 border-blue-500 text-white'
                  : 'bg-white/10 border-white/20 text-gray-300 hover:bg-white/20'
              }`}
            >
              <div className="text-lg font-medium">30 minutes</div>
              <div className="text-sm">${mentor.callPrice}</div>
            </button>
            <button
              onClick={() => setCallDuration(60)}
              className={`p-4 rounded-lg border transition-colors ${
                callDuration === 60
                  ? 'bg-blue-600 border-blue-500 text-white'
                  : 'bg-white/10 border-white/20 text-gray-300 hover:bg-white/20'
              }`}
            >
              <div className="text-lg font-medium">60 minutes</div>
              <div className="text-sm">${Math.round(mentor.callPrice * 1.8)}</div>
              <Badge className="bg-green-600 text-xs mt-1">Popular</Badge>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Date Selection */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Select Date
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-3">
            {availableDates.map((dateOption) => (
              <button
                key={dateOption.date}
                onClick={() => setSelectedDate(dateOption.date)}
                className={`p-3 rounded-lg border text-center transition-colors ${
                  selectedDate === dateOption.date
                    ? 'bg-blue-600 border-blue-500 text-white'
                    : 'bg-white/10 border-white/20 text-gray-300 hover:bg-white/20'
                }`}
              >
                <div className="text-xs">{dateOption.day}</div>
                <div className="text-lg font-medium">{dateOption.dayNum}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Time Selection */}
      {selectedDate && (
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Select Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              {availableTimes.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-3 rounded-lg border text-center transition-colors ${
                    selectedTime === time
                      ? 'bg-blue-600 border-blue-500 text-white'
                      : 'bg-white/10 border-white/20 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Booking Summary */}
      {selectedDate && selectedTime && (
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Booking Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-gray-300">
              <span>Date & Time:</span>
              <span className="text-white">{selectedDate} at {selectedTime}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Duration:</span>
              <span className="text-white">{callDuration} minutes</span>
            </div>
            <div className="flex justify-between text-gray-300 text-lg font-medium border-t border-white/20 pt-4">
              <span>Total:</span>
              <span className="text-green-400">${totalPrice}</span>
            </div>
            
            <Button 
              onClick={handleBookCall}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 h-12"
            >
              <Video className="h-5 w-5 mr-2" />
              Book Video Call
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VideoCallScheduler;
