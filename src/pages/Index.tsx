
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a192f] to-black relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="stars-sm"></div>
        <div className="stars-md"></div>
        <div className="stars-lg"></div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6 text-gradient">
            Orchestration Nexus
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Streamline your operations with our cutting-edge orchestration platform.
            Manage agents, build workflows, and monitor activity all in one place.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Link to="/login">
                Sign In
              </Link>
            </Button>
            <Button variant="outline" asChild size="lg" 
              className="border-white/20 text-white hover:bg-white/10">
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
