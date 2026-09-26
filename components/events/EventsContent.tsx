'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { validPhone } from '@/lib/data';

// Events are placeholders except GROW 2026 and 20 Years of ABS — README flags these as the two real entries.
const EVENTS = [
  { iso: '2026-10-12', cat: 'Festival', title: 'Navratri Garba Fitness Night', where: 'All Pune clubs', time: '7:00 PM', fee: 'Free for members', desc: 'A high-energy garba and dandiya workout to celebrate Navratri with the ABS community. Traditional wear encouraged.', img: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=1200&q=80' },
  { iso: '2026-10-05', cat: 'Challenge', title: '90-Day Challenge — New Batch', where: 'All clubs', time: '6:00 AM', fee: 'Enrolment', desc: 'The next 90 Days Weight Loss Challenge batch begins. Body composition test, diet plan and coached sessions for 90 days.', img: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1200&q=80' },
  { iso: '2026-11-08', cat: 'Festival', title: 'Diwali Fitness Fest', where: 'Magarpatta City', time: '6:30 PM', fee: 'Free for members', desc: 'Group workouts, healthy festive food and prizes for the most consistent members of the season.', img: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1200&q=80' },
  { iso: '2026-11-22', cat: 'Workshop', title: 'Nutrition Workshop with ABS Coaches', where: 'EON 2 Kharadi', time: '11:00 AM', fee: 'Free', desc: 'A practical session on eating for fat loss and strength using everyday Indian food.', img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80' },
  { iso: '2026-12-06', cat: 'Community', title: 'ABS Run Club — 10K', where: 'Pune', time: '6:00 AM', fee: 'Registration', desc: 'A community 10K run for members, friends and family. Finisher medals for all.', img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80' },
  { iso: '2027-01-01', cat: 'Challenge', title: 'New Year Transformation Kick-off', where: 'All clubs', time: '7:00 AM', fee: 'Free for members', desc: 'Start the year with goal-setting sessions and a free assessment with an ABS coach.', img: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1200&q=80' },
  { iso: '2026-01-18', cat: 'Leadership', title: 'GROW 2026', where: 'Pune', time: '10:00 AM', fee: 'Team event', desc: 'ABS founder Abhimanyu Sable conducted his first leadership and growth session of the year with the ABS team.', img: 'https://images.unsplash.com/photo-1559595500-e15296bdbb48?auto=format&fit=crop&w=1200&q=80' },
  { iso: '2025-12-14', cat: 'Anniversary', title: '20 Years of ABS', where: 'Pune', time: '7:00 PM', fee: 'Members & team', desc: 'Celebrating 20 years of ABS Fitness & Wellness Clubs and 40 years of Abhimanyu Sable in fitness.', img: 'https://images.unsplash.com/photo-1550259979-ed79b48d2a30?auto=format&fit=crop&w=1200&q=80' },
  { iso: '2025-11-02', cat: 'Festival', title: 'Diwali Fitness Fest 2025', where: 'All clubs', time: '6:30 PM', fee: 'Members', desc: 'Festive workouts and celebrations across ABS clubs.', img: 'https://images.unsplash.com/photo-1567598508481-65985588e295?auto=format&fit=crop&w=1200&q=80' },
] as const;

const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function fmt(iso: string) {
  const d = new Date(iso + 'T00:00:00');
  return { day: String(d.getDate()).padStart(2, '0'), mon: `${MON[d.getMonth()]} ${String(d.getFullYear()).slice(2)}`, full: `${d.getDate()} ${MON[d.getMonth()]} ${d.getFullYear()}` };
}

function EventCard({ ev, onClick }: { ev: (typeof EVENTS)[number]; onClick: () => void }) {
  const { day, mon } = fmt(ev.iso);
  return (
    <button
      type="button"
      onClick={onClick}
      style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', background: 'transparent', border: '1px solid rgba(255,255,255,.18)', borderRadius: 18, overflow: 'hidden', color: '#f2f2f3', padding: 0, cursor: 'pointer', fontFamily: 'inherit', transition: 'border-color .25s' }}
    >
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/10', background: '#151716' }}>
        <Image src={ev.img} alt={ev.title} fill style={{ objectFit: 'cover' }} sizes="(min-width: 900px) 32vw, 90vw" />
        <div style={{ position: 'absolute', top: 0, left: 0, background: '#b8e600', color: '#0d0e0d', padding: '10px 12px', textAlign: 'center' }}>
          <div style={{ fontWeight: 800, fontSize: 28, lineHeight: 1 }}>{day}</div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase' }}>{mon}</div>
        </div>
      </div>
      <div style={{ padding: 22 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: '#b8e600' }}>{ev.cat}</div>
        <div style={{ marginTop: 10, fontWeight: 700, textTransform: 'uppercase', fontSize: 24, lineHeight: 1.1, color: '#ffffff' }}>{ev.title}</div>
        <div style={{ marginTop: 10, fontSize: 13.5, color: 'rgba(242,242,243,.6)' }}>{ev.where} · {ev.time}</div>
      </div>
    </button>
  );
}

function EventModal({ ev, isUpcoming, registered, onRegister, onClose }: {
  ev: (typeof EVENTS)[number];
  isUpcoming: boolean;
  registered: boolean;
  onRegister: () => void;
  onClose: () => void;
}) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [tried, setTried] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const okName = name.trim().length > 1;
  const okPhone = validPhone(phone);
  const register = () => {
    setTried(true);
    if (okName && okPhone) onRegister();
  };

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(13,14,13,.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: 760, maxHeight: '90vh', overflow: 'auto', background: '#0d0e0d', border: '1px solid rgba(255,255,255,.3)', borderRadius: 22 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, padding: '24px 28px', borderBottom: '1px solid rgba(255,255,255,.14)' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: '#b8e600' }}>{ev.cat} · {fmt(ev.iso).full}</div>
            <div style={{ marginTop: 10, fontWeight: 700, textTransform: 'uppercase', fontSize: 'clamp(28px,3.4vw,40px)', lineHeight: 0.95, color: '#ffffff' }}>{ev.title}</div>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 999, background: 'transparent', border: '1px solid rgba(255,255,255,.3)', color: '#f2f2f3', fontSize: 20, cursor: 'pointer' }}>
            ×
          </button>
        </div>
        <div style={{ padding: '24px 28px 30px', display: 'grid', gap: 18 }}>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.65, color: 'rgba(242,242,243,.8)' }}>{ev.desc}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 28px', fontSize: 14, color: 'rgba(242,242,243,.7)' }}>
            <span>Where: <strong style={{ color: '#f2f2f3' }}>{ev.where}</strong></span>
            <span>Time: <strong style={{ color: '#f2f2f3' }}>{ev.time}</strong></span>
            <span>Entry: <strong style={{ color: '#f2f2f3' }}>{ev.fee}</strong></span>
          </div>
          {isUpcoming && !registered && (
            <div style={{ display: 'grid', gap: 10, gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', borderTop: '1px solid rgba(255,255,255,.14)', paddingTop: 20 }}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                aria-label="Full name"
                style={{ background: 'transparent', border: `1px solid ${tried && !okName ? '#ff9b8a' : 'rgba(255,255,255,.28)'}`, borderRadius: 14, color: '#f2f2f3', fontFamily: 'inherit', fontSize: 15, padding: '14px 16px', outline: 0 }}
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Mobile number"
                aria-label="Mobile number"
                style={{ background: 'transparent', border: `1px solid ${tried && !okPhone ? '#ff9b8a' : 'rgba(255,255,255,.28)'}`, borderRadius: 14, color: '#f2f2f3', fontFamily: 'inherit', fontSize: 15, padding: '14px 16px', outline: 0 }}
              />
              <button
                type="button"
                onClick={register}
                style={{ gridColumn: '1/-1', background: '#b8e600', color: '#0d0e0d', border: 0, borderRadius: 999, fontFamily: 'inherit', fontSize: 13, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', padding: 16, cursor: 'pointer' }}
              >
                Register my spot
              </button>
            </div>
          )}
          {registered && (
            <div style={{ border: '1px solid #b8e600', borderRadius: 14, padding: 18, fontSize: 15, color: '#f2f2f3' }}>
              You&rsquo;re registered, {name.trim().split(/\s+/)[0] || 'there'}. We&rsquo;ll send the details to {phone}.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function EventsContent() {
  const [tab, setTab] = useState<'up' | 'past'>('up');
  const [sel, setSel] = useState(-1);
  const [registered, setRegistered] = useState<Record<number, boolean>>({});
  const [today, setToday] = useState('');

  useEffect(() => {
    // Compute today's date client-side only — see TECH-STACK.md "Hydration". Before mount `today`
    // stays '' so every event compares as upcoming, matching the server-rendered markup exactly.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToday(new Date().toISOString().slice(0, 10));
  }, []);

  const all = EVENTS.map((ev, i) => ({ ...ev, i, up: ev.iso >= today }));
  const list = all.filter((ev) => (tab === 'up') === ev.up).sort((a, b) => (tab === 'up' ? a.iso.localeCompare(b.iso) : b.iso.localeCompare(a.iso)));
  const selected = sel >= 0 ? all[sel] : null;

  return (
    <section style={{ background: '#0d0e0d', minHeight: '80vh' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '140px clamp(16px,4vw,44px) clamp(56px,7vw,96px)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
              <span style={{ width: 28, height: 2, background: '#b8e600' }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: '#b8e600' }}>ABS Events &amp; Activities</span>
            </div>
            <h1 style={{ fontWeight: 800, fontSize: 'clamp(38px,5.4vw,76px)', lineHeight: 1, letterSpacing: '-.035em', color: '#ffffff', maxWidth: '14ch' }}>More than a workout.</h1>
            <p style={{ margin: '18px 0 0', fontSize: 15.5, lineHeight: 1.6, maxWidth: '54ch', color: 'rgba(242,242,243,.7)' }}>
              ABS Fitness is not just about exercise. It&rsquo;s a place where celebrations, festivals, and community events keep members connected, motivated, and inspired.
            </p>
          </div>
          <div style={{ display: 'flex', border: '1px solid rgba(255,255,255,.3)', borderRadius: 999, padding: 4 }}>
            {(['up', 'past'] as const).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setTab(k)}
                style={{ fontFamily: 'inherit', fontSize: 12, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', padding: '11px 20px', borderRadius: 999, border: 0, background: tab === k ? '#b8e600' : 'transparent', color: tab === k ? '#0d0e0d' : '#f2f2f3', cursor: 'pointer' }}
              >
                {k === 'up' ? 'Upcoming' : 'Past'}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 'clamp(32px,4vw,52px)', display: 'grid', gap: 'clamp(14px,2vw,24px)', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%,340px),1fr))' }}>
          {list.map((ev) => (
            <EventCard key={ev.iso + ev.title} ev={ev} onClick={() => setSel(ev.i)} />
          ))}
        </div>
      </div>

      {selected && (
        <EventModal
          key={selected.i}
          ev={selected}
          isUpcoming={selected.up}
          registered={!!registered[selected.i]}
          onRegister={() => setRegistered((r) => ({ ...r, [selected.i]: true }))}
          onClose={() => setSel(-1)}
        />
      )}
    </section>
  );
}
