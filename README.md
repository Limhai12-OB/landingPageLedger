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
and the code `000000` is rejected on verify. After sign-in and sign-up there is no redirect yet
(TODO comments mark where the dashboard and Business Setup pages go).

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
