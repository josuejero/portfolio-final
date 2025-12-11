// FILE: src/components/Projects/ProjectsExplorer.tsx
'use client';

import type { GitHubReadme, GitHubRepositorySummary } from '@/types/github';
import {
  BookOpenIcon,
  CodeBracketIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';

type SortKey = 'stars' | 'updated' | 'created';

type ReadmeMap = Record<string, GitHubReadme | null>;

interface AggregateStats {
  totalStars: number;
  totalForks: number;
  totalOpenIssues: number;
}

const initialAggregate: AggregateStats = {
  totalStars: 0,
  totalForks: 0,
  totalOpenIssues: 0,
};

function formatDate(date: string) {
  try {
    return new Date(date).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return date;
  }
}

export default function ProjectsExplorer() {
  const [repos, setRepos] = useState<GitHubRepositorySummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>('stars');

  const [readmes, setReadmes] = useState<ReadmeMap>({});
  const [activeReadmeRepo, setActiveReadmeRepo] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/github-projects/repos');
        if (!response.ok) {
          throw new Error(`Failed to load repositories (status ${response.status})`);
        }

        const data: GitHubRepositorySummary[] = await response.json();
        if (!cancelled) {
          setRepos(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : 'Failed to load repositories from GitHub.',
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  const languages = useMemo(() => {
    const set = new Set<string>();
    for (const repo of repos) {
      if (repo.language) {
        set.add(repo.language);
      }
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [repos]);

  const topics = useMemo(() => {
    const set = new Set<string>();
    for (const repo of repos) {
      for (const topic of repo.topics) {
        set.add(topic);
      }
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [repos]);

  const aggregate = useMemo(
    () =>
      repos.reduce<AggregateStats>(
        (acc, repo) => {
          acc.totalStars += repo.stargazersCount;
          acc.totalForks += repo.forksCount;
          acc.totalOpenIssues += repo.openIssuesCount;
          return acc;
        },
        { ...initialAggregate },
      ),
    [repos],
  );

  const filteredRepos = useMemo(() => {
    let result = repos;

    const query = search.trim().toLowerCase();
    if (query) {
      result = result.filter((repo) => {
        const name = repo.name.toLowerCase();
        const description = (repo.description ?? '').toLowerCase();
        return name.includes(query) || description.includes(query);
      });
    }

    if (selectedLanguages.length > 0) {
      result = result.filter(
        (repo) => repo.language && selectedLanguages.includes(repo.language),
      );
    }

    if (selectedTopics.length > 0) {
      result = result.filter((repo) =>
        selectedTopics.every((topic) => repo.topics.includes(topic)),
      );
    }

    const sorted = [...result];
    sorted.sort((a, b) => {
      switch (sortKey) {
        case 'stars':
          return b.stargazersCount - a.stargazersCount;
        case 'updated':
          return new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime();
        case 'created':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });

    return sorted;
  }, [repos, search, selectedLanguages, selectedTopics, sortKey]);

  const toggleLanguage = useCallback((language: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(language)
        ? prev.filter((lang) => lang !== language)
        : [...prev, language],
    );
  }, []);

  const toggleTopic = useCallback((topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic],
    );
  }, []);

  const handleSortChange = useCallback((key: SortKey) => {
    setSortKey(key);
  }, []);

  const fetchReadme = useCallback(
    async (repoName: string) => {
      // Toggle off if already open
      if (activeReadmeRepo === repoName) {
        setActiveReadmeRepo(null);
        return;
      }

      // If we've already fetched (including "no readme"), just show cached
      if (readmes[repoName] !== undefined) {
        setActiveReadmeRepo(repoName);
        return;
      }

      try {
        const response = await fetch(
          `/api/github-projects/readme/${encodeURIComponent(repoName)}`,
        );

        if (!response.ok) {
          setReadmes((prev) => ({ ...prev, [repoName]: null }));
          setActiveReadmeRepo(repoName);
          return;
        }

        const data: GitHubReadme = await response.json();
        setReadmes((prev) => ({ ...prev, [repoName]: data }));
        setActiveReadmeRepo(repoName);
      } catch {
        setReadmes((prev) => ({ ...prev, [repoName]: null }));
        setActiveReadmeRepo(repoName);
      }
    },
    [activeReadmeRepo, readmes],
  );

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Explore my public GitHub repositories with search, filters, and live stats.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <CodeBracketIcon className="h-4 w-4" />
            <span>{repos.length} repositories</span>
          </div>
          <div className="flex items-center gap-1">
            <StarIcon className="h-4 w-4" />
            <span>{aggregate.totalStars} stars</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpenIcon className="h-4 w-4" />
            <span>{aggregate.totalOpenIssues} open issues</span>
          </div>
        </div>
      </header>

      {error && (
        <div className="rounded-md border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">
          {error}
        </div>
      )}

      {/* Controls: search + sort */}
      <div className="flex flex-col gap-4 rounded-xl border bg-card/80 p-4 shadow-sm backdrop-blur md:flex-row">
        <div className="flex-1">
          <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <MagnifyingGlassIcon className="h-4 w-4" />
            Search
          </label>
          <div className="mt-1 flex items-center gap-2 rounded-md border bg-background px-3 py-2">
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name or description..."
              className="h-8 w-full bg-transparent text-sm outline-none"
            />
          </div>
        </div>

        <div className="md:w-64">
          <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <FunnelIcon className="h-4 w-4" />
            Sort
          </span>
          <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
            {(['stars', 'updated', 'created'] as SortKey[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => handleSortChange(key)}
                className={`rounded-md border px-2 py-1 capitalize ${
                  sortKey === key
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border text-muted-foreground hover:bg-muted/60'
                }`}
              >
                {key === 'stars'
                  ? 'Most stars'
                  : key === 'updated'
                  ? 'Recently updated'
                  : 'Newest'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row">
        {languages.length > 0 && (
          <div className="flex-1">
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Languages
            </h2>
            <div className="flex flex-wrap gap-2">
              {languages.map((language) => (
                <button
                  key={language}
                  type="button"
                  onClick={() => toggleLanguage(language)}
                  className={`rounded-full border px-3 py-1 text-xs ${
                    selectedLanguages.includes(language)
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border text-muted-foreground hover:bg-muted/60'
                  }`}
                >
                  {language}
                </button>
              ))}
            </div>
          </div>
        )}

        {topics.length > 0 && (
          <div className="flex-1">
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Topics
            </h2>
            <div className="flex max-h-32 flex-wrap gap-2 overflow-y-auto pr-1">
              {topics.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => toggleTopic(topic)}
                  className={`rounded-full border px-3 py-1 text-xs ${
                    selectedTopics.includes(topic)
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border text-muted-foreground hover:bg-muted/60'
                  }`}
                >
                  #{topic}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="mt-2">
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading repositories…</p>
        ) : filteredRepos.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No repositories match the current search and filters.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredRepos.map((repo) => {
              const readme = readmes[repo.name];
              const isActive = activeReadmeRepo === repo.name;

              return (
                <motion.article
                  key={repo.id}
                  layout
                  whileHover={{ y: -2 }}
                  className="flex flex-col gap-3 rounded-xl border bg-card/80 p-4 shadow-sm backdrop-blur"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <h3 className="text-sm font-semibold leading-tight">
                        <Link
                          href={`/projects/${encodeURIComponent(repo.name)}`}
                          className="hover:underline"
                        >
                          {repo.name}
                        </Link>
                      </h3>
                      {repo.description && (
                        <p className="line-clamp-2 text-xs text-muted-foreground">
                          {repo.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <StarIcon className="h-4 w-4" />
                      <span>{repo.stargazersCount}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                    {repo.language && (
                      <span className="rounded-full border border-border px-2 py-0.5">
                        {repo.language}
                      </span>
                    )}
                    {repo.topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="rounded-full border border-border px-2 py-0.5"
                      >
                        #{topic}
                      </span>
                    ))}
                    <span className="ml-auto">
                      Updated {formatDate(repo.pushedAt)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => fetchReadme(repo.name)}
                    className="flex items-center gap-2 text-xs font-medium text-primary hover:underline"
                  >
                    <BookOpenIcon className="h-4 w-4" />
                    {isActive ? 'Hide README highlight' : 'Show README highlight'}
                  </button>

                  {isActive && (
                    <div className="rounded-md border bg-muted/40 p-3 text-xs leading-relaxed text-muted-foreground">
                      {!readme ? (
                        <p>No README preview available for this repository.</p>
                      ) : readme.excerpt ? (
                        <p>{readme.excerpt}</p>
                      ) : (
                        <p>README found, but no preview could be generated.</p>
                      )}
                    </div>
                  )}

                  <div className="mt-auto flex items-center justify-between pt-1 text-xs">
                    <Link
                      href={repo.htmlUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
                    >
                      <CodeBracketIcon className="h-4 w-4" />
                      <span>View on GitHub</span>
                    </Link>
                    {repo.homepage && (
                      <Link
                        href={repo.homepage}
                        target="_blank"
                        rel="noreferrer"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        Live demo
                      </Link>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
