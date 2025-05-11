
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';

interface Note {
  id: number;
  content: string;
  timestamp: Date;
}

const NotesSection: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([
    { id: 1, content: "Complete the dashboard UI design by Friday", timestamp: new Date() },
    { id: 2, content: "Schedule meeting with the development team", timestamp: new Date() }
  ]);
  
  const [newNote, setNewNote] = useState("");

  const addNote = () => {
    if (newNote.trim()) {
      const note: Note = {
        id: Date.now(),
        content: newNote,
        timestamp: new Date()
      };
      
      setNotes([note, ...notes]);
      setNewNote("");
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
          <span className="bg-tritonexus-purple/20 text-tritonexus-purple w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">
            <span className="text-xs">N</span>
          </span>
          Personal Notes
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="flex-1 border border-input rounded-md p-2 text-sm bg-background/50 min-h-[80px] resize-none"
            placeholder="Add a new note..."
          />
          <Button 
            onClick={addNote}
            className="bg-tritonexus-purple hover:bg-tritonexus-purple-dark self-end"
            size="sm"
          >
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </div>
        
        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
          {notes.map(note => (
            <div key={note.id} className="bg-muted/50 border border-border rounded-md p-3">
              <p className="text-sm">{note.content}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {formatDate(note.timestamp)}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NotesSection;
