'use client';
import { useEffect, useRef, useState } from 'react';
import { status } from '@/lib/time';

/** Live open/closed pill. Computed client-side only — IST status must not be prerendered (see TECH-STACK.md). */
export default function LiveStatus({ hours, full = false, variant = 'solid' }: { hours: string; full?: boolean; variant?: 'solid' | 'outline' }) {
  const [live, setLive] = useState<{ short: string; label: string; dot: string } | null>(null);
  const dotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tick = () => setLive(status(hours, Date.now()));
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, [hours]);

  useEffect(() => {
    const d = dotRef.current;
    if (!d || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const anim = d.animate([{ boxShadow: '0 0 0 0 rgba(184,230,0,.6)' }, { boxShadow: '0 0 0 7px rgba(184,230,0,0)' }], { duration: 1600, iterations: Infinity });
    return () => anim.cancel();
  }, []);

  // Reserve the widest label's width up front so the pill filling in after mount doesn't reflow the layout around it (CLS).
  const wrapStyle =
    variant === 'outline'
      ? { border: '1px solid rgba(255,255,255,.22)', padding: '7px 14px', fontSize: 12.5, minWidth: full ? 186 : 92 }
      : { background: 'rgba(13,14,13,.55)', padding: '4px 10px', fontSize: 12, minWidth: full ? 170 : 78 };

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, borderRadius: 999, fontWeight: 600, ...wrapStyle }}>
      <i ref={dotRef} style={{ width: 7, height: 7, borderRadius: '50%', background: live?.dot ?? 'rgba(242,242,243,.45)', display: 'inline-block' }} />
      {(full ? live?.label : live?.short) ?? ' '}
    </span>
  );
}
