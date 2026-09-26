'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { CITIES, clubsInCity } from '@/lib/data';
import { useReveal, useReducedMotion } from '@/lib/hooks';

const CITY_LABELS = CITIES.map((c) => (c === 'Chhatrapati Sambhaji Nagar' ? 'Ch. Sambhaji Nagar' : c));

export default function Passport({ name }: { name: string }) {
  const [cityIdx, setCityIdx] = useState(0);
  const [tap, setTap] = useState(0);
  const reduced = useReducedMotion();
  const captionRef = useRef<HTMLSpanElement>(null);
  const leftRef = useReveal<HTMLDivElement>(0);
  const rightRef = useReveal<HTMLDivElement>(1);

  useEffect(() => {
    const id = setInterval(() => { if (!document.hidden) setTap((t) => t + 1); }, 1500);
    return () => clearInterval(id);
  }, []);

  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const el = captionRef.current;
    if (!el || reduced) return;
    el.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], { duration: 450, easing: 'cubic-bezier(.22,1,.36,1)' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityIdx]);

  const city = CITIES[cityIdx];
  const cityLabel = CITY_LABELS[cityIdx];
  const clubs = clubsInCity(city);
  const down = reduced ? true : tap % 2 === 1;
  const current = clubs.length ? clubs[reduced ? 0 : Math.floor(tap / 2) % clubs.length] : null;
  const tapTf = down
    ? 'perspective(1200px) rotateX(18deg) rotate(-4deg) translateY(10px)'
    : 'perspective(1200px) rotateX(10deg) rotate(-7deg) translateY(-14px)';
  const tapRing = down ? '#b8e600' : 'rgba(242,242,243,.35)';
  const tapGlow = down ? 'rgba(184,230,0,.18)' : 'rgba(184,230,0,0)';
  const tapClub = current ? current.name : city;
  const shown = clubs.slice(0, 6);
  const holderName = (name || '').trim().toUpperCase() || 'YOUR NAME';

  return (
    <section id="passport" style={{ background: '#0d0e0d' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: 'clamp(72px,9vw,128px) clamp(16px,4vw,44px)', display: 'grid', gap: 'clamp(40px,5vw,80px)', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,420px),1fr))', alignItems: 'center' }}>
        <div ref={leftRef}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#b8e600' }}>The ABS Passport</div>
          <h2 style={{ marginTop: 14, fontWeight: 700, fontSize: 'clamp(38px,5.4vw,76px)', lineHeight: 1, letterSpacing: '-.035em', color: '#ffffff' }}>
            One card. <span style={{ fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic', fontWeight: 500, fontSize: '1.1em', letterSpacing: '-.01em' }}>Every</span> club.
          </h2>
          <p style={{ marginTop: 22, fontSize: 17, lineHeight: 1.6, maxWidth: '44ch', color: 'rgba(242,242,243,.78)' }}>
            One membership, every ABS club. No transfer fees, no guest passes, no paperwork. Work in Kharadi and live in Baner? Train at both.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 32 }}>
            {CITY_LABELS.map((label, i) => {
              const on = i === cityIdx;
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => setCityIdx(i)}
                  style={{ fontFamily: 'inherit', fontSize: 14, fontWeight: 600, padding: '11px 18px', borderRadius: 999, border: `1px solid ${on ? '#b8e600' : 'rgba(255,255,255,.22)'}`, background: on ? '#b8e600' : 'transparent', color: on ? '#0d0e0d' : '#f2f2f3', cursor: 'pointer', transition: 'background .3s, color .3s, border-color .3s' }}
                >
                  {label}
                </button>
              );
            })}
          </div>
          <Link href={`/locations?city=${encodeURIComponent(city)}`} style={{ display: 'inline-block', marginTop: 28, fontSize: 15, fontWeight: 600, color: '#ffffff', borderBottom: '1px solid rgba(255,255,255,.35)', paddingBottom: 3 }}>
            See every club in {cityLabel} →
          </Link>
        </div>

        <div ref={rightRef} style={{ width: '100%' }}>
          <div aria-hidden="true" style={{ position: 'relative', padding: 'clamp(28px,4vw,48px) clamp(12px,2vw,24px) clamp(20px,3vw,32px)', borderRadius: 28, background: 'radial-gradient(120% 90% at 80% 100%,rgba(184,230,0,.10),rgba(13,14,13,0) 60%), #151716', border: '1px solid rgba(255,255,255,.06)', overflow: 'hidden' }}>
            <div style={{ position: 'relative', maxWidth: 460, margin: '0 auto', transform: tapTf, transition: 'transform .7s cubic-bezier(.22,1,.36,1)', zIndex: 2 }}>
              <div style={{ position: 'relative', aspectRatio: '1.586', borderRadius: 20, overflow: 'hidden', background: 'linear-gradient(135deg,#262928 0%,#141615 55%,#0d0e0d 100%)', boxShadow: '0 40px 70px rgba(0,0,0,.55), inset 0 0 0 1px rgba(255,255,255,.10)', color: '#f2f2f3' }}>
                <div style={{ position: 'absolute', right: '-18%', top: '-40%', width: '75%', aspectRatio: '1', borderRadius: '50%', border: 'clamp(18px,3vw,30px) solid #b8e600', opacity: 0.95 }} />
                <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(115deg,rgba(255,255,255,.025) 0 1px,transparent 1px 7px)' }} />
                <div style={{ position: 'absolute', inset: 0, padding: 'clamp(16px,3.2vw,26px)', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/abs-logo-white.png" alt="" style={{ height: 'clamp(22px,3.4vw,30px)', width: 'auto', display: 'block' }} />
                  </div>
                  <div style={{ marginTop: 'clamp(10px,2vw,18px)', display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 'clamp(34px,5vw,44px)', aspectRatio: '1.3', borderRadius: 7, background: 'linear-gradient(135deg,#e9e2c6,#b9ad85 45%,#e6ddbd 70%,#a89c74)', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.25)' }} />
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f2f2f3" strokeWidth="2" strokeLinecap="round">
                      <path d="M8.5 7.5a6 6 0 0 1 0 9" />
                      <path d="M12 5a9.5 9.5 0 0 1 0 14" />
                      <path d="M15.5 2.5a13 13 0 0 1 0 19" />
                    </svg>
                  </div>
                  <div style={{ marginTop: 'auto' }}>
                    <div style={{ fontWeight: 800, fontSize: 'clamp(22px,3.8vw,32px)', letterSpacing: '-.03em', lineHeight: 1 }}>Passport</div>
                    <div style={{ marginTop: 4, fontSize: 'clamp(10px,1.4vw,12px)', fontWeight: 600, color: '#b8e600' }}>Valid at every ABS club</div>
                    <div style={{ marginTop: 'clamp(10px,2vw,16px)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12 }}>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(242,242,243,.55)' }}>Member</div>
                        <div style={{ marginTop: 3, fontSize: 'clamp(13px,1.9vw,16px)', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{holderName}</div>
                      </div>
                      <div style={{ textAlign: 'right', flex: 'none' }}>
                        <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(242,242,243,.55)' }}>No.</div>
                        <div style={{ marginTop: 3, fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 'clamp(11px,1.6vw,13px)', letterSpacing: '.08em' }}>ABS 0035 2026</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ position: 'relative', margin: 'clamp(-28px,-3vw,-18px) auto 0', maxWidth: 340, padding: 'clamp(36px,5vw,48px) 20px 20px', borderRadius: 22, background: '#0d0e0d', border: '1px solid rgba(255,255,255,.08)', display: 'flex', alignItems: 'center', gap: 16, zIndex: 1 }}>
              <div style={{ flex: 'none', width: 52, height: 52, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${tapRing}`, boxShadow: `0 0 0 6px ${tapGlow}`, transition: 'border-color .3s, box-shadow .3s' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={tapRing} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#b8e600' }}>Access granted</div>
                <div style={{ marginTop: 3, fontSize: 17, fontWeight: 700, letterSpacing: '-.02em', color: '#ffffff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>ABS {tapClub}</div>
                <div style={{ marginTop: 2, fontSize: 12.5, color: 'rgba(242,242,243,.7)' }}>{cityLabel} · Tap in, train</div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 24, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
            <span ref={captionRef} style={{ fontSize: 14, fontWeight: 700, color: '#ffffff', marginRight: 6 }}>
              {cityLabel} · {clubs.length} {clubs.length === 1 ? 'club' : 'clubs'}
            </span>
            {shown.map((k) => (
              <Link key={k.slug} href={`/clubs/${k.slug}`} style={{ padding: '6px 11px', borderRadius: 999, border: '1px solid rgba(255,255,255,.18)', fontSize: 12.5, fontWeight: 500, color: '#ffffff' }}>
                {k.name}
              </Link>
            ))}
            {clubs.length > shown.length && (
              <span style={{ padding: '6px 11px', fontSize: 12.5, fontWeight: 500, color: 'rgba(255,255,255,.75)' }}>+{clubs.length - shown.length} more</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
