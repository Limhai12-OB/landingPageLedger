import Link from "next/link";
import s from "@/app/dashboard.module.css";
import Icon from "@/components/Icon";
import { branchRows, type Branch } from "@/data/dashboard";

const tillTone: Record<Branch["till"], string> = { "Signed off": s.ok, Open: s.info, Short: s.danger, Over: s.warn };

export default function Branches() {
  return (
    <article className={s.card}>
      <div className={s.cardHead}>
        <div>
          <h3>Branches today</h3>
          <p>Sales, till status and bank reconciliation per branch</p>
        </div>
        <div>
          <Link href="/dashboard/branches" className={`${s.btn} ${s.btnLight} ${s.btnSm}`}>
            <Icon name="userPlus" size={14} /> Invite manager
          </Link>
        </div>
      </div>
      <ul className={s.branches}>
        {branchRows.map((b) => (
          <li key={b.name} className={s.branch}>
            <span className={s.branchIcon}>
              <Icon name="building" size={17} />
            </span>
            <b>{b.name}</b>
            <small>
              {b.manager} · {b.tillNote}
            </small>
            <span className={s.branchRight}>
              <b>{b.sales}</b>
              <span className={`${s.pill} ${tillTone[b.till]}`}>Till {b.till.toLowerCase()}</span>
            </span>
            <span className={s.recon}>
              <i style={{ "--w": `${b.reconciled}%` } as React.CSSProperties} />
              <span>{b.reconciled}% reconciled</span>
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}
