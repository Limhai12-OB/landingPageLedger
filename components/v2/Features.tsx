import s from "@/app/v2/v2.module.css";
import Icon from "@/components/Icon";
import { features, type Feature } from "@/data/v2";
import SectionHead from "./SectionHead";
import { Segments } from "./Phone";
import LineChart from "./LineChart";
import Orb from "./Orb";
import { delay } from "./motion";

function TargetWidget() {
  return (
    <div className={s.widgetInner}>
      <small className={s.wLabel}>Revenue target</small>
      <b className={s.wBig}>$48,920</b>
      <em className={s.wDelta}>
        <span className={s.up}>▲ 12.5%</span> from last month
      </em>
      <div className={s.wCard}>
        <div className={s.wCardRow}>
          <span>
            <b>Progress 68%</b> to quarterly goal
          </span>
          <Icon name="arrowUpRight" size={13} />
        </div>
        <small>$48,920 of $72,000 · 34 days left</small>
        <Segments filled={15} total={22} />
      </div>
      <div className={s.wMini}>
        <span>
          <small>Deals won</small>
          <b>128</b>
        </span>
        <span>
          <small>Avg. deal</small>
          <b>$382</b>
        </span>
        <span>
          <small>Win rate</small>
          <b>64%</b>
        </span>
      </div>
    </div>
  );
}

function BalanceWidget() {
  return (
    <div className={s.widgetInner}>
      <small className={s.wLabel}>Total balance</small>
      <b className={s.wBig}>$48,500</b>
      <div className={s.legend}>
        <span>
          <i style={{ background: "#2913fa" }} /> This year
        </span>
        <span>
          <i style={{ background: "#b7b6fe" }} /> Last year
        </span>
      </div>
      <div className={s.wChart}>
        <LineChart marker={8} tip="$32,410" />
        <div className={s.months}>
          <span>Jan</span>
          <span>Mar</span>
          <span>May</span>
          <span>Jul</span>
          <span className={s.on}>Sep</span>
          <span>Nov</span>
        </div>
      </div>
    </div>
  );
}

function AiWidget() {
  return (
    <div className={`${s.widgetInner} ${s.wAi}`}>
      <span className={s.aiTag}>
        <Icon name="sparkle" size={13} /> AI summary
      </span>
      <p>
        Revenue grew <mark>18%</mark> this quarter. If these continue to rise over the course of a year, it will
        outpace your forecast by <mark>$9,200</mark>.
      </p>
      <div className={s.wOrb}>
        <span className={s.orbWrap}>
          <Orb size={64} />
        </span>
        <small>Tap to ask your AI assistant</small>
      </div>
    </div>
  );
}

const widgets: Record<Feature["widget"], () => React.JSX.Element> = {
  target: TargetWidget,
  balance: BalanceWidget,
  ai: AiWidget,
};

export default function Features() {
  return (
    <section className={`${s.section} ${s.container}`} id="features" aria-labelledby="features-title">
      <SectionHead
        id="features-title"
        badge="Features"
        title="See your business clearly"
        muted="all in one place"
        intro="Track customers, revenue, expenses and growth trends in one place, without jumping between tools or spreadsheets."
      />

      <div className={s.featureList}>
        {features.map((f, idx) => {
          const Widget = widgets[f.widget];
          return (
            <article key={f.title} className={`${s.feature} ${idx % 2 ? s.featureFlip : ""}`} data-reveal="">
              <div className={s.featureText}>
                <span className={s.featureNum}>0{idx + 1}</span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
                <ul>
                  {f.points.map((p) => (
                    <li key={p.label}>
                      <span>
                        <Icon name={p.icon} size={14} />
                      </span>
                      {p.label}
                    </li>
                  ))}
                </ul>
                <a href="#pricing" className={s.link}>
                  Learn more <Icon name="arrowRight" size={14} />
                </a>
              </div>
              <div className={s.widget} data-reveal="scale" style={delay(2)}>
                <Widget />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
