
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from '@/components/ui/progress';
import { Check, Loader2, AlertTriangle, Activity } from 'lucide-react';

const AdminStats = () => {
  // Mock data for stats
  const stats = [
    {
      title: "Total Tasks Completed",
      value: 128,
      percentage: 70,
      icon: Check,
      // color: "from-green-500 to-emerald-700",
      textColor: "text-green-500"
    },
    {
      title: "Tasks In Progress",
      value: 45,
      percentage: 35,
      icon: Loader2,
      // color: "from-blue-500 to-indigo-600",
      textColor: "text-blue-500"
    },
    {
      title: "Overdue Tasks",
      value: 8,
      percentage: 15,
      icon: AlertTriangle,
      // color: "from-red-500 to-rose-600",
      textColor: "text-red-500"
    },
    {
      title: "Team Engagement Today",
      value: "85%",
      percentage: 85,
      icon: Activity,
      // color: "from-tritonexus-purple to-tritonexus-pink",
      textColor: "text-tritonexus-purple"
    }
  ];

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Stats Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card 
            key={index}
            className="border border-border/50 bg-background/70 backdrop-blur-lg hover:shadow-lg hover:shadow-tritonexus-purple/10 hover:scale-[1.02] transition-all duration-300"
          >
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between text-lg">
                <span>{stat.title}</span>
                <stat.icon className={`${stat.textColor} animate-pulse`} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="relative pt-1">
                <Progress 
                  value={stat.percentage} 
                  className="h-3 bg-muted"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div 
                    className={`h-full rounded-full bg-gradient-to-r ${stat.color}`}
                    style={{ 
                      width: `${stat.percentage}%`,
                      opacity: 0.6 
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default AdminStats;
