# Sync — CRM landing page (Next.js)

Landing page for a fictional CRM product called **Sync**, built with the Next.js App Router and TypeScript.
Everything is server-rendered, with no client JS beyond what Next ships. The marquee is pure CSS.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Structure

```
app/
  layout.tsx          fonts (Inter) + metadata
  page.tsx            section order
  globals.css         all styling (tokens at the top, responsive rules at the bottom)
components/
  Hero.tsx            headline, stats, black panel with tablet dashboard mock
  Features.tsx        "New platform features" bento grid
  SyncSection.tsx     dashed-line integration diagram (SVG paths generated from points)
  Upgrade.tsx         photo slot + blue feature panel
  Testimonials.tsx    3-column review cards
  WhyUs.tsx           dune background, CTA buttons, scrolling gradient marquee
  Footer.tsx
  Icon.tsx, Logo.tsx, Ring.tsx, Chart.tsx, Avatar.tsx
data/
  testimonials.ts     placeholder reviews
```

## landing-page-v2 (`/v2`)

A second, light/minimal design (orange accent, phone mockups) served at http://localhost:3000/v2.
v1 stays at `/`.

```
app/v2/
  layout.tsx          Inter Tight font + metadata
  page.tsx            section order
  v2.module.css       all v2 styling, scoped (tokens on .page, responsive rules at the bottom)
components/v2/
  Hero.tsx            nav + headline + tilted phone
  Features.tsx        three feature rows with widgets (target, balance chart, AI)
  Pricing.tsx         two plans
  Showcase.tsx        three phone screens
  Testimonials.tsx    quote carousel (the only client component)
  Insights.tsx        article cards
  Cta.tsx             CTA band + stats row
  Footer.tsx
  Nav.tsx             sticky blurred top bar
  LogoStrip.tsx       "trusted by" marquee
  ArticleArt.tsx      illustrated article covers (swap for <Photo src=…> when you have photos)
  RevealObserver.tsx  scroll-reveal: adds data-shown to [data-reveal] elements in view
  CountUp.tsx         animated stats numbers
  Phone.tsx, LineChart.tsx, Orb.tsx, Photo.tsx, Logo.tsx, SectionHead.tsx, motion.ts
data/v2.ts            brand name, copy, plans, quotes, articles, stats, logo-strip names
```

Animation: add `data-reveal` (optionally `="left" | "right" | "scale"`) plus `style={delay(i)}` to any element
to fade it in on scroll. Everything is disabled under `prefers-reduced-motion`, and content stays visible without JS.

v2 placeholders: the brand name (`BRAND` in `data/v2.ts`), sample quotes, demo stats, and photo slots.
To use real photos, put them in `public/images/v2/` and pass `src` to `<Photo>`.

## Before you ship

- **Testimonials are placeholders.** Replace `data/testimonials.ts` with real, attributable customer feedback.
- **Stats** in the hero (80M+ users, 150+ countries) and the dashboard numbers are demo values. Swap in real figures.
- **Photo slot** in `components/Upgrade.tsx` is an SVG placeholder. Drop an image in `public/images/` and use `next/image`.
- **Integration icons** in the sync diagram are generic glyphs. Add official brand assets only if you have the right to use them.
- **Logo** is a simple placeholder mark; replace with your own.
# landingPageLedger
