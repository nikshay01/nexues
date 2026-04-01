import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Alex Chen",
    role: "Software Engineer",
    quote: "Nexues made me realize how much time I was leaking into dopamine traps. In 3 weeks, my deep work sessions doubled. This app changed my relationship with productivity.",
    avatar: "AC",
  },
  {
    name: "Sarah Mitchell",
    role: "Founder & CEO",
    quote: "I've tried every habit tracker. Nexues is the first one that actually shows me *why* I have good and bad days. The analytics are game-changing.",
    avatar: "SM",
  },
  {
    name: "David Park",
    role: "Medical Resident",
    quote: "Sleep tracking + mood correlation blew my mind. I discovered that my worst anxiety days correlated with screen time spikes. Now I have data to fix it.",
    avatar: "DP",
  },
];

const Testimonials = () => {
  return (
    <section className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest mb-4 block">Testimonials</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            Loved by <span className="glow-text">Optimizers</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="glass-card-hover p-6 flex flex-col"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-secondary-foreground text-sm leading-relaxed flex-1 mb-6">"{t.quote}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-sm font-bold">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-muted-foreground text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
