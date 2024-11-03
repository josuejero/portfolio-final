// src/app/page.tsx
import Layout from '@/components/common/Layout';
import Home from '@/components/Home/Home';
import Projects from '@/components/Projects/Projects';

export default function HomePage() {
  return (
    <Layout>
      <div className="space-y-16">
        <Home />
        <Projects />
      </div>
    </Layout>
  );
}