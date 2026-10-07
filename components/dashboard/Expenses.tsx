import s from "@/app/dashboard.module.css";
import Icon from "@/components/Icon";
import { expenses } from "@/data/dashboard";

export default function Expenses() {
  let offset = 0;
  return (
    <article className={s.card}>
      <div className={s.cardHead}>
        <div>
          <h3>Expenses by category</h3>
          <p>{expenses.period} · recurring and one-time costs</p>
        </div>
        <div>
          <div className={s.select} style={{ height: 34 }}>
            <select aria-label="Period" defaultValue="month">
              <option value="month">Monthly</option>
              <option value="week">Weekly</option>
            </select>
            <Icon name="chevronDown" size={14} />
          </div>
        </div>
      </div>
      <div className={s.donutRow}>
        <div className={s.donut} role="img" aria-label={`Total spent ${expenses.total}`}>
          <svg viewBox="0 0 100 100">
            {expenses.items.map((e, i) => {
              const style = { "--pct": e.pct, "--off": offset, "--n": i, stroke: e.color } as React.CSSProperties;
              offset += e.pct;
              return <circle key={e.name} cx="50" cy="50" r="40" pathLength={100} style={style} />;
            })}
          </svg>
          <span>
            <small>Total spent</small>
            <b>{expenses.total}</b>
          </span>
        </div>
        <ul className={s.cats}>
          {expenses.items.map((e) => (
            <li key={e.name}>
              <i style={{ background: e.color }} />
              {e.name}
              <b>{e.value}</b>
              <small>{e.pct}%</small>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
