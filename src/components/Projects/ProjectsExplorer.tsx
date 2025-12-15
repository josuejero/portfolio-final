// FILE: src/components/Projects/ProjectsExplorer.tsx
'use client';

import type { GitHubRepositorySummary } from '@/types/github';
import {
  CodeBracketIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';


// interface AggregateStats {
//   totalStars: number;
//   totalForks: number;
//   totalOpenIssues: number;
// }

// const initialAggregate: AggregateStats = {
//   totalStars: 0,
//   totalForks: 0,
//   totalOpenIssues: 0,
// };

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

  // const aggregate = useMemo(
  //   () =>
  //     repos.reduce<AggregateStats>(
  //       (acc, repo) => {
  //         acc.totalStars += repo.stargazersCount;
  //         acc.totalForks += repo.forksCount;
  //         acc.totalOpenIssues += repo.openIssuesCount;
  //         return acc;
  //       },
  //       { ...initialAggregate },
  //     ),
  //   [repos],
  // );



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
          {/* <div className="flex items-center gap-1">
            <StarIcon className="h-4 w-4" />
            <span>{aggregate.totalStars} stars</span>
          </div> */}
          {/* <div className="flex items-center gap-1">
            <BookOpenIcon className="h-4 w-4" />
            <span>{aggregate.totalOpenIssues} open issues</span>
          </div> */}
        </div>
      </header>

      {error && (
        <div className="rounded-md border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">
          {error}
        </div>
      )}

      <div className="mt-2">
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading repositories…</p>
        ) : repos.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No repositories available.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {repos.map((repo) => {

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
