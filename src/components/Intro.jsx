import { useReducedMotion } from "framer-motion";
import ScrollReveal from "./ScrollReveal.jsx";
import { Reveal } from "./Reveal.jsx";

const TEXT =
  "Oda Nobunaga (1534–1582) was the Sengoku warlord who began the unification of Japan under the banner of Tenka Fubu, rule the realm by force. From the miracle at Okehazama to the guns of Nagashino and the gold of Azuchi, this is the chronicle of the Demon King.";

// Prolog sebelum Honnō-ji: teks yang menajam kata per kata ngikutin scroll.
// Reduced-motion: teks statis biasa (tanpa scroll-scrub).
export default function Intro() {
  const reduce = useReducedMotion();
  return (
    <section className="intro" aria-label="Pengantar Oda Nobunaga">
      <div className="wrap">
        <Reveal y={20}>
          <div className="eyebrow gold">
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
              menu_book
            </span>
            <span>Prologue • 序章</span>
          </div>
        </Reveal>
        {reduce ? (
          <p className="intro-static">{TEXT}</p>
        ) : (
          <ScrollReveal
            baseOpacity={0.12}
            enableBlur
            blurStrength={3}
            baseRotation={3}
            containerClassName="intro-reveal"
            textClassName="intro-text"
          >
            {TEXT}
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
