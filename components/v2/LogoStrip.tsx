import s from "@/app/v2/v2.module.css";
import Icon from "@/components/Icon";
import { logos } from "@/data/v2";

/** Endless "trusted by" marquee. The list is rendered twice so the loop is seamless. */
export default function LogoStrip() {
  return (
    <section className={s.logoStrip} aria-label="Trusted by">
      <p>Trusted by fast-growing teams everywhere</p>
      <div className={s.marquee}>
        <div className={s.marqueeTrack}>
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1}>
              {logos.map((l) => (
                <li key={l.name}>
                  <Icon name={l.icon} size={20} />
                  {l.name}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
