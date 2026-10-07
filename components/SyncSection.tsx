import Icon, { type IconName } from "./Icon";
import { LogoMark } from "./Logo";

type Pt = [number, number];

/** Turn a list of points into an orthogonal path with rounded corners. */
function rounded(points: Pt[], r = 22): string {
  let d = `M${points[0][0]} ${points[0][1]}`;
  for (let i = 1; i < points.length - 1; i++) {
    const [px, py] = points[i - 1];
    const [cx, cy] = points[i];
    const [nx, ny] = points[i + 1];
    const l1 = Math.hypot(cx - px, cy - py);
    const l2 = Math.hypot(nx - cx, ny - cy);
    const rr = Math.min(r, l1 / 2, l2 / 2);
    const ax = cx - ((cx - px) / l1) * rr;
    const ay = cy - ((cy - py) / l1) * rr;
    const bx = cx + ((nx - cx) / l2) * rr;
    const by = cy + ((ny - cy) / l2) * rr;
    d += ` L${ax} ${ay} Q${cx} ${cy} ${bx} ${by}`;
  }
  const last = points[points.length - 1];
  return d + ` L${last[0]} ${last[1]}`;
}

// Coordinates live in an 820×500 space; nodes are positioned with the same numbers (as %).
const W = 820;
const H = 500;

const lines: Pt[][] = [
  [[0, 165], [60, 165]],
  [[135, 165], [172, 165], [172, 232], [330, 232], [330, 262], [357, 269]],
  [[0, 296], [60, 296], [60, 269], [200, 269], [357, 269]],
  [[0, 412], [70, 412]],
  [[150, 412], [215, 412], [215, 336], [330, 336], [330, 290], [357, 290]],
  [[820, 165], [760, 165]],
  [[685, 165], [640, 165], [640, 232], [490, 232], [490, 262], [453, 269]],
  [[453, 269], [530, 269]],
  [[553, 269], [640, 269], [640, 357], [724, 357]],
  [[765, 357], [820, 357]],
  [[453, 290], [595, 290], [595, 412], [630, 412]],
  [[700, 412], [820, 412]],
];

const nodes: { x: number; y: number; size: "lg" | "sm"; icon: IconName; tint: string }[] = [
  { x: 97, y: 165, size: "lg", icon: "table", tint: "#2ea36a" },
  { x: 287, y: 232, size: "sm", icon: "hash", tint: "#d94c8f" },
  { x: 218, y: 269, size: "sm", icon: "mail", tint: "#e8554a" },
  { x: 112, y: 412, size: "lg", icon: "folder", tint: "#e0a82e" },
  { x: 720, y: 165, size: "lg", icon: "search", tint: "#4a86f0" },
  { x: 530, y: 269, size: "sm", icon: "grid", tint: "#2ea36a" },
  { x: 744, y: 357, size: "sm", icon: "video", tint: "#7a6af0" },
  { x: 663, y: 412, size: "lg", icon: "calendar", tint: "#4a86f0" },
];

export default function SyncSection() {
  return (
    <section className="sync-wrap container" id="sync">
      <div className="sync">
        <h2>
          Sync your CRM system for
          <br />
          comfortable work
        </h2>
        <div className="sync-stage">
          <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
            {lines.map((pts, i) => (
              <path key={i} d={rounded(pts)} fill="none" stroke="#3b3b44" strokeWidth="1.2" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
            ))}
          </svg>

          {nodes.map((n, i) => (
            <span
              key={i}
              className={`sync-node ${n.size}`}
              style={{ left: `${(n.x / W) * 100}%`, top: `${(n.y / H) * 100}%`, color: n.tint }}
            >
              <Icon name={n.icon} size={n.size === "lg" ? 34 : 18} />
            </span>
          ))}

          <span className="sync-core" style={{ left: `${(405 / W) * 100}%`, top: `${(269 / H) * 100}%` }}>
            <LogoMark size={52} color="#fff" />
          </span>
        </div>
      </div>
    </section>
  );
}
