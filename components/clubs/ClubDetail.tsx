'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Club, ClubDetails } from '@/lib/data';
import { sendWhatsApp } from '@/lib/whatsapp';
import { clubPhotos, validPhone, PHONE, PHONE_HREF, EMAIL } from '@/lib/data';
import { status } from '@/lib/time';
import { useReveal } from '@/lib/hooks';
import LiveStatus from '@/components/home/LiveStatus';
import SampleTag from '@/components/ui/SampleTag';

const TIME_SLOTS = [
  { value: 'Morning', label: 'Morning (6 – 10 AM)' },
  { value: 'Afternoon', label: 'Afternoon (12 – 4 PM)' },
  { value: 'Evening', label: 'Evening (5 – 9 PM)' },
];

function Eyebrow({ children, dark = true }: { children: React.ReactNode; dark?: boolean }) {
  return <div style={{ fontSize: 13, fontWeight: 600, color: dark ? '#b8e600' : '#566e00' }}>{children}</div>;
}

function StatusDot({ hours }: { hours: string }) {
  const [dot, setDot] = useState('rgba(242,242,243,.45)');
  useEffect(() => {
    // IST-dependent value — must be computed client-side only, see TECH-STACK.md "Hydration".
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDot(status(hours).dot);
  }, [hours]);
  return <i style={{ width: 6, height: 6, borderRadius: '50%', background: dot, flexShrink: 0, display: 'inline-block' }} />;
}

function Hero({ club }: { club: Club }) {
  const photos = clubPhotos(club.slug);
  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: '#0d0e0d' }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <Image src={photos[0]} alt={`ABS Fitness ${club.name}`} fill priority style={{ objectFit: 'cover' }} sizes="100vw" />
      </div>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(96deg,rgba(13,14,13,.97) 0%,rgba(13,14,13,.9) 45%,rgba(13,14,13,.6) 100%)' }} />

      <div style={{ position: 'relative', maxWidth: 1320, margin: '0 auto', padding: '140px clamp(16px,4vw,44px) clamp(48px,6vw,88px)' }}>
        <nav aria-label="Breadcrumb" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 10px', fontSize: 12.5, fontWeight: 600, color: 'rgba(242,242,243,.5)', marginBottom: 'clamp(28px,4vw,48px)' }}>
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/locations">Locations</Link>
          <span>/</span>
          <Link href={{ pathname: '/locations', query: { city: club.city } }}>{club.city}</Link>
          <span>/</span>
          <span style={{ color: '#b8e600' }}>{club.name}</span>
        </nav>

        <div style={{ display: 'grid', gap: 'clamp(30px,4vw,60px)', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,320px),1fr))', alignItems: 'start' }}>
          <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10, marginBottom: 22 }}>
              {club.tag && (
                <span style={{ background: '#b8e600', color: '#0d0e0d', fontSize: 12.5, fontWeight: 700, borderRadius: 999, padding: '7px 14px' }}>{club.tag}</span>
              )}
              <span style={{ border: '1px solid rgba(255,255,255,.22)', borderRadius: 999, padding: '7px 14px', fontSize: 12.5, fontWeight: 600, color: 'rgba(242,242,243,.85)' }}>
                Passport enabled
              </span>
              <LiveStatus hours={club.hours} full variant="outline" />
            </div>

            <h1 style={{ fontWeight: 800, fontSize: 'clamp(38px,5.4vw,76px)', lineHeight: 1, letterSpacing: '-.035em', color: '#ffffff' }}>
              ABS Fitness
              <br />
              <span style={{ color: '#b8e600' }}>{club.name}</span>
            </h1>

            <div style={{ display: 'grid', gap: '20px 34px', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', marginTop: 'clamp(30px,4vw,44px)', paddingTop: 26, borderTop: '1px solid rgba(255,255,255,.16)' }}>
              <div>
                <Eyebrow>Address</Eyebrow>
                <p style={{ margin: '8px 0 0', fontSize: 15, lineHeight: 1.55, color: 'rgba(242,242,243,.82)' }}>
                  {club.addr},<br />{club.city}, Maharashtra
                </p>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Eyebrow>Hours</Eyebrow>
                  {!club.verified && <SampleTag />}
                </div>
                <p style={{ margin: '8px 0 0', fontSize: 15, lineHeight: 1.55, color: 'rgba(242,242,243,.82)' }}>
                  Mon–Sat {club.hours}<br />Sunday {club.sunday}
                </p>
              </div>
              <div>
                <Eyebrow>Reach the club</Eyebrow>
                <a href={PHONE_HREF} style={{ marginTop: 8, fontWeight: 700, fontSize: 22, color: '#ffffff', display: 'block', letterSpacing: '-.02em' }}>{PHONE}</a>
                <a href={`mailto:${EMAIL}`} style={{ fontSize: 14, color: 'rgba(242,242,243,.7)', display: 'block', marginTop: 4 }}>{EMAIL}</a>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 'clamp(28px,3.5vw,40px)' }}>
              <Link href="#tour" style={{ background: '#b8e600', color: '#0d0e0d', fontSize: 14, fontWeight: 700, borderRadius: 999, padding: '18px 28px', transition: 'background .3s ease-out' }}>
                Book a Free Tour
              </Link>
              <a href={club.maps} target="_blank" rel="noopener" style={{ border: '1px solid rgba(255,255,255,.3)', color: '#f2f2f3', fontSize: 14, fontWeight: 700, borderRadius: 999, padding: '18px 28px' }}>
                Get Directions
              </a>
            </div>
          </div>

          <div style={{ position: 'relative', borderRadius: 28, border: '1px solid rgba(255,255,255,.16)', background: 'rgba(21,23,22,.9)', backgroundImage: 'linear-gradient(rgba(255,255,255,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.06) 1px,transparent 1px)', backgroundSize: '40px 40px', minHeight: 'clamp(300px,38vw,420px)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 18, left: 20, fontSize: 11, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: 'rgba(242,242,243,.6)' }}>
              Map — {club.addr}
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#b8e600', border: '2px solid #0d0e0d', margin: '0 auto' }} />
              <div style={{ marginTop: 12, fontWeight: 700, fontSize: 20, letterSpacing: '-.02em', color: '#ffffff' }}>ABS {club.name}</div>
              <div style={{ marginTop: 4, fontSize: 13, color: 'rgba(242,242,243,.55)' }}>{club.city}</div>
            </div>
            <a href={club.maps} target="_blank" rel="noopener" style={{ position: 'absolute', bottom: 18, right: 20, fontSize: 13, fontWeight: 700, color: '#b8e600' }}>
              Open in Google Maps →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery({ club }: { club: Club }) {
  const photos = clubPhotos(club.slug).slice(1);
  const captions = ['Main training floor', 'Free-weight area', 'Group class studio', 'Cardio deck', 'Locker room'];
  return (
    <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(210px,1fr))' }}>
      {photos.map((src, i) => (
        <div key={src} style={{ position: 'relative', gridColumn: i === 0 ? 'span 2' : undefined, aspectRatio: i === 0 ? '16/10' : '4/5', borderRadius: 20, overflow: 'hidden', background: '#e0e0e2' }}>
          <Image src={src} alt={captions[i]} fill style={{ objectFit: 'cover' }} sizes={i === 0 ? '(min-width: 620px) 60vw, 100vw' : '(min-width: 620px) 30vw, 100vw'} />
        </div>
      ))}
    </div>
  );
}

function TourForm({ club }: { club: Club }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [time, setTime] = useState<'Morning' | 'Afternoon' | 'Evening'>('Morning');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const send = () => {
    let e = '';
    if (name.trim().length < 2) e = 'Please enter your full name.';
    else if (!validPhone(phone)) e = 'Enter a valid 10-digit Indian mobile number.';
    if (e) setError(e);
    else { sendWhatsApp(`Club tour request: ABS ${club.name} (ABS website)`, { Name: name, Phone: phone, 'Preferred time': time }); setSent(true); setError(''); }
  };
  const reset = () => { setSent(false); setName(''); setPhone(''); };

  const firstName = name.trim().split(/\s+/)[0] || '';
  const nameBorder = error && name.trim().length < 2 ? '#ff9b8a' : 'rgba(255,255,255,.14)';
  const phoneBorder = error && !validPhone(phone) ? '#ff9b8a' : 'rgba(255,255,255,.14)';

  return (
    <div id="tour" style={{ padding: 'clamp(26px,3vw,40px)', borderRadius: 28, background: '#151716', border: '1px solid rgba(255,255,255,.1)', color: '#f2f2f3' }}>
      {!sent ? (
        <div>
          <Eyebrow>Membership</Eyebrow>
          <div style={{ marginTop: 16, fontWeight: 700, fontSize: 'clamp(26px,3vw,34px)', letterSpacing: '-.02em', color: '#ffffff' }}>
            Plans &amp; pricing — ask the club
          </div>
          <p style={{ margin: '14px 0 0', fontSize: 15, lineHeight: 1.6, maxWidth: '38ch', color: 'rgba(242,242,243,.72)' }}>
            Plans at ABS {club.name} include Passport access to the ABS network, group classes and a quarterly body-composition assessment. Book a tour below and a coach will walk you through pricing.
          </p>
          <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            <SampleTag />
            <span style={{ fontSize: 12.5, color: 'rgba(242,242,243,.55)' }}>Proposal: show &lsquo;from ₹___/month&rsquo; here</span>
          </div>
          <div style={{ marginTop: 26, paddingTop: 22, borderTop: '1px solid rgba(255,255,255,.14)' }}>
            <Eyebrow>Free club tour at {club.name}</Eyebrow>
          </div>
          <div style={{ display: 'grid', gap: 12, marginTop: 16 }}>
            <input
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setError(''); }}
              placeholder="Full name"
              aria-label="Full name"
              style={{ width: '100%', background: 'rgba(255,255,255,.04)', border: `1px solid ${nameBorder}`, borderRadius: 14, color: '#f2f2f3', fontFamily: 'inherit', fontSize: 15, padding: '15px 16px', outline: 0, transition: 'border-color .2s' }}
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => { setPhone(e.target.value); setError(''); }}
              placeholder="Mobile number"
              aria-label="Mobile number"
              style={{ width: '100%', background: 'rgba(255,255,255,.04)', border: `1px solid ${phoneBorder}`, borderRadius: 14, color: '#f2f2f3', fontFamily: 'inherit', fontSize: 15, padding: '15px 16px', outline: 0, transition: 'border-color .2s' }}
            />
            <select
              value={time}
              onChange={(e) => setTime(e.target.value as typeof time)}
              aria-label="Preferred time slot"
              style={{ width: '100%', background: '#1b1d1c', border: '1px solid rgba(255,255,255,.14)', borderRadius: 14, color: '#f2f2f3', fontFamily: 'inherit', fontSize: 15, padding: '15px 16px', outline: 0 }}
            >
              {TIME_SLOTS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
            {error && <div style={{ fontSize: 13, color: '#ff9b8a' }}>{error}</div>}
            <button
              type="button"
              onClick={send}
              style={{ width: '100%', background: '#b8e600', color: '#0d0e0d', border: 0, borderRadius: 999, fontFamily: 'inherit', fontSize: 14, fontWeight: 700, padding: 18, cursor: 'pointer', transition: 'background .25s' }}
            >
              Book my free tour
            </button>
          </div>
          <p style={{ margin: '14px 0 0', fontSize: 12.5, color: 'rgba(242,242,243,.6)', textAlign: 'center' }}>
            Or walk in any day, {club.hours}.
          </p>
        </div>
      ) : (
        <div style={{ minHeight: 320, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Eyebrow>Request received</Eyebrow>
          <div style={{ marginTop: 16, fontWeight: 700, fontSize: 'clamp(28px,3.4vw,40px)', lineHeight: 1.05, letterSpacing: '-.03em', color: '#ffffff' }}>
            See you at {club.name}, {firstName}.
          </div>
          <p style={{ margin: '16px 0 0', fontSize: 15, lineHeight: 1.6, color: 'rgba(242,242,243,.7)' }}>
            A coach will call {phone} to fix a {time.toLowerCase()} slot for your tour.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{ alignSelf: 'flex-start', marginTop: 24, background: 'transparent', border: '1px solid rgba(255,255,255,.25)', borderRadius: 999, color: '#f2f2f3', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, padding: '12px 20px', cursor: 'pointer' }}
          >
            Book another
          </button>
        </div>
      )}
    </div>
  );
}

function TrainerCard({ t, index }: { t: ClubDetails['trainers'][number]; index: number }) {
  const ref = useReveal<HTMLAnchorElement>(index);
  return (
    <Link
      ref={ref}
      href="/trainers-programs#roster"
      style={{ position: 'relative', display: 'block', aspectRatio: '4/5', borderRadius: 22, overflow: 'hidden', background: '#151716' }}
    >
      <Image src={t.photo} alt={t.name} fill style={{ objectFit: 'cover' }} sizes="(min-width: 900px) 24vw, (min-width: 600px) 48vw, 100vw" />
      <div style={{ position: 'absolute', inset: 'auto 0 0 0', height: '55%', pointerEvents: 'none', background: 'linear-gradient(0deg,rgba(13,14,13,.92),rgba(13,14,13,0))' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '18px 18px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ fontWeight: 700, fontSize: 21, letterSpacing: '-.02em', color: '#ffffff' }}>{t.name}</div>
          {t.sample && <SampleTag />}
        </div>
        <div style={{ marginTop: 6, fontSize: 12.5, fontWeight: 600, color: '#b8e600' }}>{t.role}</div>
        <div style={{ marginTop: 6, fontSize: 13.5, color: 'rgba(242,242,243,.7)' }}>{t.spec}</div>
      </div>
    </Link>
  );
}

function Trainers({ trainers }: { trainers: ClubDetails['trainers'] }) {
  const headerRef = useReveal<HTMLDivElement>(0);
  return (
    <section style={{ background: '#0d0e0d' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: 'clamp(72px,9vw,128px) clamp(16px,4vw,44px)' }}>
        <div ref={headerRef} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 18, marginBottom: 'clamp(32px,4vw,48px)' }}>
          <div>
            <Eyebrow>Coaching team</Eyebrow>
            <h2 style={{ marginTop: 14, fontWeight: 700, fontSize: 'clamp(30px,4.4vw,56px)', lineHeight: 1.04, letterSpacing: '-.03em', color: '#ffffff' }}>
              Trainers at this club
            </h2>
          </div>
          <Link href="/trainers-programs#roster" style={{ fontSize: 15, fontWeight: 600, color: '#f2f2f3', borderBottom: '2px solid #b8e600', paddingBottom: 5 }}>
            Full roster →
          </Link>
        </div>
        <div style={{ display: 'grid', gap: 'clamp(14px,1.8vw,22px)', gridTemplateColumns: 'repeat(auto-fit, minmax(210px,1fr))' }}>
          {trainers.map((t, i) => (
            <TrainerCard key={t.id} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Timetable({ timetable, rating, reviewCount, reviews }: Pick<ClubDetails, 'timetable' | 'rating' | 'reviewCount' | 'reviews'>) {
  const tableRef = useReveal<HTMLDivElement>(0);
  return (
    <section style={{ background: '#f2f2f3', color: '#1d1f20' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: 'clamp(72px,9vw,128px) clamp(16px,4vw,44px)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 18, marginBottom: 'clamp(28px,3vw,40px)' }}>
          <div>
            <Eyebrow dark={false}>This week</Eyebrow>
            <h2 style={{ marginTop: 14, fontWeight: 700, fontSize: 'clamp(30px,4.4vw,56px)', lineHeight: 1.04, letterSpacing: '-.03em' }}>
              Class timetable
            </h2>
          </div>
          <p style={{ margin: 0, fontSize: 14, color: 'rgba(29,31,32,.72)', maxWidth: '34ch' }}>
            Group classes are included in every membership. Drop in — no booking needed.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <SampleTag />
          <span style={{ fontSize: 12.5, color: 'rgba(29,31,32,.72)' }}>Sample timetable</span>
        </div>
        <div ref={tableRef} style={{ overflowX: 'auto', borderRadius: 22, border: '1px solid rgba(29,31,32,.14)' }}>
          <table style={{ width: '100%', minWidth: 640, borderCollapse: 'collapse', fontSize: 14.5 }}>
            <thead>
              <tr style={{ background: '#0d0e0d', color: '#f2f2f3' }}>
                <th style={{ textAlign: 'left', padding: '14px 18px', fontSize: 12, fontWeight: 600, color: '#b8e600' }}>Time</th>
                <th style={{ textAlign: 'left', padding: '14px 18px', fontSize: 12, fontWeight: 600, color: '#b8e600' }}>Class</th>
                <th style={{ textAlign: 'left', padding: '14px 18px', fontSize: 12, fontWeight: 600, color: '#b8e600' }}>Coach</th>
                <th style={{ textAlign: 'left', padding: '14px 18px', fontSize: 12, fontWeight: 600, color: '#b8e600' }}>Days</th>
              </tr>
            </thead>
            <tbody>
              {timetable.map((r) => (
                <tr key={r.time + r.cls} style={{ borderTop: '1px solid rgba(29,31,32,.12)' }}>
                  <td style={{ padding: '15px 18px', fontWeight: 700, fontSize: 17, letterSpacing: '-.01em', whiteSpace: 'nowrap' }}>{r.time}</td>
                  <td style={{ padding: '15px 18px', fontWeight: 600 }}>{r.cls}</td>
                  <td style={{ padding: '15px 18px', color: 'rgba(29,31,32,.7)' }}>{r.coach}</td>
                  <td style={{ padding: '15px 18px', color: 'rgba(29,31,32,.7)', whiteSpace: 'nowrap' }}>{r.days}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: 14, margin: 'clamp(56px,7vw,88px) 0 20px' }}>
          <h2 style={{ fontWeight: 700, fontSize: 'clamp(30px,4.4vw,56px)', lineHeight: 1.04, letterSpacing: '-.03em' }}>Member reviews</h2>
          {rating && <span style={{ fontSize: 14, color: 'rgba(29,31,32,.72)' }}>★ {rating} · {reviewCount} Google reviews</span>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 'clamp(28px,3vw,40px)' }}>
          <SampleTag />
          <span style={{ fontSize: 12.5, color: 'rgba(29,31,32,.72)' }}>Sample reviews — to be replaced with real ABS member reviews</span>
        </div>
        <div style={{ display: 'grid', gap: 'clamp(14px,1.8vw,24px)', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))' }}>
          {reviews.map((q, i) => (
            <ReviewCard key={q.name} q={q} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ q, index }: { q: ClubDetails['reviews'][number]; index: number }) {
  const ref = useReveal<HTMLElement>(index);
  return (
    <figure ref={ref} style={{ margin: 0, borderRadius: 22, background: '#ffffff', padding: 'clamp(22px,2.4vw,30px)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 13, letterSpacing: 2, color: '#566e00' }}>★★★★★</div>
      <blockquote style={{ margin: '16px 0 0', fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic', fontWeight: 500, fontSize: 'clamp(19px,2vw,23px)', lineHeight: 1.3 }}>
        &ldquo;{q.quote}&rdquo;
      </blockquote>
      <figcaption style={{ marginTop: 'auto', paddingTop: 22, fontSize: 14 }}>
        <span style={{ fontWeight: 700 }}>{q.name}</span>
        <span style={{ display: 'block', marginTop: 3, color: 'rgba(29,31,32,.72)', fontSize: 13 }}>{q.meta}</span>
      </figcaption>
    </figure>
  );
}

function Nearby({ club, nearby }: { club: Club; nearby: Club[] }) {
  const ref = useReveal<HTMLDivElement>(0);
  if (nearby.length === 0) return null;
  return (
    <section style={{ background: '#0d0e0d' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: 'clamp(72px,9vw,128px) clamp(16px,4vw,44px)' }}>
        <div ref={ref} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 18, marginBottom: 'clamp(28px,3vw,40px)' }}>
          <div>
            <Eyebrow>Also in {club.city}</Eyebrow>
            <h2 style={{ marginTop: 14, fontWeight: 700, fontSize: 'clamp(30px,4.4vw,56px)', lineHeight: 1.04, letterSpacing: '-.03em', color: '#ffffff' }}>
              Your card works here too
            </h2>
          </div>
          <Link href={{ pathname: '/locations', query: { city: club.city } }} style={{ fontSize: 15, fontWeight: 600, color: '#f2f2f3', borderBottom: '2px solid #b8e600', paddingBottom: 5 }}>
            All {club.city} clubs →
          </Link>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {nearby.map((n) => (
            <Link
              key={n.slug}
              href={`/clubs/${n.slug}`}
              style={{ display: 'flex', alignItems: 'center', gap: 10, border: '1px solid rgba(255,255,255,.18)', borderRadius: 999, padding: '12px 18px', color: '#f2f2f3', fontSize: 14.5, fontWeight: 600 }}
            >
              <StatusDot hours={n.hours} />
              {n.name}
              <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(242,242,243,.5)' }}>{n.hours}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ClubDetail({ club, details, nearby }: { club: Club; details: ClubDetails; nearby: Club[] }) {
  const passportRef = useReveal<HTMLDivElement>(0);
  return (
    <>
      <Hero club={club} />

      <section style={{ background: '#f2f2f3', color: '#1d1f20' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: 'clamp(72px,9vw,128px) clamp(16px,4vw,44px) 0' }}>
          <Eyebrow dark={false}>Inside the club</Eyebrow>
          <div style={{ marginTop: 16 }}>
            <Gallery club={club} />
          </div>
        </div>

        <div style={{ maxWidth: 1320, margin: '0 auto', padding: 'clamp(56px,7vw,96px) clamp(16px,4vw,44px)', display: 'grid', gap: 'clamp(34px,4vw,64px)', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,400px),1fr))' }}>
          <div>
            <Eyebrow dark={false}>Amenities</Eyebrow>
            <h2 style={{ marginTop: 14, fontWeight: 700, fontSize: 'clamp(30px,4vw,50px)', lineHeight: 1.02, letterSpacing: '-.03em', maxWidth: '16ch' }}>
              Everything you need on one floor
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px,1fr))', marginTop: 28, borderTop: '1px solid rgba(29,31,32,.14)' }}>
              {details.amenities.map((a) => (
                <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '13px 12px 13px 0', borderBottom: '1px solid rgba(29,31,32,.1)', fontSize: 14.5 }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#b8e600', flexShrink: 0 }} />
                  {a}
                </div>
              ))}
            </div>
          </div>
          <TourForm club={club} />
        </div>
      </section>

      <Trainers trainers={details.trainers} />

      <Timetable timetable={details.timetable} rating={details.rating} reviewCount={details.reviewCount} reviews={details.reviews} />

      <Nearby club={club} nearby={nearby} />

      <section style={{ background: '#b8e600', color: '#0d0e0d' }}>
        <div ref={passportRef} style={{ maxWidth: 1320, margin: '0 auto', padding: 'clamp(48px,6vw,84px) clamp(16px,4vw,44px)', display: 'flex', flexWrap: 'wrap', gap: 28, alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>ABS Passport Program</div>
            <h2 style={{ marginTop: 14, fontWeight: 700, fontSize: 'clamp(30px,4.4vw,52px)', lineHeight: 1.02, letterSpacing: '-.03em', maxWidth: '20ch' }}>
              Traveling? Use this club as a guest with your membership card.
            </h2>
            <p style={{ marginTop: 16, fontSize: 16, lineHeight: 1.6, maxWidth: '52ch', color: 'rgba(13,14,13,.78)' }}>
              Already an ABS member elsewhere? Ask your home club to book your visit here in advance, then show your card at the {club.name} front desk.
            </p>
          </div>
          <Link href="/#passport" style={{ background: '#0d0e0d', color: '#b8e600', fontSize: 14, fontWeight: 700, borderRadius: 999, padding: '18px 30px', flexShrink: 0 }}>
            How the Passport works →
          </Link>
        </div>
      </section>
    </>
  );
}
