// src/app/contact/page.tsx
import Contact from '@/components/Contact/Contact';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Josue Sebastian Jeronimo about software engineering, QA, data quality, platform support, and related opportunities.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return <Contact />;
}
