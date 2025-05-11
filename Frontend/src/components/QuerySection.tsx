
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HelpCircle, MessageSquare } from 'lucide-react';

interface Query {
  id: number;
  question: string;
  responses: {
    id: number;
    text: string;
    author: string;
    timestamp: Date;
  }[];
  timestamp: Date;
  isExpanded?: boolean;
}

const QuerySection: React.FC = () => {
  const [queries, setQueries] = useState<Query[]>([
    {
      id: 1,
      question: "How do we handle the API integration for the new dashboard features?",
      responses: [
        {
          id: 1,
          text: "We should use React Query for fetching and caching. I've already set up the initial endpoints.",
          author: "Emma Wilson",
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000)
        }
      ],
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      isExpanded: false
    },
    {
      id: 2,
      question: "What's our timeline for completing the user authentication system?",
      responses: [],
      timestamp: new Date(),
      isExpanded: false
    }
  ]);
  
  const [newQuery, setNewQuery] = useState('');
  const [newResponses, setNewResponses] = useState<{[key: number]: string}>({});

  const addQuery = () => {
    if (newQuery.trim()) {
      const query: Query = {
        id: Date.now(),
        question: newQuery,
        responses: [],
        timestamp: new Date(),
        isExpanded: false
      };
      
      setQueries([query, ...queries]);
      setNewQuery("");
    }
  };

  const toggleExpand = (queryId: number) => {
    setQueries(queries.map(q => 
      q.id === queryId ? { ...q, isExpanded: !q.isExpanded } : q
    ));
  };

  const addResponse = (queryId: number) => {
    if (newResponses[queryId]?.trim()) {
      const response = {
        id: Date.now(),
        text: newResponses[queryId],
        author: "You",
        timestamp: new Date()
      };
      
      setQueries(queries.map(q => 
        q.id === queryId 
          ? { ...q, responses: [...q.responses, response] } 
          : q
      ));
      
      setNewResponses({...newResponses, [queryId]: ""});
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString() + ' ' + 
      date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <span className="bg-tritonexus-purple-dark/20 text-tritonexus-purple-dark w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">
            <span className="text-xs">Q</span>
          </span>
          Team Queries
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Input
            value={newQuery}
            onChange={(e) => setNewQuery(e.target.value)}
            placeholder="Ask a question..."
            className="flex-1"
          />
          <Button 
            onClick={addQuery}
            className="bg-tritonexus-purple hover:bg-tritonexus-purple-dark"
            size="sm"
          >
            <HelpCircle className="h-4 w-4 mr-1" />
            Ask
          </Button>
        </div>
        
        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
          {queries.map(query => (
            <div key={query.id} className="bg-muted/50 border border-border rounded-md p-3">
              <div className="flex justify-between items-start">
                <p className="text-sm font-medium">{query.question}</p>
                <span className="text-xs text-muted-foreground">
                  {query.responses.length} {query.responses.length === 1 ? 'response' : 'responses'}
                </span>
              </div>
              
              <p className="text-xs text-muted-foreground mt-1">
                Asked: {formatDate(query.timestamp)}
              </p>
              
              <div className="mt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs w-full"
                  onClick={() => toggleExpand(query.id)}
                >
                  {query.isExpanded ? "Hide Responses" : "View Responses"}
                </Button>
              </div>
              
              {query.isExpanded && (
                <div className="mt-3 space-y-3 animate-fade-in">
                  {query.responses.map(response => (
                    <div key={response.id} className="bg-background p-2 rounded border border-border">
                      <p className="text-xs">{response.text}</p>
                      <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                        <span>{response.author}</span>
                        <span>{formatDate(response.timestamp)}</span>
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex space-x-2">
                    <Input
                      value={newResponses[query.id] || ""}
                      onChange={(e) => setNewResponses({
                        ...newResponses,
                        [query.id]: e.target.value
                      })}
                      placeholder="Add a response..."
                      className="flex-1 text-xs h-8"
                      size={1}
                    />
                    <Button 
                      onClick={() => addResponse(query.id)}
                      size="sm"
                      className="h-8 w-8 p-0 bg-tritonexus-purple hover:bg-tritonexus-purple-dark"
                    >
                      <MessageSquare className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuerySection;
