
import { useState } from "react";
import { OnboardingCard } from "@/components/onboarding/OnboardingCard";
import { OnboardingActions } from "@/components/onboarding/OnboardingActions";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useIsMobile } from "@/hooks/use-mobile";

interface StepBusinessSizeProps {
  formData: {
    businessSize: string;
  };
  updateFormData: (data: Partial<{ businessSize: string }>) => void;
  onNext: () => void;
  onBack: () => void;
}

type BusinessSizeOption = {
  id: string;
  label: string;
  description: string;
};

export function StepBusinessSize({ formData, updateFormData, onNext, onBack }: StepBusinessSizeProps) {
  const isMobile = useIsMobile();
  
  const businessSizes: BusinessSizeOption[] = [
    { id: "solo", label: "Solo", description: "Just myself" },
    { id: "small", label: "Small Team", description: "2-10 employees" },
    { id: "medium", label: "Medium Business", description: "11-50 employees" },
    { id: "large", label: "Large Business", description: "51-200 employees" },
    { id: "enterprise", label: "Enterprise", description: "201+ employees" }
  ];

  const handleSelect = (businessSize: string) => {
    updateFormData({ businessSize });
  };

  return (
    <OnboardingCard 
      title="What's your business size?" 
      description="This helps us recommend the right resources for your team."
    >
      <div className="space-y-3 mt-4">
        {businessSizes.map((size) => {
          const isSelected = formData.businessSize === size.id;
          
          return (
            <div
              key={size.id}
              className={`p-4 rounded-md border cursor-pointer transition-all
                ${isSelected 
                  ? "bg-gradient-to-r from-blue-900/40 to-purple-900/40 border-blue-400" 
                  : "bg-black/20 border-white/10 hover:bg-white/5"}`}
              onClick={() => handleSelect(size.id)}
            >
              <div className="flex items-center">
                <Checkbox 
                  checked={isSelected}
                  onCheckedChange={() => handleSelect(size.id)}
                  className="border-white/50 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                />
                <div className="ml-3">
                  <Label htmlFor={size.id} className="text-white font-medium cursor-pointer">
                    {size.label}
                  </Label>
                  <p className="text-gray-400 text-sm">{size.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <OnboardingActions 
        onNext={onNext} 
        onBack={onBack} 
        disableNext={!formData.businessSize}
      />
    </OnboardingCard>
  );
}
