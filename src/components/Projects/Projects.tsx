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
      className="mt-12 rounded-2xl border border-neutral-800/60 bg-neutral-900/40 p-6 shadow-lg backdrop-blur"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-neutral-50">
            Featured GitHub projects
          </h2>
          <p className="mt-1 text-sm text-neutral-400">
            Controlled by your pinned repositories on GitHub.
          </p>
        </div>

        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 rounded-full border border-neutral-700 px-3 py-1 text-xs font-medium text-neutral-200 hover:border-neutral-500 hover:bg-neutral-800/70"
        >
          <span>Open repo explorer</span>
          <CodeBracketIcon className="h-4 w-4" />
        </Link>
      </div>

      {loading && (
        <p className="mt-6 text-sm text-neutral-400">
          Loading pinned repositories from GitHub...
        </p>
      )}

      {!loading && error && (
        <p className="mt-6 text-sm text-red-400">{error}</p>
      )}

      {!loading && !error && repos.length === 0 && (
        <p className="mt-6 text-sm text-neutral-400">
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
