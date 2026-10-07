import Avatar from "./Avatar";
import { testimonials } from "@/data/testimonials";

function Stars({ n }: { n: number }) {
  return (
    <span className="stars" role="img" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="m12 2.8 2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4L2.8 9.5l6.4-.8z"
            fill={i < n ? "#f6c24a" : "#e4e4ea"}
          />
        </svg>
      ))}
    </span>
  );
}

export default function Testimonials() {
  const cols = [0, 1, 2].map((c) => testimonials.filter((t) => t.column === c));
  return (
    <section className="reviews container" id="reviews">
      <h2 className="section-title center">
        What our client say
        <br />
        about us
      </h2>
      <p className="placeholder-note">Sample content — replace with real customer reviews.</p>

      <div className="reviews-grid">
        {cols.map((col, ci) => (
          <div className="reviews-col" key={ci}>
            {col.map((t, i) => (
              <figure className="review" key={t.name}>
                <figcaption>
                  <Avatar name={t.name.replace("Sample ", "")} size={32} tone={ci + i} />
                  <span>
                    <b>{t.name}</b>
                    <Stars n={t.rating} />
                  </span>
                </figcaption>
                <blockquote>{t.text}</blockquote>
                <time>{t.date}</time>
              </figure>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
