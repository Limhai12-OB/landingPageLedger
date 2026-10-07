import Link from "next/link";
import s from "@/app/dashboard.module.css";
import Icon from "@/components/Icon";
import { transactions, type Tx } from "@/data/dashboard";

const statusTone: Record<Tx["status"], string> = { Posted: s.ok, Matched: s.info, Draft: s.neutral, "Needs review": s.warn };

export default function Transactions() {
  return (
    <article className={s.card}>
      <div className={s.cardHead}>
        <div>
          <h3>Recent transactions</h3>
          <p>Each entry keeps its own currency and exchange rate</p>
        </div>
        <div>
          <button type="button" className={`${s.btn} ${s.btnLight} ${s.btnSm}`}>
            <Icon name="filter" size={14} /> Filter
          </button>
          <Link href="/dashboard/transactions" className={`${s.btn} ${s.btnGhost} ${s.btnSm}`}>
            View all <Icon name="arrowRight" size={13} />
          </Link>
        </div>
      </div>

      <div className={s.tableWrap}>
        <table className={s.table}>
          <thead>
            <tr>
              <th>Transaction</th>
              <th>Branch</th>
              <th>Source</th>
              <th>Status</th>
              <th style={{ textAlign: "right" }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.slice(0, 6).map((t) => (
              <tr key={t.id}>
                <td>
                  <div className={s.txName}>
                    <span className={s.txIcon}>
                      <Icon name={t.icon} size={15} />
                    </span>
                    <span>
                      <b>{t.name}</b>
                      <small>{t.date}</small>
                    </span>
                  </div>
                </td>
                <td className={s.muted}>{t.branch}</td>
                <td className={s.muted}>{t.source}</td>
                <td>
                  <span className={`${s.pill} ${statusTone[t.status]}`}>{t.status}</span>
                </td>
                <td className={`${s.amt} ${t.inflow ? s.amtIn : s.amtOut}`}>
                  {t.amount}
                  <span className={s.cur}>{t.currency}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}
