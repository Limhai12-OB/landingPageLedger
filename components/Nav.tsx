import s from "@/app/landing.module.css";
import { navLinks } from "@/data/content";
import Logo from "./Logo";

/** Sticky, translucent top bar. */
export default function Nav() {
  return (
    <header className={s.navBar}>
      <div className={`${s.nav} ${s.container}`}>
        <Logo />
        <nav aria-label="Primary" className={s.navLinks}>
          {navLinks.map(([label, href]) => (
            <a key={label} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <div className={s.navActions}>
          <a href="/login" className={s.navLogin}>
            Login
          </a>
          <a href="/register" className={`${s.btn} ${s.btnDark} ${s.btnSm}`}>
            Get Started
          </a>
        </div>
      </div>
    </header>
  );
}
