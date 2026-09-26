import type { Metadata } from 'next';
import ContactContent from '@/components/contact/ContactContent';

export const metadata: Metadata = {
  title: 'Contact Us — ABS Fitness & Wellness Club',
  description: 'Call, WhatsApp, or send a message. The ABS Fitness team will get back to you soon.',
};

export default function ContactPage() {
  return <ContactContent />;
}
