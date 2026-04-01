import { motion } from "framer-motion";
import {
  Smile, Zap, CheckSquare, Moon, Smartphone,
  Sparkles, Gauge, TrendingUp, BarChart3
} from "lucide-react";

const features = [
  { icon: Smile, title: "Mood & Mental State", description: "Log emotions, energy, and mental clarity throughout the day", color: "from-emerald-500/20 to-emerald-500/5" },
  { icon: Zap, title: "Productivity Sessions", description: "Track deep work, focus blocks, and output quality", color: "from-amber-500/20 to-amber-500/5" },
  { icon: CheckSquare, title: "Habit & Task Management", description: "Build streaks, set goals, and manage daily tasks", color: "from-blue-500/20 to-blue-500/5" },
  { icon: Moon, title: "Sleep & Recovery", description: "Monitor sleep quality, duration, and recovery patterns", color: "from-indigo-500/20 to-indigo-500/5" },
  { icon: Smartphone, title: "Screen Time Discipline", description: "Track digital consumption and reduce dopamine overload", color: "from-rose-500/20 to-rose-500/5" },
  { icon: Sparkles, title: "Meditation & Spiritual", description: "Log meditation, gratitude, and mindfulness practice", color: "from-violet-500/20 to-violet-500/5" },
  { icon: Gauge, title: "Dopamine Load Scores", description: "Understand your daily stimulation levels and regulate them", color: "from-orange-500/20 to-orange-500/5" },
  { icon: TrendingUp, title: "Daily Performance Scores", description: "Get a single score reflecting your overall daily performance", color: "from-cyan-500/20 to-cyan-500/5" },
  { icon: BarChart3, title: "Advanced Analytics", description: "Deep behavioral insights, trends, correlations, and predictions", color: "from-pink-500/20 to-pink-500/5" },
];

const Features = () => {
  return (
    <section className="section-padding relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest mb-4 block">Features</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            Everything You Need to <span className="glow-text">Evolve</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A complete behavioral operating system — designed for people who take their growth seriously.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="glass-card-hover p-6 group"
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <f.icon className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
