import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FoldText from "./FoldText.jsx";

gsap.registerPlugin(ScrollTrigger);

const EASE_OUT = [0.22, 1, 0.36, 1];

const BADGES = [
  { icon: "verified", text: "TENKA FUBU • 天下布武", gold: true },
  { icon: "calendar_month", text: "ERA: 1534 — 1582 CE", gold: false },
  { icon: "shield", text: "ODA CLAN KAMON • 織田木瓜", gold: false },
];

export default function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);
  const kanjiRef = useRef(null);
  const eraRef = useRef(null);
  const titleRef = useRef(null);
  const castleLRef = useRef(null);
  const castleRRef = useRef(null);
  const figureRef = useRef(null);
  const badgesRef = useRef(null);

  // GSAP own scroll (scrub + pin). Framer own entrance di elemen anak
  // biar transform-nya gak rebutan.
  useLayoutEffect(() => {
    if (reduce) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=130%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
      tl.fromTo(titleRef.current, { y: 0, scale: 1, opacity: 1 }, { y: -140, scale: 1.15, opacity: 0 }, 0)
        .fromTo(castleLRef.current, { xPercent: 0, opacity: 1 }, { xPercent: -30, opacity: 0 }, 0)
        .fromTo(castleRRef.current, { xPercent: 0, opacity: 1 }, { xPercent: 30, opacity: 0 }, 0)
        .fromTo(figureRef.current, { y: 0, scale: 1, opacity: 1 }, { y: 200, scale: 1.08, opacity: 0 }, 0)
        .fromTo(kanjiRef.current, { scale: 1, opacity: 1 }, { scale: 1.35, opacity: 0 }, 0)
        .fromTo(eraRef.current, { xPercent: 0, opacity: 1 }, { xPercent: -8, opacity: 0 }, 0)
        .fromTo(badgesRef.current, { y: 0, opacity: 1 }, { y: 90, opacity: 0 }, 0);
    }, sectionRef);
    return () => ctx.revert();
  }, [reduce ]);

  // Kalau reduced-motion: entrance Framer di-skip (initial: false),
  // GSAP pin/scrub gak dipasang. Semua langsung tampil statis.

  // FoldText judul dimainkan sedikit telat (350ms) biar jalan
  // berurutan abis kana — ghost tak-kelihatan jaga layout biar gak shift.
  const [foldReady, setFoldReady] = useState(reduce);
  useEffect(() => {
    if (reduce) return;
    const t = window.setTimeout(() => setFoldReady(true), 350);
    return () => window.clearTimeout(t);
  }, [reduce]);

  return (
    <section ref={sectionRef} className="hero" id="overview">
      <div className="hero-bg" />
      <div className="hero-glow" />
      <motion.div
        className="hero-dust"
        aria-hidden="true"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1.4, delay: 1.2 }}
      >
        <svg width="100%" height="100%">
          <circle cx="15%" cy="30%" r="1.5" fill="#ecc06c">
            <animate attributeName="opacity" values="1;0.3;1" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="28%" cy="65%" r="2" fill="#ffb4a6">
            <animate attributeName="opacity" values="1;0.3;1" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="50%" cy="20%" r="1" fill="#ecc06c">
            <animate attributeName="opacity" values="1;0.3;1" dur="5s" repeatCount="indefinite" />
          </circle>
          <circle cx="72%" cy="40%" r="2" fill="#c53d26">
            <animate attributeName="opacity" values="1;0.3;1" dur="2.8s" repeatCount="indefinite" />
          </circle>
          <circle cx="85%" cy="75%" r="1.5" fill="#ecc06c">
            <animate attributeName="opacity" values="1;0.3;1" dur="4.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="62%" cy="80%" r="1.2" fill="#ecc06c">
            <animate attributeName="opacity" values="1;0.3;1" dur="3.5s" repeatCount="indefinite" />
          </circle>
        </svg>
      </motion.div>

      <div ref={kanjiRef} className="hero-kanji" aria-hidden="true">
        <div className="hero-kanji-shift">
        <motion.span
          className="hero-kanji-glyph"
          initial={reduce ? false : { opacity: 0, scale: 1.15, y: 40 }}
          animate={{ opacity: 0.04, scale: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.1, ease: EASE_OUT }}
        >
          武
        </motion.span>
        </div>
      </div>

      <div ref={eraRef} className="hero-era" aria-hidden="true">
        <motion.div
          className="hero-era-track"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          {[0, 1].map((half) => (
            <div className="hero-era-group" key={half} aria-hidden={half === 1}>
              {Array.from({ length: 3 }).map((_, i) => (
                <span key={i}>SENGOKU ERA ◆&nbsp;</span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      <div ref={titleRef} className="hero-title-block">
        <motion.span
          className="hero-kana"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: EASE_OUT }}
        >
          織 田 信 長 ・ 天 下 布 武
        </motion.span>
        <h1 className="hero-h1 hero-h1-fold">
          {foldReady ? (
            <FoldText
              text="ODA NOBUNAGA"
              splitBy="char"
              hinge="top"
              trigger="mount"
              duration={0.65}
              stagger={0.045}
              ease="power3.out"
              perspective={700}
              creaseShading={0.55}
              fontSize="inherit"
              fontWeight={700}
              color="transparent"
            />
          ) : (
            <span className="hero-h1-ghost" aria-hidden="true">
              ODA NOBUNAGA
            </span>
          )}
        </h1>
        <motion.div
          className="hero-divider"
          initial={reduce ? false : { opacity: 0, scaleX: 0.6 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.7, ease: EASE_OUT }}
        >
          <motion.span
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.85 }}
          >
            Demon King of the Sixth Heaven • 第六天魔王
          </motion.span>
        </motion.div>
      </div>

      <div ref={castleLRef} className="castle-wing left" aria-hidden="true">
        <motion.div
          initial={reduce ? false : { x: -120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.55, ease: EASE_OUT }}
        >
          <img src="/images/castle-left.png" alt="" />
        </motion.div>
      </div>
      <div ref={castleRRef} className="castle-wing right" aria-hidden="true">
        <motion.div
          initial={reduce ? false : { x: 120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.55, ease: EASE_OUT }}
        >
          <img src="/images/castle-right.png" alt="" />
        </motion.div>
      </div>

      <div ref={figureRef} className="hero-figure" aria-hidden="true">
        <motion.div
          className="hero-figure-inner"
          initial={reduce ? false : { y: 140, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.75, ease: EASE_OUT }}
        >
          <img src="/images/nobunaga-hero.png" alt="Oda Nobunaga" />
        </motion.div>
      </div>

      <div className="hero-cta">
        <div ref={badgesRef} className="hero-badges">
          {BADGES.map((b, i) => (
            <motion.div
              key={b.text}
              className={`hero-badge${b.gold ? " gold" : ""}`}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.05 + i * 0.12, ease: EASE_OUT }}
            >
              <span className="material-symbols-outlined">{b.icon}</span>
              <span>{b.text}</span>
            </motion.div>
          ))}
        </div>

        <div className="scroll-hint" aria-hidden="true">
          <span className="material-symbols-outlined">expand_more</span>
        </div>
      </div>
    </section>
  );
}
