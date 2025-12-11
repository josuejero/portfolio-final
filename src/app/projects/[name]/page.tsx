// src/app/projects/[name]/page.tsx
import Layout from '@/components/common/Layout';
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

  return (
    <Layout>
      <ProjectDetail name={name} />
    </Layout>
  );
}
