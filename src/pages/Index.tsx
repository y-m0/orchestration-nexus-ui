
import { LandingLayout } from "@/components/layout/LandingLayout";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesCarousel } from "@/components/landing/FeaturesCarousel";
import { DemoPreview } from "@/components/landing/DemoPreview";
import { UseCases } from "@/components/landing/UseCases";
import { Testimonials } from "@/components/landing/Testimonials";
import { CallToAction } from "@/components/landing/CallToAction";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Index() {
  return (
    <LandingLayout>
      <div className="flex flex-col w-full">
        <div className="absolute top-4 right-4 z-10">
          <Button asChild size="sm" variant="outline" className="border-purple-500/30 bg-background/60 backdrop-blur-sm">
            <Link to="/login">Login</Link>
          </Button>
        </div>
        <HeroSection />
        <FeaturesCarousel />
        <UseCases />
        <HowItWorks />
        <DemoPreview />
        <Testimonials />
        <CallToAction />
      </div>
    </LandingLayout>
  );
}
