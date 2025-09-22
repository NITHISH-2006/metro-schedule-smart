import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { PassengerDemandInput } from "@/components/dashboard/PassengerDemandInput";
import { AISchedulingOutput } from "@/components/dashboard/AISchedulingOutput";
import { GanttChartView } from "@/components/dashboard/GanttChartView";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";
import { ManualOverride } from "@/components/dashboard/ManualOverride";
import { StatusMonitoring } from "@/components/dashboard/StatusMonitoring";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");

  const renderActiveSection = () => {
    switch (activeSection) {
      case "overview":
        return <DashboardOverview />;
      case "demand-input":
        return <PassengerDemandInput />;
      case "ai-scheduling":
        return <AISchedulingOutput />;
      case "gantt-chart":
        return <GanttChartView />;
      case "alerts":
        return <AlertsPanel />;
      case "manual-override":
        return <ManualOverride />;
      case "status-monitoring":
        return <StatusMonitoring />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <DashboardLayout activeSection={activeSection} onSectionChange={setActiveSection}>
      {renderActiveSection()}
    </DashboardLayout>
  );
};

export default Dashboard;