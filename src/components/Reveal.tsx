import type { ReactNode } from "react";
import { useInView, usePrefersReducedMotion } from "../lib/hooks";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms. */
  delay?: number;
}

/** Scroll-triggered rise-and-fade wrapper. Renders instantly under reduced motion. */
export default function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = usePrefersReducedMotion();
  const shown = inView || reduced;

  return (
    <div
      ref={ref}
      style={{ transitionDelay: shown && !reduced ? `${delay}ms` : "0ms" }}
      className={`transition-all duration-700 ease-out will-change-transform ${
        shown ? "translate-y-0 opacity-100" : "translate-y-7 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}
