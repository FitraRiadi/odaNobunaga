import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "../lib/anim.js";

// Loader tirai: Mon emas di tengah, tanpa bar/progress.
// Dibungkus <AnimatePresence> di App — keluarnya: Mon fade,
// terus 2 panel background geser kebuka kiri-kanan.
export default function Preloader() {
  const reduce = useReducedMotion();
  return (
    <div className="preloader" aria-hidden="true">
      <motion.div
        className="preloader-mon"
        animate={
          reduce ? undefined : { opacity: [1, 0.55, 1], scale: [1, 1.05, 1] }
        }
        transition={
          reduce ? undefined : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
        }
        exit={
          reduce
            ? undefined
            : { opacity: 0, scale: 1.18, transition: { duration: 0.35, ease: "easeIn" } }
        }
      >
        <span className="preloader-mark">織</span>
      </motion.div>
      <motion.div
        className="preloader-curtain left"
        exit={
          reduce
            ? undefined
            : { x: "-104%", transition: { duration: 0.85, delay: 0.15, ease: EASE } }
        }
      />
      <motion.div
        className="preloader-curtain right"
        exit={
          reduce
            ? undefined
            : { x: "104%", transition: { duration: 0.85, delay: 0.15, ease: EASE } }
        }
      />
    </div>
  );
}
