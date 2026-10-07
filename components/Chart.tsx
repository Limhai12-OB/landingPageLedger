const months = ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

/** Decorative two-series area/line chart used in the Statistics card and the hero mock. */
export default function Chart({ labels = true }: { labels?: boolean }) {
  return (
    <div className="chart">
      <svg viewBox="0 0 280 120" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#7a1fd1" stopOpacity=".22" />
            <stop offset="1" stopColor="#7a1fd1" stopOpacity=".03" />
          </linearGradient>
        </defs>
        {[24, 54, 84].map((y) => (
          <line key={y} x1="0" x2="280" y1={y} y2={y} stroke="#e8e8ee" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        ))}
        <path
          d="M0 96 C22 96 42 84 62 72 C82 60 96 74 114 62 C134 50 150 46 176 42 C204 38 218 46 244 40 L280 40 L280 120 L0 120 Z"
          fill="url(#chart-fill)"
        />
        <path
          d="M0 96 C22 96 42 84 62 72 C82 60 96 74 114 62 C134 50 150 46 176 42 C204 38 218 46 244 40 L280 40"
          fill="none"
          stroke="#7a1fd1"
          strokeWidth="1.6"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M0 78 C18 78 30 56 46 56 C64 56 66 90 84 90 C102 90 104 64 124 58 C144 52 154 26 170 22 C188 18 192 56 212 62 C228 67 248 54 280 62"
          fill="none"
          stroke="#2f6fe0"
          strokeWidth="1.6"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span className="chart-dot" />
      <span className="chart-tip">max</span>
      {labels && (
        <div className="chart-months">
          {months.map((m) => (
            <span key={m} className={m === "Jun" ? "on" : undefined}>
              {m}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
