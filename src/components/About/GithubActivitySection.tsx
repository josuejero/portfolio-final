'use client';

import React, {
  Suspense,
} from 'react';

import ErrorBoundary from '@/components/common/ErrorBoundary';
import type { GitHubStats } from '@/types/github';

import styles from './GithubActivity.module.css';

const GithubStats = React.lazy(
  () => import('./GithubStats'),
);

type GithubActivitySectionProps = {
  stats: GitHubStats;
  username: string;
};

export default function GithubActivitySection({
  stats,
  username,
}: GithubActivitySectionProps) {
  return (
    <section
      className={styles.section}
      aria-labelledby="github-activity-heading"
    >
      <div className={styles.heading}>
        <div>
          <span>04 / LIVE SIGNAL</span>

          <h2 id="github-activity-heading">
            GitHub activity.
          </h2>
        </div>

        <p>
          Current public activity from
          @{username}, kept separate from
          curated project evidence.
        </p>
      </div>

      {stats.loading ? (
        <div className={styles.loading}>
          <span>READING GITHUB SIGNAL</span>
          <strong>LOADING…</strong>
        </div>
      ) : stats.error ? (
        <div className={styles.error}>
          <span>
            GITHUB DATA UNAVAILABLE
          </span>

          <p>{stats.error}</p>
        </div>
      ) : (
        <ErrorBoundary>
          <Suspense
            fallback={
              <div
                className={
                  styles.loading
                }
              >
                Loading GitHub activity…
              </div>
            }
          >
            <GithubStats
              stats={stats}
              username={username}
            />
          </Suspense>
        </ErrorBoundary>
      )}
    </section>
  );
}
