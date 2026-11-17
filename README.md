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

All copy lives in JSON files in [`data/`](data) — no component changes needed to update text:

| File                     | Contents                                                              |
| ------------------------ | --------------------------------------------------------------------- |
| `data/site.json`         | Company info, contact, hero text, nav, stats, booking & inquiry forms |
| `data/services.json`     | The 10 services: capabilities, deliverables, stack, ideal-for         |
| `data/technologies.json` | Tech stack categories and items                                       |
| `data/process.json`      | 7-phase engineering lifecycle                                         |
| `data/company.json`      | Values, industries, engagement models, security, team, partners, why  |
| `data/work.json`         | Solution blueprints shown in the Work section                         |
| `data/faq.json`          | FAQ accordion                                                         |
| `data/insights.json`     | Research focus areas                                                  |
| `data/home.json`         | Landing-page section headings and call-to-action copy                 |

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
lib/                  content loader, icon map, mailto helper, utils
```

Add more shadcn components with `bunx --bun shadcn@latest add <component>`.

## Forms

There is no backend yet. The contact form and booking dialog open the visitor's email client with the inquiry
prefilled to the address in `data/site.json`. Replace `lib/mailto.ts` usage with an API route
(e.g. Resend/Postmark) when ready.
