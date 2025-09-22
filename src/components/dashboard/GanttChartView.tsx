import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Clock, 
  Train, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Filter,
  Download,
  Play,
  Pause,
  Settings
} from "lucide-react";

const trainSchedules = [
  {
    trainId: "BL-001",
    line: "Blue Line",
    route: "Aluva → MG Road",
    startTime: "05:30",
    endTime: "06:15",
    duration: 45,
    status: "scheduled",
    delay: 0
  },
  {
    trainId: "BL-002", 
    line: "Blue Line",
    route: "MG Road → Aluva",
    startTime: "05:45",
    endTime: "06:30",
    duration: 45,
    status: "active",
    delay: 2
  },
  {
    trainId: "GL-001",
    line: "Green Line",
    route: "Pettah → Tripunithura",
    startTime: "06:00",
    endTime: "06:35",
    duration: 35,
    status: "scheduled",
    delay: 0
  },
  {
    trainId: "BL-003",
    line: "Blue Line", 
    route: "Aluva → MG Road",
    startTime: "06:00",
    endTime: "06:45",
    duration: 45,
    status: "maintenance",
    delay: 15
  },
  {
    trainId: "GL-002",
    line: "Green Line",
    route: "Tripunithura → Pettah",
    startTime: "06:15",
    endTime: "06:50",
    duration: 35,
    status: "active",
    delay: 0
  },
];

const timeSlots = ["05:30", "06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00"];

export const GanttChartView = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-success";
      case "scheduled": return "bg-primary";
      case "maintenance": return "bg-warning";
      case "delayed": return "bg-destructive";
      default: return "bg-muted";
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case "active": return "text-success-foreground";
      case "scheduled": return "text-primary-foreground";
      case "maintenance": return "text-warning-foreground";
      case "delayed": return "text-destructive-foreground";
      default: return "text-muted-foreground";
    }
  };

  const calculatePosition = (startTime: string, duration: number) => {
    const [hours, minutes] = startTime.split(":").map(Number);
    const startMinutes = hours * 60 + minutes;
    const baseTime = 5 * 60 + 30; // 05:30 as base
    const startPosition = ((startMinutes - baseTime) / 210) * 100; // 210 minutes = 3.5 hours total view
    const width = (duration / 210) * 100;
    
    return { left: `${Math.max(0, startPosition)}%`, width: `${width}%` };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gantt Chart Timeline</h1>
          <p className="text-muted-foreground mt-1">
            Interactive train scheduling timeline with real-time status updates
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="secondary" className="gap-1">
            <Clock className="h-3 w-3 text-primary" />
            Live View
          </Badge>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button className="bg-gradient-primary">
            <Download className="h-4 w-4 mr-2" />
            Export Timeline
          </Button>
        </div>
      </div>

      {/* Timeline Controls */}
      <Card className="shadow-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <ZoomOut className="h-4 w-4 mr-1" />
                Zoom Out
              </Button>
              <Button variant="outline" size="sm">
                <ZoomIn className="h-4 w-4 mr-1" />
                Zoom In
              </Button>
              <Button variant="outline" size="sm">
                <RotateCcw className="h-4 w-4 mr-1" />
                Reset View
              </Button>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <span>Real-time Updates:</span>
                <Button variant="outline" size="sm" className="gap-1">
                  <Play className="h-3 w-3" />
                  Live
                </Button>
              </div>
              
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-success rounded"></div>
                  <span>Active</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-primary rounded"></div>
                  <span>Scheduled</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-warning rounded"></div>
                  <span>Maintenance</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-destructive rounded"></div>
                  <span>Delayed</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gantt Chart */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Train Schedule Timeline - Peak Hours (05:30 - 09:00)
          </CardTitle>
          <CardDescription>
            Real-time visualization of train operations, delays, and maintenance windows
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {/* Timeline Header */}
          <div className="border-b bg-muted/50 p-4">
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-3 font-medium text-sm">Train / Route</div>
              <div className="col-span-9">
                <div className="flex justify-between text-sm font-medium">
                  {timeSlots.map((time) => (
                    <span key={time}>{time}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Body */}
          <div className="space-y-2 p-4">
            {trainSchedules.map((schedule, index) => (
              <div key={index} className="grid grid-cols-12 gap-2 items-center min-h-[60px] hover:bg-muted/30 rounded-lg p-2">
                {/* Train Info */}
                <div className="col-span-3 space-y-1">
                  <div className="flex items-center gap-2">
                    <Train className="h-4 w-4 text-primary" />
                    <span className="font-medium text-sm">{schedule.trainId}</span>
                    <Badge 
                      variant={schedule.line === "Blue Line" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {schedule.line.split(" ")[0]}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">{schedule.route}</div>
                  {schedule.delay > 0 && (
                    <div className="text-xs text-destructive">Delay: +{schedule.delay}min</div>
                  )}
                </div>

                {/* Timeline Bar */}
                <div className="col-span-9 relative h-8">
                  <div 
                    className={`absolute h-6 rounded ${getStatusColor(schedule.status)} ${getStatusTextColor(schedule.status)} flex items-center justify-center text-xs font-medium shadow-sm transition-all hover:shadow-md`}
                    style={calculatePosition(schedule.startTime, schedule.duration)}
                  >
                    {schedule.startTime} - {schedule.endTime}
                  </div>
                  
                  {/* Current time indicator */}
                  <div 
                    className="absolute top-0 bottom-0 w-0.5 bg-destructive"
                    style={{ left: "25%" }} // Simulated current time at ~06:15
                  >
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                      <div className="w-2 h-2 bg-destructive rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Timeline Footer */}
          <div className="border-t bg-muted/50 p-4">
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-3"></div>
              <div className="col-span-9">
                <div className="relative h-4 bg-gradient-to-r from-blue-100 via-yellow-100 to-red-100 rounded">
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                    Passenger Demand Intensity
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Trains</p>
                <p className="text-xl font-bold">2</p>
                <p className="text-xs text-success">Running on time</p>
              </div>
              <Play className="h-8 w-8 text-success opacity-60" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Scheduled</p>
                <p className="text-xl font-bold">2</p>
                <p className="text-xs text-primary">Next departure: 5min</p>
              </div>
              <Clock className="h-8 w-8 text-primary opacity-60" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Maintenance</p>
                <p className="text-xl font-bold">1</p>
                <p className="text-xs text-warning">BL-003 delayed +15min</p>
              </div>
              <Settings className="h-8 w-8 text-warning opacity-60" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};