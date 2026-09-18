import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { NAV_LINKS } from "../data/content.js";
import RubberSegment from "./RubberSegment.jsx";

export default function Header({ start = true, playing = false, onToggleMusic }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState("overview");
  const [open, setOpen] = useState(false);

  // Scroll spy: tandai nav sesuai section yang lagi keliatan di layar.
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.id);
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (!visible.length) return;
        visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const go = (id) => {
    setActive(id);
    setOpen(false);
    const behavior = reduce ? "auto" : "smooth";
    if (id === "overview") {
      window.scrollTo({ top: 0, behavior });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior, block: "start" });
  };

  const activeLabel = NAV_LINKS.find((l) => l.id === active)?.label ?? "Overview";

  return (
    <header className="site-header">
      <motion.div
        className="site-header-inner"
        initial={reduce ? false : { opacity: 0 }}
        animate={reduce ? undefined : { opacity: start ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <button
          className="icon-btn menu-btn"
          type="button"
          aria-label={open ? "Tutup menu navigasi" : "Buka menu navigasi"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="material-symbols-outlined">{open ? "close" : "menu"}</span>
        </button>

        <nav className="main-nav" aria-label="Navigasi utama">
          <RubberSegment
            items={NAV_LINKS.map((l) => l.label)}
            value={activeLabel}
            onChange={(label) => {
              const link = NAV_LINKS.find((l) => l.label === label);
              if (link) go(link.id);
            }}
            trackColor="transparent"
            thumbColor="#ecc06c"
            textColor="#e5e1e4"
            activeTextColor="#412d00"
            size="md"
            radius={0}
            className="nav-rubber"
            aria-label="Navigasi utama"
          />
        </nav>

        <div className="header-actions">
          <button
            className={`icon-btn${playing ? " playing" : ""}`}
            type="button"
            aria-label={playing ? "Matikan musik ambience" : "Nyalakan musik ambience"}
            aria-pressed={playing}
            onClick={onToggleMusic}
          >
            <span className="material-symbols-outlined">
              {playing ? "volume_up" : "volume_off"}
            </span>
          </button>
          <a className="btn-chronicles" href="#milestones">
            <span className="material-symbols-outlined">menu_book</span>
            <span>Explore Chronicles</span>
          </a>
        </div>
      </motion.div>

      {open && (
        <motion.nav
          className="mobile-panel"
          aria-label="Navigasi seluler"
          initial={reduce ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="mobile-panel-head" aria-hidden="true">
            <span>戦国時代</span>
            <span>Navigate</span>
          </div>
          {NAV_LINKS.map((l, i) => (
            <motion.a
              key={l.id}
              href={l.href}
              className={active === l.id ? "active" : ""}
              aria-current={active === l.id ? "page" : undefined}
              onClick={(e) => {
                e.preventDefault();
                go(l.id);
              }}
              initial={reduce ? false : { opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.05 + i * 0.06 }}
            >
              <span className="mobile-index">{String(i + 1).padStart(2, "0")}</span>
              <span className="mobile-label">{l.label}</span>
              <span className="material-symbols-outlined">chevron_right</span>
            </motion.a>
          ))}
        </motion.nav>
      )}
    </header>
  );
}
