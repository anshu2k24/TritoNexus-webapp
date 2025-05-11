import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, Loader2, AlertTriangle, Activity, UserPlus, Pen, Trash, ArrowUp, ArrowDown, Clock } from 'lucide-react';
import AdminStats from '@/components/AdminStats';
import TeamTaskPanel from '@/components/TeamTaskPanel';
import SuggestionFeedback from '@/components/SuggestionFeedback';
import ActivityLogSection from '@/components/ActivityLogSection';

// Mock admin user data
const adminProfile = {
  name: "Admin User",
  role: "Administrator",
  avatar: "/path-to-avatar.jpg",
  email: "admin@example.com",
  department: "Management",
  taskassigned: 15,
};

const Admin = () => {
  return (
    <DashboardLayout title="Admin Dashboard">
      <div className="space-y-6">
        {/* Admin Profile Section */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              {/* Left side - Profile info */}
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={adminProfile.avatar} alt={adminProfile.name} />
                  <AvatarFallback className="bg-gradient-to-br from-tritonexus-purple to-tritonexus-pink text-white text-2xl">
                    {adminProfile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">{adminProfile.name}</h2>
                  <p className="text-muted-foreground">{adminProfile.role}</p>
                  <p className="text-sm text-muted-foreground">{adminProfile.email}</p>
                </div>
              </div>
              
              {/* Right side - Stats */}
              <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                <div className="bg-muted/50 p-4 rounded-lg flex-1 md:min-w-[200px]">
                  <p className="text-sm text-muted-foreground mb-1">Department</p>
                  <p className="font-semibold text-lg">{adminProfile.department}</p>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg flex-1 md:min-w-[200px]">
                  <p className="text-sm text-muted-foreground mb-1">Tasks Assigned</p>
                  <p className="font-semibold text-lg">{adminProfile.taskassigned}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview Section */}
        <AdminStats />
        
        {/* Team Task Management Panel */}
        <TeamTaskPanel />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Suggestion & Feedback Box */}
          <SuggestionFeedback />
          
          {/* Activity Log */}
          <ActivityLogSection />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Admin;