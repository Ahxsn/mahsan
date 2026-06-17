import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * Page-wide floating decorative blobs that drift, rotate and parallax
 * as the user scrolls — connecting sections with continuous motion.
 * Purely decorative, pointer-events disabled, low opacity.
 */
export function FloatingElements() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], ["0vh", "-60vh"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0vh", "-120vh"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0vh", "-200vh"]);
  const r1 = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const r2 = useTransform(scrollYProgress, [0, 1], [0, -240]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <motion.div
        style={{ y: y1, rotate: r1 }}
        className="absolute left-[8%] top-[18%] h-40 w-40 rounded-[36%] bg-ember/15 blur-2xl"
      />
      <motion.div
        style={{ y: y2, rotate: r2 }}
        className="absolute right-[10%] top-[42%] h-56 w-56 rounded-full bg-ember-glow/15 blur-3xl"
      />
      <motion.div
        style={{ y: y3, rotate: r1 }}
        className="absolute left-[55%] top-[78%] h-32 w-32 rounded-3xl bg-foreground/10 blur-2xl"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute left-[20%] top-[140%] h-48 w-48 rounded-full border border-ember/30"
      />
      <motion.div
        style={{ y: y1, rotate: r2 }}
        className="absolute right-[18%] top-[200%] h-36 w-36 rounded-[40%] bg-ember/10 blur-xl"
      />
    </div>
  );
}