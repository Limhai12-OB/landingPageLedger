"use client";

import { useState } from "react";
import s from "@/app/dashboard.module.css";
import Icon from "@/components/Icon";
import { invoices, payMethods, posSales, type Invoice } from "@/data/dashboard-sections";
import { useToast } from "./Toast";

const tone: Record<Invoice["status"], string> = { Paid: s.ok, Sent: s.info, Overdue: s.danger, Draft: s.neutral };

export default function SalesPage() {
  const [tab, setTab] = useState<"invoices" | "pos" | "shopify">("invoices");
  const [toast, show] = useToast();

  return (
    <>
      <header className={s.greeting}>
        <div>
          <h2>
            Sales & invoices <span>· October</span>
          </h2>
          <p>Invoices, POS sales and Shopify orders, with WeBill365 and KHQR payments matched automatically.</p>
        </div>
        <div className={s.actions}>
          <button type="button" className={`${s.btn} ${s.btnLight}`} onClick={() => show("Listening… say the customer, items and amount in Khmer or English.")}>
            <Icon name="mic" size={15} /> Voice-to-invoice
          </button>
          <button type="button" className={`${s.btn} ${s.btnDark}`} onClick={() => show("New invoice draft created (INV-213).")}>
            <Icon name="plus" size={15} /> New invoice
          </button>
        </div>
      </header>

      <div className={s.twoCol}>
        <article className={s.card}>
          <div className={s.stats}>
            <div className={s.stat}><small>Sales today</small><b>$2,880</b><span>all branches</span></div>
            <div className={s.stat}><small>Open invoices</small><b>$1,060</b><span>2 invoices</span></div>
            <div className={s.stat}><small>Overdue</small><b className={s.neg}>$420</b><span>1 invoice · 5 days</span></div>
            <div className={s.stat}><small>Paid via KHQR</small><b>38%</b><span>of this month&apos;s sales</span></div>
          </div>

          <div className={s.toolbar}>
            <div className={s.tabs} role="tablist" aria-label="Sales type">
              <button type="button" role="tab" aria-selected={tab === "invoices"} onClick={() => setTab("invoices")}>Invoices<em>{invoices.length}</em></button>
              <button type="button" role="tab" aria-selected={tab === "pos"} onClick={() => setTab("pos")}>POS sales</button>
              <button type="button" role="tab" aria-selected={tab === "shopify"} onClick={() => setTab("shopify")}>Shopify</button>
            </div>
            <button type="button" className={`${s.btn} ${s.btnLight} ${s.btnSm}`}><Icon name="filter" size={14} /> Filter</button>
          </div>

          {tab === "invoices" && (
            <div className={s.tableWrap}>
              <table className={s.table}>
                <thead>
                  <tr>
                    <th>Invoice</th>
                    <th>Branch</th>
                    <th>Issued</th>
                    <th>Due</th>
                    <th>Status</th>
                    <th style={{ textAlign: "right" }}>Amount</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((inv) => (
                    <tr key={inv.no}>
                      <td>
                        <div className={s.txName}>
                          <span className={s.txIcon}><Icon name="bag" size={15} /></span>
                          <span><b>{inv.customer}</b><small>{inv.no}{inv.via && ` · paid via ${inv.via}`}</small></span>
                        </div>
                      </td>
                      <td className={s.muted}>{inv.branch}</td>
                      <td className={s.muted}>{inv.issued}</td>
                      <td className={inv.status === "Overdue" ? s.neg : s.muted}>{inv.due}</td>
                      <td><span className={`${s.pill} ${tone[inv.status]}`}>{inv.status}</span></td>
                      <td className={s.amt}>{inv.amount}<span className={s.cur}>{inv.currency}</span></td>
                      <td>
                        <div className={s.rowActions}>
                          {inv.status === "Overdue" && <button type="button" className={`${s.miniBtn} ${s.miniPrimary}`} onClick={() => show("Reminder sent on Telegram and email.")}>Remind</button>}
                          {inv.status === "Draft" && <button type="button" className={`${s.miniBtn} ${s.miniPrimary}`} onClick={() => show("Invoice sent with a KHQR code.")}>Send</button>}
                          {(inv.status === "Paid" || inv.status === "Sent") && <button type="button" className={s.miniBtn} onClick={() => show("Opening PDF…")}>PDF</button>}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab !== "invoices" && (
            <ul className={s.rows}>
              {posSales
                .filter((p) => (tab === "shopify" ? p.name.includes("Shopify") : !p.name.includes("Shopify")))
                .map((p) => (
                  <li key={p.name} className={s.rowItem}>
                    <span className={s.rowIcon}><Icon name={tab === "shopify" ? "bag" : "grid"} size={16} /></span>
                    <b>{p.name}</b>
                    <small>{p.when} · {p.items} items</small>
                    <span className={s.rowEnd}>
                      <b className={s.pos}>{p.amount}</b>
                      <span className={`${s.pill} ${s.ok}`}>Posted</span>
                    </span>
                  </li>
                ))}
            </ul>
          )}
        </article>

        <div className={s.stack}>
          <article className={s.card}>
            <div className={s.cardHead}>
              <div>
                <h3>Payment methods</h3>
                <p>Share of this month&apos;s sales</p>
              </div>
            </div>
            <ul className={s.cats}>
              {payMethods.map((m) => (
                <li key={m.name}>
                  <i style={{ background: m.color }} />
                  {m.name}
                  <b>{m.pct}%</b>
                </li>
              ))}
            </ul>
            <div className={s.divider} style={{ margin: "12px 0" }} />
            <p className={s.note}>KHQR and ABA payments are matched to invoices on reference and amount. Cash is confirmed at the till count.</p>
          </article>

          <article className={`${s.card} ${s.advisor}`}>
            <div className={s.cardHead}>
              <div>
                <h3>Voice-to-invoice</h3>
                <p>New · Khmer and English</p>
              </div>
            </div>
            <p className={s.advisorText}>&ldquo;Invoice Mekong Café, 40 cases of water at $8, due in two weeks.&rdquo;</p>
            <p className={s.note} style={{ color: "rgba(255,255,255,.7)", marginTop: 10 }}>Say it, check the draft, send it with a KHQR code.</p>
          </article>
        </div>
      </div>
      {toast}
    </>
  );
}
