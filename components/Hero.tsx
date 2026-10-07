import Logo, { LogoMark } from "./Logo";
import Icon, { type IconName } from "./Icon";
import Ring from "./Ring";
import Chart from "./Chart";
import Avatar from "./Avatar";

const sidebar: { label: string; icon: IconName }[] = [
  { label: "Dashboard", icon: "grid" },
  { label: "Leads", icon: "userPlus" },
  { label: "People", icon: "users" },
  { label: "Companies", icon: "layers" },
  { label: "Projects", icon: "folder" },
  { label: "Schedule", icon: "calendar" },
  { label: "Settings", icon: "gear" },
];

function TabletMock() {
  return (
    <div className="tablet" aria-hidden="true">
      <div className="tablet-screen">
        <aside className="tm-side">
          <div className="tm-brand">
            <LogoMark size={14} color="#0d0d0f" />
            <b>sync</b>
          </div>
          <ul>
            {sidebar.map((s, i) => (
              <li key={s.label} className={i === 0 ? "on" : undefined}>
                <Icon name={s.icon} size={11} />
                {s.label}
              </li>
            ))}
          </ul>
          <div className="tm-update">
            <Icon name="rocket" size={26} style={{ color: "#6b3fd4" }} />
            <small>New update available click to update</small>
            <span>Update</span>
          </div>
        </aside>

        <section className="tm-main">
          <div className="tm-search">
            <span>
              <Icon name="search" size={9} /> Search
            </span>
            <Icon name="bell" size={10} />
          </div>
          <h4>
            Start managing
            <br />
            your business!
          </h4>
          <p>Create a customer base, track statistics and progress of your business.</p>
          <span className="tm-btn">Add new project</span>

          <div className="tm-sync">
            <b>Sync your apps</b>
            <div className="tm-nodes">
              <span className="n n1"><Icon name="search" size={9} /></span>
              <span className="n n2"><Icon name="mail" size={9} /></span>
              <span className="n n3"><LogoMark size={14} color="#0d0d0f" /></span>
              <span className="n n4"><Icon name="folder" size={9} /></span>
              <span className="n n5"><Icon name="table" size={9} /></span>
              <span className="n n6"><Icon name="calendar" size={9} /></span>
            </div>
          </div>

          <div className="tm-stats">
            <div>
              <small>New projects</small>
              <b>84</b>
              <Ring value={0.39} label="+ 39%" color="#7a1fd1" size={34} stroke={4} />
            </div>
            <div>
              <small>New tasks</small>
              <b>262</b>
              <Ring value={0.48} label="+ 48%" color="#f6b440" size={34} stroke={4} />
            </div>
          </div>
        </section>

        <aside className="tm-right">
          <small>Your team</small>
          <div className="tm-person">
            <Avatar name="Anna Miller" size={30} tone={3} />
            <b>Anna Miller</b>
            <span>Project Manager</span>
          </div>
          <small>Statistics</small>
          <Chart labels={false} />
        </aside>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-grid container">
        <div className="hero-left">
          <Logo />
          <div className="hero-copy">
            <h1>
              CRM platform
              <br />
              to grow your
              <br />
              business
            </h1>
            <p>
              A unique and powerful software suite to transform the way you work. Grow your company even more
              successfully.
            </p>
            <a href="#why" className="btn btn-dark">
              Start for Free
            </a>
          </div>
          <dl className="hero-stats">
            <div>
              <Icon name="users" size={26} style={{ color: "#3b63e8" }} />
              <dt>80M+</dt>
              <dd>Users Globally</dd>
            </div>
            <div>
              <Icon name="globe" size={26} style={{ color: "#3b63e8" }} />
              <dt>150+</dt>
              <dd>Country Served</dd>
            </div>
          </dl>
        </div>

        <div className="hero-right">
          <div className="hero-glow" />
          <nav className="hero-nav" aria-label="Primary">
            <a href="#pricing">Price</a>
            <a href="#about">About us</a>
            <a href="#contacts">Contacts</a>
            <a href="#why" className="btn btn-light">
              Get started
            </a>
          </nav>
          <TabletMock />
        </div>
      </div>
    </section>
  );
}
