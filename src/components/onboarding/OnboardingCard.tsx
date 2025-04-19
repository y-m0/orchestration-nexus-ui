
import { useIsMobile } from "@/hooks/use-mobile";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface OnboardingCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function OnboardingCard({ title, description, children }: OnboardingCardProps) {
  const isMobile = useIsMobile();
  const { theme } = useTheme();
  
  return (
    <div className={cn(
      "w-full rounded-lg shadow-xl overflow-hidden",
      theme === "dark" || !theme
        ? "bg-black/40 backdrop-blur-lg border border-white/10" 
        : "bg-card border border-border"
    )}>
      <div className={`${isMobile ? "px-5 py-6" : "px-8 py-8"}`}>
        <h1 className={cn(
          "text-2xl md:text-3xl font-bold mb-3",
          theme === "dark" || !theme ? "text-gradient" : "text-foreground"
        )}>
          {title}
        </h1>
        {description && (
          <p className={cn(
            "mb-6",
            theme === "dark" || !theme ? "text-gray-300" : "text-muted-foreground"
          )}>
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}
