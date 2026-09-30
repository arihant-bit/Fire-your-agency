# Fire Your Agency — landing page

Static site for Perfomity Media's live ₹99 Zoom workshop "Fire Your Agency — AI Ads Workshop", for Indian D2C founders. Deployed on Vercel from this GitHub repo (repo root = site root, no build step on Vercel). Domain: www.fireyouragency.in.

## Layout

```
index.html, thank-you.html   LIVE pages (generated — do not edit by hand)
vercel.json                  cleanUrls (/thank-you), noindex on thank-you, caching for videos/logos
videos/                      8 AI videos (.mp4, H.264, 540px/720px, faststart) + .webp posters
logos/                       brand logos used in the logo strip
src/                         EDITABLE SOURCE
  index.html, thank-you.html   page markup
  styles.css                   all styles (mobile-first, desktop at min-width: 900px)
  thank-you.css                thank-you page extras
  main.js                      all behaviour
  config.js                    site settings (price, seats, date, links, Meta Pixel)
  assets/                      photos inlined into the page at build (ai-image, real-image, arihant)
build.py                     builds src/ -> root index.html + thank-you.html
```

## Workflow

1. Edit files in `src/` (never the root `index.html` / `thank-you.html`).
2. Run `python3 build.py` (Python 3, no dependencies).
3. Commit and push — Vercel deploys the root.

Preview locally: `python3 -m http.server 8000` from the repo root, open http://localhost:8000/ (built) or http://localhost:8000/src/index.html (source; videos/logos resolve from root).

Build inlines CSS, config.js + main.js, the favicon and the 3 photos in `src/assets/`; rewrites `/videos/` and `/logos/` to relative paths; loads Google Fonts non-blocking.

## Settings (src/config.js)

`price` 99, `mrp` 999, `seats` 47, `date`/`dateShort` ("" hides the date everywhere), `time`, `calendarStart`/`calendarEnd` (Google Calendar button on thank-you, format YYYYMMDDTHHMMSS IST), `checkoutUrl` https://rzp.io/rzp/4AIfdE6I (Razorpay), `whatsappGroupUrl` (WhatsApp community invite — thank-you page's main button), `email`, `whatsappNumber` (916264600023), `privacyUrl`/`termsUrl`/`refundUrl`, `refundText` (placeholder), `metaPixelId` ("" = off; fires PageView, InitiateCheckout on CTA click, Purchase once per session on thank-you), `passUtmToCheckout`.

Elements with `data-cfg="key"` get their text from config; `data-link="checkout|email|whatsapp|whatsappGroup|privacy|terms|refund"` get hrefs; `data-date` wrappers are removed when `date` is empty.

## Page sections (index)

Ticker marquee → Hero (price ticket card) → Proof stats (30+, ₹57 Cr+, ₹2K → ₹15 lakhs/day, 7 categories) → Brand logo marquee (peach band; Dabur, JK Cement, District, Scrutint from `logos/`; D2C logos hot-linked from d2c.fireyouragency.in/assets/; Nooky & CosIQ carry a "SHARK TANK INDIA" tag; tiles hidden until their image loads) → Agency chat (typing animation on scroll) → Cost comparison → "Which one is AI?" (tap to reveal; orange photo = AI, pink = real) → AI videos carousel (autoplay muted in view, tap for sound, arrows on desktop) → Stop list → Build cards (01/02/03) → Come ready → Price + bonuses (#price) → How it works → Qualifier → Founder (Arihant) → Honest part (offer: ECOM WITH AI, 8 weeks) → FAQ (details/summary, one open) → Final CTA → Footer → Sticky mobile bar (~~₹999~~ ₹99 + RESERVE SEAT).

## Design system

Cream #FFFDF8 ground, ink #12161F, navy #0E1B33, muted #5A6472, orange #FF5A1F (CTA fill; small orange text uses #C73C0A), red #D92B2B (pain/❌), green #0B8F45 (proof/✓), marker #FFD23F, peach #FFF4E6, border #E4DFD3. Archivo 800/900 uppercase headlines, Inter body, Caveat handwritten notes (rotated). Cards: white, 2px ink border, 12px radius, hard 4px/6px offset shadow. CTAs: orange, white label, navy under-shadow, shine sweep. Tone: aggressive, anti-agency, honest; no hype words, no countdown timers — the only urgency is the seat count.

## Known to-dos

- refundText, policy pages (/privacy, /terms, /refund) still placeholders; metaPixelId empty.
- GAIL India and TrulyMadly logos not added yet (user will supply).
- D2C logos depend on d2c.fireyouragency.in; better to copy them into logos/.
- og-image (assets/og-image.jpg for link previews) not created yet.
- Razorpay payment page must redirect to https://www.fireyouragency.in/thank-you.
