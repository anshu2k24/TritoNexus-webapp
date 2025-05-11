
import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

// Mock data for team members and tasks
const teamMembers = [
  {
    id: 1,
    name: 'Anshuman Pati',
    role: 'Team lead',
    avatar: 'AP',
    tasks: [
      { id: 1, title: 'Design new dashboard UI', status: 'completed', dueDate: '2025-05-15' },
      { id: 2, title: 'Create user personas', status: 'in-progress', dueDate: '2025-05-20' }
    ]
  },
  {
    id: 2,
    name: 'Darshil Natwani',
    role: 'Software lead',
    avatar: 'DN',
    tasks: [
      { id: 3, title: 'Implement responsive navbar', status: 'in-progress', dueDate: '2025-05-12' },
      { id: 4, title: 'Fix login form validation', status: 'completed', dueDate: '2025-05-10' },
      { id: 5, title: 'Optimize image loading', status: 'pending', dueDate: '2025-05-22' }
    ]
  },
  {
    id: 3,
    name: 'Jayanth Midde',
    role: 'Backend Developer',
    avatar: 'MC',
    tasks: [
      { id: 6, title: 'Set up API endpoints', status: 'completed', dueDate: '2025-05-08' },
      { id: 7, title: 'Database optimization', status: 'in-progress', dueDate: '2025-05-18' },
      { id: 8, title: 'Implement authentication', status: 'pending', dueDate: '2025-05-25' }
    ]
  },
  {
    id: 4,
    name: 'Aman kumar Singh Rajput',
    role: 'Project Manager',
    avatar: 'ER',
    tasks: [
      { id: 9, title: 'Stakeholder meeting', status: 'completed', dueDate: '2025-05-05' },
      { id: 10, title: 'Sprint planning', status: 'in-progress', dueDate: '2025-05-11' },
      { id: 11, title: 'Resource allocation', status: 'pending', dueDate: '2025-05-17' }
    ]
  },
 
  {
    id: 5,
    name: 'Navya ',
    role: 'Project Manager',
    avatar: 'ER',
    tasks: [
      { id: 15, title: 'Stakeholder meeting', status: 'completed', dueDate: '2025-05-05' },
      { id: 16, title: 'Sprint planning', status: 'in-progress', dueDate: '2025-05-11' },
      { id: 17, title: 'Resource allocation', status: 'pending', dueDate: '2025-05-17' }
    ]
  },
  {
    id: 6,
    name: 'Varsha',
    role: 'Project Manager',
    avatar: 'ER',
    tasks: [
      { id: 18, title: 'Stakeholder meeting', status: 'completed', dueDate: '2025-05-05' },
      { id: 19, title: 'Sprint planning', status: 'in-progress', dueDate: '2025-05-11' },
      { id: 20, title: 'Resource allocation', status: 'pending', dueDate: '2025-05-17' }
    ]
  },
  {
    id: 7,
    name: 'Dhruva K R',
    role: 'Project Manager',
    avatar: 'ER',
    tasks: [
      { id: 9, title: 'Stakeholder meeting', status: 'completed', dueDate: '2025-05-05' },
      { id: 10, title: 'Sprint planning', status: 'in-progress', dueDate: '2025-05-11' },
      { id: 11, title: 'Resource allocation', status: 'pending', dueDate: '2025-05-17' }
    ]
  },
  {
    id: 8,
    name: 'Musaddik',
    role: 'Project Manager',
    avatar: 'ER',
    tasks: [
      { id: 9, title: 'Stakeholder meeting', status: 'completed', dueDate: '2025-05-05' },
      { id: 10, title: 'Sprint planning', status: 'in-progress', dueDate: '2025-05-11' },
      { id: 11, title: 'Resource allocation', status: 'pending', dueDate: '2025-05-17' }
    ]
  }
];

// Status tag component
const StatusTag = ({ status }: { status: string }) => {
  switch (status) {
    case 'completed':
      return (
        <div className="flex items-center text-green-500 bg-green-500/10 px-2 py-1 rounded-full text-xs">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          <span>Completed</span>
        </div>
      );
    case 'in-progress':
      return (
        <div className="flex items-center text-blue-500 bg-blue-500/10 px-2 py-1 rounded-full text-xs">
          <Clock className="h-3 w-3 mr-1" />
          <span>In Progress</span>
        </div>
      );
    case 'pending':
      return (
        <div className="flex items-center text-amber-500 bg-amber-500/10 px-2 py-1 rounded-full text-xs">
          <AlertCircle className="h-3 w-3 mr-1" />
          <span>Pending</span>
        </div>
      );
    default:
      return null;
  }
};

// Member card component
const MemberCard = ({ member }: { member: typeof teamMembers[0] }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Calculate task statistics
  const completedTasks = member.tasks.filter(task => task.status === 'completed').length;
  const totalTasks = member.tasks.length;
  const progress = Math.round((completedTasks / totalTasks) * 100);

  return (
    <Card className="feature-card hover:scale-[1.01] transition-all duration-300 cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-tritonexus-purple to-tritonexus-pink flex items-center justify-center text-white font-medium mr-3">
              {member.avatar}
            </div>
            <div>
              <h3 className="font-semibold">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold">{completedTasks}/{totalTasks}</div>
            <p className="text-xs text-muted-foreground">tasks completed</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="w-full bg-muted rounded-full h-2 mb-3">
          <div 
            className="h-2 rounded-full bg-gradient-to-r from-tritonexus-purple to-tritonexus-pink" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        {isExpanded && (
          <div className="mt-4 space-y-3 animate-fade-in">
            {member.tasks.map(task => (
              <div key={task.id} className="p-3 border border-border rounded-md bg-background/50">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-sm">{task.title}</h4>
                  <StatusTag status={task.status} />
                </div>
                <div className="text-xs text-muted-foreground">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2">
        <button 
          className="text-sm text-tritonexus-purple hover:text-tritonexus-pink transition-colors flex items-center w-full justify-center" 
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
        >
          {isExpanded ? 'Hide Tasks' : 'View Tasks'} 
          <ArrowRight className="ml-1 h-4 w-4" />
        </button>
      </CardFooter>
    </Card>
  );
};

const Workflow = () => {
  return (
    <DashboardLayout title="Team Workflow">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <p className="text-muted-foreground">
            Track your team's progress and task assignments in real-time
          </p>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card className="bg-gradient-to-br from-tritonexus-purple/5 to-tritonexus-pink/5">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Tasks</p>
                <p className="text-3xl font-bold text-foreground mt-1">24</p>
              </div>
              <div className="h-12 w-12 bg-tritonexus-purple/10 rounded-full flex items-center justify-center">
                <span className="text-xl text-tritonexus-purple font-bold">T</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-tritonexus-purple/5 to-tritonexus-pink/5">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-3xl font-bold text-foreground mt-1">14</p>
              </div>
              <div className="h-12 w-12 bg-green-500/10 rounded-full flex items-center justify-center">
                <span className="text-xl text-green-500 font-bold">C</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-tritonexus-purple/5 to-tritonexus-pink/5">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Team Members</p>
                <p className="text-3xl font-bold text-foreground mt-1">8</p>
              </div>
              <div className="h-12 w-12 bg-tritonexus-pink/10 rounded-full flex items-center justify-center">
                <span className="text-xl text-tritonexus-pink font-bold">M</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Team Members Grid */}
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <span className="bg-tritonexus-purple/20 text-tritonexus-purple w-8 h-8 rounded-full inline-flex items-center justify-center mr-2">
              <span className="text-sm">T</span>
            </span>
            Team Overview
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {teamMembers.map(member => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Workflow;
