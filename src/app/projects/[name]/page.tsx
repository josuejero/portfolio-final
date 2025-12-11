// src/app/projects/[name]/page.tsx
import Layout from '@/components/common/Layout';
import ProjectDetail from '@/components/Projects/ProjectDetail';

interface ProjectPageProps {
  params: { name: string };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  return (
    <Layout>
      <ProjectDetail name={params.name} />
    </Layout>
  );
}
