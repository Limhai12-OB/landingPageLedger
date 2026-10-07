# landingPageLedger

Landing page for **LedgerVision**, bookkeeping, cash and planning for small retail businesses in Cambodia.
Built with the Next.js App Router and TypeScript.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

Don't run `npm run build` while `npm run dev` is running, because both write to `.next`.
If pages lose their styles or show missing-file errors, stop the dev server, delete `.next`, and start it again.

## Structure

```
app/
  layout.tsx          Inter Tight font, metadata, early "js" flag for scroll-reveal
  page.tsx            section order
  landing.module.css  all page styling, scoped (brand tokens at the top, responsive rules at the bottom)
  globals.css         base reset + .avatar
components/
  Nav.tsx             sticky blurred top bar
  Hero.tsx            headline, tilted phone, floating cards
  LogoStrip.tsx       integrations marquee
  Features.tsx        three feature rows with widgets (receipt capture, cash chart, AI advisor)
  Pricing.tsx         "Roles" section: Branch Manager and Business Owner cards
  Showcase.tsx        three phone screens
  Testimonials.tsx    quote carousel with autoplay
  Insights.tsx        guide cards
  Cta.tsx             call-to-action band + stats row
  Footer.tsx
  Phone.tsx, LineChart.tsx, Orb.tsx, ArticleArt.tsx, Photo.tsx, Logo.tsx, SectionHead.tsx,
  Icon.tsx, Avatar.tsx
  RevealObserver.tsx  scroll-reveal: adds data-shown to [data-reveal] elements in view
  CountUp.tsx         animated stats numbers
  motion.ts           delay() stagger helper
data/
  content.ts          brand name, nav, integrations, features, roles, quotes, guides, stats, footer
```

### Auth pages

| Route | What it does |
|---|---|
| `/login` | Email + password (show/hide), remember me, Google, links to register / forgot password |
| `/register` | Business Owner sign-up: name, email, password + confirm with strength meter, terms |
| `/forgot-password` | Email → sends a code, then goes to `/verify-code?email=…` |
| `/verify-code` | 6-digit code (auto-advance, paste, resend timer) → set new password → done |

```
app/auth.module.css        auth styling (same brand tokens as the landing page)
app/{login,register,forgot-password,verify-code}/page.tsx
components/auth/           AuthShell (split layout), AuthPanel (dashboard preview), Fields, *Form.tsx
lib/auth.ts                PLACEHOLDER auth calls — replace with your real API
```

`lib/auth.ts` only simulates latency. For demos: `taken@example.com` shows "already registered" on sign-up,
and the code `000000` is rejected on verify. Sign-in (email or Google) redirects to `/dashboard`.
After sign-up there is no redirect yet (a TODO marks where the Business Setup page goes).

### Dashboard

| Route | What it does |
|---|---|
| `/dashboard` | Business Owner overview: KPIs, 90-day cash forecast, health score, alerts, transactions, AI advisor, expenses, branches, monthly report |
| `/dashboard/{transactions,import,sales,reconcile,forecast,branches,advisor,settings}` | Placeholder section pages so every sidebar link resolves |

```
app/dashboard.module.css          dashboard styling (same brand tokens as the landing and auth pages)
app/dashboard/layout.tsx          wraps pages in the app shell
app/dashboard/page.tsx            overview
app/dashboard/[section]/page.tsx  placeholder for the other sections (list in components/dashboard/nav.ts)
components/dashboard/             Shell (sidebar + top bar), Kpis, ForecastChart, HealthScore, Alerts,
                                  Transactions, Advisor, Expenses, Branches, Report
data/dashboard.ts                 PLACEHOLDER numbers, transactions, branches, alerts — replace with your API
```

The sidebar collapses to a drawer under 900px. The branch switcher and EN/ខ្មែរ toggle in the top bar are
UI only (no filtering or translation yet).

Most copy lives in `data/content.ts`. Widget and phone-screen text is in the components.

Animation: add `data-reveal` (optionally `="left" | "right" | "scale"`) plus `style={delay(i)}` to any element
to fade it in on scroll. Everything is disabled under `prefers-reduced-motion`, and content stays visible without JS.

## Before you ship

- **Testimonials are samples.** Replace the quotes in `data/content.ts` with real, attributable customer feedback.
- **Numbers on the phone screens and widgets** ($48,920, 74-day runway, etc.) are example values.
- **Integration names** (Shopify, WeBill365, ABA, Wing, ACLEDA, KHQR, Telegram, Google) appear as plain text
  with generic icons. Confirm you're allowed to name them before launch, and add official logos only with permission.
- **Article covers** are illustrations. For real photos, put them in `public/images/` and use `<Photo src="/images/...">`.
- **Logo** is a simple placeholder mark; replace with your own.
