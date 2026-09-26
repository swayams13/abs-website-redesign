'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Service } from '@/lib/data';
import { SERVICES, validPhone } from '@/lib/data';
import { useReveal } from '@/lib/hooks';

function Eyebrow({ children, dark = true }: { children: React.ReactNode; dark?: boolean }) {
  return <div style={{ fontSize: 13, fontWeight: 600, color: dark ? '#b8e600' : '#6d8a00' }}>{children}</div>;
}

function TabStrip({ activeSlug }: { activeSlug: string }) {
  return (
    <div style={{ background: '#0d0e0d', borderBottom: '1px solid rgba(255,255,255,.14)', overflowX: 'auto', paddingTop: 140 }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 clamp(16px,4vw,44px)', display: 'flex', gap: 'clamp(16px,2.4vw,32px)' }}>
        {SERVICES.map((s) => {
          const active = s.slug === activeSlug;
          return (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              style={{ flexShrink: 0, borderBottom: `2px solid ${active ? '#b8e600' : 'transparent'}`, color: active ? '#ffffff' : 'rgba(242,242,243,.55)', fontSize: 12, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', padding: '18px 0', whiteSpace: 'nowrap' }}
            >
              {s.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function Hero({ service, index, total }: { service: Service; index: number; total: number }) {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: '#0d0e0d', display: 'flex', alignItems: 'flex-end', minHeight: 'clamp(420px,58svh,620px)' }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <Image src={service.src} alt={service.name} fill priority style={{ objectFit: 'cover' }} sizes="100vw" />
      </div>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(96deg,rgba(13,14,13,.97) 0%,rgba(13,14,13,.88) 48%,rgba(13,14,13,.4) 100%)' }} />
      <div style={{ position: 'relative', maxWidth: 1320, margin: '0 auto', width: '100%', padding: 'clamp(56px,8vw,100px) clamp(16px,4vw,44px) clamp(40px,5vw,60px)' }}>
        <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: '#b8e600' }}>
          Service {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </div>
        <h1 style={{ marginTop: 18, fontWeight: 800, fontSize: 'clamp(40px,6.6vw,92px)', lineHeight: 0.94, letterSpacing: '-.03em', color: '#ffffff', maxWidth: '14ch' }}>
          {service.name}
        </h1>
        <p style={{ marginTop: 22, fontSize: 'clamp(16px,1.5vw,19px)', lineHeight: 1.55, maxWidth: '50ch', color: 'rgba(242,242,243,.84)' }}>
          {service.lede}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 0, marginTop: 34, borderTop: '1px solid rgba(255,255,255,.2)' }}>
          {service.facts.map(([l, v]) => (
            <div key={l} style={{ padding: '18px 36px 0 0' }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(242,242,243,.55)' }}>{l}</div>
              <div style={{ marginTop: 6, fontWeight: 700, fontSize: 22, color: '#ffffff' }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Detail({ service }: { service: Service }) {
  const ref = useReveal<HTMLDivElement>(0);
  return (
    <section style={{ background: '#f2f2f3', color: '#1d1f20' }}>
      <div ref={ref} style={{ maxWidth: 1320, margin: '0 auto', padding: 'clamp(56px,8vw,112px) clamp(16px,4vw,44px)', display: 'grid', gap: 'clamp(36px,5vw,80px)', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,360px),1fr))', alignItems: 'start' }}>
        <div>
          <Eyebrow dark={false}>Who it&rsquo;s for</Eyebrow>
          <div style={{ marginTop: 18, display: 'grid', borderTop: '1px solid rgba(29,31,32,.18)' }}>
            {service.for.map((w) => (
              <div key={w} style={{ display: 'flex', gap: 14, alignItems: 'baseline', padding: '16px 0', borderBottom: '1px solid rgba(29,31,32,.14)', fontSize: 16, lineHeight: 1.5 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#b8e600', flexShrink: 0 }} />
                {w}
              </div>
            ))}
          </div>

          <div style={{ marginTop: 40, fontSize: 11.5, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#4d5a00' }}>What&rsquo;s included</div>
          <div style={{ marginTop: 18, display: 'grid', gap: 10, gridTemplateColumns: 'repeat(auto-fit, minmax(190px,1fr))' }}>
            {service.inc.map((i) => (
              <div key={i} style={{ border: '1px solid rgba(29,31,32,.2)', borderRadius: 14, padding: '16px 18px', fontWeight: 700, fontSize: 16, lineHeight: 1.15, color: '#0d0e0d' }}>
                {i}
              </div>
            ))}
          </div>
        </div>

        <div>
          <Eyebrow dark={false}>A typical week</Eyebrow>
          <div style={{ marginTop: 18, borderTop: '1px solid rgba(29,31,32,.18)' }}>
            {service.week.map(([d, t]) => (
              <div key={d + t} style={{ display: 'grid', gridTemplateColumns: '70px 1fr', gap: 14, padding: '16px 0', borderBottom: '1px solid rgba(29,31,32,.14)' }}>
                <span style={{ fontWeight: 700, fontSize: 13, letterSpacing: '.08em', textTransform: 'uppercase', color: '#4d5a00' }}>{d}</span>
                <span style={{ fontSize: 15.5, lineHeight: 1.5, color: '#1d1f20' }}>{t}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 28, display: 'flex', flexWrap: 'wrap', gap: '14px 30px' }}>
            <Link href="/trainers-programs#roster" style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#1d1f20', borderBottom: '2px solid #b8e600', paddingBottom: 5 }}>
              Meet the coaches →
            </Link>
            <Link href="/timetable" style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#1d1f20', borderBottom: '2px solid #b8e600', paddingBottom: 5 }}>
              Class timetable →
            </Link>
            <Link href="/exercises" style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#1d1f20', borderBottom: '2px solid #b8e600', paddingBottom: 5 }}>
              Exercise library →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Enquiry({ service, prev, next }: { service: Service; prev: Service; next: Service }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const leftRef = useReveal<HTMLDivElement>(0);
  const panelRef = useReveal<HTMLDivElement>(1);

  const send = () => {
    let e = '';
    if (name.trim().length < 2) e = 'Please enter your full name.';
    else if (!validPhone(phone)) e = 'Enter a valid 10-digit Indian mobile number.';
    if (e) setError(e);
    else { setSent(true); setError(''); }
  };
  const reset = () => { setSent(false); setName(''); setPhone(''); };

  const firstName = name.trim().split(/\s+/)[0] || '';
  const nameBorder = error && name.trim().length < 2 ? '#ff9b8a' : 'rgba(255,255,255,.14)';
  const phoneBorder = error && !validPhone(phone) ? '#ff9b8a' : 'rgba(255,255,255,.14)';

  return (
    <section id="trial" style={{ background: '#0d0e0d' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: 'clamp(56px,8vw,104px) clamp(16px,4vw,44px)', display: 'grid', gap: 'clamp(30px,4vw,64px)', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,340px),1fr))', alignItems: 'center' }}>
        <div ref={leftRef}>
          <h2 style={{ fontWeight: 800, fontSize: 'clamp(36px,5.2vw,72px)', lineHeight: 0.98, letterSpacing: '-.03em', color: '#ffffff' }}>
            Start {service.short}
            <br />
            <span style={{ color: '#b8e600' }}>this week.</span>
          </h2>
          <p style={{ marginTop: 20, fontSize: 16, lineHeight: 1.6, maxWidth: '44ch', color: 'rgba(242,242,243,.72)' }}>
            Leave your number and a coach calls you to plan a free trial session at your nearest ABS club.
          </p>
          <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 18 }}>
            <Link href={`/services/${prev.slug}`} style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'rgba(242,242,243,.7)' }}>
              ← {prev.name}
            </Link>
            <span style={{ width: 1, height: 14, background: 'rgba(255,255,255,.3)' }} />
            <Link href={`/services/${next.slug}`} style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'rgba(242,242,243,.7)' }}>
              {next.name} →
            </Link>
          </div>
        </div>

        <div ref={panelRef} style={{ border: '1px solid rgba(255,255,255,.16)', borderRadius: 28, padding: 'clamp(26px,3vw,40px)', background: '#151716' }}>
          {!sent ? (
            <div style={{ display: 'grid', gap: 12 }}>
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
              {error && <div style={{ fontSize: 13, color: '#ff9b8a' }}>{error}</div>}
              <button
                type="button"
                onClick={send}
                style={{ width: '100%', background: '#b8e600', color: '#0d0e0d', border: 0, borderRadius: 999, fontFamily: 'inherit', fontSize: 13.5, fontWeight: 700, letterSpacing: '.04em', padding: 18, cursor: 'pointer', transition: 'background .25s' }}
              >
                Book a free trial — {service.short}
              </button>
            </div>
          ) : (
            <div>
              <Eyebrow>Request received</Eyebrow>
              <div style={{ marginTop: 12, fontWeight: 700, fontSize: 'clamp(28px,3.4vw,36px)', lineHeight: 1, letterSpacing: '-.02em', color: '#ffffff' }}>
                Thanks, {firstName}.
              </div>
              <p style={{ marginTop: 12, fontSize: 15, lineHeight: 1.6, color: 'rgba(242,242,243,.7)' }}>
                A coach will call {phone} about {service.name}.
              </p>
              <button
                type="button"
                onClick={reset}
                style={{ marginTop: 24, background: 'transparent', border: '1px solid rgba(255,255,255,.25)', borderRadius: 999, color: '#f2f2f3', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, padding: '12px 20px', cursor: 'pointer' }}
              >
                Book another
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function ServiceDetail({ service }: { service: Service }) {
  const index = SERVICES.findIndex((s) => s.slug === service.slug);
  const n = SERVICES.length;
  const prev = SERVICES[(index - 1 + n) % n];
  const next = SERVICES[(index + 1) % n];

  return (
    <>
      <TabStrip activeSlug={service.slug} />
      <Hero service={service} index={index} total={n} />
      <Detail service={service} />
      <Enquiry service={service} prev={prev} next={next} />
    </>
  );
}
