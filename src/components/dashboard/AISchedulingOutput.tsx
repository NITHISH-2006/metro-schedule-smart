import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Clock, 
  Train, 
  TrendingUp, 
  Download, 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle,
  Zap,
  Users,
  DollarSign,
  Activity
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line } from "recharts";
import { gtfsDataService } from "@/services/gtfsDataService";

const optimizationMetrics = [
  { metric: "Energy Efficiency", current: 87.5, target: 85, improvement: "+2.5%" },
  { metric: "Wait Time Reduction", current: 3.2, target: 4.0, improvement: "-0.8 min" },
  { metric: "Cost Savings", current: 15.7, target: 12, improvement: "+₹2.4L" },
  { metric: "Passenger Satisfaction", current: 94.1, target: 90, improvement: "+4.1%" },
];

export const AISchedulingOutput = () => {
  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        await gtfsDataService.loadGTFSData();
        setScheduleData(gtfsDataService.getProcessedScheduleData());
      } catch (error) {
        console.error('Error loading schedule data:', error);
      }
    };

    loadData();
  }, []);
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">AI Scheduling Output</h1>
          <p className="text-muted-foreground mt-1">
            AI-generated train schedules and optimization results
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="secondary" className="gap-1">
            <Brain className="h-3 w-3 text-primary" />
            AI Model: v2.4.1
          </Badge>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Regenerate
          </Button>
          <Button className="bg-gradient-primary">
            <Download className="h-4 w-4 mr-2" />
            Export Schedule
          </Button>
        </div>
      </div>

      {/* AI Processing Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Processing Time</p>
                <p className="text-xl font-bold">2.3s</p>
              </div>
              <Brain className="h-8 w-8 text-primary opacity-60" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Confidence Score</p>
                <p className="text-xl font-bold text-success">96.7%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success opacity-60" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Optimized Routes</p>
                <p className="text-xl font-bold">24/24</p>
              </div>
              <Train className="h-8 w-8 text-info opacity-60" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Est. Savings</p>
                <p className="text-xl font-bold text-success">₹2.4L</p>
              </div>
              <DollarSign className="h-8 w-8 text-success opacity-60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Schedule Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Train Frequency Schedule */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Train className="h-5 w-5 text-primary" />
              Optimized Train Frequency
            </CardTitle>
            <CardDescription>AI-recommended train deployment by time and line</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={scheduleData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="blueLine" stackId="1" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} name="Blue Line" />
                <Area type="monotone" dataKey="greenLine" stackId="1" stroke="hsl(var(--success))" fill="hsl(var(--success))" fillOpacity={0.6} name="Green Line" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Demand vs Capacity */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-info" />
              Demand vs Capacity Matching
            </CardTitle>
            <CardDescription>Passenger demand forecasting and capacity allocation</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={scheduleData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="demand" stroke="hsl(var(--warning))" strokeWidth={3} name="Predicted Demand" />
                <Bar dataKey="blueLine" fill="hsl(var(--primary))" fillOpacity={0.3} name="Blue Line Capacity" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Optimization Results */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-success" />
            Optimization Results
          </CardTitle>
          <CardDescription>Performance improvements from AI scheduling</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {optimizationMetrics.map((metric, index) => (
              <div key={index} className="space-y-3 p-4 rounded-lg bg-muted/50">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{metric.metric}</span>
                  <Badge variant="default" className="text-xs bg-gradient-success">
                    {metric.improvement}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Current: {metric.current}{metric.metric.includes('Time') ? 'min' : metric.metric.includes('Cost') ? '' : '%'}</span>
                    <span className="text-muted-foreground">Target: {metric.target}{metric.metric.includes('Time') ? 'min' : metric.metric.includes('Cost') ? '' : '%'}</span>
                  </div>
                  <Progress value={(metric.current / Math.max(metric.current, metric.target)) * 100} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Schedule Table */}
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Daily Schedule Output
              </CardTitle>
              <CardDescription>Detailed train timings and operational parameters</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-3">Time Slot</th>
                  <th className="text-left p-3">Blue Line</th>
                  <th className="text-left p-3">Green Line</th>
                  <th className="text-left p-3">Frequency (min)</th>
                  <th className="text-left p-3">Expected Load</th>
                  <th className="text-left p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { time: "05:30-06:00", blue: 2, green: 1, frequency: 15, load: "Low", status: "optimal" },
                  { time: "06:00-06:30", blue: 4, green: 2, frequency: 8, load: "Medium", status: "optimal" },
                  { time: "06:30-07:00", blue: 6, green: 3, frequency: 5, load: "High", status: "optimal" },
                  { time: "07:00-07:30", blue: 8, green: 4, frequency: 4, load: "Peak", status: "critical" },
                  { time: "07:30-08:00", blue: 8, green: 4, frequency: 4, load: "Peak", status: "critical" },
                  { time: "08:00-08:30", blue: 10, green: 5, frequency: 3, load: "Max", status: "attention" },
                ].map((slot, index) => (
                  <tr key={index} className="border-b hover:bg-muted/30">
                    <td className="p-3 font-medium">{slot.time}</td>
                    <td className="p-3">{slot.blue} trains</td>
                    <td className="p-3">{slot.green} trains</td>
                    <td className="p-3">{slot.frequency} min</td>
                    <td className="p-3">
                      <Badge variant={slot.load === 'Peak' || slot.load === 'Max' ? 'destructive' : slot.load === 'High' ? 'default' : 'secondary'}>
                        {slot.load}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1">
                        {slot.status === 'optimal' ? (
                          <CheckCircle className="h-4 w-4 text-success" />
                        ) : slot.status === 'critical' ? (
                          <AlertTriangle className="h-4 w-4 text-warning" />
                        ) : (
                          <Activity className="h-4 w-4 text-info" />
                        )}
                        <span className="capitalize text-xs">{slot.status}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};