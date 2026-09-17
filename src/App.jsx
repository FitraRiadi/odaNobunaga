import { useEffect, useState } from "react";
import { AnimatePresence, useReducedMotion } from "framer-motion";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Preloader from "./components/Preloader.jsx";
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

  // Entrance jalan SETELAH tirai kebuka penuh (bukan barengan),
  // biar intro gak kemakan animasi tirai.
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!ready) return;
    const t = window.setTimeout(() => setShow(true), reduce ? 0 : 1050);
    return () => window.clearTimeout(t);
  }, [ready, reduce]);

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
      <AnimatePresence>{!ready && <Preloader key="preloader" />}</AnimatePresence>
      <Header start={show} />
      <main style={{ paddingTop: "5rem", background: "var(--surface)", minHeight: "100vh" }}>
        <Hero start={show} />
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
