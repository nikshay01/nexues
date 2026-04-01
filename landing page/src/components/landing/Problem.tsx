import { motion } from "framer-motion";
import { AlertTriangle, Brain, Clock, Eye, BarChart3, Shuffle } from "lucide-react";

const painPoints = [
  { icon: Shuffle, title: "Inconsistent Discipline", description: "You start strong but can't sustain momentum beyond a few days" },
  { icon: Brain, title: "Lack of Self-Awareness", description: "You don't truly know what drives your best and worst days" },
  { icon: Clock, title: "Poor Habit Tracking", description: "Scattered notes, forgotten goals, no accountability system" },
  { icon: AlertTriangle, title: "Mental Clutter", description: "Overwhelmed by thoughts, tasks, and decisions with no clarity" },
  { icon: Eye, title: "Wasted Screen Time", description: "Hours disappear into dopamine loops without you noticing" },
  { icon: BarChart3, title: "No Visibility Into Progress", description: "You can't improve what you can't measure or see" },
];

const Problem = () => {
  return (
    <section className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest mb-4 block">The Problem</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            You're Flying <span className="glow-text">Blind</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Most people have no system to understand their own behavior. Without data, change is just guesswork.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {painPoints.map((point, i) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card-hover p-6 group"
            >
              <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center mb-4 group-hover:bg-destructive/20 transition-colors">
                <point.icon className="w-5 h-5 text-destructive" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{point.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{point.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problem;
