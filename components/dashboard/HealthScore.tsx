import Link from "next/link";
import s from "@/app/dashboard.module.css";
import Icon from "@/components/Icon";
import { health } from "@/data/dashboard";

export default function HealthScore() {
  return (
    <article className={s.card}>
      <div className={s.cardHead}>
        <div>
          <h3>Health score</h3>
          <p>How the business is doing, 0 to 100</p>
        </div>
        <div>
          <Link href="/dashboard/advisor" className={s.link}>
            Explain <Icon name="arrowRight" size={13} />
          </Link>
        </div>
      </div>
      <div className={s.health}>
        <div className={s.ring} role="img" aria-label={`Health score ${health.score} of 100, ${health.label}`}>
          <svg viewBox="0 0 100 100">
            <circle className={s.ringBg} cx="50" cy="50" r="44" />
            <circle className={s.ringFg} cx="50" cy="50" r="44" pathLength={100} style={{ strokeDashoffset: 100 - health.score }} />
          </svg>
          <span>
            <b>{health.score}</b>
            <small>{health.label}</small>
          </span>
        </div>
        <ul className={s.factors}>
          {health.factors.map(([name, v]) => (
            <li key={name} className={s.factor}>
              <span>{name}</span>
              <b>{v}</b>
              <i style={{ "--w": `${v}%` } as React.CSSProperties} />
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
