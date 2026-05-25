import { motion } from "framer-motion";
import { PROJECTS } from "./data";

/**
 * MockSite — a tall, realistic procedurally-rendered website mock.
 * Generates ~1800px of "real" website content so the hover scroll
 * animation has meaningful content to reveal inside a fixed-height card.
 */
function MockSite({ p }: { p: (typeof PROJECTS)[number] }) {
  const slug = p.title.toLowerCase().replace(/[^a-z]+/g, "");
  return (
    <div
      className="w-full rounded-xl overflow-hidden border border-foreground/10"
      style={{
        background: `linear-gradient(180deg, ${p.accent}1a, transparent 14%), linear-gradient(180deg, #ffffff, #f4f4f5)`,
        color: "#0a0a0a",
      }}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-black/10 bg-white">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-[9px] text-black/50 truncate">{slug}.com</span>
      </div>

      {/* Site nav */}
      <div className="flex items-center justify-between px-5 py-3 bg-white border-b border-black/5">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-md" style={{ background: p.accent }} />
          <div className="text-[11px] font-semibold">{p.title}</div>
        </div>
        <div className="flex gap-3">
          {["Home", "About", "Services", "Contact"].map((l) => (
            <span key={l} className="text-[9px] text-black/60">{l}</span>
          ))}
        </div>
        <div className="h-5 w-14 rounded text-[8px] grid place-items-center text-white" style={{ background: p.accent }}>Get Started</div>
      </div>

      {/* Hero */}
      <div className="relative px-6 py-8 bg-gradient-to-br from-white to-zinc-100">
        <div className="text-[8px] uppercase tracking-widest text-black/50">{p.category}</div>
        <div className="mt-2 text-[20px] font-bold leading-tight">{p.title}</div>
        <div className="mt-2 text-[10px] text-black/60 max-w-[80%]">{p.desc}</div>
        <div className="mt-4 flex gap-2">
          <div className="h-7 px-3 rounded text-[9px] grid place-items-center text-white" style={{ background: p.accent }}>Explore</div>
          <div className="h-7 px-3 rounded text-[9px] grid place-items-center border border-black/15">Learn more</div>
        </div>
        <div className="mt-5 h-28 rounded-lg" style={{ background: `linear-gradient(135deg, ${p.accent}, #1a1a1a)` }} />
      </div>

      {/* Feature grid */}
      <div className="px-6 py-6 bg-white">
        <div className="text-[8px] uppercase tracking-widest text-black/50">Features</div>
        <div className="text-[14px] font-bold mt-1">Built for performance</div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="rounded-md border border-black/10 p-2">
              <div className="h-3 w-3 rounded" style={{ background: p.accent }} />
              <div className="mt-2 h-1.5 w-3/4 rounded bg-black/20" />
              <div className="mt-1 h-1.5 w-1/2 rounded bg-black/10" />
            </div>
          ))}
        </div>
      </div>

      {/* Stats band */}
      <div className="px-6 py-6 text-white" style={{ background: `linear-gradient(135deg, #0f0f10, ${p.accent})` }}>
        <div className="grid grid-cols-4 gap-3">
          {[["120+", "Projects"], ["98", "PageSpeed"], ["34", "Countries"], ["5.0", "Rated"]].map(([v, l]) => (
            <div key={l}>
              <div className="text-[16px] font-bold">{v}</div>
              <div className="text-[8px] opacity-80">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Product / content cards */}
      <div className="px-6 py-6 bg-zinc-50">
        <div className="text-[8px] uppercase tracking-widest text-black/50">Featured</div>
        <div className="text-[14px] font-bold mt-1">Latest collection</div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="rounded-lg overflow-hidden bg-white border border-black/10">
              <div className="h-20" style={{ background: `linear-gradient(135deg, ${p.accent}55, #111)` }} />
              <div className="p-2">
                <div className="h-1.5 w-3/4 rounded bg-black/20" />
                <div className="mt-1 flex justify-between items-center">
                  <div className="h-1.5 w-10 rounded bg-black/10" />
                  <div className="text-[8px] font-bold" style={{ color: p.accent }}>$249</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial */}
      <div className="px-6 py-7 bg-white border-t border-black/5">
        <div className="text-[8px] uppercase tracking-widest text-black/50">Trusted by</div>
        <div className="mt-2 text-[12px] italic text-black/80">"A masterpiece — fast, beautiful, and built right."</div>
        <div className="mt-2 flex items-center gap-2">
          <div className="h-5 w-5 rounded-full" style={{ background: p.accent }} />
          <div className="text-[9px]">Daniel H. · CEO</div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 py-8 text-center text-white" style={{ background: "#0a0a0a" }}>
        <div className="text-[14px] font-bold">Ready to launch?</div>
        <div className="text-[9px] opacity-70 mt-1">Let's build something unforgettable.</div>
        <div className="mt-3 inline-block h-7 px-4 rounded-full text-[9px] leading-7 text-white" style={{ background: p.accent }}>
          Hire Ahsan →
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-5 bg-zinc-900 text-zinc-400 grid grid-cols-3 gap-3 text-[8px]">
        <div>© {p.title}</div>
        <div className="text-center">Crafted by Muhammad Ahsan</div>
        <div className="text-right">Lahore, PK</div>
      </div>
    </div>
  );
}

function Card({ p, i }: { p: (typeof PROJECTS)[number]; i: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-3xl border border-foreground/10 bg-card overflow-hidden hover:ring-ember-glow transition-shadow"
    >
      {/* Fixed-height viewport — only the hero is visible initially.
          On hover, the inner tall mock translates upward to reveal the
          entire site smoothly from top to bottom. */}
      <div className="relative h-[420px] overflow-hidden bg-surface-2">
        <div className="absolute inset-x-4 top-4 bottom-4 rounded-xl overflow-hidden ring-1 ring-foreground/10 shadow-2xl">
          <div
            className="will-change-transform"
            style={{
              transition: "transform 6s cubic-bezier(0.22, 1, 0.36, 1)",
              transform: "translateY(0%)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              // Calculate exact scroll distance so the bottom of the mock
              // lines up with the bottom of the viewport.
              const parent = el.parentElement!;
              const distance = el.scrollHeight - parent.clientHeight;
              el.style.transition = "transform 6s cubic-bezier(0.22, 1, 0.36, 1)";
              el.style.transform = `translateY(-${distance}px)`;
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.transition = "transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)";
              el.style.transform = "translateY(0px)";
            }}
          >
            <MockSite p={p} />
          </div>
        </div>
        {/* Top tag */}
        <div className="absolute top-6 left-6 z-10 inline-flex items-center gap-2 rounded-full bg-background/85 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-widest text-foreground/80 border border-foreground/10">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: p.accent, boxShadow: `0 0 10px ${p.accent}` }} />
          {p.tag}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{p.category}</span>
          <a href={p.href} className="text-xs text-ember hover:underline">View →</a>
        </div>
        <h3 className="mt-2 text-xl font-semibold">{p.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
      </div>
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