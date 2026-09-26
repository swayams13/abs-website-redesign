import type { Metadata } from 'next';
import TrainersProgramsContent from '@/components/trainers-programs/TrainersProgramsContent';

export const metadata: Metadata = {
  title: 'Trainers & Programs — ABS Fitness Club',
  description: 'Certified coaches, structured programs and the 90-Day Challenge at every ABS Fitness club.',
};

export default function TrainersProgramsPage() {
  return <TrainersProgramsContent />;
}
