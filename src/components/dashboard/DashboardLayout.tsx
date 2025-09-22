import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, 
  Upload, 
  Brain, 
  Calendar, 
  AlertTriangle, 
  Settings, 
  Activity,
  Train,
  User,
  LogOut,
  Menu,
  Bell
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: ReactNode;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navigationItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "demand-input", label: "Passenger Demand", icon: Upload },
  { id: "ai-scheduling", label: "AI Scheduling", icon: Brain },
  { id: "gantt-chart", label: "Timeline View", icon: Calendar },
  { id: "alerts", label: "Live Alerts", icon: AlertTriangle },
  { id: "manual-override", label: "Manual Override", icon: Settings },
  { id: "status-monitoring", label: "System Status", icon: Activity },
];

export const DashboardLayout = ({ children, activeSection, onSectionChange }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-dashboard-bg">
      {/* Header */}
      <header className="bg-header-bg border-b shadow-subtle sticky top-0 z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-primary rounded-lg p-2">
                <Train className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">KMRL AI Dashboard</h1>
                <p className="text-sm text-muted-foreground">Train Induction & Scheduling System</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="gap-1">
              <Activity className="h-3 w-3 text-success" />
              System Online
            </Badge>
            
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Button>
            
            <div className="flex items-center space-x-2">
              <div className="bg-primary/10 rounded-full p-2">
                <User className="h-4 w-4 text-primary" />
              </div>
              <div className="text-sm">
                <p className="font-medium">Metro Operator</p>
                <p className="text-muted-foreground">ID: KMRL001</p>
              </div>
            </div>
            
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-sidebar-bg border-r shadow-subtle min-h-screen">
          <nav className="p-4 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 h-11",
                    isActive && "bg-gradient-primary text-white shadow-md"
                  )}
                  onClick={() => onSectionChange(item.id)}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};