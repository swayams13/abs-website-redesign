import type { Metadata } from 'next';
import EventsContent from '@/components/events/EventsContent';

export const metadata: Metadata = {
  title: 'Events & Activities — ABS Fitness Club',
  description: 'Celebrations, festivals, challenges and community events across ABS Fitness clubs — more than a workout.',
};

export default function EventsPage() {
  return <EventsContent />;
}
