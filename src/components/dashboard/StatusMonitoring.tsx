import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Activity, 
  Cpu, 
  Database, 
  Wifi, 
  Battery, 
  Thermometer,
  Signal,
  Server,
  MonitorSpeaker,
  RefreshCw,
  Download,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

const systemMetrics = [
  { time: "08:00", cpu: 45, memory: 67, network: 89 },
  { time: "08:15", cpu: 52, memory: 71, network: 92 },
  { time: "08:30", cpu: 78, memory: 84, network: 88 },
  { time: "08:45", cpu: 65, memory: 76, network: 94 },
  { time: "09:00", cpu: 58, memory: 72, network: 91 },
  { time: "09:15", cpu: 49, memory: 68, network: 89 },
];

const systemComponents = [
  {
    name: "AI Processing Engine",
    status: "operational",
    uptime: "99.9%",
    lastCheck: "2 min ago",
    performance: 94,
    icon: Cpu
  },
  {
    name: "Database Cluster",
    status: "operational", 
    uptime: "99.7%",
    lastCheck: "1 min ago",
    performance: 91,
    icon: Database
  },
  {
    name: "Network Infrastructure",
    status: "warning",
    uptime: "98.2%",
    lastCheck: "30 sec ago", 
    performance: 87,
    icon: Wifi
  },
  {
    name: "Backup Power Systems",
    status: "operational",
    uptime: "100%",
    lastCheck: "5 min ago",
    performance: 98,
    icon: Battery
  },
  {
    name: "Communication Network",
    status: "operational",
    uptime: "99.8%",
    lastCheck: "1 min ago",
    performance: 95,
    icon: Signal
  },
  {
    name: "Temperature Control",
    status: "attention",
    uptime: "97.1%",
    lastCheck: "3 min ago",
    performance: 82,
    icon: Thermometer
  }
];

export const StatusMonitoring = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational": return "default";
      case "warning": return "secondary";  
      case "attention": return "outline";
      case "critical": return "destructive";
      default: return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational": return CheckCircle;
      case "warning": return AlertCircle;
      case "attention": return Clock;
      case "critical": return AlertCircle;
      default: return CheckCircle;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">System Status Monitoring</h1>
          <p className="text-muted-foreground mt-1">
            Real-time health monitoring of KMRL AI infrastructure and components
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="default" className="gap-1 bg-gradient-success">
            <CheckCircle className="h-3 w-3" />
            All Systems Operational
          </Badge>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button className="bg-gradient-primary">
            <Download className="h-4 w-4 mr-2" />
            Status Report
          </Button>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">System Uptime</p>
                <p className="text-2xl font-bold text-success">99.7%</p>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </div>
              <Activity className="h-8 w-8 text-success opacity-60" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">CPU Usage</p>
                <p className="text-2xl font-bold">58%</p>
                <p className="text-xs text-success">Normal load</p>
              </div>
              <Cpu className="h-8 w-8 text-primary opacity-60" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Memory Usage</p>
                <p className="text-2xl font-bold">72%</p>
                <p className="text-xs text-info">Within limits</p>
              </div>
              <Server className="h-8 w-8 text-info opacity-60" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Network Health</p>
                <p className="text-2xl font-bold">91%</p>
                <p className="text-xs text-success">Optimal</p>
              </div>
              <Wifi className="h-8 w-8 text-success opacity-60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Resource Usage Trends */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Resource Usage Trends
            </CardTitle>
            <CardDescription>CPU, Memory, and Network utilization over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={systemMetrics}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="cpu" stroke="hsl(var(--primary))" strokeWidth={2} name="CPU %" />
                <Line type="monotone" dataKey="memory" stroke="hsl(var(--warning))" strokeWidth={2} name="Memory %" />
                <Line type="monotone" dataKey="network" stroke="hsl(var(--success))" strokeWidth={2} name="Network %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* System Load Distribution */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5 text-info" />
              System Load Distribution
            </CardTitle>
            <CardDescription>Current resource allocation across services</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={systemMetrics}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="cpu" stackId="1" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} name="AI Processing" />
                <Area type="monotone" dataKey="memory" stackId="1" stroke="hsl(var(--info))" fill="hsl(var(--info))" fillOpacity={0.6} name="Data Storage" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Component Status Grid */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MonitorSpeaker className="h-5 w-5 text-primary" />
            System Components Status
          </CardTitle>
          <CardDescription>
            Detailed health monitoring of individual system components
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {systemComponents.map((component, index) => {
              const Icon = component.icon;
              const StatusIcon = getStatusIcon(component.status);
              
              return (
                <div key={index} className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Icon className="h-5 w-5 text-primary" />
                      <span className="font-medium text-sm">{component.name}</span>
                    </div>
                    <Badge variant={getStatusColor(component.status)} className="text-xs gap-1">
                      <StatusIcon className="h-3 w-3" />
                      {component.status}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Performance</span>
                      <span className="font-medium">{component.performance}%</span>
                    </div>
                    <Progress value={component.performance} className="h-2" />

                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Uptime: {component.uptime}</span>
                      <span>Checked: {component.lastCheck}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Detailed System Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI System Status */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="h-5 w-5 text-primary" />
              AI System Diagnostics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Model Version:</span>
                <p className="font-medium">v2.4.1</p>
              </div>
              <div>
                <span className="text-muted-foreground">Training Data:</span>
                <p className="font-medium">2.4M records</p>
              </div>
              <div>
                <span className="text-muted-foreground">Prediction Accuracy:</span>
                <p className="font-medium text-success">96.7%</p>
              </div>
              <div>
                <span className="text-muted-foreground">Processing Speed:</span>
                <p className="font-medium">2.3ms avg</p>
              </div>
            </div>

            <div className="pt-3 border-t">
              <div className="flex items-center justify-between text-sm">
                <span>Recent AI Decisions:</span>
                <Badge variant="default">247 today</Badge>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span>Optimization Success Rate:</span>
                <Badge variant="default" className="bg-gradient-success">94.2%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Infrastructure Health */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-info" />
              Infrastructure Health
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Data Center:</span>
                <p className="font-medium">Primary Online</p>
              </div>
              <div>
                <span className="text-muted-foreground">Backup Systems:</span>
                <p className="font-medium text-success">Active</p>
              </div>
              <div>
                <span className="text-muted-foreground">Storage Usage:</span>
                <p className="font-medium">4.97 GB / 50 GB</p>
              </div>
              <div>
                <span className="text-muted-foreground">Bandwidth Usage:</span>
                <p className="font-medium">67% capacity</p>
              </div>
            </div>

            <div className="pt-3 border-t">
              <div className="flex items-center justify-between text-sm">
                <span>Security Status:</span>
                <Badge variant="default" className="bg-gradient-success gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Secure
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span>Last Security Scan:</span>
                <span className="text-muted-foreground">2 hours ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};