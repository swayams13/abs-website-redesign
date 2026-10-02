'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { nextBatch } from '@/lib/time';
import { useReveal } from '@/lib/hooks';
import SampleTag from '@/components/ui/SampleTag';

const PHASES = [
  { d: 'Day 0', t: 'Assessment', x: 'Body composition, movement screen and a goal you both sign off on.' },
  { d: '1–30', t: 'Foundation', x: 'Technique, routine and a nutrition plan that fits your week.' },
  { d: '31–60', t: 'Build', x: 'Load goes up. Fortnightly measurements keep the plan honest.' },
  { d: '61–90', t: 'Finish', x: 'Peak block, final measurements and a plan for day 91.' },
];
const STATS = [
  { n: '28', k: 'Clubs across Maharashtra', sample: false },
  { n: '1,00,000+', k: 'Members trained', sample: true },
  { n: '10 lakh', k: 'Sq ft of training floor', sample: true },
  { n: '1000+', k: 'Certified professionals', sample: true },
];

export default function Challenge() {
  const [batch, setBatch] = useState<string | null>(null);
  useEffect(() => {
    // IST-dependent value — must be computed client-side only, see TECH-STACK.md "Hydration".
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBatch(nextBatch());
  }, []);

  const leftRef = useReveal<HTMLDivElement>(0);
  const panelRef = useReveal<HTMLDivElement>(1);

  return (
    <section id="challenge" style={{ position: 'relative', background: '#0d0e0d', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.5 }}>
        <Image src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=2000&q=80" alt="" fill style={{ objectFit: 'cover' }} sizes="100vw" />
      </div>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(90deg,rgba(13,14,13,.96) 0%,rgba(13,14,13,.82) 50%,rgba(13,14,13,.5) 100%)' }} />
      <div style={{ position: 'relative', maxWidth: 1320, margin: '0 auto', padding: 'clamp(72px,9vw,128px) clamp(16px,4vw,44px)' }}>
        <div style={{ display: 'grid', gap: 'clamp(40px,5vw,80px)', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,400px),1fr))', alignItems: 'center' }}>
          <div ref={leftRef}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#b8e600' }}>The 90-Day Challenge</div>
            <h2 style={{ marginTop: 14, fontWeight: 700, fontSize: 'clamp(38px,5.4vw,76px)', lineHeight: 1, letterSpacing: '-.035em', color: '#ffffff' }}>
              90 days. One goal. <span style={{ fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic', fontWeight: 500, fontSize: '1.1em', letterSpacing: '-.01em', color: '#b8e600' }}>Real results.</span>
            </h2>
            <p style={{ marginTop: 22, fontSize: 17, lineHeight: 1.6, maxWidth: '46ch', color: 'rgba(242,242,243,.8)' }}>
              A coached 90-day block with a dedicated coach, a nutrition plan and fortnightly measurements. All group classes and Passport access are included.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px 24px', marginTop: 32 }}>
              <Link href="#join" style={{ background: '#ffffff', color: '#0d0e0d', fontSize: 15, fontWeight: 700, padding: '16px 26px', borderRadius: 999, transition: 'background .3s ease-out' }}>
                Enrol for the next batch
              </Link>
              <span style={{ fontSize: 14, color: 'rgba(242,242,243,.72)' }}>
                Next batch starts <strong style={{ color: '#ffffff', fontWeight: 600 }}>{batch ?? '…'}</strong> <SampleTag style={{ marginLeft: 6 }} />
              </span>
            </div>
          </div>
          <div ref={panelRef} style={{ padding: 'clamp(20px,2.4vw,30px)', borderRadius: 26, background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.16)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
            {PHASES.map((ph, i) => (
              <div key={ph.d} style={{ display: 'grid', gridTemplateColumns: '84px 1fr', gap: 16, padding: '18px 4px', borderBottom: i < PHASES.length - 1 ? '1px solid rgba(255,255,255,.12)' : '0' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#b8e600', paddingTop: 2 }}>{ph.d}</div>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: '#ffffff' }}>{ph.t}</div>
                  <div style={{ marginTop: 4, fontSize: 14, lineHeight: 1.55, color: 'rgba(242,242,243,.7)' }}>{ph.x}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,200px),1fr))', gap: 24, marginTop: 'clamp(56px,7vw,96px)', paddingTop: 32, borderTop: '1px solid rgba(255,255,255,.16)' }}>
          {STATS.map((s, i) => (
            <StatItem key={s.k} n={s.n} k={s.k} sample={s.sample} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({ n, k, sample, index }: { n: string; k: string; sample: boolean; index: number }) {
  const ref = useReveal<HTMLDivElement>(index);
  return (
    <div ref={ref}>
      <div style={{ fontSize: 'clamp(40px,4.6vw,60px)', fontWeight: 700, letterSpacing: '-.04em', lineHeight: 1, color: '#ffffff' }}>{n}</div>
      <div style={{ marginTop: 10, fontSize: 14, color: 'rgba(242,242,243,.68)' }}>{k} {sample && <SampleTag style={{ marginLeft: 6 }} />}</div>
    </div>
  );
}
