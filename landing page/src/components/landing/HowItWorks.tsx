import { motion } from "framer-motion";
import { ClipboardList, LineChart, Rocket } from "lucide-react";

const steps = [
  { icon: ClipboardList, step: "01", title: "Track Your Day", description: "Log mood, habits, sleep, screen time, and more in under 2 minutes." },
  { icon: LineChart, step: "02", title: "Analyze Patterns", description: "Nexues surfaces trends, correlations, and blind spots in your behavior." },
  { icon: Rocket, step: "03", title: "Improve & Grow", description: "Get actionable insights that compound into lasting life improvement." },
];

const HowItWorks = () => {
  return (
    <section className="section-padding">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest mb-4 block">How It Works</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            Simple. <span className="glow-text">Powerful.</span> Consistent.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px bg-gradient-to-r from-primary/40 via-accent/40 to-primary/40" />

          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center relative"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/20 flex items-center justify-center mx-auto mb-6 relative z-10">
                <s.icon className="w-7 h-7 text-primary" />
              </div>
              <span className="text-primary/40 text-sm font-mono font-bold">{s.step}</span>
              <h3 className="font-display text-xl font-bold mt-2 mb-3">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
