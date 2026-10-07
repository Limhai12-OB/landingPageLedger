"use client";

import s from "@/app/dashboard.module.css";
import Icon from "@/components/Icon";
import Orb from "@/components/Orb";
import { advisor } from "@/data/dashboard";

/** AI advisor card: this week's insight, suggested questions and an ask box (Khmer or English, text or voice). */
export default function Advisor() {
  return (
    <article className={`${s.card} ${s.advisor}`}>
      <div className={s.cardHead}>
        <div className={s.advisorHead}>
          <Orb size={38} />
          <div>
            <h3>AI advisor</h3>
            <p>This week, across all branches</p>
          </div>
        </div>
      </div>
      <p className={s.advisorText}>{advisor.insight}</p>
      <div className={s.advisorChips}>
        {advisor.chips.map((c) => (
          <button key={c} type="button">
            {c}
          </button>
        ))}
      </div>
      <form className={s.ask} onSubmit={(e) => e.preventDefault()}>
        <input type="text" placeholder="Ask in Khmer or English…" aria-label="Ask the AI advisor" />
        <button type="button" className={s.mic} aria-label="Ask by voice">
          <Icon name="mic" size={17} />
        </button>
        <button type="submit" aria-label="Send">
          <Icon name="arrowRight" size={16} />
        </button>
      </form>
    </article>
  );
}
