
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { User, Lock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes - replace with actual auth
    if (credentials.username && credentials.password) {
      localStorage.setItem("isAuthenticated", "true");
      toast({
        title: "Success",
        description: "Successfully logged in",
      });
      navigate("/dashboard");
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter valid credentials",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a192f] to-black relative overflow-hidden flex items-center justify-center p-4">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="stars-sm"></div>
        <div className="stars-md"></div>
        <div className="stars-lg"></div>
      </div>
      
      <Card className="w-full max-w-md bg-black/30 backdrop-blur-lg border border-white/10">
        <form onSubmit={handleLogin} className="p-6 space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-400">Please sign in to continue</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-white">Username</Label>
              <div className="relative">
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  className="bg-black/40 border-white/20 text-white pl-10 placeholder:text-gray-500"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                />
                <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="bg-black/40 border-white/20 text-white pl-10 placeholder:text-gray-500"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                />
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Sign In
          </Button>

          <div className="text-center">
            <Button 
              variant="link" 
              className="text-gray-400 hover:text-white"
              onClick={() => navigate("/onboarding")}
            >
              Don't have an account? Sign up
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
