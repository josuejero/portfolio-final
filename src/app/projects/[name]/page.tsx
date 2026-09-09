// src/app/projects/[name]/page.tsx
import ProjectDetail from '@/components/Projects/ProjectDetail';
import { getProjectBySlug } from '@/data/projects';
import { siteMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { use } from 'react';

interface ProjectPageParams {
  name: string;
}

interface ProjectPageProps {
  params: Promise<ProjectPageParams>;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { name } = await params;
  const project = getProjectBySlug(name);

  if (!project) {
    return {
      title: 'Project not found',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonicalPath =
    `/projects/${project.slug}`;
  const description =
    project.summary ??
    `Engineering case study for ${project.name}.`;

  return {
    title: project.name,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title:
        `${project.name} | ${siteMetadata.title}`,
      description,
      url:
        `${siteMetadata.siteUrl}${canonicalPath}`,
      siteName: siteMetadata.siteName,
      locale: siteMetadata.locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title:
        `${project.name} | ${siteMetadata.title}`,
      description,
    },
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const { name } = use(params);

  return <ProjectDetail name={name} />;
}
