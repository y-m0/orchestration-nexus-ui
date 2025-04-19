
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OnboardingCard } from "@/components/onboarding/OnboardingCard";
import { OnboardingActions } from "@/components/onboarding/OnboardingActions";
import { Mail } from "lucide-react";

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
            <Label htmlFor="firstName" className="text-white">First Name</Label>
            <Input
              id="firstName"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={(e) => updateFormData({ firstName: e.target.value })}
              className="bg-black/40 border-white/20 text-white placeholder:text-gray-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-white">Last Name</Label>
            <Input
              id="lastName"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={(e) => updateFormData({ lastName: e.target.value })}
              className="bg-black/40 border-white/20 text-white placeholder:text-gray-500"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white">Email Address</Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => updateFormData({ email: e.target.value })}
              className="bg-black/40 border-white/20 text-white pl-10 placeholder:text-gray-500"
            />
            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
          </div>
        </div>
      </div>
      
      <OnboardingActions onNext={onNext} disableNext={!isFormValid} />
    </OnboardingCard>
  );
}
