import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "../lib/anim.js";

// Loader tirai: Mon emas di tengah, tanpa bar/progress.
// Abis payload + jeda, muncul "CLICK TO START" → klik user yang ngebuka
// tirai (klik = gestur resmi, jadi autoplay musik diizinkan browser).
// Dibungkus <AnimatePresence> di App — keluarnya: Mon fade,
// terus 2 panel background geser kebuka kiri-kanan.
export default function Preloader({ invited = false, onEnter }) {
  const reduce = useReducedMotion();
  return (
    <div
      className={`preloader${invited ? " invited" : ""}`}
      aria-hidden={!invited}
      role={invited ? "button" : undefined}
      tabIndex={invited ? 0 : undefined}
      aria-label={invited ? "Klik untuk mulai" : undefined}
      onClick={invited && onEnter ? onEnter : undefined}
      onKeyDown={
        invited && onEnter
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") onEnter();
            }
          : undefined
      }
    >
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
        {invited && (
          <motion.span
            className="preloader-start show"
            initial={false}
            animate={reduce ? { opacity: 1 } : { opacity: [0.35, 1, 0.35] }}
            transition={
              reduce ? { duration: 0.2 } : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
            }
          >
            Click To Start
          </motion.span>
        )}
        {!invited && (
          <span className="preloader-start" aria-hidden="true">
            Click To Start
          </span>
        )}
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
