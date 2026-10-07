import s from "@/app/v2/v2.module.css";
import { BRAND } from "@/data/v2";

export function LogoMark({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="15" fill="var(--accent)" />
      <path d="M21.5 10.5a7.5 7.5 0 1 0 1.9 7.4" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      <circle cx="16" cy="16" r="2.6" fill="#fff" />
    </svg>
  );
}

export default function Logo() {
  return (
    <a href="#top" className={s.logo} aria-label={`${BRAND} home`}>
      <LogoMark />
      <span>{BRAND}</span>
    </a>
  );
}
