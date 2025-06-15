
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Send, Tag, Clock } from "lucide-react";

interface QuestionSubmissionProps {
  mentor: {
    id: string;
    name: string;
    title: string;
    avatar: string;
    responseTime: string;
  };
  onBack: () => void;
}

const QuestionSubmission: React.FC<QuestionSubmissionProps> = ({ mentor, onBack }) => {
  const [question, setQuestion] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const questionTags = [
    'Career Transition', 'Salary Negotiation', 'Work-Life Balance', 'Skill Development',
    'Industry Insights', 'Networking', 'Leadership', 'Entrepreneurship', 'Remote Work',
    'Company Culture', 'Interview Prep', 'Personal Branding'
  ];

  const sampleQuestions = [
    "How did you transition from finance to tech?",
    "What's the best way to negotiate a remote work arrangement?",
    "How do you maintain work-life balance in a demanding role?",
    "What skills should I focus on developing next?",
    "How do you handle imposter syndrome in senior roles?"
  ];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSubmit = () => {
    if (question.trim()) {
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={onBack} className="text-white hover:bg-white/10">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Profile
        </Button>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center p-8">
          <div className="text-6xl mb-4">✉️</div>
          <h2 className="text-2xl font-bold text-white mb-4">Question Sent!</h2>
          <p className="text-gray-300 mb-6">
            Your question has been sent to {mentor.name}. They typically respond within {mentor.responseTime}.
          </p>
          <div className="space-y-3">
            <Button 
              onClick={() => setIsSubmitted(false)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Ask Another Question
            </Button>
            <div>
              <Button variant="outline" onClick={onBack} className="text-gray-300 border-gray-400 hover:bg-white/10">
                Back to Profile
              </Button>
            </div>
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
        <h1 className="text-2xl font-bold text-white">Ask {mentor.name}</h1>
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
            <div className="flex items-center text-green-400 text-sm">
              <Clock className="h-4 w-4 mr-1" />
              {mentor.responseTime}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Question Categories */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Tag className="h-5 w-5 mr-2" />
            Question Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {questionTags.map((tag) => (
              <Badge
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`cursor-pointer transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Question Input */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Your Question</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask your question here... Be specific about your situation and what kind of advice you're looking for."
            className="w-full h-32 bg-white/10 border border-white/20 rounded-md p-3 text-white placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">{question.length}/500 characters</span>
            <Button 
              onClick={handleSubmit}
              disabled={!question.trim() || question.length > 500}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
            >
              <Send className="h-4 w-4 mr-2" />
              Send Question
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sample Questions */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Need Inspiration? Popular Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sampleQuestions.map((sample, index) => (
              <button
                key={index}
                onClick={() => setQuestion(sample)}
                className="w-full text-left p-3 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-colors"
              >
                "{sample}"
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionSubmission;
