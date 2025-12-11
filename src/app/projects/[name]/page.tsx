// FILE: src/app/projects/[name]/page.tsx
import Layout from '@/components/common/Layout';
import ProjectDetail from '@/components/Projects/ProjectDetail';

interface ProjectPageParams {
  name: string;
}

interface ProjectPageProps {
  params: Promise<ProjectPageParams>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { name } = await params;

  return (
    <Layout>
      <ProjectDetail name={name} />
    </Layout>
  );
}
