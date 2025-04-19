
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OnboardingCard } from "@/components/onboarding/OnboardingCard";
import { OnboardingActions } from "@/components/onboarding/OnboardingActions";
import { Mail, User } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface StepNameProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
  };
  updateFormData: (data: Partial<{ firstName: string; lastName: string; email: string }>) => void;
  onNext: () => void;
}

export function StepName({ formData, updateFormData, onNext }: StepNameProps) {
  const [isFormValid, setIsFormValid] = useState(false);
  const { theme } = useTheme();
  
  // Determine if we're in dark/cosmic theme
  const isCosmicTheme = theme === "dark" || !theme;
  
  useEffect(() => {
    const { firstName, lastName, email } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsFormValid(
      firstName.trim() !== '' && 
      lastName.trim() !== '' && 
      emailRegex.test(email)
    );
  }, [formData]);

  return (
    <OnboardingCard 
      title="Welcome to Orchestration Nexus" 
      description="Let's get started by setting up your account. First, tell us about yourself."
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className={isCosmicTheme ? "text-white" : ""}>First Name</Label>
            <div className="relative">
              <Input
                id="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={(e) => updateFormData({ firstName: e.target.value })}
                className={cn(
                  "pl-10",
                  isCosmicTheme && "bg-black/40 border-white/20 text-white placeholder:text-gray-500"
                )}
              />
              <User className={cn(
                "absolute left-3 top-2.5 h-5 w-5",
                isCosmicTheme ? "text-gray-500" : "text-muted-foreground"
              )} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName" className={isCosmicTheme ? "text-white" : ""}>Last Name</Label>
            <div className="relative">
              <Input
                id="lastName"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={(e) => updateFormData({ lastName: e.target.value })}
                className={cn(
                  "pl-10",
                  isCosmicTheme && "bg-black/40 border-white/20 text-white placeholder:text-gray-500"
                )}
              />
              <User className={cn(
                "absolute left-3 top-2.5 h-5 w-5",
                isCosmicTheme ? "text-gray-500" : "text-muted-foreground"
              )} />
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email" className={isCosmicTheme ? "text-white" : ""}>Email Address</Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => updateFormData({ email: e.target.value })}
              className={cn(
                "pl-10",
                isCosmicTheme && "bg-black/40 border-white/20 text-white placeholder:text-gray-500"
              )}
            />
            <Mail className={cn(
              "absolute left-3 top-2.5 h-5 w-5",
              isCosmicTheme ? "text-gray-500" : "text-muted-foreground"
            )} />
          </div>
        </div>
      </div>
      
      <OnboardingActions onNext={onNext} disableNext={!isFormValid} />
    </OnboardingCard>
  );
}
