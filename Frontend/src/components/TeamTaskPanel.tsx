import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { UserPlus, Pen, Trash  } from 'lucide-react';
import AssignTaskDialog from './AssignTaskDialog';
import EditTaskDialog from './EditTaskDialog';
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
  initials: string;
  tasksAssigned: number;
  tasksCompleted: number;
  progress: number;
}

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  priority: string;
  status: 'pending' | 'in-progress' | 'completed';
}

const TeamTaskPanel = () => {
  const { toast } = useToast();
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
  const [selectedTasksToRemove, setSelectedTasksToRemove] = useState<number[]>([]);
  const [memberTasks, setMemberTasks] = useState<Record<number, Task[]>>({});
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: 1,
      name: "Anshuman pati",
      role: "Hardware Lead",
      avatar: "",
      initials: "AJ",
      tasksAssigned: 12,
      tasksCompleted: 8,
      progress: 67
    },
    {
      id: 2,
      name: "Aman Kumar Singh",
      role: "Software Member",
      avatar: "",
      initials: "BS",
      tasksAssigned: 15,
      tasksCompleted: 7,
      progress: 46
    },
    {
      id: 3,
      name: "Darshil Nathwani",
      role: "Software Lead",
      avatar: "",
      initials: "FC",
      tasksAssigned: 9,
      tasksCompleted: 4,
      progress: 44
    },
    {
      id: 4,
      name: "Dhruva K.R",
      role: "Hardware Member",
      avatar: "",
      initials: "CR",
      tasksAssigned: 10,
      tasksCompleted: 9,
      progress: 90
    },
    {
      id: 5,
      name: "Jayanth Midde",
      role: "Designing Engineer",
      avatar: "",
      initials: "DL",
      tasksAssigned: 8,
      tasksCompleted: 5,
      progress: 63
    },
    {
      id: 6,
      name: "Musaddik",
      role: "Software Member",
      avatar: "",
      initials: "EW",
      tasksAssigned: 14,
      tasksCompleted: 10,
      progress: 71
    },
    {
      id: 7,
      name: "Navya K.M",
      role: "Hardware Member",
      avatar: "",
      initials: "FC",
      tasksAssigned: 9,
      tasksCompleted: 4,
      progress: 44
    },
    {
      id: 8,
      name: "Varsha Nazare",
      role: "Software Member",
      avatar: "",
      initials: "FC",
      tasksAssigned: 9,
      tasksCompleted: 4,
      progress: 44
    }
  ]);

  const handleOpenMemberDetails = (member: TeamMember) => {
    setSelectedMember(member);
    setIsDialogOpen(true);
  };

  const handleOpenEditTasks = (member: TeamMember, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedMember(member);
    setIsDialogOpen(true);
  };

  const handleOpenRemoveTasks = (member: TeamMember, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedMember(member);
    setSelectedTasksToRemove([]);
    setIsRemoveDialogOpen(true);
  };

  const handleTaskSelection = (taskId: number) => {
    setSelectedTasksToRemove(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleRemoveSelectedTasks = () => {
    if (!selectedMember || selectedTasksToRemove.length === 0) return;

    setMemberTasks(prev => {
      const updatedTasks = {
        ...prev,
        [selectedMember.id]: prev[selectedMember.id].filter(task => !selectedTasksToRemove.includes(task.id))
      };

      // Update team member's progress
      const tasks = updatedTasks[selectedMember.id] || [];
      const completedTasks = tasks.filter(task => task.status === 'completed').length;

      setTeamMembers(prevMembers => prevMembers.map(member => {
        if (member.id === selectedMember.id) {
          const newTasksAssigned = member.tasksAssigned - selectedTasksToRemove.length;
          return {
            ...member,
            tasksAssigned: newTasksAssigned,
            tasksCompleted: completedTasks,
            progress: Math.round((completedTasks / newTasksAssigned) * 100)
          };
        }
        return member;
      }));

      return updatedTasks;
    });

    toast({
      title: "Tasks Removed",
      description: `${selectedTasksToRemove.length} task(s) have been successfully removed.`,
      className: "bg-green-500/10 border-green-500/20 text-green-500",
    });

    setIsRemoveDialogOpen(false);
    setSelectedTasksToRemove([]);
  };

  const handleAssignTask = (memberId: number, taskData: any) => {
    const newTask: Task = {
      id: Date.now(),
      ...taskData,
      status: 'pending'
    };

    setMemberTasks(prev => ({
      ...prev,
      [memberId]: [...(prev[memberId] || []), newTask]
    }));

    setTeamMembers(prev => prev.map(member => {
      if (member.id === memberId) {
        const newTasksAssigned = member.tasksAssigned + 1;
        const progress = Math.round((member.tasksCompleted / newTasksAssigned) * 100);
        return {
          ...member,
          tasksAssigned: newTasksAssigned,
          progress
        };
      }
      return member;
    }));
  };

  const handleEditTask = (taskId: number, updatedTaskData: Partial<Task>) => {
    if (!selectedMember) return;

    setMemberTasks(prev => {
      const updatedTasks = {
        ...prev,
        [selectedMember.id]: prev[selectedMember.id].map(task => 
          task.id === taskId ? { ...task, ...updatedTaskData } : task
        )
      };

      // Update team member's progress if task status changed
      if (updatedTaskData.status) {
        const tasks = updatedTasks[selectedMember.id] || [];
        const completedTasks = tasks.filter(task => 
          task.id === taskId ? updatedTaskData.status === 'completed' : task.status === 'completed'
        ).length;

        setTeamMembers(prevMembers => prevMembers.map(member => {
          if (member.id === selectedMember.id) {
            return {
              ...member,
              tasksCompleted: completedTasks,
              progress: Math.round((completedTasks / member.tasksAssigned) * 100)
            };
          }
          return member;
        }));
      }

      return updatedTasks;
    });
  };

  const handleOpenEditTask = (task: Task, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedTask(task);
    setIsEditDialogOpen(true);
  };

  const handleRemoveTask = (taskId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedMember) return;

    setMemberTasks(prev => {
      const updatedTasks = {
        ...prev,
        [selectedMember.id]: prev[selectedMember.id].filter(task => task.id !== taskId)
      };

      // Update team member's progress
      const tasks = updatedTasks[selectedMember.id] || [];
      const completedTasks = tasks.filter(task => task.status === 'completed').length;

      setTeamMembers(prevMembers => prevMembers.map(member => {
        if (member.id === selectedMember.id) {
          const newTasksAssigned = member.tasksAssigned - 1;
          return {
            ...member,
            tasksAssigned: newTasksAssigned,
            tasksCompleted: completedTasks,
            progress: Math.round((completedTasks / newTasksAssigned) * 100)
          };
        }
        return member;
      }));

      return updatedTasks;
    });

    toast({
      title: "Task Removed",
      description: "The task has been successfully removed.",
      className: "bg-green-500/10 border-green-500/20 text-green-500",
    });
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Team Task Management</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {teamMembers.map((member) => (
          <Card 
            key={member.id}
            className="border border-border/50 bg-background/70 backdrop-blur-lg hover:shadow-lg hover:shadow-tritonexus-purple/10 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
            onClick={() => handleOpenMemberDetails(member)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12 border-2 border-tritonexus-purple-light">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-tritonexus-purple to-tritonexus-pink text-white">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-md font-medium">{member.name}</CardTitle>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm mb-2">
                <span className="font-medium">{member.tasksCompleted}</span>
                <span className="text-muted-foreground"> / {member.tasksAssigned} tasks completed</span>
              </div>
              <div className="relative pt-1 mb-4">
                <Progress 
                  value={member.progress} 
                  className="h-2 bg-muted"
                />
              </div>
              <div className="flex space-x-1">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedMember(member);
                    setIsAssignDialogOpen(true);
                  }}
                >
                  <UserPlus className="h-3 w-3 mr-1" />
                  Assign
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 text-xs"
                  onClick={(e) => handleOpenEditTasks(member, e)}
                >
                  <Pen className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 text-xs text-destructive hover:text-destructive"
                  onClick={(e) => handleOpenRemoveTasks(member, e)}
                >
                  <Trash className="h-3 w-3 mr-1" />
                  Remove
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Member Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] bg-background/90 backdrop-blur-xl border-tritonexus-purple/20">
          {selectedMember && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={selectedMember.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-tritonexus-purple to-tritonexus-pink text-white">
                      {selectedMember.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <span className="text-xl">{selectedMember.name}</span>
                    <p className="text-sm text-muted-foreground mt-0.5">{selectedMember.role}</p>
                  </div>
                </DialogTitle>
                <DialogDescription>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Task Progress</span>
                    <span className="font-medium">{selectedMember.progress}%</span>
                  </div>
                  <Progress 
                    value={selectedMember.progress} 
                    className="h-2 mb-6"
                  />
                  
                  <h3 className="font-medium mb-2">Assigned Tasks</h3>
                  <div className="space-y-3 max-h-[300px] overflow-y-auto">
                    {memberTasks[selectedMember.id]?.map((task) => (
                      <div 
                        key={task.id} 
                        className="p-3 rounded-md bg-muted/50 border border-border/50 flex justify-between"
                      >
                        <div>
                          <p className="font-medium text-sm">{task.title}</p>
                          <p className="text-xs text-muted-foreground">
                            Due: {task.dueDate.toLocaleDateString()}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Priority: {task.priority}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Status: {task.status}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            onClick={(e) => handleOpenEditTask(task, e)}
                          >
                            <Pen className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                            onClick={(e) => handleRemoveTask(task.id, e)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    {(!memberTasks[selectedMember.id] || memberTasks[selectedMember.id].length === 0) && (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No tasks assigned yet
                      </p>
                    )}
                  </div>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button 
                  className="w-full sm:w-auto bg-gradient-to-r from-tritonexus-purple to-tritonexus-pink text-white"
                  onClick={() => {
                    setIsDialogOpen(false);
                    setIsAssignDialogOpen(true);
                  }}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Assign New Task
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Assign Task Dialog */}
      {selectedMember && (
        <AssignTaskDialog
          isOpen={isAssignDialogOpen}
          onClose={() => setIsAssignDialogOpen(false)}
          onAssignTask={(taskData) => handleAssignTask(selectedMember.id, taskData)}
          memberName={selectedMember.name}
        />
      )}

      {/* Edit Task Dialog */}
      {selectedMember && selectedTask && (
        <EditTaskDialog
          isOpen={isEditDialogOpen}
          onClose={() => {
            setIsEditDialogOpen(false);
            setSelectedTask(null);
          }}
          onEditTask={handleEditTask}
          task={selectedTask}
          memberName={selectedMember.name}
        />
      )}

      {/* Remove Tasks Dialog */}
      <Dialog open={isRemoveDialogOpen} onOpenChange={setIsRemoveDialogOpen}>
        <DialogContent className="sm:max-w-[600px] bg-background/90 backdrop-blur-xl border-tritonexus-purple/20">
          {selectedMember && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={selectedMember.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-tritonexus-purple to-tritonexus-pink text-white">
                      {selectedMember.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <span className="text-xl">Remove Tasks</span>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      Select tasks to remove from {selectedMember.name}
                    </p>
                  </div>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-3 max-h-[300px] overflow-y-auto">
                {memberTasks[selectedMember.id]?.map((task) => (
                  <div 
                    key={task.id} 
                    className="p-3 rounded-md bg-muted/50 border border-border/50 flex items-start gap-3"
                  >
                    <Checkbox
                      checked={selectedTasksToRemove.includes(task.id)}
                      onCheckedChange={() => handleTaskSelection(task.id)}
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{task.title}</p>
                      <p className="text-xs text-muted-foreground">
                        Due: {task.dueDate.toLocaleDateString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Priority: {task.priority}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Status: {task.status}
                      </p>
                    </div>
                  </div>
                ))}
                {(!memberTasks[selectedMember.id] || memberTasks[selectedMember.id].length === 0) && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No tasks assigned yet
                  </p>
                )}
              </div>
              <DialogFooter>
                <Button 
                  className="w-full sm:w-auto bg-gradient-to-r from-tritonexus-purple to-tritonexus-pink text-white"
                  onClick={handleRemoveSelectedTasks}
                  disabled={selectedTasksToRemove.length === 0}
                >
                  <Trash className="h-4 w-4 mr-2" />
                  Remove Selected Tasks
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto"
                  onClick={() => {
                    setIsRemoveDialogOpen(false);
                    setSelectedTasksToRemove([]);
                  }}
                >
                  Cancel
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default TeamTaskPanel;
