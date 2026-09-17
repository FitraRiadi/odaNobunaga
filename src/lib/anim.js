import { useReducedMotion } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];
export const VIEWPORT = { once: true, margin: "-80px" };

// Props fade-up on-scroll. Panggil sekali per komponen,
// lalu override `transition.delay` / `viewport` per item bila perlu.
// Kalau reduced-motion: return {} = tampil statis, tanpa animasi.
export function useRevealProps(delay = 0, y = 28) {
  const reduce = useReducedMotion();
  if (reduce) return {};
  return {
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: VIEWPORT,
    transition: { duration: 0.7, delay, ease: EASE },
  };
}
