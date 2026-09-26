# Tech stack

The recommendation, then the reasoning. If you just want the answer: **Next.js 15 (App Router) + TypeScript + Tailwind CSS v4, deployed on Vercel**, with the leads going to Supabase and notifications over WhatsApp Cloud API.

## The stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15, App Router** | Vercel is the deploy target, so this is the zero-friction path. ~49 static pages (12 templates + 30 club pages + 7 service pages) prerender at build time; the form endpoints are route handlers. |
| Language | **TypeScript** | The club and trainer records have real shape (`Club`, `Trainer`, `ClubDetails`); typing them once catches every mismatch in 34 pages. |
| Styling | **Tailwind CSS v4** | The design is inline-styled utility-shaped already — spacing, type and colour all come from a small fixed token set. Define the tokens in `@theme` and the port is mechanical. Alternative: CSS Modules + custom properties, if the team prefers plain CSS. Do not add a component library — nothing in this design has a rounded corner or a default shadow, so you would be overriding it everywhere. |
| Fonts | **`next/font/google`** — Barlow, Barlow Condensed | Self-hosted, no render-blocking request, no layout shift. |
| Images | **`next/image`** | The heroes are the payload. AVIF/WebP, `priority` on the hero, `sizes` from the grid definitions in the README. |
| Motion | **Web Animations API** (as authored) or **Framer Motion** | The design already uses `element.animate()` and IntersectionObserver, which port directly with zero dependencies. Use Framer Motion instead only if the team is already fluent in it — it makes the scroll reveals and the program panels shorter to write. |
| Icons | **inline SVG** | There are perhaps eight glyphs on the whole site (arrows, social, hamburger, chevrons). A library is not worth the bytes. |
| Leads | **Supabase Postgres** (or Vercel Postgres) | Free tier covers this volume, gives the client a table UI to read leads without a CRM, and has row-level security if you later add a staff login. |
| Notifications | **WhatsApp Cloud API** + **Resend** | Indian gym leads convert on WhatsApp, not email. Cloud API is free for service messages inside the 24-hour window; Resend covers the email copy to `info@absfitnessclub.in`. |
| Spam | **Cloudflare Turnstile** + honeypot + rate limit | Two public forms with a phone field will be scraped. Turnstile is invisible and free; rate-limit by IP in the route handler (Vercel KV or Upstash). |
| Analytics | **Vercel Analytics** + **GA4** | Vercel for Core Web Vitals, GA4 because the client's agency will ask for it. Fire a conversion event on each successful lead. |
| Content | **hard-coded TS for launch**, Sanity later | 30 clubs and 6 trainers do not need a CMS on day one. Revisit when the client wants to edit timetables and offers themselves — then Sanity (free tier, good Next.js integration) and swap `lib/data.ts` for a query. |

## Project shape

```
app/
  layout.tsx                    fonts, Nav, Footer, MobileBar, ScrollProgress
  page.tsx                      home — composes the 12 section components
  locations/page.tsx
  trainers-programs/page.tsx
  clubs/[slug]/page.tsx         generateStaticParams over CLUBS
  about/page.tsx
  services/[slug]/page.tsx      generateStaticParams over SERVICES
  timetable/page.tsx
  events/page.tsx
  exercises/page.tsx
  franchise/page.tsx
  careers/page.tsx
  contact/page.tsx
  api/lead/route.ts             tour, challenge, service trial, event registration
  api/franchise/route.ts        franchise enquiries
  api/careers/route.ts          multipart — CV to Supabase Storage / Vercel Blob
  api/contact/route.ts          contact form
components/
  layout/     Nav, Footer, MobileActionBar, ScrollProgress
  home/       Hero, Ticker, Manifesto, Stats, Programs, Challenge,
              Passport, Facilities, ClubFinder, Timetable, Results, Team,
              Community, Faq, Join
  pages/      About*, Franchise*, Careers*, Events*, Exercises*, Service*, Timetable*, Contact*
  shared/     BmiCalculator, FilterPills, Accordion, SegmentedTabs, Modal, CornerTicks, Eyebrow, VoltButton, GhostButton, StatusPill,
              SectionHeading, BeforeAfter, LeadForm
lib/
  data.ts                       ported from abs-data.js, typed
  time.ts                       IST helpers — status(), istMinutes(), nextBatch()
  hooks/                        useViewport, useNow, useReveal, useReducedMotion
```

`CornerTicks` and `StatusPill` are worth extracting on day one — they appear on every page. Everything else can stay inline until it repeats.

## Things that will bite you

**IST time is not the visitor's time.** Open/closed status, the live clock, the timetable's "Up next" badge and the next-batch date all compute against `Asia/Kolkata` via `Intl.DateTimeFormat`, not local `Date` methods. If you render these on the server they will be wrong or stale. Mark the components that use them `'use client'` and compute after mount, or accept a flash. Do not prerender the status pill.

**Hydration.** The layout branches on `window.innerWidth` (program panels, the facilities mosaic, the gallery columns, the mobile bar). Server-rendering those needs a mounted guard or you get a hydration mismatch. Where CSS media queries can do the job, use them; keep JS breakpoints only for the two grids that need exact column counts.

**Static generation vs. live data.** Everything except the time-dependent bits is static. Use `export const dynamic = 'force-static'` on the four templates and let the client components handle the live layer.

**`clubDetails()` is fake.** Amenities, timetables, ratings and review counts are deterministic placeholders hashed from the slug. They are stable and plausible, which makes them easy to forget. Keep the function signature, replace the body with real per-club data, and do not launch the review stars until they are real numbers.

**The logo.** `assets/abs-logo.png` is a white wordmark on a black square, currently knocked out with `mix-blend-mode: screen`. Get a transparent SVG from the client and delete the blend mode.

**Photography licensing.** Every image is an Unsplash stand-in. They cannot ship as ABS marketing material. This is the one hard blocker on launch.

## What I would not use

- **A headless CMS on day one** — 30 clubs in a typed file is faster to build and faster to serve. Add it when the client asks to self-edit.
- **A component library (MUI, Chakra, shadcn)** — every default it ships (radius, shadow, font, focus ring) is wrong for this design.
- **A state library** — the whole site is a dozen `useState` calls and one interval.
- **`react-scroll-parallax` / AOS** — the reveal and the kinetic band are eight lines of IntersectionObserver each, already written.
- **A full CRM integration for v1** — a Postgres table plus a WhatsApp ping gets the client answering leads on day one. Integrate with whatever they actually use once you know what that is.

## Rough sequencing

1. Scaffold, fonts, tokens, `lib/data.ts` typed, `lib/time.ts` with tests for `status()` and `nextBatch()`.
2. Layout shell — Nav, Footer, mobile bar, scroll progress.
3. Home, top to bottom. Hero and Passport first; they carry the pitch.
4. `clubs/[slug]` with `generateStaticParams`, then Locations, then Trainers & Programs.
5. `api/lead` + Supabase + WhatsApp + Turnstile.
6. Real photography and real per-club data.
7. Motion pass, then the reduced-motion audit.
8. Lighthouse, axe, deploy.

Steps 1–4 are the bulk. Step 6 depends on the client, so start chasing the photography now rather than at the end.
