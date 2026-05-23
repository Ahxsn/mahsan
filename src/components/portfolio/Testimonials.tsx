import { motion } from "framer-motion";
import { TESTIMONIALS } from "./data";

function Avatar({ name, accent }: { name: string; accent: string }) {
  const initials = name.split(" ").map((p) => p[0]).slice(0, 2).join("");
  return (
    <div
      className="h-10 w-10 shrink-0 rounded-full grid place-items-center text-sm font-semibold text-white"
      style={{ background: `linear-gradient(135deg, ${accent}, var(--ember))` }}
    >
      {initials}
    </div>
  );
}

const ACCENTS = ["#ef4444", "#f43f5e", "#fb7185", "#dc2626", "#e11d48", "#f97316"];

export function Testimonials() {
  const cols = [TESTIMONIALS.filter((_, i) => i % 3 === 0), TESTIMONIALS.filter((_, i) => i % 3 === 1), TESTIMONIALS.filter((_, i) => i % 3 === 2)];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {cols.map((col, ci) => (
        <div key={ci} className="flex flex-col gap-5">
          {col.map((t, i) => {
            const accent = ACCENTS[(ci * 11 + i) % ACCENTS.length];
            return (
              <motion.figure
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: (i % 4) * 0.05 }}
                className="rounded-2xl border border-foreground/10 bg-card p-5 hover:ring-ember-glow transition-shadow"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Avatar name={t.name} accent={accent} />
                  <div className="min-w-0">
                    <div className="font-medium text-sm truncate">{t.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{t.role} · {t.country}</div>
                  </div>
                  <div className="ml-auto text-ember">
                    {"★★★★★".split("").map((s, k) => <span key={k}>{s}</span>)}
                  </div>
                </div>
                <blockquote className="text-sm leading-relaxed text-foreground/85">“{t.text}”</blockquote>
              </motion.figure>
            );
          })}
        </div>
      ))}
    </div>
  );
}