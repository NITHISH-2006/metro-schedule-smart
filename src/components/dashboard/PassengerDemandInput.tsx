import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  FileText, 
  Database, 
  Calendar, 
  MapPin, 
  Users, 
  CloudRain,
  CheckCircle,
  AlertCircle,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const PassengerDemandInput = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedDatasets, setSelectedDatasets] = useState({
    ridership: true,
    weather: false,
    gps: true,
    demographics: false
  });

  const { toast } = useToast();

  const handleFileUpload = (type: string) => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          toast({
            title: "Upload Complete",
            description: `${type} data uploaded successfully`,
            variant: "default",
          });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const datasetTypes = [
    {
      id: "ridership",
      name: "Historical Ridership",
      description: "Passenger flow patterns, station entries/exits",
      icon: Users,
      size: "2.4 GB",
      lastUpdate: "2 hours ago",
      status: "active"
    },
    {
      id: "weather",
      name: "Weather Data",
      description: "Rain, temperature, humidity patterns",
      icon: CloudRain,
      size: "450 MB",
      lastUpdate: "1 hour ago",
      status: "inactive"
    },
    {
      id: "gps",
      name: "GPS & Traffic Data",
      description: "Real-time location and traffic conditions",
      icon: MapPin,
      size: "1.8 GB",
      lastUpdate: "15 minutes ago",
      status: "active"
    },
    {
      id: "demographics",
      name: "Demographics Data",
      description: "Population density, age groups, employment",
      icon: Database,
      size: "325 MB",
      lastUpdate: "6 hours ago",
      status: "inactive"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Passenger Demand Input</h1>
          <p className="text-muted-foreground mt-1">
            Upload and manage datasets for AI training and prediction accuracy
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="secondary" className="gap-1">
            <Database className="h-3 w-3 text-info" />
            4 Data Sources
          </Badge>
          <Button className="bg-gradient-primary">
            <Upload className="h-4 w-4 mr-2" />
            Bulk Upload
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Records</p>
                <p className="text-xl font-bold">2.4M</p>
              </div>
              <Database className="h-8 w-8 text-primary opacity-60" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Data Quality</p>
                <p className="text-xl font-bold text-success">94.2%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success opacity-60" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Last Sync</p>
                <p className="text-xl font-bold">15m ago</p>
              </div>
              <Clock className="h-8 w-8 text-info opacity-60" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Storage Used</p>
                <p className="text-xl font-bold">4.97 GB</p>
              </div>
              <FileText className="h-8 w-8 text-warning opacity-60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dataset Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {datasetTypes.map((dataset) => {
          const Icon = dataset.icon;
          const isSelected = selectedDatasets[dataset.id as keyof typeof selectedDatasets];
          
          return (
            <Card key={dataset.id} className="shadow-card">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isSelected ? 'bg-primary/10' : 'bg-muted/50'}`}>
                      <Icon className={`h-5 w-5 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{dataset.name}</CardTitle>
                      <CardDescription>{dataset.description}</CardDescription>
                    </div>
                  </div>
                  <Badge 
                    variant={dataset.status === 'active' ? 'default' : 'secondary'}
                    className="capitalize"
                  >
                    {dataset.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Size: {dataset.size}</span>
                  <span className="text-muted-foreground">Updated: {dataset.lastUpdate}</span>
                </div>

                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleFileUpload(dataset.name)}
                    disabled={uploadProgress > 0 && uploadProgress < 100}
                  >
                    <Upload className="h-4 w-4 mr-1" />
                    Upload New
                  </Button>
                  
                  <Button 
                    variant={isSelected ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setSelectedDatasets({
                      ...selectedDatasets,
                      [dataset.id]: !isSelected
                    })}
                  >
                    {isSelected ? "Active" : "Enable"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Data Preview */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Data Preview & Validation
          </CardTitle>
          <CardDescription>
            Preview uploaded data and check for quality issues
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-medium">Latest Ridership Data Sample</span>
              <Badge variant="secondary">1,247 records</Badge>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Station</th>
                    <th className="text-left p-2">Time</th>
                    <th className="text-left p-2">Entries</th>
                    <th className="text-left p-2">Exits</th>
                    <th className="text-left p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { station: "Aluva", time: "08:30", entries: 245, exits: 89, status: "valid" },
                    { station: "Kalamassery", time: "08:30", entries: 189, exits: 156, status: "valid" },
                    { station: "Edapally", time: "08:30", entries: 334, exits: 201, status: "anomaly" },
                  ].map((row, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2 font-medium">{row.station}</td>
                      <td className="p-2">{row.time}</td>
                      <td className="p-2">{row.entries}</td>
                      <td className="p-2">{row.exits}</td>
                      <td className="p-2">
                        <Badge variant={row.status === 'valid' ? 'default' : 'destructive'} className="text-xs">
                          {row.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-success" />
                <span className="text-sm">1,245 valid records</span>
              </div>
              <div className="flex items-center gap-1">
                <AlertCircle className="h-4 w-4 text-warning" />
                <span className="text-sm">2 anomalies detected</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};