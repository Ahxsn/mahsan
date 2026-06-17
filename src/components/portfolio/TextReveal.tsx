import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef, type ReactNode } from "react";

/**
 * Scroll-driven word-by-word reveal. Each word fades from muted to
 * full foreground colour as the line crosses the viewport — same
 * technique used by Apple and Linear on their marketing sites.
 */
export function TextReveal({ children, className = "" }: { children: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.25"],
  });
  const words = children.split(" ");
  return (
    <p ref={ref} className={`flex flex-wrap gap-x-2 gap-y-1 ${className}`}>
      {words.map((w, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {w}
          </Word>
        );
      })}
    </p>
  );
}

function Word({ children, progress, range }: { children: ReactNode; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const y = useTransform(progress, range, [8, 0]);
  return (
    <motion.span style={{ opacity, y }} className="inline-block">
      {children}
    </motion.span>
  );
}