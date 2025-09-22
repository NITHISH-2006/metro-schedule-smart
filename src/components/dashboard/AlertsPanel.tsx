import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  Bell, 
  Clock, 
  Train, 
  Users, 
  Zap,
  CheckCircle,
  X,
  Filter,
  Settings,
  Volume2,
  VolumeX
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const alerts = [
  {
    id: 1,
    type: "critical",
    category: "service",
    title: "Signal Failure - Edapally Station",
    description: "Automatic signaling system experiencing intermittent failures. Manual override activated.",
    time: "2 minutes ago",
    impact: "High",
    affectedLines: ["Blue Line"],
    status: "active",
    estimatedResolution: "15-20 minutes"
  },
  {
    id: 2,
    type: "warning",
    category: "delay",
    title: "Train BL-003 Delayed",
    description: "Maintenance check taking longer than expected. 15-minute delay on Blue Line services.",
    time: "8 minutes ago",
    impact: "Medium",
    affectedLines: ["Blue Line"],
    status: "acknowledged",
    estimatedResolution: "10 minutes"
  },
  {
    id: 3,
    type: "info",
    category: "passenger",
    title: "High Passenger Volume",
    description: "Unusual passenger surge detected at MG Road station. AI recommending frequency increase.",
    time: "12 minutes ago",
    impact: "Medium",
    affectedLines: ["Blue Line", "Green Line"],
    status: "resolved",
    estimatedResolution: "Resolved"
  },
  {
    id: 4,
    type: "warning",
    category: "weather",
    title: "Heavy Rain Alert",
    description: "Weather service reports heavy rain expected in 30 minutes. Prepare for increased demand.",
    time: "18 minutes ago",
    impact: "Low",
    affectedLines: ["All Lines"],
    status: "active",
    estimatedResolution: "2 hours"
  },
  {
    id: 5,
    type: "critical",
    category: "power",
    title: "Power Fluctuation - Sector 7",
    description: "Voltage irregularities detected. Backup power systems activated automatically.",
    time: "25 minutes ago",
    impact: "High",
    affectedLines: ["Green Line"],
    status: "resolved",
    estimatedResolution: "Resolved"
  }
];

export const AlertsPanel = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const { toast } = useToast();

  const getAlertIcon = (type: string, category: string) => {
    if (type === "critical") return AlertTriangle;
    if (category === "delay") return Clock;
    if (category === "passenger") return Users;
    if (category === "power") return Zap;
    return Bell;
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case "critical": return "destructive";
      case "warning": return "default";
      case "info": return "secondary";
      default: return "secondary";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-destructive";
      case "acknowledged": return "bg-warning";
      case "resolved": return "bg-success";
      default: return "bg-muted";
    }
  };

  const handleAcknowledge = (alertId: number) => {
    toast({
      title: "Alert Acknowledged",
      description: `Alert #${alertId} has been acknowledged by the operator`,
      variant: "default",
    });
  };

  const handleResolve = (alertId: number) => {
    toast({
      title: "Alert Resolved",
      description: `Alert #${alertId} has been marked as resolved`,
      variant: "default",
    });
  };

  const filteredAlerts = alerts.filter(alert => 
    selectedFilter === "all" || 
    alert.type === selectedFilter || 
    alert.status === selectedFilter
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Live Alerts & Notifications</h1>
          <p className="text-muted-foreground mt-1">
            Real-time system alerts, service disruptions, and operational notifications
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="destructive" className="gap-1">
            <AlertTriangle className="h-3 w-3" />
            2 Critical
          </Badge>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Alert Settings
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setSoundEnabled(!soundEnabled)}
          >
            {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Alert Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical Alerts</p>
                <p className="text-2xl font-bold text-destructive">2</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-destructive opacity-60" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Warnings</p>
                <p className="text-2xl font-bold text-warning">2</p>
              </div>
              <Bell className="h-8 w-8 text-warning opacity-60" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Resolved Today</p>
                <p className="text-2xl font-bold text-success">12</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success opacity-60" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Response Time</p>
                <p className="text-2xl font-bold">3.2min</p>
              </div>
              <Clock className="h-8 w-8 text-info opacity-60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="shadow-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filter Alerts:</span>
              <div className="flex space-x-2">
                {["all", "critical", "warning", "info", "active", "resolved"].map((filter) => (
                  <Button
                    key={filter}
                    variant={selectedFilter === filter ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter(filter)}
                    className="capitalize"
                  >
                    {filter}
                  </Button>
                ))}
              </div>
            </div>
            <Badge variant="secondary" className="gap-1">
              {filteredAlerts.length} alerts
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.map((alert) => {
          const AlertIcon = getAlertIcon(alert.type, alert.category);
          
          return (
            <Card key={alert.id} className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    {/* Alert Icon */}
                    <div className={`p-2 rounded-lg ${
                      alert.type === "critical" ? "bg-destructive/10" :
                      alert.type === "warning" ? "bg-warning/10" : "bg-info/10"
                    }`}>
                      <AlertIcon className={`h-5 w-5 ${
                        alert.type === "critical" ? "text-destructive" :
                        alert.type === "warning" ? "text-warning" : "text-info"
                      }`} />
                    </div>

                    {/* Alert Content */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-lg">{alert.title}</h3>
                        <Badge variant={getAlertColor(alert.type)} className="capitalize">
                          {alert.type}
                        </Badge>
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(alert.status)}`}></div>
                        <span className="text-xs text-muted-foreground capitalize">{alert.status}</span>
                      </div>

                      <p className="text-muted-foreground">{alert.description}</p>

                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{alert.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Train className="h-3 w-3" />
                          <span>{alert.affectedLines.join(", ")}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3" />
                          <span>Impact: {alert.impact}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-medium">ETA Resolution: {alert.estimatedResolution}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Alert Actions */}
                  <div className="flex items-center space-x-2 ml-4">
                    {alert.status === "active" && (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleAcknowledge(alert.id)}
                        >
                          Acknowledge
                        </Button>
                        <Button 
                          variant="default" 
                          size="sm"
                          onClick={() => handleResolve(alert.id)}
                        >
                          Resolve
                        </Button>
                      </>
                    )}
                    {alert.status === "acknowledged" && (
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => handleResolve(alert.id)}
                      >
                        Mark Resolved
                      </Button>
                    )}
                    <Button variant="ghost" size="sm">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredAlerts.length === 0 && (
        <Card className="shadow-card">
          <CardContent className="p-12 text-center">
            <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Alerts Found</h3>
            <p className="text-muted-foreground">
              {selectedFilter === "all" 
                ? "All systems are operating normally. No active alerts at this time." 
                : `No ${selectedFilter} alerts found.`}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};