import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { NAV_LINKS } from "../data/content.js";

export default function Header({ start = true }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState("overview");

  // Overview = balik mentok ke atas (top hero). Anchor biasa mendaratnya
  // pas-pasan karena ketutup header + kegeser pin spacer GSAP.

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

  const scrollTop = (e) => {
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    setActive("overview");
  };

  return (
    <header className="site-header">
      <motion.div
        className="site-header-inner"
        initial={reduce ? false : { opacity: 0 }}
        animate={reduce ? undefined : { opacity: start ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <nav className="main-nav" aria-label="Navigasi utama">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={active === l.id ? "active" : ""}
              aria-current={active === l.id ? "page" : undefined}
              onClick={l.id === "overview" ? scrollTop : undefined}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button className="icon-btn" type="button" aria-label="Ambiance Sound">
            <span className="material-symbols-outlined">volume_up</span>
          </button>
          <a className="btn-chronicles" href="#milestones">
            <span className="material-symbols-outlined">menu_book</span>
            <span>Explore Chronicles</span>
          </a>
        </div>
      </motion.div>
    </header>
  );
}
