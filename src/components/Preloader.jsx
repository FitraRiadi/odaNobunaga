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
        exit={
          reduce
            ? undefined
            : { opacity: 0, scale: 1.25, transition: { duration: 0.3, ease: "easeIn" } }
        }
      >
        <motion.img
          className="preloader-mark"
          src="/oda-clan.svg"
          alt=""
          initial={reduce ? false : { opacity: 0, scale: 0.6, rotate: 0 }}
          animate={reduce ? undefined : { opacity: 1, scale: 1, rotate: 360 }}
          transition={
            reduce
              ? undefined
              : {
                  opacity: { duration: 0.6 },
                  scale: { duration: 0.6, ease: EASE },
                  rotate: { duration: 2.8, ease: "linear", repeat: Infinity },
                }
          }
        />
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
