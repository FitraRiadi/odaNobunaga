import { useEffect, useState } from "react";
import { AnimatePresence, useReducedMotion } from "framer-motion";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Preloader from "./components/Preloader.jsx";
import ScrollExpand from "./components/ScrollExpand.jsx";
import SectionDivider from "./components/SectionDivider.jsx";
import Milestones from "./components/Milestones.jsx";
import Journey from "./components/Journey.jsx";
import Tactics from "./components/Tactics.jsx";
import Clans from "./components/Clans.jsx";
import QuoteSection from "./components/QuoteSection.jsx";
import Footer from "./components/Footer.jsx";
import { useAssetsReady } from "./lib/useAssetsReady.js";

export default function App() {
  const ready = useAssetsReady();
  const reduce = useReducedMotion();

  // Payload beres → tahan 2 detik dulu, baru tirai dibuka.
  const [leaving, setLeaving] = useState(false);
  useEffect(() => {
    if (!ready) return;
    const t = window.setTimeout(() => setLeaving(true), reduce ? 0 : 2000);
    return () => window.clearTimeout(t);
  }, [ready, reduce]);

  // Entrance jalan SETELAH tirai kebuka penuh (bukan barengan),
  // biar intro gak kemakan animasi tirai.
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!leaving) return;
    const t = window.setTimeout(() => setShow(true), reduce ? 0 : 1050);
    return () => window.clearTimeout(t);
  }, [leaving, reduce]);

  // Kunci scroll selama loader tampil — section bawah gak bisa
  // ke-trigger sebelum loading beres.
  useEffect(() => {
    document.body.style.overflow = show ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  return (
    <>
      <AnimatePresence>{!leaving && <Preloader key="preloader" />}</AnimatePresence>
      <Header start={show} />
      <main style={{ paddingTop: "5rem", background: "var(--surface)", minHeight: "100vh" }}>
        <Hero start={show} />
        <ScrollExpand
          src="/images/honoji-atmosfere.png"
          alt="Burning castle at Honnō-ji, 1582"
          title="Enemy At Honnoji!"
          scrollHint="Scroll"
          useWindowScroll
          startRadius={0}
          endRadius={0}
          className="honnoji-expand"
        >
          <h2>Honnō-ji Incident</h2>
          <p>
            The Honnō-ji Incident (1582) was the fatal betrayal of Japanese
            warlord Oda Nobunaga, who was forced to commit seppuku during a
            surprise ambush by his vassal, Akechi Mitsuhide, abruptly ending
            Nobunaga&apos;s near-complete unification of Japan. Though
            Mitsuhide’s motives remain a historical mystery, his rebellion was
            crushed just two weeks later by loyal retainer Toyotomi Hideyoshi
            at the Battle of Yamazaki, avenging Nobunaga and allowing Hideyoshi
            to seize power and complete the nation&apos;s unification.
          </p>
        </ScrollExpand>
        <SectionDivider />
        <Milestones />
        <Journey />
        <Tactics />
        <Clans />
        <QuoteSection />
      </main>
      <Footer />
    </>
  );
}
