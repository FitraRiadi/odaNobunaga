import { motion, useReducedMotion } from "framer-motion";
import { EASE, VIEWPORT } from "../lib/anim.js";

export default function QuoteSection() {
  const reduce = useReducedMotion();
  const line = (delay) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: VIEWPORT,
          transition: { duration: 0.8, delay, ease: EASE },
        };
  return (
    <section className="atsumori" id="legacy">
      <div className="wrap">
        <div className="atsumori-card">
          <motion.div
            className="eyebrow gold"
            style={{ justifyContent: "center" }}
            {...line(0)}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>auto_stories</span>
            <span>Nobunaga&apos;s Beloved Noh Recitation</span>
          </motion.div>
          <motion.p className="atsumori-jp" {...line(0.12)}>
            人間五十年、下天の内をくらぶれば、
            <br />
            夢幻の如くなり
          </motion.p>
          <motion.p className="atsumori-en" {...line(0.24)}>
            &ldquo;A man&apos;s life of fifty years, weighed against the heavens —
            <br />
            it is but a fleeting dream, an illusion.&rdquo;
          </motion.p>
          <motion.p
            style={{ color: "var(--outline)", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase" }}
            {...line(0.36)}
          >
            Kowaka Atsumori — recited at Okehazama &amp; Honnō-ji
          </motion.p>
        </div>
      </div>
    </section>
  );
}
