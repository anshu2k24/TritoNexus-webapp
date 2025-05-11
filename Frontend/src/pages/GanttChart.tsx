
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChartContainer, ChartTooltipContent, ChartTooltip } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import GanttTask from '../components/GanttTask';
import AddTaskDialog from '../components/AddTaskDialog';
import DashboardLayout from '../components/DashboardLayout';

// Mock data for the Gantt chart
const initialTasks = [
  {
    id: 1,
    name: 'Research Phase',
    start: new Date('2025-05-12'),
    end: new Date('2025-05-20'),
    progress: 85,
    assignee: 'John Doe',
    status: 'In Progress',
  },
  {
    id: 2,
    name: 'Design Mockups',
    start: new Date('2025-05-15'),
    end: new Date('2025-05-25'),
    progress: 60,
    assignee: 'Alice Smith',
    status: 'In Progress',
  },
  {
    id: 3,
    name: 'Frontend Development',
    start: new Date('2025-05-22'),
    end: new Date('2025-06-10'),
    progress: 30,
    assignee: 'Bob Johnson',
    status: 'In Progress',
  },
  {
    id: 4,
    name: 'Backend Setup',
    start: new Date('2025-05-18'),
    end: new Date('2025-06-05'),
    progress: 45,
    assignee: 'Emma Wilson',
    status: 'In Progress',
  },
  {
    id: 5,
    name: 'Testing & QA',
    start: new Date('2025-06-08'),
    end: new Date('2025-06-20'),
    progress: 0,
    assignee: 'Michael Brown',
    status: 'Not Started',
  },
];

const GanttChart = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  // Calculate overall project progress
  const overallProgress = Math.round(
    tasks.reduce((total, task) => total + task.progress, 0) / tasks.length
  );

  // Get the earliest start date and latest end date
  const startDate = new Date(Math.min(...tasks.map(task => task.start.getTime())));
  const endDate = new Date(Math.max(...tasks.map(task => task.end.getTime())));
  
  // For rendering the chart - calculate days between start and end
  const projectDuration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // Format dates for display
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
  };

  const handleTaskUpdate = (updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
    toast({
      title: "Task Updated",
      description: `${updatedTask.name} has been updated successfully.`,
    });
  };

  const handleAddNewTask = (newTask) => {
    // Generate a new ID based on the highest existing ID
    const newId = Math.max(...tasks.map(task => task.id)) + 1;
    const taskWithId = { ...newTask, id: newId };
    setTasks([...tasks, taskWithId]);
    toast({
      title: "Task Added",
      description: `${newTask.name} has been added successfully.`,
    });
    setIsAddTaskOpen(false);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsAddTaskOpen(true);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    toast({
      title: "Task Deleted",
      description: "The task has been removed successfully.",
      variant: "destructive"
    });
  };

  // Sort tasks by start date
  const sortedTasks = [...tasks].sort((a, b) => a.start.getTime() - b.start.getTime());

  return (
    <DashboardLayout title="Project Timeline">
      <div className="mb-6">
        <Button 
          onClick={() => setIsAddTaskOpen(true)}
          className="bg-gradient-to-r from-tritonexus-purple to-tritonexus-pink text-white"
        >
          Add Task
        </Button>
      </div>

      <Card className="border border-border shadow-lg bg-background/70 backdrop-blur-sm mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="flex justify-between items-center">
            <span>Overall Project Progress</span>
            <span className="text-2xl font-bold">{overallProgress}%</span>
          </CardTitle>
          <CardDescription>
            Project timeline from {formatDate(startDate)} to {formatDate(endDate)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative pt-1">
            <Progress 
              value={overallProgress} 
              className="h-4 bg-muted"
            />
            <div 
              className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white"
              style={{pointerEvents: 'none'}}
            >
              {overallProgress}% Complete
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-6 overflow-x-auto">
        <Card className="border border-border shadow-lg bg-background/70 backdrop-blur-sm min-w-full">
          <CardHeader>
            <CardTitle>Gantt Timeline</CardTitle>
            <CardDescription>
              Visualize project tasks and their timelines
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] min-w-[600px]">
              <ChartContainer
                config={{
                  inProgress: {
                    theme: { light: "#9b87f5", dark: "#9b87f5" },
                    label: "In Progress",
                  },
                  completed: {
                    theme: { light: "#D946EF", dark: "#D946EF" },
                    label: "Completed",
                  },
                  notStarted: {
                    theme: { light: "#7E69AB", dark: "#7E69AB" },
                    label: "Not Started",
                  },
                }}
              >
                <BarChart
                  layout="vertical"
                  data={sortedTasks.map(task => ({
                    name: task.name,
                    start: task.start.getTime(),
                    end: task.end.getTime(),
                    progress: task.progress,
                    status: task.status,
                    assignee: task.assignee,
                    id: task.id,
                  }))}
                  margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis 
                    type="number" 
                    domain={[startDate.getTime(), endDate.getTime()]}
                    tickFormatter={(timestamp) => formatDate(new Date(timestamp))}
                    allowDataOverflow
                  />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    width={80} 
                    tickLine={false}
                  />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-background border border-border p-3 rounded-md shadow-lg">
                            <p className="font-bold">{data.name}</p>
                            <p>Assignee: {data.assignee}</p>
                            <p>Status: {data.status}</p>
                            <p>Progress: {data.progress}%</p>
                            <p>Duration: {formatDate(new Date(data.start))} - {formatDate(new Date(data.end))}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="progress" 
                    fill="url(#progressGradient)" 
                    background={{ fill: '#eee' }}
                    minPointSize={2}
                    barSize={20}
                    label={{ position: 'center', fill: 'white', fontSize: 12 }}
                  >
                    <defs>
                      <linearGradient id="progressGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#9b87f5" />
                        <stop offset="100%" stopColor="#D946EF" />
                      </linearGradient>
                    </defs>
                  </Bar>
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Task Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedTasks.map(task => (
            <GanttTask 
              key={task.id} 
              task={task} 
              onUpdate={handleTaskUpdate} 
              onEdit={() => handleEditTask(task)} 
              onDelete={() => handleDeleteTask(task.id)}
            />
          ))}
        </div>
      </div>

      <AddTaskDialog 
        isOpen={isAddTaskOpen} 
        onClose={() => {
          setIsAddTaskOpen(false);
          setEditingTask(null);
        }}
        onAddTask={handleAddNewTask}
        onUpdateTask={handleTaskUpdate}
        existingTask={editingTask}
      />
    </DashboardLayout>
  );
};

export default GanttChart;
