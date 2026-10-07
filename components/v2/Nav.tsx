import s from "@/app/v2/v2.module.css";
import { navLinks } from "@/data/v2";
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
          <a href="#pricing" className={s.navLogin}>
            Login
          </a>
          <a href="#pricing" className={`${s.btn} ${s.btnDark} ${s.btnSm}`}>
            Get Started
          </a>
        </div>
      </div>
    </header>
  );
}
