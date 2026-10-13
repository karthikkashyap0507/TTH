# The Scale House (TSH) — website

Studio website for **The Scale House**: brand identity, websites and AI automation.
Built with Next.js 16 (App Router), React 19, Tailwind CSS 4 and Motion.

---

## Run it locally

```bash
npm install
npm run dev          # http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

## What's inside

| Page | What it does |
| --- | --- |
| `/` | Hero with draggable, throwable stickers and a rotating outlined headline, a spinning badge, a services marquee, six service cards, results, a sliding client strip, featured work, a chat-style testimonial carousel (each message labelled with the client's role) with a lightbox, count-up stats, the process, the founder and a contact CTA |
| `/results` | The Ecom Performance System + four case studies from the company profile, with zoomable Meta Ads Manager screenshots |
| `/work` | Filterable portfolio with animated "live site" previews in mini browser windows |
| `/why-us` | Six reasons brands choose TSH, then a short article with five animated illustrations |
| `/about` | Company story, founder's message, marquee, stats and the founder's profile |
| `/admin` | Password-protected dashboard: project enquiries, search, one-tap WhatsApp reply, CSV export |

The **Start a project** button (navbar, hero, CTAs) opens a three-step wizard.
It saves the enquiry and then offers a pre-filled WhatsApp chat.

## Editing content

Almost all text lives in a handful of files. You don't need to touch the components.

| File | Contents |
| --- | --- |
| `src/content/site.ts` | Brand name, **tagline**, contact details, socials, hero, services, **projects**, **clients**, **testimonials**, **stats**, process, **team**, about page, CTA copy |
| `src/content/results.ts` | The Ecom Performance System and the four case studies (numbers, story, screenshots) |
| `src/content/why-us.ts` | Why Us reasons + article |
| `src/content/wizard.ts` | The "start a project" questions and budget ranges |

Images go in `public/` (for example `public/work/my-project.jpg`). Reference them as `/work/my-project.jpg`.

### ✏️ Before going live — replace the placeholders

Everything marked `✏️ REPLACE` in `src/content/site.ts`:

- [ ] **Socials**: real Instagram and LinkedIn links (phone, email and WhatsApp are already set from the company profile)
- [ ] **Projects**: four real client sites are in. Add more by dropping a screenshot in `public/work/` and copying an entry.
- [ ] **Testimonials**: the six messages are placeholders, each labelled with a client role (e.g. "Clothing brand owner") instead of a name. Swap in real messages, with permission — type them out, or set `screenshot` to an image in `public/reviews/`.
- [ ] **Case-study numbers**: a few figures in the company profile disagree with its own screenshots (see "Content notes" below) — confirm which are right
- [ ] **Founding year**: the profile says January 2023 in one place and January 2022 in another, so the site doesn't mention a year yet
- [ ] **Founder**: Chinmay Sharma, with Instagram (@chinmay.buildz) linked — there is no co-founder. Optional: add a photo (`public/team/...`) and a LinkedIn link in the `team` entry
- [ ] `NEXT_PUBLIC_SITE_URL`: your domain (see below)

## Content notes

Copy, numbers and images come from **The Scale House company profile (2026)** and the brand assets in the project folder:

- Service icons: `public/services/` (cut from the icon sheet, transparent background)
- Case-study screenshots and before/after graphics: `public/results/`
- Tagline ("The performance partner behind your favorite fashion brands.") and the 18-brand client list (a single sliding strip) live in `src/content/site.ts`. To show real client logos later, drop them in `public/clients/`.
- The social share image uses Archivo Black from `assets/fonts/` (SIL Open Font License, see `assets/fonts/OFL.txt`)
- The logo is redrawn as a vector in `src/components/icons.tsx` (`ScaleMark`)
- The original PDF and WhatsApp images stay in the project root and are git-ignored

Numbers to double-check in the profile:

| Case | Profile text | Its "after" screenshot |
| --- | --- | --- |
| 3 | 6.45X blended ROAS, ₹26.74 CPM | 6.65 average ROAS, ₹26.34 CPM |
| 4 | 5.40X ROAS, 442 purchases, ₹42.26 CPM, ₹1,90,280 spend before | 5.88 average ROAS, 2,272 purchases, ₹32.91 CPM; ₹1,90,880 spend in the before screenshot |

The big number tiles on the site only use figures that don't conflict.

## Environment variables

Copy `.env.example` to `.env.local` and fill in what you need:

| Variable | Needed for |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | SEO, sitemap, social share cards |
| `ADMIN_PASSWORD` | Turns on `/admin`. Leave empty to disable it. |
| `ADMIN_SECRET` | Optional long random string for signing admin sessions |
| `NOTIFY_WEBHOOK_URL` | Optional instant alerts for new enquiries (Slack, Discord, Google Chat, Zapier, Make, n8n) |
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | Needed on serverless hosts. See below. |

### Where enquiries are stored

- **Default:** `.data/db.json` in the project folder. This is fine locally or on your own server/VPS (`npm run build && npm start`).
- **Vercel / Netlify (serverless):** those hosts can't write files. Create a free Redis database at [upstash.com](https://upstash.com) and set the two `UPSTASH_*` variables. The site switches over automatically.

## Deploying

**Google Cloud (www.thescalehouse.in):** Cloud Run in Mumbai behind an HTTPS load balancer with a free, auto-renewing Google-managed SSL certificate. In Cloud Shell:

```bash
git clone https://github.com/karthikkashyap0507/TTH.git thescalehouse && cd thescalehouse
bash deploy/gcp-deploy.sh
```

The script prints the load balancer IP. Point the domain at it with two DNS records at your registrar: `A @ <IP>` and `A www <IP>`. Keep MX/TXT records for email. The certificate turns ACTIVE 15–60 minutes later. To ship an update: `git pull && bash deploy/gcp-deploy.sh`. The build uses the `Dockerfile`; `thescalehouse.in` redirects to `www.thescalehouse.in` (see `next.config.ts`).

**Vercel:** push to GitHub → import the repo on vercel.com → add the environment variables (including the Upstash ones) → deploy.

**Your own server:** `npm ci && npm run build && npm start` (use pm2 or systemd to keep it running). Put Nginx or Caddy in front for HTTPS.

## Project structure

```
src/
  app/
    (site)/          marketing pages (share the navbar + footer)
    admin/           admin dashboard
    api/             leads + admin endpoints
    opengraph-image  generated social share image
  components/        UI (home/, results/, work/, admin/, wizard/, …)
  content/           ← all editable text and data
  lib/               storage, auth, validation, helpers
```

## Keep a backup 🙏

Push this folder to a **private GitHub repo** so it can't get lost again:

```bash
git init
git add .
git commit -m "The Scale House website"
git branch -M main
git remote add origin https://github.com/<you>/tsh-website.git
git push -u origin main
```
