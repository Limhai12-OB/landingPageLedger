import Image from "next/image";
import s from "@/app/landing.module.css";

const tones = [
  "linear-gradient(140deg, #eef1ff 0%, #c7d0fb 55%, #4c62dc 100%)",
  "linear-gradient(140deg, #eef1ff 0%, #8e9cf0 55%, #172a96 100%)",
  "linear-gradient(140deg, #eef1ff 0%, #4c62dc 55%, #4c62dc 100%)",
  "linear-gradient(140deg, #f5f7ff 0%, #c7d0fb 55%, #1d33ba 100%)",
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
