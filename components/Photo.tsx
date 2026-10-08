import Image from "next/image";
import s from "@/app/landing.module.css";

const tones = [
  "linear-gradient(140deg, #e8edfc 0%, #c7d2fb 55%, #3b5ed9 100%)",
  "linear-gradient(140deg, #e8edfc 0%, #93a9f0 55%, #1e3a8a 100%)",
  "linear-gradient(140deg, #e8edfc 0%, #3b5ed9 55%, #3b5ed9 100%)",
  "linear-gradient(140deg, #f0f3fd 0%, #c7d2fb 55%, #1e40af 100%)",
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
