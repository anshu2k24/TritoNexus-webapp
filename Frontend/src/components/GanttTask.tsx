import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';

interface TaskProps {
  task: {
    id: number;
    name: string;
    start: Date;
    end: Date;
    progress: number;
    assignee: string;
    status: string;
  };
  onUpdate: (updatedTask: any) => void;
  onEdit: () => void;
  onDelete: () => void;
}

const GanttTask: React.FC<TaskProps> = ({ task, onUpdate, onEdit, onDelete }) => {
  const [progress, setProgress] = useState(task.progress);
  const [isEditingProgress, setIsEditingProgress] = useState(false);
  const { toast } = useToast();

  // Format dates for display
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(date);
  };

  const handleProgressUpdate = () => {
    const updatedTask = { ...task, progress };
    onUpdate(updatedTask);
    setIsEditingProgress(false);
    toast({
      title: "Progress Updated",
      description: `Task "${task.name}" progress has been updated to ${progress}%`,
      className: "bg-green-500/10 border-green-500/20 text-green-500",
    });
  };

  // Calculate status color
  const getStatusColor = () => {
    switch(task.status.toLowerCase()) {
      case 'completed':
        return 'bg-gradient-to-r from-green-500 to-green-600';
      case 'in progress':
        return 'bg-gradient-to-r from-tritonexus-purple to-tritonexus-pink';
      case 'not started':
        return 'bg-gradient-to-r from-gray-400 to-gray-500';
      default:
        return 'bg-gradient-to-r from-tritonexus-purple to-tritonexus-pink';
    }
  };

  return (
    <Card className="border border-border shadow hover:shadow-md transition-all hover:border-tritonexus-purple/30 bg-background/80 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{task.name}</CardTitle>
          <span className={`px-2 py-0.5 text-xs rounded-full text-white ${getStatusColor()}`}>
            {task.status}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">Assigned to: {task.assignee}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex flex-col space-y-1">
          <div className="flex justify-between text-sm">
            <span>Progress:</span>
            <span>{progress}%</span>
          </div>
          {isEditingProgress ? (
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min={0}
                max={100}
                value={progress}
                onChange={(e) => setProgress(parseInt(e.target.value))}
                className="flex-1"
              />
              <Button size="sm" onClick={handleProgressUpdate}>Save</Button>
            </div>
          ) : (
            <div className="relative">
              <Progress 
                value={progress} 
                className="h-3 bg-muted cursor-pointer" 
                onClick={() => setIsEditingProgress(true)}
              />
              <div 
                className="absolute inset-0 flex items-center justify-center text-[10px] font-medium text-white"
                style={{pointerEvents: 'none'}}
              >
                {progress > 10 ? `${progress}%` : ''}
              </div>
            </div>
          )}
        </div>
        
        <div>
          <p className="text-xs text-muted-foreground">
            {formatDate(task.start)} - {formatDate(task.end)}
          </p>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between pt-0 gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1 hover:bg-muted/50"
          onClick={onEdit}
        >
          Edit
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1 hover:bg-destructive/10 hover:text-destructive"
          onClick={onDelete}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GanttTask;
