import { motion, useReducedMotion } from "framer-motion";
import { EASE, VIEWPORT } from "../lib/anim.js";

// Wrapper sekali pakai buat blok statis (header, footer, quote).
export function Reveal({ children, className, delay = 0, y = 28, ...rest }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
