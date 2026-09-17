import { motion, useReducedMotion } from "framer-motion";
import { CLANS } from "../data/content.js";
import { EASE, useRevealProps } from "../lib/anim.js";
import "./GlareHover.css";

export default function Clans() {
  const reduce = useReducedMotion();
  const head = useRevealProps();
  return (
    <section className="clans" id="clans">
      <div className="wrap">
        <motion.div className="journey-head" {...head}>
          <div className="eyebrow gold">
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>group_work</span>
            <span>Daimyo Power Dynamics</span>
          </div>
          <h2 className="section-title" style={{ color: "var(--on-surface)" }}>
            Allies, Retainers &amp; Worthy Nemeses
          </h2>
          <p className="section-sub" style={{ textAlign: "center" }}>
            The intricate tapestry of Sengoku politics: those who pledged iron oaths
            to Nobunaga and those who fought him to the bitter death.
          </p>
        </motion.div>

        <div className="clan-grid">
          {CLANS.map((c, i) => (
            <motion.article
              className="clan"
              key={c.name}
              initial={reduce ? false : { opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: (i % 4) * 0.1, ease: EASE }}
            >
              <motion.div
                className="clan-figure"
                style={{ "--fig": `url(${c.img})` }}
                initial={reduce ? false : { opacity: 0, y: 110 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.8,
                  delay: (i % 4) * 0.1 + 0.15,
                  ease: EASE,
                }}
              >
                <span className={`clan-emblem ${c.tone}`} aria-hidden="true">
                  {c.mon}
                </span>
                <img src={c.img} alt={c.name} />
                <span className="glare-sweep idle" aria-hidden="true" />
                <span className="glare-sweep hover" aria-hidden="true" />
              </motion.div>
              <div className="clan-body">
              <div>
                <div className="clan-top">
                  <div className={`clan-mon ${c.tone}`}>{c.mon}</div>
                  <span className={`clan-role${c.roleRed ? " red" : ""}`}>{c.role}</span>
                </div>
                <h3>{c.name}</h3>
                <span className="clan-jp">{c.jp}</span>
                <p>{c.desc}</p>
              </div>
              <div className="clan-foot">
                <small>{c.crestLabel}</small>
                <strong>{c.crest}</strong>
              </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
