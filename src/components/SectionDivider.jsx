import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

// Pembatas imperial antara hero & Chronicles.
// Parallax tipis (Framer useScroll) + reveal pas masuk viewport.
export default function SectionDivider() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [50, -50]);

  return (
    <div className="divider-strip" ref={ref} aria-hidden="true">
      <motion.div
        className="divider-enter"
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div className="divider-inner" style={{ y }}>
          <span className="divider-line" />
          <span className="divider-crest">◆</span>
          <span className="divider-label">天下布武 • TENKA FUBU</span>
          <span className="divider-crest">◆</span>
          <span className="divider-line" />
        </motion.div>
      </motion.div>
    </div>
  );
}
