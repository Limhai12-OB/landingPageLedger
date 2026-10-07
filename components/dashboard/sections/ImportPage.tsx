"use client";

import { useState } from "react";
import s from "@/app/dashboard.module.css";
import Icon from "@/components/Icon";
import { importMethods, importQueue, recentImports, type ImportMethod } from "@/data/dashboard-sections";
import { useToast } from "./Toast";

export default function ImportPage() {
  const [method, setMethod] = useState<ImportMethod["id"]>("snap");
  const [queue, setQueue] = useState(importQueue);
  const [toast, show] = useToast();
  const active = importMethods.find((m) => m.id === method)!;

  function approve(id: string) {
    setQueue((q) => q.filter((r) => r.id !== id));
    show("Posted to the ledger.");
  }
  function reject(id: string) {
    setQueue((q) => q.filter((r) => r.id !== id));
    show("Record discarded.");
  }

  return (
    <>
      <header className={s.greeting}>
        <div>
          <h2>
            Data import <span>· snap it, AI books it</span>
          </h2>
          <p>AI reads, cleans and flags every record. You review it before it is posted.</p>
        </div>
        <div className={s.actions}>
          <button type="button" className={`${s.btn} ${s.btnDark}`} onClick={() => show("3 photos added to the review queue.")}>
            <Icon name="camera" size={15} /> Snap a receipt
          </button>
        </div>
      </header>

      <div className={s.twoCol}>
        <div className={s.stack}>
          <article className={s.card}>
            <div className={s.methods} role="group" aria-label="Import method">
              {importMethods.map((m) => (
                <button key={m.id} type="button" className={s.method} aria-pressed={method === m.id} onClick={() => setMethod(m.id)}>
                  <span className={s.kpiIcon}><Icon name={m.icon} size={17} /></span>
                  <b>{m.title}</b>
                  <p>{m.text}</p>
                </button>
              ))}
            </div>
            <div className={s.dropzone}>
              <span className={s.kpiIcon}><Icon name="upload" size={20} /></span>
              <b>Drop {active.title.toLowerCase()} files here</b>
              <small>{active.accept} · up to 20 files at once · Khmer and English</small>
              <button type="button" className={`${s.btn} ${s.btnLight} ${s.btnSm}`} style={{ marginTop: 8 }} onClick={() => show("2 files added to the review queue.")}>
                Choose files
              </button>
            </div>
          </article>

          <article className={s.card}>
            <div className={s.cardHead}>
              <div>
                <h3>Review queue</h3>
                <p>What AI read from each file. Fix anything, then approve.</p>
              </div>
              <div>
                <span className={`${s.pill} ${s.warn}`}>{queue.filter((r) => r.flag).length} flagged</span>
                <span className={`${s.pill} ${s.info}`}>{queue.length} waiting</span>
              </div>
            </div>
            <div className={s.tableWrap}>
              <table className={s.table}>
                <thead>
                  <tr>
                    <th>File</th>
                    <th>Vendor · date</th>
                    <th>Branch</th>
                    <th>Confidence</th>
                    <th style={{ textAlign: "right" }}>Amount</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {queue.map((r) => (
                    <tr key={r.id}>
                      <td>
                        <div className={s.txName}>
                          <span className={s.txIcon}><Icon name={r.file.endsWith(".pdf") ? "folder" : "camera"} size={15} /></span>
                          <span>
                            <b>{r.file}</b>
                            <small>{r.lang === "KH" ? "Khmer" : "English"} · {r.category}</small>
                          </span>
                        </div>
                      </td>
                      <td>
                        <b style={{ fontWeight: 500 }}>{r.vendor}</b>
                        <br />
                        <small className={s.muted}>{r.date}{r.flag && <> · <span className={s.neg}>{r.flag}</span></>}</small>
                      </td>
                      <td className={s.muted}>{r.branch}</td>
                      <td>
                        <div className={`${s.bar} ${r.confidence < 80 ? s.low : ""}`}>
                          <i style={{ "--w": `${r.confidence}%` } as React.CSSProperties} />
                          <span>{r.confidence}%</span>
                        </div>
                      </td>
                      <td className={s.amt}>{r.amount}<span className={s.cur}>{r.currency}</span></td>
                      <td>
                        <div className={s.rowActions}>
                          <button type="button" className={`${s.miniBtn} ${s.miniDanger}`} onClick={() => reject(r.id)}>Discard</button>
                          <button type="button" className={`${s.miniBtn} ${s.miniPrimary}`} onClick={() => approve(r.id)}><Icon name="check" size={12} /> Approve</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {queue.length === 0 && (
                    <tr><td colSpan={6} className={s.muted} style={{ textAlign: "center", padding: 28 }}>Queue is empty. Nice work.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </article>
        </div>

        <div className={s.stack}>
          <article className={s.card}>
            <div className={s.cardHead}>
              <div>
                <h3>Recent imports</h3>
                <p>Last 30 days</p>
              </div>
            </div>
            <ul className={s.rows}>
              {recentImports.map((r) => (
                <li key={r.name} className={s.rowItem}>
                  <span className={s.rowIcon}><Icon name={r.icon} size={16} /></span>
                  <b>{r.name}</b>
                  <small>{r.when} · {r.rows} rows · {r.status}</small>
                  <span className={s.rowEnd}><Icon name="arrowUpRight" size={14} /></span>
                </li>
              ))}
            </ul>
          </article>
          <article className={s.card}>
            <div className={s.cardHead}>
              <div>
                <h3>What AI checks</h3>
              </div>
            </div>
            <ul className={s.rows}>
              {[
                ["checkCircle", "Duplicates", "Same vendor, date and amount as an existing record"],
                ["alert", "Odd amounts", "Far from the usual amount for that vendor"],
                ["globe", "Language and currency", "Khmer or English, USD or KHR, with the day's rate"],
                ["layers", "Category", "Suggested from past entries, you can change it"],
              ].map(([icon, title, text]) => (
                <li key={title} className={s.rowItem}>
                  <span className={s.rowIcon}><Icon name={icon as "alert"} size={16} /></span>
                  <b>{title}</b>
                  <small>{text}</small>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
      {toast}
    </>
  );
}
