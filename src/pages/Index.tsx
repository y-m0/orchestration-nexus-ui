
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6 text-foreground">
            Orchestration Nexus
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Streamline your operations with our cutting-edge orchestration platform.
            Manage agents, build workflows, and monitor activity all in one place.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg">
              <Link to="/login">
                Sign In
              </Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link to="/onboarding">
                Create an Account
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
