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
