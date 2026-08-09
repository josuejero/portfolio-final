'use client';

import type { GitHubRepositorySummary } from '@/types/github';
import type { RoleLens } from '@/types/role-lens';
import {
  getDefaultRoleLens,
  getRoleLensBySlug,
  ROLE_LENSES,
} from '@/data/role-lenses';
import { partitionRepositoriesForRoleLens } from '@/lib/projects/role-lens';
import { CodeBracketIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import ProjectExplorerCard from './ProjectExplorerCard';

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.04,
    },
  },
};

const orderedRoleLenses = [...ROLE_LENSES].sort(
  (left, right) =>
    left.presentation.order - right.presentation.order,
);

const defaultRoleLens =
  getDefaultRoleLens() ?? orderedRoleLenses[0];

export default function ProjectsExplorer() {
  const [repos, setRepos] =
    useState<GitHubRepositorySummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] =
    useState<string | null>(null);

  const [activeLens, setActiveLens] =
    useState<RoleLens | undefined>(defaultRoleLens);

  useEffect(() => {
    const requestedSlug = new URLSearchParams(
      window.location.search,
    ).get('lens');

    if (!requestedSlug) {
      return;
    }

    const requestedLens =
      getRoleLensBySlug(requestedSlug);

    if (requestedLens) {
      setActiveLens(requestedLens);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          '/api/github-projects/repos',
        );

        if (!response.ok) {
          throw new Error(
            `Failed to load repositories (status ${response.status})`,
          );
        }

        const data: GitHubRepositorySummary[] =
          await response.json();

        if (!cancelled) {
          setRepos(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : 'Failed to load repositories from GitHub.',
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

  const partition = useMemo(() => {
    if (!activeLens) {
      return {
        matched: [],
        other: repos,
      };
    }

    return partitionRepositoriesForRoleLens(
      repos,
      activeLens,
    );
  }, [activeLens, repos]);

  const selectLens = (lens: RoleLens) => {
    setActiveLens(lens);

    const url = new URL(window.location.href);

    url.searchParams.set('lens', lens.slug);

    window.history.replaceState(
      null,
      '',
      `${url.pathname}${url.search}${url.hash}`,
    );
  };

  return (
    <section className="space-y-8">
      <header className="space-y-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Projects
            </h1>

            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              Explore my public GitHub repositories through
              role-focused views with live repository data.
            </p>
          </div>

          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <CodeBracketIcon className="h-4 w-4" />
            <span>{repos.length} repositories</span>
          </div>
        </div>

        <div className="space-y-3">
          <div
            role="group"
            aria-label="Project role lens"
            className="flex flex-wrap gap-2"
          >
            {orderedRoleLenses.map((lens) => {
              const selected =
                activeLens?.id === lens.id;

              return (
                <button
                  key={lens.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => selectLens(lens)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                    selected
                      ? 'border-brand bg-brand/10 text-brand'
                      : 'border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground'
                  }`}
                >
                  {lens.shortLabel}
                </button>
              );
            })}
          </div>

          {activeLens && (
            <p className="max-w-3xl text-sm text-muted-foreground">
              {activeLens.summary}
            </p>
          )}
        </div>
      </header>

      {error && (
        <div className="rounded-md border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-sm text-muted-foreground">
          Loading repositories…
        </p>
      ) : repos.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No repositories available.
        </p>
      ) : (
        <div className="space-y-10">
          {activeLens &&
            partition.matched.length > 0 && (
              <section className="space-y-4">
                <div>
                  <h2 className="text-lg font-semibold">
                    Best matches for {activeLens.shortLabel}
                  </h2>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Canonical portfolio projects prioritized
                    for this role lens.
                  </p>
                </div>

                <RepositoryGrid
                  repos={partition.matched}
                />
              </section>
            )}

          {activeLens &&
            partition.matched.length === 0 && (
              <div className="rounded-xl border border-border/70 bg-card/50 p-4">
                <p className="text-sm font-medium">
                  No catalogued matches are present in the
                  current GitHub feed.
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  The remaining public repositories are still
                  available below.
                </p>
              </div>
            )}

          {partition.other.length > 0 && (
            <section className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold">
                  Other repositories
                </h2>

                <p className="mt-1 text-xs text-muted-foreground">
                  Other canonical projects and uncatalogued
                  public repositories remain visible.
                </p>
              </div>

              <RepositoryGrid
                repos={partition.other}
              />
            </section>
          )}
        </div>
      )}
    </section>
  );
}

function RepositoryGrid({
  repos,
}: {
  repos: readonly GitHubRepositorySummary[];
}) {
  return (
    <motion.div
      className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
      variants={gridVariants}
      initial="hidden"
      animate="visible"
    >
      {repos.map((repo) => (
        <ProjectExplorerCard
          key={repo.id}
          repo={repo}
        />
      ))}
    </motion.div>
  );
}
