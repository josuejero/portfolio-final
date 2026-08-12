'use client';

import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
} from 'react';

import type { CommitActivity } from '@/types/github';

import styles from '../GithubActivity.module.css';

const CommitActivityCard = lazy(
  () => import('./CommitActivityCard'),
);

interface Props {
  commitActivity: CommitActivity[];
}

function CommitActivityPlaceholder() {
  return (
    <section
      className={styles.panel}
      aria-busy="true"
      aria-label="Commit activity chart loading"
    >
      <div className={styles.panelHeading}>
        <span>COMMIT ACTIVITY</span>
        <strong>LOADING</strong>
      </div>

      <div className={styles.chartPlaceholder}>
        The commit chart loads as this
        section approaches the viewport.
      </div>
    </section>
  );
}

export default function DeferredCommitActivityCard({
  commitActivity,
}: Props) {
  const containerRef =
    useRef<HTMLDivElement>(null);

  const [shouldLoad, setShouldLoad] =
    useState(false);

  useEffect(() => {
    if (shouldLoad) {
      return;
    }

    const element =
      containerRef.current;

    if (!element) {
      return;
    }

    if (
      !(
        'IntersectionObserver' in
        window
      )
    ) {
      setShouldLoad(true);
      return;
    }

    const observer =
      new IntersectionObserver(
        (entries) => {
          if (
            entries.some(
              (entry) =>
                entry.isIntersecting,
            )
          ) {
            setShouldLoad(true);
            observer.disconnect();
          }
        },
        {
          rootMargin: '300px 0px',
        },
      );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [shouldLoad]);

  return (
    <div ref={containerRef}>
      {shouldLoad ? (
        <Suspense
          fallback={
            <CommitActivityPlaceholder />
          }
        >
          <CommitActivityCard
            commitActivity={
              commitActivity
            }
          />
        </Suspense>
      ) : (
        <CommitActivityPlaceholder />
      )}
    </div>
  );
}
