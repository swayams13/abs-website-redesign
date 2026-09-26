'use client';
import { useState } from 'react';
import Link from 'next/link';
import { CLUBS, PHONE, PHONE_HREF, EMAIL, validPhone } from '@/lib/data';

const CHANNELS = [
  { l: 'Call', v: PHONE, href: PHONE_HREF },
  { l: 'WhatsApp', v: PHONE, href: 'https://wa.me/919763215051' },
  { l: 'Email', v: EMAIL, href: `mailto:${EMAIL}` },
  { l: 'Franchise', v: 'Franchise enquiries →', href: '/franchise#apply' },
];

const TOPICS = ['Membership', 'Personal training', '90-Day Challenge', 'Franchise', 'Careers', 'Feedback'];
const CLUB_OPTIONS = CLUBS.map((c) => `ABS ${c.name} · ${c.cityShort}`);

const FAQ: [string, string, string][] = [
  ['Membership', 'Can I use my membership at other ABS clubs?', 'Yes. The ABS Passport Program gives every member with a valid card guest access at any other ABS club.'],
  ['Membership', 'Do I need to book the free tour?', 'No, you can walk in any time the club is open. Booking guarantees a coach is free to walk you through the floor, the programs and a plan for your goal.'],
  ['Membership', 'What are the club timings?', 'Clubs are open 5:00 AM – 11:00 PM. Timings can vary slightly by club; check your club page.'],
  ['Membership', 'Can I freeze my membership?', 'Speak to your club’s front desk. Freeze options depend on your plan.'],
  ['Training', 'I’m a complete beginner. Where do I start?', 'Start with a free assessment. A coach will recommend strength basics, group classes or personal training depending on your goal.'],
  ['Training', 'Are group classes included?', 'Yes, group classes like HIIT, yoga, spin and Zumba are included for members. See the time table for your club.'],
  ['Training', 'Do you offer diet guidance?', 'Yes. Nutrition guidance is part of personal training, weight loss programs and the 90-Day Challenge.'],
  ['90-Day Challenge', 'What is the 90-Day Challenge?', 'A coached 90-day weight loss program. Lose weight. Gain strength. Stay consistent. Body composition is tracked from start to finish.'],
  ['90-Day Challenge', 'When does the next batch start?', 'New batches start regularly. Check the banner on the home page or call +91 97632 15051.'],
  ['Franchise', 'How can I open an ABS franchise?', 'Visit the ABS Gym Franchise page for investment details and send an enquiry. The franchise team will call you.'],
  ['Careers', 'How do I apply for a job at ABS?', 'See open roles on the Careers page and apply with your CV.'],
];
const CATEGORIES = ['All', 'Membership', 'Training', '90-Day Challenge', 'Franchise', 'Careers'];

function darkChip(active: boolean): React.CSSProperties {
  return {
    fontFamily: 'inherit', fontSize: 11.5, fontWeight: 700, padding: '10px 15px', borderRadius: 999, cursor: 'pointer',
    border: `1px solid ${active ? '#b8e600' : 'rgba(255,255,255,.24)'}`, background: active ? '#b8e600' : 'transparent', color: active ? '#0d0e0d' : '#f2f2f3',
    transition: 'background .2s, color .2s, border-color .2s',
  };
}

function lightChip(active: boolean): React.CSSProperties {
  return {
    fontFamily: 'inherit', fontSize: 11.5, fontWeight: 700, padding: '10px 15px', borderRadius: 999, cursor: 'pointer',
    border: '1.5px solid #0d0e0d', background: active ? '#0d0e0d' : 'transparent', color: active ? '#b8e600' : '#0d0e0d',
    transition: 'background .2s, color .2s',
  };
}

const EMPTY_FORM = { name: '', phone: '', email: '', club: '', msg: '' };

function ContactForm() {
  const [topic, setTopic] = useState(TOPICS[0]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [tried, setTried] = useState(false);
  const [sent, setSent] = useState(false);

  const errors = () => {
    const e: Record<string, boolean> = {};
    if (form.name.trim().length < 2) e.name = true;
    if (!validPhone(form.phone)) e.phone = true;
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = true;
    if (form.msg.trim().length < 3) e.msg = true;
    return e;
  };
  const err = tried ? errors() : {};
  const border = (k: string) => (err[k] ? '#ff9b8a' : 'rgba(255,255,255,.14)');

  const send = () => {
    setTried(true);
    if (Object.keys(errors()).length === 0) setSent(true);
  };
  const reset = () => { setForm(EMPTY_FORM); setTried(false); setSent(false); };

  const inputStyle: React.CSSProperties = { width: '100%', background: 'rgba(255,255,255,.04)', border: '1px solid', borderRadius: 14, color: '#f2f2f3', fontFamily: 'inherit', fontSize: 15, padding: '15px 16px', outline: 0, transition: 'border-color .2s' };

  return (
    <div style={{ position: 'relative', border: '1px solid rgba(255,255,255,.16)', borderRadius: 28, padding: 'clamp(24px,3vw,40px)', background: '#151716' }}>
      {!sent ? (
        <div style={{ display: 'grid', gap: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(242,242,243,.6)' }}>
            I&rsquo;m contacting you about
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
            {TOPICS.map((t) => (
              <button key={t} type="button" onClick={() => setTopic(t)} style={darkChip(topic === t)}>
                {t}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Full name *"
            aria-label="Full name"
            style={{ ...inputStyle, borderColor: border('name') }}
          />
          <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))' }}>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              placeholder="Mobile number *"
              aria-label="Mobile number"
              style={{ ...inputStyle, borderColor: border('phone') }}
            />
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              placeholder="Email"
              aria-label="Email"
              style={{ ...inputStyle, borderColor: border('email') }}
            />
          </div>
          <select
            value={form.club}
            onChange={(e) => setForm((f) => ({ ...f, club: e.target.value }))}
            aria-label="Nearest club"
            style={{ width: '100%', background: '#1b1d1c', border: '1px solid rgba(255,255,255,.14)', borderRadius: 14, color: '#f2f2f3', fontFamily: 'inherit', fontSize: 15, padding: '15px 16px', outline: 0 }}
          >
            <option value="">Nearest club (optional)</option>
            {CLUB_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
          <textarea
            value={form.msg}
            onChange={(e) => setForm((f) => ({ ...f, msg: e.target.value }))}
            rows={4}
            placeholder="Your message *"
            aria-label="Your message"
            style={{ ...inputStyle, borderColor: border('msg'), resize: 'vertical' }}
          />
          {Object.keys(err).length > 0 && <div style={{ fontSize: 13, color: '#ff9b8a' }}>Please fill the highlighted fields.</div>}
          <button
            type="button"
            onClick={send}
            style={{ background: '#b8e600', color: '#0d0e0d', border: 0, borderRadius: 999, fontFamily: 'inherit', fontSize: 14, fontWeight: 700, padding: 18, cursor: 'pointer', transition: 'background .25s' }}
          >
            Send message
          </button>
        </div>
      ) : (
        <div style={{ minHeight: 320, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: '#b8e600' }}>Message received</div>
          <div style={{ marginTop: 14, fontWeight: 700, fontSize: 'clamp(28px,3.4vw,40px)', lineHeight: 1.05, letterSpacing: '-.02em', color: '#ffffff' }}>
            Thanks, {form.name.trim().split(/\s+/)[0] || ''}.
          </div>
          <p style={{ marginTop: 14, fontSize: 15, lineHeight: 1.6, color: 'rgba(242,242,243,.7)' }}>
            Our team will call {form.phone} about your {topic.toLowerCase()} enquiry soon.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{ alignSelf: 'flex-start', marginTop: 22, background: 'transparent', border: '1px solid rgba(255,255,255,.25)', borderRadius: 999, color: '#f2f2f3', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, padding: '12px 20px', cursor: 'pointer' }}
          >
            Send another
          </button>
        </div>
      )}
    </div>
  );
}

function Hero() {
  return (
    <section style={{ background: '#0d0e0d', color: '#f2f2f3' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '140px clamp(16px,4vw,44px) clamp(72px,9vw,128px)', display: 'grid', gap: 'clamp(36px,5vw,72px)', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,360px),1fr))', alignItems: 'start' }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#b8e600' }}>Contact us</div>
          <h1 style={{ marginTop: 16, fontWeight: 800, fontSize: 'clamp(46px,7vw,92px)', lineHeight: 0.96, letterSpacing: '-.035em', color: '#ffffff' }}>
            Talk to ABS.
          </h1>
          <p style={{ marginTop: 18, fontSize: 16, lineHeight: 1.6, maxWidth: '46ch', color: 'rgba(242,242,243,.72)' }}>
            Submit your details and our ABS Fitness team will contact you soon.
          </p>
          <div style={{ marginTop: 36, borderTop: '1px solid rgba(255,255,255,.16)' }}>
            {CHANNELS.map((c) => (
              <a key={c.l} href={c.href} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 16, alignItems: 'baseline', padding: '18px 0', borderBottom: '1px solid rgba(255,255,255,.1)', color: '#f2f2f3' }}>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(242,242,243,.55)' }}>{c.l}</span>
                <span style={{ fontWeight: 600, fontSize: 'clamp(18px,2vw,22px)', letterSpacing: '-.01em' }}>{c.v}</span>
              </a>
            ))}
          </div>
          <div style={{ marginTop: 26, fontSize: 14.5, lineHeight: 1.7, color: 'rgba(242,242,243,.6)' }}>
            Head office — Pune, Maharashtra.
            <br />
            Clubs open 5:00 AM – 11:00 PM, 7 days a week.
            <br />
            <Link href="/locations" style={{ color: '#b8e600' }}>Find your nearest club →</Link>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}

function Faq() {
  const [cat, setCat] = useState('All');
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(0);

  const needle = q.trim().toLowerCase();
  const faqs = FAQ.map((x, i) => ({ i, cat: x[0], q: x[1], a: x[2] })).filter(
    (x) => (cat === 'All' || x.cat === cat) && (!needle || (x.q + x.a).toLowerCase().includes(needle))
  );

  return (
    <section id="faq" style={{ background: '#f2f2f3', color: '#1d1f20' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(64px,8vw,112px) clamp(16px,4vw,44px)' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#4d5a00' }}>Frequently asked questions</div>
        <h2 style={{ marginTop: 14, fontWeight: 700, fontSize: 'clamp(34px,4.6vw,60px)', lineHeight: 1.04, letterSpacing: '-.03em' }}>
          Got questions?
        </h2>
        <div style={{ marginTop: 28, display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {CATEGORIES.map((c) => (
              <button key={c} type="button" onClick={() => setCat(c)} style={lightChip(cat === c)}>
                {c}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search questions"
            aria-label="Search questions"
            style={{ minWidth: 220, background: 'transparent', border: 0, borderBottom: '2px solid #1d1f20', color: '#1d1f20', fontFamily: 'inherit', fontSize: 16, padding: '10px 2px', outline: 0 }}
          />
        </div>
        <div style={{ marginTop: 28, borderTop: '1.5px solid #1d1f20' }}>
          {faqs.map((f) => {
            const isOpen = open === f.i;
            return (
              <div key={f.i} style={{ borderBottom: '1px solid rgba(29,31,32,.2)' }}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : f.i)}
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, textAlign: 'left', background: 'transparent', border: 0, color: '#0d0e0d', padding: '20px 0', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, fontSize: 'clamp(18px,2vw,21px)' }}
                >
                  {f.q}
                  <span style={{ flexShrink: 0, fontSize: 22, color: '#4d5a00' }}>{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <p style={{ padding: '0 40px 22px 0', fontSize: 15.5, lineHeight: 1.65, color: 'rgba(29,31,32,.8)' }}>{f.a}</p>
                )}
              </div>
            );
          })}
          {faqs.length === 0 && (
            <div style={{ padding: '28px 0', color: 'rgba(29,31,32,.7)' }}>No question matches. Send us a message above.</div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function ContactContent() {
  return (
    <>
      <Hero />
      <Faq />
    </>
  );
}
