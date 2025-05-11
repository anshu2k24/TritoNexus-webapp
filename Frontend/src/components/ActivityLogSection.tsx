
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ActivityItem {
  id: number;
  action: string;
  timestamp: Date;
  user: {
    name: string;
    avatar: string;
    initials: string;
  };
  icon: string;
  category: 'task' | 'milestone' | 'query' | 'user' | 'system';
}

const ActivityLogSection = () => {
  // Mock activity data
  const activities: ActivityItem[] = [
    {
      id: 1,
      action: "Assigned task 'Complete frontend design' to Alice Johnson",
      timestamp: new Date(2025, 4, 10, 9, 45),
      user: {
        name: "Admin",
        avatar: "",
        initials: "AD"
      },
      icon: "user-plus",
      category: 'task'
    },
    {
      id: 2,
      action: "Extended milestone 'Beta Release' by 3 days",
      timestamp: new Date(2025, 4, 10, 11, 23),
      user: {
        name: "Admin",
        avatar: "",
        initials: "AD"
      },
      icon: "calendar",
      category: 'milestone'
    },
    {
      id: 3,
      action: "Resolved query from Jordan about API documentation",
      timestamp: new Date(2025, 4, 9, 16, 12),
      user: {
        name: "Admin",
        avatar: "",
        initials: "AD"
      },
      icon: "check-circle",
      category: 'query'
    },
    {
      id: 4,
      action: "Added Bob Smith to the Development team",
      timestamp: new Date(2025, 4, 9, 14, 5),
      user: {
        name: "Admin",
        avatar: "",
        initials: "AD"
      },
      icon: "user-plus",
      category: 'user'
    },
    {
      id: 5,
      action: "Updated task priority for 'Database optimization'",
      timestamp: new Date(2025, 4, 9, 10, 30),
      user: {
        name: "Admin",
        avatar: "",
        initials: "AD"
      },
      icon: "edit",
      category: 'task'
    },
    {
      id: 6,
      action: "System maintenance completed successfully",
      timestamp: new Date(2025, 4, 8, 23, 0),
      user: {
        name: "System",
        avatar: "",
        initials: "SY"
      },
      icon: "server",
      category: 'system'
    }
  ];

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'task':
        return 'bg-blue-500/20 text-blue-500';
      case 'milestone':
        return 'bg-amber-500/20 text-amber-500';
      case 'query':
        return 'bg-green-500/20 text-green-500';
      case 'user':
        return 'bg-purple-500/20 text-purple-500';
      case 'system':
        return 'bg-slate-500/20 text-slate-500';
      default:
        return 'bg-gray-500/20 text-gray-500';
    }
  };

  return (
    <Card className="border border-border/50 bg-background/70 backdrop-blur-lg">
      <CardHeader className="pb-2 border-b border-border/30">
        <CardTitle className="text-xl">Activity Log</CardTitle>
      </CardHeader>
      <CardContent className="p-0 max-h-[500px] overflow-y-auto">
        <div className="relative pl-4">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 h-full border-l-2 border-dashed border-border/50" />
          
          {/* Activity items */}
          <ul className="space-y-3 py-4">
            {activities.map((activity) => (
              <li key={activity.id} className="relative pl-6">
                {/* Timeline dot */}
                <div className="absolute -left-1.5 mt-1.5">
                  <div className={`h-3 w-3 rounded-full ${getCategoryColor(activity.category)}`} />
                </div>
                <div className="flex items-start">
                  <Avatar className="h-8 w-8 mr-2 border border-border/50">
                    <AvatarImage src={activity.user.avatar} />
                    <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                      {activity.user.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm">{activity.action}</p>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{formatDate(activity.timestamp)}</span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityLogSection;
