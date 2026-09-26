import type { Metadata } from 'next';
import AboutContent from '@/components/about/AboutContent';

export const metadata: Metadata = {
  title: 'About Us — ABS Fitness & Wellness Club',
  description: 'One of Maharashtra’s fastest-growing fitness chains, founded by Abhimanyu Sable in 2005.',
};

export default function AboutPage() {
  return <AboutContent />;
}
