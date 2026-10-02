'use client';
import { useEffect, useRef } from 'react';
import { CLUBS } from '@/lib/data';
import { useReducedMotion } from '@/lib/hooks';

const rail = CLUBS.map((c) => ({ name: c.name, city: c.cityShort }));

/** One full pass of the club list. The looping copy is rendered with `hidden` so assistive tech reads the clubs once. */
function ClubSet({ hidden = false }: { hidden?: boolean }) {
  return (
    <div {...(hidden ? { 'aria-hidden': true } : { role: 'list', 'aria-label': 'ABS clubs' })} style={{ display: 'flex', flexShrink: 0 }}>
      {rail.map((r) => (
        <div key={r.name} role={hidden ? undefined : 'listitem'} style={{ display: 'flex', alignItems: 'baseline', gap: 8, padding: '0 26px', whiteSpace: 'nowrap' }}>
          <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-.02em', color: '#1d1f20' }}>{r.name}</span>
          <span style={{ fontSize: 12, fontWeight: 500, color: 'rgba(29,31,32,.72)' }}>{r.city}</span>
        </div>
      ))}
    </div>
  );
}

export default function ClubRail() {
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<Animation | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const t = trackRef.current;
    if (!t || reduced || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const anim = t.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-50%)' }], { duration: 36000, iterations: Infinity, easing: 'linear' });
    animRef.current = anim;
    return () => {
      anim.cancel();
      animRef.current = null;
    };
  }, [reduced]);

  return (
    <div style={{ background: '#f2f2f3', color: '#1d1f20', padding: '26px 0', borderBottom: '1px solid rgba(29,31,32,.1)' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 clamp(16px,4vw,44px)', display: 'flex', alignItems: 'center', gap: 28 }}>
        <div className="rail-label" style={{ flexShrink: 0, fontSize: 13, fontWeight: 600, color: 'rgba(29,31,32,.72)', maxWidth: '16ch', lineHeight: 1.4 }}>
          One card opens every club
        </div>
        <div
          // Pause the loop while the pointer is over it; with reduced motion the rail stops and becomes a normal scrollable row.
          onMouseEnter={() => animRef.current?.pause()}
          onMouseLeave={() => animRef.current?.play()}
          tabIndex={reduced ? 0 : undefined}
          aria-label={reduced ? 'ABS clubs, scrollable' : undefined}
          style={{ flex: 1, minWidth: 0, overflowX: reduced ? 'auto' : 'hidden', overflowY: 'hidden', WebkitMaskImage: 'linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)', maskImage: 'linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)' }}
        >
          <div ref={trackRef} style={{ display: 'flex', width: 'max-content' }}>
            <ClubSet />
            {!reduced && <ClubSet hidden />}
          </div>
        </div>
      </div>
    </div>
  );
}
