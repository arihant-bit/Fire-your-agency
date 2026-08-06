# Fire Your Agency — Webinar Funnel

Static funnel for the ₹99 "Fire Your Agency" live webinar. No build step, no dependencies — two self-contained HTML files served straight off Vercel's edge.

| File | Live path | Purpose |
|---|---|---|
| `index.html` | `/` | Landing page → Razorpay checkout |
| `thank-you.html` | `/thank-you` | Post-payment confirmation + WhatsApp group |
| `originals/` | not deployed | Untouched source bundles (backup) |

## Deploy

```bash
git init
git add .
git commit -m "Fire Your Agency funnel"
git branch -M main
git remote add origin https://github.com/<your-username>/fire-your-agency.git
git push -u origin main
```

Then on [vercel.com/new](https://vercel.com/new): import the repo, leave every build setting empty (Framework Preset → **Other**), deploy. Every push to `main` redeploys automatically.

## Post-deploy checklist

1. **Razorpay redirect** — in the payment page settings for `rzp.io/rzp/a0DUqpDW`, set the success redirect to `https://<your-domain>/thank-you`. Without this the thank-you page never fires.
2. **Custom domain** — Vercel → Settings → Domains. A subdomain like `webinar.perfomity.com` keeps the root site free.
3. **Tracking** — Meta Pixel + GA4 are not installed yet. Add them before spending on traffic, and fire `Purchase` on the thank-you page only.
4. **Test the full path** on mobile: ad click → landing → Razorpay → thank-you → WhatsApp join.

## Config baked into the pages

| Setting | Value |
|---|---|
| Checkout | `https://rzp.io/rzp/a0DUqpDW` |
| Price / anchor | ₹99 / ₹999 |
| Webinar start | 2026-08-16, 7:00 PM IST |
| Seat cap | 200 |
| WhatsApp group | `chat.whatsapp.com/HMhjQxc01AnHAiR64IVoi6` |

These are hardcoded in the bundles. To change one, search the file for the value and replace it.

## Note on `index.html`

The hero image was re-encoded PNG → WebP, taking the landing page from 2.63 MB to 389 KB. Original untouched bundle is in `originals/` if you ever need to diff or revert.
