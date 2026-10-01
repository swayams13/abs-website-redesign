'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CLUBS } from '@/lib/data';
import SampleTag from '@/components/ui/SampleTag';
import { istMinutes, istWeekday } from '@/lib/time';
import { useReveal } from '@/lib/hooks';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
// Placeholder schedule — README flags this as needing a real per-club source (CMS or sheet).
const CLASSES: Record<string, [string, number, string]> = {
  HIIT: ['Functional HIIT', 45, 'All levels'],
  Yoga: ['Hatha Yoga', 60, 'All levels'],
  Spin: ['Spin', 45, 'Intermediate'],
  Zumba: ['Zumba', 60, 'All levels'],
  Strength: ['Strength Basics', 60, 'Beginner'],
  Circuit: ['Functional Circuit', 45, 'All levels'],
  Mobility: ['Mobility & Stretch', 45, 'All levels'],
  '90-Day': ['90-Day Batch', 60, 'Enrolled'],
};
const COACHES = ['Govind Koli', 'Sana Merchant', 'Kiran Jadhav', 'Priya Deshmukh', 'Rohit Pawar', 'Neha Kulkarni'];
const PLAN: [string, (string | null)[]][] = [
  ['6:00 AM', ['HIIT', 'Yoga', 'HIIT', 'Yoga', 'HIIT', 'Circuit', 'Yoga']],
  ['7:00 AM', ['Spin', 'Strength', 'Spin', 'Strength', 'Spin', 'Zumba', 'Mobility']],
  ['8:00 AM', ['90-Day', 'Mobility', '90-Day', 'Mobility', '90-Day', '90-Day', null]],
  ['10:00 AM', ['Yoga', 'Zumba', 'Yoga', 'Zumba', 'Yoga', 'Yoga', null]],
  ['5:30 PM', ['Zumba', 'HIIT', 'Zumba', 'HIIT', 'Zumba', 'Circuit', null]],
  ['6:30 PM', ['Strength', 'Spin', 'Strength', 'Spin', 'Strength', null, null]],
  ['7:30 PM', ['90-Day', 'Circuit', '90-Day', 'Circuit', '90-Day', null, null]],
  ['8:30 PM', ['Mobility', 'Yoga', 'Mobility', 'Yoga', 'Mobility', null, null]],
];
const TYPES = ['All', ...Object.keys(CLASSES)];

const toMin = (t: string) => {
  const [hm, ap] = t.split(' ');
  const [h, m] = hm.split(':').map(Number);
  return (ap === 'PM' && h !== 12 ? h + 12 : h) * 60 + m;
};

function chipStyle(active: boolean, small = false): React.CSSProperties {
  return {
    fontFamily: 'inherit',
    fontSize: small ? 12 : 12.5,
    fontWeight: 700,
    padding: small ? '9px 14px' : '11px 18px',
    borderRadius: 999,
    cursor: 'pointer',
    border: `1px solid ${active ? '#b8e600' : 'rgba(255,255,255,.22)'}`,
    background: active ? '#b8e600' : 'transparent',
    color: active ? '#0d0e0d' : '#f2f2f3',
    transition: 'background .2s, color .2s, border-color .2s',
    whiteSpace: 'nowrap',
  };
}

export default function TimetableContent() {
  const [club, setClub] = useState(CLUBS[0].slug);
  const [day, setDay] = useState(0);
  const [type, setType] = useState('All');
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    // Correct the default day to today's IST weekday once mounted — see TECH-STACK.md "Hydration".
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDay(istWeekday());
  }, []);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, []);

  const today = now !== null ? istWeekday(now) : null;
  const nowMin = now !== null ? istMinutes(now) : 0;
  const seed = CLUBS.findIndex((c) => c.slug === club);
  const isToday = today === day;

  const rows = PLAN.flatMap(([time, week], r) => {
    const k = week[day];
    if (!k) return [];
    const [cls, len, level] = CLASSES[k];
    const st = toMin(time);
    const past = isToday && st + len <= nowMin;
    const live = isToday && nowMin >= st && nowMin < st + len;
    return [
      {
        time, cls, len, level, k,
        coach: COACHES[(r + day + seed) % COACHES.length],
        op: past ? 0.4 : 1,
        tc: live ? '#b8e600' : '#ffffff',
        tag: live ? 'Live now' : k,
        tagBd: live ? '#b8e600' : 'rgba(255,255,255,.25)',
        tagFg: live ? '#b8e600' : 'rgba(242,242,243,.7)',
      },
    ];
  }).filter((r) => type === 'All' || r.k === type);

  const rowsRef = useReveal<HTMLDivElement>(0);

  return (
    <section style={{ background: '#0d0e0d', color: '#f2f2f3', minHeight: '80vh' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '140px clamp(16px,4vw,44px) clamp(56px,7vw,96px)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, marginBottom: 'clamp(32px,4vw,48px)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
              <span style={{ width: 28, height: 2, background: '#b8e600' }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: '#b8e600' }}>Time table</span>
            </div>
            <h1 style={{ fontWeight: 800, fontSize: 'clamp(38px,5.4vw,76px)', lineHeight: 1, letterSpacing: '-.035em', color: '#ffffff' }}>This week at ABS</h1>
            <p style={{ margin: '18px 0 0', fontSize: 15.5, lineHeight: 1.6, maxWidth: '52ch', color: 'rgba(242,242,243,.7)' }}>
              Group classes are free for members. Opening hours and class timings differ by club, so check with the front desk.
            </p>
            <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(242,242,243,.7)' }}>
              <SampleTag />
              <span style={{ fontSize: 12.5 }}>Class schedule shown is a sample — confirm with your club.</span>
            </div>
          </div>
          <label style={{ display: 'grid', gap: 8, minWidth: 'min(240px,100%)', maxWidth: '100%' }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(242,242,243,.55)' }}>Club</span>
            <select
              value={club}
              onChange={(e) => setClub(e.target.value)}
              style={{ background: '#0d0e0d', border: '1px solid rgba(255,255,255,.28)', borderRadius: 14, color: '#f2f2f3', fontFamily: 'inherit', fontSize: 15, padding: '14px 16px', outline: 0, width: '100%', minWidth: 0 }}
            >
              {CLUBS.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name} — {c.city}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {DAYS.map((label, i) => (
            <button key={label} type="button" onClick={() => setDay(i)} style={{ ...chipStyle(day === i), display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              {label}
              {today === i && <span style={{ fontSize: 9.5, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', opacity: 0.75 }}>Today</span>}
            </button>
          ))}
        </div>

        <div style={{ marginTop: 14, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {TYPES.map((t) => (
            <button key={t} type="button" onClick={() => setType(t)} style={chipStyle(type === t, true)}>
              {t}
            </button>
          ))}
        </div>

        <div ref={rowsRef} style={{ marginTop: 28, borderTop: '1px solid rgba(255,255,255,.2)' }}>
          {rows.map((r) => (
            <div key={r.time + r.k} style={{ display: 'grid', gridTemplateColumns: 'minmax(80px,120px) minmax(0,1fr) auto', gap: 16, alignItems: 'center', padding: '18px 0', borderBottom: '1px solid rgba(255,255,255,.12)', opacity: r.op }}>
              <div style={{ fontWeight: 700, fontSize: 24, lineHeight: 1, letterSpacing: '-.01em', color: r.tc }}>{r.time}</div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 'clamp(18px,2vw,22px)', lineHeight: 1.15, letterSpacing: '-.01em', color: '#ffffff' }}>{r.cls}</div>
                <div style={{ marginTop: 6, fontSize: 13.5, color: 'rgba(242,242,243,.6)' }}>
                  {r.coach} · {r.len} min · {r.level}
                </div>
              </div>
              <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', padding: '6px 10px', borderRadius: 999, border: `1px solid ${r.tagBd}`, color: r.tagFg }}>
                {r.tag}
              </span>
            </div>
          ))}
          {rows.length === 0 && (
            <div style={{ padding: '40px 0', fontSize: 15, color: 'rgba(242,242,243,.6)' }}>
              No {type} classes on this day. Try another day or class type.
            </div>
          )}
        </div>

        <div style={{ marginTop: 28, display: 'flex', flexWrap: 'wrap', gap: '14px 30px' }}>
          <Link href="/services/group-classes" style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: '#f2f2f3', borderBottom: '2px solid #b8e600', paddingBottom: 5 }}>
            About group classes →
          </Link>
          <Link href="/#join" style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: '#f2f2f3', borderBottom: '2px solid #b8e600', paddingBottom: 5 }}>
            Book a free trial class →
          </Link>
        </div>
      </div>
    </section>
  );
}
