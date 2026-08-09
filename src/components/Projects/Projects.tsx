'use client';

import type { GitHubPinnedRepo } from '@/types/github';
import { CodeBracketIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import PinnedProjectCard from './PinnedProjectCard';

const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      when: 'beforeChildren',
      staggerChildren: 0.06,
    },
  },
};

export default function Projects() {
  const [repos, setRepos] = useState<GitHubPinnedRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPinned = async () => {
      try {
        const res = await fetch('/api/github-projects/pinned');
        if (!res.ok) {
          throw new Error('Failed to load pinned projects');
        }
        const data: GitHubPinnedRepo[] = await res.json();
        setRepos(data);
      } catch (err) {
        console.error(err);
        setError('Could not load pinned projects from GitHub.');
      } finally {
        setLoading(false);
      }
    };

    fetchPinned();
  }, []);

  return (
    <section
      id="projects"
      className="rounded-panel border border-border/60 bg-card/50 p-6 shadow-soft backdrop-blur"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Selected GitHub work
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Pulled from the repositories currently pinned on my GitHub profile.
          </p>
        </div>

        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 rounded-pill border border-border px-3 py-1 text-xs font-medium text-foreground transition-colors duration-fast hover:border-brand/50 hover:bg-muted hover:text-brand"
        >
          <span>Explore all projects</span>
          <CodeBracketIcon className="h-4 w-4" />
        </Link>
      </div>

      {loading && (
        <p className="mt-6 text-sm text-muted-foreground">
          Loading pinned repositories from GitHub...
        </p>
      )}

      {!loading && error && (
        <p className="mt-6 rounded-control border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-foreground">{error}</p>
      )}

      {!loading && !error && repos.length === 0 && (
        <p className="mt-6 text-sm text-muted-foreground">
          No pinned repositories found. Pin up to six repos on your GitHub profile to populate this section.
        </p>
      )}

      {!loading && !error && repos.length > 0 && (
        <motion.div
          className="mt-6 grid gap-4 md:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {repos.map((repo) => (
            <PinnedProjectCard key={repo.name} repo={repo} />
          ))}
        </motion.div>
      )}
    </section>
  );
}
