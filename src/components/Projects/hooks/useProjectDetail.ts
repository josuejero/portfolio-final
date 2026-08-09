import { useEffect, useMemo, useState } from 'react';

import {
  findRepositorySummaryForReference,
  getCatalogProjectForReference,
} from '@/lib/projects/view-model';
import type { GitHubRepositorySummary } from '@/types/github';

import {
  extractReadme,
  extractReposArray,
  ReadmeData,
} from '../project-detail-utils';

export function useProjectDetail(reference: string) {
  const catalogProject = useMemo(
    () => getCatalogProjectForReference(reference) ?? null,
    [reference],
  );

  const [repo, setRepo] =
    useState<GitHubRepositorySummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [readme, setReadme] = useState<ReadmeData | null>(null);
  const [readmeLoading, setReadmeLoading] = useState(false);
  const [readmeError, setReadmeError] =
    useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadRepos() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/github-projects/repos');

        if (!response.ok) {
          throw new Error(
            `Failed to load repositories (status ${response.status})`,
          );
        }

        const data: unknown = await response.json();
        const reposArray = extractReposArray(data);

        const repoSummary =
          findRepositorySummaryForReference(
            reference,
            reposArray,
          );

        if (!cancelled) {
          setRepo(repoSummary);
        }
      } catch (err) {
        if (!cancelled) {
          console.error('Error loading project detail', err);
          setError(
            'Unable to load project details from GitHub.',
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadRepos();

    return () => {
      cancelled = true;
    };
  }, [reference]);

  useEffect(() => {
    let cancelled = false;

    async function loadReadme() {
      setReadmeLoading(true);
      setReadmeError(null);

      const repositoryName =
        catalogProject?.repository.name ?? reference;

      const owner = catalogProject?.repository.owner;

      const query = owner
        ? `?owner=${encodeURIComponent(owner)}`
        : '';

      try {
        const res = await fetch(
          `/api/github-projects/readme/${encodeURIComponent(
            repositoryName,
          )}${query}`,
        );

        if (!res.ok) {
          if (!cancelled) {
            setReadme(null);
          }
          return;
        }

        const data: unknown = await res.json();
        const parsed = extractReadme(data);

        if (!cancelled) {
          setReadme(parsed);
        }
      } catch (err) {
        if (!cancelled) {
          console.error('Error loading README', err);
          setReadme(null);
          setReadmeError('Could not load README.');
        }
      } finally {
        if (!cancelled) {
          setReadmeLoading(false);
        }
      }
    }

    loadReadme();

    return () => {
      cancelled = true;
    };
  }, [catalogProject, reference]);

  return {
    project: catalogProject,
    repo,
    loading,
    error,
    readme,
    readmeLoading,
    readmeError,
  };
}
