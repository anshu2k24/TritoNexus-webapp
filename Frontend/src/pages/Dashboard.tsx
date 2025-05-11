
import DashboardLayout from '../components/DashboardLayout';
import TaskCard from '../components/TaskCard';
import NotesSection from '../components/NotesSection';
import ChatBot from '../components/ChatBot';
import QuerySection from '../components/QuerySection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock user data
const userProfile = {
  name: "John Doe",
  role: "Software Developer",
  avatar: "/path-to-avatar.jpg",
  email: "john.doe@example.com"
};

// Mock data for assigned tasks
const assignedTasks = [
  {
    id: 1,
    name: 'Update User Interface',
    status: 'in progress',
    progress: 65,
    deadline: '2025-05-20',
    assignee: 'You',
    description: 'Revamp the dashboard UI with the new design system elements and ensure mobile responsiveness.'
  },
  {
    id: 2,
    name: 'API Integration',
    status: 'pending',
    progress: 10,
    deadline: '2025-05-25',
    assignee: 'You',
    description: 'Integrate the new backend API endpoints with the frontend components and implement proper error handling.'
  },
  {
    id: 3,
    name: 'Testing Documentation',
    status: 'completed',
    progress: 100,
    deadline: '2025-05-15',
    assignee: 'You',
    description: 'Document all test cases for the new features and share with the QA team.'
  },
  {
    id: 4,
    name: 'Performance Optimization',
    status: 'pending',
    progress: 0,
    deadline: '2025-05-30',
    assignee: 'You',
    description: 'Analyze and optimize the application performance, focusing on component render times and network requests.'
  }
];

const Dashboard = () => {
  return (
    <DashboardLayout title="Personal Dashboard">
      {/* Profile Section */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
              <AvatarFallback className="bg-gradient-to-br from-tritonexus-purple to-tritonexus-pink text-white text-xl">
                {userProfile.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{userProfile.name}</h2>
              <p className="text-muted-foreground">{userProfile.role}</p>
              <p className="text-sm text-muted-foreground">{userProfile.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignedTasks.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {assignedTasks.filter(task => task.status === 'in progress').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {assignedTasks.filter(task => task.status === 'completed').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {assignedTasks.filter(task => task.status === 'pending').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content - Horizontal Sections */}
      <div className="space-y-4 md:space-y-6">
        {/* Tasks Section */}
        <Card>
          <CardHeader>
            <CardTitle>Your Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {assignedTasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notes Section */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <NotesSection />
          </CardContent>
        </Card>

        {/* Chat and Queries Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Chat Section */}
          <Card className="h-[500px] md:h-[550px] flex flex-col">
            <CardHeader className="pb-2">
              <CardTitle>Chat Assistant</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-0">
              {/* Chat area with typing bar */}
              <div className="flex-1 flex flex-col h-full">
                {/* Messages area */}
                <div className="flex-1 overflow-y-auto p-4">
                  <ChatBot />
                </div>
              
              </div>
            </CardContent>
          </Card>

          {/* Queries Section */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Queries</CardTitle>
            </CardHeader>
            <CardContent>
              <QuerySection />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;