# Home page v5 — spec

`design/ABS-Home v5.dc.html` is the **current home page** and supersedes `ABS-Home v4.dc.html` for route `/`. It is high fidelity: build it pixel-for-pixel.

It uses a **different visual language** from the eleven inner pages (which follow the v4 system in `README.md`: Barlow/Barlow Condensed, square corners, corner ticks). The two systems share only the colour palette. Get the client to decide which system the whole site uses **before** building inner pages. If v5 wins, restyle the inner pages with the tokens below and keep their layouts and behaviour from `README.md`.

The files are HTML design references. Recreate them in the target stack (see `TECH-STACK.md`). Do not port `support.js` or the `<x-dc>` / `{{ }}` / `<sc-for>` / `<sc-if>` template syntax.

---

## Tokens (v5)

### Colour
| Token | Hex | Use |
|---|---|---|
| Ink | `#0d0e0d` | Page background, dark sections, text on volt |
| Ink raised | `#151716` | Form panel, Passport stage |
| Ink select | `#1b1d1c` | `<select>` background (native dropdowns cannot be translucent) |
| Paper | `#f2f2f3` | Light sections, body text on dark, testimonial cards |
| White | `#ffffff` | Headings on dark, Testimonials section background |
| Paper ink | `#1d1f20` | Text on light sections, card base behind images |
| Volt | `#b8e600` | Primary CTA, accents, eyebrows on dark |
| Volt hover | `#cdf23c` | Hover of volt buttons and all links |
| Volt dark | `#6d8a00` | Eyebrows and stars on light grounds |
| Error | `#ff9b8a` | Validation text and field borders |

Alphas used as authored. On dark, text: `rgba(242,242,243,.86)` lead, `.82` nav/footer links, `.78`–`.72` body, `.7`–`.6` secondary, `.45` faint. On light, text: `rgba(29,31,32,.74)` body, `.62`–`.6` secondary. Hairlines: `rgba(255,255,255,.1)`–`.16` on dark, `rgba(29,31,32,.1)`–`.14` on light.

**Glass surfaces** (hero pill, hero stat card, nav, program tags, challenge phase panel):
`background: rgba(255,255,255,.08–.14); border: 1px solid rgba(255,255,255,.16–.22); backdrop-filter: blur(12–22px) saturate(140%)`. Provide a solid fallback (`rgba(13,14,13,.8)`) where `backdrop-filter` is unsupported.

### Typography
Google Fonts: **Plus Jakarta Sans** 400/500/600/700/800 and **Cormorant Garamond** italic 500/600. Self-host with `next/font/google`.

- Plus Jakarta Sans for everything. Headings are sentence case (never uppercase) with tight negative tracking.
- Cormorant Garamond italic 500 is the **accent word** inside headings, always `font-size: 1.1em; letter-spacing: -.01em`, sometimes volt. It also sets the founder pull-quote and the decorative quote mark on testimonial cards. Do not use it for body text.

| Role | Size / line-height / weight / tracking |
|---|---|
| Hero h1 | `clamp(46px,7.4vw,112px)` / `.98` / 800 / `-.035em` |
| Join h2 | `clamp(44px,6.4vw,96px)` / `.98` / 800 / `-.04em` |
| Feature h2 (Passport, Challenge) | `clamp(38px,5.4vw,76px)` / `1` / 700 / `-.035em` |
| Section h2 (Programs, Members) | `clamp(34px,4.6vw,60px)` / `1.04` / 700 / `-.03em` |
| Founder quote | Cormorant italic 500, `clamp(44px,5.6vw,80px)` / `1` |
| Stat numeral | `clamp(40px,4.6vw,60px)` / `1` / 700 / `-.04em` |
| Card h3 | `24px` / `1.15` / 700 / `-.02em` |
| Lead | `clamp(16px,1.4vw,19px)` / `1.6` / 500 |
| Body | `17px` / `1.6`–`1.65` (sections), `14.5px` / `1.55` (cards) |
| Eyebrow | `13px` / 600, sentence case, no tracking |
| Button | `14px`–`15px` / 700 |
| Nav link | `14px` / 500 |
| Micro label (card) | `9px`–`12px` / 600 / `.08em`–`.14em` / uppercase — only on the Passport card and the "ABS today" label |

`p { text-wrap: pretty }`.

### Layout, radius, shadow
- Content column `max-width: 1320px`, gutter `clamp(16px,4vw,44px)`.
- Section padding `clamp(72px,9vw,128px)` vertical.
- Two-column sections use `grid-template-columns: repeat(auto-fit, minmax(min(100%, 400–420px), 1fr))`, gap `clamp(40px,5vw,80px)`.
- **Radius:** pills `999px` (all buttons, chips, nav, inputs' submit); program cards and testimonial cards `22–24px`; large panels (hero stat card, phase panel, form, Passport stage, founder photo) `26–28px`; form inputs `14px`; Passport card `20px`; tap reader `22px`.
- **Shadows:** nav `0 20px 50px rgba(0,0,0,.18)`; glass cards `0 30px 60px rgba(0,0,0,.25)`; program card hover `0 30px 60px rgba(13,14,13,.22)`; founder name badge `0 24px 50px rgba(13,14,13,.14)`; testimonial caption pill `0 14px 34px rgba(13,14,13,.12)`; Passport card `0 40px 70px rgba(0,0,0,.55)` + `inset 0 0 0 1px rgba(255,255,255,.10)`.

### Motion
Easing `cubic-bezier(.22,1,.36,1)` everywhere unless noted.
| Element | Behaviour |
|---|---|
| Hero entrance | each `[data-hero]` element: opacity 0→1, `translateY(28px)`→0, 900ms, delay `150 + i×110ms` |
| Hero scroll | as `p = min(1, scrollY/innerHeight)`: content `opacity 1 − 1.1p`, `translateY(−40p px)`; background `scale(1 + .06p)` |
| Live dot | box-shadow ring `0 0 0 0 rgba(184,230,0,.6)` → `0 0 0 7px rgba(184,230,0,0)`, 1600ms, infinite |
| Club rail marquee | list duplicated, `translateX(0 → −50%)`, 36000ms linear infinite; edges masked `linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)` |
| Scroll reveal | opacity 0→1, `translateY(26px)`→0, 800ms, stagger `(i % 4) × 80ms`; IntersectionObserver `threshold .05`, `rootMargin 0 0 −8% 0`; skip elements already within 94% of viewport on load |
| Program card hover | `translateY(−6px)` + shadow, 450ms ease-out |
| Primary CTA hover | background → `#cdf23c`, `translateY(−2px)`, 300ms |
| Nav background | `rgba(20,22,21,.28)` at top → `rgba(13,14,13,.72)` once `scrollY > 40` or menu open, 400ms |
| Passport city change | city caption: opacity 0→1, `translateY(8px)`→0, 450ms |
| Passport tap loop | see Passport section |

Gate all of it on `prefers-reduced-motion: reduce` (and on the design's `motion` prop, which a dev can drop). When reduced: no hero entrance, no scroll parallax, no marquee, no reveal, no pulse, **Passport card stays still in the "tapped" pose** with the reader showing the first club.

---

## Sections (top to bottom)

### Nav (fixed, floating pill)
`position: fixed; top: 0; padding: 16px clamp(12px,3vw,32px)`. Inner pill: `max-width 1320px`, `padding 8px 8px 8px 22px`, radius `999px`, glass (see Motion for background states), `blur(18px) saturate(140%)`.
- Left: `assets/abs-logo-white.png`, `height 30px` (transparent PNG — no blend mode needed).
- Centre (≥1060px): About, Locations, Programs, Timetable, Franchise, Contact. Gap `30px`.
- Right: volt pill "Book a free tour" `12px 20px` → `#join`. Below 1060px also a `44×44` round menu button (☰ / ✕, `aria-expanded`).
- Mobile panel: `margin-top 8px`, radius `24px`, `rgba(13,14,13,.92)` + blur; links `20px/600`, `14px 12px` padding; phone `+91 97632 15051` in volt below a hairline.

### Hero
`min-height: max(640px, 100svh)`, content bottom-aligned. Full-bleed photo with two scrims:
`linear-gradient(180deg, rgba(13,14,13,.55) 0%, rgba(13,14,13,0) 26%, rgba(13,14,13,.35) 55%, rgba(13,14,13,.94) 100%)` and `linear-gradient(90deg, rgba(13,14,13,.7) 0%, rgba(13,14,13,0) 65%)`.
Content padding `140px gutter clamp(40px,6vw,72px)`.
- Glass pill: inner dark chip with pulsing `7px` dot + live status (`Open now` etc. from `status()`), then "1,00,000+ members since 2005".
- H1 (two lines): "Your body can achieve it." / "Your mind must *believe it.*" — accent in Cormorant italic, volt.
- Lead (max `52ch`): "35+ clubs across Maharashtra. Over a lakh members. Twenty years of Abhimanyu Sable's ABS. One membership card opens every single club."
- CTAs: volt pill "Book a free club tour" `18px 20px 18px 28px` with a `30px` ink circle holding a volt "→"; text link "Find your nearest club" with a `1px rgba(255,255,255,.4)` underline (hover volt) → `/locations`.
- Right (≥900px): glass card `280px` wide, radius `26px`, label "ABS today", three rows `35+ Clubs`, `6 Cities`, `20 Years of ABS` (numeral `34px/700`).

### Club rail (toggleable, default on)
Paper ground, `26px` vertical padding. ≥900px: left label "One card opens every club" (`13px/600`, `16ch`). Marquee of every club: name `20px/700` + city `12px` at `.5` alpha, `0 26px` spacing.

### Programs (`#programs`, paper)
Eyebrow "What we coach" (volt dark), h2 "Programs built around one goal at a time" (`16ch`), right-aligned link "All programs →".
Grid columns by width: ≥1100 four, ≥620 two, else one. Gap `clamp(14px,1.6vw,20px)`.
Card: `aspect-ratio 3/4; min-height 380px`, radius `24px`, photo, scrim `linear-gradient(180deg, rgba(13,14,13,0) 30%, rgba(13,14,13,.88) 100%)`, glass tag top-left, title + description bottom `24px` padding.
| Title | Tag | Copy | Link |
|---|---|---|---|
| Personal Training | 1:1 coaching | One coach, one plan, measured every fortnight. | `/services/personal-training` |
| Strength Training | Free weights | Racks, platforms and progressive programming from beginner to competition lifter. | `/services/strength` |
| Group Classes | Morning & evening | HIIT, spin, Zumba and functional circuits at every club. | `/services/group-classes` |
| 90-Day Challenge | Coached block | One goal, 90 days. Body composition tracked, nutrition included. | `/services/90-day` |

### Passport (`#passport`, ink) — the tap card
Two columns.

**Left:** eyebrow "The ABS Passport" (volt), h2 "One card. *Every* club.", body "One membership, every ABS club. No transfer fees, no guest passes, no paperwork. Work in Kharadi and live in Baner? Train at both." Six city pills (`11px 18px`, `14px/600`): active = volt fill + ink text; inactive = transparent, `1px rgba(255,255,255,.22)` border. Link "See every club in {city} →" → `/locations?city={city}`.

Cities in order: Pune, Mumbai, Nashik, Kolhapur, Ahilyanagar, Ch. Sambhaji Nagar (label shortened; full name in the query string). Club counts come from `clubsInCity()`.

**Right — stage:** panel radius `28px`, `#151716` with `radial-gradient(120% 90% at 80% 100%, rgba(184,230,0,.10), transparent 60%)`, `1px rgba(255,255,255,.06)` border, padding `clamp(28px,4vw,48px) clamp(12px,2vw,24px) clamp(20px,3vw,32px)`.

*Card* (`max-width 460px`, centred, `aspect-ratio 1.586` = ISO ID-1 card, radius `20px`):
- Base `linear-gradient(135deg, #262928 0%, #141615 55%, #0d0e0d 100%)`, fine diagonal texture `repeating-linear-gradient(115deg, rgba(255,255,255,.025) 0 1px, transparent 1px 7px)`.
- Volt ring: circle `75%` of card width, `border: clamp(18px,3vw,30px) solid #b8e600`, positioned `right −18%; top −40%` and clipped by the card.
- Padding `clamp(16px,3.2vw,26px)`. Top: white logo `clamp(22px,3.4vw,30px)` high. Then an EMV chip (`clamp(34px,5vw,44px)` wide, aspect `1.3`, radius `7px`, `linear-gradient(135deg,#e9e2c6,#b9ad85 45%,#e6ddbd 70%,#a89c74)`) beside a contactless glyph (three arcs, 22px, stroke 2, `#f2f2f3`).
- Bottom: "Passport" (`clamp(22px,3.8vw,32px)/800/-.03em`), "Valid at every ABS club" (volt, `clamp(10px,1.4vw,12px)/600`), then a row: **Member** label + holder name (uppercase, `.06em`, ellipsis) on the left, **No.** label + `ABS 0035 2026` (monospace) on the right.
- Holder name = the join form's name field, live; placeholder "Your name". The card number is a placeholder — confirm the real membership number format with ABS.

*Tap reader* (below, `max-width 340px`, overlapped by the card by `clamp(18px,3vw,28px)`, `#0d0e0d`, radius `22px`, top padding `clamp(36px,5vw,48px)`): `52px` round indicator with a check icon, then "Access granted" (volt `12px/600`), "ABS {club}" (`17px/700`, ellipsis), "{city} · Tap in, train" (`12.5px`).

*Tap loop:* a 1500ms tick alternates two poses (pause while `document.hidden`):
| | Card transform | Indicator ring / glow |
|---|---|---|
| Lifted | `perspective(1200px) rotateX(10deg) rotate(-7deg) translateY(-14px)` | `rgba(242,242,243,.35)` / none |
| Tapped | `perspective(1200px) rotateX(18deg) rotate(-4deg) translateY(10px)` | `#b8e600` / `0 0 0 6px rgba(184,230,0,.18)` |
Card transition `transform 700ms`, ring `300ms`. Each tapped pose advances to the next club in the selected city (`floor(tick/2) % clubs.length`), so the reader cycles "ABS Magarpatta City", "ABS EON 2 Kharadi", …

Under the stage: "{city} · {n} clubs" (`14px/700`) followed by up to 6 club chips (`1px rgba(255,255,255,.18)`, hover border volt) linking to `/clubs/{slug}`, then "+N more".

Accessibility: the card and reader are decorative. Mark the stage `aria-hidden="true"` except the chip list, and put the current city/club count in the visible caption (already there). Do not announce the tap loop.

### Founder (`#founder`, paper)
Portrait `assets/abhimanyu-sable.jpg`, `4/5`, radius `28px`, `object-position 50% 20%`, max `520px`. White badge overlapping bottom-right (`right −12px; bottom 28px`, radius `18px`): "Abhimanyu Sable" / "Founder, MD & CEO".
Right: eyebrow "Since club one · Pune, 29 August 2005"; Cormorant quote "“It's not a gym. It's life.”"; paragraph (`50ch`): "Abhimanyu Sable has spent forty years in fitness and twenty building ABS. He opened the first club in Pune in 2005. Today there are more than thirty-five across six cities, all run on one membership and one idea." Credentials as a ruled 2-col list: First Indian certified by ACSM · Founder President, UHFF · Member, IHRSA · ACE Fitness Professional of the Year nominee, 2003. Link "Read the founder story →" → `/about#founder`.

### 90-Day Challenge (`#challenge`, ink over photo)
Photo at `opacity .5`, scrim `linear-gradient(90deg, rgba(13,14,13,.96) 0%, rgba(13,14,13,.82) 50%, rgba(13,14,13,.5) 100%)`.
Left: eyebrow "The 90-Day Challenge", h2 "90 days. One goal. *Real results.*" (accent volt), body "A coached 90-day block with a dedicated coach, a nutrition plan and fortnightly measurements. All group classes and Passport access are included." White pill "Enrol for the next batch" (hover volt) → `#join`, and "Next batch starts **{date}**" where date = first Monday of next month (IST), `en-IN` long format.
Right: glass panel, radius `26px`, four rows (`84px` label column): Day 0 Assessment · 1–30 Foundation · 31–60 Build · 61–90 Finish, with the descriptions in the file.
Below a hairline: four stats `35+` Clubs across Maharashtra · `1,00,000+` Members trained · `10 lakh` Sq ft of training floor · `1000+` Certified professionals.

### Members (`#reviews`, white)
Centred eyebrow "Members", h2 "People who stayed *for years*". Three cards (3 columns ≥980px, else 1; row gap `56px` to clear the overhanging captions). Card: `#f2f2f3`, radius `22px`, padding `40px 30px 60px`, large faint Cormorant "”" top-right, volt-dark stars, quote `17px/500`. Caption pill overhangs the bottom edge (`bottom −26px; left 24px`, white, shadow): `38px` ink circle with volt initials, name, club. **Testimonials are placeholders.**

### Join (`#join`, ink)
Left: h2 "Walk in once. *Stay for years.*" (accent volt), body "Book a free tour at any ABS club. A coach walks you through the floor, the programs and the plan that fits your goal. No card, no commitment.", phone link and "WhatsApp us" (`wa.me/919763215051`).
Right: form panel `#151716`, radius `28px`. Title "Book a free club tour", sub "A coach calls you once to fix a time." Fields: Full name, Mobile number (tel), Choose your club (all clubs, `ABS {name} · {cityShort}`). Inputs: `rgba(255,255,255,.04)` fill, `1px rgba(255,255,255,.12)` border (focus volt, error `#ff9b8a`), radius `14px`, `16px 18px`. Submit: full-width volt pill "Book my free tour".
Validation on submit, first failing rule shown, cleared on any keystroke:
1. name `trim().length ≥ 2` → "Please enter your full name."
2. phone `/^(\+91[\s-]?)?[6-9]\d{9}$/` (spaces/dashes stripped) → "Enter a valid 10-digit Indian mobile number."
3. club required → "Choose the club you want to tour."
Success replaces the form (min-height `320px`): "Request received", "See you on the floor, {firstName}.", "A coach from ABS {club} will call {phone} to fix a time for your tour.", ghost pill "Book another" (resets fields). POST to `/api/lead` with `source: "home-join"`. Support `?club={slug}` to preselect.

### Footer
Four auto-fit columns (`minmax(190px,1fr)`): logo (`40px`) + `#ITSNOTGYMITSLIFE`; Explore (About, Programs & coaches, Timetable, Events, Careers); Cities (six, → `/locations?city=`); Get in touch (phone `20px/700`, email, "Own an ABS club →"). Bottom bar: "© 2026 ABS Fitness & Wellness Club" and the city list.

### Mobile action bar (<780px)
Fixed `12px` from the edges, glass pill with `6px` padding: "Call" (`flex 1`) and volt "Book a free tour" (`flex 2`). Add an `84px` spacer below the footer.

---

## State
| State | Notes |
|---|---|
| `w` | viewport width → `wide ≥900`, `wideNav ≥1060`, `narrow <780`, program/review column counts |
| `now` | ticks every 30s → live status, batch date |
| `scrolled` | `scrollY > 40` → nav background |
| `menu` | mobile menu open |
| `city` | Passport city index 0–5 |
| `tap` | Passport tick counter, +1 every 1500ms |
| `name`, `phone`, `club`, `error`, `sent` | join form (`name` also feeds the Passport card) |

Prefer CSS media/container queries for column counts; keep JS only for the tap loop and live status. Compute IST-dependent values after hydration.

## Leftover code to remove
The v5 logic class still computes `ppIssued`, `ppExpires`, `ppMrz1`, `ppMrz2` and `stamps` from an earlier passport-booklet version. None of them render. Don't port them.

## Assets
- `assets/abs-logo-white.png` — transparent white logo, used in nav, Passport card and footer.
- `assets/abhimanyu-sable.jpg` — real founder portrait.
- All other photos are Unsplash stand-ins (hero, 4 programs, challenge background). Replace with ABS photography before launch.
