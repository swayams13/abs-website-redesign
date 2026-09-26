'use client';
import { useState } from 'react';
import Hero from './Hero';
import ClubRail from './ClubRail';
import Programs from './Programs';
import Passport from './Passport';
import Founder from './Founder';
import Challenge from './Challenge';
import Testimonials from './Testimonials';
import Join from './Join';

export default function HomeContent() {
  const [name, setName] = useState('');
  return (
    <>
      <Hero />
      <ClubRail />
      <Programs />
      <Passport name={name} />
      <Founder />
      <Challenge />
      <Testimonials />
      <Join name={name} setName={setName} />
    </>
  );
}
