import s from "@/app/v2/v2.module.css";

/** Glowing AI-assistant orb, pure CSS. */
export default function Orb({ size = 56 }: { size?: number }) {
  return <span className={s.orb} style={{ width: size, height: size }} aria-hidden="true" />;
}
