import type { Metadata } from 'next';
import CareersContent from '@/components/careers/CareersContent';

export const metadata: Metadata = {
  title: 'Careers — ABS Fitness Club',
  description: 'Open roles across 28 ABS Fitness clubs — coaching, operations and sales, with certification support and a structured career path.',
};

export default function CareersPage() {
  return <CareersContent />;
}
