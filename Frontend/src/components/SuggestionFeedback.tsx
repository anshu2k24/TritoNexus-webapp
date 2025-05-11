
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ArrowUp, ArrowDown, Check } from 'lucide-react';

interface Suggestion {
  id: number;
  user: {
    name: string;
    avatar: string;
    initials: string;
  };
  content: string;
  upvotes: number;
  downvotes: number;
  timestamp: Date;
  replies: {
    user: string;
    content: string;
    timestamp: Date;
  }[];
  resolved: boolean;
}

const SuggestionFeedback = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([
    {
      id: 1,
      user: { 
        name: "Alex Thompson", 
        avatar: "", 
        initials: "AT" 
      },
      content: "Can we add a feature to filter tasks by priority level? It would help me manage my workload better.",
      upvotes: 8,
      downvotes: 1,
      timestamp: new Date(2025, 4, 8),
      replies: [
        {
          user: "Admin",
          content: "Great suggestion! We're planning to implement this in the next sprint.",
          timestamp: new Date(2025, 4, 9),
        }
      ],
      resolved: false
    },
    {
      id: 2,
      user: { 
        name: "Morgan Lee", 
        avatar: "", 
        initials: "ML" 
      },
      content: "The deadline notifications are coming too late. Could we get them at least 48 hours before the due date?",
      upvotes: 12,
      downvotes: 0,
      timestamp: new Date(2025, 4, 7),
      replies: [],
      resolved: false
    },
    {
      id: 3,
      user: { 
        name: "Jordan Rivera", 
        avatar: "", 
        initials: "JR" 
      },
      content: "The Gantt chart is sometimes slow to load when there are many tasks. Can we optimize it?",
      upvotes: 6,
      downvotes: 2,
      timestamp: new Date(2025, 4, 5),
      replies: [
        {
          user: "Admin",
          content: "We're aware of this issue and are working on performance optimizations. Should be fixed by next week.",
          timestamp: new Date(2025, 4, 6),
        }
      ],
      resolved: true
    }
  ]);

  const [newReplies, setNewReplies] = useState<{[key: number]: string}>({});

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleReplyChange = (id: number, content: string) => {
    setNewReplies({
      ...newReplies,
      [id]: content
    });
  };

  const handleSubmitReply = (id: number) => {
    if (!newReplies[id]?.trim()) return;

    setSuggestions(suggestions.map(suggestion => 
      suggestion.id === id 
        ? {
            ...suggestion,
            replies: [
              ...suggestion.replies,
              {
                user: "Admin",
                content: newReplies[id],
                timestamp: new Date()
              }
            ]
          }
        : suggestion
    ));

    // Clear the reply field
    setNewReplies({
      ...newReplies,
      [id]: ""
    });
  };

  const handleVote = (id: number, isUpvote: boolean) => {
    setSuggestions(suggestions.map(suggestion => 
      suggestion.id === id 
        ? {
            ...suggestion,
            upvotes: isUpvote ? suggestion.upvotes + 1 : suggestion.upvotes,
            downvotes: !isUpvote ? suggestion.downvotes + 1 : suggestion.downvotes
          }
        : suggestion
    ));
  };

  const handleToggleResolved = (id: number) => {
    setSuggestions(suggestions.map(suggestion => 
      suggestion.id === id 
        ? {
            ...suggestion,
            resolved: !suggestion.resolved
          }
        : suggestion
    ));
  };

  return (
    <Card className="border border-border/50 bg-background/70 backdrop-blur-lg">
      <CardHeader className="pb-2 border-b border-border/30">
        <CardTitle className="text-xl">Suggestions & Feedback</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border/30">
          {suggestions.map((suggestion) => (
            <div 
              key={suggestion.id} 
              className={`p-4 ${suggestion.resolved ? 'bg-muted/30' : ''}`}
            >
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10 border border-border/50">
                  <AvatarImage src={suggestion.user.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-tritonexus-purple-dark to-tritonexus-purple text-white">
                    {suggestion.user.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium text-sm">{suggestion.user.name}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(suggestion.timestamp)}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-6 px-1 text-xs"
                          onClick={() => handleVote(suggestion.id, true)}
                        >
                          <ArrowUp className="h-3 w-3 mr-1" />
                          {suggestion.upvotes}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-6 px-1 text-xs"
                          onClick={() => handleVote(suggestion.id, false)}
                        >
                          <ArrowDown className="h-3 w-3 mr-1" />
                          {suggestion.downvotes}
                        </Button>
                      </div>
                      <div className="flex items-center space-x-1 text-xs">
                        <span>Resolved</span>
                        <Switch 
                          checked={suggestion.resolved}
                          onCheckedChange={() => handleToggleResolved(suggestion.id)}
                        />
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-sm">{suggestion.content}</p>
                  
                  {/* Replies */}
                  {suggestion.replies.length > 0 && (
                    <div className="mt-3 ml-4 border-l-2 border-border pl-3 space-y-3">
                      {suggestion.replies.map((reply, idx) => (
                        <div key={idx} className="text-sm">
                          <div className="flex justify-between">
                            <p className="font-medium">{reply.user}</p>
                            <p className="text-xs text-muted-foreground">{formatDate(reply.timestamp)}</p>
                          </div>
                          <p className="mt-1">{reply.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Admin Reply Form */}
                  <div className="mt-3 flex flex-col space-y-2">
                    <Textarea 
                      placeholder="Add your reply..." 
                      className="text-sm min-h-[60px] resize-none"
                      value={newReplies[suggestion.id] || ""}
                      onChange={(e) => handleReplyChange(suggestion.id, e.target.value)}
                    />
                    <Button 
                      size="sm" 
                      className="self-end bg-gradient-to-r from-tritonexus-purple to-tritonexus-pink text-white"
                      onClick={() => handleSubmitReply(suggestion.id)}
                    >
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SuggestionFeedback;
