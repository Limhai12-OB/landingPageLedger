"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import s from "@/app/dashboard.module.css";
import Icon from "@/components/Icon";
import { forecast } from "@/data/dashboard";

const H = 300, L = 58, R = 20, T = 24, B = 38;
const DAYS_PER_POINT = 3;

const fmt = (v: number) => (v >= 1000 || v <= -1000 ? `$${Number((v / 1000).toFixed(1))}k` : `$${v}`);

export type WhatIf = { salesPct: number; delayDays: number; extraExpense: number };

/** Supplier order in `scheduled` data (day 36, $6,500). Delaying it moves that outflow later. */
const ORDER_DAY = 36, ORDER_AMOUNT = 6500, INFLOWS_90D = 62180;

/** Applies what-if settings to a cash series (one point per 3 days). */
export function applyWhatIf(series: number[], w: WhatIf) {
  const n = series.length;
  const orderIdx = Math.round(ORDER_DAY / DAYS_PER_POINT);
  const delayIdx = Math.round(w.delayDays / DAYS_PER_POINT);
  return series.map((v, i) => {
    let out = v + (INFLOWS_90D * (w.salesPct / 100) * i) / (n - 1);
    if (i >= orderIdx && i < orderIdx + delayIdx) out += ORDER_AMOUNT;
    if (i > 0) out -= w.extraExpense * Math.min(i, 10) / 10;
    return Math.round(out);
  });
}

/** Interactive forecast: preserve actual data points and show the scenario envelope. */
export default function ForecastChart({ whatIf, safety = forecast.safety }: { whatIf?: WhatIf; safety?: number } = {}) {
  const [range, setRange] = useState<30 | 60 | 90>(90);
  const [selected, setSelected] = useState(0);
  const [W, setPlotWidth] = useState(720);
  const plotRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = plotRef.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => setPlotWidth(Math.max(280, Math.round(entry.contentRect.width))));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const id = useId().replace(/:/g, "");
  const n = Math.min(forecast.expected.length, Math.floor(range / DAYS_PER_POINT) + 1);
  const adj = (a: number[]) => (whatIf ? applyWhatIf(a, whatIf) : a).slice(0, n);
  const expected = adj(forecast.expected), upper = adj(forecast.upper), lower = adj(forecast.lower);
  const active = Math.min(selected, n - 1);
  const lastDay = (n - 1) * DAYS_PER_POINT;
  const yMin = Math.floor(Math.min(...lower, safety, 0) / 10000) * 10000;
  const yMax = Math.ceil(Math.max(...upper, safety, 10000) / 10000) * 10000;
  const x = (i: number) => L + (i * (W - L - R)) / (n - 1);
  const y = (v: number) => T + ((yMax - v) / (yMax - yMin)) * (H - T - B);
  const pts = (a: number[]) => a.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`);
  const line = (a: number[]) => "M" + pts(a).join(" L");
  const money = (v: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(v);
  const ticks = Array.from({ length: 5 }, (_, i) => yMin + ((yMax - yMin) * i) / 4);
  const dayTicks = Array.from(new Set([0, Math.round((n - 1) / 3), Math.round(2 * (n - 1) / 3), n - 1]));
  const crunchIdx = expected.findIndex((v) => v < safety);
  const low = Math.min(...expected);
  const below = expected[active] < safety;
  const day = active === 0 ? "Today" : `Day ${active * DAYS_PER_POINT}`;

  return (
    <article className={`${s.card} ${s.forecastCard}`}>
      <div className={s.cardHead}>
        <div>
          <div className={s.forecastEyebrow}><span /> CASH OUTLOOK</div>
          <h3>Cash forecast</h3>
          <p>A clear view of the cash ahead. All amounts in USD.</p>
        </div>
        <div className={s.forecastRanges} role="group" aria-label="Forecast range">
          {([30, 60, 90] as const).map((r) => <button key={r} type="button" aria-pressed={range === r} onClick={() => { setRange(r); setSelected(0); }}>{r} days</button>)}
        </div>
      </div>

      <div className={s.forecastMetrics}>
        <div><small>Cash today</small><b>{money(expected[0])}</b><span>Starting balance</span></div>
        <div><small>Lowest projected balance</small><b className={low < safety ? s.neg : s.pos}>{money(low)}</b><span>Over the next {lastDay} days</span></div>
        <div><small>Safety buffer</small><b>{money(safety)}</b><span>Your minimum cash level</span></div>
      </div>

      <div className={s.forecastReadout} aria-live="polite" aria-atomic="true">
        <span><b>{day}</b><small>Expected balance</small></span>
        <strong>{money(expected[active])}</strong>
        <span className={`${s.pill} ${below ? s.danger : s.ok}`}>{below ? "Below safety" : "Above safety"}</span>
        <small className={s.forecastBounds}>Range {money(lower[active])} to {money(upper[active])}</small>
      </div>
      <div ref={plotRef} className={s.forecastPlotScroll}>
        <svg className={s.forecastPlot} viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby={`${id}-title ${id}-desc`}
          onPointerMove={(event) => {
            const box = event.currentTarget.getBoundingClientRect();
            const px = (event.clientX - box.left) * W / box.width;
            setSelected(Math.max(0, Math.min(n - 1, Math.round((px - L) / (W - L - R) * (n - 1)))));
          }}>
          <title id={`${id}-title`}>{`Cash forecast through day ${lastDay}`}</title>
          <desc id={`${id}-desc`}>{`Expected cash starts at ${money(expected[0])}, reaches a low of ${money(low)}, and ends at ${money(expected[n - 1])}. The shaded range shows best and worst scenarios. Safety level: ${money(safety)}. Use the slider below to explore every data point.`}</desc>
          <defs>
            <linearGradient id={`${id}-area`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1D33BA" stopOpacity=".16" /><stop offset="100%" stopColor="#1D33BA" stopOpacity="0" /></linearGradient>
          </defs>
          {ticks.map((v) => <g key={v}><line className={s.forecastGrid} x1={L} x2={W - R} y1={y(v)} y2={y(v)} /><text className={s.forecastAxis} x={L - 12} y={y(v) + 4} textAnchor="end">{fmt(v)}</text></g>)}
          <polygon className={s.forecastEnvelope} points={[...pts(upper), ...pts(lower).reverse()].join(" ")} />
          <path d={`${line(expected)} L${x(n - 1)},${y(yMin)} L${L},${y(yMin)} Z`} fill={`url(#${id}-area)`} />
          <line className={s.forecastSafety} x1={L} x2={W - R} y1={y(safety)} y2={y(safety)} />
          <text className={s.forecastSafetyText} x={W - R - 4} y={y(safety) - 9} textAnchor="end">Safety {money(safety)}</text>
          <path className={s.forecastLine} d={line(expected)} />
          {crunchIdx !== -1 && <g><circle cx={x(crunchIdx)} cy={y(expected[crunchIdx])} r="9" fill="#DC2626" fillOpacity=".12" /><circle cx={x(crunchIdx)} cy={y(expected[crunchIdx])} r="4" fill="#FFFFFF" stroke="#DC2626" strokeWidth="2" /></g>}
          <line className={s.forecastCursor} x1={x(active)} x2={x(active)} y1={T} y2={H - B} />
          <circle cx={x(active)} cy={y(expected[active])} r="9" fill="#1D33BA" fillOpacity=".12" />
          <circle cx={x(active)} cy={y(expected[active])} r="4.5" fill="#FFFFFF" stroke="#1D33BA" strokeWidth="2.5" />
          {dayTicks.map((i) => <text key={i} className={s.forecastAxis} x={x(i)} y={H - 10} textAnchor={i === 0 ? "start" : i === n - 1 ? "end" : "middle"}>{i === 0 ? "Today" : `Day ${i * DAYS_PER_POINT}`}</text>)}
        </svg>
      </div>
      <div className={s.forecastScrubber}>
        <label htmlFor={`${id}-day`}>Explore forecast <span>{day}</span></label>
        <input id={`${id}-day`} type="range" min={0} max={n - 1} value={active} onChange={(event) => setSelected(Number(event.target.value))} aria-valuetext={`${day}: ${money(expected[active])}, ${below ? "below" : "above"} safety`} />
      </div>
      <div className={s.forecastLegend}>
        <span><i className={s.legendExpected} />Expected cash</span>
        <span><i className={s.legendEnvelope} />Best / worst range</span>
        <span><i className={s.legendSafety} />Safety buffer</span>
      </div>
      <div className={`${s.forecastInsight} ${crunchIdx === -1 ? s.forecastHealthy : ""}`}>
        <Icon name={crunchIdx === -1 ? "target" : "bell"} size={18} />
        <p>{crunchIdx === -1 ? <>Expected cash stays above your safety buffer through <b>day {lastDay}.</b></> : <>Expected cash falls below your buffer on <b>day {crunchIdx * DAYS_PER_POINT}.</b> Plan ahead to cover the gap.</>}</p>
        {!whatIf && <Link href="/dashboard/forecast">Explore scenarios <Icon name="arrowRight" size={14} /></Link>}
      </div>
      <details className={s.forecastData}>
        <summary>View forecast data <span>Every 3 days{lastDay < range ? ` / available through day ${lastDay}` : ""}</span></summary>
        <div className={s.tableWrap}><table className={s.table}><caption className={s.note}>Projected cash in USD, including scenario adjustments</caption><thead><tr><th>Day</th><th>Expected</th><th>Worst case</th><th>Best case</th></tr></thead><tbody>{expected.map((value, i) => <tr key={i}><th scope="row">{i === 0 ? "Today" : i * DAYS_PER_POINT}</th><td>{money(value)}</td><td>{money(lower[i])}</td><td>{money(upper[i])}</td></tr>)}</tbody></table></div>
      </details>
    </article>
  );
}
