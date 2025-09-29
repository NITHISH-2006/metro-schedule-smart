import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Train, 
  Clock, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Activity,
  Zap,
  DollarSign,
  BarChart3,
  Upload,
  Settings
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from "recharts";
import { gtfsDataService } from "@/services/gtfsDataService";

const performanceData = [
  { metric: "On-Time Performance", value: 94.2, change: +2.1 },
  { metric: "Energy Efficiency", value: 87.5, change: +1.8 },
  { metric: "Passenger Satisfaction", value: 91.3, change: +0.5 },
  { metric: "Cost Savings", value: 15.7, change: +3.2 },
];

export const DashboardOverview = () => {
  const [passengerData, setPassengerData] = useState([]);
  const [systemStats, setSystemStats] = useState({
    totalPassengers: "0",
    activeTrains: 0,
    onTimePerformance: 0,
    energySavings: 0
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        await gtfsDataService.loadGTFSData();
        setPassengerData(gtfsDataService.getProcessedPassengerData());
        setSystemStats(gtfsDataService.getSystemStats());
      } catch (error) {
        console.error('Error loading GTFS data:', error);
      }
    };

    loadData();
  }, []);
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-1">
            Real-time insights for Kochi Metro operations - {new Date().toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="secondary" className="gap-1">
            <Activity className="h-3 w-3 text-success" />
            AI Active
          </Badge>
          <Button className="bg-gradient-primary">Generate Report</Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Passengers</p>
                <p className="text-2xl font-bold text-foreground">{systemStats.totalPassengers}</p>
                <p className="text-xs text-success flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +12.5% vs yesterday
                </p>
              </div>
              <div className="bg-info/10 rounded-lg p-3">
                <Users className="h-6 w-6 text-info" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Trains</p>
                <p className="text-2xl font-bold text-foreground">{systemStats.activeTrains} / 24</p>
                <p className="text-xs text-warning flex items-center gap-1 mt-1">
                  <Clock className="h-3 w-3" />
                  2 scheduled maintenance
                </p>
              </div>
              <div className="bg-success/10 rounded-lg p-3">
                <Train className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">On-Time Performance</p>
                <p className="text-2xl font-bold text-foreground">{systemStats.onTimePerformance}%</p>
                <p className="text-xs text-success flex items-center gap-1 mt-1">
                  <CheckCircle className="h-3 w-3" />
                  Above target (90%)
                </p>
              </div>
              <div className="bg-success/10 rounded-lg p-3">
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Energy Savings</p>
                <p className="text-2xl font-bold text-foreground">₹{systemStats.energySavings}%</p>
                <p className="text-xs text-success flex items-center gap-1 mt-1">
                  <DollarSign className="h-3 w-3" />
                  This week
                </p>
              </div>
              <div className="bg-warning/10 rounded-lg p-3">
                <Zap className="h-6 w-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Passenger Flow Chart */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Passenger Flow vs AI Predictions
            </CardTitle>
            <CardDescription>Real-time vs predicted passenger counts today</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={passengerData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="passengers" stroke="hsl(var(--primary))" strokeWidth={2} name="Actual" />
                <Line type="monotone" dataKey="predicted" stroke="hsl(var(--info))" strokeWidth={2} strokeDasharray="5 5" name="AI Predicted" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-success" />
              System Performance
            </CardTitle>
            <CardDescription>Key operational metrics and improvements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {performanceData.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.metric}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">{item.value}%</span>
                    <Badge variant={item.change > 0 ? "default" : "secondary"} className="text-xs">
                      {item.change > 0 ? "+" : ""}{item.change}%
                    </Badge>
                  </div>
                </div>
                <Progress value={item.value} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent AI Decisions */}
        <Card className="shadow-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Recent AI Scheduling Decisions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { time: "08:45", action: "Increased frequency on Blue Line", reason: "High passenger demand detected", impact: "Reduced wait time by 2 minutes" },
                { time: "08:30", action: "Optimized train spacing", reason: "Morning rush pattern analysis", impact: "15% energy savings" },
                { time: "08:15", action: "Rerouted maintenance train", reason: "Peak hour conflict prevention", impact: "Zero passenger delays" },
              ].map((decision, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
                  <div className="bg-primary/10 rounded-full p-2">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{decision.action}</span>
                      <Badge variant="secondary" className="text-xs">{decision.time}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{decision.reason}</p>
                    <p className="text-xs text-success mt-1">Impact: {decision.impact}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start gap-2" variant="outline">
              <Upload className="h-4 w-4" />
              Upload Passenger Data
            </Button>
            <Button className="w-full justify-start gap-2" variant="outline">
              <Settings className="h-4 w-4" />
              Manual Override
            </Button>
            <Button className="w-full justify-start gap-2" variant="outline">
              <AlertTriangle className="h-4 w-4" />
              View Live Alerts
            </Button>
            <Button className="w-full justify-start gap-2 bg-gradient-primary text-white">
              <BarChart3 className="h-4 w-4" />
              Generate AI Schedule
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};