// src/app/page.tsx
import Home from '@/components/Home/Home';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  return (
    <div className="space-y-16">
      <Home />
      {/* <Projects /> */}
    </div>
  );
}
