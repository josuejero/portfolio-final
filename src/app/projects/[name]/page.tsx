// src/app/projects/[name]/page.tsx
import ProjectDetail from '@/components/Projects/ProjectDetail';
import { use } from 'react';

interface ProjectPageParams {
  name: string;
}

interface ProjectPageProps {
  params: Promise<ProjectPageParams>;
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const { name } = use(params);

  return <ProjectDetail name={name} />;
}
