import Icon from "./Icon";
import Ring from "./Ring";
import Chart from "./Chart";
import Avatar from "./Avatar";

const synced = [
  { name: "Slack", icon: "hash" as const, when: "Sync 12 April", result: "add 144 contacts" },
  { name: "Gmail", icon: "mail" as const, when: "Sync 13 April", result: "add 86 contacts" },
];

export default function Features() {
  return (
    <section className="features container" id="features">
      <h2 className="section-title center">New platform features</h2>

      <div className="bento">
        <article className="card c-projects">
          <h3>Projects</h3>
          <p>Keep track of the number of new projects.</p>
          <div className="metric">
            <div>
              <b>84</b>
              <small>Last month: 65</small>
            </div>
            <Ring value={0.39} label="+ 39%" color="#7a1fd1" size={74} />
          </div>
        </article>

        <article className="card c-sync">
          <span className="pill">New</span>
          <h3>Sync your apps</h3>
          <p>Synchronize your applications for convenient work.</p>
          <div className="synced-head">
            <b>Synced Applications</b>
            <a href="#sync">Sync more apps</a>
          </div>
          <ul className="synced">
            {synced.map((s) => (
              <li key={s.name}>
                <Icon name={s.icon} size={15} />
                <span>{s.name}</span>
                <small>{s.when}</small>
                <em>{s.result}</em>
              </li>
            ))}
          </ul>
        </article>

        <article className="card c-team">
          <span className="pill">New</span>
          <h3>Your team</h3>
          <p>Our new feature shows your team and quick ways to connect with them.</p>
          <div className="team-stack">
            <div className="team-card">
              <span className="team-avatar">
                <Avatar name="Anna Miller" size={84} tone={3} />
              </span>
              <b>Anna Miller</b>
              <small>Project Manager</small>
              <div className="team-actions">
                <Icon name="calendar" size={18} />
                <Icon name="chat" size={18} />
                <Icon name="video" size={18} />
              </div>
            </div>
          </div>
        </article>

        <article className="card c-stats">
          <h3>Statistics</h3>
          <p>Keep track of your business statistics.</p>
          <Chart />
        </article>

        <article className="card c-tasks">
          <h3>Tasks</h3>
          <p>Keep track of not only your deals but also the number of tasks.</p>
          <div className="metric">
            <div>
              <b>262</b>
              <small>Last month: 180</small>
            </div>
            <Ring value={0.48} label="+ 48%" color="#f6b440" size={74} />
          </div>
        </article>
      </div>
    </section>
  );
}
