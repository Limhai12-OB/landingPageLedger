import s from "@/app/v2/v2.module.css";
import Icon from "@/components/Icon";
import Avatar from "@/components/Avatar";
import Phone from "./Phone";
import Orb from "./Orb";

export default function Hero() {
  return (
    <section className={s.hero} id="top">
      <div className={s.heroBg} aria-hidden="true" />

      <div className={`${s.heroGrid} ${s.container}`}>
        <div className={s.heroCopy}>
          <a href="#features" className={s.announce}>
            <span>New</span> AI insights 2.0 is here
            <Icon name="arrowRight" size={13} />
          </a>
          <h1>
            <span>Drive growth</span>
            <span>confidently with</span>
            <span className={s.mutedText}>insight at every step</span>
          </h1>
          <p>
            Understand customers, track sales performance, and make smarter decisions with AI-powered insights, all in
            one simple app.
          </p>
          <div className={s.heroActions}>
            <a href="#pricing" className={`${s.btn} ${s.btnDark}`}>
              Get Started <Icon name="arrowRight" size={15} />
            </a>
            <a href="#features" className={`${s.btn} ${s.btnLight}`}>
              See how it works
            </a>
          </div>
          <div className={s.trust}>
            <span className={s.avatarStack}>
              {["Ana Li", "Ben Ko", "Cy Ma", "Di Ro"].map((n, i) => (
                <Avatar key={n} name={n} size={30} tone={i} />
              ))}
            </span>
            <span>
              <b>14,500+</b> businesses
              <br />
              grow with us every day
            </span>
          </div>
        </div>

        <div className={s.heroArt}>
          <span className={s.ring} aria-hidden="true" />
          <span className={`${s.ring} ${s.ring2}`} aria-hidden="true" />
          <div className={s.heroPhone}>
            <div className={s.floatY}>
              <Phone screen="overview" />
            </div>
          </div>

          <div className={`${s.chip} ${s.chipA}`} aria-hidden="true">
            <span className={s.chipIcon}>
              <Icon name="chart" size={15} />
            </span>
            <span>
              <small>Monthly revenue</small>
              <b>
                $48.9K <em className={s.up}>+12.5%</em>
              </b>
            </span>
          </div>
          <div className={`${s.chip} ${s.chipB}`} aria-hidden="true">
            <Orb size={30} />
            <span>
              <small>AI insight</small>
              <b>Sales up 18% this quarter</b>
            </span>
          </div>
          <div className={`${s.chip} ${s.chipC}`} aria-hidden="true">
            <Icon name="checkCircle" size={16} />
            <b>Target reached</b>
          </div>
        </div>
      </div>
    </section>
  );
}
