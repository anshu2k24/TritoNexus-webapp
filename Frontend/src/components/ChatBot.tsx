
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: "Hello! I'm your project assistant. How can I help you with your tasks today?", 
      sender: 'bot', 
      timestamp: new Date() 
    }
  ]);
  
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim()) {
      // Create user message
      const userMessage: Message = {
        id: Date.now(),
        text: input,
        sender: 'user',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);
      setInput('');
      
      // Simulate bot response
      setTimeout(() => {
        const botResponses = [
          "I can help you prioritize that task. Would you like me to suggest some similar tasks you've completed?",
          "Based on your project timeline, I recommend focusing on this task next week.",
          "I found some resources that might help with your task. Would you like to see them?",
          "Your team members are making good progress on related tasks. Would you like me to summarize their work?"
        ];
        
        const botMessage: Message = {
          id: Date.now() + 1,
          text: botResponses[Math.floor(Math.random() * botResponses.length)],
          sender: 'bot',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botMessage]);
      }, 1000);
    }
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <span className="bg-tritonexus-pink/20 text-tritonexus-pink w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">
            <span className="text-xs">B</span>
          </span>
          Project Assistant
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4 flex flex-col h-[400px]">
        <div className="flex-1 overflow-y-auto pr-1 space-y-3">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg px-3 py-2 ${
                  message.sender === 'user' 
                    ? 'bg-gradient-to-r from-tritonexus-purple to-tritonexus-pink text-white'
                    : 'bg-muted border border-border'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className={`text-[10px] ${message.sender === 'user' ? 'text-white/70' : 'text-muted-foreground'} text-right`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button 
            onClick={sendMessage} 
            className="bg-gradient-to-r from-tritonexus-purple to-tritonexus-pink text-white"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatBot;
