// src/components/Projects/ProjectDetail.tsx
'use client';

import type {
  GitHubRelease,
  GitHubRepositorySummary,
} from '@/types/github';
import {
  ArrowTopRightOnSquareIcon,
  CodeBracketIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';

interface ProjectDetailProps {
  name: string;
}

type TabKey = 'overview' | 'releases';

const ProjectDetail: React.FC<ProjectDetailProps> = ({ name }) => {
  const [repo, setRepo] = useState<GitHubRepositorySummary | null>(null);
  const [releases, setReleases] = useState<GitHubRelease[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<TabKey>('overview');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const reposRes = await fetch('/api/github-projects/repos');
        if (!reposRes.ok) {
          throw new Error('Failed to load repository metadata');
        }
        const repos: GitHubRepositorySummary[] = await reposRes.json();
        const found = repos.find(
          (r) => r.name.toLowerCase() === name.toLowerCase(),
        );
        setRepo(found ?? null);

        const relRes = await fetch(
          `/api/github-projects/releases/${encodeURIComponent(name)}`,
        );
        if (relRes.ok) {
          const rel: GitHubRelease[] = await relRes.json();
          setReleases(rel);
        } else if (relRes.status !== 404) {
          console.error('Failed to load releases', await relRes.text());
        }
      } catch (err) {
        console.error(err);
        setError('Unable to load project details from GitHub.');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [name]);

  if (loading) {
    return (
      <section className="mt-6 text-sm text-neutral-400">
        Loading project details from GitHub...
      </section>
    );
  }

  if (error) {
    return (
      <section className="mt-6 text-sm text-red-400">
        {error}
      </section>
    );
  }

  if (!repo) {
    return (
      <section className="mt-6 text-sm text-neutral-400">
        Repository &quot;{name}&quot; was not found in your GitHub account.
      </section>
    );
  }

  return (
    <section className="mt-6 space-y-6">
      <header>
        <h1 className="text-xl font-semibold tracking-tight text-neutral-50">
          {repo.name}
        </h1>
        {repo.description && (
          <p className="mt-2 max-w-2xl text-sm text-neutral-300">
            {repo.description}
          </p>
        )}
        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-neutral-400">
          {repo.language && (
            <span className="rounded-full bg-neutral-900 px-2 py-0.5">
              {repo.language}
            </span>
          )}
          <span className="inline-flex items-center gap-1">
            <StarIcon className="h-3.5 w-3.5" />
            <span>{repo.stargazersCount} stars</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <CodeBracketIcon className="h-3.5 w-3.5" />
            <span>{repo.forksCount} forks</span>
          </span>
          <span>Opened {new Date(repo.createdAt).toLocaleDateString()}</span>
          <span>Updated {new Date(repo.pushedAt).toLocaleDateString()}</span>
        </div>

        {repo.topics.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {repo.topics.slice(0, 8).map((topic) => (
              <span
                key={topic}
                className="rounded-full bg-neutral-900 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-neutral-300"
              >
                {topic}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
          <a
            href={repo.htmlUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-full border border-neutral-700 px-3 py-1 text-neutral-200 hover:border-neutral-500"
          >
            <CodeBracketIcon className="h-3.5 w-3.5" />
            <span>View on GitHub</span>
          </a>
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-neutral-300 hover:text-neutral-50"
            >
              <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
              <span>Live site</span>
            </a>
          )}
        </div>
      </header>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-neutral-800 text-xs">
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
      </div>

      {tab === 'overview' && (
        <section className="space-y-4 text-sm text-neutral-300">
          <p>
            This view is powered directly from the GitHub API, so stars, forks,
            and metadata always reflect the latest state of the repository.
          </p>
          <p>
            You can customize what appears here by editing the README, adding
            topics, and creating releases in GitHub.
          </p>
        </section>
      )}

      {tab === 'releases' && (
        <section className="space-y-4">
          {releases.length === 0 && (
            <p className="text-sm text-neutral-400">
              This repository has no published releases yet.
            </p>
          )}

          {releases.length > 0 && (
            <ul className="space-y-3">
              {releases.map((release) => (
                <li
                  key={release.id}
                  className="rounded-xl border border-neutral-800 bg-neutral-900/70 p-4 text-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="font-medium text-neutral-50">
                        {release.name || release.tagName}
                      </p>
                      <p className="text-xs text-neutral-400">
                        Tag {release.tagName}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-[11px]">
                      {release.draft && (
                        <span className="rounded-full bg-yellow-900/40 px-2 py-0.5 text-yellow-200">
                          Draft
                        </span>
                      )}
                      {release.prerelease && !release.draft && (
                        <span className="rounded-full bg-purple-900/40 px-2 py-0.5 text-purple-200">
                          Pre-release
                        </span>
                      )}
                      {!release.prerelease && !release.draft && (
                        <span className="rounded-full bg-emerald-900/40 px-2 py-0.5 text-emerald-200">
                          Stable
                        </span>
                      )}
                      {release.publishedAt && (
                        <span className="text-neutral-400">
                          Published{' '}
                          {new Date(
                            release.publishedAt,
                          ).toLocaleDateString()}
                        </span>
                      )}
                      <a
                        href={release.htmlUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-neutral-300 hover:text-neutral-50"
                      >
                        <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
                        <span>View on GitHub</span>
                      </a>
                    </div>
                  </div>

                  {release.body && (
                    <div className="mt-3 max-h-40 overflow-y-auto whitespace-pre-wrap text-xs text-neutral-300">
                      {release.body}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </section>
  );
};

export default ProjectDetail;
