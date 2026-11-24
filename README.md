# Virtanex Labs — Website

Marketing site for [Virtanex Labs](https://virtanexlabs.com): a Finland-based remote technology company
building intelligent software, AI-powered solutions, and scalable digital products.

Built with Next.js 15 (App Router), React 19, Tailwind CSS v4, and [shadcn/ui](https://ui.shadcn.com).

## Getting started

This project uses [Bun](https://bun.sh).

```bash
bun install
bun run dev        # http://localhost:3000
```

| Command             | Description                  |
| ------------------- | ---------------------------- |
| `bun run dev`       | Start the dev server         |
| `bun run build`     | Production build             |
| `bun run start`     | Serve the production build   |
| `bun run lint`      | ESLint                       |
| `bun run typecheck` | TypeScript check             |

## Editing content

All copy lives in JSON files in [`data/<language>/`](data) (English is `data/en`) — no component changes needed to update text:

| File                     | Contents                                                              |
| ------------------------ | --------------------------------------------------------------------- |
| `site.json`              | Company info, contact, hero text, nav, stats, booking & inquiry forms |
| `services.json`            | The 10 services: capabilities, deliverables, stack, ideal-for         |
| `technologies.json`        | Tech stack categories and items                                       |
| `process.json`             | 7-phase engineering lifecycle                                         |
| `company.json`             | Values, industries, engagement models, security, team, partners, why  |
| `work.json`                | Solution blueprints shown in the Work section                         |
| `faq.json`                 | FAQ accordion                                                         |
| `insights.json`            | Research focus areas                                                  |
| `home.json`                | Landing-page section headings and call-to-action copy                 |

Also in each language folder: `ui.json` (buttons, form labels, accessibility text and other interface strings).

Content is read through the typed loader in [`lib/content.ts`](lib/content.ts). Icons referenced in JSON by
name are resolved in [`lib/icons.ts`](lib/icons.ts) — add new Lucide icons there.

The brand logo lives in [`lib/logo.ts`](lib/logo.ts) (artwork) and is rendered by
[`components/Logo.tsx`](components/Logo.tsx) (`variant="full"` or `"mark"`). It also drives the favicon
(`app/icon.svg`) and the social preview image (`app/opengraph-image.tsx`).

## Pages

| Route       | Contents                                                       |
| ----------- | -------------------------------------------------------------- |
| `/`         | Landing page: hero, scrolling tech-icon marquee, overview, services, process, blueprints, industries, why us, FAQ, CTA |
| `/services` | Interactive service catalog and technology stack (brand icons) |
| `/process`  | 7-phase lifecycle, engagement models, security & remote model  |
| `/work`     | Solution blueprints, industries, research focus                |
| `/team`     | Team structure, core values, partnerships                      |
| `/faq`      | Frequently asked questions                                     |
| `/contact`  | Inquiry form and discovery-call booking                        |

Each inner page has its own banner image, configured under `pages` in `data/site.json`.

## Structure

```
app/                  Routes (one folder per page), layout, global styles + shadcn theme tokens
components/
  sections/           Page sections (services, process, work, team, faq, home, …)
  ui/                 shadcn/ui components
  Hero, Navbar, Footer, ContactSection, BookingModal, BookingProvider
data/                 All site content (JSON)
lib/                  content loader, icon map, SMTP mail helper, utils
```

Add more shadcn components with `bunx --bun shadcn@latest add <component>`.

## Light and dark mode

The site opens in light mode by default. The sun/moon button in the header (and in the mobile menu) switches to dark,
and the choice is remembered in `localStorage` (applied before first paint, so there is no flash).

Colours are shadcn design tokens in [`app/globals.css`](app/globals.css): `:root` is the light palette and `.dark` is
the dark one. Use token classes (`bg-background`, `text-foreground`, `border-border`, `text-accent`, ...) instead of
hard-coded hex values so new components follow the theme. The home hero stays dark in both modes on purpose.

## Languages

The site is available in English, Finnish, German, Swedish, French and Spanish (`/en`, `/fi`, `/de`, `/sv`, `/fr`, `/es`).

**Which language a visitor sees** (decided in [`middleware.ts`](middleware.ts) when they open a URL without a language):

1. The language they picked with the switcher (remembered in the `NEXT_LOCALE` cookie).
2. Their country, from the host's geo header (`x-vercel-ip-country`, `cf-ipcountry`, ...): Finland gets Finnish,
   Germany/Austria/Switzerland German, Sweden Swedish, France/Belgium/Luxembourg French, Spain Spanish.
   Every other country, including the rest of Europe, gets English. The mapping is `COUNTRY_LOCALE` in [`lib/i18n.ts`](lib/i18n.ts).
3. Only if the host sends no country header at all (local dev, a plain server): the browser's language.
4. English.

Vercel and Cloudflare send the country header automatically. On other hosting, make the proxy forward one of the
headers listed in `COUNTRY_HEADERS`.

**Editing or adding a language**

- Translations live in `data/<code>/` with the same 10 files as `data/en`. Anything missing falls back to English.
- To add one: copy `data/en` to `data/<code>`, translate the values (never keys, ids, icons, hrefs or image URLs),
  add the code to `locales`, `localeMeta` and (for countries) `COUNTRY_LOCALE` in `lib/i18n.ts`.
- Run `bun run i18n:check` to verify every translation keeps the English structure, placeholders and fixed values.
- Use `useContent()` in client components and `Link` from `components/LocaleLink` so links keep the language.
- Emails to your team are always written in English and include a "Site language" line.

## Finnish time zone

The site works on Finnish time (`Europe/Helsinki`, which is EET in winter and EEST in summer):

- Call slots in the booking dialog are stated in Helsinki time, and a live "Helsinki time now" clock sits in the footer and
  in the booking dialog, whatever the visitor's own time zone is ([`lib/time.ts`](lib/time.ts)).
- Texts name the zone as "EET/EEST" instead of a fixed "UTC+2", which would be wrong during summer time.
- The Node server sets `TZ=Europe/Helsinki` on start ([`instrumentation.ts`](instrumentation.ts)), and emails to your team
  carry a "Received (Finland time)" line.

## Privacy policy (GDPR)

The policy is a page at `/<language>/privacy` (text in `data/<language>/privacy.json`), linked from the footer and from
both forms. It describes exactly what the site does today: forms sent by email, short-lived rate limiting, the
`NEXT_LOCALE` cookie and the `theme` local-storage entry, an email provider (Google), a hosting provider, and images
loaded from Unsplash. **Update it whenever you add analytics, a chat widget, a new processor or other tracking**, and
have it reviewed by a lawyer; add your registered company name, business ID and postal address under section 1
if you want them shown.

Fonts are self-hosted with `next/font` (downloaded at build time), so visitors' browsers do not contact Google Fonts.

## Forms and email (SMTP)

The contact form and the booking dialog post to `app/api/inquiry/route.ts`, which validates the request
(plus a honeypot field and a per-IP throttle) and sends it through SMTP with Nodemailer (`lib/mail.ts`).
The visitor's address is set as Reply-To, so replying goes straight to them.

SMTP credentials live only in environment variables, never in the code and never with a `NEXT_PUBLIC_`
prefix, so they stay on the server:

```bash
cp .env.example .env.local   # then fill in SMTP_USER, SMTP_PASS, MAIL_TO
```

`.env.local` is git-ignored. On a host (Vercel, Docker, etc.) set the same variables in its environment settings.
For Gmail, use an app password (needs 2-Step Verification), not the account password.
