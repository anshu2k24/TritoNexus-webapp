
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calendar } from 'lucide-react';

interface AddTaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: any) => void;
  onUpdateTask: (task: any) => void;
  existingTask: any | null;
}

const AddTaskDialog: React.FC<AddTaskDialogProps> = ({ 
  isOpen, 
  onClose, 
  onAddTask, 
  onUpdateTask,
  existingTask 
}) => {
  const [taskData, setTaskData] = useState({
    name: '',
    start: new Date(),
    end: new Date(new Date().setDate(new Date().getDate() + 7)), // Default to 7 days from now
    progress: 0,
    assignee: '',
    status: 'Not Started',
  });

  // Update form when editing an existing task
  useEffect(() => {
    if (existingTask) {
      setTaskData({
        name: existingTask.name,
        start: existingTask.start,
        end: existingTask.end,
        progress: existingTask.progress,
        assignee: existingTask.assignee,
        status: existingTask.status,
      });
    } else {
      // Reset form when adding new task
      setTaskData({
        name: '',
        start: new Date(),
        end: new Date(new Date().setDate(new Date().getDate() + 7)),
        progress: 0,
        assignee: '',
        status: 'Not Started',
      });
    }
  }, [existingTask, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (existingTask) {
      onUpdateTask({ ...existingTask, ...taskData });
    } else {
      onAddTask(taskData);
    }
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: new Date(value) });
  };

  // Format date for input type="date"
  const formatDateForInput = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-background/95 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="text-gradient">
            {existingTask ? 'Edit Task' : 'Add New Task'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="name">Task Name</Label>
            <input
              required
              id="name"
              name="name"
              value={taskData.name}
              onChange={handleInputChange}
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-tritonexus-purple/30"
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="start">Start Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  required
                  id="start"
                  name="start"
                  type="date"
                  value={formatDateForInput(taskData.start)}
                  onChange={handleDateChange}
                  className="flex h-9 w-full rounded-md border border-input bg-background pl-10 pr-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-tritonexus-purple/30"
                />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="end">End Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  required
                  id="end"
                  name="end"
                  type="date"
                  value={formatDateForInput(taskData.end)}
                  onChange={handleDateChange}
                  className="flex h-9 w-full rounded-md border border-input bg-background pl-10 pr-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-tritonexus-purple/30"
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="assignee">Assignee</Label>
              <input
                required
                id="assignee"
                name="assignee"
                value={taskData.assignee}
                onChange={handleInputChange}
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-tritonexus-purple/30"
              />
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                name="status"
                value={taskData.status}
                onChange={handleInputChange}
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-tritonexus-purple/30"
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-1.5">
            <Label htmlFor="progress">Progress ({taskData.progress}%)</Label>
            <input
              id="progress"
              name="progress"
              type="range"
              min="0"
              max="100"
              value={taskData.progress}
              onChange={(e) => setTaskData({ ...taskData, progress: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-gradient-to-r from-tritonexus-purple to-tritonexus-pink text-white"
            >
              {existingTask ? 'Update Task' : 'Add Task'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskDialog;
