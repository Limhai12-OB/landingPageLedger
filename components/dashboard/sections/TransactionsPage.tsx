"use client";

import { useEffect, useState } from "react";
import s from "@/app/dashboard.module.css";
import Icon from "@/components/Icon";
import { branches, transactions, type Tx } from "@/data/dashboard";
import { useToast } from "./Toast";

const statusTone: Record<Tx["status"], string> = { Posted: s.ok, Matched: s.info, Draft: s.neutral, "Needs review": s.warn };

export default function TransactionsPage() {
  const [q, setQ] = useState("");
  const [branch, setBranch] = useState("All branches");
  const [status, setStatus] = useState<"All" | Tx["status"]>("All");
  const [kind, setKind] = useState<"all" | "in" | "out">("all");
  const [adding, setAdding] = useState(false);
  useEffect(() => { if (new URLSearchParams(window.location.search).get("add") === "true") setAdding(true); }, []);
  const [rows, setRows] = useState(transactions);
  const [toast, show] = useToast();

  const list = rows.filter(
    (t) =>
      (branch === "All branches" || t.branch === branch) &&
      (status === "All" || t.status === status) &&
      (kind === "all" || (kind === "in") === t.inflow) &&
      (q === "" || `${t.name} ${t.source}`.toLowerCase().includes(q.toLowerCase())),
  );
  const review = rows.filter((t) => t.status === "Needs review").length;

  function post(id: string) {
    setRows((r) => r.map((t) => (t.id === id ? { ...t, status: "Posted" } : t)));
    show("Transaction posted to the ledger.");
  }
  function add(e: React.FormEvent) {
    e.preventDefault();
    setAdding(false);
    show("Transaction saved as a draft.");
  }

  return (
    <>
      <header className={s.greeting}>
        <div>
          <h2>
            Transactions <span>· {rows.length} this month</span>
          </h2>
          <p>Every sale, bill and transfer keeps its own currency and exchange rate.</p>
        </div>
        <div className={s.actions}>
          <button type="button" className={`${s.btn} ${s.btnLight}`} onClick={() => show("Export started. You'll get a CSV by email.")}>
            <Icon name="download" size={15} /> Export
          </button>
          <button type="button" className={`${s.btn} ${s.btnDark}`} onClick={() => setAdding((v) => !v)} aria-expanded={adding}>
            <Icon name="plus" size={15} /> Add transaction
          </button>
        </div>
      </header>

      {adding && (
        <article className={s.card}>
          <div className={s.cardHead}>
            <div>
              <h3>New transaction</h3>
              <p>Saved as a draft until you post it</p>
            </div>
          </div>
          <form className={s.form} onSubmit={add}>
            <div className={s.formRow}>
              <div className={s.formField}>
                <label htmlFor="tx-type">Type</label>
                <select id="tx-type" defaultValue="sale">
                  <option value="sale">Sale</option>
                  <option value="bill">Supplier bill</option>
                  <option value="expense">Expense</option>
                  <option value="transfer">Transfer between accounts</option>
                </select>
              </div>
              <div className={s.formField}>
                <label htmlFor="tx-branch">Branch</label>
                <select id="tx-branch" defaultValue="central">
                  {branches.slice(1).map((b) => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
              </div>
              <div className={s.formField}>
                <label htmlFor="tx-date">Date</label>
                <input id="tx-date" type="date" defaultValue="2025-10-07" />
              </div>
            </div>
            <div className={s.formRow}>
              <div className={s.formField}>
                <label htmlFor="tx-desc">Description</label>
                <input id="tx-desc" placeholder="e.g. Supplier bill · Rice" required />
              </div>
              <div className={s.formField}>
                <label htmlFor="tx-amount">Amount</label>
                <input id="tx-amount" type="number" step="0.01" placeholder="0.00" required />
              </div>
              <div className={s.formField}>
                <label htmlFor="tx-cur">Currency</label>
                <select id="tx-cur" defaultValue="USD">
                  <option>USD</option>
                  <option>KHR</option>
                </select>
                <small>Rate today: 1 USD = 4,100 KHR</small>
              </div>
            </div>
            <div className={s.formActions}>
              <button type="button" className={`${s.btn} ${s.btnLight}`} onClick={() => setAdding(false)}>Cancel</button>
              <button type="submit" className={`${s.btn} ${s.btnDark}`}>Save draft</button>
            </div>
          </form>
        </article>
      )}

      <article className={s.card}>
        <div className={s.stats}>
          <div className={s.stat}><small>Inflows</small><b className={s.pos}>$9,420</b><span>+ ៛6,920,000</span></div>
          <div className={s.stat}><small>Outflows</small><b>$1,666</b><span>+ ៛404,000</span></div>
          <div className={s.stat}><small>Needs review</small><b className={review ? s.neg : undefined}>{review}</b><span>duplicates or unusual amounts</span></div>
          <div className={s.stat}><small>Unreconciled</small><b>1</b><span>ABA · 001</span></div>
        </div>

        <div className={s.toolbar}>
          <label className={s.input}>
            <Icon name="search" size={15} />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name or source…" aria-label="Search transactions" />
          </label>
          <div className={`${s.select} ${s.selectSq}`}>
            <select aria-label="Branch" value={branch} onChange={(e) => setBranch(e.target.value)}>
              {branches.map((b) => (
                <option key={b.id}>{b.name}</option>
              ))}
            </select>
            <Icon name="chevronDown" size={14} />
          </div>
          <div className={`${s.select} ${s.selectSq}`}>
            <select aria-label="Status" value={status} onChange={(e) => setStatus(e.target.value as typeof status)}>
              {["All", "Posted", "Matched", "Draft", "Needs review"].map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
            <Icon name="chevronDown" size={14} />
          </div>
          <div className={s.tabs} role="tablist" aria-label="Direction">
            {([["all", "All"], ["in", "Money in"], ["out", "Money out"]] as const).map(([k, label]) => (
              <button key={k} type="button" role="tab" aria-selected={kind === k} onClick={() => setKind(k)}>{label}</button>
            ))}
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
                <th />
              </tr>
            </thead>
            <tbody>
              {list.map((t) => (
                <tr key={t.id}>
                  <td>
                    <div className={s.txName}>
                      <span className={s.txIcon}><Icon name={t.icon} size={15} /></span>
                      <span><b>{t.name}</b><small>{t.date}</small></span>
                    </div>
                  </td>
                  <td className={s.muted}>{t.branch}</td>
                  <td className={s.muted}>{t.source}</td>
                  <td><span className={`${s.pill} ${statusTone[t.status]}`}>{t.status}</span></td>
                  <td className={`${s.amt} ${t.inflow ? s.amtIn : s.amtOut}`}>{t.amount}<span className={s.cur}>{t.currency}</span></td>
                  <td>
                    <div className={s.rowActions}>
                      {t.status === "Needs review" || t.status === "Draft" ? (
                        <button type="button" className={`${s.miniBtn} ${s.miniPrimary}`} onClick={() => post(t.id)}>Post</button>
                      ) : (
                        <button type="button" className={s.miniBtn} onClick={() => show("Opening the records behind this entry…")}>View</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {list.length === 0 && (
                <tr><td colSpan={6} className={s.muted} style={{ textAlign: "center", padding: 28 }}>No transactions match these filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className={s.footerRow}>
          <span>Showing {list.length} of {rows.length}</span>
          <div className={s.pager}>
            <button type="button" disabled aria-label="Previous"><Icon name="arrowLeft" size={13} /></button>
            <button type="button" aria-current="page">1</button>
            <button type="button" disabled aria-label="Next"><Icon name="arrowRight" size={13} /></button>
          </div>
        </div>
      </article>
      {toast}
    </>
  );
}
