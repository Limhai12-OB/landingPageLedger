import Icon, { type IconName } from "./Icon";

const items: { title: string; text: string; icon: IconName }[] = [
  {
    title: "Get more leads",
    text: "Generate more leads with this powerful and easy-to-use lead generation toolkit.",
    icon: "userPlus",
  },
  {
    title: "Control",
    text: "Find out which organizations are viewing your website and what they are interested in.",
    icon: "sliders",
  },
  {
    title: "Management",
    text: "Centralize the documentation process by submitting trackable quotes and contracts.",
    icon: "gear",
  },
  {
    title: "Newsletters",
    text: "Create and send customized email newsletters with professional templates.",
    icon: "mail",
  },
];

export default function Upgrade() {
  return (
    <section className="upgrade container" id="pricing">
      <h2 className="section-title">
        Upgrade your plan with
        <br />
        additional features
      </h2>

      <div className="upgrade-grid">
        {/*
          Photo slot: replace this block with
          <Image src="/images/workspace.jpg" alt="…" fill style={{ objectFit: "cover" }} />
          once you have a real image in /public/images.
        */}
        <div className="upgrade-photo" role="img" aria-label="Placeholder for a workspace photo">
          <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <defs>
              <linearGradient id="up-bg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#a87b58" />
                <stop offset="1" stopColor="#5b4030" />
              </linearGradient>
            </defs>
            <rect width="400" height="400" fill="url(#up-bg)" />
            <path d="M0 250h400v150H0z" fill="#7b5a42" opacity=".6" />
            <rect x="60" y="230" width="190" height="14" rx="4" fill="#e9e9ee" />
            <path d="M80 230 120 130h140l-30 100z" fill="#f4f4f7" />
            <path d="M255 232 330 110l20 6-60 118z" fill="#2a2a30" />
            <rect x="40" y="150" width="90" height="110" rx="6" fill="#e6e4e0" transform="rotate(-8 85 205)" />
          </svg>
        </div>

        <div className="upgrade-panel">
          {items.map((it) => (
            <div key={it.title} className="up-item">
              <span className="up-icon">
                <Icon name={it.icon} size={22} />
              </span>
              <h3>{it.title}</h3>
              <p>{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
