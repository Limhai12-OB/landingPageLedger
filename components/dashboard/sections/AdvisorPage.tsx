"use client";

import { useEffect, useRef, useState } from "react";
import s from "@/app/dashboard.module.css";
import Icon from "@/components/Icon";
import Orb from "@/components/Orb";
import { cannedReply, chat as initial, reports, suggested, type Msg } from "@/data/dashboard-sections";
import { useToast } from "./Toast";

export default function AdvisorPage() {
  const [msgs, setMsgs] = useState<Msg[]>(initial);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const [toast, show] = useToast();
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [msgs, typing]);

  function ask(q: string) {
    if (!q.trim() || typing) return;
    const km = /[ក-៿]/.test(q);
    setMsgs((m) => [...m, { role: "user", text: q, lang: km ? "km" : "en" }]);
    setText("");
    setTyping(true);
    // DEMO: canned reply. Replace with the AI advisor API.
    setTimeout(() => {
      setMsgs((m) => [...m, km ? { ...cannedReply, lang: "km", text: "តាមបន្ទាត់រំពឹងទុក សាច់ប្រាក់របស់អ្នកនៅលើកម្រិតសុវត្ថិភាព $12,000 រយៈពេល 47 ថ្ងៃ។ ការធ្លាក់ចុះមកពីការបញ្ជាទិញអង្ករនៅ Riverside ថ្ងៃទី 36។" } : cannedReply]);
      setTyping(false);
    }, 1100);
  }

  return (
    <>
      <header className={s.greeting}>
        <div>
          <h2>
            AI advisor <span>· ask your numbers anything</span>
          </h2>
          <p>Ask in Khmer or English. Every answer shows the records behind it.</p>
        </div>
      </header>

      <div className={s.twoCol}>
        <article className={s.card}>
          <div className={s.cardHead}>
            <div className={s.advisorHead}>
              <Orb size={36} />
              <div>
                <h3>Conversation</h3>
                <p>All branches · October</p>
              </div>
            </div>
            <div>
              <button type="button" className={s.miniBtn} onClick={() => setMsgs([])}>New chat</button>
            </div>
          </div>

          <div className={s.chat} aria-live="polite">
            {msgs.map((m, i) => (
              <div key={i} className={`${s.msg} ${m.role === "user" ? s.msgUser : s.msgAi}`} lang={m.lang}>
                {m.text}
                {m.evidence && (
                  <details className={s.evidence}>
                    <summary>
                      <Icon name="layers" size={13} /> Records behind this ({m.evidence.length})
                    </summary>
                    <ul>
                      {m.evidence.map((e) => (
                        <li key={e.name}>
                          <span>{e.name}</span>
                          <b>{e.amount}</b>
                        </li>
                      ))}
                    </ul>
                  </details>
                )}
                <small className={s.msgMeta}>{m.role === "user" ? "You" : "LedgerVision"}{m.lang === "km" ? " · ខ្មែរ" : ""}</small>
              </div>
            ))}
            {typing && (
              <div className={`${s.msg} ${s.msgAi}`}>
                <span className={s.typing} aria-label="Thinking"><i /><i /><i /></span>
              </div>
            )}
            {msgs.length === 0 && !typing && <p className={s.note}>Ask something like &ldquo;Cash next month?&rdquo; or pick a suggestion below.</p>}
            <div ref={endRef} />
          </div>

          <div className={s.advisorChips} style={{ marginBottom: 12 }}>
            {suggested.map((c) => (
              <button key={c} type="button" className={s.chip} onClick={() => ask(c)}>{c}</button>
            ))}
          </div>
          <form className={`${s.ask} ${s.askLight}`} onSubmit={(e) => { e.preventDefault(); ask(text); }}>
            <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Ask in Khmer or English…" aria-label="Ask the AI advisor" />
            <button type="button" className={s.mic} aria-label="Ask by voice" onClick={() => show("Listening… (voice demo)")}><Icon name="mic" size={17} /></button>
            <button type="submit" aria-label="Send" disabled={typing}><Icon name="arrowRight" size={16} /></button>
          </form>
        </article>

        <div className={s.stack}>
          <article className={s.card}>
            <div className={s.cardHead}>
              <div>
                <h3>Monthly AI reports</h3>
                <p>Generated on the 1st · exportable as PDF</p>
              </div>
            </div>
            <ul className={s.rows}>
              {reports.map((r) => (
                <li key={r.month} className={s.rowItem}>
                  <span className={s.rowIcon} style={{ background: "#fef3c7", color: "#b45309" }}><Icon name="calendar" size={16} /></span>
                  <b>{r.month}</b>
                  <small>{r.pages} pages · {r.note}</small>
                  <span className={s.rowEnd}>
                    <button type="button" className={s.miniBtn} onClick={() => show(`${r.month} report downloading…`)}><Icon name="download" size={12} /> PDF</button>
                  </span>
                </li>
              ))}
            </ul>
          </article>
          <article className={s.card}>
            <div className={s.cardHead}>
              <div>
                <h3>How it answers</h3>
              </div>
            </div>
            <ul className={s.rows}>
              {[
                ["globe", "Replies in the language you asked in", "Khmer or English, text or voice"],
                ["chart", "Compares periods", "This week vs last, this month vs last year"],
                ["layers", "Separates one-time from recurring", "So a bulk order doesn't look like a trend"],
                ["checkCircle", "Shows its work", "Every number links to the ledger records"],
              ].map(([icon, title, text]) => (
                <li key={title} className={s.rowItem}>
                  <span className={s.rowIcon}><Icon name={icon as "globe"} size={16} /></span>
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
