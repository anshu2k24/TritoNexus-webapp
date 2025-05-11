import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer } from "recharts";

const barChartData = [
  { name: "Jan", Tasks: 40, Completed: 24 },
  { name: "Feb", Tasks: 55, Completed: 45 },
  { name: "Mar", Tasks: 65, Completed: 51 },
  { name: "Apr", Tasks: 60, Completed: 48 },
  { name: "May", Tasks: 80, Completed: 62 },
  { name: "Jun", Tasks: 90, Completed: 78 },
];

const pieChartData = [
  { name: "Development", value: 35 },
  { name: "Design", value: 25 },
  { name: "Marketing", value: 20 },
  { name: "Research", value: 15 },
  { name: "Planning", value: 5 },
];

const lineChartData = [
  { name: "Week 1", Productivity: 4000, Engagement: 2400 },
  { name: "Week 2", Productivity: 3000, Engagement: 1398 },
  { name: "Week 3", Productivity: 2000, Engagement: 9800 },
  { name: "Week 4", Productivity: 2780, Engagement: 3908 },
  { name: "Week 5", Productivity: 1890, Engagement: 4800 },
  { name: "Week 6", Productivity: 2390, Engagement: 3800 },
  { name: "Week 7", Productivity: 3490, Engagement: 4300 },
];

const COLORS = ["#9b87f5", "#D946EF", "#7E69AB", "#D6BCFA", "#FFDEE2"];

const ChartSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState("bar");

  return (
    <section id="analytics" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/40">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Interactive Analytics</span>
          </h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Visualize your project data with our powerful and interactive charts.
            Gain valuable insights and make data-driven decisions.
          </p>
        </div>

        <Tabs defaultValue="bar" className="w-full" onValueChange={setActiveTab}>
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="bar">Task Progress</TabsTrigger>
              <TabsTrigger value="pie">Project Allocation</TabsTrigger>
              <TabsTrigger value="line">Team Performance</TabsTrigger>
            </TabsList>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <Card className="border border-border bg-card hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>
                  {activeTab === "bar" && "Monthly Task Progress"}
                  {activeTab === "pie" && "Project Resource Allocation"}
                  {activeTab === "line" && "Team Performance Metrics"}
                </CardTitle>
                <CardDescription>
                  {activeTab === "bar" && "Visualization of tasks created vs completed each month"}
                  {activeTab === "pie" && "How resources are allocated across different project areas"}
                  {activeTab === "line" && "Team productivity and engagement over time"}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2 flex justify-center">
                <TabsContent value="bar" className="mt-0 w-full">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "var(--background)",
                          border: "1px solid var(--border)",
                          borderRadius: "8px"
                        }} 
                      />
                      <Legend />
                      <Bar dataKey="Tasks" fill="#9b87f5" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Completed" fill="#D946EF" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </TabsContent>
                <TabsContent value="pie" className="mt-0 w-full">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieChartData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "var(--background)",
                          border: "1px solid var(--border)",
                          borderRadius: "8px"
                        }} 
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </TabsContent>
                <TabsContent value="line" className="mt-0 w-full">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={lineChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "var(--background)",
                          border: "1px solid var(--border)",
                          borderRadius: "8px"
                        }} 
                      />
                      <Legend />
                      <Line type="monotone" dataKey="Productivity" stroke="#9b87f5" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="Engagement" stroke="#D946EF" />
                    </LineChart>
                  </ResponsiveContainer>
                </TabsContent>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold">
                {activeTab === "bar" && "Task Progress Insights"}
                {activeTab === "pie" && "Resource Allocation Breakdown"}
                {activeTab === "line" && "Performance Analytics"}
              </h3>
              <p className="text-foreground/80">
                {activeTab === "bar" && 
                  "Track your team's productivity with our task progress charts. See how many tasks are created and completed each month, identify trends, and optimize workflows for better efficiency."}
                {activeTab === "pie" && 
                  "Understand where your project resources are being allocated. This visualization helps you identify if any area is under-resourced or if there are opportunities to rebalance your team's efforts."}
                {activeTab === "line" && 
                  "Monitor your team's performance metrics over time with our interactive line charts. Track productivity and engagement trends to make data-driven decisions for team optimization."}
              </p>
              <ul className="space-y-3">
                {activeTab === "bar" && [
                  "Compare tasks created vs. completed",
                  "Identify productivity trends over time",
                  "Set realistic goals based on historical data",
                  "Export data for stakeholder reports"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tritopurple">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
                {activeTab === "pie" && [
                  "Visualize project resource distribution",
                  "Identify areas that need more attention",
                  "Optimize team allocation for better results",
                  "Balance workloads across project areas"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tritopurple">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
                {activeTab === "line" && [
                  "Track team productivity week by week",
                  "Measure engagement metrics over time",
                  "Identify correlation between metrics",
                  "Forecast future performance based on trends"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tritopurple">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export default ChartSection;