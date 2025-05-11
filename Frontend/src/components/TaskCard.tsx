import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, CheckCircle2, AlertCircle, MessageSquare } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TaskProps {
  task: {
    id: number;
    name: string;
    status: string;
    progress: number;
    deadline: string;
    assignee: string;
    description?: string;
  };
  onStatusChange?: (taskId: number, newStatus: string) => void;
  isCompleted?: boolean;
}

const StatusTag = ({ status }: { status: string }) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return (
        <div className="flex items-center text-green-500 bg-green-500/10 px-2 py-1 rounded-full text-xs">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          <span>Completed</span>
        </div>
      );
    case 'in progress':
    case 'in-progress':
      return (
        <div className="flex items-center text-tritonexus-purple bg-tritonexus-purple/10 px-2 py-1 rounded-full text-xs">
          <Clock className="h-3 w-3 mr-1" />
          <span>In Progress</span>
        </div>
      );
    default:
      return (
        <div className="flex items-center text-amber-500 bg-amber-500/10 px-2 py-1 rounded-full text-xs">
          <AlertCircle className="h-3 w-3 mr-1" />
          <span>Pending</span>
        </div>
      );
  }
};

const TaskCard: React.FC<TaskProps> = ({ task, onStatusChange, isCompleted }) => {
  const [expanded, setExpanded] = useState(false);

  const handleStatusChange = (newStatus: string) => {
    if (onStatusChange && !isCompleted) {
      onStatusChange(task.id, newStatus);
    }
  };

  return (
    <Card className="border border-border shadow hover:shadow-md transition-all hover:border-tritonexus-purple/30 bg-background/80 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-medium">{task.name}</CardTitle>
          {isCompleted ? (
            <StatusTag status={task.status} />
          ) : (
            <Select
              value={task.status}
              onValueChange={handleStatusChange}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue>
                  <StatusTag status={task.status} />
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="completed">
                  <div className="flex items-center text-green-500">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    <span>Completed</span>
                  </div>
                </SelectItem>
                <SelectItem value="in progress">
                  <div className="flex items-center text-tritonexus-purple">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>In Progress</span>
                  </div>
                </SelectItem>
                <SelectItem value="pending">
                  <div className="flex items-center text-amber-500">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    <span>Pending</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
        <p className="text-sm text-muted-foreground">Assignee: {task.assignee}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex flex-col space-y-1">
          <div className="flex justify-between text-sm">
            <span>Progress:</span>
            <span>{task.progress}%</span>
          </div>
          <div className="relative">
            <Progress 
              value={task.progress} 
              className="h-3 bg-muted" 
            />
            <div 
              className="absolute inset-0 flex items-center justify-center text-[10px] font-medium text-white"
              style={{pointerEvents: 'none'}}
            >
              {task.progress > 10 ? `${task.progress}%` : ''}
            </div>
          </div>
        </div>
        
        <div>
          <p className="text-xs text-muted-foreground">
            Deadline: {new Date(task.deadline).toLocaleDateString()}
          </p>
        </div>

        {expanded && task.description && (
          <div className="text-sm border-t border-border pt-2 mt-2 animate-fade-in">
            <p>{task.description}</p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-0">
        <button 
          className="text-sm text-tritonexus-purple hover:text-tritonexus-pink transition-colors flex items-center w-full justify-center"
          onClick={() => setExpanded(!expanded)}
        >
          <MessageSquare className="h-4 w-4 mr-1" />
          {expanded ? "Hide Details" : "View Details"}
        </button>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;