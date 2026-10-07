const nav = [
  ["Price", "#pricing"],
  ["About us", "#about"],
  ["Contacts", "#contacts"],
  ["Features", "#features"],
  ["Sync", "#sync"],
  ["Reviews", "#reviews"],
] as const;

const legal = ["Terms & Conditions", "Privacy Statement", "Cookies", "Trademarks"];

export default function Footer() {
  return (
    <footer className="footer" id="contacts">
      <nav className="footer-nav container" aria-label="Footer">
        {nav.map(([label, href]) => (
          <a key={label} href={href}>
            {label}
          </a>
        ))}
      </nav>

      <div className="footer-bar container">
        <small>© {new Date().getFullYear()} All Rights Reserved.</small>
        <ul>
          {legal.map((l) => (
            <li key={l}>
              <a href="#">{l}</a>
            </li>
          ))}
        </ul>
        <div className="social">
          <a href="#" aria-label="LinkedIn">
            <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="3" fill="currentColor" />
              <path d="M7 10v7M7 7v.01M11 17v-7m0 3c0-2 5-3 5 0v4" stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
          </a>
          <a href="#" aria-label="Social">
            <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 4l16 16M20 4 4 20" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
