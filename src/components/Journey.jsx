import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { JOURNEY_NODES } from "../data/content.js";
import { EASE, useRevealProps } from "../lib/anim.js";

export default function Journey() {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const reduce = useReducedMotion();
  const head = useRevealProps();
  const storyRef = useRef(null);
  const node = JOURNEY_NODES[index];

  const scrollToStory = () => {
    storyRef.current?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "nearest",
    });
  };

  const select = (i) => {
    // Klik node langsung antar ke kartu penjelasan.
    scrollToStory();
    if (i === index) return;
    setFading(true);
    window.setTimeout(() => {
      setIndex(i);
      setFading(false);
    }, 150);
  };

  return (
    <section className="journey" id="journey">
      <div className="journey-kanji" aria-hidden="true">
        覇道
      </div>
      <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
        <motion.div className="journey-head" {...head}>
          <div className="eyebrow gold">
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>timeline</span>
            <span>Interactive Strategic Trajectory</span>
          </div>
          <h2 className="section-title" style={{ color: "var(--on-surface)" }}>
            The Path to Hegemony{" "}
            <span style={{ fontSize: "0.6em", color: "var(--gold)" }}>(覇王の軌跡)</span>
          </h2>
          <p className="section-sub" style={{ textAlign: "center" }}>
            Follow the glowing path of unbending will. Click or hover any tactical
            node to reveal secret archives, troop disbursements, and excerpts from
            the Shinchō Kōki.
          </p>
        </motion.div>

        <div className="journey-path" aria-hidden="false">
          <svg viewBox="0 0 1100 480" fill="none">
            <defs>
              <linearGradient id="journeyGlow" x1="0%" x2="100%" y1="0%" y2="0%">
                <stop offset="0%" stopColor="#c53d26" stopOpacity="0.8" />
                <stop offset="35%" stopColor="#ecc06c" stopOpacity="0.9" />
                <stop offset="70%" stopColor="#ffb4a6" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#ecc06c" stopOpacity="1" />
              </linearGradient>
            </defs>
            <path
              d="M 80 380 C 240 380, 260 140, 420 140 C 580 140, 600 360, 780 340 C 920 320, 960 180, 1030 180"
              stroke="#353437"
              strokeDasharray="8 8"
              strokeLinecap="round"
              strokeWidth="4"
            />
            <motion.path
              d="M 80 380 C 240 380, 260 140, 420 140 C 580 140, 600 360, 780 340 C 920 320, 960 180, 1030 180"
              stroke="url(#journeyGlow)"
              strokeLinecap="round"
              strokeWidth="5"
              initial={reduce ? false : { pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </svg>
          {JOURNEY_NODES.map((n, i) => (
            <motion.button
              key={n.year}
              type="button"
              className={`j-node${n.red ? " red" : ""}`}
              style={{ left: n.x, top: n.y }}
              onClick={() => select(i)}
              aria-label={`${n.year} ${n.short}`}
              initial={reduce ? false : { opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.9 + i * 0.15, ease: EASE }}
            >
              <span className="j-node-circle">{n.kanji}</span>
              <small>
                {n.year} • {n.place}
              </small>
              <span>{n.short}</span>
            </motion.button>
          ))}
        </div>

        <div className="journey-mobile">
          {JOURNEY_NODES.map((n, i) => (
            <motion.button
              key={n.year}
              type="button"
              className={n.red ? "red" : ""}
              onClick={() => select(i)}
              initial={reduce ? false : { opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
            >
              <span>
                Node {i + 1}: {n.year} {n.short}
              </span>
              <span className="material-symbols-outlined">chevron_right</span>
            </motion.button>
          ))}
        </div>

        <motion.div ref={storyRef} {...head}>
        <div className={`story-card${fading ? " fading" : ""}`}>
          <div className="story-grid">
            <div>
              <div className="story-meta">
                <span className="story-phase">{node.tag}</span>
                <span className="story-date">{node.date}</span>
              </div>
              <h3 className="story-name">{node.title}</h3>
              <p className="story-desc">{node.desc}</p>
              <div className="story-quote">
                <p>{node.quote}</p>
                <small>— Shinchō Kōki (信長公記, Records of Lord Nobunaga)</small>
              </div>
            </div>
            <div className="story-metrics">
              <div className="metrics-head">
                <span>Tactical Metrics</span>
                <span className="material-symbols-outlined" style={{ color: "var(--gold)", fontSize: 18 }}>
                  query_stats
                </span>
              </div>
              <div className="metrics-row">
                <span>{node.stat1label}</span>
                <strong className={node.stat1Tone}>{node.stat1}</strong>
              </div>
              <div className="metrics-row">
                <span>{node.stat2label}</span>
                <strong className={node.stat2Tone}>{node.stat2}</strong>
              </div>
              <div className="metrics-row">
                <span>{node.stat3label}</span>
                <strong className={node.stat3Tone}>{node.stat3}</strong>
              </div>
            </div>
          </div>
        </div>
        </motion.div>
      </div>
    </section>
  );
}
