import { motion } from "framer-motion";
import { ArrowRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const FinalCTA = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-accent/8 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center relative z-10"
      >
        <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Start Building the
          <br />
          <span className="glow-text">Best Version of Yourself</span>
        </h2>
        <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
          Join thousands who are using data-driven self-mastery to unlock peak performance, emotional balance, and lasting discipline.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="text-base px-8 h-13 rounded-xl font-semibold gap-2 shadow-[0_0_30px_-5px_hsl(var(--primary)/0.4)]">
            Download Now <ArrowRight className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="lg" className="text-base px-8 h-13 rounded-xl font-semibold gap-2 border-border/60 bg-secondary/40 hover:bg-secondary/60">
            <Users className="w-4 h-4" /> Join Beta
          </Button>
        </div>

        <p className="text-muted-foreground text-sm mt-8">Free to start · No credit card required · Available on iOS & Android</p>
      </motion.div>
    </section>
  );
};

export default FinalCTA;
