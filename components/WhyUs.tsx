const stars: [number, number, number][] = [
  [90, 40, 1], [210, 90, 1.4], [330, 30, 1], [470, 70, 1.2], [610, 28, 1], [760, 82, 1.4],
  [900, 36, 1], [1040, 66, 1.2], [1180, 30, 1], [1320, 78, 1.4], [150, 140, 1], [690, 150, 1],
  [980, 130, 1], [1260, 150, 1], [400, 120, 1], [560, 110, 1],
];

function Dunes() {
  return (
    <svg className="dunes" viewBox="0 0 1440 600" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0b1534" />
          <stop offset="1" stopColor="#203777" />
        </linearGradient>
        <linearGradient id="d-back" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1b2d68" />
          <stop offset="1" stopColor="#2a448f" />
        </linearGradient>
        <linearGradient id="d-mid" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3a56a3" />
          <stop offset="1" stopColor="#14214d" />
        </linearGradient>
        <linearGradient id="d-front" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#233a80" />
          <stop offset="1" stopColor="#0c1636" />
        </linearGradient>
      </defs>
      <rect width="1440" height="600" fill="url(#sky)" />
      {stars.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="#cdd8ff" opacity=".7" />
      ))}
      <path d="M380 330C470 210 560 150 650 142 760 134 840 170 940 250 1040 320 1180 340 1440 350V600H380z" fill="url(#d-back)" />
      <path d="M0 270C140 260 300 200 430 205c120 5 190 70 260 135 80 70 170 100 240 110H0z" fill="url(#d-mid)" />
      <path d="M650 150C760 100 860 90 930 150c70 62 140 120 250 150 100 28 190 30 260 24V600H300C500 520 520 190 650 150z" fill="url(#d-front)" opacity=".92" />
      <path d="M0 470C180 390 330 360 520 420c150 48 260 70 420 60 190-12 340-60 500-40V600H0z" fill="#0a1230" opacity=".55" />
    </svg>
  );
}

const phrase = "Grow your business with us!";

export default function WhyUs() {
  return (
    <section className="why" id="why">
      <div className="why-top">
        <Dunes />
        <div className="why-copy">
          <h2 id="about">Why Us?</h2>
          <p>
            We&apos;ll help your large sales team improve customer engagement with interactive CRM features such as
            progress tracking, sales automation, process forecasting, task-based scheduler, all with the utmost
            security.
          </p>
          <div className="why-actions">
            <a href="#top" className="btn btn-light">
              Start for Free
            </a>
            <a href="#pricing" className="btn btn-ghost">
              See prices
            </a>
          </div>
        </div>
      </div>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((g) => (
            <div className="marquee-group" key={g}>
              {Array.from({ length: 3 }, (_, i) => (
                <span key={i}>{phrase}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
