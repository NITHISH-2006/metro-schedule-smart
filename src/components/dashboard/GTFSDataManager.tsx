import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { 
  Upload, 
  Download, 
  Database, 
  Train, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  RefreshCw,
  FileText,
  BarChart3
} from "lucide-react";
import { gtfsDataService } from "@/services/gtfsDataService";
import { useToast } from "@/hooks/use-toast";

export const GTFSDataManager = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dataStats, setDataStats] = useState({
    routes: 0,
    stops: 0,
    trips: 0,
    lastUpdate: "Never"
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.zip')) {
      toast({
        title: "Invalid File Format",
        description: "Please upload a ZIP file containing GTFS data",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setUploadProgress(0);

    try {
      // Simulate file upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Load GTFS data
      await gtfsDataService.loadGTFSData();
      
      // Update stats
      const routes = gtfsDataService.getRoutes();
      const stops = gtfsDataService.getStops();
      const trips = gtfsDataService.getTrips();
      
      setDataStats({
        routes: routes.length,
        stops: stops.length,
        trips: trips.length,
        lastUpdate: new Date().toLocaleString()
      });

      setUploadProgress(100);
      
      toast({
        title: "GTFS Data Uploaded Successfully",
        description: `Processed ${routes.length} routes, ${stops.length} stops, and ${trips.length} trips`,
      });

    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "There was an error processing the GTFS data",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const handleRefreshData = async () => {
    setIsLoading(true);
    try {
      await gtfsDataService.loadGTFSData();
      
      const routes = gtfsDataService.getRoutes();
      const stops = gtfsDataService.getStops();
      const trips = gtfsDataService.getTrips();
      
      setDataStats({
        routes: routes.length,
        stops: stops.length,
        trips: trips.length,
        lastUpdate: new Date().toLocaleString()
      });

      toast({
        title: "Data Refreshed",
        description: "GTFS data has been reloaded successfully",
      });
    } catch (error) {
      toast({
        title: "Refresh Failed",
        description: "There was an error refreshing the data",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const exportSampleData = () => {
    const sampleData = {
      routes: gtfsDataService.getRoutes().slice(0, 2),
      stops: gtfsDataService.getStops().slice(0, 10),
      stats: dataStats
    };

    const blob = new Blob([JSON.stringify(sampleData, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'kmrl-sample-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Sample Data Downloaded",
      description: "KMRL sample data has been exported successfully",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">GTFS Data Management</h1>
          <p className="text-muted-foreground mt-1">
            Upload and manage KMRL transit data for AI scheduling
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="secondary" className="gap-1">
            <Database className="h-3 w-3 text-primary" />
            GTFS Format
          </Badge>
          <Button 
            onClick={handleRefreshData} 
            disabled={isLoading}
            variant="outline"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Upload Section */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-primary" />
            Upload GTFS Data
          </CardTitle>
          <CardDescription>
            Upload a ZIP file containing GTFS (General Transit Feed Specification) data files
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Drop your GTFS ZIP file here</h3>
            <p className="text-muted-foreground mb-4">
              or click to browse and select a file
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".zip"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button 
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
              className="bg-gradient-primary"
            >
              <Upload className="h-4 w-4 mr-2" />
              {isLoading ? 'Processing...' : 'Select GTFS ZIP File'}
            </Button>
          </div>

          {uploadProgress > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Upload Progress</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Data Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Routes</p>
                <p className="text-2xl font-bold">{dataStats.routes}</p>
              </div>
              <Train className="h-8 w-8 text-primary opacity-60" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Stops</p>
                <p className="text-2xl font-bold">{dataStats.stops}</p>
              </div>
              <MapPin className="h-8 w-8 text-info opacity-60" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Trips</p>
                <p className="text-2xl font-bold">{dataStats.trips}</p>
              </div>
              <Clock className="h-8 w-8 text-success opacity-60" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Last Update</p>
                <p className="text-sm font-medium">{dataStats.lastUpdate}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success opacity-60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Data Overview */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Current GTFS Data Overview
          </CardTitle>
          <CardDescription>
            Overview of loaded transit data and file structure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Routes Information */}
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Train className="h-4 w-4 text-primary" />
                Available Routes
              </h4>
              <div className="space-y-2">
                {gtfsDataService.getRoutes().map((route) => (
                  <div key={route.route_id} className="flex items-center justify-between p-2 rounded bg-muted/50">
                    <div>
                      <span className="font-medium">{route.route_short_name}</span>
                      <p className="text-xs text-muted-foreground">{route.route_long_name}</p>
                    </div>
                    <Badge variant="outline" style={{ backgroundColor: `#${route.route_color}20`, color: `#${route.route_color}` }}>
                      {route.route_type === "1" ? "Metro" : "Bus"}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* GTFS Files Status */}
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <FileText className="h-4 w-4 text-info" />
                GTFS Files Status
              </h4>
              <div className="space-y-2">
                {[
                  { file: "agency.txt", status: "loaded", records: 1 },
                  { file: "routes.txt", status: "loaded", records: dataStats.routes },
                  { file: "stops.txt", status: "loaded", records: dataStats.stops },
                  { file: "trips.txt", status: "loaded", records: dataStats.trips },
                  { file: "stop_times.txt", status: "loaded", records: 0 },
                  { file: "calendar.txt", status: "loaded", records: 2 },
                ].map((file) => (
                  <div key={file.file} className="flex items-center justify-between p-2 rounded bg-muted/50">
                    <span className="font-medium">{file.file}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{file.records} records</span>
                      <CheckCircle className="h-4 w-4 text-success" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <Button variant="outline" onClick={exportSampleData}>
              <Download className="h-4 w-4 mr-2" />
              Export Sample Data
            </Button>
            <Button className="bg-gradient-primary">
              <BarChart3 className="h-4 w-4 mr-2" />
              Generate AI Schedule
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};