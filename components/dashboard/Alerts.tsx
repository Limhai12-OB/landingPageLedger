import Link from "next/link";
import s from "@/app/dashboard.module.css";
import Icon from "@/components/Icon";
import { alerts } from "@/data/dashboard";

const tone = { danger: s.toneDanger, warn: s.toneWarn, info: s.toneInfo } as const;
const href = { danger: "/dashboard/forecast", warn: "/dashboard/transactions", info: "/dashboard/reconcile" } as const;

export default function Alerts() {
  return (
    <article className={s.card}>
      <div className={s.cardHead}>
        <div>
          <h3>Needs attention</h3>
          <p>Cash warnings and records waiting for you</p>
        </div>
        <div>
          <span className={`${s.pill} ${s.danger}`}>{alerts.length} open</span>
        </div>
      </div>
      <ul className={s.alerts}>
        {alerts.map((a) => (
          <li key={a.title} className={`${s.alert} ${tone[a.tone]}`}>
            <span className={s.alertIcon}>
              <Icon name={a.icon} size={18} />
            </span>
            <b>{a.title}</b>
            <p>{a.text}</p>
            <Link href={href[a.tone]} className={s.link}>
              {a.action} <Icon name="arrowRight" size={13} />
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
