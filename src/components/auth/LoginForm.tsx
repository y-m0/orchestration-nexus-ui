
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/auth";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
  credentials: { email: string; password: string };
  setCredentials: (c: { email: string; password: string }) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  credentials,
  setCredentials,
}) => {
  const { toast } = useToast();
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(credentials.email, credentials.password);
      toast({
        title: "Success",
        description: "Successfully logged in",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to login",
      });
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">Email</Label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <User className="h-4 w-4" />
          </div>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium">Password</Label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Lock className="h-4 w-4" />
          </div>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            className="pl-10"
            required
          />
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full" 
        disabled={loading}
      >
        {loading ? "Processing..." : "Sign In"}
      </Button>

      <div className="text-sm text-center text-muted-foreground">
        <p>For demo purposes use:</p>
        <p>Email: test@example.com</p>
        <p>Password: password</p>
      </div>
    </form>
  );
};
