"use client";

import { useState } from "react";
import s from "@/app/dashboard.module.css";
import Icon from "@/components/Icon";
import ForecastChart, { applyWhatIf, type WhatIf } from "@/components/dashboard/ForecastChart";
import { forecast } from "@/data/dashboard";
import { scheduled } from "@/data/dashboard-sections";
import { useToast } from "./Toast";

const base: WhatIf = { salesPct: 0, delayDays: 0, extraExpense: 0 };

export default function ForecastPage() {
  const [w, setW] = useState<WhatIf>(base);
  const [safety, setSafety] = useState(forecast.safety);
  const [toast, show] = useToast();
  const changed = w.salesPct !== 0 || w.delayDays !== 0 || w.extraExpense !== 0;

  const adjusted = applyWhatIf(forecast.expected, w);
  const crunch = adjusted.findIndex((v) => v < safety);
  const low = Math.min(...adjusted);

  return (
    <>
      <header className={s.greeting}>
        <div>
          <h2>
            Cash forecast <span>· next 90 days</span>
          </h2>
          <p>Expected line from scheduled inflows and outflows, plus what usually happens in your shops.</p>
        </div>
        <div className={s.actions}>
          <button type="button" className={`${s.btn} ${s.btnLight}`} onClick={() => show("Forecast exported as PDF.")}><Icon name="download" size={15} /> Export</button>
          <button type="button" className={`${s.btn} ${s.btnDark}`} disabled={!changed} onClick={() => show("Scenario saved. You can compare it any time.")}><Icon name="plus" size={15} /> Save scenario</button>
        </div>
      </header>

      <div className={s.twoCol}>
        <div className={s.stack}>
          <ForecastChart whatIf={w} safety={safety} />

          <article className={s.card}>
            <div className={s.cardHead}>
              <div>
                <h3>Scheduled money in and out</h3>
                <p>Bills, wages, orders and invoices already on the calendar</p>
              </div>
              <div>
                <button type="button" className={`${s.btn} ${s.btnLight} ${s.btnSm}`} onClick={() => show("Add a scheduled payment or expected income.")}><Icon name="plus" size={14} /> Add</button>
              </div>
            </div>
            <ul className={s.rows}>
              {[...scheduled].sort((a, b) => a.day - b.day).map((e) => (
                <li key={e.name} className={s.rowItem}>
                  <span className={s.rowIcon} style={e.inflow ? { background: "#dcfce7", color: "#15803d" } : undefined}><Icon name={e.icon} size={16} /></span>
                  <b>{e.name}</b>
                  <small>Day {e.day}{e.name.includes("Angkor Rice") && w.delayDays ? ` → ${e.day + w.delayDays}` : ""} · {e.branch}</small>
                  <span className={s.rowEnd}>
                    <b className={e.inflow ? s.pos : undefined}>{e.inflow ? "+" : "−"}${e.amount.toLocaleString()}</b>
                  </span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className={s.stack}>
          <article className={s.card}>
            <div className={s.cardHead}>
              <div>
                <h3>What-if</h3>
                <p>Test a change before you make it</p>
              </div>
              <div>
                {changed && <button type="button" className={s.miniBtn} onClick={() => setW(base)}>Reset</button>}
              </div>
            </div>
            <div className={s.form}>
              <div className={s.slider}>
                <label htmlFor="wi-sales">Sales change <b>{w.salesPct > 0 ? "+" : ""}{w.salesPct}%</b></label>
                <input id="wi-sales" type="range" min={-30} max={30} step={5} value={w.salesPct} onChange={(e) => setW({ ...w, salesPct: Number(e.target.value) })} />
              </div>
              <div className={s.slider}>
                <label htmlFor="wi-delay">Delay Angkor Rice order <b>{w.delayDays} days</b></label>
                <input id="wi-delay" type="range" min={0} max={30} step={3} value={w.delayDays} onChange={(e) => setW({ ...w, delayDays: Number(e.target.value) })} />
              </div>
              <div className={s.slider}>
                <label htmlFor="wi-exp">New monthly expense <b>${w.extraExpense.toLocaleString()}</b></label>
                <input id="wi-exp" type="range" min={0} max={5000} step={250} value={w.extraExpense} onChange={(e) => setW({ ...w, extraExpense: Number(e.target.value) })} />
              </div>
            </div>
            <div className={s.divider} style={{ margin: "16px 0 12px" }} />
            <div className={s.stats} style={{ marginBottom: 0 }}>
              <div className={s.stat}>
                <small>Lowest point</small>
                <b className={low < safety ? s.neg : s.pos}>${low.toLocaleString()}</b>
              </div>
              <div className={s.stat}>
                <small>Below safety</small>
                <b className={crunch === -1 ? s.pos : s.neg}>{crunch === -1 ? "Never" : `Day ${crunch * 3}`}</b>
              </div>
            </div>
          </article>

          <article className={s.card}>
            <div className={s.cardHead}>
              <div>
                <h3>Safety level</h3>
                <p>You get a cash-crunch alert when the expected line drops below it</p>
              </div>
            </div>
            <form className={s.form} onSubmit={(e) => { e.preventDefault(); show("Safety level saved."); }}>
              <div className={s.formField}>
                <label htmlFor="safety">Minimum cash (USD)</label>
                <input id="safety" type="number" min={0} step={500} value={safety} onChange={(e) => setSafety(Math.max(0, Number(e.target.value)))} />
                <small>About {Math.round(safety / 800)} days of normal outflows</small>
              </div>
              <div className={s.formActions}>
                <button type="submit" className={`${s.btn} ${s.btnDark} ${s.btnSm}`}>Save</button>
              </div>
            </form>
          </article>

          <article className={`${s.card} ${s.advisor}`}>
            <div className={s.cardHead}>
              <div>
                <h3>Advisor</h3>
                <p>Based on the expected line</p>
              </div>
            </div>
            <p className={s.advisorText}>
              {crunch === -1
                ? "With these settings cash stays above your safety level for the full 90 days."
                : `Cash drops below $${safety.toLocaleString()} on day ${crunch * 3}, driven by the Angkor Rice order at Riverside. Delaying it by 2 weeks or moving $2,000 from Toul Kork covers it.`}
            </p>
          </article>
        </div>
      </div>
      {toast}
    </>
  );
}
