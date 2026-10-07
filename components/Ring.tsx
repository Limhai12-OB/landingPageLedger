/** Circular progress badge, e.g. "+ 39%". `value` is 0–1. */
export default function Ring({
  value,
  label,
  color,
  size = 72,
  stroke = 7,
}: {
  value: number;
  label: string;
  color: string;
  size?: number;
  stroke?: number;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const mid = size / 2;
  return (
    <div className="ring" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <circle cx={mid} cy={mid} r={r} fill="none" stroke="#efeff3" strokeWidth={stroke} />
        <circle
          cx={mid}
          cy={mid}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${c * value} ${c}`}
          transform={`rotate(-90 ${mid} ${mid})`}
        />
      </svg>
      <span style={{ color, fontSize: size * 0.17 }}>{label}</span>
    </div>
  );
}
