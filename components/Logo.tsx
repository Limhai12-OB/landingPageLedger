export function LogoMark({ size = 28, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <path d="M16 2 28 9v14l-12 7L4 23V9z" fill={color} />
      <path d="M16 9.5 22 13v6l-6 3.5L10 19v-6z" fill="none" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
      <path d="M4 9l12 7 12-7M16 16v14" stroke="#fff" strokeWidth="1.5" opacity=".55" fill="none" />
    </svg>
  );
}

export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <a href="#top" className="logo" aria-label="Sync home" style={{ color: dark ? "#fff" : "#0d0d0f" }}>
      <LogoMark color={dark ? "#fff" : "#0d0d0f"} />
      <span>sync</span>
    </a>
  );
}
