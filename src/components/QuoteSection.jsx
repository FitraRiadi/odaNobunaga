export default function QuoteSection() {
  return (
    <section className="atsumori" id="legacy">
      <div className="wrap">
        <div className="atsumori-card">
          <div className="eyebrow gold" style={{ justifyContent: "center" }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>auto_stories</span>
            <span>Nobunaga&apos;s Beloved Noh Recitation</span>
          </div>
          <p className="atsumori-jp">
            人間五十年、下天の内をくらぶれば、
            <br />
            夢幻の如くなり
          </p>
          <p className="atsumori-en">
            &ldquo;A man&apos;s life of fifty years, weighed against the heavens —
            <br />
            it is but a fleeting dream, an illusion.&rdquo;
          </p>
          <p style={{ color: "var(--outline)", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            Kowaka Atsumori — recited at Okehazama &amp; Honnō-ji
          </p>
        </div>
      </div>
    </section>
  );
}
