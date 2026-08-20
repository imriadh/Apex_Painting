# Apex Painting Template — Client Rebrand & Deploy Guide

Everything a new client needs lives in **two files**. You never need to touch component code
unless you're adding features.

| Want to change…      | Edit here                                        |
| -------------------- | ------------------------------------------------ |
| Business name, phone, email, address, license, hours | `src/config/site.ts` → `brand` |
| Headlines & sub-copy | `src/config/site.ts` → `hero`, section arrays     |
| Services, prices, includes | `src/config/site.ts` → `services`           |
| Reviews & ratings    | `src/config/site.ts` → `reviews`, `rating`        |
| Before/after projects| `src/config/site.ts` → `gallery`                  |
| Neighborhoods served | `src/config/site.ts` → `neighborhoods`            |
| **Accent color**     | `src/index.css` → `--accent` (default) + `site.ts` → `accents` swatches |
| **Navy base palette**| `src/index.css` → `--color-navy-*` tokens         |
| **Fonts**            | `index.html` (Google Fonts link) + `src/index.css` → `--font-display` / `--font-sans` / `--font-mono` |
| **Images**           | `src/config/site.ts` → image URLs in `hero`, `services`, `gallery` |
| Page title / SEO     | `index.html` → `<title>`, `<meta name="description">` |
| Logo mark            | `src/components/Icons.tsx` → `Logo`               |

---

## 1. Colors

- **Accent (buttons, highlights, the "repaint" swatches):** default lives in `src/index.css`
  (`--accent: #ff6a2b`). The hero swatch picker reads its options from `site.ts` → `accents` —
  replace the hexes with the client's palette and delete the picker block in `Hero.tsx`
  (the `<Reveal delay={420}>` "Repaint this template" section) if the client shouldn't see it.
- **Navy scale:** `--color-navy-950 … 100` in `index.css`. For a green brand, define a
  `--color-green-*` set and find/replace `navy-` in the components (or keep navy — it pairs
  with almost any accent).
- Test live first: pick swatches in the hero, note which hexes the client likes, then hard-code them.

## 2. Fonts

1. Pick a display face (bold, condensed, characterful) + a readable body face. Proven pairs:
   `Anton / Instrument Sans`, `Archivo Black / Inter`, `Bebas Neue / Source Sans 3`,
   `Oswald / Nunito Sans`, `Fraunces / Karla` (for a softer brand).
2. Swap the Google Fonts `<link>` in `index.html`.
3. Update the three tokens in `index.css`: `--font-display`, `--font-sans`, `--font-mono`
   (mono is used for eyebrow labels — keep it mono-ish, e.g. `IBM Plex Mono`, `Space Mono`).

## 3. Images

Replace the URLs in `site.ts`. Keep the same aspect ratios so layouts don't shift:

| Slot              | Ratio | Where in `site.ts`        |
| ----------------- | ----- | ------------------------- |
| Hero              | 4:5 portrait | `hero.image`       |
| Service cards ×3  | 4:3   | `services[].image`        |
| Before/after ×2   | 4:3, **identical camera angle per pair** | `gallery[].before/after` |

Tip: shoot the "before" and "after" from a tripod at the same spot — the comparison slider only
sells when the rooms line up.

---

## 4. Receiving leads (the contact form)

The form is already built; you choose where submissions go in `src/config/site.ts` → `form`:

### Option A — Formspree (recommended, free tier = 50 submissions/mo)

1. Create an account at **formspree.io** → "New form" → name it, enter the client's email.
2. Copy the form ID URL (`https://formspree.io/f/xyzabcde`).
3. In `site.ts`: set `provider: "endpoint"` and paste the URL into `endpoint`.
4. Submit the form on the live site once — the lead lands in the client's inbox.
   (Formspree asks you to confirm the email the first time.)

### Option B — Getform / Basin / Web3Forms / Zapier webhooks

Same as Option A — any service that accepts a JSON `POST` works with `provider: "endpoint"`.

### Option C — mailto (zero setup, last resort)

Set `provider: "mailto"`. Opens the visitor's email app pre-filled to `notifyEmail`.
Downside: nothing happens unless the visitor presses Send. Use only as a stopgap.

The form already includes validation, honeypot spam protection, error/retry handling, and a
success confirmation with a reference code.

---

## 5. Deploying (best way)

**Recommended: Netlify** — free for a site like this, automatic HTTPS, and dead simple.

### With Git (best for your workflow)

1. Push the project to a GitHub/GitLab repo (one repo per client).
2. At **app.netlify.com** → "Add new site" → "Import an existing project" → pick the repo.
3. Settings it auto-detects (verify): **Build command** `npm run build`, **Publish directory** `dist`.
4. Deploy. Every future `git push` redeploys automatically.

### Without Git

Run `npm run build` locally, then drag the generated `dist/` folder onto app.netlify.com → live.

### Alternatives

- **Vercel** — equally good; same `npm run build` / `dist` settings.
- **Cloudflare Pages** — free with the fastest CDN; same settings.
- **GitHub Pages** — fine, but needs a base-path tweak in `vite.config.ts`; skip it.

### Custom domain (always do this for clients)

1. Buy `clientname.com` (Namecheap, Porkbun, or Cloudflare Registrar).
2. Netlify → Domain settings → "Add custom domain" → follow its DNS instructions.
3. HTTPS certificate is automatic. Point their old domain too as a redirect if they have one.

---

## 6. New-client checklist (≈ 45 minutes once you're practiced)

- [ ] Copy the template folder → rename (`painting-<client>`)
- [ ] `site.ts`: brand (name/phone/email/address/license/hours)
- [ ] `site.ts`: hero copy, services + prices, 3 reviews, neighborhoods, stats
- [ ] `site.ts`: swap image URLs (or reuse placeholders until the client sends photos)
- [ ] `index.css`: accent + navy palette; delete hero swatch picker for production
- [ ] `index.html` + `index.css`: fonts; `index.html`: title + meta description
- [ ] Form: set Formspree `provider: "endpoint"` + paste form ID
- [ ] `npm run build` → preview `dist/index.html` → check mobile + all anchors/links
- [ ] Deploy to Netlify, attach custom domain
- [ ] Submit a real test lead → confirm it lands in the client's inbox
- [ ] (Bonus SEO) Create/claim the client's Google Business Profile and link the new site

---

## 7. Project structure

```
src/
  config/site.ts      ← ALL client content + lead routing (edit this first)
  index.css           ← color + font tokens (edit for rebrand)
  components/
    Nav.tsx  Hero.tsx  WhyUs.tsx  Services.tsx
    BeforeAfter.tsx  Reviews.tsx  EstimateForm.tsx  Footer.tsx
    Icons.tsx (custom SVG set + Logo)  Reveal.tsx (scroll animation)
  lib/hooks.ts        ← scroll-reveal / count-up / reduced-motion hooks
```
