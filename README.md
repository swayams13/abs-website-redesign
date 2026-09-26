# Handoff: ABS Fitness & Wellness Club — marketing website

## Overview

A twelve-template marketing website for ABS Fitness & Wellness Club (founded by Abhimanyu Sable, 35+ clubs across Maharashtra). The site's job is lead generation: get the visitor to book a free club tour, enrol in the 90-Day Weight Loss Challenge, or find their nearest club. Target deployment: Vercel, static or SSG.

Templates:

| Template | Route | Purpose |
|---|---|---|
| `ABS-Home v5.dc.html` | `/` | **Current home page** — spec in `HOME-V5.md` |
| `ABS-Home v4.dc.html` | — | Previous home page, kept for reference; its sections are documented below |
| `ABS-Locations.dc.html` | `/locations` | All clubs, filterable by city and zone |
| `ABS-Trainers-Programs.dc.html` | `/trainers-programs` | Coach roster + program catalogue + challenge enrolment |
| `ABS-Club.dc.html` | `/clubs/[slug]` | One page per club, driven by slug (30 clubs in data) |
| `ABS-About.dc.html` | `/about` | Mission/vision, philosophy, founder story, member reviews, gallery |
| `ABS-Service.dc.html` | `/services/[slug]` | 7 service detail pages, driven by `?service=` in the design |
| `ABS-Timetable.dc.html` | `/timetable` | Full weekly group-class timetable per club |
| `ABS-Events.dc.html` | `/events` | Upcoming/past events, detail modal, event registration |
| `ABS-Exercises.dc.html` | `/exercises` | Exercise gallery with search, muscle-group filter, step-by-step detail |
| `ABS-Franchise.dc.html` | `/franchise` | Franchise pitch, investment tabs, expansion map, FAQ, enquiry form |
| `ABS-Careers.dc.html` | `/careers` | Job listings with filters, job detail, application with CV upload |
| `ABS-Contact.dc.html` | `/contact` | Contact form with topic picker, channels, full searchable FAQ |

Shared: `Nav.dc.html`, `Footer.dc.html`, `abs-data.js`.

> **Important — two visual systems.** The current home page (`ABS-Home v5.dc.html`) uses a newer look: Plus Jakarta Sans + Cormorant Garamond italic, pill buttons, rounded cards, glass surfaces. The inner pages still use the v4 system described in this README (Barlow, square corners, corner ticks). Both share the colour palette. Confirm with the client which system the whole site should use before building inner pages. `HOME-V5.md` has the v5 tokens.

**Read in this order:** `HOME-V5.md` (current home page) → this README (inner pages + shared behaviour) → `TECH-STACK.md` (framework, services, project shape, sequencing) → `screenshots/` (26 flat captures of the first four pages; the eight newer pages have none — open the `.dc.html` files in a browser).

## About the design files

The files in `design/` are **design references written in HTML** — prototypes that show intended look and behaviour. They are not production code to copy. They use a lightweight in-house template runtime (`support.js`, the `<x-dc>` / `{{ }}` / `<sc-for>` / `<sc-if>` syntax) that exists only in the design tool. **Do not port that runtime.**

The task: **recreate these designs in a real framework.** Recommended for this project — Next.js (App Router) + React, deployed on Vercel, since:
- Club pages are a natural `generateStaticParams` over the club list.
- The lead forms need a server action or API route.
- Image optimisation via `next/image` matters (large hero photography).

`abs-data.js` is a plain ES module with no runtime dependency and **can be reused as-is** (see "Data layer").

## Fidelity

**High fidelity.** Colours, typography, spacing, animation timings and copy are final. Recreate pixel-for-pixel. Everything below is the exact value from the design; nothing here is a placeholder to be re-decided except the photography (see "Assets").

## Design tokens

### Colour
| Token | Value | Use |
|---|---|---|
| Ink (page) | `#0d0e0d` | Dark section background, page background |
| Ink raised | `#151716` | Card/panel background inside dark sections |
| Paper | `#f2f2f3` | Light section background; body text on dark |
| Paper ink | `#1d1f20` | Text on light sections |
| Volt | `#b8e600` | Primary brand accent — CTAs, eyebrows, accents, Passport section background |
| Volt hover | `#cdf23c` | Hover state of volt buttons |
| Volt dark | `#6d8a00` | Volt legible on the light `#f2f2f3` ground (eyebrows on light sections) |
| White | `#ffffff` | Headings on dark |
| Error | `#ff9b8a` | Form validation text and error borders |

Alpha derivations, used verbatim:
- On dark: text `rgba(242,242,243,.82)` body, `.72` secondary, `.6`–`.55` tertiary, `.45` faint. Borders `rgba(242,242,243,.18)` hairline, `.2`–`.28` card, `.3`–`.4` interactive.
- On light: text `rgba(29,31,32,.74)` body, `.7` secondary, `.6` tertiary. Borders `rgba(29,31,32,.18)`–`.22`.
- On volt: text `rgba(13,14,13,.75)` secondary. Borders `#0d0e0d` at `1.5px`, or `rgba(13,14,13,.3)` inactive.

Rule: max two background colours per viewport. Sections alternate ink → paper → ink, with exactly one volt section (Passport) as the page's colour event.

### Typography
Two families, loaded from Google Fonts:

```
Barlow: 400, 500, 600, 700
Barlow Condensed: 500, 600, 700, 800
```

- **Barlow Condensed** — all headings, all display numerals, timetable times, phone number. Always `text-transform: uppercase` for headings, `letter-spacing: -.01em` to `-.015em` at display sizes, `line-height: .88`–`1`.
- **Barlow** — body copy, labels, buttons, form fields, eyebrows.

Type scale as authored (all `clamp()`, fluid):

| Role | Value |
|---|---|
| Hero h1 | `clamp(50px, 9vw, 132px)` / `.9` / Condensed 700 |
| Section h2 | `clamp(34px, 5vw, 64px)` / `.98` / Condensed 700 |
| Big statement h2 (Passport, Challenge, Join) | `clamp(40px, 6.6vw, 104px)` / `.88`–`.9` |
| Card h3 | `26px`–`clamp(26px, 2.6vw, 38px)` / `1`–`1.04` |
| Stat numeral | `clamp(42px, 5.2vw, 72px)` / `1` / `font-variant-numeric: tabular-nums` |
| Lead paragraph | `clamp(16px, 1.5vw, 19px)` / `1.55` |
| Body | `15px`–`16px` / `1.6` |
| Small / meta | `13px`–`14px` / `1.55` |
| Eyebrow | `11px` / 700 / `letter-spacing: .24em` / uppercase |
| Button label | `12px`–`13px` / 700 / `letter-spacing: .16em` / uppercase |
| Micro label | `10px`–`11px` / 700 / `letter-spacing: .18em`–`.28em` / uppercase |

`p { text-wrap: pretty }` globally.

### Spacing & layout
- Content column: `max-width: 1320px; margin: 0 auto`.
- Horizontal gutter, everywhere: `clamp(16px, 4vw, 44px)`.
- Section vertical padding: `clamp(56px, 8vw, 112px)`; hero-adjacent and feature sections up to `118px`.
- Grid gap: `clamp(14px, 2vw, 24px)` for card grids; `clamp(32px, 5vw, 72px)` for two-column splits.
- Responsive columns use `repeat(auto-fit, minmax(Xpx, 1fr))` with `X` = 300 for text splits, 280 for club cards, 210–240 for portraits. **Exception:** where item count doesn't divide evenly, columns are set explicitly from JS breakpoints (see "Responsive behaviour").

### Borders, radius, shadow
- **Radius: 0 everywhere.** No rounded corners on any card, button, input or panel. The only circles are the passport stamp, status dots, and the before/after drag handle.
- Hairline borders `1px`; on volt ground `1.5px`; emphasis rules `2px`; active tab underline `2px solid #b8e600`; top progress bar `2px`.
- **One shadow in the whole design:** the before/after drag handle, `0 6px 18px rgba(13,14,13,.35)`. Nothing else casts a shadow.
- **Corner ticks** are the signature motif: primary CTAs, the Passport card and the lead form carry four small L-marks offset `-5px`/`-6px` outside each corner, drawn as two crossed 1px gradients on a `10px`/`11px` box. Reproduce exactly — they read as registration marks.

```css
/* one corner tick, repeated 4× with top/left, top/right, bottom/left, bottom/right */
position: absolute; top: -5px; left: -5px; width: 10px; height: 10px;
background:
  linear-gradient(CURRENT, CURRENT) center / 1px 100% no-repeat,
  linear-gradient(CURRENT, CURRENT) center / 100% 1px no-repeat;
```
`CURRENT` = `#b8e600` on volt buttons, `#0d0e0d` on the Passport card, `rgba(242,242,243,.55)` on the dark form panel.

### Motion
| Element | Animation |
|---|---|
| Standard easing | `cubic-bezier(.22,.7,.3,1)` |
| Panel expand easing | `cubic-bezier(.7,0,.2,1)` |
| Hero headline | 4 lines, `translateY(110%)` → `0`, 1000ms, stagger 110ms, delay 180ms, clipped by `overflow:hidden` wrapper per line |
| Hero supporting elements | fade + `translateY(22px)` → `0`, 900ms, stagger 120ms, delay 520ms |
| Scroll reveal | `opacity 0→1`, `translateY(24px)→0`, 700ms, stagger `(i % 6) * 60ms`, fired by IntersectionObserver at `threshold .05`, `rootMargin 0 0 -8% 0`. Elements already above 94% of the viewport on load are exempt (no flash). |
| Stat counters | count 0 → target over 1500ms, ease `1-(1-p)³`, formatted `toLocaleString('en-IN')`, triggered at `threshold .4`, once |
| Ticker marquee | `translateX(0 → -50%)`, 30000ms, linear, infinite; the list is duplicated so the loop is seamless |
| Kinetic "Believe it" band | `translateX` driven by scroll position: `min(0, -(innerHeight - rect.top) * .28)` px |
| Program panels | `flex` 1→3 on hover/focus, 750ms; body copy `opacity` 500ms + `max-height` 0→220px |
| Testimonial rotator | 6500ms auto-advance, progress bar `scaleX(0→1)` linear over the same duration, pauses on hover |
| Passport stamp | on city change: `rotate(-14deg) scale(1.5)` + `opacity 0` → `scale(1)` + `opacity 1`, 420ms, `cubic-bezier(.2,1.4,.4,1)` |
| Live status dot | pulsing ring `0 0 0 0 rgba(184,230,0,.6)` → `0 0 0 8px rgba(184,230,0,0)`, 1600ms infinite |
| FAQ accordion | `grid-template-rows: 0fr → 1fr`, 350ms; plus-to-x via `rotate(45deg)`, 300ms |
| Scroll cue | 1px rule, `scaleY` 0→1 (origin top) →0 (origin bottom), 1800ms infinite |
| Top progress bar | `width: scrollY / (scrollHeight - innerHeight) * 100%`, no transition (frame-accurate) |

**All motion must be gated on `prefers-reduced-motion: reduce`.** When reduced: skip hero, marquee, reveal, stamp and counter animations, and render counters at their final value immediately (never `0`).

## Data layer

`design/abs-data.js` is framework-agnostic and should be reused. It exports:

- `PHONE` `'+91 97632 15051'`, `PHONE_HREF`, `EMAIL` `'info@absfitnessclub.in'`
- `CLUBS` — 30 club records: `{ slug, name, city, cityShort, zone, addr, hours, tag, mx, my, price, sunday, maps }`. `mx`/`my` are percentage coordinates for the schematic locations map. `tag` ∈ `Flagship | Premium | 24×7 access | Ladies-only hours | ''`.
- `CITIES` — `['Pune','Mumbai','Nashik','Kolhapur','Ahilyanagar','Chhatrapati Sambhaji Nagar']`
- `ZONES` — `['East','West','Central','South']` (Pune only)
- `TRAINERS` — 6 records: `{ id, name, role, spec, bio, tags, club, slot, photo }`
- `clubBySlug(slug)`, `clubsInCity(city)`, `clubPhotos(slug)` (deterministic 6-photo set per club)
- `clubDetails(club)` → `{ amenities, trainers, timetable, reviews, rating, reviewCount }`, deterministically derived from a hash of the slug
- `status(hours, now)` → `{ open, label, short, dot }` — live open/closed in IST
- `istMinutes(now)`, `validPhone(s)` (`/^(\+91[\s-]?)?[6-9]\d{9}$/`)

**Important:** `clubDetails`, `clubPhotos`, `rating` and `reviewCount` are *deterministic placeholders* generated from the slug — they look plausible and are stable across reloads, but they are not real ABS data. Before launch, replace with real per-club amenities, timetables, ratings and reviews from the client. Keep the function signatures so the templates don't change.

`status()` is the one piece of live logic on the site: it computes open/closed against Asia/Kolkata regardless of the visitor's timezone via `Intl.DateTimeFormat`. Keep that approach; do not use local `Date` hours. If you server-render, compute status on the client after hydration or the markup will be stale.

## Screens

### 1. Home (previous version) — `ABS-Home v4.dc.html`

Superseded by v5 — see `HOME-V5.md`. Kept because several inner pages reuse its section patterns.

Twelve sections in order. Numbered eyebrows (`01 — Train` … `09 — Questions`) run through the page as a spine; keep the numbering if sections are reordered.

**Announcement bar** (dismissible via a prop in the design; make it CMS-controllable)
Volt ground, `#0d0e0d` text, `9px` vertical padding, centered, `11.5px/700/.14em` uppercase. Left: "90 Days. One Goal. Real Results." Right: link "Next batch starts {date} — Enrol →" underlined `1.5px solid #0d0e0d`. Date is computed as the **first Monday of next month, IST**.

**Nav** (`Nav.dc.html`) — sticky, `height: 70px`, `background: rgba(13,14,13,.9)` + `backdrop-filter: blur(14px)`, bottom hairline. Logo `height: 34px` with `mix-blend-mode: screen` (the source logo has a black background — replace with a transparent PNG/SVG and drop the blend mode). Items: Home, About, Locations, Programs, Events, Franchise, Contact, each `12px/600/.16em` uppercase; active item gets a `2px` volt underline `-2px` below. Right: "Join Now" volt button `13px 22px` with corner ticks. Below `1060px`: hamburger (`46×46`, 1px border, three bars, top bar volt) opening a full-width panel of `26px` Condensed links, volt CTA and the phone number.

**Hero** — `min-height: clamp(620px, calc(100svh - 70px), 980px)`, content bottom-aligned. Full-bleed photo behind two gradient scrims: `linear-gradient(96deg, rgba(13,14,13,.96), rgba(13,14,13,.84) 40%, rgba(13,14,13,.25))` for left-to-right legibility, plus `linear-gradient(0deg, rgba(13,14,13,.95), transparent 50%)` for the bottom stat rail. Content padding `clamp(90px,12vw,150px) clamp(60px,7vw,110px) clamp(36px,4vw,56px) clamp(16px,4vw,44px)` — the asymmetric right padding clears the vertical city rail.
- Eyebrow row: `34×2px` volt rule + `#ITSNOTGYMITSLIFE` (`11px/700/.26em`), then a live-status pill (1px border, `7px` pulsing dot, "Open now · closes 11:00 PM").
- H1, four lines, last line volt: "Your body can / achieve it. / Your mind must / believe it."
- Lead: "35+ clubs across Maharashtra. Over a lakh members. Twenty years of Abhimanyu Sable's ABS. One membership card opens every single club."
- CTAs: volt "Book a Free Club Tour" (`19px 32px`, corner ticks) → `#join`; ghost "Find Your Nearest Club" (1px `rgba(242,242,243,.4)`) → `#clubs`.
- Bottom rail above a hairline: three stats (35+ Clubs · 1,00,000+ Members · 20 Years of ABS) and a "Scroll" cue with the animated 1px rule.
- Right edge ≥900px: vertical `writing-mode: vertical-rl` city list, `11px/600/.3em`, `rgba(242,242,243,.5)`, preceded by a `1px × 70px` rule.

**Ticker** — hairline top and bottom, single row, 22px Condensed uppercase, every 4th item volt, items separated by a `6px` volt square rotated 45°. Strings: `#ITSNOTGYMITSLIFE`, `35+ clubs`, `One membership`, `6 cities`, `Free club tour`, `Your body can achieve it`, `Your mind must believe it`, `90-day challenge`.

**Manifesto** — paper ground. Opens with the kinetic outline band: "Believe it" repeated, `clamp(90px,17vw,260px)` Condensed 800, `color: transparent`, `-webkit-text-stroke: 1px rgba(29,31,32,.28)`, `white-space: nowrap`, scroll-parallaxed. Then a two-column split: left, eyebrow "Since club one · Pune, 29 August 2005", h2 "It's not a gym. It's life.", the founder paragraph, and a 4-item credentials grid (numbered `01`–`04`, each with a top `1.5px` rule); right, a photo cluster — a `3/4` portrait beside a stacked `1/1` floor shot and an ink caption block ("Abhimanyu Sable / Founder, MD & CEO / 40 years in fitness · 20 years of ABS").

**Stats** — four columns on ink, bottom hairline. Values animate on scroll: `35+` Clubs, `1,00,000+` Members, `10 lakh` Sq ft of floor, `1000+` Certified pros, each with a volt label and a grey descriptor.

**Programs** (`01 — Train`) — desktop (≥900px): four horizontal panels in a `height: min(580px, 72vh)` flex row; hovered/focused panel takes `flex: 3`, others `flex: 1`; the active panel reveals its body copy and a volt top bar (`scaleX` 0→1). Each panel: full-bleed photo, bottom-up scrim, `01`–`04` volt index top-left, Condensed title, description, volt CTA. Below 900px (or `programLayout: 'grid'`): a `minmax(260px,1fr)` grid of `340px`-min cards with all copy always visible. Programs: Personal Training, Strength Training, Group Classes, 90-Day Challenge.

**90-Day Challenge** (`02`) — `#151716` ground with a photo at `opacity .35` behind a left-to-right scrim. Left: display h2 "90 Days. / One Goal. / **Real Results.**" (third line volt) at `clamp(44px,7vw,104px)`, the official challenge copy, a five-item inline list (Dedicated coach · Nutrition plan · Fortnightly measurements · All group classes · Passport access) each bulleted with a rotated volt square, then a volt CTA beside the computed next-batch date and days-remaining. Right: a four-row phase table (`0` Assessment, `1–30` Foundation, `31–60` Build, `61–90` Finish) built as a `1px`-gap grid on a `rgba(242,242,243,.16)` ground so the gaps read as rules; each row is `96px` numeral column + copy column.

**Passport** (`03`) — the volt section. Left: h2 "One card. Every club.", the official Passport explanation, a row of six city buttons (`1.5px solid #0d0e0d`; active = ink fill, volt text), and below a `1.5px` rule the selected city's name at `44px` with its club count and the club list as diamond-bulleted links. Right: the passport card itself — `1.5px` ink border, `rgba(255,255,255,.22)` fill, corner ticks, header ("ABS Fitness & Wellness Club" / "PASSPORT" / "Valid at 35+ clubs"), a six-tile city grid mirroring the selection, a footer row ("Member since" / "#ITSNOTGYMITSLIFE"), and a circular double-border stamp rotated `-14deg` reading "Valid in / {city}", overlapping the card edge (intentional).

**Inside a club** (`04`) — paper. Photo mosaic: one `16/10` wide shot plus two `4/5` verticals, laid out `2fr 1fr 1fr` above 700px and `1fr 1fr` (wide shot spanning both) below. Then a 12-item amenity list as a bordered grid: numbered `01`–`12`, `15.5px/600`, each row with a bottom hairline, under a `1.5px` top rule.

**Clubs** (`05`) — ink. Header row: h2 "Find your club" and a live search field — borderless input on a `2px` bottom rule, `clamp(26px,3vw,36px)` Condensed uppercase, with a match count to its right. Six featured club cards (`minmax(280px,1fr)`): `200px` photo with a live open/closed pill overlaid top-left, then city eyebrow, `26px` name, address, and a footer row of hours + "View club →". Hover: border → volt, `translateY(-4px)`. Below, an "Also" row of bordered chips for the remaining Pune clubs and the other cities, with "View all 35+ locations →" pushed right. Empty state: bordered panel, "No club matches "{q}" yet", with phone and all-locations links.

**Today at ABS** (`06`) — live timetable for Magarpatta City. Left: h2, explanation, a large IST clock (`clamp(40px,4.6vw,60px)`, tabular numerals) with the weekday. Right: seven rows (`92px` time column + class/coach/days + status), separated by hairlines. Rows compute their own state against IST: finished classes drop to `opacity .45`; a class within 60 minutes of its start shows an "In session" volt outlined pill; the next upcoming class shows a solid volt "Up next" badge, and both turn their time volt.

**Results** (`07`) — paper. Two before/after comparison cards plus one testimonial card in the same grid. Comparison: `4/3` frame, after-image clipped by `clip-path: inset(0 0 0 {pct}%)`, BEFORE (ink) and AFTER (volt) corner labels, and a draggable `44px` hit area with a `2px` volt rule and a `40px` volt circular handle. Pointer events with `setPointerCapture`, clamped 4–96%, `touch-action: none`. Metric below: `−18 kg` / `in 90 days` / name / club and program. Testimonial card: ink panel, five volt stars, index counter, `clamp(22px,2.2vw,28px)` Condensed quote, `46px` avatar, name, membership line, prev/next `40px` square buttons, and a bottom progress bar.

**Team** (`08`) — four portrait cards, `4/5` aspect, bottom-up scrim over the lower half, name/role/speciality overlaid at the bottom. Hover: border → volt.

**Community** — `#ITSNOTGYMITSLIFE` as a volt `clamp(30px,4vw,54px)` heading beside an Instagram link, then a full-bleed six-image square strip with `4px` gaps (6 / 3 / 2 columns by breakpoint).

**FAQ** (`09`) — paper, two-column. Left: heading and a phone line. Right: six accordion rows, one open at a time (index 0 open by default, clicking the open row closes it). Row header is a full-width button: Condensed `clamp(20px,2vw,25px)` uppercase question, plus a `30px` bordered square `+` that rotates 45° when open. Body animates via `grid-template-rows`. Questions cover Passport access, booking a tour, how the challenge works, ladies-only sections, club timings, and membership transfer.

**Join** (`#join`) — three "how it works" cards in a 1px-gap grid (Book a free tour / Meet your coach / Start on the floor), then the lead block: left, h2 "Walk in once. / **Stay for years.**", supporting copy, the phone number as a `clamp(28px,3vw,40px)` Condensed link on a `2px` volt underline, and a WhatsApp line. Right, the form panel (1px border, corner ticks):
- Intent toggle: "Free club tour" | "90-Day Challenge" — active is volt-filled; it changes the submit label to "Book my free tour" or "Enrol me for {batch date}".
- Fields: Full name (text), Mobile number (tel), Choose your club (select over all 30 clubs, labelled `ABS {name} · {cityShort}`).
- Volt submit, then "No spam. A coach calls you once to fix a time."
- Success state replaces the form: "Request received" eyebrow, "See you on the floor, {firstName}." at `clamp(30px,3.4vw,44px)`, a line naming the club, phone and intent, a "See the club →" link and a "Book another" ghost button.

**Footer** (`Footer.dc.html`) — four columns: logo + the tagline in `22px` Condensed uppercase + `#ITSNOTGYMITSLIFE` + four `38px` square social tiles (IG/FB/YT/WA); Clubs in Pune (8 links + "All 35+ clubs →"); Other Cities + Quick Links; Get In Touch (phone at `30px` Condensed, email, head-office line, volt "Book a Free Club Tour" button with corner ticks). Bottom bar above a hairline: copyright and the city list, `12px`, `rgba(242,242,243,.45)`.

**Mobile sticky bar** (<780px) — fixed bottom, two buttons: "Call" (ink, `flex: 1`) and "Book a Free Tour" (volt, `flex: 2`), `16px 8px`, `1px` gap showing the `rgba(242,242,243,.2)` ground as rules. Add bottom padding to the page so the footer clears it.

### 2. Locations — `ABS-Locations.dc.html`
Hero with the Passport cross-sell block, city and zone filters, a schematic map positioning clubs by the `mx`/`my` percentages from the data, and the full club list with live status. Every club links to `/clubs/[slug]`.

### 3. Trainers & Programs — `ABS-Trainers-Programs.dc.html`
Program cards link to `/services/[slug]` (01 personal-training, 02 group-classes, 03 mobility, 04 strength, 05 90-day). Includes a **BMI calculator** section (`#bmi`, paper ground) before the closing CTA: height slider 130–210 cm, weight slider 35–160 kg, BMI = kg / m² to 1 decimal, category bands <18.5 Underweight `#7fa8ff`, 18.5–24.9 Healthy `#b8e600`, 25–29.9 Overweight `#ffc94d`, ≥30 Obese `#ff8a6b`; a 4-segment bar (widths 18.5 : 6.5 : 5 : 10) with a white marker at `(bmi − 10) / 30` clamped 0–100%; advice line + a link to the recommended service page. Photo hero; coach roster (6 cards, `4/5` portraits, filterable by focus chips: All, Strength, Fat loss, Yoga, HIIT, Onboarding — matching against each trainer's `tags`); five program cards with bullet points; and the 90-Day Challenge enrolment panel (₹11,999 full price / ₹8,999 members, name + mobile + goal + club, success state naming the coach call window). Batch date is currently hard-coded to 1 October 2026 — move to config.

### 4. Club detail — `ABS-Club.dc.html?club={slug}` → `/clubs/[slug]`
Slug-driven. Hero photo with club name, city breadcrumb, live status, address, hours, tag; a five-image gallery mosaic (`2fr 1fr 1fr` pattern); amenities; price and a free-tour form (name, mobile, preferred time slot); timetable; trainers at that club; reviews with rating; nearby clubs in the same city. Renders a "Club not found" state for an unknown slug — in Next.js, prefer `notFound()` plus `generateStaticParams` over the 30 slugs.

### 5. About — `ABS-About.dc.html` → `/about`
- **Hero**: full-bleed photo + 96° scrim; h1 "Your body can achieve it. Your mind must believe it." (second sentence volt); 4-stat rail (35+ Locations · 1,00,000+ Members served · 10,00,000 Sq ft managed · 2005 Established).
- **Mission & Vision** (`#mission`, paper): a two-button segmented toggle (ink fill when active) swaps heading, two paragraphs and a numbered commitment list. Copy is from the client's About page — keep verbatim.
- **Philosophy** (ink): "Fitness is for everyone." + 4 value cells in a 1px-gap grid + "What we offer" chips linking to each service page.
- **Founder story** (`#founder`, paper): left column sticky at `top:100px` with name, "Founder. President. Pioneer.", the **real portrait `assets/abhimanyu-sable.jpg`** (4:5, crop focus 50% 20%), and bio. Right: vertical timeline on a `1.5px` left rule, `12px` volt squares as nodes; 8 entries from early years → 1991 Sagar Plaza → Sancheti/Poona Club → 1996 Holiday Inn → ACSM → 2003 ACE nomination → 2005 ABS founded → Today.
- **Members reviews** (`#reviews`): filter pills (All, Weight loss, Strength, Personal training, Community), cards with 5 stars, quote, name, city · tag. **Reviews are placeholders.**
- **Gallery** (`#gallery`): filter pills (All, Clubs, Classes, Events, Transformations), square tiles with a category badge bottom-left. 12 empty slots — client photography required.

### 6. Service detail — `ABS-Service.dc.html?service={slug}` → `/services/[slug]`
Slugs: `strength`, `weight-loss`, `mobility`, `personal-training`, `sports`, `group-classes`, `90-day`. Sticky horizontal tab strip of all 7 (active = white text + 2px volt underline; scrolls horizontally on mobile). Hero with "Service 0N / 07", name, lede (client copy), and a 3-fact rail. Paper body: "Who it's for" list, "What's included" bordered tiles, "A typical week" day/description table, links to coaches, timetable and exercise library. Closing free-trial form (name + mobile) with prev/next service links. In Next.js use `generateStaticParams` over the 7 slugs; data lives in the `SERVICES` array in the file's logic class.

### 7. Timetable — `ABS-Timetable.dc.html` → `/timetable`
Club select (top right), 7-day segmented bar (defaults to today, "Today" sublabel), class-type pills (All, HIIT, Yoga, Spin, Zumba, Strength, Circuit, Mobility, 90-Day). Rows: time (Condensed 24px) · class / coach · length · level · type tag. For today: finished classes `opacity .4`; the class in progress turns its time volt and shows a volt "Live now" tag. Re-evaluates every 60s. Empty state per filter. **Schedule and coach names are placeholders** — needs a per-club source (CMS or sheet).

### 8. Events — `ABS-Events.dc.html` → `/events`
Upcoming | Past toggle (split by ISO date vs. today; upcoming sorted ascending, past descending). Cards: 16:10 image, volt date block (day + "Mon YY") top-left, category, title, where · time; hover border → volt. Click opens a modal (`rgba(13,14,13,.8)` backdrop, closes on backdrop click, × button, Esc) with description, where/time/entry and — for upcoming events — a name + mobile registration form; success replaces it. GROW 2026 and 20 Years of ABS are real; the rest are placeholders.

### 9. Exercise gallery — `ABS-Exercises.dc.html` → `/exercises`
Muscle-group pills (All, Legs, Back, Chest, Shoulders, Core, Full body, Mobility) + underline search input. Left: grid of square thumbnails (`minmax(150px,1fr)`), selected tile border volt. Right (sticky `top:90px`): group · level eyebrow, name, "Works / Equipment" line, numbered steps, and a "Coach tip" callout on `#151716`. 16 exercises in the `EX` array. Thumbnails need client photos or short looping videos.

### 10. Franchise — `ABS-Franchise.dc.html` → `/franchise`
- **Hero**: "Own an ABS club." + 4 stats (35+ clubs · 1,00,000+ members · 20 yrs · 2–3 yrs payback); CTAs to `#apply` and `#model`.
- **Why our franchise** (paper): company paragraph + founder strip (real portrait thumbnail 76×96) and 5 numbered reasons.
- **Investment** (`#model`): Investment | Property | Agreement tabs over a 1px-gap spec grid. Values: total ₹50 L – 1 Cr; brand fee ₹10,00,000; anticipated ROI 60%; payback 2–3 yrs; 1,000–2,000 sq ft; domestic property; PAN India; 5-year renewable term; standard agreement; head-office training; brand since 2005, franchising since 2014. Highlighted values in volt. Disclaimer line below. **Source: Franchise India listing — client must confirm.**
- **ABS advantage** (`#151716`): 6-item accordion (one open at a time), photo left.
- **Franchisee profile** (paper): 4 numbered criteria with outlined volt numerals.
- **Expansion**: region pills (West, North, South, Central, East, Union Territories) swap a state list panel.
- **FAQ**: 6 rows, one open.
- **Apply** (`#apply`): 4-step process list, phone, email; form fields name*, mobile*, email*, state* (select, all states/UTs), city*, investment range* (₹30–50 L, ₹50 L–1 Cr, ₹1–2 Cr, ₹2 Cr+), property status pills (own / leased / looking), message. Currently saves to `localStorage['abs-franchise-enquiries']` — **replace with POST to `/api/franchise`**. Success state echoes name, phone, city, state, email.

### 11. Careers — `ABS-Careers.dc.html` → `/careers`
Photo hero; 4 perks (paper); "Open roles NN" with department + city selects; accordion job rows (title, dept · city · type · experience) expanding to description, requirements and "Apply for this role" (pre-fills the form's role select and scrolls to `#apply`). Application form: role, name*, mobile*, email*, certifications, CV upload* (.pdf/.doc/.docx, dashed drop row shows the file name). **Jobs are placeholders.** In production, upload the CV to storage (Supabase Storage / Vercel Blob) and email HR.

### 12. Contact — `ABS-Contact.dc.html` → `/contact`
Left: channel rows (Call, WhatsApp `wa.me/919763215051`, Email, Franchise), head-office line, hours, link to locations. Right: topic pills (Membership, Personal training, 90-Day Challenge, Franchise, Careers, Feedback), name*, mobile*, email (optional, validated if present), nearest club select, message* (≥3 chars). Below (`#faq`, paper): category chips + search over 11 FAQ entries, one open at a time, empty state.

## Interactions & behaviour

**Forms** — all client-side today; the design has no backend. Validation:
- Name: `trim().length >= 2` → "Please enter your full name."
- Phone: `/^(\+91[\s-]?)?[6-9]\d{9}$/` after stripping spaces and dashes → "Enter a valid 10-digit Indian mobile number."
- Club: required → "Choose the club you want to tour."
- Errors show as `13px #ff9b8a` text below the fields and turn the offending field's border `#ff9b8a`. Validation fires on submit, and each keystroke clears the error.

Every form on the new pages (Franchise, Careers, Contact, Service trial, Event registration) follows the same validation pattern and the same error colour. Email regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`. Suggested endpoints: `/api/lead` (tour, challenge, service trial, event), `/api/franchise`, `/api/careers` (multipart, CV), `/api/contact`. Store a `source` field on every lead (page + form).

To make production-ready: POST to a Next.js route handler that (a) writes the lead to the client's CRM or a Google Sheet, (b) sends a WhatsApp/SMS notification to the club, (c) emails `info@absfitnessclub.in`. Add a honeypot or Turnstile, and rate-limit. Keep the optimistic success state — it's part of the design.

**Deep links** — the home page and club page read `?club={slug}` on load and preselect that club in their form. Preserve this: club pages link to the home form with the slug attached.

**Navigation** — in-page anchors are `#manifesto`, `#programs`, `#challenge`, `#passport`, `#facilities`, `#clubs`, `#timetable`, `#results`, `#faq`, `#join`. `html { scroll-behavior: smooth }`. Do not use `scrollIntoView`.

## State

Per page, all client state:

| State | Type | Notes |
|---|---|---|
| `w` | number | `window.innerWidth`, updated on resize; drives the layout branches |
| `now` | number | `Date.now()`, ticked every 15s; drives live status, IST clock, timetable, batch date |
| `panel` | 0–3 | Active program panel |
| `city` | 0–5 | Selected Passport city |
| `q` | string | Club search query |
| `quote` | number | Testimonial index, auto-advancing every 6500ms |
| `cmp` | number[] | Before/after slider percentages, one per card |
| `faq` | number | Open FAQ index, `-1` = all closed |
| `intent` | 0 \| 1 | Tour vs. challenge |
| `name`, `phone`, `club`, `error`, `sent` | — | Lead form |

In React: `useState` for all of it, `useSyncExternalStore` or a `useMediaQuery` hook for `w`, and one `setInterval` for `now`. The IST-dependent values must be computed client-side to avoid hydration mismatch.

## Responsive behaviour

Breakpoints are JS-driven in the design (from `state.w`) because several grids need exact column counts:

| Width | Behaviour |
|---|---|
| ≥1060px | Full nav; below this, hamburger |
| ≥900px | Program panels row (below: card grid); hero vertical city rail; 6-column gallery |
| ≥780px | Below this, mobile sticky action bar appears |
| ≥700px | Facilities mosaic `2fr 1fr 1fr` (below: `1fr 1fr`) |
| ≥480px | Gallery 3 columns (below: 2) |

In React, prefer CSS container queries or media queries where possible and keep JS breakpoints only for the panel/grid column counts. Note the two grids that **must not** use naive `auto-fit`: the facilities mosaic and the Instagram strip both orphan an item at intermediate widths.

Everything else is fluid — `clamp()` type, `minmax()` grids, no fixed heights on text containers.

## Accessibility

Already in the design, keep it: `:focus-visible { outline: 2px solid #b8e600; outline-offset: 3px }`; program panels respond to `focus` as well as hover so they're keyboard-reachable; `aria-expanded` on FAQ buttons; `aria-label` on icon-only buttons; `prefers-reduced-motion` gating.

To add: skip link to main content; a live region announcing club-search result counts; `alt` text on every photo (the design's slots have no alt); verify the volt-on-ink and ink-on-volt combinations at final photo opacities (both pass 4.5:1 on flat grounds, but text over photography needs the scrims kept at the authored opacity).

## Assets

**Logo** — `design/assets/abs-logo.png`, white wordmark on a black square. Both Nav and Footer currently use `mix-blend-mode: screen` to knock out the background. **Get a transparent SVG or PNG from the client and remove the blend mode**; the current approach breaks on any non-dark background.

**Photography — action needed.** Every image in the design is a licensed Unsplash stand-in, not ABS's own photography. They are wired as `src` on the design's image slots with Unsplash attribution. None of them may ship as ABS marketing material.

Replace with real ABS photography before launch:
- 1 hero (wide, training floor)
- ~~1 founder portrait~~ — **done**: `design/assets/abhimanyu-sable.jpg` (supplied by the client) is used on Home, About and Franchise. Still needed in his trainer card if he appears in the roster
- 1 club floor detail, 1 challenge background
- 4 program images, 3 facility images, 6 club cards
- 4 before/after images (with member consent), 4 testimonial avatars
- 6 trainer portraits, 6 Instagram/community squares
- 6 photos per club page × 30 clubs (or a shared pool with per-club overrides)
- About: 1 hero, 12 gallery images · Franchise: 1 hero, 1 support image · Careers: 1 hero · Events: 1 per event · Exercises: 16 thumbnails · Services: 7 heroes

In Next.js, serve these through `next/image` with `priority` on the hero and `sizes` set from the grid definitions above. The heroes are the largest payload on the page — WebP/AVIF at 2400px max.

**Fonts** — Barlow and Barlow Condensed from Google Fonts. Use `next/font/google` to self-host and avoid the render-blocking stylesheet.

## Content accuracy

Facts in the copy came from the client's own site and should be re-confirmed before launch, since their published numbers vary across properties:
- 35+ locations, 1,00,000+ members, 10,00,000 sq ft, 1000+ certified professionals
- First ABS club opened 29 August 2005, Pune; ~20 years of ABS, ~40 years of Abhimanyu Sable in fitness
- Founder, MD & CEO; first Indian certified by ACSM; Founder President of UHFF; IHRSA member; nominated for the 2003 ACE Fitness Professional of the Year award
- Phone `+91 97632 15051`, email `info@absfitnessclub.in`
- The Passport and 90-Day Challenge descriptions paraphrase the client's published wording — have them approve the final copy

Testimonials, transformation metrics, per-club ratings, review counts and timetables are **plausible placeholders**. Also placeholders on the newer pages: About reviews, all job openings, event entries other than GROW 2026 / 20 Years of ABS, timetable schedule and coach names, the service "typical week" plans, and the exercise list. Franchise figures come from a third-party listing (Franchise India) and must be confirmed with ABS. Replace all of them with real, consented content.

## Suggested build order

1. Scaffold Next.js + Barlow via `next/font`; port `abs-data.js` into `lib/`.
2. Layout shell: Nav, Footer, mobile action bar, scroll progress bar, tokens as CSS custom properties.
3. Home page (v5) top to bottom — hero and Passport tap card first, they carry the pitch.
4. Club detail with `generateStaticParams`; then Locations; then Trainers & Programs (+ BMI).
4b. About, Franchise, Contact (highest business value), then Services, Timetable, Careers, Events, Exercises.
5. Lead form route handler + CRM/notification wiring.
6. Swap in real photography and real per-club data.
7. Motion pass (Web Animations API as authored, or Framer Motion), then the reduced-motion audit.
8. Lighthouse and axe pass; deploy to Vercel.

## Files

```
README.md                        this file — inner pages, data, shared behaviour
HOME-V5.md                       current home page spec (build this for /)
TECH-STACK.md                    recommended stack and build sequence
screenshots/                     26 captures of Home, Locations, Trainers, Club (newer pages: open the HTML)
design/
  ABS-Home v5.dc.html            CURRENT home page
  ABS-Home v4.dc.html            previous home page (reference)
  ABS-Locations.dc.html          all locations
  ABS-Trainers-Programs.dc.html  coaches + programs + challenge enrolment
  ABS-Club.dc.html               club detail template
  ABS-About.dc.html              about, founder story, reviews, gallery
  ABS-Service.dc.html            service detail template (7 services)
  ABS-Timetable.dc.html          weekly class timetable
  ABS-Events.dc.html             events + registration modal
  ABS-Exercises.dc.html          exercise gallery
  ABS-Franchise.dc.html          franchise page + enquiry form
  ABS-Careers.dc.html            careers + application form
  ABS-Contact.dc.html            contact form + full FAQ
  Nav.dc.html                    shared nav
  Footer.dc.html                 shared footer
  abs-data.js                    data + helpers — REUSE THIS
  support.js                     design-tool runtime — DO NOT PORT
  image-slot.js                  design-tool image placeholder — DO NOT PORT
  assets/abs-logo.png            logo on black (v4 pages)
  assets/abs-logo-white.png      transparent white logo (v5) — use this everywhere
  assets/abhimanyu-sable.jpg     real founder portrait (client-supplied)
```

Open any `.dc.html` file directly in a browser to see the design running.
