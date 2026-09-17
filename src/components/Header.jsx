import { NAV_LINKS } from "../data/content.js";

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <div className="brand">
          <div className="brand-mark">織</div>
          <div>
            <div>
              <span className="brand-jp">織田信長</span>{" "}
              <span className="brand-tag">| 天下布武</span>
            </div>
            <span className="brand-era">Azuchi-Momoyama Period</span>
          </div>
        </div>

        <nav className="main-nav" aria-label="Navigasi utama">
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} className={l.active ? "active" : ""}>
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
          <div className="avatar" aria-hidden="true">
            <span className="material-symbols-outlined">person</span>
          </div>
        </div>
      </div>
    </header>
  );
}
