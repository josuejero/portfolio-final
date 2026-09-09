import { siteConfig } from '@/config/site';
import { PROJECTS } from '@/data/projects';
import type { MetadataRoute } from 'next';

const STATIC_PATHS = [
  '/',
  '/projects',
  '/about',
  '/contact',
  '/snippets',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    siteConfig.site.url.replace(/\/$/, '');

  const staticEntries =
    STATIC_PATHS.map((path) => ({
      url:
        `${baseUrl}${path === '/' ? '' : path}`,
      changeFrequency:
        'monthly' as const,
      priority:
        path === '/' ? 1 : 0.8,
    }));

  const projectEntries =
    PROJECTS.map((project) => ({
      url:
        `${baseUrl}/projects/${project.slug}`,
      changeFrequency:
        'monthly' as const,
      priority: 0.7,
    }));

  return [
    ...staticEntries,
    ...projectEntries,
  ];
}
