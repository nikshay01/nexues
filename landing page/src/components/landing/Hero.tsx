import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import dashboardPreview from "@/assets/dashboard-preview.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center section-padding overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Now in Beta — Join 2,400+ early adopters
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-6"
        >
          Master Your Mind.
          <br />
          <span className="glow-text">Track Your Life.</span>
          <br />
          Optimize Your Future.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Nexues converts your daily behaviors into measurable growth. Track mood, habits, sleep, productivity — and watch yourself evolve.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Button size="lg" className="text-base px-8 h-13 rounded-xl font-semibold gap-2 shadow-[0_0_30px_-5px_hsl(var(--primary)/0.4)]">
            Download App <ArrowRight className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="lg" className="text-base px-8 h-13 rounded-xl font-semibold gap-2 border-border/60 bg-secondary/40 hover:bg-secondary/60">
            <Play className="w-4 h-4" /> Watch Demo
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
          <div className="glass-card p-2 md:p-3 shadow-2xl shadow-primary/5">
            <img
              src={dashboardPreview}
              alt="Nexues Analytics Dashboard showing mood tracking, habit streaks, and performance scores"
              className="w-full rounded-xl"
              width={1280}
              height={800}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
