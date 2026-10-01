'use client';
import { useState } from 'react';
import { CLUBS, clubBySlug, validPhone, PHONE, PHONE_HREF } from '@/lib/data';
import { sendWhatsApp } from '@/lib/whatsapp';
import { useReveal } from '@/lib/hooks';

const CLUB_OPTIONS = CLUBS.map((c) => ({ slug: c.slug, label: `ABS ${c.name} · ${c.cityShort}` }));

export default function Join({ name, setName }: { name: string; setName: (v: string) => void }) {
  const [phone, setPhone] = useState('');
  const [club, setClub] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const leftRef = useReveal<HTMLDivElement>(0);
  const panelRef = useReveal<HTMLDivElement>(1);

  const send = () => {
    let e = '';
    if (name.trim().length < 2) e = 'Please enter your full name.';
    else if (!validPhone(phone)) e = 'Enter a valid 10-digit Indian mobile number.';
    else if (!club) e = 'Choose the club you want to tour.';
    if (e) setError(e);
    else { sendWhatsApp('Club tour request (ABS website)', { Name: name, Phone: phone, Club: clubBySlug(club)?.name ?? club }); setSent(true); setError(''); }
  };
  const reset = () => { setSent(false); setName(''); setPhone(''); setClub(''); };

  const firstName = name.trim().split(/\s+/)[0] || '';
  const clubName = clubBySlug(club)?.name || '';
  const nameBorder = error && name.trim().length < 2 ? '#ff9b8a' : 'rgba(255,255,255,.12)';
  const phoneBorder = error && !validPhone(phone) ? '#ff9b8a' : 'rgba(255,255,255,.12)';
  const clubBorder = error && !club ? '#ff9b8a' : 'rgba(255,255,255,.12)';

  return (
    <section id="join" style={{ background: '#0d0e0d' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: 'clamp(72px,9vw,128px) clamp(16px,4vw,44px)', display: 'grid', gap: 'clamp(40px,5vw,80px)', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,400px),1fr))', alignItems: 'center' }}>
        <div ref={leftRef}>
          <h2 style={{ fontWeight: 800, fontSize: 'clamp(44px,6.4vw,96px)', lineHeight: 0.98, letterSpacing: '-.04em', color: '#ffffff' }}>
            Walk in once.
            <br />
            <span style={{ fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic', fontWeight: 500, fontSize: '1.1em', letterSpacing: '-.01em', color: '#b8e600' }}>Stay for years.</span>
          </h2>
          <p style={{ marginTop: 24, fontSize: 17, lineHeight: 1.6, maxWidth: '44ch', color: 'rgba(242,242,243,.76)' }}>
            Book a free tour at any ABS club. A coach walks you through the floor, the programs and the plan that fits your goal. No card, no commitment.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 28px', marginTop: 30, fontSize: 15 }}>
            <a href={PHONE_HREF} style={{ fontWeight: 600, color: '#ffffff' }}>{PHONE}</a>
            <a href="https://wa.me/919763215051" style={{ fontWeight: 600, color: 'rgba(242,242,243,.72)' }}>WhatsApp us</a>
          </div>
        </div>

        <div ref={panelRef} style={{ padding: 'clamp(24px,3vw,40px)', borderRadius: 28, background: '#151716', border: '1px solid rgba(255,255,255,.1)' }}>
          {!sent ? (
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-.02em', color: '#ffffff' }}>Book a free club tour</div>
              <div style={{ marginTop: 6, fontSize: 14, color: 'rgba(242,242,243,.6)' }}>A coach calls you once to fix a time.</div>
              <div style={{ display: 'grid', gap: 12, marginTop: 24 }}>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setError(''); }}
                  placeholder="Full name"
                  aria-label="Full name"
                  style={{ width: '100%', background: 'rgba(255,255,255,.04)', border: `1px solid ${nameBorder}`, borderRadius: 14, color: '#f2f2f3', fontFamily: 'inherit', fontSize: 15, padding: '16px 18px', outline: 0, transition: 'border-color .2s' }}
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => { setPhone(e.target.value); setError(''); }}
                  placeholder="Mobile number"
                  aria-label="Mobile number"
                  style={{ width: '100%', background: 'rgba(255,255,255,.04)', border: `1px solid ${phoneBorder}`, borderRadius: 14, color: '#f2f2f3', fontFamily: 'inherit', fontSize: 15, padding: '16px 18px', outline: 0, transition: 'border-color .2s' }}
                />
                <select
                  value={club}
                  onChange={(e) => { setClub(e.target.value); setError(''); }}
                  aria-label="Choose your club"
                  style={{ width: '100%', background: '#1b1d1c', border: `1px solid ${clubBorder}`, borderRadius: 14, color: '#f2f2f3', fontFamily: 'inherit', fontSize: 15, padding: '16px 18px', outline: 0 }}
                >
                  <option value="">Choose your club</option>
                  {CLUB_OPTIONS.map((o) => (
                    <option key={o.slug} value={o.slug}>{o.label}</option>
                  ))}
                </select>
                {error && <div style={{ fontSize: 13, color: '#ff9b8a' }}>{error}</div>}
                <button
                  type="button"
                  onClick={send}
                  style={{ marginTop: 4, width: '100%', background: '#b8e600', color: '#0d0e0d', border: 0, borderRadius: 999, fontFamily: 'inherit', fontSize: 15, fontWeight: 700, padding: 18, cursor: 'pointer', transition: 'background .3s ease-out' }}
                >
                  Book my free tour
                </button>
              </div>
            </div>
          ) : (
            <div style={{ minHeight: 320, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#b8e600' }}>Request received</div>
              <div style={{ marginTop: 12, fontSize: 'clamp(28px,3vw,40px)', fontWeight: 700, letterSpacing: '-.03em', lineHeight: 1.1, color: '#ffffff' }}>
                See you on the floor, {firstName}.
              </div>
              <p style={{ marginTop: 14, fontSize: 15, lineHeight: 1.6, color: 'rgba(242,242,243,.72)' }}>
                A coach from ABS {clubName} will call {phone} to fix a time for your tour.
              </p>
              <button
                type="button"
                onClick={reset}
                style={{ alignSelf: 'flex-start', marginTop: 24, background: 'transparent', border: '1px solid rgba(255,255,255,.25)', borderRadius: 999, color: '#f2f2f3', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, padding: '12px 20px', cursor: 'pointer' }}
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
