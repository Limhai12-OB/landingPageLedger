"use client";

import { useState } from "react";
import s from "@/app/dashboard.module.css";
import Avatar from "@/components/Avatar";
import Icon, { type IconName } from "@/components/Icon";
import { owner } from "@/data/dashboard";
import { branchDetails, integrations as initialIntegrations, notificationPrefs } from "@/data/dashboard-sections";
import { useToast } from "./Toast";

const tabs: { id: string; label: string; icon: IconName }[] = [
  { id: "business", label: "Business", icon: "building" },
  { id: "currency", label: "Currencies & rates", icon: "wallet" },
  { id: "cash", label: "Cash safety", icon: "target" },
  { id: "language", label: "Language", icon: "globe" },
  { id: "integrations", label: "Integrations", icon: "layers" },
  { id: "notifications", label: "Notifications", icon: "bell" },
  { id: "team", label: "Team", icon: "users" },
];

function Switch({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return <button type="button" role="switch" aria-checked={on} aria-label={label} className={s.switch} onClick={() => onChange(!on)} />;
}

export default function SettingsPage() {
  const [tab, setTab] = useState("business");
  const [integrations, setIntegrations] = useState(initialIntegrations);
  const [prefs, setPrefs] = useState(notificationPrefs);
  const [autoRate, setAutoRate] = useState(true);
  const [lang, setLang] = useState<"en" | "km">("en");
  const [toast, show] = useToast();

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    show("Settings saved.");
  };
  const panelHead = tabs.find((t) => t.id === tab)!;

  return (
    <>
      <header className={s.greeting}>
        <div>
          <h2>
            Settings <span>· {owner.business}</span>
          </h2>
          <p>Business details, currencies, safety level, language, integrations and your team.</p>
        </div>
      </header>

      <div className={s.settingsGrid}>
        <nav className={s.settingsNav} aria-label="Settings sections">
          {tabs.map((t) => (
            <button key={t.id} type="button" className={`${s.navItem} ${tab === t.id ? s.navActive : ""}`} style={{ border: 0, background: tab === t.id ? undefined : "none", font: "inherit", cursor: "pointer", textAlign: "left" }} onClick={() => setTab(t.id)} aria-current={tab === t.id ? "page" : undefined}>
              <Icon name={t.icon} size={17} /> {t.label}
            </button>
          ))}
        </nav>

        <article className={s.card}>
          <div className={s.cardHead}>
            <div>
              <h3>{panelHead.label}</h3>
            </div>
          </div>

          {tab === "business" && (
            <form className={s.form} onSubmit={save}>
              <div className={s.formRow}>
                <div className={s.formField}><label htmlFor="b-name">Business name</label><input id="b-name" defaultValue={owner.business} /></div>
                <div className={s.formField}><label htmlFor="b-type">Business type</label><select id="b-type" defaultValue="retail"><option value="retail">Retail shop / mini market</option><option value="cafe">Café / restaurant</option><option value="other">Other</option></select></div>
              </div>
              <div className={s.formRow}>
                <div className={s.formField}><label htmlFor="b-phone">Phone</label><input id="b-phone" defaultValue="+855 12 345 678" /></div>
                <div className={s.formField}><label htmlFor="b-tax">Tax ID (optional)</label><input id="b-tax" placeholder="L001-2345678" /></div>
              </div>
              <div className={s.formField}><label htmlFor="b-addr">Address</label><input id="b-addr" defaultValue="St 63, Phsar Thmei, Phnom Penh" /></div>
              <div className={s.formActions}><button type="submit" className={`${s.btn} ${s.btnDark} ${s.btnSm}`}>Save changes</button></div>
            </form>
          )}

          {tab === "currency" && (
            <form className={s.form} onSubmit={save}>
              <p className={s.note}>Every entry keeps its own currency and the exchange rate on that day. Reports are shown in your base currency.</p>
              <div className={s.formRow}>
                <div className={s.formField}><label htmlFor="c-base">Base currency</label><select id="c-base" defaultValue="USD"><option>USD</option><option>KHR</option></select></div>
                <div className={s.formField}><label htmlFor="c-rate">Rate today (KHR per USD)</label><input id="c-rate" type="number" defaultValue={4100} disabled={autoRate} /><small>{autoRate ? "Updated daily from the National Bank of Cambodia" : "Set by you"}</small></div>
              </div>
              <div className={s.switchRow}>
                <span><b>Update the rate automatically</b><small>Daily, from the National Bank of Cambodia</small></span>
                <Switch on={autoRate} onChange={setAutoRate} label="Update rate automatically" />
              </div>
              <div className={s.formActions}><button type="submit" className={`${s.btn} ${s.btnDark} ${s.btnSm}`}>Save changes</button></div>
            </form>
          )}

          {tab === "cash" && (
            <form className={s.form} onSubmit={save}>
              <div className={s.formRow}>
                <div className={s.formField}><label htmlFor="s-min">Safety cash level (USD)</label><input id="s-min" type="number" step={500} defaultValue={12000} /><small>You get a cash-crunch alert when the expected line drops below it</small></div>
                <div className={s.formField}><label htmlFor="s-lead">Warn me this many days ahead</label><select id="s-lead" defaultValue="21"><option value="7">7 days</option><option value="14">14 days</option><option value="21">21 days</option><option value="30">30 days</option></select></div>
              </div>
              <div className={s.formField}><label htmlFor="s-horizon">Forecast horizon</label><select id="s-horizon" defaultValue="90"><option value="30">30 days</option><option value="60">60 days</option><option value="90">90 days</option></select></div>
              <div className={s.formActions}><button type="submit" className={`${s.btn} ${s.btnDark} ${s.btnSm}`}>Save changes</button></div>
            </form>
          )}

          {tab === "language" && (
            <form className={s.form} onSubmit={save}>
              <div className={s.formField}>
                <label>App language</label>
                <div className={s.tabs} role="tablist" style={{ justifySelf: "start" }}>
                  <button type="button" role="tab" aria-selected={lang === "en"} onClick={() => setLang("en")}>English</button>
                  <button type="button" role="tab" aria-selected={lang === "km"} onClick={() => setLang("km")} lang="km">ខ្មែរ</button>
                </div>
                <small>The AI advisor always replies in the language you ask in.</small>
              </div>
              <div className={s.formRow}>
                <div className={s.formField}><label htmlFor="l-date">Date format</label><select id="l-date" defaultValue="dmy"><option value="dmy">07/10/2025</option><option value="mdy">10/07/2025</option></select></div>
                <div className={s.formField}><label htmlFor="l-week">Week starts on</label><select id="l-week" defaultValue="mon"><option value="mon">Monday</option><option value="sun">Sunday</option></select></div>
              </div>
              <div className={s.formActions}><button type="submit" className={`${s.btn} ${s.btnDark} ${s.btnSm}`}>Save changes</button></div>
            </form>
          )}

          {tab === "integrations" && (
            <div className={s.integrations}>
              {integrations.map((it) => (
                <div key={it.name} className={s.integration}>
                  <span className={s.kpiIcon}><Icon name={it.icon} size={17} /></span>
                  <span><b>{it.name}</b><small>{it.connected ? "Connected" : it.text}</small></span>
                  <Switch
                    on={it.connected}
                    label={`${it.name} connection`}
                    onChange={(v) => {
                      setIntegrations((all) => all.map((x) => (x.name === it.name ? { ...x, connected: v } : x)));
                      show(v ? `${it.name} connected.` : `${it.name} disconnected.`);
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          {tab === "notifications" && (
            <div>
              {prefs.map((p) => (
                <div key={p.key} className={s.switchRow}>
                  <span><b>{p.title}</b><small>{p.text}</small></span>
                  <Switch on={p.on} label={p.title} onChange={(v) => setPrefs((all) => all.map((x) => (x.key === p.key ? { ...x, on: v } : x)))} />
                </div>
              ))}
              <div className={s.formActions} style={{ marginTop: 14 }}><button type="button" className={`${s.btn} ${s.btnDark} ${s.btnSm}`} onClick={() => show("Notification settings saved.")}>Save changes</button></div>
            </div>
          )}

          {tab === "team" && (
            <div className={s.tableWrap}>
              <table className={s.table} style={{ minWidth: 520 }}>
                <thead>
                  <tr><th>Person</th><th>Role</th><th>Branch</th><th /></tr>
                </thead>
                <tbody>
                  <tr>
                    <td><div className={s.txName}><Avatar name={owner.name} size={34} tone={0} /><span><b>{owner.name}</b><small>sokha@sokhamart.com</small></span></div></td>
                    <td><span className={`${s.pill} ${s.info}`}>Business Owner</span></td>
                    <td className={s.muted}>All branches</td>
                    <td />
                  </tr>
                  {branchDetails.map((b, i) => (
                    <tr key={b.manager}>
                      <td><div className={s.txName}><Avatar name={b.manager} size={34} tone={i + 1} /><span><b>{b.manager}</b><small>{b.email}</small></span></div></td>
                      <td><span className={`${s.pill} ${s.neutral}`}>Branch Manager</span></td>
                      <td className={s.muted}>{b.name}</td>
                      <td><div className={s.rowActions}><button type="button" className={`${s.miniBtn} ${s.miniDanger}`} onClick={() => show(`${b.manager} would be removed (demo).`)}>Remove</button></div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </article>
      </div>
      {toast}
    </>
  );
}
