import { motion } from "framer-motion";
import { Shield, Brain, Zap, Target, TrendingUp, Heart } from "lucide-react";

const benefits = [
  { icon: Target, stat: "37%", label: "Better discipline consistency in 30 days" },
  { icon: Brain, stat: "52%", label: "Improved emotional stability" },
  { icon: Zap, stat: "3.2x", label: "Reduced dopamine overload triggers" },
  { icon: TrendingUp, stat: "68%", label: "Stronger habit consistency" },
  { icon: Shield, stat: "41%", label: "Improved productivity output" },
  { icon: Heart, stat: "89%", label: "Users report better self-awareness" },
];

const Trust = () => {
  return (
    <section className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest mb-4 block">Results</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            Real Impact, <span className="glow-text">Measured</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Based on early adopter data from our beta community.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((b, i) => (
            <motion.div
              key={b.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card-hover p-6 text-center"
            >
              <b.icon className="w-8 h-8 text-primary mx-auto mb-4" />
              <p className="font-display text-4xl font-bold glow-text mb-2">{b.stat}</p>
              <p className="text-muted-foreground text-sm">{b.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trust;
