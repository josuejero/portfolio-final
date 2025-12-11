'use client';

import type {
  GitHubReadme,
  GitHubRelease,
  GitHubRepositorySummary,
} from '@/types/github';
import {
  ArrowTopRightOnSquareIcon,
  CodeBracketIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

interface ProjectDetailProps {
  name: string;
}

type TabKey = 'overview' | 'releases';

function formatDate(date: string | null | undefined): string {
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

type ReposResponseWithWrapper = {
  repos?: GitHubRepositorySummary[];
};

type ReleasesResponseWithWrapper = {
  releases?: GitHubRelease[];
};

type ReadmeWrapper = {
  readme?: GitHubReadme | null;
};

type DirectReadmeCandidate = {
  repo?: string;
  path?: string;
  excerpt?: string;
  html?: string;
  lastFetched?: string;
};

function extractReposArray(value: unknown): GitHubRepositorySummary[] {
  if (Array.isArray(value)) {
    return value as GitHubRepositorySummary[];
  }

  if (typeof value === 'object' && value !== null) {
    const withWrapper = value as ReposResponseWithWrapper;
    if (Array.isArray(withWrapper.repos)) {
      return withWrapper.repos;
    }
  }

  return [];
}

function extractReleasesArray(value: unknown): GitHubRelease[] {
  if (Array.isArray(value)) {
    return value as GitHubRelease[];
  }

  if (typeof value === 'object' && value !== null) {
    const withWrapper = value as ReleasesResponseWithWrapper;
    if (Array.isArray(withWrapper.releases)) {
      return withWrapper.releases;
    }
  }

  return [];
}

function extractReadme(value: unknown): GitHubReadme | null {
  if (typeof value !== 'object' || value === null) {
    return null;
  }

  const directCandidate = value as DirectReadmeCandidate;
  if (
    typeof directCandidate.html === 'string' &&
    typeof directCandidate.excerpt === 'string'
  ) {
    return value as GitHubReadme;
  }

  const wrapper = value as ReadmeWrapper;
  if (wrapper.readme && typeof wrapper.readme === 'object') {
    const inner = wrapper.readme as DirectReadmeCandidate;
    if (
      typeof inner.html === 'string' &&
      typeof inner.excerpt === 'string'
    ) {
      return wrapper.readme as GitHubReadme;
    }
  }

  return null;
}

export default function ProjectDetail({ name }: ProjectDetailProps) {
  const [repo, setRepo] = useState<GitHubRepositorySummary | null>(null);
  const [releases, setReleases] = useState<GitHubRelease[]>([]);
  const [tab, setTab] = useState<TabKey>('overview');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [readme, setReadme] = useState<GitHubReadme | null>(null);
  const [readmeLoading, setReadmeLoading] = useState(false);
  const [readmeError, setReadmeError] = useState<string | null>(null);

  // Load repository summary + releases
  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const [reposRes, releasesRes] = await Promise.all([
          fetch('/api/github-projects/repos'),
          fetch(`/api/github-projects/releases/${encodeURIComponent(name)}`),
        ]);

        let repoSummary: GitHubRepositorySummary | null = null;

        if (reposRes.ok) {
          const reposJson: unknown = await reposRes.json();
          const reposArray = extractReposArray(reposJson);

          const lowerName = name.toLowerCase();
          repoSummary =
            reposArray.find(
              (repoItem) =>
                repoItem.name.toLowerCase() === lowerName ||
                repoItem.fullName.toLowerCase().endsWith(`/${lowerName}`),
            ) ?? null;
        }

        let releasesList: GitHubRelease[] = [];
        if (releasesRes.ok) {
          const releasesJson: unknown = await releasesRes.json();
          releasesList = extractReleasesArray(releasesJson);
        }

        if (!cancelled) {
          setRepo(repoSummary);
          setReleases(releasesList);
        }
      } catch (err) {
        if (!cancelled) {
          console.error('Error loading project detail', err);
          setError('Unable to load project details from GitHub.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [name]);

  // Load README excerpt / HTML
  useEffect(() => {
    let cancelled = false;

    async function loadReadme() {
      setReadmeLoading(true);
      setReadmeError(null);

      try {
        const res = await fetch(
          `/api/github-projects/readme/${encodeURIComponent(name)}`,
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
  }, [name]);

  const repoName = repo?.name ?? name;
  const repoDescription = repo?.description;
  const repoUrl = repo?.htmlUrl;

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div className="space-y-2">
          <h1 className="text-xl font-semibold text-neutral-50 sm:text-2xl">
            {repoName}
          </h1>
          {repoDescription && (
            <p className="max-w-2xl text-sm text-neutral-300">
              {repoDescription}
            </p>
          )}

          {repo && (
            <div className="flex flex-wrap gap-3 text-xs text-neutral-400">
              {repo.language && (
                <span className="rounded-full bg-neutral-900/70 px-2 py-0.5">
                  {repo.language}
                </span>
              )}
              <span className="rounded-full bg-neutral-900/70 px-2 py-0.5">
                {repo.openIssuesCount} open issues
              </span>
              <span className="rounded-full bg-neutral-900/70 px-2 py-0.5">
                Updated {formatDate(repo.pushedAt)}
              </span>
            </div>
          )}
        </div>

        {repoUrl && (
          <a
            href={repoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 self-start rounded-lg border border-neutral-800 bg-neutral-950/60 px-3 py-2 text-xs font-medium text-neutral-100 hover:border-neutral-700 hover:bg-neutral-900"
          >
            <CodeBracketIcon className="h-4 w-4" />
            <span>View on GitHub</span>
            <ArrowTopRightOnSquareIcon className="h-3 w-3" />
          </a>
        )}
      </header>

      {/* Loading / error state for overall project */}
      {loading && !repo && (
        <div className="rounded-lg border border-neutral-900 bg-neutral-950/70 p-4 text-sm text-neutral-400">
          Loading project details from GitHub…
        </div>
      )}

      {!loading && error && (
        <div className="rounded-lg border border-red-900/60 bg-red-950/40 p-4 text-sm text-red-100">
          {error}
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-neutral-800">
        <nav className="flex gap-2 text-xs">
          <button
            type="button"
            onClick={() => setTab('overview')}
            className={`rounded-t-lg px-3 py-2 ${
              tab === 'overview'
                ? 'bg-neutral-900 text-neutral-100'
                : 'text-neutral-400 hover:text-neutral-100'
            }`}
          >
            Overview
          </button>
          <button
            type="button"
            onClick={() => setTab('releases')}
            className={`rounded-t-lg px-3 py-2 ${
              tab === 'releases'
                ? 'bg-neutral-900 text-neutral-100'
                : 'text-neutral-400 hover:text-neutral-100'
            }`}
          >
            Releases
            {releases.length > 0 && (
              <span className="ml-2 rounded-full bg-neutral-800 px-1.5 text-[10px]">
                {releases.length}
              </span>
            )}
          </button>
        </nav>
      </div>

      {/* Tab content */}
      {tab === 'overview' && (
        <section className="space-y-4 text-sm text-neutral-300">
          {readmeLoading && (
            <p className="animate-pulse text-neutral-500">Loading README…</p>
          )}

          {!readmeLoading && readme && (readme.html || readme.excerpt) && (
            <>
              {readme.html ? (
                <article
                  className="prose prose-invert max-w-none prose-headings:text-neutral-100 prose-p:text-neutral-300 prose-strong:text-neutral-100 prose-a:text-emerald-400 hover:prose-a:text-emerald-300"
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: readme.html }}
                />
              ) : (
                <p>{readme.excerpt}</p>
              )}

              {repoUrl && (
                <p className="text-xs text-neutral-500">
                  README snippet from{' '}
                  <a
                    href={`${repoUrl}#readme`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300"
                  >
                    full README on GitHub
                    <ArrowTopRightOnSquareIcon className="h-3 w-3" />
                  </a>
                </p>
              )}
            </>
          )}

          {!readmeLoading && !readme && !readmeError && (
            <>
              <p>
                This view is powered directly from the GitHub API, so stars,
                forks, and metadata always reflect the latest state of the
                repository.
              </p>
              <p>
                You can customize what appears here by editing the README,
                adding topics, and creating releases in GitHub.
              </p>
            </>
          )}

          {!readmeLoading && readmeError && (
            <p className="text-xs text-red-400">{readmeError}</p>
          )}
        </section>
      )}

      {tab === 'releases' && (
        <section className="space-y-3 text-sm text-neutral-300">
          {releases.length === 0 && (
            <p className="text-neutral-400">
              This repository has no published releases yet.
            </p>
          )}

          {releases.length > 0 && (
            <ul className="space-y-3">
              {releases.map((release) => (
                <li
                  key={release.id}
                  className="rounded-lg border border-neutral-800 bg-neutral-950/60 p-4"
                >
                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                    <div>
                      <p className="font-medium text-neutral-50">
                        {release.name || release.tagName}
                      </p>
                      <p className="text-xs text-neutral-400">
                        {release.tagName}
                      </p>
                    </div>
                    <div className="text-xs text-neutral-400 sm:text-right">
                      <p>{formatDate(release.publishedAt)}</p>
                      {release.prerelease && (
                        <span className="mt-1 inline-flex rounded-full bg-amber-900/40 px-2 py-0.5 text-[10px] text-amber-200">
                          Pre-release
                        </span>
                      )}
                    </div>
                  </div>

                  {release.body && (
                    <p className="mt-2 whitespace-pre-line text-xs text-neutral-400 line-clamp-4">
                      {release.body}
                    </p>
                  )}

                  {release.htmlUrl && (
                    <a
                      href={release.htmlUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300"
                    >
                      View release on GitHub
                      <ArrowTopRightOnSquareIcon className="h-3 w-3" />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </div>
  );
}
