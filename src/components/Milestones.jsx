import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MILESTONES } from "../data/content.js";
import { EASE, useRevealProps } from "../lib/anim.js";

export default function Milestones() {
  const trackRef = useRef(null);
  const reduce = useReducedMotion();
  const head = useRevealProps();

  const scroll = (dir) => {
    trackRef.current?.scrollBy({ left: dir * 380, behavior: "smooth" });
  };

  return (
    <section className="milestones" id="milestones">
      <div className="wrap">
        <motion.div className="section-head split" {...head}>
          <div>
            <div className="eyebrow">
              <span className="pulse-dot" />
              <span>Chronicles of Hegemony</span>
            </div>
            <h2 className="section-title">Turning Points of the Sengoku Era</h2>
            <p className="section-sub">
              From the torrential downpour ambush at Okehazama to the fiery
              betrayal at Honnō-ji, explore the pivotal maneuvers that fractured
              the old order.
            </p>
          </div>
          <div className="carousel-nav">
            <button
              className="carousel-btn prev"
              type="button"
              aria-label="Previous Milestone"
              onClick={() => scroll(-1)}
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <button
              className="carousel-btn next"
              type="button"
              aria-label="Next Milestone"
              onClick={() => scroll(1)}
            >
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </motion.div>

        <div className="track" ref={trackRef}>
          {MILESTONES.map((m, i) => (
            <motion.article
              className="m-card"
              key={m.year + m.title}
              initial={reduce ? false : { opacity: 0, x: 48 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: Math.min(i, 4) * 0.08, ease: EASE }}
              viewport={{ once: true, amount: 0.25 }}
            >
              <div>
                <div className="m-top">
                  <span className={`m-year${m.yearRed ? " red" : ""}`}>{m.year}</span>
                  <span className={`m-tag${m.tagTone ? ` ${m.tagTone}` : ""}`}>{m.tag}</span>
                </div>
                <div className={`m-bar${m.barRed ? " red" : ""}`} />
                <h3 className="m-name">{m.title}</h3>
                <span className="m-jp">{m.jp}</span>
                <p className="m-desc">{m.desc}</p>
              </div>
              <div className="m-stats">
                <div>
                  <small>{m.stat1label}</small>
                  <strong className={m.stat1Tone}>{m.stat1}</strong>
                </div>
                <div style={{ textAlign: "right" }}>
                  <small>{m.stat2label}</small>
                  <strong className={m.stat2Tone}>{m.stat2}</strong>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
