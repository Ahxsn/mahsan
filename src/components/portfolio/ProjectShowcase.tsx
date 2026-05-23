import { motion } from "framer-motion";
import { PROJECTS } from "./data";

function MiniPreview({ p, tall = false }: { p: (typeof PROJECTS)[number]; tall?: boolean }) {
  return (
    <div
      className={`relative w-full rounded-xl overflow-hidden ${tall ? "h-[440px]" : "h-full"}`}
      style={{
        background: `linear-gradient(180deg, ${p.accent}15, transparent 30%), linear-gradient(180deg, var(--surface), var(--surface-2))`,
      }}
    >
      {/* Fake browser */}
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-foreground/10 bg-background/40">
        <span className="h-2 w-2 rounded-full bg-red-400/80" />
        <span className="h-2 w-2 rounded-full bg-amber-400/80" />
        <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
        <span className="ml-3 text-[10px] text-muted-foreground truncate">{p.title.toLowerCase().replace(/\s+/g, "")}.com</span>
      </div>
      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-2 w-20 rounded bg-foreground/15" />
          <div className="flex gap-1.5">
            <div className="h-2 w-8 rounded bg-foreground/15" />
            <div className="h-2 w-8 rounded bg-foreground/15" />
            <div className="h-2 w-8 rounded" style={{ background: p.accent }} />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-6 w-3/4 rounded" style={{ background: `linear-gradient(90deg, ${p.accent}, transparent)` }} />
          <div className="h-3 w-1/2 rounded bg-foreground/15" />
          <div className="h-3 w-2/3 rounded bg-foreground/10" />
        </div>
        <div className="flex gap-3">
          <div className="h-9 w-28 rounded-lg" style={{ background: p.accent }} />
          <div className="h-9 w-24 rounded-lg border border-foreground/20" />
        </div>
        <div className="grid grid-cols-3 gap-3 pt-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-lg border border-foreground/10 bg-background/40 p-3">
              <div className="h-12 rounded mb-2" style={{ background: `linear-gradient(135deg, ${p.accent}33, transparent)` }} />
              <div className="h-2 w-3/4 rounded bg-foreground/15 mb-1" />
              <div className="h-2 w-1/2 rounded bg-foreground/10" />
            </div>
          ))}
        </div>
        <div className="rounded-lg border border-foreground/10 bg-background/40 p-3 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{p.preview.tag}</div>
            <div className="text-sm font-medium">{p.preview.item}</div>
          </div>
          <div className="text-sm font-semibold" style={{ color: p.accent }}>{p.preview.price}</div>
        </div>
        {tall && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div className="h-24 rounded-lg" style={{ background: `linear-gradient(135deg, ${p.accent}22, transparent)` }} />
              <div className="h-24 rounded-lg bg-foreground/5" />
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-foreground/10 text-[10px] text-muted-foreground">
              <span>© {p.title}</span>
              <span>Crafted by Ahsan</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Card({ p, i }: { p: (typeof PROJECTS)[number]; i: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-3xl border border-foreground/10 bg-card overflow-hidden hover:ring-ember-glow transition-shadow"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
        <div className="absolute inset-0 p-5">
          <MiniPreview p={p} />
        </div>
        {/* Sliding full preview on hover */}
        <div className="absolute inset-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
          <div className="h-full overflow-hidden rounded-xl">
            <div className="animate-[scroll-preview_8s_ease-in-out_infinite_alternate]">
              <MiniPreview p={p} tall />
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-card to-transparent opacity-80 group-hover:opacity-0 transition-opacity" />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{p.category}</span>
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: p.accent, boxShadow: `0 0 12px ${p.accent}` }} />
        </div>
        <h3 className="mt-2 text-xl font-semibold">{p.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
      </div>
      <style>{`@keyframes scroll-preview{from{transform:translateY(0)}to{transform:translateY(-40%)}}`}</style>
    </motion.article>
  );
}

export function ProjectShowcase() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {PROJECTS.map((p, i) => <Card key={p.title} p={p} i={i} />)}
    </div>
  );
}