# Garbha.ai website

Modern rebuild of [garbha.ai](https://garbha.ai) — the WordPress marketing site
re-implemented on a current stack.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
MDX blog.

## Run it locally

```bash
npm install        # first time only
npm run dev        # start the dev server → http://localhost:3000
```

Other commands:

```bash
npm run build      # production build
npm run start      # run the production build locally
npm run lint       # check code style
```

## Where things live

```
src/
  app/                      # pages (each folder = a URL)
    page.tsx                #   /            homepage
    solutions/              #   /solutions   + /solutions/[slug] detail pages
    blog/                   #   /blog        + /blog/[slug] posts
    about/  partnership/    #   /about, /partnership
    contact/                #   /contact     (appointment form)
    api/contact/route.ts    #   form submission handler
    privacy/                #   /privacy
  components/               # reusable UI (Header, Footer, cards, form…)
  content/
    solutions.ts            # the 6 AI solutions (edit text here)
    blog/*.mdx              # blog posts (one file per post)
  lib/
    site.ts                # site name, nav, contact details, social links
    blog.ts                # loads blog posts
  app/globals.css          # brand colours & fonts (design system)
```

## Editing content (no deep coding needed)

- **Site name, nav, email, social links, headline stats:** `src/lib/site.ts`
- **Solutions (names, summaries, benefits, steps):** `src/content/solutions.ts`
- **Brand colours & fonts:** `src/app/globals.css` (the `@theme` block)

### Add a blog post

1. Create a new file in `src/content/blog/`, e.g. `my-post.mdx`.
2. Start it with this frontmatter, then write the article in Markdown below:

```mdx
---
title: "My post title"
description: "One-line summary shown in listings and search."
date: "2026-07-02"
author: "Garbha.ai Team"
tags: ["AI", "IVF"]
---

Your article content here. Use ## for headings, **bold**, lists, > quotes, etc.
```

The post automatically appears at `/blog` and `/blog/my-post`.

## Contact form

The appointment form posts to `src/app/api/contact/route.ts`, which currently
validates the input and logs it server-side. Before going live, connect it to
your email/CRM provider (e.g. Resend, SendGrid, or HubSpot) — see the `TODO`
comment in that file.

## Deploying

This is a standard Next.js app. The simplest path is
[Vercel](https://vercel.com) (creators of Next.js): push this repo to
GitHub/GitLab and import it — no configuration required. It also runs on
Netlify, AWS Amplify, or any Node host via `npm run build && npm run start`.

Set the production URL in `src/lib/site.ts` (`url`) so metadata, the sitemap,
and robots.txt point to the right domain.
