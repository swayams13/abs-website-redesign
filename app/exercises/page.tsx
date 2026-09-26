import type { Metadata } from 'next';
import ExercisesContent from '@/components/exercises/ExercisesContent';

export const metadata: Metadata = {
  title: 'Exercise Gallery — ABS Fitness & Wellness Club',
  description: 'Step-by-step guides to the exercises ABS coaches use every day.',
};

export default function ExercisesPage() {
  return <ExercisesContent />;
}
