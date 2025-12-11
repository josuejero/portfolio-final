// src/components/Projects/Projects.tsx
'use client';

import type { GitHubPinnedRepo } from '@/types/github';
import {
  CodeBracketIcon,
  GlobeAltIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

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

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const Projects: React.FC = () => {
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
          No pinned repositories found. Pin up to six repos on your GitHub
          profile to populate this section.
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
            <motion.article
              key={repo.name}
              variants={itemVariants}
              className="group relative flex flex-col rounded-xl border border-neutral-800/80 bg-neutral-900/70 p-4 transition hover:border-neutral-500 hover:bg-neutral-900"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-neutral-50">
                    {repo.name}
                  </h3>
                  {repo.primaryLanguage?.name && (
                    <div className="mt-1 inline-flex items-center gap-1 text-xs text-neutral-400">
                      <span
                        className="inline-block h-2 w-2 rounded-full"
                        style={{
                          backgroundColor:
                            repo.primaryLanguage.color ?? '#737373',
                        }}
                      />
                      <span>{repo.primaryLanguage.name}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4 text-xs text-neutral-400">
                  <span className="inline-flex items-center gap-1">
                    <StarIcon className="h-3.5 w-3.5" />
                    <span>{repo.stargazerCount}</span>
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <CodeBracketIcon className="h-3.5 w-3.5" />
                    <span>{repo.forkCount}</span>
                  </span>
                </div>
              </div>

              {repo.description && (
                <p className="mt-2 line-clamp-3 text-xs text-neutral-300">
                  {repo.description}
                </p>
              )}

              {repo.topics.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {repo.topics.slice(0, 5).map((topic) => (
                    <span
                      key={topic}
                      className="rounded-full bg-neutral-800/80 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-neutral-300"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-3">
                  <Link
                    href={repo.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-neutral-300 hover:text-neutral-50"
                  >
                    <CodeBracketIcon className="h-3.5 w-3.5" />
                    <span>Source</span>
                  </Link>

                  {repo.homepageUrl && (
                    <Link
                      href={repo.homepageUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-neutral-300 hover:text-neutral-50"
                    >
                      <GlobeAltIcon className="h-3.5 w-3.5" />
                      <span>Live</span>
                    </Link>
                  )}
                </div>

                <Link
                  href={`/projects/${encodeURIComponent(repo.name)}`}
                  className="inline-flex items-center gap-1 rounded-full border border-neutral-700 px-2 py-0.5 text-[11px] font-medium text-neutral-200 hover:border-neutral-500"
                >
                  <span>Releases & details</span>
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default Projects;
