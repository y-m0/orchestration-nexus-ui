
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
  captchaToken: string | null;
  captchaVerifying: boolean;
  setCaptchaVerifying: (verifying: boolean) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  credentials,
  setCredentials,
  captchaToken,
  captchaVerifying,
  setCaptchaVerifying,
}) => {
  const { toast } = useToast();
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaToken) {
      toast({
        variant: "destructive",
        title: "Verification required",
        description: "Please complete the captcha verification first.",
      });
      return;
    }

    try {
      setCaptchaVerifying(true);
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
    } finally {
      setCaptchaVerifying(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Welcome Back</h1>
        <p className="text-muted-foreground text-sm">Please sign in to continue</p>
      </div>

      {/* Email Field */}
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

      {/* Password Field */}
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

      {/* Submit Button */}
      <Button 
        type="submit" 
        className="w-full" 
        disabled={loading || !captchaToken || captchaVerifying}
      >
        {loading || captchaVerifying ? "Processing..." : "Sign In"}
      </Button>

      {/* Sign Up Link */}
      <div className="text-center">
        <Button 
          variant="link" 
          type="button"
          className="text-sm"
          onClick={() => navigate("/onboarding")}
        >
          Don't have an account? Sign up
        </Button>
      </div>
    </form>
  );
};
