import { CLANS } from "../data/content.js";

export default function Clans() {
  return (
    <section className="clans" id="clans">
      <div className="wrap">
        <div className="journey-head">
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
        </div>

        <div className="clan-grid">
          {CLANS.map((c) => (
            <article className="clan" key={c.name}>
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
