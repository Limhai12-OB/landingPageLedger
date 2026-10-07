"use client";

import { useState } from "react";
import s from "@/app/dashboard.module.css";
import Icon from "@/components/Icon";
import { bankLines, tills, unmatchedLedger, type TillSheet } from "@/data/dashboard-sections";
import { useToast } from "./Toast";

const usd = (v: number) => `$${v.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
const khr = (v: number) => `៛${v.toLocaleString("en-US")}`;
const tillTone: Record<TillSheet["status"], string> = { Open: s.info, Counted: s.warn, "Signed off": s.ok };

function Diff({ v, fmt }: { v: number; fmt: (n: number) => string }) {
  if (v === 0) return <b className={s.pos}>Balanced</b>;
  return <b className={v < 0 ? s.neg : s.warn}>{v < 0 ? "Short " : "Over "}{fmt(Math.abs(v))}</b>;
}

export default function ReconcilePage() {
  const [tab, setTab] = useState<"till" | "bank">("till");
  const [sheets, setSheets] = useState(tills);
  const [lines, setLines] = useState(bankLines);
  const [matching, setMatching] = useState<string | null>(null);
  const [toast, show] = useToast();

  function setCount(i: number, cur: "usd" | "khr", v: number) {
    setSheets((all) => all.map((t, j) => (j === i ? { ...t, [cur]: { ...t[cur], counted: v } } : t)));
  }
  function advance(i: number) {
    setSheets((all) => all.map((t, j) => (j === i ? { ...t, status: t.status === "Open" ? "Counted" : "Signed off" } : t)));
    show(sheets[i].status === "Open" ? "Count saved. Waiting for owner sign-off." : "Till signed off.");
  }
  function match(id: string, to: string) {
    setLines((l) => l.map((b) => (b.id === id ? { ...b, match: to } : b)));
    setMatching(null);
    show("Statement line matched.");
  }

  const unmatched = lines.filter((l) => !l.match).length;

  return (
    <>
      <header className={s.greeting}>
        <div>
          <h2>
            Till & reconciliation <span>· prove the books against reality</span>
          </h2>
          <p>Till counts per currency at the end of each shift, and bank lines matched on date, reference and amount.</p>
        </div>
        <div className={s.tabs} role="tablist" aria-label="View">
          <button type="button" role="tab" aria-selected={tab === "till"} onClick={() => setTab("till")}>Till counts</button>
          <button type="button" role="tab" aria-selected={tab === "bank"} onClick={() => setTab("bank")}>Bank reconciliation{unmatched > 0 && <em>{unmatched}</em>}</button>
        </div>
      </header>

      {tab === "till" && (
        <article className={s.card}>
          <div className={s.cardHead}>
            <div>
              <h3>Today&apos;s tills</h3>
              <p>Expected comes from posted sales; over/short is worked out per currency</p>
            </div>
          </div>
          <div className={s.tillGrid}>
            {sheets.map((t, i) => {
              const open = t.status === "Open";
              return (
                <div key={t.branch} className={s.till}>
                  <div className={s.tillHead}>
                    <div>
                      <b>{t.branch}</b>
                      <br />
                      <small className={s.muted}>{t.manager} · {t.shift}</small>
                    </div>
                    <span className={`${s.pill} ${tillTone[t.status]}`}>{t.status}</span>
                  </div>
                  <div className={s.tillRow}>
                    <small>Cur.</small><small>Expected</small><small>Counted</small><small>Over/short</small>
                  </div>
                  <div className={s.tillRow}>
                    <b>USD</b>
                    <span>{usd(t.usd.expected)}</span>
                    {open ? <input type="number" step="0.01" value={t.usd.counted || ""} placeholder="0.00" onChange={(e) => setCount(i, "usd", Number(e.target.value))} aria-label="USD counted" /> : <span>{usd(t.usd.counted)}</span>}
                    {open && !t.usd.counted ? <span className={s.muted}>—</span> : <Diff v={t.usd.counted - t.usd.expected} fmt={usd} />}
                  </div>
                  <div className={s.tillRow}>
                    <b>KHR</b>
                    <span>{khr(t.khr.expected)}</span>
                    {open ? <input type="number" step="100" value={t.khr.counted || ""} placeholder="0" onChange={(e) => setCount(i, "khr", Number(e.target.value))} aria-label="KHR counted" /> : <span>{khr(t.khr.counted)}</span>}
                    {open && !t.khr.counted ? <span className={s.muted}>—</span> : <Diff v={t.khr.counted - t.khr.expected} fmt={khr} />}
                  </div>
                  <div className={s.formActions}>
                    {t.status === "Open" && <button type="button" className={`${s.btn} ${s.btnLight} ${s.btnSm}`} onClick={() => advance(i)} disabled={!t.usd.counted && !t.khr.counted}>Save count</button>}
                    {t.status === "Counted" && <button type="button" className={`${s.btn} ${s.btnDark} ${s.btnSm}`} onClick={() => advance(i)}><Icon name="check" size={13} /> Sign off</button>}
                    {t.status === "Signed off" && <span className={s.note}>Signed off by Sokha Chan</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </article>
      )}

      {tab === "bank" && (
        <article className={s.card}>
          <div className={s.cardHead}>
            <div>
              <h3>ABA · 001 — October statement</h3>
              <p>Imported 7 Oct · 7 lines</p>
            </div>
            <div>
              <div className={`${s.select} ${s.selectSq}`} style={{ height: 36 }}>
                <select aria-label="Account" defaultValue="aba1">
                  <option value="aba1">ABA · 001</option>
                  <option value="aba2">ABA · 002</option>
                  <option value="wing">Wing</option>
                  <option value="acleda">ACLEDA · 001</option>
                </select>
                <Icon name="chevronDown" size={14} />
              </div>
              <button type="button" className={`${s.btn} ${s.btnLight} ${s.btnSm}`} onClick={() => show("Import a new statement from the Data import page.")}><Icon name="upload" size={14} /> Import</button>
            </div>
          </div>
          <div className={s.stats}>
            <div className={s.stat}><small>Statement lines</small><b>{lines.length}</b></div>
            <div className={s.stat}><small>Matched</small><b className={s.pos}>{lines.length - unmatched}</b></div>
            <div className={s.stat}><small>Unmatched</small><b className={unmatched ? s.neg : undefined}>{unmatched}</b></div>
            <div className={s.stat}><small>Difference</small><b>{unmatched ? "$312.00" : "$0.00"}</b><span>bank vs ledger</span></div>
          </div>
          <div className={s.tableWrap}>
            <table className={s.table}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Reference</th>
                  <th>Description</th>
                  <th>Ledger match</th>
                  <th style={{ textAlign: "right" }}>Amount</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {lines.map((b) => (
                  <tr key={b.id}>
                    <td className={s.muted}>{b.date}</td>
                    <td className={s.muted}>{b.ref}</td>
                    <td>{b.desc}</td>
                    <td>
                      {b.match ? (
                        <span className={`${s.pill} ${s.ok}`}>{b.match}</span>
                      ) : matching === b.id ? (
                        <div className={s.inline}>
                          {unmatchedLedger.map((u) => (
                            <button key={u.name} type="button" className={s.miniBtn} onClick={() => match(b.id, u.name)}>{u.name} · {u.amount}</button>
                          ))}
                        </div>
                      ) : (
                        <span className={`${s.pill} ${s.warn}`}>Unmatched</span>
                      )}
                    </td>
                    <td className={`${s.amt} ${b.inflow ? s.amtIn : s.amtOut}`}>{b.amount}</td>
                    <td>
                      <div className={s.rowActions}>
                        {!b.match && matching !== b.id && <button type="button" className={`${s.miniBtn} ${s.miniPrimary}`} onClick={() => setMatching(b.id)}>Match</button>}
                        {matching === b.id && <button type="button" className={s.miniBtn} onClick={() => setMatching(null)}>Cancel</button>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={s.footerRow}>
            <span>{unmatched === 0 ? "Everything matches. Ready for sign-off." : `${unmatched} line still needs a match.`}</span>
            <button type="button" className={`${s.btn} ${s.btnDark} ${s.btnSm}`} disabled={unmatched > 0} onClick={() => show("Reconciliation signed off.")}><Icon name="check" size={13} /> Sign off reconciliation</button>
          </div>
        </article>
      )}
      {toast}
    </>
  );
}
