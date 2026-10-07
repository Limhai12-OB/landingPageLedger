"use client";

import { useState } from "react";
import s from "@/app/dashboard.module.css";
import Avatar from "@/components/Avatar";
import Icon from "@/components/Icon";
import { branchDetails, invitations as initial, permissions } from "@/data/dashboard-sections";
import { useToast } from "./Toast";

export default function BranchesPage() {
  const [inviting, setInviting] = useState(false);
  const [invites, setInvites] = useState(initial);
  const [email, setEmail] = useState("");
  const [branch, setBranch] = useState(branchDetails[0].name);
  const [toast, show] = useToast();

  function invite(e: React.FormEvent) {
    e.preventDefault();
    setInvites((v) => [{ email, branch, sent: "just now" }, ...v]);
    setEmail("");
    setInviting(false);
    show(`Invitation sent to ${email}.`);
  }

  return (
    <>
      <header className={s.greeting}>
        <div>
          <h2>
            Branches <span>· {branchDetails.length} active</span>
          </h2>
          <p>Each Branch Manager sees only their branch&apos;s records plus shared items, customers and categories.</p>
        </div>
        <div className={s.actions}>
          <button type="button" className={`${s.btn} ${s.btnLight}`} onClick={() => show("New branch: enter the name, address and accounts.")}><Icon name="plus" size={15} /> Add branch</button>
          <button type="button" className={`${s.btn} ${s.btnDark}`} onClick={() => setInviting((v) => !v)} aria-expanded={inviting}><Icon name="userPlus" size={15} /> Invite manager</button>
        </div>
      </header>

      {inviting && (
        <article className={s.card}>
          <div className={s.cardHead}>
            <div>
              <h3>Invite a Branch Manager</h3>
              <p>They get an email link, create a password and land in their branch.</p>
            </div>
          </div>
          <form className={s.form} onSubmit={invite}>
            <div className={s.formRow}>
              <div className={s.formField}>
                <label htmlFor="inv-email">Email</label>
                <input id="inv-email" type="email" required placeholder="manager@business.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className={s.formField}>
                <label htmlFor="inv-branch">Branch</label>
                <select id="inv-branch" value={branch} onChange={(e) => setBranch(e.target.value)}>
                  {branchDetails.map((b) => (
                    <option key={b.name}>{b.name}</option>
                  ))}
                  <option>Siem Reap (new)</option>
                </select>
              </div>
            </div>
            <div className={s.formActions}>
              <button type="button" className={`${s.btn} ${s.btnLight}`} onClick={() => setInviting(false)}>Cancel</button>
              <button type="submit" className={`${s.btn} ${s.btnDark}`}><Icon name="mail" size={15} /> Send invitation</button>
            </div>
          </form>
        </article>
      )}

      <div className={s.branchCards}>
        {branchDetails.map((b, i) => (
          <article key={b.name} className={`${s.card} ${s.branchCard}`}>
            <header>
              <b>{b.name}</b>
              <span className={`${s.pill} ${b.status === "Active" ? s.ok : s.warn}`}>{b.status}</span>
            </header>
            <small className={s.muted}>{b.address}</small>
            <div className={s.manager}>
              <Avatar name={b.manager} size={32} tone={i + 1} />
              <span>
                <b>{b.manager}</b>
                <small>Branch Manager · {b.email}</small>
              </span>
            </div>
            <div className={s.stats}>
              <div className={s.stat}>
                <small>Sales · October</small>
                <b>{b.sales}</b>
                <span className={b.up ? s.pos : s.neg}>{b.up ? "↑" : "↓"} {b.salesDelta} vs Sep</span>
              </div>
              <div className={s.stat}>
                <small>Items in stock</small>
                <b>{b.items}</b>
                <span>shared catalogue</span>
              </div>
            </div>
            <div className={s.inline}>
              {b.accounts.map((a) => (
                <span key={a} className={`${s.pill} ${s.neutral}`}>{a}</span>
              ))}
            </div>
            <div className={s.formActions}>
              <button type="button" className={s.miniBtn} onClick={() => show(`Opening ${b.name} settings…`)}><Icon name="gear" size={13} /> Settings</button>
              <button type="button" className={`${s.miniBtn} ${s.miniPrimary}`} onClick={() => show(`Switched to ${b.name}.`)}>View branch <Icon name="arrowRight" size={12} /></button>
            </div>
          </article>
        ))}
      </div>

      <div className={s.row2}>
        <article className={s.card}>
          <div className={s.cardHead}>
            <div>
              <h3>What each role can do</h3>
              <p>Branch Managers join by invitation from the owner</p>
            </div>
          </div>
          <div className={s.tableWrap}>
            <table className={s.table} style={{ minWidth: 480 }}>
              <thead>
                <tr>
                  <th>Permission</th>
                  <th style={{ textAlign: "center" }}>Branch Manager</th>
                  <th style={{ textAlign: "center" }}>Business Owner</th>
                </tr>
              </thead>
              <tbody>
                {permissions.map(([p, m, o]) => (
                  <tr key={p}>
                    <td>{p}</td>
                    <td style={{ textAlign: "center" }}>{m ? <Icon name="checkCircle" size={17} style={{ color: "#15803d" }} /> : <span className={s.muted}>—</span>}</td>
                    <td style={{ textAlign: "center" }}>{o ? <Icon name="checkCircle" size={17} style={{ color: "#15803d" }} /> : <span className={s.muted}>—</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className={s.card}>
          <div className={s.cardHead}>
            <div>
              <h3>Pending invitations</h3>
              <p>Links expire after 7 days</p>
            </div>
          </div>
          <ul className={s.rows}>
            {invites.map((inv) => (
              <li key={inv.email} className={s.rowItem}>
                <span className={s.rowIcon}><Icon name="mail" size={16} /></span>
                <b>{inv.email}</b>
                <small>{inv.branch} · sent {inv.sent}</small>
                <span className={s.rowEnd}>
                  <button type="button" className={s.miniBtn} onClick={() => show("Invitation sent again.")}>Resend</button>
                </span>
              </li>
            ))}
            {invites.length === 0 && <li className={s.note}>No pending invitations.</li>}
          </ul>
        </article>
      </div>
      {toast}
    </>
  );
}
