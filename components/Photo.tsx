import Image from "next/image";
import s from "@/app/landing.module.css";

const tones = [
  "linear-gradient(140deg, #e3e2ff 0%, #b7b6fe 55%, #5f59fc 100%)",
  "linear-gradient(140deg, #efeeff 0%, #8c89fd 55%, #1505a0 100%)",
  "linear-gradient(140deg, #e3e2ff 0%, #5f59fc 55%, #05014b 100%)",
  "linear-gradient(140deg, #f4f4ff 0%, #b7b6fe 55%, #2913fa 100%)",
];

/**
 * Photo slot. No photos are bundled: pass `src` (e.g. "/images/article-1.jpg")
 * once you have real images; until then a soft tonal placeholder is shown.
 */
export default function Photo({
  src,
  alt = "",
  tone = 0,
  label,
  className,
}: {
  src?: string;
  alt?: string;
  tone?: number;
  label?: string;
  className?: string;
}) {
  return (
    <div className={`${s.photo} ${className ?? ""}`} style={{ background: tones[tone % tones.length] }}>
      {src ? (
        <Image src={src} alt={alt} fill sizes="(max-width: 760px) 100vw, 33vw" style={{ objectFit: "cover" }} />
      ) : (
        label && <span className={s.photoLabel}>{label}</span>
      )}
    </div>
  );
}
