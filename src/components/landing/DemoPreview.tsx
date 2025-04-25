
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AnimatedWorkflow } from "./AnimatedWorkflow";

export function DemoPreview() {
  return (
    <section className="py-20 px-4" id="demo">
      <motion.div 
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
          See It In Action
        </h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
          Experience the power of Orchestration Nexus with our interactive demo. Build workflows, trigger LLMs, and manage approvals.
        </p>

        <div className="relative max-w-5xl mx-auto">
          <AnimatedWorkflow />
          
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-4">Build Your First Workflow</h3>
              <Button asChild>
                <Link to="/onboarding">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
