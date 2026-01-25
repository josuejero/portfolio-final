import { useEffect, useState } from 'react';
import type { GitHubRepositorySummary } from '@/types/github';
import { extractReadme, extractReposArray, ReadmeData } from '../project-detail-utils';

export function useProjectDetail(name: string) {
  const [repo, setRepo] = useState<GitHubRepositorySummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [readme, setReadme] = useState<ReadmeData | null>(null);
  const [readmeLoading, setReadmeLoading] = useState(false);
  const [readmeError, setReadmeError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadRepos() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/github-projects/repos');
        if (!response.ok) {
          throw new Error(`Failed to load repositories (status ${response.status})`);
        }

        const data: unknown = await response.json();
        const reposArray = extractReposArray(data);
        const lowerName = name.toLowerCase();

        const repoSummary =
          reposArray.find(
            (repoItem) =>
              repoItem.name.toLowerCase() === lowerName ||
              repoItem.fullName.toLowerCase().endsWith(`/${lowerName}`)
          ) ?? null;

        if (!cancelled) {
          setRepo(repoSummary);
        }
      } catch (err) {
        if (!cancelled) {
          console.error('Error loading project detail', err);
          setError('Unable to load project details from GitHub.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadRepos();
    return () => {
      cancelled = true;
    };
  }, [name]);

  useEffect(() => {
    let cancelled = false;

    async function loadReadme() {
      setReadmeLoading(true);
      setReadmeError(null);

      try {
        const res = await fetch(`/api/github-projects/readme/${encodeURIComponent(name)}`);
        if (!res.ok) {
          if (!cancelled) setReadme(null);
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
        if (!cancelled) setReadmeLoading(false);
      }
    }

    loadReadme();
    return () => {
      cancelled = true;
    };
  }, [name]);

  return {
    repo,
    loading,
    error,
    readme,
    readmeLoading,
    readmeError,
  };
}
