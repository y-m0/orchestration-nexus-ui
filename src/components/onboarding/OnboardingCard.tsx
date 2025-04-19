
import { useIsMobile } from "@/hooks/use-mobile";

interface OnboardingCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function OnboardingCard({ title, description, children }: OnboardingCardProps) {
  const isMobile = useIsMobile();
  
  return (
    <div className="w-full bg-black/40 backdrop-blur-lg border border-white/10 rounded-lg shadow-xl overflow-hidden">
      <div className={`${isMobile ? "px-5 py-6" : "px-8 py-8"}`}>
        <h1 className="text-2xl md:text-3xl font-bold text-gradient mb-3">{title}</h1>
        {description && (
          <p className="text-gray-300 mb-6">{description}</p>
        )}
        {children}
      </div>
    </div>
  );
}
