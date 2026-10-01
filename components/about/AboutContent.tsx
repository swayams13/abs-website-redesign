'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useReveal } from '@/lib/hooks';
import SampleTag from '@/components/ui/SampleTag';

const STATS = [
  { v: '28', l: 'Locations', sample: false },
  { v: '1,00,000+', l: 'Members served', sample: true },
  { v: '10,00,000', l: 'Sq ft managed', sample: true },
  { v: '2005', l: 'Established', sample: false },
] as const;

const MV = {
  mission: {
    h: 'Our mission',
    listTitle: 'We are committed to',
    p1: 'Our mission at ABS Fitness is to transform the way people engage with fitness and wellness by making it scientific, sustainable, and accessible. We believe that true fitness is not just about physical appearance, but about building strength, mobility, endurance, confidence, discipline, and a long-term healthy lifestyle.',
    p2: 'By combining the expertise of certified coaches with modern equipment and structured systems, we create an environment where every member can train safely, progress consistently, and achieve meaningful results.',
    list: [
      'Empowering individuals through evidence-based training programs, balanced nutrition guidance, and continuous education.',
      'Promoting functional health by focusing on movement quality, injury prevention, and mobility.',
      'Encouraging sustainable lifestyle habits that include mindful nutrition, active living, and adequate recovery.',
    ],
  },
  vision: {
    h: 'Our vision',
    listTitle: 'We envision a future where',
    p1: 'Our vision at ABS Fitness is to become a national leader in fitness and wellness by creating a culture where health is valued, accessible, and integrated into everyday life.',
    p2: 'We aspire to redefine fitness in India by elevating standards, empowering individuals, and building a community that understands that wellness is a lifelong commitment, not a temporary goal.',
    list: [
      'Fitness is accessible to everyone, regardless of age, background, or fitness level.',
      'Training is scientific and personalized, driven by education, technology, and skilled professionals.',
      'Gyms act as wellness ecosystems, offering strength, conditioning, mobility, nutrition, and recovery under one guided system.',
      'Fitness professionals are respected and supported as a structured career.',
    ],
  },
} as const;

const VALUES = [
  ['Science first', 'Evidence-based training programs and structured systems, so every member trains safely and progresses consistently.'],
  ['Member first', 'We focus on personalization, guidance, motivation, and consistent support so each member feels valued, understood, and empowered.'],
  ['Community', 'Celebrations, festivals and community events keep members connected, motivated and inspired.'],
  ['Continuous learning', 'Fitness science evolves, and so do we. We invest in education, certifications, workshops, and industry exposure for our team.'],
] as const;

const OFFERS = [
  ['Strength & Conditioning', 'strength'],
  ['Weight Loss', 'weight-loss'],
  ['Mobility & Flexibility', 'mobility'],
  ['Personal Training', 'personal-training'],
  ['Sports-Specific Training', 'sports'],
  ['Group Classes', 'group-classes'],
] as const;

const TIMELINE = [
  ['Early years', 'Inspired by his brother', 'His passion was sparked by his elder brother, Shantanu Sable, who competed at state and national levels in bodybuilding.'],
  ['1991', 'First job as a trainer', 'Began his career as a fitness trainer at the gym in Hotel Sagar Plaza, Pune.'],
  ['1991 – 96', 'Sancheti Hospital & Poona Club', 'Trained members and gained hands-on experience at two of Pune’s best-known institutions.'],
  ['1996', 'Health Club Manager, Holiday Inn', 'Chose a career in fitness over a Chemistry degree and a Master’s in Management.'],
  ['ACSM', 'Certified in Atlanta, USA', 'Earned certification from the American College of Sports Medicine and became a member of IHRSA. First Indian to be certified by ACSM.'],
  ['2003', 'ACE nomination', 'Nominated for the ACE Fitness Professional of the Year Award, held in San Francisco.'],
  ['2005', 'ABS Fitness is founded', 'The first ABS Fitness & Wellness Club opens in Pune. Franchising follows in 2014.'],
  ['Today', '28 clubs', 'Founder President of UHFF, India’s first association of fitness club owners. Mentoring the next generation of fitness professionals.'],
] as const;

const REVIEWS: [string, string, string, string][] = [
  ['Weight loss', 'The 90-day challenge gave me structure I never had. The coach tracked everything and I finally stayed consistent.', 'Member', 'Pune'],
  ['Strength', 'Proper racks, platforms and coaches who actually correct your form. Best strength floor I have trained on.', 'Member', 'Pune'],
  ['Community', 'It really is not just a gym. The festival events and group classes made me look forward to coming every day.', 'Member', 'Mumbai'],
  ['Personal training', 'My trainer built the plan around my back issue. Six months in, no pain and I am lifting more than ever.', 'Member', 'Nashik'],
  ['Weight loss', 'Diet guidance plus workouts that were never boring. Lost weight without starving myself.', 'Member', 'Kolhapur'],
  ['Community', 'I travel for work and the Passport lets me train at any ABS club. Same standard everywhere.', 'Member', 'Pune'],
];
const REVIEW_TABS = ['All', 'Weight loss', 'Strength', 'Personal training', 'Community'];

const GALLERY: [string, string][] = [
  ['Clubs', 'Club interior'],
  ['Classes', 'Group class'],
  ['Events', 'Festival celebration'],
  ['Transformations', 'Member transformation'],
  ['Clubs', 'Strength floor'],
  ['Events', 'GROW 2026 session'],
  ['Classes', 'Yoga studio'],
  ['Transformations', '90-Day finishers'],
  ['Clubs', 'Cardio zone'],
  ['Events', 'Anniversary night'],
  ['Classes', 'Spin class'],
  ['Transformations', 'Before & after'],
];
const GALLERY_TABS = ['All', 'Clubs', 'Classes', 'Events', 'Transformations'];

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
        <Image src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2400&q=80" alt="ABS club floor" fill priority style={{ objectFit: 'cover' }} sizes="100vw" />
      </div>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(96deg,rgba(13,14,13,.97) 0%,rgba(13,14,13,.85) 45%,rgba(13,14,13,.35) 100%)' }} />
      <div style={{ position: 'relative', maxWidth: 1320, margin: '0 auto', padding: '140px clamp(16px,4vw,44px) clamp(56px,7vw,96px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
          <span style={{ width: 28, height: 2, background: '#b8e600' }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: '#b8e600' }}>About ABS Fitness</span>
        </div>
        <h1 style={{ fontWeight: 800, fontSize: 'clamp(42px,6.4vw,88px)', lineHeight: 1, letterSpacing: '-.035em', color: '#ffffff', maxWidth: '17ch' }}>
          Your body can achieve it. <span style={{ color: '#b8e600' }}>Your mind must believe it.</span>
        </h1>
        <p style={{ marginTop: 24, fontSize: 'clamp(16px,1.5vw,19px)', lineHeight: 1.55, maxWidth: '52ch', color: 'rgba(242,242,243,.82)' }}>
          Welcome to ABS Fitness – #ItsNotGymItsLife. One of Maharashtra&rsquo;s fastest-growing fitness chains, founded by Abhimanyu Sable.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px,1fr))', marginTop: 'clamp(40px,6vw,64px)', paddingTop: 26, borderTop: '1px solid rgba(255,255,255,.18)' }}>
          {STATS.map((s) => (
            <div key={s.l}>
              <div style={{ fontWeight: 700, fontSize: 'clamp(28px,3.4vw,42px)', lineHeight: 1, letterSpacing: '-.03em', color: '#ffffff' }}>{s.v}</div>
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

function MissionVision() {
  const [tab, setTab] = useState<'mission' | 'vision'>('mission');
  const mv = MV[tab];
  return (
    <section id="mission" style={{ background: '#f2f2f3', color: '#1d1f20' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: 'clamp(72px,9vw,128px) clamp(16px,4vw,44px)' }}>
        <div style={{ display: 'flex', border: '1.5px solid #1d1f20', borderRadius: 999, width: 'max-content', maxWidth: '100%', overflow: 'hidden' }}>
          {(['mission', 'vision'] as const).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setTab(k)}
              style={{ fontFamily: 'inherit', fontSize: 12, fontWeight: 700, padding: '13px 24px', border: 0, background: tab === k ? '#0d0e0d' : 'transparent', color: tab === k ? '#b8e600' : '#1d1f20', cursor: 'pointer' }}
            >
              {k === 'mission' ? 'Mission' : 'Vision'}
            </button>
          ))}
        </div>
        <div style={{ marginTop: 'clamp(32px,4vw,52px)', display: 'grid', gap: 'clamp(32px,5vw,80px)', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,380px),1fr))', alignItems: 'start' }}>
          <div>
            <h2 style={{ fontWeight: 700, fontSize: 'clamp(32px,4.4vw,54px)', lineHeight: 1, letterSpacing: '-.03em', maxWidth: '16ch' }}>{mv.h}</h2>
            <p style={{ marginTop: 22, fontSize: 16.5, lineHeight: 1.65, maxWidth: '56ch', color: 'rgba(29,31,32,.8)' }}>{mv.p1}</p>
            <p style={{ marginTop: 14, fontSize: 16.5, lineHeight: 1.65, maxWidth: '56ch', color: 'rgba(29,31,32,.8)' }}>{mv.p2}</p>
          </div>
          <div style={{ borderTop: '1.5px solid #1d1f20' }}>
            <div style={{ padding: '18px 0 6px', fontSize: 11.5, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#4d5a00' }}>{mv.listTitle}</div>
            {mv.list.map((t, i) => (
              <div key={t} style={{ display: 'grid', gridTemplateColumns: '40px 1fr', gap: 12, padding: '16px 0', borderBottom: '1px solid rgba(29,31,32,.16)' }}>
                <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: '.14em', color: '#4d5a00' }}>{String(i + 1).padStart(2, '0')}</span>
                <span style={{ fontSize: 15.5, lineHeight: 1.55 }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Philosophy() {
  return (
    <section style={{ background: '#0d0e0d', color: '#f2f2f3' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: 'clamp(72px,9vw,128px) clamp(16px,4vw,44px)' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#b8e600' }}>Our philosophy</div>
        <h2 style={{ marginTop: 16, fontWeight: 700, fontSize: 'clamp(34px,4.8vw,60px)', lineHeight: 1, letterSpacing: '-.03em', color: '#ffffff', maxWidth: '16ch' }}>
          Fitness is for everyone.
        </h2>
        <p style={{ marginTop: 22, fontSize: 16.5, lineHeight: 1.65, maxWidth: '62ch', color: 'rgba(242,242,243,.72)' }}>
          We are committed to building an inclusive fitness community where people of all ages, abilities, and experience levels feel welcome, respected, and supported. Our gyms are designed to be safe, motivating spaces where beginners and experienced members alike can train with confidence.
        </p>
        <div style={{ marginTop: 'clamp(32px,4vw,48px)', display: 'grid', gap: 1, background: 'rgba(255,255,255,.14)', border: '1px solid rgba(255,255,255,.14)', borderRadius: 16, overflow: 'hidden', gridTemplateColumns: 'repeat(auto-fit, minmax(260px,1fr))' }}>
          {VALUES.map(([t, d], i) => (
            <div key={t} style={{ background: '#0d0e0d', padding: 'clamp(24px,2.8vw,36px)' }}>
              <div style={{ fontWeight: 700, fontSize: 13, letterSpacing: '.16em', color: '#b8e600' }}>{String(i + 1).padStart(2, '0')}</div>
              <div style={{ marginTop: 12, fontWeight: 700, fontSize: 22, letterSpacing: '-.01em', lineHeight: 1.1, color: '#ffffff' }}>{t}</div>
              <p style={{ marginTop: 10, fontSize: 14.5, lineHeight: 1.55, color: 'rgba(242,242,243,.65)' }}>{d}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 'clamp(40px,5vw,56px)', display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(242,242,243,.55)', marginRight: 6 }}>
            What we offer
          </span>
          {OFFERS.map(([t, slug]) => (
            <Link key={slug} href={`/services/${slug}`} style={{ border: '1px solid rgba(255,255,255,.22)', borderRadius: 999, padding: '10px 16px', color: '#f2f2f3', fontSize: 13.5, fontWeight: 600 }}>
              {t} →
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function FounderStory() {
  return (
    <section id="founder" style={{ background: '#f2f2f3', color: '#1d1f20' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: 'clamp(72px,9vw,128px) clamp(16px,4vw,44px)', display: 'grid', gap: 'clamp(36px,5vw,80px)', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,380px),1fr))', alignItems: 'start' }}>
        <div style={{ position: 'sticky', top: 100 }}>
          <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#4d5a00' }}>Our founder</div>
          <h2 style={{ marginTop: 16, fontWeight: 700, fontSize: 'clamp(38px,5.4vw,68px)', lineHeight: 1, letterSpacing: '-.03em' }}>
            Abhimanyu Sable
          </h2>
          <div style={{ marginTop: 10, fontSize: 13, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(29,31,32,.72)' }}>
            Founder. President. Pioneer.
          </div>
          <div style={{ position: 'relative', marginTop: 26, aspectRatio: '4/5', maxWidth: 420, borderRadius: 22, overflow: 'hidden', background: '#e0e0e2' }}>
            <Image src="/assets/abhimanyu-sable.jpg" alt="Abhimanyu Sable" fill style={{ objectFit: 'cover', objectPosition: '50% 20%' }} sizes="(min-width: 900px) 32vw, 90vw" />
          </div>
          <p style={{ marginTop: 22, fontSize: 15.5, lineHeight: 1.65, maxWidth: '48ch', color: 'rgba(29,31,32,.8)' }}>
            Founder of ABS Fitness and Founder President of UHFF, India&rsquo;s first registered association of fitness club owners. With 35+ years of fitness industry expertise, he has helped convert fitness into a structured business category by introducing standards, training systems, and scalable operational models.
          </p>
          <div style={{ marginTop: 28, paddingTop: 22, borderTop: '1px solid rgba(29,31,32,.16)', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ flexShrink: 0, width: 52, height: 52, borderRadius: '50%', background: '#1d1f20', color: '#b8e600', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 16 }}>
              SS
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 17, letterSpacing: '-.01em' }}>Shantanu Sable</div>
              <div style={{ marginTop: 2, fontSize: 12.5, fontWeight: 600, color: '#4d5a00' }}>Director – Operations</div>
            </div>
          </div>
        </div>
        <div style={{ borderLeft: '1.5px solid #1d1f20', paddingLeft: 'clamp(20px,3vw,40px)' }}>
          {TIMELINE.map(([y, t, d]) => (
            <div key={t} style={{ position: 'relative', padding: '0 0 clamp(28px,3.4vw,44px)' }}>
              <span style={{ position: 'absolute', left: 'calc(-1 * clamp(20px,3vw,40px) - 7px)', top: 6, width: 12, height: 12, borderRadius: 3, background: '#b8e600', border: '1.5px solid #1d1f20' }} />
              <div style={{ fontWeight: 700, fontSize: 'clamp(26px,3vw,36px)', lineHeight: 1 }}>{y}</div>
              <div style={{ marginTop: 8, fontWeight: 700, fontSize: 20, letterSpacing: '-.01em', lineHeight: 1.05 }}>{t}</div>
              <p style={{ marginTop: 8, fontSize: 15, lineHeight: 1.6, maxWidth: '54ch', color: 'rgba(29,31,32,.75)' }}>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ tag, q, n, c, index }: { tag: string; q: string; n: string; c: string; index: number }) {
  const ref = useReveal<HTMLDivElement>(index);
  return (
    <div ref={ref} style={{ border: '1px solid rgba(255,255,255,.16)', borderRadius: 20, padding: 26, display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ fontSize: 15, letterSpacing: 3, color: '#b8e600' }}>★★★★★</div>
      <p style={{ fontSize: 16, lineHeight: 1.6, color: '#f2f2f3', flex: 1 }}>&ldquo;{q}&rdquo;</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, borderTop: '1px solid rgba(255,255,255,.12)', paddingTop: 14 }}>
        <span style={{ fontWeight: 700, fontSize: 17, letterSpacing: '-.01em', color: '#ffffff' }}>{n}</span>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(242,242,243,.55)' }}>{c} · {tag}</span>
      </div>
    </div>
  );
}

function Reviews() {
  const [tab, setTab] = useState('All');
  const reviews = REVIEWS.filter((r) => tab === 'All' || r[0] === tab);
  return (
    <section id="reviews" style={{ background: '#0d0e0d', color: '#f2f2f3' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: 'clamp(72px,9vw,128px) clamp(16px,4vw,44px)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#b8e600' }}>Members reviews</div>
            <h2 style={{ marginTop: 16, fontWeight: 700, fontSize: 'clamp(32px,4.6vw,58px)', lineHeight: 1, letterSpacing: '-.03em', color: '#ffffff' }}>
              In their words.
            </h2>
            <div style={{ marginTop: 14, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <SampleTag />
              <span style={{ fontSize: 12.5, color: 'rgba(242,242,243,.55)' }}>Sample reviews — to be replaced with real ABS member reviews</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {REVIEW_TABS.map((t) => (
              <button key={t} type="button" onClick={() => setTab(t)} style={darkChip(tab === t)}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 'clamp(32px,4vw,48px)', display: 'grid', gap: 14, gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%,320px),1fr))' }}>
          {reviews.map(([tag, q, n, c], i) => (
            <ReviewCard key={q} tag={tag} q={q} n={n} c={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const [tab, setTab] = useState('All');
  const gallery = GALLERY.filter(([cat]) => tab === 'All' || cat === tab);
  return (
    <section id="gallery" style={{ background: '#0d0e0d', borderTop: '1px solid rgba(255,255,255,.14)' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: 'clamp(72px,9vw,128px) clamp(16px,4vw,44px)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#b8e600' }}>Gallery</div>
            <h2 style={{ marginTop: 16, fontWeight: 700, fontSize: 'clamp(32px,4.6vw,58px)', lineHeight: 1, letterSpacing: '-.03em', color: '#ffffff' }}>
              Moments of progress.
            </h2>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {GALLERY_TABS.map((t) => (
              <button key={t} type="button" onClick={() => setTab(t)} style={darkChip(tab === t)}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 'clamp(32px,4vw,48px)', display: 'grid', gap: 6, gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%,260px),1fr))' }}>
          {gallery.map(([cat, ph]) => (
            <div key={ph} style={{ position: 'relative', aspectRatio: '1', borderRadius: 16, background: '#151716', overflow: 'hidden' }}>
              <span style={{ position: 'absolute', left: 10, bottom: 10, background: 'rgba(13,14,13,.85)', borderRadius: 999, padding: '5px 10px', fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: '#b8e600' }}>
                {cat}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function AboutContent() {
  return (
    <>
      <Hero />
      <MissionVision />
      <Philosophy />
      <FounderStory />
      <Reviews />
      <Gallery />
    </>
  );
}
