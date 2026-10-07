import s from "@/app/dashboard.module.css";
import Icon from "@/components/Icon";
import { kpis } from "@/data/dashboard";

export default function Kpis() {
  return (
    <section className={s.kpis} aria-label="Key figures">
      {kpis.map((k) => (
        <article key={k.label} className={`${s.card} ${s.kpi}`}>
          <div className={s.kpiTop}>
            <small>{k.label}</small>
            <span className={s.kpiIcon}>
              <Icon name={k.icon} size={17} />
            </span>
          </div>
          <b>{k.value}</b>
          <div className={s.kpiFoot}>
            {k.delta && (
              <em className={`${s.delta} ${k.up ? s.deltaUp : s.deltaDown}`}>
                {k.up ? "↑" : "↓"} {k.delta}
              </em>
            )}
            <span>{k.sub}</span>
          </div>
        </article>
      ))}
    </section>
  );
}
