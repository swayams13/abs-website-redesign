import type { Metadata } from 'next';
import TimetableContent from '@/components/timetable/TimetableContent';

export const metadata: Metadata = {
  title: 'Timetable — ABS Fitness Club',
  description: 'This week’s group class timetable at your ABS Fitness club — free for members, no booking needed.',
};

export default function TimetablePage() {
  return <TimetableContent />;
}
