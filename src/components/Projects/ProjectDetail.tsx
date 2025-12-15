'use client';

import type { GitHubRepositorySummary } from '@/types/github';
import {
  ArrowTopRightOnSquareIcon,
  CodeBracketIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useMemo, useState } from 'react';
import ReactMarkdown, { defaultUrlTransform } from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ProjectDetailProps {
  name: string;
}

type TabKey = 'overview';

type ReposResponseWithWrapper = { repos?: GitHubRepositorySummary[] };

type ReadmeData = {
  repo: string;
  path: string;
  excerpt?: string;
  markdown?: string; // we render this
  html?: string; // optional, if your API returns it
  sourceUrl?: string; // optional
  lastFetched?: string;
};

type ReadmeWrapper = { readme?: ReadmeData | null };

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

function extractReposArray(value: unknown): GitHubRepositorySummary[] {
  if (Array.isArray(value)) return value as GitHubRepositorySummary[];
  if (typeof value === 'object' && value !== null) {
    const withWrapper = value as ReposResponseWithWrapper;
    if (Array.isArray(withWrapper.repos)) return withWrapper.repos;
  }
  return [];
}



function extractReadme(value: unknown): ReadmeData | null {
  if (typeof value !== 'object' || value === null) return null;

  const direct = value as ReadmeData;
  if (typeof direct.repo === 'string' && (typeof direct.markdown === 'string' || typeof direct.html === 'string')) {
    return direct;
  }

  const wrapped = value as ReadmeWrapper;
  if (wrapped.readme && typeof wrapped.readme === 'object') {
    return wrapped.readme;
  }

  return null;
}

function normalizeRelativePath(url: string) {
  // strip leading ./ and leading /
  return url.replace(/^\.?\//, '');
}

export default function ProjectDetail({ name }: ProjectDetailProps) {
  const [repo, setRepo] = useState<GitHubRepositorySummary | null>(null);
  const [tab, setTab] = useState<TabKey>('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [readme, setReadme] = useState<ReadmeData | null>(null);
  const [readmeLoading, setReadmeLoading] = useState(false);
  const [readmeError, setReadmeError] = useState<string | null>(null);

  // Load repo summary + releases
  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const [reposRes] = await Promise.all([
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

    load();
    return () => {
      cancelled = true;
    };
  }, [name]);

  // Load README markdown
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

        if (!cancelled) setReadme(parsed);
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

  const repoName = repo?.name ?? name;
  const repoDescription = repo?.description;
  const repoUrl = repo?.htmlUrl;

  // Build bases for relative README links/images (best-effort)
  const { blobBase, rawBase } = useMemo(() => {
    let owner = '';
    let repoNameFromUrl = '';
    if (repoUrl) {
      try {
        const parts = new URL(repoUrl).pathname.split('/').filter(Boolean);
        owner = parts[0] ?? '';
        repoNameFromUrl = parts[1] ?? '';
      } catch {
        // ignore
      }
    }

    // Try to infer branch from readme.sourceUrl: .../blob/<branch>/README.md
    let branch = 'main';
    if (readme?.sourceUrl) {
      const m = readme.sourceUrl.match(/\/blob\/([^/]+)\//);
      if (m?.[1]) branch = m[1];
    }

    const blob = owner && repoNameFromUrl ? `https://github.com/${owner}/${repoNameFromUrl}/blob/${branch}` : '';
    const raw = owner && repoNameFromUrl ? `https://raw.githubusercontent.com/${owner}/${repoNameFromUrl}/${branch}` : '';

    return { blobBase: blob, rawBase: raw };
  }, [repoUrl, readme?.sourceUrl]);

  const urlTransform = (url: string, key?: string) => {
    // Keep safe defaults for absolute URLs
    const safe = defaultUrlTransform(url);

    // Anchors stay anchors
    if (safe.startsWith('#')) return safe;

    // If it’s already absolute (http/https/mailto/etc), keep it
    if (/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(safe)) return safe;

    // If we can’t compute bases, don’t rewrite
    if (!blobBase || !rawBase) return safe;

    const rel = normalizeRelativePath(safe);

    // Images should point at raw, links at blob
    if (key === 'src') return `${rawBase}/${rel}`;
    if (key === 'href') return `${blobBase}/${rel}`;

    return safe;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div className="space-y-2">
          <h1 className="text-xl font-semibold text-neutral-50 sm:text-2xl">
            {repoName}
          </h1>

          {repoDescription && (
            <p className="max-w-2xl text-sm text-neutral-300">{repoDescription}</p>
          )}

          {repo && (
            <div className="flex flex-wrap gap-3 text-xs text-neutral-400">
              {repo.language && (
                <span className="rounded-full bg-neutral-900/70 px-2 py-0.5">
                  {repo.language}
                </span>
              )}
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

        </nav>
      </div>

      {/* Overview */}
      {tab === 'overview' && (
        <section className="space-y-4 text-sm text-neutral-300">
          {readmeLoading && (
            <p className="animate-pulse text-neutral-500">Loading README…</p>
          )}

          {!readmeLoading && readme?.markdown && (
            <>
              <article className="prose prose-neutral dark:prose-invert max-w-none
                                 prose-headings:text-neutral-50
                                 prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline
                                 prose-strong:text-neutral-100
                                 prose-pre:bg-neutral-950/60 prose-pre:border prose-pre:border-neutral-800">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  urlTransform={urlTransform}
                  components={{
                    a({ href, children, ...props }) {
                      const isExternal = !!href && /^https?:\/\//i.test(href);
                      return (
                        <a
                          href={href}
                          {...props}
                          target={isExternal ? '_blank' : undefined}
                          rel={isExternal ? 'noreferrer' : undefined}
                        >
                          {children}
                        </a>
                      );
                    },
                    img({ alt, ...props }) {
                      // eslint-disable-next-line @next/next/no-img-element
                      return (
                        <img
                          alt={alt ?? ''}
                          loading="lazy"
                          className="rounded-lg border border-neutral-800"
                          {...props}
                        />
                      );
                    },
                    code({ children, ...props }) {
                      return (
                        <code className="rounded bg-neutral-900/60 px-1 py-0.5" {...props}>
                          {children}
                        </code>
                      );
                    },
                    pre({ children, ...props }) {
                      return (
                        <pre className="overflow-x-auto rounded-lg p-3" {...props}>
                          {children}
                        </pre>
                      );
                    },
                  }}
                >
                  {readme.markdown}
                </ReactMarkdown>
              </article>

              {repoUrl && (
                <p className="text-xs text-neutral-500">
                  README from{' '}
                  <a
                    href={`${repoUrl}#readme`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300"
                  >
                    GitHub
                    <ArrowTopRightOnSquareIcon className="h-3 w-3" />
                  </a>
                </p>
              )}
            </>
          )}

          {!readmeLoading && !readme?.markdown && !readmeError && (
            <p className="text-neutral-400">No README found for this repository.</p>
          )}

          {!readmeLoading && readmeError && (
            <p className="text-xs text-red-400">{readmeError}</p>
          )}
        </section>
      )}


    </div>
  );
}
