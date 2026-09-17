import { useLayoutEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, useRevealProps } from "../lib/anim.js";

gsap.registerPlugin(ScrollTrigger);

export default function Tactics() {
  const reduce = useReducedMotion();
  const head = useRevealProps();
  const sectionRef = useRef(null);
  const gunRef = useRef(null);
  const pillar = (i) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 36 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.2 },
          transition: { duration: 0.7, delay: (i % 2) * 0.12, ease: EASE },
        };
  // Senapan miring (dendek): muter + ngayun 3D ngikutin scroll (scrub).
  useLayoutEffect(() => {
    if (reduce) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        gunRef.current,
        { rotation: -16, rotationY: -18, y: 70 },
        {
          rotation: -5,
          rotationY: 14,
          y: -70,
          ease: "none",
          transformPerspective: 900,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [reduce ]);
  return (
    <section ref={sectionRef} className="tactics" id="tactics">
      <div ref={gunRef} className="tactics-gun" aria-hidden="true">
        <img src="/images/tanegashima-teppo.png" alt="" />
      </div>
      <div className="wrap tactics-wrap">
        <motion.div className="section-head split" {...head}>
          <div>
            <span className="eyebrow">Tactical Doctrine &amp; Modernity</span>
            <h2 className="section-title">The Four Pillars of Total Hegemony</h2>
          </div>
          <p className="section-sub">
            Nobunaga did not merely win battles — he reinvented economics,
            siegecraft, logistics, and ballistics centuries ahead of his feudal peers.
          </p>
        </motion.div>

        <div className="bento">
          <motion.article className="pillar span7" {...pillar(0)}>
            <div>
              <div className="pillar-top">
                <div className="pillar-icon">
                  <span className="material-symbols-outlined" style={{ fontSize: 28 }}>
                    sports_martial_arts
                  </span>
                </div>
                <span className="pillar-num">01</span>
              </div>
              <span className="pillar-kicker">Continuous Fire Innovation</span>
              <h3>Three-Tier Tanegashima Arquebus Volleys (三段撃ち)</h3>
              <p>
                Overcoming the sluggish 30-second reload time of early black powder
                matchlocks, Nobunaga arranged gunners into three synchronized ranks
                behind fortified palisades. While the first discharged, the second
                aimed, and the third primed — unleashing an unbroken torrent of
                lethal lead.
              </p>
            </div>
            <div className="volley-box">
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                <span style={{ color: "var(--on-variant)", textTransform: "uppercase" }}>
                  Volley Continuity vs Traditional Cavalry
                </span>
                <strong style={{ color: "var(--gold)" }}>98.4% Efficiency</strong>
              </div>
              <div className="volley-ranks">
                <i style={{ background: "var(--vermilion)" }} />
                <i style={{ background: "var(--gold)" }} />
                <i style={{ background: "var(--surface-bright)" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "var(--outline)", textTransform: "uppercase" }}>
                <span>Rank 1: Firing</span>
                <span>Rank 2: Priming</span>
                <span>Rank 3: Reloading</span>
              </div>
            </div>
          </motion.article>

          <motion.article className="pillar span5" {...pillar(1)}>
            <div>
              <div className="pillar-top">
                <div className="pillar-icon gold">
                  <span className="material-symbols-outlined" style={{ fontSize: 28 }}>storefront</span>
                </div>
                <span className="pillar-num">02</span>
              </div>
              <span className="pillar-kicker gold">Economic Emancipation</span>
              <h3>Rakuichi-Rakuza Free Market Decree (楽市楽座)</h3>
              <p>
                Abolishing corrupt merchant monopolies (Za) and toll gates (Sekisho),
                Nobunaga declared his castle towns free-trade zones. Merchants from
                all over Japan flocked to his territory, funding immense armadas
                without crippling farm taxes.
              </p>
            </div>
            <div className="pillar-foot">
              <small>Fiscal War Revenue</small>
              <strong>+340% Clan Surplus</strong>
            </div>
          </motion.article>

          <motion.article className="pillar span5" {...pillar(2)}>
            <div>
              <div className="pillar-top">
                <div className="pillar-icon gold">
                  <span className="material-symbols-outlined" style={{ fontSize: 28 }}>fort</span>
                </div>
                <span className="pillar-num">03</span>
              </div>
              <span className="pillar-kicker gold">Architectural Deterrence</span>
              <h3>Tenshu: The Octagonal Heavens (天守閣)</h3>
              <p>
                Azuchi transformed castles from utilitarian earthen forts into towering
                stone palaces of political intimidation. Featuring an octagonal gilded
                top floor representing the cosmos, it announced the dawn of a unified
                national aesthetic.
              </p>
            </div>
            <div className="pillar-foot">
              <small>Masonry Style</small>
              <strong style={{ color: "var(--on-surface)" }}>Ano-shu Cyclopean Stone</strong>
            </div>
          </motion.article>

          <motion.article className="pillar span7" {...pillar(3)}>
            <div>
              <div className="pillar-top">
                <div className="pillar-icon">
                  <span className="material-symbols-outlined" style={{ fontSize: 28 }}>explore</span>
                </div>
                <span className="pillar-num">04</span>
              </div>
              <span className="pillar-kicker">Nanban Assimilation</span>
              <h3>Southern Barbarian Trade &amp; Global Curiosities (南蛮貿易)</h3>
              <p>
                Embracing Portuguese traders and Jesuit missionaries like Luís Fróis,
                Nobunaga acquired European mechanical clocks, terrestrial globes,
                telescopes, and velvet capes. He patronized Yasuke, the African
                retainer who became an honored samurai warrior at his side.
              </p>
            </div>
            <div className="checks">
              <span>
                <span className="material-symbols-outlined">check_circle</span> Yasuke Retainership Conferred
              </span>
              <span>
                <span className="material-symbols-outlined">check_circle</span> Jesuit Mission Kyoto Protections
              </span>
              <span>
                <span className="material-symbols-outlined">check_circle</span> Spanish Glass &amp; Clocks Acquired
              </span>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
