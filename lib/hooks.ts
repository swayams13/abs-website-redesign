'use client';
import { useEffect, useRef, useState } from 'react';

/** Viewport width. Starts at a fixed desktop default so SSR and first client render match (see TECH-STACK.md "Hydration"), then updates after mount. */
export function useViewport() {
  const [w, setW] = useState(1280);
  useEffect(() => {
    const update = () => setW(window.innerWidth);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return w;
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    onChange(); // sync initial value — unknown until mount, so this can't be the render-time computation
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

let sharedObserver: IntersectionObserver | null = null;
function getObserver() {
  if (sharedObserver) return sharedObserver;
  sharedObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement;
          el.style.opacity = '1';
          el.style.transform = 'none';
          sharedObserver!.unobserve(el);
        }
      });
    },
    { rootMargin: '0px 0px -3% 0px', threshold: 0.01 }
  );
  return sharedObserver;
}

/** Scroll-reveal, ported from the design reference's `_reveal()`. `index` staggers the delay (i % 4) * 50ms. */
export function useReveal<T extends HTMLElement>(index = 0) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.94) return;
    const delay = (index % 4) * 50;
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = `opacity .45s cubic-bezier(.22,1,.36,1) ${delay}ms, transform .45s cubic-bezier(.22,1,.36,1) ${delay}ms, box-shadow .45s ease-out`;
    const obs = getObserver();
    obs.observe(el);
    return () => obs.unobserve(el);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return ref;
}
