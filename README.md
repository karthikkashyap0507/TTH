# The Tech House (TTH) — website

Studio website for **The Tech House**: brand identity, websites and AI automation.
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
| `/` | Hero with draggable, throwable stickers and a rotating outlined headline, a spinning badge, a services marquee, a **scratch-to-reveal** services card, featured work, a chat-style testimonial carousel with a lightbox, count-up stats, the process, the team and a contact CTA |
| `/work` | Filterable portfolio with animated "live site" previews in mini browser windows |
| `/why-us` | Short article with five animated illustrations |
| `/about` | Story, marquee, stats and detailed team cards |
| `/careers` | Open roles, how hiring works |
| `/careers/[role]` | Role details + full application form (skills chips, links, intro video) |
| `/status` | Applicants check their status with application ID + email |
| `/admin` | Password-protected dashboard: project enquiries + applications, status updates, private notes, CSV export |

The **Start a project** button (navbar, hero, CTAs) opens a three-step wizard.
It saves the enquiry and then offers a pre-filled WhatsApp chat.

## Editing content

Almost all text lives in a handful of files. You don't need to touch the components.

| File | Contents |
| --- | --- |
| `src/content/site.ts` | Brand name, contact details, socials, hero, services, **projects**, **testimonials**, **stats**, process, **team**, about page, CTA copy |
| `src/content/careers.ts` | Open roles, hiring steps, perks, application statuses |
| `src/content/why-us.ts` | The Why Us article |
| `src/content/wizard.ts` | The "start a project" questions and budget ranges |

Images go in `public/` (for example `public/work/my-project.jpg`). Reference them as `/work/my-project.jpg`.

### ✏️ Before going live — replace the placeholders

Everything marked `✏️ REPLACE` in `src/content/site.ts`:

- [ ] **Contact**: `email`, `whatsapp` number, Instagram and LinkedIn links
- [ ] **Projects**: the eight entries are samples with made-up names. Swap in real TTH client work. Add `url` for live sites, and optionally an `image` or a short screen-recording `video`.
- [ ] **Testimonials**: use real client messages, with their permission. Type them out, or set `screenshot` to an image in `public/reviews/`.
- [ ] **Stats**: your real numbers
- [ ] **Team**: real names, roles, photos (`public/team/...`), socials and facts
- [ ] `NEXT_PUBLIC_SITE_URL`: your domain (see below)

## Environment variables

Copy `.env.example` to `.env.local` and fill in what you need:

| Variable | Needed for |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | SEO, sitemap, social share cards |
| `ADMIN_PASSWORD` | Turns on `/admin`. Leave empty to disable it. |
| `ADMIN_SECRET` | Optional long random string for signing admin sessions |
| `NOTIFY_WEBHOOK_URL` | Optional instant alerts for new enquiries and applications (Slack, Discord, Google Chat, Zapier, Make, n8n) |
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | Needed on serverless hosts. See below. |

### Where enquiries and applications are stored

- **Default:** `.data/db.json` in the project folder. This is fine locally or on your own server/VPS (`npm run build && npm start`).
- **Vercel / Netlify (serverless):** those hosts can't write files. Create a free Redis database at [upstash.com](https://upstash.com) and set the two `UPSTASH_*` variables. The site switches over automatically.

## Deploying

**Vercel (easiest):** push to GitHub → import the repo on vercel.com → add the environment variables (including the Upstash ones) → deploy.

**Your own server:** `npm ci && npm run build && npm start` (use pm2 or systemd to keep it running). Put Nginx or Caddy in front for HTTPS.

## Project structure

```
src/
  app/
    (site)/          marketing pages (share the navbar + footer)
    admin/           admin dashboard
    api/             leads, applications, status, admin endpoints
    opengraph-image  generated social share image
  components/        UI (home/, work/, careers/, admin/, wizard/, …)
  content/           ← all editable text and data
  lib/               storage, auth, validation, helpers
```

## Keep a backup 🙏

Push this folder to a **private GitHub repo** so it can't get lost again:

```bash
git init
git add .
git commit -m "The Tech House website"
git branch -M main
git remote add origin https://github.com/<you>/tth-website.git
git push -u origin main
```
