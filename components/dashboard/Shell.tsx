"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import s from "@/app/dashboard.module.css";
import Alerts from "./Alerts";
import Avatar from "@/components/Avatar";
import Icon from "@/components/Icon";
import { LogoMark } from "@/components/Logo";
import { BRAND } from "@/data/content";
import { owner, report } from "@/data/dashboard";
import { hrefFor, navGroups, navItems } from "./nav";

/** App shell: sidebar (off-canvas under 900px) + sticky top bar. Page content renders in <main>. */
export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const results = navItems.filter((item) => `${item.label} ${item.text}`.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false); setSearchOpen(false); setNotifications(false);
        if (open) requestAnimationFrame(() => menuRef.current?.focus());
      }
      if (event.key === "/" && !(event.target instanceof HTMLElement && (event.target.matches("input, textarea, select") || event.target.isContentEditable))) {
        event.preventDefault(); searchRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    drawerRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    function trap(event: KeyboardEvent) {
      if (event.key !== "Tab") return;
      const items = drawerRef.current?.querySelectorAll<HTMLElement>("a[href], button");
      if (!items?.length) return;
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    document.addEventListener("keydown", trap);
    const media = window.matchMedia("(min-width: 901px)");
    const close = () => { if (media.matches) setOpen(false); };
    media.addEventListener("change", close);
    return () => { document.body.style.overflow = previous; document.removeEventListener("keydown", trap); media.removeEventListener("change", close); };
  }, [open]);

  // Close the drawer after navigating.
  useEffect(() => { setOpen(false); setSearchOpen(false); setNotifications(false); }, [pathname]);

  const current = navItems.find((n) => hrefFor(n.slug) === pathname) ?? navItems[0];

  return (
    <div className={s.app}>
      <a href="#dashboard-content" className={s.skipLink}>Skip to content</a>
      <div className={`${s.overlay} ${open ? s.overlayOn : ""}`} onClick={() => setOpen(false)} aria-hidden="true" />

      <aside ref={drawerRef} id="dashboard-navigation" className={`${s.sidebar} ${open ? s.sidebarOpen : ""}`} aria-label="Dashboard navigation">
        <Link href="/" className={s.brand} aria-label={`${BRAND} home`}>
          <LogoMark size={28} />
          <span>{BRAND}</span>
        </Link>

        <div className={s.workspace}><span className={s.workspaceIcon}><Icon name="building" size={19} /></span><span><b>{owner.business}</b><small>Business workspace</small></span><span className={s.workspaceBadge}>PRO</span></div>
        <button type="button" className={s.drawerClose} onClick={() => { setOpen(false); requestAnimationFrame(() => menuRef.current?.focus()); }}>Close navigation <span aria-hidden="true">&times;</span></button>

        {navGroups.map((group) => (
          <nav key={group} className={s.navGroup} aria-label={group}>
            <small>{group}</small>
            {navItems
              .filter((n) => n.group === group)
              .map((n) => {
                const href = hrefFor(n.slug);
                const active = pathname === href;
                return (
                  <Link key={n.slug} href={href} className={`${s.navItem} ${active ? s.navActive : ""}`} aria-current={active ? "page" : undefined}>
                    <Icon name={n.icon} size={18} />
                    {n.label}
                    {n.badge && <em>{n.badge}</em>}
                  </Link>
                );
              })}
          </nav>
        ))}

        <div className={s.sideCard}>
          <small>Monthly AI report</small>
          <b>{report.month} report arrives on {report.ready}</b>
          <p>A plain-language summary of the month, exportable as PDF.</p>
          <Link href="/dashboard/advisor">
            See last month <Icon name="arrowRight" size={13} />
          </Link>
        </div>

        <div className={s.userRow}>
          <Avatar name={owner.name} size={34} tone={0} />
          <span>
            <b>{owner.name}</b>
            <small>{owner.role} · {owner.business}</small>
          </span>
          <Link href="/login" aria-label="Log out" title="Log out">
            <Icon name="logOut" size={17} />
          </Link>
        </div>
      </aside>

      <div className={s.main} inert={open ? true : undefined}>
        <header className={s.topbar}>
          <button ref={menuRef} aria-controls="dashboard-navigation" type="button" className={`${s.iconBtn} ${s.menuBtn}`} onClick={() => setOpen(true)} aria-label="Open navigation" aria-expanded={open}>
            <Icon name="menu" size={18} />
          </button>
          <div className={s.pageTitle}>
            <h1>{current.label}</h1>
            <small>{owner.business}</small>
          </div>

          <div className={s.searchContainer} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setSearchOpen(false); }}>
            <label className={s.search}>
              <Icon name="search" size={16} />
              <input ref={searchRef} type="search" value={query} onChange={(event) => setQuery(event.target.value)} onFocus={() => setSearchOpen(true)} placeholder="Find a page or tool..." aria-label="Find a dashboard page" aria-expanded={searchOpen} aria-controls="page-search-results" />
              <kbd>/</kbd>
            </label>
            {searchOpen && <div id="page-search-results" className={s.searchResults}>
              <small>GO TO</small>
              {results.map((item) => <Link key={item.slug} href={hrefFor(item.slug)} onClick={() => setSearchOpen(false)}><Icon name={item.icon} size={17} /><span>{item.label}</span><Icon name="arrowRight" size={14} /></Link>)}
              {!results.length && <p>No pages found. Try sales or cash.</p>}
            </div>}
          </div>
          <div className={s.topActions}>
            <span className={s.demoBadge}>Demo workspace</span>
            <div className={s.notificationWrap}>
              <button type="button" className={s.iconBtn} aria-label="Notifications, 3 open" aria-expanded={notifications} aria-controls="dashboard-notifications" onClick={() => setNotifications((value) => !value)}><Icon name="bell" size={18} /><i /></button>
              {notifications && <><button className={s.popoverDismiss} aria-label="Close notifications" onClick={() => setNotifications(false)} /><div id="dashboard-notifications" className={s.notificationPanel}><Alerts /></div></>}
            </div>
            <Link href="/dashboard/settings" className={s.profileLink} aria-label="Open profile settings"><Avatar name={owner.name} size={34} tone={0} /></Link>
          </div>
        </header>

        <main id="dashboard-content" tabIndex={-1} className={s.content}>{children}</main>
      </div>
    </div>
  );
}
