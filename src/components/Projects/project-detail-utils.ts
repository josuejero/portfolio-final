import type { GitHubRepositorySummary } from '@/types/github';

export type ReadmeData = {
  repo: string;
  path: string;
  excerpt?: string;
  markdown?: string;
  html?: string;
  sourceUrl?: string;
  lastFetched?: string;
};

export function formatDate(date: string | null | undefined): string {
  if (!date) return 'Unpublished';
  try {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    }).format(new Date(date));
  } catch {
    return date;
  }
}

export function extractReposArray(value: unknown): GitHubRepositorySummary[] {
  if (Array.isArray(value)) return value as GitHubRepositorySummary[];
  if (typeof value === 'object' && value !== null) {
    const withWrapper = value as { repos?: GitHubRepositorySummary[] };
    if (Array.isArray(withWrapper.repos)) return withWrapper.repos;
  }
  return [];
}

export function extractReadme(value: unknown): ReadmeData | null {
  if (typeof value !== 'object' || value === null) return null;

  const direct = value as ReadmeData;
  if (
    typeof direct.repo === 'string' &&
    (typeof direct.markdown === 'string' || typeof direct.html === 'string')
  ) {
    return direct;
  }

  const wrapped = value as { readme?: ReadmeData | null };
  if (wrapped.readme && typeof wrapped.readme === 'object') {
    return wrapped.readme;
  }

  return null;
}

export function normalizeRelativePath(url: string) {
  return url.replace(/^\.?\//, '');
}
