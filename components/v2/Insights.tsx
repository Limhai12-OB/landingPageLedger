import s from "@/app/v2/v2.module.css";
import Icon from "@/components/Icon";
import { articles } from "@/data/v2";
import SectionHead from "./SectionHead";
import ArticleArt from "./ArticleArt";
import { delay } from "./motion";

export default function Insights() {
  return (
    <section className={`${s.section} ${s.container}`} id="insights" aria-labelledby="insights-title">
      <SectionHead
        id="insights-title"
        badge="Insights"
        title="Insights, guides and ideas"
        muted="to grow your business"
        intro="Learn how to manage customers, understand performance, and make smarter decisions through practical articles."
      />

      <div className={s.articles}>
        {articles.map((a, i) => (
          <a key={a.title} href="#insights" className={s.article} data-reveal="" style={delay(i, 120)}>
            <div className={s.articleMedia}>
              {/* Swap ArticleArt for <Photo src="/images/v2/..."/> once real photos exist. */}
              <ArticleArt kind={a.tone} />
              <span className={s.tags}>
                <span className={s.tagAccent}>{a.tag}</span>
                <span>{a.read}</span>
              </span>
            </div>
            <div className={s.articleBody}>
              <span>
                <h3>{a.title}</h3>
                <time>{a.date}</time>
              </span>
              <span className={s.articleGo}>
                <Icon name="arrowUpRight" size={16} />
              </span>
            </div>
          </a>
        ))}
      </div>

      <div className={s.center} data-reveal="">
        <a href="#insights" className={`${s.btn} ${s.btnLight}`}>
          View all articles <Icon name="arrowRight" size={15} />
        </a>
      </div>
    </section>
  );
}
