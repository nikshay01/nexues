import { motion } from "framer-motion";
import { TrendingUp, Flame, Target, BarChart3, ArrowUp } from "lucide-react";

const metrics = [
  { label: "Performance Score", value: "87", change: "+12%", icon: Target },
  { label: "Habit Streak", value: "23 days", change: "+5 days", icon: Flame },
  { label: "Discipline Index", value: "91%", change: "+8%", icon: TrendingUp },
  { label: "Weekly Growth", value: "4.2x", change: "+1.3x", icon: BarChart3 },
];

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const moodData = [65, 72, 58, 80, 76, 85, 90];
const productivityData = [70, 60, 75, 82, 68, 88, 85];

const Dashboard = () => {
  return (
    <section className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest mb-4 block">Analytics</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            Your Life, <span className="glow-text">Quantified</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Beautiful dashboards that turn raw behavior into actionable intelligence.
          </p>
        </motion.div>

        {/* Metrics row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <m.icon className="w-5 h-5 text-muted-foreground" />
                <span className="text-xs font-medium text-primary flex items-center gap-1">
                  <ArrowUp className="w-3 h-3" /> {m.change}
                </span>
              </div>
              <p className="font-display text-2xl font-bold">{m.value}</p>
              <p className="text-muted-foreground text-xs mt-1">{m.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6"
          >
            <h3 className="font-display font-semibold mb-6">Mood & Energy Trend</h3>
            <div className="flex items-end justify-between h-40 gap-2">
              {moodData.map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full rounded-lg bg-gradient-to-t from-primary/60 to-primary/20 transition-all duration-500"
                    style={{ height: `${val}%` }}
                  />
                  <span className="text-xs text-muted-foreground">{weekDays[i]}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6"
          >
            <h3 className="font-display font-semibold mb-6">Productivity Output</h3>
            <div className="flex items-end justify-between h-40 gap-2">
              {productivityData.map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full rounded-lg bg-gradient-to-t from-accent/60 to-accent/20 transition-all duration-500"
                    style={{ height: `${val}%` }}
                  />
                  <span className="text-xs text-muted-foreground">{weekDays[i]}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
