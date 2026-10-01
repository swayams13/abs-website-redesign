# Pitch-ready — status

Branch: `pitch-ready`. All spec sections are done. Final run: `tsc --noEmit`,
`eslint app components lib` and `npm run build` are all clean (28 club pages +
7 service pages generated).

## What changed (summary)

- **Data honesty** — 28 real clubs (22 Pune, 2 Mumbai, 1 each Kolhapur /
  Chhatrapati Sambhaji Nagar / Nashik / Ahilyanagar). Only ICC and Magarpatta
  hours are `verified`; the 9 named addresses are verbatim from the spec, the
  rest are `"Area, City"` placeholders. Fake ratings/prices removed; real
  ratings only for the 10 clubs in `REAL_RATINGS`.
- **`<SampleTag />`** on everything unverified: trainers (except Abhimanyu),
  testimonials, franchise figures, member/sq-ft stats (About, Franchise, home
  Challenge, Hero), Events (all except GROW 2026 and 20 Years of ABS),
  timetables, and the 90-Day Challenge price.
- **"35+" → "28"** everywhere, including `Challenge.tsx` stats and the
  Founder paragraph (both caught in the final grep).
- **Passport copy** uses the real rules; "Passport 2.0" shown as a proposal.
- **90-Day countdown** computed from `nextBatchDate()` (no hard-coded date).
- **WhatsApp wiring** — `lib/whatsapp.ts` `sendWhatsApp()` opens
  `wa.me/919763215051?text=…` after validation. Wired: Join, club tour,
  service enquiry, 90-Day Challenge enrolment, Contact, Franchise.
- **Link sharing** — preview banner (nav sits below it via `--banner-h`),
  OG image, generated favicon, `robots.ts` (noindex), `sitemap.ts`,
  HealthClub JSON-LD, metadata.
- **Quality** — contrast fixes sitewide (muted greys, olive `#566e00`),
  `<img>` dimensions, CLS reservation on the open-now pill, Timetable
  select no longer overflows at 390px.

## Verified this session

- axe colour-contrast on 13 routes (desktop): clean except two intentional
  items below.
- No horizontal scroll at 390px on all 13 routes checked (Timetable fixed).
- Banner renders 40px tall; nav sits at 56px (banner + 16px) at 390px.
- Join form → `wa.me` link carries name, phone and club (window.open stubbed
  to inspect the URL); success state shows.
- Lighthouse (mobile default, local prod build): Home — Perf 80, A11y 100,
  Best Practices 100, CLS 0.046. Club page (Magarpatta) — Perf 90, A11y 100,
  BP 100, CLS 0.008. Both under the 0.1 CLS target. SEO shows 66 on both
  *only* because of the intentional `noindex` (`is-crawlable`).

## Couldn't verify / for the owner

- `SITE_URL` in `lib/site.ts` is a **placeholder**
  (`https://abs-fitness-redesign.vercel.app`). Update after a real deploy;
  `sitemap.ts` and JSON-LD depend on it. Also **remove `noindex`** (in
  `app/layout.tsx` and `app/robots.ts`) when going public.
- OG image was never checked in a real link unfurl (e.g. paste into WhatsApp
  after deploy).
- The 5 other WhatsApp forms (club tour, service, challenge, contact,
  franchise) share the helper but were only type-checked, not clicked; Events
  "Register" and Careers application forms still fake success (not in spec).
- Home LCP is 3.9s (Lighthouse mobile throttling) — hero imagery is the
  likely cause; not tuned.
- Remaining axe items (intentional): Timetable rows for finished classes are
  dimmed to 40% opacity; Franchise "01/02/03" lime numerals use a dark text
  stroke that axe doesn't account for.
- Contrast and overflow were checked on desktop/390px only for the routes
  listed; modals and open dropdowns were not audited.
- "35+ years of fitness industry expertise" (Abhimanyu, About + Franchise)
  was left alone — personal tenure, no source for the real number. Ask the
  owner. (Events copy elsewhere says "40 years in fitness"; Founder says
  "forty years" — these disagree and need reconciling.)
- Map pin coordinates (`mx`/`my`) are rough placements, not real geography.
- Unverified sample data: everything except ICC/Magarpatta hours and the 9
  named addresses.
- Not yet filed: `SendFeedback` report that a research subagent edited files
  despite an explicit "do not edit" instruction (see git history of
  `lib/data.ts`, `lib/time.ts`, `TrainersProgramsContent.tsx`).
