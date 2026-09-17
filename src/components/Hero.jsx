import { useEffect, useLayoutEffect, useRef } from "react";
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

// Entrance hero DI-GATE prop `start` (dari preloader di App).
// Sebelum start=true semua elemen parkir di "hidden" — jadi koreografi
// selalu mulai dari kondisi aset lengkap, gak ada "jep" pas hard refresh.
// reduced-motion: langsung final, tanpa animasi.
export default function Hero({ start = false }) {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);
  const kanjiRef = useRef(null);
  const eraRef = useRef(null);
  const titleRef = useRef(null);
  const castleLRef = useRef(null);
  const castleRRef = useRef(null);
  const figureRef = useRef(null);
  const badgesRef = useRef(null);

  const play = start || reduce;
  const ent = (hidden, to, delay, duration) => ({
    initial: reduce ? false : "hidden",
    animate: reduce ? undefined : play ? "show" : "hidden",
    variants: {
      hidden,
      show: {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        scaleX: 1,
        ...to,
        transition: { duration, delay, ease: EASE_OUT },
      },
    },
  });

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

  // Ukur ulang pin pas entrance dimulai (jor-joran lawan font swap).
  useEffect(() => {
    if (play && !reduce) ScrollTrigger.refresh();
  }, [play, reduce]);

  return (
    <section ref={sectionRef} className="hero" id="overview">
      <div className="hero-bg" />
      <div className="hero-glow" />
      <motion.div
        className="hero-dust"
        aria-hidden="true"
        {...ent({ opacity: 0 }, { opacity: 0.6 }, 1.2, 1.4)}
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
        <motion.img
          src="/oda-clan.svg"
          alt=""
          className="hero-crest"
          {...ent({ opacity: 0, scale: 1.15, y: 40 }, { opacity: 0.12, scale: 1, y: 0 }, 0.1, 1.4)}
        />
        </div>
      </div>

      <div ref={eraRef} className="hero-era" aria-hidden="true">
        <motion.div
          className="hero-era-track"
          {...ent({ opacity: 0 }, { opacity: 1 }, 0, 1.2)}
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
        <h1 className="sr-only">Oda Nobunaga</h1>
        <motion.span
          className="hero-kana"
          {...ent({ opacity: 0, y: 24 }, {}, 0.25, 0.8)}
        >
          織 田 信 長 ・ 天 下 布 武
        </motion.span>
        <div className="hero-h1 hero-h1-fold" aria-hidden="true">
          {play ? (
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
        </div>
        <motion.div
          className="hero-divider"
          {...ent({ opacity: 0, scaleX: 0.6 }, {}, 0.7, 0.8)}
        >
          <motion.span
            {...ent({ opacity: 0 }, {}, 0.85, 0.6)}
          >
            Demon King of the Sixth Heaven • 第六天魔王
          </motion.span>
        </motion.div>
      </div>

      <div ref={castleLRef} className="castle-wing left" aria-hidden="true">
        <motion.div
          {...ent({ x: -120, opacity: 0 }, {}, 0.55, 1)}
        >
          <img src="/images/castle-left.png" alt="" />
        </motion.div>
      </div>
      <div ref={castleRRef} className="castle-wing right" aria-hidden="true">
        <motion.div
          {...ent({ x: 120, opacity: 0 }, {}, 0.55, 1)}
        >
          <img src="/images/castle-right.png" alt="" />
        </motion.div>
      </div>

      <div ref={figureRef} className="hero-figure" aria-hidden="true">
        <motion.div
          className="hero-figure-inner"
          {...ent({ y: 140, opacity: 0 }, {}, 0.75, 1.1)}
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
              {...ent({ opacity: 0, y: 16 }, {}, 1.05 + i * 0.12, 0.5)}
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
