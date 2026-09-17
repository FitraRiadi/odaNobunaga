import { Reveal } from "./Reveal.jsx";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <Reveal y={20}>
          <div className="footer-grid">
            <div>
              <div className="footer-brand">Oda Nobunaga</div>
              <p className="footer-note">
                Commemorating the unification drive of Oda Nobunaga — from the fool of
                Owari to the Demon King who set the realm ablaze and lit the road to
                Azuchi.
              </p>
            </div>
            <div className="footer-meta">
              <div>
                <strong>Era</strong>
                <span>1534 — 1582</span>
              </div>
              <div>
                <strong>Headquarters</strong>
                <span>Azuchi Tenshu, Ōmi</span>
              </div>
              <div>
                <strong>Philosophy</strong>
                <span>天下布武 (Tenka Fubu)</span>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal y={12} delay={0.1}>
          <div className="footer-base">
            <span>© 1582 — 2025 Sengoku Archives. Built with React + Vite.</span>
            <span>ARCHIVE • CIPHER • WAR CHRONOLOGY • SCHOLARSHIP</span>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
