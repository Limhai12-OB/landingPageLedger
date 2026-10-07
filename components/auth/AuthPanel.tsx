import s from "@/app/auth.module.css";

const rows = [
  { name: "ABA payment · INV-208", date: "07 Oct, 2025", amount: "$1,240", status: "Matched", tone: s.ok },
  { name: "Supplier bill · Rice", date: "07 Oct, 2025", amount: "៛344,000", status: "Draft", tone: s.warn },
  { name: "Shopify orders", date: "06 Oct, 2025", amount: "$3,500", status: "Posted", tone: s.ok },
];

const categories = [
  ["Inventory restock", "$1,420", "#1d33ba"],
  ["Rent & utilities", "$980", "#8e9cf0"],
  ["Wages", "$640", "#c7d0fb"],
] as const;

/** Right-hand promo panel with a dashboard preview (decorative). */
export default function AuthPanel({ title, text }: { title: string; text: string }) {
  return (
    <aside className={s.panel} aria-label="Product preview">
      <svg className={s.curves} viewBox="0 0 600 700" preserveAspectRatio="none" aria-hidden="true">
        <path d="M-20 200 C 180 120, 360 160, 620 330" pathLength={1} />
        <path d="M260 -20 C 320 160, 300 420, 640 700" />
        <path d="M-20 560 C 160 470, 380 520, 620 430" pathLength={1} />
      </svg>

      <div className={s.panelCopy}>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>

      <div className={s.mockWrap} aria-hidden="true">
        <div className={s.mock}>
          {/* Top row stays left of the floating card, which overlaps the mock's top-right corner. */}
          <div className={s.kpis}>
            <div className={s.kpi}>
              <small>MONTHLY REVENUE</small>
              <span className={s.kpiSub}>All branches, this month</span>
              <b>$48,920</b>
              <em className={s.pillUp}>↑ 12.5% <span>vs last month</span></em>
            </div>
          </div>
          <div className={s.kpiRow}>
            <div className={s.kpi}>
              <small>Net profit</small>
              <b>
                $25,684 <em className={s.pillGreen}>↑ 8%</em>
              </b>
            </div>
            <div className={`${s.kpi} ${s.kpiGrow}`}>
              <small>Cash runway</small>
              <span className={s.kpiInline}>
                <b>74 days</b>
                <svg viewBox="0 0 100 30" className={s.spark}>
                  <path d="M2 22 C 14 8, 22 8, 32 18 S 52 30, 62 16 S 82 2, 98 12" pathLength={1} />
                </svg>
              </span>
            </div>
            <span className={s.kpiNote}>
              Health
              <br />
              score <b>78</b>
            </span>
          </div>

          <div className={s.listHead}>
            <b>Recent transactions</b>
            <span>View all</span>
          </div>
          <ul className={s.list}>
            {rows.map((r) => (
              <li key={r.name}>
                <i />
                <span className={s.listName}>{r.name}</span>
                <span className={s.listDate}>{r.date}</span>
                <span className={s.listAmt}>{r.amount}</span>
                <span className={`${s.status} ${r.tone}`}>{r.status}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={s.floatCard}>
          <div className={s.floatHead}>
            <b>Expenses by category</b>
            <span>Monthly ▾</span>
          </div>
          <div className={s.gauge}>
            <svg viewBox="0 0 120 66">
              <path d="M10 60 A 50 50 0 0 1 110 60" className={s.gaugeBg} />
              <path d="M10 60 A 50 50 0 0 1 110 60" className={s.gaugeFg} pathLength={1} />
            </svg>
            <span>
              <small>Total spent</small>
              <b>$3,040</b>
            </span>
          </div>
          <ul className={s.legend}>
            {categories.map(([k, v, c]) => (
              <li key={k}>
                <i style={{ background: c }} />
                {k}
                <b>{v}</b>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
