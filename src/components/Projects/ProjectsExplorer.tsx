'use client';

import type { GitHubRepositorySummary } from '@/types/github';
import { CodeBracketIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ProjectExplorerCard from './ProjectExplorerCard';

const gridVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { when: 'beforeChildren', staggerChildren: 0.04 } },
};

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
            err instanceof Error ? err.message : 'Failed to load repositories from GitHub.'
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
          <p className="text-sm text-muted-foreground">No repositories available.</p>
        ) : (
          <motion.div
            className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
            variants={gridVariants}
            initial="hidden"
            animate="visible"
          >
            {repos.map((repo) => (
              <ProjectExplorerCard key={repo.id} repo={repo} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
