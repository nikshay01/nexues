import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 bg-background/60 backdrop-blur-xl border-b border-border/30"
    >
      <span className="font-display text-xl font-bold tracking-tight">
        <span className="glow-text">N</span>exues
      </span>
      <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
        <a href="#features" className="hover:text-foreground transition-colors">Features</a>
        <a href="#analytics" className="hover:text-foreground transition-colors">Analytics</a>
        <a href="#results" className="hover:text-foreground transition-colors">Results</a>
      </div>
      <Button size="sm" className="rounded-lg font-semibold text-sm">Get Started</Button>
    </motion.nav>
  );
};

export default Navbar;
