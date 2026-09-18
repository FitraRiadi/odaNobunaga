import { useLayoutEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MILESTONES } from "../data/content.js";
import { EASE, useRevealProps } from "../lib/anim.js";

gsap.registerPlugin(ScrollTrigger);

export default function Milestones() {
  const reduce = useReducedMotion();
  const head = useRevealProps();
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const barRef = useRef(null);

  // Scroll-jack sinematik: section di-pin, scroll vertikal dialihin jadi
  // gerak horizontal kartu. Cuma dipasang kalau no-preference — kalau
  // reduced-motion, layout fallback (native scroll + tombol) yang jalan.
  useLayoutEffect(() => {
    if (reduce) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;
      section.classList.add("is-jacked");
      const getDist = () => Math.max(0, track.scrollWidth - window.innerWidth + 48);
      gsap.to(track, {
        x: () => -getDist(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getDist() + window.innerHeight * 0.5}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (barRef.current) {
              barRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });
      return () => {
        section.classList.remove("is-jacked");
      };
    });
    return () => mm.revert();
  }, [reduce ]);

  // Fallback native scroll (reduced-motion): geser pas 1 kartu biar akur sama snap.
  const scroll = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector(".m-card");
    const step = card ? card.offsetWidth + 24 : 380;
    el.scrollBy({ left: dir * step, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section ref={sectionRef} className="milestones" id="milestones">
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
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
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

        <div className="jack-progress" aria-hidden="true">
          <span ref={barRef} />
        </div>
      </div>
    </section>
  );
}
