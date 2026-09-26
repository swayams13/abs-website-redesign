import type { Metadata } from 'next';
import FranchiseContent from '@/components/franchise/FranchiseContent';

export const metadata: Metadata = {
  title: 'ABS Gym Franchise — ABS Fitness & Wellness Club',
  description: 'Partner with ABS Fitness. Investment, support and the application process for opening your own ABS club.',
};

export default function FranchisePage() {
  return <FranchiseContent />;
}
