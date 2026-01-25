'use client';

import { ArrowTopRightOnSquareIcon, CodeBracketIcon } from '@heroicons/react/24/outline';
import { useMemo, useState } from 'react';
import { defaultUrlTransform } from 'react-markdown';
import ProjectReadme from './ProjectReadme';
import { formatDate, normalizeRelativePath } from './project-detail-utils';
import { useProjectDetail } from './hooks/useProjectDetail';

interface ProjectDetailProps {
  name: string;
}

type TabKey = 'overview';

export default function ProjectDetail({ name }: ProjectDetailProps) {
  const [tab, setTab] = useState<TabKey>('overview');
  const {
    repo,
    loading,
    error,
    readme,
    readmeLoading,
    readmeError,
  } = useProjectDetail(name);

  const repoName = repo?.name ?? name;
  const repoDescription = repo?.description;
  const repoUrl = repo?.htmlUrl;

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

    let branch = 'main';
    if (readme?.sourceUrl) {
      const match = readme.sourceUrl.match(/\/blob\/([^/]+)\//);
      if (match?.[1]) branch = match[1];
    }

    const blob = owner && repoNameFromUrl ? `https://github.com/${owner}/${repoNameFromUrl}/blob/${branch}` : '';
    const raw = owner && repoNameFromUrl ? `https://raw.githubusercontent.com/${owner}/${repoNameFromUrl}/${branch}` : '';

    return { blobBase: blob, rawBase: raw };
  }, [repoUrl, readme?.sourceUrl]);

  const urlTransform = (url: string, key?: string) => {
    const safe = defaultUrlTransform(url);

    if (safe.startsWith('#')) return safe;
    if (/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(safe)) return safe;
    if (!blobBase || !rawBase) return safe;

    const rel = normalizeRelativePath(safe);
    if (key === 'src') return `${rawBase}/${rel}`;
    if (key === 'href') return `${blobBase}/${rel}`;

    return safe;
  };

  return (
    <div className="space-y-6">
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

      {tab === 'overview' && (
        <section className="space-y-4 text-sm text-neutral-300">
          <ProjectReadme
            readme={readme}
            readmeLoading={readmeLoading}
            readmeError={readmeError}
            repoUrl={repoUrl}
            urlTransform={urlTransform}
          />
        </section>
      )}
    </div>
  );
}
