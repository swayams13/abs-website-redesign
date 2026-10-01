'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CLUBS } from '@/lib/data';
import { status } from '@/lib/time';
import SampleTag from '@/components/ui/SampleTag';

function OpenCount() {
  const [count, setCount] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setCount(CLUBS.filter((c) => status(c.hours).open).length);
    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, []);
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
      <i style={{ width: 7, height: 7, borderRadius: '50%', background: count ? '#b8e600' : 'rgba(242,242,243,.45)', display: 'inline-block' }} />
      {count === null ? ' ' : `${count} of ${CLUBS.length} clubs open now`}
    </span>
  );
}

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduced && rootRef.current) {
      rootRef.current.querySelectorAll<HTMLElement>('[data-hero]').forEach((el, i) => {
        el.animate([{ opacity: 0, transform: 'translateY(28px)' }, { opacity: 1, transform: 'none' }], { duration: 900, delay: 150 + i * 110, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'both' });
      });
    }

    const onScroll = () => {
      if (reduced) return;
      const y = window.scrollY, h = window.innerHeight, p = Math.min(1, y / h);
      if (contentRef.current) {
        contentRef.current.style.opacity = String(1 - p * 1.1);
        contentRef.current.style.transform = `translateY(${p * -40}px)`;
      }
      if (bgRef.current) bgRef.current.style.transform = `scale(${1 + p * 0.06})`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      ref={rootRef}
      style={{ position: 'relative', minHeight: 'max(640px,100svh)', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', background: '#0d0e0d' }}
    >
      <div ref={bgRef} style={{ position: 'absolute', inset: 0, willChange: 'transform' }}>
        <Image
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2400&q=80"
          alt="ABS training floor"
          fill
          priority
          style={{ objectFit: 'cover' }}
          sizes="100vw"
        />
      </div>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(180deg,rgba(13,14,13,.55) 0%,rgba(13,14,13,0) 26%,rgba(13,14,13,.35) 55%,rgba(13,14,13,.94) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(90deg,rgba(13,14,13,.7) 0%,rgba(13,14,13,0) 65%)' }} />

      <div ref={contentRef} style={{ position: 'relative', width: '100%', maxWidth: 1320, margin: '0 auto', padding: '140px clamp(16px,4vw,44px) clamp(40px,6vw,72px)', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap' }}>
        <div style={{ maxWidth: 820 }}>
          <div data-hero="" style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '7px 14px 7px 10px', borderRadius: 999, background: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.2)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,.92)' }}>
              <OpenCount />
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 14px', borderRadius: 999, background: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.2)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,.92)' }}>
              <SampleTag />
              1,00,000+ members · since 2005
            </div>
          </div>
          <h1 style={{ marginTop: 26, fontWeight: 800, fontSize: 'clamp(46px,7.4vw,112px)', lineHeight: 0.98, letterSpacing: '-.035em', color: '#ffffff' }}>
            <span data-hero="" style={{ display: 'block' }}>Your body can achieve it.</span>
            <span data-hero="" style={{ display: 'block' }}>
              Your mind must{' '}
              <span style={{ fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic', fontWeight: 500, letterSpacing: '-.01em', fontSize: '1.1em', color: '#b8e600' }}>believe it.</span>
            </span>
          </h1>
          <p data-hero="" style={{ marginTop: 26, fontSize: 'clamp(16px,1.4vw,19px)', lineHeight: 1.6, fontWeight: 500, maxWidth: '52ch', color: 'rgba(242,242,243,.86)' }}>
            28 clubs across Maharashtra. One membership card, a whole network.
          </p>
          <div data-hero="" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '14px 28px', marginTop: 34 }}>
            <Link
              href="#join"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: '#b8e600', color: '#0d0e0d', fontSize: 15, fontWeight: 700, padding: '18px 20px 18px 28px', borderRadius: 999, transition: 'background .3s ease-out, transform .3s ease-out' }}
            >
              Book a free club tour
              <span style={{ width: 30, height: 30, borderRadius: '50%', background: '#0d0e0d', color: '#b8e600', display: 'grid', placeItems: 'center', fontSize: 14 }}>→</span>
            </Link>
            <Link href="/locations" style={{ fontSize: 15, fontWeight: 600, color: '#ffffff', borderBottom: '1px solid rgba(255,255,255,.4)', paddingBottom: 3 }}>
              Find your nearest club
            </Link>
          </div>
        </div>

        <div className="hero-stat-card" data-hero="" style={{ flex: '0 0 280px', padding: 22, borderRadius: 26, background: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.2)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', boxShadow: '0 30px 60px rgba(0,0,0,.25)' }}>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,.7)' }}>ABS today</div>
          <div style={{ display: 'grid', gap: 14, marginTop: 16 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', paddingBottom: 14, borderBottom: '1px solid rgba(255,255,255,.14)' }}>
              <span style={{ fontSize: 34, fontWeight: 700, letterSpacing: '-.03em', color: '#ffffff' }}>28</span>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,.75)' }}>Clubs</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', paddingBottom: 14, borderBottom: '1px solid rgba(255,255,255,.14)' }}>
              <span style={{ fontSize: 34, fontWeight: 700, letterSpacing: '-.03em', color: '#ffffff' }}>6</span>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,.75)' }}>Cities</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 34, fontWeight: 700, letterSpacing: '-.03em', color: '#ffffff' }}>20</span>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,.75)' }}>Years of ABS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
