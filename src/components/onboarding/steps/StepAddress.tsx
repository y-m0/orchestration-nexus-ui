
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OnboardingCard } from "@/components/onboarding/OnboardingCard";
import { OnboardingActions } from "@/components/onboarding/OnboardingActions";
import { MapPin } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface StepAddressProps {
  formData: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  updateFormData: (data: Partial<{ address: string; city: string; state: string; zipCode: string }>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepAddress({ formData, updateFormData, onNext, onBack }: StepAddressProps) {
  const isMobile = useIsMobile();
  const [isFormValid, setIsFormValid] = useState(false);
  
  useEffect(() => {
    const { address, city, state, zipCode } = formData;
    setIsFormValid(
      address.trim() !== '' && 
      city.trim() !== '' && 
      state.trim() !== '' && 
      zipCode.trim() !== ''
    );
  }, [formData]);

  return (
    <OnboardingCard 
      title="Your Business Address" 
      description="Please enter your business address for billing and legal purposes."
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="address" className="text-white">Street Address</Label>
          <div className="relative">
            <Input
              id="address"
              placeholder="123 Business Ave"
              value={formData.address}
              onChange={(e) => updateFormData({ address: e.target.value })}
              className="bg-black/40 border-white/20 text-white pl-10 placeholder:text-gray-500"
            />
            <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city" className="text-white">City</Label>
            <Input
              id="city"
              placeholder="City"
              value={formData.city}
              onChange={(e) => updateFormData({ city: e.target.value })}
              className="bg-black/40 border-white/20 text-white placeholder:text-gray-500"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="state" className="text-white">State</Label>
            <Input
              id="state"
              placeholder="State"
              value={formData.state}
              onChange={(e) => updateFormData({ state: e.target.value })}
              className="bg-black/40 border-white/20 text-white placeholder:text-gray-500"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="zipCode" className="text-white">ZIP Code</Label>
            <Input
              id="zipCode"
              placeholder="Zip Code"
              value={formData.zipCode}
              onChange={(e) => updateFormData({ zipCode: e.target.value })}
              className="bg-black/40 border-white/20 text-white placeholder:text-gray-500"
            />
          </div>
        </div>
      </div>
      
      <OnboardingActions onNext={onNext} onBack={onBack} disableNext={!isFormValid} />
    </OnboardingCard>
  );
}
