
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface OnboardingActionsProps {
  onNext: () => void;
  onBack?: () => void;
  nextLabel?: string;
  isLastStep?: boolean;
  disableNext?: boolean;
}

export function OnboardingActions({ 
  onNext, 
  onBack, 
  nextLabel = "Continue", 
  isLastStep = false,
  disableNext = false 
}: OnboardingActionsProps) {
  const isMobile = useIsMobile();
  const { theme } = useTheme();
  
  // Determine if we're in dark/cosmic theme
  const isCosmicTheme = theme === "dark" || !theme;
  
  return (
    <div className={`flex ${isMobile ? "flex-col gap-3" : "flex-row justify-between"} mt-8`}>
      {onBack ? (
        <Button 
          variant={isCosmicTheme ? "outline" : "secondary"} 
          onClick={onBack}
          className={cn(
            isMobile ? "w-full" : "",
            isCosmicTheme && "border-white/20 text-white hover:bg-white/10 hover:text-white"
          )}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      ) : <div></div>}
      
      <Button 
        onClick={onNext} 
        disabled={disableNext}
        className={cn(
          isMobile ? "w-full" : "",
          isCosmicTheme 
            ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" 
            : ""
        )}
      >
        {isLastStep ? "Complete" : nextLabel}
        {!isLastStep && <ArrowRight className="ml-2 h-4 w-4" />}
      </Button>
    </div>
  );
}
