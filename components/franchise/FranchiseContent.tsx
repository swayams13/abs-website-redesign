'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SampleTag from '@/components/ui/SampleTag';
import { sendWhatsApp } from '@/lib/whatsapp';

const HERO_STATS = [
  { v: '28', l: 'ABS clubs', sample: false },
  { v: '1,00,000+', l: 'Members served', sample: true },
  { v: '20 yrs', l: 'Brand since 2005', sample: false },
  { v: '2–3 yrs', l: 'Likely payback', sample: true },
] as const;

const WHY = [
  { t: 'Proven business formula', d: 'A club format refined across 28 ABS locations.', sample: false },
  { t: 'Easy to handle the business', d: 'Tried and tested club management systems and programs, handed over from day one.', sample: false },
  { t: 'Reputed brand name', d: 'Open under a name Maharashtra already trusts. #ItsNotGymItsLife.', sample: false },
  { t: 'Low investment model', d: 'A club sized for 1,000 – 2,000 sq ft, with equipment bought at ABS network pricing.', sample: false },
  { t: 'Highly profitable business', d: 'An anticipated 60% return on investment, with payback in 2 – 3 years.', sample: true },
] as const;

const SPECS: Record<string, { l: string; v: string; n?: string; hi?: boolean; sample?: boolean }[]> = {
  Investment: [
    { l: 'Total investment', v: '₹50 L – 1 Cr', n: 'Covers fit-out, equipment and launch. Depends on site size and city.', sample: true },
    { l: 'Franchise / brand fee', v: '₹10,00,000', n: 'One-time fee for the ABS brand, systems and setup support.', sample: true },
    { l: 'Anticipated ROI', v: '60%', n: 'Anticipated percentage return on investment.', hi: true, sample: true },
    { l: 'Payback period', v: '2 – 3 years', n: 'Likely payback of capital for a unit franchise.', hi: true, sample: true },
  ],
  Property: [
    { l: 'Floor area', v: '1,000 – 2,000 sq ft' },
    { l: 'Property type', v: 'Domestic', n: 'Commercial or mixed-use premises within the city.' },
    { l: 'Preferred location', v: 'PAN India', n: 'Tier 1 and Tier 2 cities, urban and suburban areas.' },
  ],
  Agreement: [
    { l: 'Franchise term', v: '5 years', n: 'Renewable at the end of the term.', hi: true },
    { l: 'Agreement', v: 'Standard', n: 'A standard ABS franchise agreement for every partner.' },
    { l: 'Training', v: 'Head office', n: 'Pune head office, with field assistance at your club.' },
    { l: 'Brand since', v: '2005' },
  ],
};
const TABS = ['Investment', 'Property', 'Agreement'] as const;

const ADVANTAGE = [
  ['Backing from the experts', 'Full support and backing from acclaimed professionals in the fitness business, led by founder Abhimanyu Sable.'],
  ['Site to opening day', 'Complete assistance in setting up a fitness facility right from selection of the site to the final functioning of the club.'],
  ['Club management systems', 'Benefits of using the tried and tested club management systems and programs that run every ABS club.'],
  ['Operations training', 'Focused and personalized training related to all aspects of the club operations, at head office and on site.'],
  ['Equipment at good prices', 'Help buying fitness equipment at good prices through the ABS network.'],
  ['Needs analysis', 'Need analysis and setting up systems that suit your requirements, market and site.'],
] as const;

const PROFILE = [
  'Leadership experience in a related field.',
  'A track record of success in providing the highest level of customer service and satisfaction in business.',
  'The commitment and resources essential to market and represent ABS to a swiftly expanding and diverse customer population.',
  'Entrepreneurial excellence with the zeal to become successful.',
];

const REGIONS: [string, string[]][] = [
  ['West', ['Maharashtra', 'Gujarat', 'Rajasthan', 'Goa']],
  ['North', ['Delhi', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Punjab', 'Uttarakhand']],
  ['South', ['Karnataka', 'Kerala', 'Tamil Nadu']],
  ['Central', ['Madhya Pradesh', 'Chhattisgarh', 'Bihar', 'Jharkhand']],
  ['East', ['West Bengal', 'Odisha', 'Assam', 'Sikkim', 'Meghalaya', 'Tripura', 'Mizoram', 'Manipur', 'Nagaland', 'Arunachal Pradesh']],
  ['Union Territories', ['Chandigarh', 'Pondicherry', 'Daman and Diu', 'Andaman and Nicobar', 'Lakshadweep']],
];
const ALL_STATES = [...new Set(REGIONS.flatMap((r) => r[1]).concat(['Andhra Pradesh', 'Telangana', 'Uttar Pradesh']))].sort();

const AGREEMENT_FAQ: [string, string][] = [
  ['How much does an ABS franchise cost?', 'Sample figures, not final pricing: a total investment of ₹50 lakh to ₹1 crore depending on city, site size and fit-out, plus a franchise / brand fee of ₹10,00,000.'],
  ['How much space do I need?', 'A floor area of 1,000 – 2,000 sq ft. The ABS team helps evaluate and select the site.'],
  ['How long is the franchise term?', 'The franchise term is 5 years and it is renewable. Every partner signs the standard ABS franchise agreement.'],
  ['What training do I get?', 'Training happens at the ABS head office, covering all aspects of club operations. Field assistance is available at your club.'],
  ['When can I expect payback?', 'Sample figures, not final numbers: a likely payback period of 2 – 3 years, with an anticipated ROI of 60%.'],
  ['Which cities are open?', 'ABS is expanding PAN India across Tier 1 and Tier 2 cities in the North, South, East, West, Central regions and Union Territories.'],
];

const STEPS = [
  ['Enquire', 'Send the form or call the franchise team.'],
  ['Discuss', 'A call on your city, investment and experience.'],
  ['Site evaluation', 'ABS evaluates your property or helps you find one.'],
  ['Sign & launch', 'Agreement, training, fit-out and opening day.'],
] as const;

const INVEST_OPTIONS = ['₹30 L – 50 L', '₹50 L – 1 Cr', '₹1 Cr – 2 Cr', '₹2 Cr +'];
const PROP_OPTIONS = ['Own property', 'Leased / will lease', 'Looking for one'];
const EMPTY_FORM = { name: '', phone: '', email: '', state: '', city: '', invest: '', prop: '', msg: '' };

function darkChip(active: boolean): React.CSSProperties {
  return {
    fontFamily: 'inherit', fontSize: 11.5, fontWeight: 700, padding: '10px 15px', borderRadius: 999, cursor: 'pointer',
    border: `1px solid ${active ? '#b8e600' : 'rgba(255,255,255,.24)'}`, background: active ? '#b8e600' : 'transparent', color: active ? '#0d0e0d' : '#f2f2f3',
    transition: 'background .2s, color .2s, border-color .2s',
  };
}

function Hero() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: '#0d0e0d', color: '#f2f2f3' }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <Image src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=2400&q=80" alt="Flagship ABS club interior" fill priority style={{ objectFit: 'cover' }} sizes="100vw" />
      </div>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(96deg,rgba(13,14,13,.97) 0%,rgba(13,14,13,.88) 50%,rgba(13,14,13,.4) 100%)' }} />
      <div style={{ position: 'relative', maxWidth: 1320, margin: '0 auto', padding: '140px clamp(16px,4vw,44px) clamp(56px,7vw,96px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
          <span style={{ width: 28, height: 2, background: '#b8e600' }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: '#b8e600' }}>ABS Gym Franchise</span>
        </div>
        <h1 style={{ fontWeight: 800, fontSize: 'clamp(46px,7.6vw,116px)', lineHeight: 0.96, letterSpacing: '-.035em', color: '#ffffff' }}>
          Own an ABS club<span style={{ color: '#b8e600' }}>.</span>
        </h1>
        <p style={{ marginTop: 22, fontSize: 'clamp(16px,1.6vw,19px)', lineHeight: 1.55, maxWidth: '50ch', color: 'rgba(242,242,243,.8)' }}>
          Partner with ABS Fitness, a fast-growing premium fitness brand known for discipline, results, and strong member retention. Turn your passion into a successful gym business with our proven franchise model.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 34 }}>
          <Link href="#apply" style={{ background: '#b8e600', color: '#0d0e0d', fontSize: 14, fontWeight: 700, borderRadius: 999, padding: '18px 30px' }}>
            Apply for a franchise
          </Link>
          <Link href="#model" style={{ border: '1px solid rgba(255,255,255,.35)', color: '#f2f2f3', fontSize: 14, fontWeight: 700, borderRadius: 999, padding: '18px 30px' }}>
            See the model
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px,1fr))', marginTop: 'clamp(44px,6vw,72px)', paddingTop: 26, borderTop: '1px solid rgba(255,255,255,.18)' }}>
          {HERO_STATS.map((s) => (
            <div key={s.l}>
              <div style={{ fontWeight: 700, fontSize: 'clamp(30px,3.4vw,44px)', lineHeight: 1, letterSpacing: '-.03em', color: '#ffffff' }}>{s.v}</div>
              <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(242,242,243,.6)' }}>
                {s.l}
                {s.sample && <SampleTag />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyFranchise() {
  return (
    <section style={{ background: '#f2f2f3', color: '#1d1f20' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: 'clamp(72px,9vw,128px) clamp(16px,4vw,44px)', display: 'grid', gap: 'clamp(36px,5vw,80px)', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,380px),1fr))', alignItems: 'start' }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#4d5a00' }}>Why our franchise</div>
          <h2 style={{ marginTop: 14, fontWeight: 700, fontSize: 'clamp(34px,4.6vw,60px)', lineHeight: 1.02, letterSpacing: '-.03em', maxWidth: '14ch' }}>
            Twenty years of running clubs. Now yours to run.
          </h2>
          <p style={{ marginTop: 22, fontSize: 16.5, lineHeight: 1.65, maxWidth: '52ch', color: 'rgba(29,31,32,.78)' }}>
            ABS Fitness Pvt. Ltd. is an organization focused on promoting fitness and wellness with ABS Clubs throughout India. ABS Fitness has proven experience in consulting and managing world-class facilities with cutting-edge expertise and personal touch. ABS Fitness aims to set up fitness centers and wellness clubs of ABS in active partnerships with interested organizations and individuals.
          </p>
          <div style={{ marginTop: 34, display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 18, alignItems: 'center', borderTop: '1.5px solid #1d1f20', paddingTop: 22 }}>
            <div style={{ position: 'relative', width: 76, height: 96, borderRadius: 12, overflow: 'hidden', background: '#e0e0e2' }}>
              <Image src="/assets/abhimanyu-sable.jpg" alt="Abhimanyu Sable" fill style={{ objectFit: 'cover', objectPosition: '50% 20%' }} sizes="76px" />
            </div>
            <p style={{ fontSize: 14.5, lineHeight: 1.6, color: 'rgba(29,31,32,.78)' }}>
              <strong style={{ color: '#0d0e0d' }}>Abhimanyu Sable</strong>, founder of ABS Fitness and Founder President of UHFF, India&rsquo;s first registered association of fitness club owners. 35+ years in the fitness industry.
            </p>
          </div>
        </div>
        <div style={{ borderTop: '1.5px solid #1d1f20' }}>
          {WHY.map((w, i) => (
            <div key={w.t} style={{ display: 'grid', gridTemplateColumns: '48px 1fr', gap: 16, padding: '22px 0', borderBottom: '1px solid rgba(29,31,32,.16)' }}>
              <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: '.14em', color: '#4d5a00' }}>{String(i + 1).padStart(2, '0')}</div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ fontWeight: 700, fontSize: 'clamp(20px,2vw,25px)', letterSpacing: '-.01em', lineHeight: 1.1, color: '#0d0e0d' }}>{w.t}</div>
                  {w.sample && <SampleTag />}
                </div>
                <p style={{ marginTop: 8, fontSize: 14.5, lineHeight: 1.55, color: 'rgba(29,31,32,.7)' }}>{w.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Investment() {
  const [tab, setTab] = useState<(typeof TABS)[number]>('Investment');
  return (
    <section id="model" style={{ background: '#0d0e0d', color: '#f2f2f3', borderBottom: '1px solid rgba(255,255,255,.14)' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: 'clamp(72px,9vw,128px) clamp(16px,4vw,44px)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, marginBottom: 'clamp(32px,4vw,48px)' }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#b8e600' }}>Franchise cost &amp; investment</div>
            <h2 style={{ marginTop: 14, fontWeight: 700, fontSize: 'clamp(34px,4.6vw,60px)', lineHeight: 1.02, letterSpacing: '-.03em', color: '#ffffff', maxWidth: '15ch' }}>
              The numbers, up front.
            </h2>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {TABS.map((t) => (
              <button key={t} type="button" onClick={() => setTab(t)} style={darkChip(tab === t)}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gap: 1, background: 'rgba(255,255,255,.14)', border: '1px solid rgba(255,255,255,.14)', borderRadius: 16, overflow: 'hidden', gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))' }}>
          {SPECS[tab].map((s) => (
            <div key={s.l} style={{ background: '#0d0e0d', padding: 'clamp(24px,2.8vw,36px)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(242,242,243,.55)' }}>
                {s.l}
                {s.sample && <SampleTag />}
              </div>
              <div style={{ marginTop: 14, fontWeight: 700, fontSize: 'clamp(28px,3.2vw,42px)', letterSpacing: '-.02em', lineHeight: 1, color: s.hi ? '#b8e600' : '#ffffff' }}>{s.v}</div>
              {s.n && <p style={{ marginTop: 10, fontSize: 13.5, lineHeight: 1.5, color: 'rgba(242,242,243,.6)' }}>{s.n}</p>}
            </div>
          ))}
        </div>
        <p style={{ marginTop: 18, fontSize: 12.5, lineHeight: 1.6, color: 'rgba(242,242,243,.6)', maxWidth: '80ch' }}>
          Figures are indicative and vary with city, site size and fit-out. Final terms are shared after the site evaluation and signed in the standard ABS franchise agreement.
        </p>
      </div>
    </section>
  );
}

function Advantage() {
  const [open, setOpen] = useState(0);
  return (
    <section style={{ background: '#151716', color: '#f2f2f3' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: 'clamp(72px,9vw,128px) clamp(16px,4vw,44px)', display: 'grid', gap: 'clamp(36px,5vw,72px)', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,420px),1fr))' }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#b8e600' }}>The ABS advantage</div>
          <h2 style={{ marginTop: 14, fontWeight: 700, fontSize: 'clamp(34px,4.6vw,60px)', lineHeight: 1.02, letterSpacing: '-.03em', color: '#ffffff', maxWidth: '13ch' }}>
            From site selection to opening day.
          </h2>
          <p style={{ marginTop: 22, fontSize: 16, lineHeight: 1.65, maxWidth: '46ch', color: 'rgba(242,242,243,.72)' }}>
            Full support and backing from acclaimed professionals in the fitness business, with complete assistance in setting up a fitness facility right from selection of the site to the final functioning of the club.
          </p>
          <div style={{ position: 'relative', marginTop: 34, aspectRatio: '16/10', borderRadius: 20, overflow: 'hidden', background: '#0d0e0d' }}>
            <Image src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1400&q=80" alt="Club fit-out and training session" fill style={{ objectFit: 'cover' }} sizes="(min-width: 900px) 42vw, 100vw" />
          </div>
        </div>
        <div style={{ display: 'grid', gap: 10, alignContent: 'start' }}>
          {ADVANTAGE.map(([t, d], i) => {
            const isOpen = open === i;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                style={{ textAlign: 'left', width: '100%', background: isOpen ? '#0d0e0d' : 'transparent', border: `1px solid ${isOpen ? '#b8e600' : 'rgba(255,255,255,.16)'}`, borderRadius: 16, color: '#f2f2f3', padding: '22px 24px', cursor: 'pointer', fontFamily: 'inherit', transition: 'background .25s, border-color .25s' }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr 20px', gap: 12, alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, fontSize: 14, letterSpacing: '.14em', color: '#b8e600' }}>{String(i + 1).padStart(2, '0')}</span>
                  <span style={{ fontWeight: 700, fontSize: 'clamp(18px,2vw,22px)', letterSpacing: '-.01em', lineHeight: 1.05, color: '#ffffff' }}>{t}</span>
                  <span style={{ fontSize: 20, lineHeight: 1, color: '#b8e600' }}>{isOpen ? '−' : '+'}</span>
                </div>
                {isOpen && <p style={{ margin: '12px 0 0 52px', fontSize: 14.5, lineHeight: 1.6, color: 'rgba(242,242,243,.72)' }}>{d}</p>}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FranchiseeProfile() {
  return (
    <section style={{ background: '#f2f2f3', color: '#1d1f20' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: 'clamp(72px,9vw,128px) clamp(16px,4vw,44px)' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#4d5a00' }}>Franchisee profile</div>
        <h2 style={{ marginTop: 14, fontWeight: 700, fontSize: 'clamp(34px,4.6vw,60px)', lineHeight: 1.02, letterSpacing: '-.03em', maxWidth: '18ch' }}>
          Who we&rsquo;re looking for.
        </h2>
        <div style={{ marginTop: 'clamp(32px,4vw,48px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))', borderTop: '1.5px solid #1d1f20' }}>
          {PROFILE.map((t, i) => (
            <div key={t} style={{ padding: '26px 24px 26px 0', borderBottom: '1px solid rgba(29,31,32,.16)' }}>
              <div style={{ fontWeight: 700, fontSize: 44, lineHeight: 1, color: '#b8e600', WebkitTextStroke: '1px #1d1f20' }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <p style={{ marginTop: 14, fontSize: 15.5, lineHeight: 1.55 }}>{t}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Expansion() {
  const [region, setRegion] = useState(0);
  const [name, states] = REGIONS[region];
  return (
    <section style={{ background: '#0d0e0d', color: '#f2f2f3', borderBottom: '1px solid rgba(255,255,255,.14)' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: 'clamp(72px,9vw,128px) clamp(16px,4vw,44px)', display: 'grid', gap: 'clamp(36px,5vw,72px)', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,400px),1fr))', alignItems: 'start' }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#b8e600' }}>Expansion plans</div>
          <h2 style={{ marginTop: 14, fontWeight: 700, fontSize: 'clamp(34px,4.6vw,60px)', lineHeight: 1.02, letterSpacing: '-.03em', color: '#ffffff', maxWidth: '13ch' }}>
            Open across India.
          </h2>
          <p style={{ marginTop: 22, fontSize: 16, lineHeight: 1.65, maxWidth: '46ch', color: 'rgba(242,242,243,.72)' }}>
            Franchise outlets are offered PAN India, in Tier 1 and Tier 2 cities and in urban and suburban areas. Pick a region to see the states we are opening in.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 30 }}>
            {REGIONS.map(([r], i) => (
              <button key={r} type="button" onClick={() => setRegion(i)} style={darkChip(region === i)}>
                {r}
              </button>
            ))}
          </div>
        </div>
        <div style={{ border: '1px solid rgba(255,255,255,.16)', borderRadius: 22, padding: 'clamp(24px,3vw,40px)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, borderBottom: '1px solid rgba(255,255,255,.16)', paddingBottom: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 'clamp(26px,3vw,38px)', letterSpacing: '-.02em', lineHeight: 1, color: '#ffffff' }}>{name}</div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#b8e600' }}>{states.length} states &amp; UTs</div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 22px', marginTop: 22 }}>
            {states.map((s) => (
              <span key={s} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 15.5, fontWeight: 500 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#b8e600', flexShrink: 0 }} />
                {s}
              </span>
            ))}
          </div>
          <div style={{ marginTop: 28, paddingTop: 18, borderTop: '1px solid rgba(255,255,255,.1)', fontSize: 13.5, lineHeight: 1.6, color: 'rgba(242,242,243,.6)' }}>
            Home base: 28 ABS clubs across Pune, Mumbai, Nashik, Kolhapur, Ahilyanagar and Chhatrapati Sambhaji Nagar.
          </div>
        </div>
      </div>
    </section>
  );
}

function AgreementFaq() {
  const [open, setOpen] = useState(0);
  return (
    <section style={{ background: '#0d0e0d', color: '#f2f2f3' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(72px,9vw,120px) clamp(16px,4vw,44px)' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#b8e600' }}>Agreement &amp; training</div>
        <h2 style={{ marginTop: 14, fontWeight: 700, fontSize: 'clamp(30px,4.2vw,52px)', lineHeight: 1.02, letterSpacing: '-.03em', color: '#ffffff' }}>
          Common questions
        </h2>
        <div style={{ marginTop: 36, borderTop: '1px solid rgba(255,255,255,.18)' }}>
          {AGREEMENT_FAQ.map(([q, a], i) => {
            const isOpen = open === i;
            return (
              <div key={q} style={{ borderBottom: '1px solid rgba(255,255,255,.14)' }}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, background: 'transparent', border: 0, color: '#ffffff', padding: '22px 0', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', fontWeight: 600, fontSize: 'clamp(18px,2vw,22px)' }}
                >
                  {q}
                  <span style={{ flexShrink: 0, fontSize: 22, color: '#b8e600' }}>{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && <p style={{ padding: '0 40px 24px 0', fontSize: 15.5, lineHeight: 1.65, color: 'rgba(242,242,243,.72)' }}>{a}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ApplyForm() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [tried, setTried] = useState(false);
  const [sent, setSent] = useState(false);

  const errors = () => {
    const e: Record<string, boolean> = {};
    if (form.name.trim().length < 2) e.name = true;
    if (!/^(\+?91[\s-]?)?[6-9]\d{9}$/.test(form.phone.replace(/[\s-]/g, ''))) e.phone = true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = true;
    if (!form.state) e.state = true;
    if (form.city.trim().length < 2) e.city = true;
    if (!form.invest) e.invest = true;
    return e;
  };
  const err = tried ? errors() : {};
  const nErr = Object.keys(err).length;
  const border = (k: string) => (err[k] ? '#ff9b8a' : 'rgba(255,255,255,.14)');

  const send = () => {
    setTried(true);
    if (Object.keys(errors()).length) return;
    sendWhatsApp('Franchise enquiry (ABS website)', { Name: form.name, Phone: form.phone, Email: form.email, State: form.state, City: form.city, 'Investment range': form.invest, Property: form.prop, Message: form.msg });
    setSent(true);
  };
  const reset = () => { setForm(EMPTY_FORM); setTried(false); setSent(false); };

  const errorMsg = err.phone && nErr === 1 ? 'Enter a valid 10-digit Indian mobile number.' : err.email && nErr === 1 ? 'Enter a valid email address.' : 'Please fill the highlighted fields.';
  const inputStyle: React.CSSProperties = { width: '100%', background: 'rgba(255,255,255,.04)', border: '1px solid', borderRadius: 14, color: '#f2f2f3', fontFamily: 'inherit', fontSize: 15, padding: '15px 16px', outline: 0, transition: 'border-color .2s' };

  return (
    <div style={{ position: 'relative', border: '1px solid rgba(255,255,255,.16)', borderRadius: 28, padding: 'clamp(26px,3vw,40px)', background: '#151716' }}>
      {!sent ? (
        <div style={{ display: 'grid', gap: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: '#b8e600', marginBottom: 6 }}>
            Franchise enquiry
          </div>
          <input type="text" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Full name *" aria-label="Full name" style={{ ...inputStyle, borderColor: border('name') }} />
          <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))' }}>
            <input type="tel" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} placeholder="Mobile number *" aria-label="Mobile number" style={{ ...inputStyle, borderColor: border('phone') }} />
            <input type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} placeholder="Email *" aria-label="Email" style={{ ...inputStyle, borderColor: border('email') }} />
          </div>
          <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))' }}>
            <select value={form.state} onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))} aria-label="State" style={{ width: '100%', background: '#1b1d1c', border: `1px solid ${border('state')}`, borderRadius: 14, color: '#f2f2f3', fontFamily: 'inherit', fontSize: 15, padding: '15px 16px', outline: 0 }}>
              <option value="">State *</option>
              {ALL_STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <input type="text" value={form.city} onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))} placeholder="City *" aria-label="City" style={{ ...inputStyle, borderColor: border('city') }} />
          </div>
          <select value={form.invest} onChange={(e) => setForm((f) => ({ ...f, invest: e.target.value }))} aria-label="Investment range" style={{ width: '100%', background: '#1b1d1c', border: `1px solid ${border('invest')}`, borderRadius: 14, color: '#f2f2f3', fontFamily: 'inherit', fontSize: 15, padding: '15px 16px', outline: 0 }}>
            <option value="">Investment range *</option>
            {INVEST_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(242,242,243,.6)', margin: '6px 0 10px' }}>
              Do you have a property?
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {PROP_OPTIONS.map((p) => (
                <button key={p} type="button" onClick={() => setForm((f) => ({ ...f, prop: p }))} style={darkChip(form.prop === p)}>
                  {p}
                </button>
              ))}
            </div>
          </div>
          <textarea
            value={form.msg}
            onChange={(e) => setForm((f) => ({ ...f, msg: e.target.value }))}
            rows={3}
            placeholder="Anything else? Site size, experience, timeline"
            aria-label="Additional details"
            style={{ ...inputStyle, borderColor: 'rgba(255,255,255,.14)', resize: 'vertical' }}
          />
          {nErr > 0 && <div style={{ fontSize: 13, color: '#ff9b8a' }}>{errorMsg}</div>}
          <button
            type="button"
            onClick={send}
            style={{ width: '100%', background: '#b8e600', color: '#0d0e0d', border: 0, borderRadius: 999, fontFamily: 'inherit', fontSize: 14, fontWeight: 700, padding: 18, cursor: 'pointer', transition: 'background .25s' }}
          >
            Send franchise enquiry
          </button>
          <div style={{ fontSize: 12, color: 'rgba(242,242,243,.6)', textAlign: 'center' }}>Your details go only to the ABS franchise team.</div>
        </div>
      ) : (
        <div style={{ minHeight: 340, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: '#b8e600' }}>Enquiry received</div>
          <div style={{ marginTop: 16, fontWeight: 700, fontSize: 'clamp(28px,3.4vw,40px)', lineHeight: 1.05, letterSpacing: '-.02em', color: '#ffffff' }}>
            Thank you, {form.name.trim().split(/\s+/)[0] || ''}.
          </div>
          <p style={{ marginTop: 16, fontSize: 15, lineHeight: 1.6, color: 'rgba(242,242,243,.7)' }}>
            The ABS franchise team will call {form.phone} to discuss a club in {form.city}, {form.state}. A copy of your enquiry is on its way to {form.email}.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{ alignSelf: 'flex-start', marginTop: 24, background: 'transparent', border: '1px solid rgba(255,255,255,.25)', borderRadius: 999, color: '#f2f2f3', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, padding: '12px 20px', cursor: 'pointer' }}
          >
            Send another
          </button>
        </div>
      )}
    </div>
  );
}

function Apply() {
  return (
    <section id="apply" style={{ background: '#0d0e0d', color: '#f2f2f3', borderTop: '1px solid rgba(255,255,255,.16)' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: 'clamp(56px,8vw,110px) clamp(16px,4vw,44px)', display: 'grid', gap: 'clamp(30px,4vw,64px)', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,340px),1fr))', alignItems: 'start' }}>
        <div>
          <h2 style={{ fontWeight: 800, fontSize: 'clamp(40px,6vw,76px)', lineHeight: 0.96, letterSpacing: '-.035em', color: '#ffffff' }}>
            Build your club.
            <br />
            <span style={{ color: '#b8e600' }}>Build with ABS.</span>
          </h2>
          <p style={{ marginTop: 24, fontSize: 16.5, lineHeight: 1.6, maxWidth: '46ch', color: 'rgba(242,242,243,.72)' }}>
            Share a few details and the ABS franchise team will call you to discuss your city, site and investment.
          </p>
          <div style={{ marginTop: 32, display: 'grid', gap: 1, background: 'rgba(255,255,255,.14)', border: '1px solid rgba(255,255,255,.14)', borderRadius: 16, overflow: 'hidden' }}>
            {STEPS.map(([t, d], i) => (
              <div key={t} style={{ background: '#0d0e0d', padding: '18px 20px', display: 'grid', gridTemplateColumns: '40px 1fr', gap: 12, alignItems: 'baseline' }}>
                <span style={{ fontWeight: 700, fontSize: 14, letterSpacing: '.14em', color: '#b8e600' }}>{String(i + 1).padStart(2, '0')}</span>
                <span>
                  <span style={{ display: 'block', fontWeight: 700, fontSize: 18, letterSpacing: '-.01em', color: '#ffffff' }}>{t}</span>
                  <span style={{ display: 'block', marginTop: 6, fontSize: 14, lineHeight: 1.5, color: 'rgba(242,242,243,.62)' }}>{d}</span>
                </span>
              </div>
            ))}
          </div>
          <a href="tel:+919763215051" style={{ display: 'inline-block', marginTop: 28, fontSize: 'clamp(26px,3vw,36px)', fontWeight: 600, color: '#ffffff', borderBottom: '2px solid #b8e600' }}>
            +91 97632 15051
          </a>
          <div style={{ marginTop: 8, fontSize: 12.5, color: 'rgba(242,242,243,.5)' }}>
            Or write to <a href="mailto:info@absfitnessclub.in" style={{ color: '#b8e600' }}>info@absfitnessclub.in</a>
          </div>
        </div>
        <ApplyForm />
      </div>
    </section>
  );
}

export default function FranchiseContent() {
  return (
    <>
      <Hero />
      <WhyFranchise />
      <Investment />
      <Advantage />
      <FranchiseeProfile />
      <Expansion />
      <AgreementFaq />
      <Apply />
    </>
  );
}
