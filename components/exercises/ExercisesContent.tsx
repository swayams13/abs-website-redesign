'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useReveal } from '@/lib/hooks';

type Exercise = {
  n: string;
  g: string;
  m: string;
  eq: string;
  lvl: string;
  steps: string[];
  tip: string;
  photo: string;
};

// Placeholder exercise library, ported verbatim from design/ABS-Exercises.dc.html — README flags this
// as needing real client photography/video and coach-reviewed copy before launch. Photo IDs reuse the
// same vetted Unsplash set already used elsewhere in the codebase (see progress.md session 9 convention).
const EX: Exercise[] = [
  { n: 'Back Squat', g: 'Legs', m: 'Quads, glutes, core', eq: 'Barbell, rack', lvl: 'Intermediate', photo: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80', steps: ['Set the bar on your upper back and grip it just outside shoulders.', 'Stand feet shoulder-width, toes slightly out.', 'Brace, then sit down and back until thighs are at least parallel.', 'Drive up through the whole foot to stand tall.'], tip: 'Keep your knees tracking over your toes and your chest up.' },
  { n: 'Goblet Squat', g: 'Legs', m: 'Quads, glutes', eq: 'Dumbbell / kettlebell', lvl: 'Beginner', photo: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=600&q=80', steps: ['Hold the weight at your chest with both hands.', 'Squat down between your heels keeping elbows inside knees.', 'Pause at the bottom, then stand up.'], tip: 'The best way to learn the squat before loading a barbell.' },
  { n: 'Walking Lunge', g: 'Legs', m: 'Quads, glutes, balance', eq: 'Bodyweight / dumbbells', lvl: 'Beginner', photo: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=600&q=80', steps: ['Step forward and lower until both knees are near 90°.', 'Push through the front heel to bring the back leg through.', 'Continue alternating legs.'], tip: 'Take a long enough step that the front knee stays over the ankle.' },
  { n: 'Deadlift', g: 'Back', m: 'Hamstrings, glutes, back', eq: 'Barbell', lvl: 'Intermediate', photo: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&w=600&q=80', steps: ['Stand with the bar over mid-foot.', 'Hinge and grip the bar just outside your legs.', 'Brace, pull the slack out, then push the floor away.', 'Lock out with hips and knees together, then lower under control.'], tip: 'Keep the bar dragging close to your legs the whole way.' },
  { n: 'Lat Pulldown', g: 'Back', m: 'Lats, biceps', eq: 'Cable machine', lvl: 'Beginner', photo: 'https://images.unsplash.com/photo-1567598508481-65985588e295?auto=format&fit=crop&w=600&q=80', steps: ['Grip the bar slightly wider than shoulders.', 'Lean back slightly and pull the bar to your upper chest.', 'Return slowly until arms are straight.'], tip: 'Think about driving your elbows down, not pulling with your hands.' },
  { n: 'Seated Cable Row', g: 'Back', m: 'Mid-back, lats', eq: 'Cable machine', lvl: 'Beginner', photo: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80', steps: ['Sit tall with a slight bend in the knees.', 'Pull the handle to your stomach, squeezing shoulder blades.', 'Extend arms slowly without rounding.'], tip: "Don't rock your torso to move the weight." },
  { n: 'Bench Press', g: 'Chest', m: 'Chest, shoulders, triceps', eq: 'Barbell, bench', lvl: 'Intermediate', photo: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=600&q=80', steps: ['Lie with eyes under the bar and feet flat.', 'Grip slightly wider than shoulders and unrack.', 'Lower to mid-chest, then press back up.'], tip: 'Always use a spotter or safety arms for heavy sets.' },
  { n: 'Push-up', g: 'Chest', m: 'Chest, triceps, core', eq: 'Bodyweight', lvl: 'Beginner', photo: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80', steps: ['Hands under shoulders, body in a straight line.', 'Lower your chest to just above the floor.', 'Press back up without letting hips sag.'], tip: 'Elevate your hands on a bench to make it easier.' },
  { n: 'Overhead Press', g: 'Shoulders', m: 'Shoulders, triceps', eq: 'Barbell / dumbbells', lvl: 'Intermediate', photo: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=600&q=80', steps: ['Hold the bar at your collarbone, elbows slightly forward.', 'Brace and press straight overhead.', 'Move your head through at the top, then lower.'], tip: "Squeeze glutes so you don't lean back." },
  { n: 'Lateral Raise', g: 'Shoulders', m: 'Side delts', eq: 'Dumbbells', lvl: 'Beginner', photo: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=600&q=80', steps: ['Stand holding light dumbbells at your sides.', 'Raise arms out to shoulder height with soft elbows.', 'Lower slowly.'], tip: 'Go light. This is a control exercise, not a heavy one.' },
  { n: 'Plank', g: 'Core', m: 'Abs, deep core', eq: 'Bodyweight', lvl: 'Beginner', photo: 'https://images.unsplash.com/photo-1519505907962-0a6cb0167c73?auto=format&fit=crop&w=600&q=80', steps: ['Forearms under shoulders, legs straight.', 'Squeeze glutes and brace your stomach.', 'Hold a straight line from head to heels.'], tip: 'Quality over time. Stop when your hips start to drop.' },
  { n: 'Dead Bug', g: 'Core', m: 'Deep core', eq: 'Bodyweight', lvl: 'Beginner', photo: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=600&q=80', steps: ['Lie on your back, arms up, knees at 90°.', 'Lower opposite arm and leg while keeping lower back down.', 'Return and switch sides.'], tip: 'Breathe out as you extend. Keep your back flat on the floor.' },
  { n: 'Kettlebell Swing', g: 'Full body', m: 'Glutes, hamstrings, conditioning', eq: 'Kettlebell', lvl: 'Intermediate', photo: 'https://images.unsplash.com/photo-1559595500-e15296bdbb48?auto=format&fit=crop&w=600&q=80', steps: ['Hinge and hike the bell between your legs.', 'Snap your hips forward to float the bell to chest height.', 'Let it fall back and repeat.'], tip: "It's a hip hinge, not a squat and not an arm lift." },
  { n: 'Burpee', g: 'Full body', m: 'Full body, conditioning', eq: 'Bodyweight', lvl: 'Beginner', photo: 'https://images.unsplash.com/photo-1620188467120-5042ed1eb5da?auto=format&fit=crop&w=600&q=80', steps: ['Squat and place hands on the floor.', 'Jump feet back to a plank.', 'Jump feet in and explode up.'], tip: "Step back instead of jumping if you're just starting out." },
  { n: 'Cat–Cow', g: 'Mobility', m: 'Spine', eq: 'Mat', lvl: 'Beginner', photo: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=600&q=80', steps: ['Start on hands and knees.', 'Breathe in and drop your belly, lifting chest.', 'Breathe out and round your back.'], tip: 'Move slowly with your breath.' },
  { n: "World's Greatest Stretch", g: 'Mobility', m: 'Hips, thoracic spine', eq: 'Mat', lvl: 'Beginner', photo: 'https://images.unsplash.com/photo-1550259979-ed79b48d2a30?auto=format&fit=crop&w=600&q=80', steps: ['Step into a deep lunge.', 'Place the inside hand down and rotate the other arm to the ceiling.', 'Hold, then switch sides.'], tip: 'A great warm-up before any leg or full-body session.' },
];

const GROUPS = ['All', 'Legs', 'Back', 'Chest', 'Shoulders', 'Core', 'Full body', 'Mobility'];

function chipStyle(active: boolean): React.CSSProperties {
  return {
    fontFamily: 'inherit',
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '.14em',
    textTransform: 'uppercase',
    padding: '10px 14px',
    cursor: 'pointer',
    border: `1px solid ${active ? '#b8e600' : 'rgba(255,255,255,.3)'}`,
    background: active ? '#b8e600' : 'transparent',
    color: active ? '#0d0e0d' : '#f2f2f3',
    transition: 'background .2s, color .2s, border-color .2s',
  };
}

export default function ExercisesContent() {
  const [group, setGroup] = useState('All');
  const [query, setQuery] = useState('');
  const [sel, setSel] = useState(0);

  const needle = query.trim().toLowerCase();
  const items = EX.map((x, i) => ({ ...x, i })).filter(
    (x) => (group === 'All' || x.g === group) && (!needle || x.n.toLowerCase().includes(needle) || x.g.toLowerCase().includes(needle))
  );
  const active = EX[sel];

  const gridRef = useReveal<HTMLDivElement>(0);

  return (
    <section style={{ background: '#0d0e0d', color: '#f2f2f3', minHeight: '80vh' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '140px clamp(16px,4vw,44px) clamp(56px,7vw,96px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
          <span style={{ width: 28, height: 2, background: '#b8e600' }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: '#b8e600' }}>Exercise gallery</span>
        </div>
        <h1 style={{ fontWeight: 800, fontSize: 'clamp(38px,5.4vw,76px)', lineHeight: 1, letterSpacing: '-.035em', color: '#ffffff' }}>Learn the moves.</h1>
        <p style={{ margin: '18px 0 0', fontSize: 15.5, lineHeight: 1.6, maxWidth: '54ch', color: 'rgba(242,242,243,.7)' }}>
          Step-by-step guides to the exercises ABS coaches use every day. Ask any coach on the floor to check your form.
        </p>

        <div style={{ marginTop: 'clamp(28px,4vw,44px)', display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {GROUPS.map((g) => (
              <button key={g} type="button" onClick={() => setGroup(g)} style={chipStyle(group === g)}>
                {g}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search exercises"
            aria-label="Search exercises"
            style={{ minWidth: 220, background: 'transparent', border: 0, borderBottom: '2px solid rgba(242,242,243,.35)', color: '#f2f2f3', fontFamily: 'inherit', fontSize: 16, padding: '10px 2px', outline: 0 }}
          />
        </div>

        <div ref={gridRef} style={{ marginTop: 28, display: 'grid', gap: 'clamp(20px,3vw,40px)', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,340px), 1fr))', alignItems: 'start' }}>
          <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fill, minmax(150px,1fr))' }}>
            {items.map((x) => (
              <button
                key={x.n}
                type="button"
                onClick={() => setSel(x.i)}
                style={{ textAlign: 'left', background: 'transparent', border: `1px solid ${x.i === sel ? '#b8e600' : 'rgba(255,255,255,.18)'}`, color: '#f2f2f3', padding: 0, cursor: 'pointer', fontFamily: 'inherit' }}
              >
                <div style={{ position: 'relative', aspectRatio: '1', background: '#151716', overflow: 'hidden' }}>
                  <Image src={x.photo} alt={x.n} fill style={{ objectFit: 'cover' }} sizes="(min-width: 900px) 15vw, 33vw" />
                </div>
                <div style={{ padding: '10px 12px' }}>
                  <div style={{ fontWeight: 700, fontSize: 15, lineHeight: 1.15, color: '#ffffff' }}>{x.n}</div>
                  <div style={{ marginTop: 4, fontSize: 10.5, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(242,242,243,.55)' }}>{x.g}</div>
                </div>
              </button>
            ))}
            {items.length === 0 && (
              <div style={{ gridColumn: '1/-1', padding: '24px 0', color: 'rgba(242,242,243,.6)' }}>No exercise matches &ldquo;{query}&rdquo;.</div>
            )}
          </div>

          <div style={{ position: 'sticky', top: 100, border: '1px solid rgba(255,255,255,.24)', padding: 'clamp(22px,3vw,34px)' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: '#b8e600' }}>
              {active.g} · {active.lvl}
            </div>
            <h2 style={{ marginTop: 10, fontWeight: 700, fontSize: 'clamp(28px,3.2vw,40px)', lineHeight: 1, letterSpacing: '-.02em', color: '#ffffff' }}>{active.n}</h2>
            <div style={{ marginTop: 12, fontSize: 14, color: 'rgba(242,242,243,.65)' }}>
              Works: {active.m} · Equipment: {active.eq}
            </div>
            <div style={{ marginTop: 22, borderTop: '1px solid rgba(255,255,255,.2)' }}>
              {active.steps.map((t, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '36px 1fr', gap: 10, padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,.12)' }}>
                  <span style={{ fontWeight: 700, fontSize: 15, color: '#b8e600' }}>{String(i + 1).padStart(2, '0')}</span>
                  <span style={{ fontSize: 15, lineHeight: 1.55, color: '#f2f2f3' }}>{t}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 18, background: '#151716', padding: '14px 16px', fontSize: 14, lineHeight: 1.55, color: 'rgba(242,242,243,.8)' }}>
              <strong style={{ color: '#b8e600' }}>Coach tip:</strong> {active.tip}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
