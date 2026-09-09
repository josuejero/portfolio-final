// src/app/projects/page.tsx
import ProjectsExplorer from '@/components/Projects/ProjectsExplorer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Engineering case studies covering software, QA and test automation, data quality, and platform/support work.',
  alternates: {
    canonical: '/projects',
  },
};

export default function ProjectsPage() {
  return <ProjectsExplorer />;
}
