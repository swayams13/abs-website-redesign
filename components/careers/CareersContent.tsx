'use client';
import { useState } from 'react';
import Image from 'next/image';
import { validPhone } from '@/lib/data';

// Jobs are placeholders, ported from the design reference — README flags these as needing real openings.
const JOBS = [
  { title: 'Personal Trainer', dept: 'Coaching', city: 'Pune', type: 'Full-time', exp: '1–3 yrs', desc: 'Coach members one-on-one, build programs and track progress every fortnight. Work alongside senior coaches on the floor.', req: ['A recognised fitness certification', 'Strong basics in strength training and nutrition', 'Clear communication in English, Hindi or Marathi'] },
  { title: 'Group Exercise Instructor', dept: 'Coaching', city: 'Pune', type: 'Part-time', exp: '1+ yrs', desc: 'Run HIIT, Zumba, spin or functional classes morning and evening. Keep energy high and form safe.', req: ['Certification in your class format', 'Experience leading groups', 'Comfortable with early mornings'] },
  { title: 'Yoga Instructor', dept: 'Coaching', city: 'Mumbai', type: 'Part-time', exp: '2+ yrs', desc: 'Lead Hatha and mobility sessions and support members recovering from injury.', req: ['Yoga teacher certification', 'Understanding of modifications for beginners'] },
  { title: 'Fitness Trainer (Floor)', dept: 'Coaching', city: 'Nashik', type: 'Full-time', exp: '0–2 yrs', desc: 'Guide members on the gym floor, correct form and help new members settle in.', req: ['Fitness certification or ongoing course', 'Passion for helping people start'] },
  { title: 'Club Manager', dept: 'Operations', city: 'Pune', type: 'Full-time', exp: '4+ yrs', desc: 'Run the day-to-day of an ABS club: team, members, sales targets and service standards.', req: ['Experience managing a gym or hospitality unit', 'Team leadership', 'Target-driven mindset'] },
  { title: 'Fitness Consultant (Sales)', dept: 'Sales', city: 'Kolhapur', type: 'Full-time', exp: '1–3 yrs', desc: 'Take prospects on club tours, explain memberships and programs, and follow up leads.', req: ['Sales or customer-facing experience', 'Good communication skills'] },
  { title: 'Front Desk Executive', dept: 'Operations', city: 'Mumbai', type: 'Full-time', exp: '0–2 yrs', desc: 'Welcome members, manage check-ins, bookings and enquiries.', req: ['Friendly and organised', 'Basic computer skills'] },
  { title: 'Nutritionist', dept: 'Coaching', city: 'Pune', type: 'Full-time', exp: '2+ yrs', desc: 'Create diet plans for 90-Day Challenge batches and personal training clients.', req: ['Degree in nutrition or dietetics', 'Experience with fat-loss and sports nutrition'] },
] as const;

const PERKS = [
  ['Certification support', 'Workshops, certifications and industry exposure, led by founder Abhimanyu Sable.'],
  ['Grow with 35+ clubs', 'Move from trainer to senior coach to club manager across the ABS network.'],
  ['Real results', 'Coach a lakh-strong community with structured programs and systems.'],
  ['Respected career', 'We believe fitness professionals should be respected and supported as a structured career.'],
] as const;

const DEPTS = ['All departments', 'Coaching', 'Operations', 'Sales'];
const JOB_CITIES = ['All cities', 'Pune', 'Mumbai', 'Nashik', 'Kolhapur'];
const ROLE_OPTIONS = ['General application', ...JOBS.map((j) => `${j.title} — ${j.city}`)];

const EMPTY_FIELDS = { name: '', phone: '', email: '', cert: '', cv: '' };

function Hero() {
  return (
    <section style={{ position: 'relative', minHeight: 'clamp(440px,60vh,640px)', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', background: '#0d0e0d' }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <Image src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=2200&q=80" alt="ABS coaches on the training floor" fill priority style={{ objectFit: 'cover' }} sizes="100vw" />
      </div>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(96deg,rgba(13,14,13,.97) 0%,rgba(13,14,13,.85) 48%,rgba(13,14,13,.3) 100%)' }} />
      <div style={{ position: 'relative', maxWidth: 1320, margin: '0 auto', padding: 'clamp(140px,16vw,180px) clamp(16px,4vw,44px) clamp(40px,5vw,60px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
          <span style={{ width: 28, height: 2, background: '#b8e600' }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: '#b8e600' }}>Careers at ABS</span>
        </div>
        <h1 style={{ fontWeight: 800, fontSize: 'clamp(42px,7vw,96px)', lineHeight: 0.96, letterSpacing: '-.035em', color: '#ffffff', maxWidth: '13ch' }}>
          Make fitness your career.
        </h1>
        <p style={{ marginTop: 22, fontSize: 'clamp(16px,1.5vw,19px)', lineHeight: 1.55, maxWidth: '52ch', color: 'rgba(242,242,243,.84)' }}>
          Join a team of fitness professionals across 35+ clubs. We invest in education, certifications, workshops, and industry exposure for our team.
        </p>
      </div>
    </section>
  );
}

function Perks() {
  return (
    <section style={{ background: '#f2f2f3', color: '#1d1f20' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: 'clamp(56px,8vw,104px) clamp(16px,4vw,44px)', display: 'grid', gap: 0, gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))' }}>
        {PERKS.map(([t, d], i) => (
          <div key={t} style={{ padding: 'clamp(20px,2.4vw,24px) clamp(20px,2.4vw,24px) clamp(20px,2.4vw,24px) 0', borderTop: '1.5px solid #1d1f20' }}>
            <div style={{ fontWeight: 700, fontSize: 14, letterSpacing: '.2em', color: '#4d5a00' }}>{String(i + 1).padStart(2, '0')}</div>
            <div style={{ marginTop: 12, fontWeight: 700, textTransform: 'uppercase', fontSize: 25, lineHeight: 1, color: '#0d0e0d' }}>{t}</div>
            <p style={{ marginTop: 10, fontSize: 14.5, lineHeight: 1.55, color: 'rgba(29,31,32,.75)' }}>{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Openings({ onApply }: { onApply: (role: string) => void }) {
  const [dept, setDept] = useState('All departments');
  const [city, setCity] = useState('All cities');
  const [open, setOpen] = useState(-1);

  const list = JOBS.map((j, i) => ({ ...j, i })).filter((j) => (dept === 'All departments' || j.dept === dept) && (city === 'All cities' || j.city === city));

  return (
    <section id="openings" style={{ background: '#0d0e0d' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: 'clamp(56px,8vw,112px) clamp(16px,4vw,44px)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24 }}>
          <h2 style={{ fontWeight: 800, textTransform: 'uppercase', fontSize: 'clamp(34px,5vw,64px)', lineHeight: 0.94, letterSpacing: '-.02em', color: '#ffffff' }}>
            Open roles <span style={{ color: '#b8e600' }}>{String(list.length).padStart(2, '0')}</span>
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            <select value={dept} onChange={(e) => setDept(e.target.value)} aria-label="Department" style={{ background: '#0d0e0d', border: '1px solid rgba(255,255,255,.3)', borderRadius: 12, color: '#f2f2f3', fontFamily: 'inherit', fontSize: 14, padding: '12px 14px', outline: 0 }}>
              {DEPTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <select value={city} onChange={(e) => setCity(e.target.value)} aria-label="City" style={{ background: '#0d0e0d', border: '1px solid rgba(255,255,255,.3)', borderRadius: 12, color: '#f2f2f3', fontFamily: 'inherit', fontSize: 14, padding: '12px 14px', outline: 0 }}>
              {JOB_CITIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ marginTop: 32, borderTop: '1px solid rgba(255,255,255,.24)' }}>
          {list.map((j) => {
            const isOpen = open === j.i;
            return (
              <div key={j.title + j.city} style={{ borderBottom: '1px solid rgba(255,255,255,.14)' }}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : j.i)}
                  style={{ width: '100%', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: 16, alignItems: 'center', background: 'transparent', border: 0, color: '#f2f2f3', padding: '22px 0', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}
                >
                  <span>
                    <span style={{ display: 'block', fontWeight: 700, textTransform: 'uppercase', fontSize: 'clamp(20px,2.4vw,28px)', lineHeight: 1, color: '#ffffff' }}>{j.title}</span>
                    <span style={{ display: 'block', marginTop: 8, fontSize: 13.5, color: 'rgba(242,242,243,.6)' }}>{j.dept} · {j.city} · {j.type} · {j.exp}</span>
                  </span>
                  <span style={{ flexShrink: 0, fontSize: 22, color: '#b8e600' }}>{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div style={{ padding: '0 0 28px', display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(260px,1fr))' }}>
                    <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.65, color: 'rgba(242,242,243,.75)' }}>{j.desc}</p>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: '#b8e600', marginBottom: 10 }}>You&rsquo;ll need</div>
                      {j.req.map((r) => (
                        <div key={r} style={{ display: 'flex', gap: 10, alignItems: 'baseline', padding: '6px 0', fontSize: 14.5, color: '#f2f2f3' }}>
                          <span style={{ width: 6, height: 6, flexShrink: 0, background: '#b8e600', display: 'inline-block' }} />
                          {r}
                        </div>
                      ))}
                      <a
                        href="#apply"
                        onClick={() => onApply(`${j.title} — ${j.city}`)}
                        style={{ display: 'inline-block', marginTop: 18, background: '#b8e600', color: '#0d0e0d', fontSize: 12, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', padding: '14px 22px', borderRadius: 999 }}
                      >
                        Apply for this role
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          {list.length === 0 && (
            <div style={{ padding: '36px 0', fontSize: 15, color: 'rgba(242,242,243,.6)' }}>
              No openings match right now. Send a general application below and we&rsquo;ll keep you in mind.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Apply({ role, setRole }: { role: string; setRole: (v: string) => void }) {
  const [form, setForm] = useState(EMPTY_FIELDS);
  const [tried, setTried] = useState(false);
  const [sent, setSent] = useState(false);

  const set = <K extends keyof typeof EMPTY_FIELDS>(k: K, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const errors = () => {
    const e: Record<string, boolean> = {};
    if (form.name.trim().length < 2) e.name = true;
    if (!validPhone(form.phone)) e.phone = true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = true;
    if (!form.cv) e.cv = true;
    return e;
  };
  const err = tried ? errors() : {};
  const hasErr = Object.keys(err).length > 0;
  const border = (k: string) => (err[k as keyof typeof err] ? '#ff9b8a' : 'rgba(255,255,255,.28)');

  const send = () => {
    setTried(true);
    if (Object.keys(errors()).length === 0) setSent(true);
  };
  const reset = () => { setForm(EMPTY_FIELDS); setRole('General application'); setTried(false); setSent(false); };

  const inputStyle: React.CSSProperties = { width: '100%', background: 'transparent', border: '1px solid', borderRadius: 14, color: '#f2f2f3', fontFamily: 'inherit', fontSize: 15, padding: '15px 16px', outline: 0, transition: 'border-color .2s' };

  return (
    <section id="apply" style={{ background: '#151716', borderTop: '1px solid rgba(255,255,255,.14)' }}>
      <div style={{ maxWidth: 880, margin: '0 auto', padding: 'clamp(56px,8vw,104px) clamp(16px,4vw,44px)' }}>
        <h2 style={{ fontWeight: 800, textTransform: 'uppercase', fontSize: 'clamp(34px,4.6vw,60px)', lineHeight: 0.94, letterSpacing: '-.02em', color: '#ffffff' }}>Apply</h2>

        {!sent ? (
          <div style={{ marginTop: 28, display: 'grid', gap: 12 }}>
            <select value={role} onChange={(e) => setRole(e.target.value)} aria-label="Role" style={{ width: '100%', background: '#151716', border: '1px solid rgba(255,255,255,.28)', borderRadius: 14, color: '#f2f2f3', fontFamily: 'inherit', fontSize: 15, padding: '15px 16px', outline: 0 }}>
              {ROLE_OPTIONS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))' }}>
              <input type="text" value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Full name *" aria-label="Full name" style={{ ...inputStyle, borderColor: border('name') }} />
              <input type="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="Mobile number *" aria-label="Mobile number" style={{ ...inputStyle, borderColor: border('phone') }} />
              <input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="Email *" aria-label="Email" style={{ ...inputStyle, borderColor: border('email') }} />
              <input type="text" value={form.cert} onChange={(e) => set('cert', e.target.value)} placeholder="Certifications (ACE, ACSM, K11…)" aria-label="Certifications" style={{ ...inputStyle, borderColor: 'rgba(255,255,255,.28)' }} />
            </div>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, border: `1px dashed ${err.cv ? '#ff9b8a' : 'rgba(255,255,255,.35)'}`, borderRadius: 14, padding: 16, cursor: 'pointer' }}>
              <span style={{ fontSize: 14.5, color: 'rgba(242,242,243,.8)' }}>{form.cv || 'PDF or Word, up to 5 MB'}</span>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: '#b8e600' }}>Upload CV</span>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => { const file = e.target.files?.[0]; if (file) set('cv', file.name); }}
                style={{ display: 'none' }}
              />
            </label>
            {hasErr && <div style={{ fontSize: 13, color: '#ff9b8a' }}>Please fill the highlighted fields and attach your CV.</div>}
            <button
              type="button"
              onClick={send}
              style={{ marginTop: 4, background: '#b8e600', color: '#0d0e0d', border: 0, borderRadius: 999, fontFamily: 'inherit', fontSize: 13, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', padding: 18, cursor: 'pointer', transition: 'background .25s' }}
            >
              Submit application
            </button>
          </div>
        ) : (
          <div style={{ marginTop: 28, border: '1px solid rgba(255,255,255,.24)', borderRadius: 22, padding: 32 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.22em', textTransform: 'uppercase', color: '#b8e600' }}>Application received</div>
            <div style={{ marginTop: 12, fontWeight: 700, textTransform: 'uppercase', fontSize: 36, lineHeight: 0.95, color: '#ffffff' }}>
              Thanks, {form.name.trim().split(/\s+/)[0] || ''}.
            </div>
            <p style={{ marginTop: 12, fontSize: 15, lineHeight: 1.6, color: 'rgba(242,242,243,.7)' }}>
              Our HR team will review your application for {role} and get in touch at {form.email}.
            </p>
            <button
              type="button"
              onClick={reset}
              style={{ marginTop: 20, background: 'transparent', border: '1px solid rgba(255,255,255,.3)', borderRadius: 999, color: '#f2f2f3', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', padding: '12px 18px', cursor: 'pointer' }}
            >
              Apply for another role
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default function CareersContent() {
  const [role, setRole] = useState('General application');

  return (
    <>
      <Hero />
      <Perks />
      <Openings onApply={setRole} />
      <Apply role={role} setRole={setRole} />
    </>
  );
}
