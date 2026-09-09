// src/app/about/page.tsx
import About from '@/components/About/About';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Engineering background, education, technical skills, and professional context for Josue Sebastian Jeronimo.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return <About />;
}
