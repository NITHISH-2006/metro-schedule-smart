import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Train, Users, Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      if (credentials.username && credentials.password) {
        toast({
          title: "Login Successful",
          description: "Welcome to KMRL AI Scheduling System",
          variant: "default",
        });
        // In real app, this would set auth state and redirect
        window.location.href = "/dashboard";
      } else {
        toast({
          title: "Authentication Failed",
          description: "Please enter valid credentials",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Header */}
        <div className="text-center space-y-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-full w-20 h-20 flex items-center justify-center mx-auto">
            <Train className="h-10 w-10 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">KMRL AI System</h1>
            <p className="text-blue-100 mt-2">Train Induction & Scheduling Platform</p>
          </div>
        </div>

        {/* Login Card */}
        <Card className="shadow-dashboard border-0">
          <CardHeader className="space-y-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">Secure Login</CardTitle>
              <Badge variant="secondary" className="gap-1">
                <Shield className="h-3 w-3" />
                Authorized Personnel
              </Badge>
            </div>
            <CardDescription>
              Enter your credentials to access the metro operations dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username">Username / Employee ID</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your employee ID"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  className="h-11"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="h-11"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-11 bg-gradient-primary hover:bg-primary-hover"
                disabled={isLoading}
              >
                {isLoading ? "Authenticating..." : "Access Dashboard"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* System Features */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white">
            <Users className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm">Passenger Analytics</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white">
            <Train className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm">AI Scheduling</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white">
            <Database className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm">Real-time Data</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-blue-100 text-sm">
          <p>Kochi Metro Rail Limited (KMRL)</p>
          <p className="mt-1">Authorized access only • All activities monitored</p>
        </div>
      </div>
    </div>
  );
};

export default Login;