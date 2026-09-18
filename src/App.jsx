import { useEffect, useRef, useState } from "react";
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

  // Payload beres → tahan 2 detik dulu, baru tawarin mulai.
  // Klik = gestur resmi → browser ngasih izin suara (autoplay musik jalan).
  // Pengaman: kalau gak diklik 12 detik, tirai kebuka sendiri.
  const [invited, setInvited] = useState(false);
  const [leaving, setLeaving] = useState(false);
  useEffect(() => {
    if (!ready) return;
    const t = window.setTimeout(() => setInvited(true), reduce ? 0 : 2000);
    return () => window.clearTimeout(t);
  }, [ready, reduce]);
  useEffect(() => {
    if (!invited || leaving) return;
    const t = window.setTimeout(() => setLeaving(true), reduce ? 0 : 12000);
    return () => window.clearTimeout(t);
  }, [invited, leaving, reduce]);

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

  // Musik ambience: loop, coba auto-play pas intro mulai. Browser ngeblokir
  // suara sebelum ada gestur user → kalau ditolak, tunggu klik/sentuh
  // pertama baru main. Tombol navbar tetap bisa toggle manual.
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const audio = new Audio("/sfx/sengoku-music.mp3");
    audio.loop = true;
    audio.volume = 0.5;
    audio.preload = "auto";
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);
  useEffect(() => {
    if (!show) return;
    let cancelled = false;
    const cleanup = () => {
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("keydown", onGesture);
    };
    const tryPlay = () =>
      audioRef.current
        ?.play()
        .then(() => {
          if (!cancelled) {
            setPlaying(true);
            cleanup();
          }
        })
        .catch(() => {});
    function onGesture() {
      tryPlay();
    }
    tryPlay();
    window.addEventListener("pointerdown", onGesture);
    window.addEventListener("keydown", onGesture);
    return () => {
      cancelled = true;
      cleanup();
    };
  }, [show]);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => {});
    }
  };

  return (
    <>
      <AnimatePresence>
        {!leaving && (
          <Preloader
            key="preloader"
            invited={invited}
            onEnter={() => setLeaving(true)}
          />
        )}
      </AnimatePresence>
      <Header start={show} playing={playing} onToggleMusic={toggleMusic} />
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
