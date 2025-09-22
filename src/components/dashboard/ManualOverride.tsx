import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Settings, 
  Train, 
  Clock, 
  AlertTriangle, 
  Play,
  Pause,
  RotateCcw,
  Save,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Shield
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ManualOverride = () => {
  const [isAIEnabled, setIsAIEnabled] = useState(true);
  const [overrideMode, setOverrideMode] = useState(false);
  const [manualSchedule, setManualSchedule] = useState({
    blueLineFrequency: 5,
    greenLineFrequency: 8,
    peakHourMultiplier: 1.5,
    maintenanceWindow: "02:00-04:00"
  });

  const { toast } = useToast();

  const handleToggleAI = () => {
    setIsAIEnabled(!isAIEnabled);
    toast({
      title: isAIEnabled ? "AI Scheduling Disabled" : "AI Scheduling Enabled",
      description: isAIEnabled 
        ? "Manual control activated. All scheduling decisions require operator input." 
        : "AI scheduling restored. System will automatically optimize train schedules.",
      variant: isAIEnabled ? "destructive" : "default",
    });
  };

  const handleOverrideSubmit = () => {
    toast({
      title: "Manual Override Applied",
      description: "Custom schedule parameters have been implemented successfully.",
      variant: "default",
    });
    setOverrideMode(false);
  };

  const handleEmergencyStop = () => {
    toast({
      title: "Emergency Protocol Activated",
      description: "All train operations have been halted. Awaiting manual clearance.",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manual Override Control</h1>
          <p className="text-muted-foreground mt-1">
            Operator controls for manual scheduling and emergency interventions
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant={isAIEnabled ? "default" : "destructive"} className="gap-1">
            {isAIEnabled ? <Unlock className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
            {isAIEnabled ? "AI Active" : "Manual Control"}
          </Badge>
          <Button variant="outline" className="gap-2">
            <Shield className="h-4 w-4" />
            Security Log
          </Button>
        </div>
      </div>

      {/* System Status & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Control Panel */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              AI System Control
            </CardTitle>
            <CardDescription>Enable or disable AI scheduling system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div>
                <p className="font-medium">AI Scheduling</p>
                <p className="text-sm text-muted-foreground">Automatic optimization</p>
              </div>
              <Button 
                variant={isAIEnabled ? "default" : "destructive"}
                onClick={handleToggleAI}
                className="gap-2"
              >
                {isAIEnabled ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {isAIEnabled ? "Disable" : "Enable"}
              </Button>
            </div>

            {!isAIEnabled && (
              <div className="p-4 border border-destructive/50 rounded-lg bg-destructive/5">
                <div className="flex items-center gap-2 text-destructive mb-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="font-medium">Manual Mode Active</span>
                </div>
                <p className="text-sm">All scheduling decisions require manual input. Monitor operations closely.</p>
              </div>
            )}

            <Button 
              variant="outline" 
              className="w-full gap-2"
              onClick={() => setOverrideMode(!overrideMode)}
            >
              <Settings className="h-4 w-4" />
              {overrideMode ? "Cancel Override" : "Configure Override"}
            </Button>
          </CardContent>
        </Card>

        {/* Emergency Controls */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Emergency Controls
            </CardTitle>
            <CardDescription>Critical system interventions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="destructive" 
              className="w-full gap-2"
              onClick={handleEmergencyStop}
            >
              <Pause className="h-4 w-4" />
              Emergency Stop All Trains
            </Button>

            <Button variant="outline" className="w-full gap-2">
              <Train className="h-4 w-4" />
              Single Line Halt
            </Button>

            <Button variant="outline" className="w-full gap-2">
              <RotateCcw className="h-4 w-4" />
              Reset to Safe Mode
            </Button>

            <div className="p-3 border border-warning/50 rounded-lg bg-warning/5">
              <div className="flex items-center gap-2 text-warning text-sm">
                <Shield className="h-3 w-3" />
                <span>Emergency actions require dual authorization</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Status */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-info" />
              System Status
            </CardTitle>
            <CardDescription>Real-time operational overview</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Active Trains</span>
                <Badge variant="default">18/24</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">AI Decisions</span>
                <Badge variant={isAIEnabled ? "default" : "secondary"}>
                  {isAIEnabled ? "247 today" : "Disabled"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Manual Overrides</span>
                <Badge variant="secondary">3 today</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">System Health</span>
                <Badge variant="default" className="bg-gradient-success">Optimal</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Manual Schedule Override */}
      {overrideMode && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-warning" />
              Manual Schedule Configuration
            </CardTitle>
            <CardDescription>
              Override AI recommendations with custom scheduling parameters
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="blueFreq">Blue Line Frequency (minutes)</Label>
                  <Input
                    id="blueFreq"
                    type="number"
                    value={manualSchedule.blueLineFrequency}
                    onChange={(e) => setManualSchedule({
                      ...manualSchedule,
                      blueLineFrequency: parseInt(e.target.value)
                    })}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="greenFreq">Green Line Frequency (minutes)</Label>
                  <Input
                    id="greenFreq"
                    type="number"
                    value={manualSchedule.greenLineFrequency}
                    onChange={(e) => setManualSchedule({
                      ...manualSchedule,
                      greenLineFrequency: parseInt(e.target.value)
                    })}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="peakMultiplier">Peak Hour Multiplier</Label>
                  <Input
                    id="peakMultiplier"
                    type="number"
                    step="0.1"
                    value={manualSchedule.peakHourMultiplier}
                    onChange={(e) => setManualSchedule({
                      ...manualSchedule,
                      peakHourMultiplier: parseFloat(e.target.value)
                    })}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="maintenance">Maintenance Window</Label>
                  <Input
                    id="maintenance"
                    value={manualSchedule.maintenanceWindow}
                    onChange={(e) => setManualSchedule({
                      ...manualSchedule,
                      maintenanceWindow: e.target.value
                    })}
                    className="mt-1"
                    placeholder="HH:MM-HH:MM"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <AlertTriangle className="h-4 w-4" />
                <span>Changes will affect all active schedules immediately</span>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setOverrideMode(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="bg-gradient-primary gap-2"
                  onClick={handleOverrideSubmit}
                >
                  <Save className="h-4 w-4" />
                  Apply Override
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Manual Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Recent Manual Actions
          </CardTitle>
          <CardDescription>History of operator interventions and overrides</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                time: "14:25",
                action: "Emergency halt - Blue Line",
                operator: "Operator-001",
                reason: "Signal failure at Edapally",
                status: "resolved"
              },
              {
                time: "12:15",
                action: "Frequency override",
                operator: "Operator-002", 
                reason: "Special event crowd management",
                status: "active"
              },
              {
                time: "09:30",
                action: "AI system disabled",
                operator: "Operator-001",
                reason: "System calibration",
                status: "resolved"
              }
            ].map((action, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-xs">{action.time}</Badge>
                    <span className="font-medium">{action.action}</span>
                    <Badge 
                      variant={action.status === "active" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {action.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    By {action.operator} • {action.reason}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};