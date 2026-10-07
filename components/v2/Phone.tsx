import s from "@/app/v2/v2.module.css";
import Icon, { type IconName } from "@/components/Icon";
import LineChart from "./LineChart";
import Orb from "./Orb";

export type Screen = "overview" | "balance" | "assistant";

const activity: { name: string; when: string; amount: string; up: boolean; icon: IconName; bg: string }[] = [
  { name: "Online store sale", when: "Today, 10:24", amount: "+$1,240", up: true, icon: "bag", bg: "#05014b" },
  { name: "Coffee supplies", when: "Today, 08:10", amount: "-$86", up: false, icon: "coffee", bg: "#8c89fd" },
  { name: "Client invoice #208", when: "Yesterday", amount: "+$3,500", up: true, icon: "wallet", bg: "#2913fa" },
  { name: "Team subscription", when: "Mon, 14:02", amount: "-$240", up: false, icon: "users", bg: "#8a8f98" },
];

/** Segmented progress bar: `filled` of `total` segments, fading from brand blue to grey. Fills in when revealed. */
export function Segments({ filled = 11, total = 18 }: { filled?: number; total?: number }) {
  return (
    <div className={s.segments} aria-hidden="true">
      {Array.from({ length: total }, (_, i) => (
        <i
          key={i}
          className={i < filled ? s.segOn : undefined}
          style={{ "--i": i, opacity: i < filled ? 1 - (i / filled) * 0.5 : 1 } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

function Overview() {
  return (
    <>
      <div className={s.scTop}>
        <Icon name="menu" size={15} />
        <span className={s.scAvatar}>A</span>
      </div>
      <div className={s.scHead}>
        <small>Total revenue</small>
        <b>$48,920</b>
        <em>▲ 12.5% vs last month</em>
      </div>
      <div className={s.scCard}>
        <div className={s.scRow}>
          <span>
            <b>Progress 68%</b> of $72,000
          </span>
          <Icon name="arrowUpRight" size={11} />
        </div>
        <Segments filled={12} total={18} />
      </div>
      <div className={s.scList}>
        <div className={s.scRow}>
          <b>Recent activity</b>
          <small>See all</small>
        </div>
        {activity.map((a) => (
          <div key={a.name} className={s.scItem}>
            <span className={s.scIcon} style={{ background: a.bg }}>
              <Icon name={a.icon} size={12} />
            </span>
            <span className={s.scItemText}>
              <b>{a.name}</b>
              <small>{a.when}</small>
            </span>
            <em className={a.up ? s.up : s.down}>{a.amount}</em>
          </div>
        ))}
      </div>
      <TabBar />
    </>
  );
}

function Balance() {
  return (
    <>
      <div className={s.scTop}>
        <Icon name="arrowLeft" size={14} />
        <small>Balance</small>
        <Icon name="share" size={13} />
      </div>
      <div className={s.scHead}>
        <small>Total balance</small>
        <b>$48,500</b>
        <em>▲ 8.2% this quarter</em>
      </div>
      <div className={s.scChart}>
        <LineChart marker={8} tip="$32,410" />
        <div className={s.months}>
          <span>Jan</span><span>Mar</span><span>May</span><span className={s.on}>Sep</span><span>Dec</span>
        </div>
      </div>
      <div className={s.scTiles}>
        <div>
          <small>Income</small>
          <b>$62,180</b>
        </div>
        <div>
          <small>Expenses</small>
          <b>$13,680</b>
        </div>
      </div>
      <div className={s.scBars}>
        {[["Sales", 82], ["Services", 54], ["Other", 26]].map(([k, v]) => (
          <div key={k}>
            <span>{k}</span>
            <i style={{ "--w": `${v}%` } as React.CSSProperties} />
          </div>
        ))}
      </div>
      <TabBar />
    </>
  );
}

function Assistant() {
  return (
    <>
      <div className={s.scTop}>
        <Icon name="arrowLeft" size={14} />
        <small>AI insight</small>
        <span />
      </div>
      <p className={s.scAi}>
        Revenue grew 18% this quarter. If these continue to rise over the course of a year, it will outpace your
        forecast by $9,200.
      </p>
      <div className={s.scChips}>
        <span>Why did sales grow?</span>
        <span>Forecast next month</span>
        <span>Top customers</span>
      </div>
      <div className={s.scOrb}>
        <Orb size={58} />
        <small>Tap to ask your AI assistant</small>
      </div>
    </>
  );
}

function TabBar() {
  return (
    <nav className={s.scTabs} aria-hidden="true">
      <Icon name="home" size={14} />
      <Icon name="chart" size={14} />
      <span className={s.scFab}>
        <Icon name="sparkle" size={13} />
      </span>
      <Icon name="wallet" size={14} />
      <Icon name="user" size={14} />
    </nav>
  );
}

/** Phone mockup. `size` scales the whole device (base width 270px). */
export default function Phone({ screen = "overview", size = 1, className }: { screen?: Screen; size?: number; className?: string }) {
  return (
    <div className={`${s.phone} ${className ?? ""}`} style={{ zoom: size }} aria-hidden="true">
      <span className={s.phoneBtn} />
      <div className={s.phoneScreen}>
        <span className={s.island} />
        <div className={s.status}>
          <b>9:41</b>
          <span>
            <i /> <i /> <i />
          </span>
        </div>
        {screen === "overview" && <Overview />}
        {screen === "balance" && <Balance />}
        {screen === "assistant" && <Assistant />}
      </div>
    </div>
  );
}
