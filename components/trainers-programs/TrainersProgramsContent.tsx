'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CLUBS, TRAINERS, clubBySlug, validPhone, type Trainer } from '@/lib/data';
import { useReveal } from '@/lib/hooks';

const FOCUS = ['All', 'Strength', 'Fat loss', 'Yoga', 'HIIT', 'Onboarding'] as const;
const MATCH: Record<string, string[]> = {
  Strength: ['Strength', 'Powerlifting', 'Olympic lifting', 'Transformation'],
  'Fat loss': ['Fat loss', 'Functional', 'Transformation'],
  Yoga: ['Hatha', 'Mobility', 'Yoga'],
  HIIT: ['HIIT', 'Spin', 'Zumba'],
  Onboarding: ['Onboarding', 'Ladies circuit'],
};

const PROGRAMS = [
  { no: '01', slug: 'personal-training', img: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=1200&q=80', t: 'Personal Training', meta: '1-on-1', d: 'One coach, one plan, reviewed every fortnight. For people who have joined a gym before and stopped.', points: ['Baseline assessment and goal setting', 'Programme rewritten every 4 weeks', 'Nutrition guidance included'], cta: 'Get fitness advice' },
  { no: '02', slug: 'group-classes', img: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=1200&q=80', t: 'Group Classes', meta: 'Included in membership', d: 'HIIT, spin, Zumba and functional circuits running morning and evening at every ABS club.', points: ['No booking needed — drop in', 'Morning and evening slots daily', 'Same timetable across Pune clubs'], cta: 'See a club timetable' },
  { no: '03', slug: 'mobility', img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80', t: 'Yoga & Wellness', meta: 'Led by Sana Merchant', d: 'Hatha and vinyasa, plus a dedicated mobility track for members coming back from injury.', points: ['Beginner and intermediate streams', 'Breathwork and recovery sessions', 'Post-injury modifications'], cta: 'Join this program' },
  { no: '04', slug: 'strength', img: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1200&q=80', t: 'Strength Training', meta: 'Platforms at 12 clubs', d: 'Full free-weight floors, racks and Olympic platforms with progressive programming from first squat to competition.', points: ['Technique coaching on the platform', 'Linear and block periodisation', 'Meet prep for competitive lifters'], cta: 'Join this program' },
  { no: '05', slug: '90-day', img: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1200&q=80', t: '90-Day Weight Loss Challenge', meta: 'Next batch 1 Oct', d: 'The current ABS campaign. One goal, 12 coached weeks, measured checkpoints and a result you can see in the photos.', points: ['Fortnightly body-composition tracking', 'Nutrition plan and weekly check-ins', 'Open to members and non-members'], cta: 'Enrol now' },
];

const GOALS = ['Fat loss', 'Muscle gain', 'Post-injury return', 'General fitness'];
const BATCH = new Date('2026-10-01T06:00:00+05:30').getTime();

function Eyebrow({ children, dark = true }: { children: React.ReactNode; dark?: boolean }) {
  return <div style={{ fontSize: 13, fontWeight: 600, color: dark ? '#b8e600' : '#6d8a00' }}>{children}</div>;
}

function chipStyle(active: boolean): React.CSSProperties {
  return {
    fontFamily: 'inherit',
    fontSize: 12.5,
    fontWeight: 700,
    padding: '11px 18px',
    borderRadius: 999,
    cursor: 'pointer',
    border: '1.5px solid #0d0e0d',
    background: active ? '#0d0e0d' : 'transparent',
    color: active ? '#b8e600' : '#0d0e0d',
    transition: 'background .2s, color .2s',
  };
}

function Hero() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: '#0d0e0d', color: '#f2f2f3' }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <Image src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=2400&q=80" alt="Coach with client on the training floor" fill priority style={{ objectFit: 'cover' }} sizes="100vw" />
      </div>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(96deg,rgba(13,14,13,.97) 0%,rgba(13,14,13,.88) 50%,rgba(13,14,13,.55) 100%)' }} />
      <div style={{ position: 'relative', maxWidth: 1320, margin: '0 auto', padding: '140px clamp(16px,4vw,44px) clamp(56px,7vw,96px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
          <span style={{ width: 28, height: 2, background: '#b8e600' }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: '#b8e600' }}>Coaching &amp; programs</span>
        </div>
        <h1 style={{ fontWeight: 800, fontSize: 'clamp(46px,7.4vw,112px)', lineHeight: 0.98, letterSpacing: '-.035em', color: '#ffffff' }}>
          Train with <span style={{ color: '#b8e600' }}>experts</span>
        </h1>
        <p style={{ marginTop: 22, fontSize: 'clamp(16px,1.6vw,19px)', lineHeight: 1.55, maxWidth: '48ch', color: 'rgba(242,242,243,.78)' }}>
          Every ABS club runs on a coached floor. Certified trainers, structured programming and a plan that gets reviewed — not a membership card and good luck.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 'clamp(30px,4vw,44px)' }}>
          <Link href="#challenge" style={{ background: '#b8e600', color: '#0d0e0d', fontSize: 14, fontWeight: 700, borderRadius: 999, padding: '18px 30px' }}>
            90-Day Challenge
          </Link>
          <Link href="#programs" style={{ border: '1px solid rgba(255,255,255,.35)', color: '#f2f2f3', fontSize: 14, fontWeight: 700, borderRadius: 999, padding: '18px 30px' }}>
            See programs
          </Link>
        </div>
      </div>
    </section>
  );
}

function TrainerCard({ t, index }: { t: Trainer; index: number }) {
  const ref = useReveal<HTMLElement>(index);
  const club = clubBySlug(t.club);
  return (
    <article ref={ref} style={{ border: '1px solid rgba(29,31,32,.18)', borderRadius: 22, overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#ffffff', transition: 'border-color .3s' }}>
      <div style={{ position: 'relative', aspectRatio: '4/5', background: '#e0e0e2' }}>
        <Image src={t.photo} alt={t.name} fill style={{ objectFit: 'cover' }} sizes="(min-width: 900px) 24vw, (min-width: 600px) 48vw, 100vw" />
      </div>
      <div style={{ padding: 'clamp(20px,2.2vw,26px)', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{ fontWeight: 700, fontSize: 22, letterSpacing: '-.02em', lineHeight: 1.05 }}>{t.name}</h3>
        <div style={{ marginTop: 8, fontSize: 11.5, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#5c7500' }}>{t.role}</div>
        <p style={{ margin: '14px 0 0', fontSize: 14.5, lineHeight: 1.6, color: 'rgba(29,31,32,.72)' }}>{t.bio}</p>
        <div style={{ marginTop: 'auto', paddingTop: 20, borderTop: '1px solid rgba(29,31,32,.12)', display: 'flex', flexWrap: 'wrap', gap: 7 }}>
          {t.tags.map((tag) => (
            <span key={tag} style={{ border: '1px solid rgba(29,31,32,.22)', borderRadius: 999, fontSize: 11, fontWeight: 600, padding: '6px 11px' }}>{tag}</span>
          ))}
        </div>
        {club && (
          <div style={{ marginTop: 16, fontSize: 13, color: 'rgba(29,31,32,.55)' }}>
            Based at <Link href={`/clubs/${club.slug}`} style={{ color: '#1d1f20', borderBottom: '1.5px solid #b8e600' }}>ABS {club.name}</Link>
          </div>
        )}
      </div>
    </article>
  );
}

function Roster() {
  const [focus, setFocus] = useState<(typeof FOCUS)[number]>('All');
  const headerRef = useReveal<HTMLDivElement>(0);
  const trainers = focus === 'All' ? TRAINERS : TRAINERS.filter((t) => t.tags.some((tag) => MATCH[focus].includes(tag)));

  return (
    <section id="roster" style={{ background: '#f2f2f3', color: '#1d1f20' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: 'clamp(72px,9vw,128px) clamp(16px,4vw,44px)' }}>
        <div ref={headerRef} style={{ display: 'grid', gap: '24px 48px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))', alignItems: 'end', marginBottom: 'clamp(32px,4vw,48px)' }}>
          <div>
            <Eyebrow dark={false}>The roster</Eyebrow>
            <h2 style={{ marginTop: 14, fontWeight: 700, fontSize: 'clamp(34px,4.6vw,60px)', lineHeight: 1.04, letterSpacing: '-.03em', maxWidth: '18ch' }}>
              Who you&rsquo;ll actually be working with
            </h2>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(29,31,32,.55)', marginBottom: 10 }}>
              Filter by focus
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {FOCUS.map((f) => (
                <button key={f} type="button" onClick={() => setFocus(f)} style={chipStyle(focus === f)}>
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {trainers.length > 0 ? (
          <div style={{ display: 'grid', gap: 'clamp(14px,1.8vw,24px)', gridTemplateColumns: 'repeat(auto-fit, minmax(250px,1fr))' }}>
            {trainers.map((t, i) => (
              <TrainerCard key={t.id} t={t} index={i} />
            ))}
          </div>
        ) : (
          <div style={{ border: '1px solid rgba(29,31,32,.18)', borderRadius: 22, padding: 40, textAlign: 'center', fontSize: 15, color: 'rgba(29,31,32,.65)' }}>
            No coach with that focus on the roster right now.
          </div>
        )}
      </div>
    </section>
  );
}

function ProgramCard({ p, index }: { p: (typeof PROGRAMS)[number]; index: number }) {
  const ref = useReveal<HTMLAnchorElement>(index);
  return (
    <Link
      ref={ref}
      href={`/services/${p.slug}`}
      style={{ position: 'relative', display: 'flex', flexDirection: 'column', minHeight: 380, borderRadius: 22, overflow: 'hidden', background: '#151716', color: '#f2f2f3', transition: 'border-color .3s' }}
    >
      <div style={{ position: 'absolute', inset: 0 }}>
        <Image src={p.img} alt={p.t} fill style={{ objectFit: 'cover' }} sizes="(min-width: 900px) 30vw, (min-width: 600px) 48vw, 100vw" />
      </div>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(0deg,rgba(13,14,13,.97) 0%,rgba(13,14,13,.86) 55%,rgba(13,14,13,.35) 100%)' }} />
      <div style={{ position: 'relative', padding: 'clamp(24px,2.6vw,32px)', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
          <span style={{ fontWeight: 700, fontSize: 13, letterSpacing: '.16em', color: '#b8e600' }}>{p.no}</span>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: 'rgba(242,242,243,.6)' }}>{p.meta}</span>
        </div>
        <h3 style={{ margin: 'auto 0 0', paddingTop: 70, fontWeight: 700, fontSize: 'clamp(24px,2.4vw,30px)', letterSpacing: '-.02em', lineHeight: 1.05, color: '#ffffff' }}>{p.t}</h3>
        <p style={{ margin: '14px 0 0', fontSize: 15, lineHeight: 1.6, color: 'rgba(242,242,243,.75)' }}>{p.d}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginTop: 18 }}>
          {p.points.map((pt) => (
            <div key={pt} style={{ display: 'flex', gap: 10, fontSize: 13.5, color: 'rgba(242,242,243,.65)' }}>
              <span style={{ color: '#b8e600' }}>·</span>{pt}
            </div>
          ))}
        </div>
        <span style={{ marginTop: 26, fontSize: 12, fontWeight: 700, color: '#b8e600' }}>{p.cta} →</span>
      </div>
    </Link>
  );
}

function Programs() {
  const headerRef = useReveal<HTMLDivElement>(0);
  return (
    <section id="programs" style={{ background: '#0d0e0d', color: '#f2f2f3' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: 'clamp(72px,9vw,128px) clamp(16px,4vw,44px)' }}>
        <div ref={headerRef}>
          <Eyebrow>Programs &amp; services</Eyebrow>
          <h2 style={{ marginTop: 14, fontWeight: 700, fontSize: 'clamp(34px,4.6vw,60px)', lineHeight: 1.04, letterSpacing: '-.03em', color: '#ffffff', maxWidth: '18ch', marginBottom: 'clamp(32px,4vw,48px)' }}>
            Pick the one that matches your goal
          </h2>
        </div>
        <div style={{ display: 'grid', gap: 'clamp(14px,1.8vw,24px)', gridTemplateColumns: 'repeat(auto-fit, minmax(290px,1fr))' }}>
          {PROGRAMS.map((p, i) => (
            <ProgramCard key={p.slug} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Challenge() {
  const [now, setNow] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [goal, setGoal] = useState(GOALS[0]);
  const [club, setClub] = useState('magarpatta-city');
  const [error, setError] = useState('');
  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const leftRef = useReveal<HTMLDivElement>(0);
  const panelRef = useReveal<HTMLDivElement>(1);

  const ms = now ? Math.max(0, BATCH - now) : 0;
  const s = Math.floor(ms / 1000);
  const pad = (n: number) => String(n).padStart(2, '0');
  const countdown = [
    { v: Math.floor(s / 86400), l: 'Days' },
    { v: pad(Math.floor(s / 3600) % 24), l: 'Hours' },
    { v: pad(Math.floor(s / 60) % 60), l: 'Minutes' },
    { v: pad(s % 60), l: 'Seconds' },
  ];

  const enrol = () => {
    let e = '';
    if (name.trim().length < 2) e = 'Please enter your full name.';
    else if (!validPhone(phone)) e = 'Enter a valid 10-digit Indian mobile number.';
    if (e) setError(e);
    else { setEnrolled(true); setError(''); }
  };
  const reset = () => { setEnrolled(false); setName(''); setPhone(''); };

  const firstName = name.trim().split(/\s+/)[0] || '';
  const clubName = clubBySlug(club)?.name || '';
  const nameBorder = error && name.trim().length < 2 ? '#ff9b8a' : 'rgba(255,255,255,.14)';
  const phoneBorder = error && !validPhone(phone) ? '#ff9b8a' : 'rgba(255,255,255,.14)';

  return (
    <section id="challenge" style={{ background: '#b8e600', color: '#0d0e0d' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: 'clamp(72px,9vw,128px) clamp(16px,4vw,44px)', display: 'grid', gap: 'clamp(40px,5vw,80px)', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,400px),1fr))', alignItems: 'start' }}>
        <div ref={leftRef}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
            <span style={{ width: 28, height: 2, background: '#0d0e0d' }} />
            <span style={{ fontSize: 13, fontWeight: 600 }}>Current campaign</span>
          </div>
          <h2 style={{ fontWeight: 700, fontSize: 'clamp(38px,5.4vw,76px)', lineHeight: 1, letterSpacing: '-.035em' }}>
            90 Days. One Goal. Real Results.
          </h2>
          <p style={{ marginTop: 22, fontSize: 'clamp(16px,1.6vw,19px)', lineHeight: 1.55, maxWidth: '46ch', fontWeight: 500 }}>
            A coached 12-week block with measured checkpoints. Body composition, nutrition and programming reviewed every fortnight by your trainer.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(72px,1fr))', gap: 12, marginTop: 34 }}>
            {countdown.map((c) => (
              <div key={c.l} style={{ border: '1.5px solid #0d0e0d', borderRadius: 14, padding: '16px 14px', textAlign: 'center', background: 'rgba(255,255,255,.24)' }}>
                <div style={{ fontWeight: 700, fontSize: 'clamp(28px,3.2vw,42px)', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{c.v}</div>
                <div style={{ marginTop: 6, fontSize: 10.5, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase' }}>{c.l}</div>
              </div>
            ))}
          </div>
          <p style={{ margin: '16px 0 0', fontSize: 13.5, fontWeight: 600 }}>
            Until the next batch starts — 1 October 2026. 38 of 60 places taken across Pune clubs.
          </p>
          <div style={{ marginTop: 12, height: 4, borderRadius: 999, background: 'rgba(13,14,13,.2)' }}>
            <div style={{ height: '100%', borderRadius: 999, width: `${Math.round((38 / 60) * 100)}%`, background: '#0d0e0d' }} />
          </div>
        </div>

        <div ref={panelRef} style={{ padding: 'clamp(26px,3vw,40px)', borderRadius: 28, background: '#0d0e0d', color: '#f2f2f3', border: '1.5px solid rgba(0,0,0,.2)' }}>
          {!enrolled ? (
            <div>
              <Eyebrow>Reserve your place</Eyebrow>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 16 }}>
                <span style={{ fontWeight: 700, fontSize: 'clamp(36px,4.4vw,52px)', lineHeight: 0.95, color: '#ffffff' }}>₹11,999</span>
                <span style={{ fontSize: 14, color: 'rgba(242,242,243,.6)' }}>for the full 12 weeks</span>
              </div>
              <p style={{ margin: '12px 0 0', fontSize: 14, color: 'rgba(242,242,243,.62)' }}>Open to members and non-members. Existing members pay ₹8,999.</p>
              <div style={{ display: 'grid', gap: 10, marginTop: 24 }}>
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
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  aria-label="Goal"
                  style={{ width: '100%', background: '#1b1d1c', border: '1px solid rgba(255,255,255,.14)', borderRadius: 14, color: '#f2f2f3', fontFamily: 'inherit', fontSize: 15, padding: '15px 16px', outline: 0 }}
                >
                  {GOALS.map((g) => (
                    <option key={g} value={g}>Goal: {g}</option>
                  ))}
                </select>
                <select
                  value={club}
                  onChange={(e) => setClub(e.target.value)}
                  aria-label="Choose your club"
                  style={{ width: '100%', background: '#1b1d1c', border: '1px solid rgba(255,255,255,.14)', borderRadius: 14, color: '#f2f2f3', fontFamily: 'inherit', fontSize: 15, padding: '15px 16px', outline: 0 }}
                >
                  {CLUBS.map((c) => (
                    <option key={c.slug} value={c.slug}>Club: ABS {c.name} · {c.cityShort}</option>
                  ))}
                </select>
                {error && <div style={{ fontSize: 13, color: '#ff9b8a' }}>{error}</div>}
                <button
                  type="button"
                  onClick={enrol}
                  style={{ width: '100%', background: '#b8e600', color: '#0d0e0d', border: 0, borderRadius: 999, fontFamily: 'inherit', fontSize: 14, fontWeight: 700, padding: 18, cursor: 'pointer', transition: 'background .25s' }}
                >
                  Enrol in the challenge
                </button>
              </div>
              <p style={{ margin: '14px 0 0', fontSize: 12.5, color: 'rgba(242,242,243,.45)' }}>
                A coach calls you within 24 hours to schedule your baseline assessment.
              </p>
            </div>
          ) : (
            <div style={{ padding: '24px 0', textAlign: 'center', minHeight: 420, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: '#b8e600', margin: '0 auto' }} />
              <div style={{ marginTop: 22, fontWeight: 700, fontSize: 30, letterSpacing: '-.02em', color: '#ffffff' }}>You are on the list, {firstName}</div>
              <p style={{ margin: '14px auto 0', fontSize: 15, lineHeight: 1.6, color: 'rgba(242,242,243,.7)', maxWidth: '36ch' }}>
                A coach from ABS {clubName} will call {phone} within 24 hours to book your baseline assessment for the {goal.toLowerCase()} track.
              </p>
              <Link href={`/clubs/${club}`} style={{ display: 'inline-block', marginTop: 24, fontSize: 12, fontWeight: 700, color: '#b8e600' }}>
                See your club →
              </Link>
              <button
                type="button"
                onClick={reset}
                style={{ alignSelf: 'center', marginTop: 16, background: 'transparent', border: '1px solid rgba(255,255,255,.25)', borderRadius: 999, color: '#f2f2f3', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, padding: '12px 20px', cursor: 'pointer' }}
              >
                Enrol someone else
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function bmiInfo(bmi: number) {
  if (bmi < 18.5) return { cat: 'Underweight', color: '#7fa8ff', advice: 'A strength program with nutrition support can help you build healthy weight.', cta: 'Strength & Conditioning', slug: 'strength' };
  if (bmi < 25) return { cat: 'Healthy', color: '#b8e600', advice: 'You are in the healthy range. Keep building strength and mobility to stay there.', cta: 'Strength & Conditioning', slug: 'strength' };
  if (bmi < 30) return { cat: 'Overweight', color: '#ffc94d', advice: 'A structured plan with training and diet guidance works best from here.', cta: 'Weight Loss program', slug: 'weight-loss' };
  return { cat: 'Obese', color: '#ff8a6b', advice: 'Start with a coached program. The 90-Day Challenge gives you a plan, diet and tracking.', cta: '90-Day Challenge', slug: '90-day' };
}

function Bmi() {
  const [h, setH] = useState(170);
  const [w, setW] = useState(72);
  const bmi = w / Math.pow(h / 100, 2);
  const info = bmiInfo(bmi);
  const pos = Math.min(100, Math.max(0, ((bmi - 10) / 30) * 100));

  return (
    <section id="bmi" style={{ background: '#f2f2f3', color: '#1d1f20' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: 'clamp(72px,9vw,128px) clamp(16px,4vw,44px)', display: 'grid', gap: 'clamp(32px,5vw,72px)', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,340px),1fr))', alignItems: 'center' }}>
        <div>
          <Eyebrow dark={false}>BMI Calculator</Eyebrow>
          <h2 style={{ marginTop: 14, fontWeight: 700, fontSize: 'clamp(34px,4.6vw,60px)', lineHeight: 1.04, letterSpacing: '-.03em', color: '#0d0e0d', maxWidth: '14ch' }}>
            Know your starting point.
          </h2>
          <p style={{ margin: '18px 0 0', fontSize: 15.5, lineHeight: 1.6, maxWidth: '46ch', color: 'rgba(29,31,32,.75)' }}>
            Body Mass Index is a quick first check. At your free assessment an ABS coach measures body composition for the full picture.
          </p>
          <div style={{ marginTop: 28, display: 'grid', gap: 18 }}>
            <label style={{ display: 'grid', gap: 8 }}>
              <span style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' }}>
                Height <span>{h} cm</span>
              </span>
              <input type="range" min={130} max={210} value={h} onChange={(e) => setH(+e.target.value)} style={{ width: '100%', accentColor: '#0d0e0d' }} />
            </label>
            <label style={{ display: 'grid', gap: 8 }}>
              <span style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' }}>
                Weight <span>{w} kg</span>
              </span>
              <input type="range" min={35} max={160} value={w} onChange={(e) => setW(+e.target.value)} style={{ width: '100%', accentColor: '#0d0e0d' }} />
            </label>
          </div>
        </div>
        <div style={{ background: '#0d0e0d', color: '#f2f2f3', padding: 'clamp(26px,3vw,40px)', borderRadius: 28 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(242,242,243,.6)' }}>Your BMI</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, flexWrap: 'wrap', marginTop: 8 }}>
            <span style={{ fontWeight: 800, fontSize: 'clamp(56px,7vw,92px)', lineHeight: 0.9, color: '#ffffff' }}>{bmi.toFixed(1)}</span>
            <span style={{ fontWeight: 700, fontSize: 24, color: info.color }}>{info.cat}</span>
          </div>
          <div style={{ position: 'relative', marginTop: 24, height: 10, borderRadius: 999, overflow: 'hidden', display: 'grid', gridTemplateColumns: '18.5fr 6.5fr 5fr 10fr' }}>
            <span style={{ background: '#7fa8ff' }} />
            <span style={{ background: '#b8e600' }} />
            <span style={{ background: '#ffc94d' }} />
            <span style={{ background: '#ff8a6b' }} />
            <span style={{ position: 'absolute', top: -6, left: `${pos}%`, width: 3, height: 22, background: '#ffffff', marginLeft: -1 }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 11, color: 'rgba(242,242,243,.55)' }}>
            <span>Under 18.5</span><span>18.5–24.9</span><span>25–29.9</span><span>30+</span>
          </div>
          <p style={{ margin: '22px 0 0', fontSize: 14.5, lineHeight: 1.6, color: 'rgba(242,242,243,.75)' }}>{info.advice}</p>
          <Link href={`/services/${info.slug}`} style={{ display: 'inline-block', marginTop: 18, fontSize: 12, fontWeight: 700, color: '#b8e600' }}>
            {info.cta} →
          </Link>
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  const ref = useReveal<HTMLDivElement>(0);
  return (
    <section style={{ background: '#0d0e0d', borderTop: '1px solid rgba(255,255,255,.14)' }}>
      <div ref={ref} style={{ maxWidth: 1320, margin: '0 auto', padding: 'clamp(72px,9vw,128px) clamp(16px,4vw,44px)', display: 'flex', flexWrap: 'wrap', gap: 26, alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontWeight: 700, fontSize: 'clamp(28px,3.8vw,48px)', lineHeight: 1.02, letterSpacing: '-.03em', maxWidth: '18ch', color: '#ffffff' }}>
            Not sure which program is right?
          </h2>
          <p style={{ margin: '14px 0 0', fontSize: 15.5, color: 'rgba(242,242,243,.72)', maxWidth: '50ch' }}>
            Book a free consultation. A coach reviews your history, your schedule and your goal, then tells you honestly what will work.
          </p>
        </div>
        <Link href="/#join" style={{ background: '#b8e600', color: '#0d0e0d', fontSize: 14, fontWeight: 700, borderRadius: 999, padding: '18px 30px', flexShrink: 0 }}>
          Get Fitness Advice
        </Link>
      </div>
    </section>
  );
}

export default function TrainersProgramsContent() {
  return (
    <>
      <Hero />
      <Roster />
      <Programs />
      <Challenge />
      <Bmi />
      <FinalCta />
    </>
  );
}
