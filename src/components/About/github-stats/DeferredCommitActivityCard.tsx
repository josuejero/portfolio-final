'use client';

import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
} from 'react';

import type { CommitActivity } from '@/types/github';

const CommitActivityCard = lazy(
  () => import('./CommitActivityCard'),
);

interface Props {
  commitActivity: CommitActivity[];
}

function CommitActivityPlaceholder() {
  return (
    <div
      className="rounded-surface border border-border/60 bg-card/50 p-4 shadow-soft"
      aria-busy="true"
      aria-label="Commit activity chart loading"
    >
      <div className="space-y-1">
        <p className="text-sm font-medium">
          Commit activity
        </p>

        <p className="text-xs text-muted-foreground">
          Last 12 months across your own repositories
        </p>
      </div>

      <div className="mt-4 flex h-56 items-center justify-center rounded-control bg-muted/30 px-4 text-center">
        <p className="text-xs text-muted-foreground">
          The commit chart loads as this section approaches the viewport.
        </p>
      </div>
    </div>
  );
}

export default function DeferredCommitActivityCard({
  commitActivity,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (shouldLoad) {
      return;
    }

    const element = containerRef.current;

    if (!element) {
      return;
    }

    if (!('IntersectionObserver' in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries.some(
            (entry) => entry.isIntersecting,
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
            commitActivity={commitActivity}
          />
        </Suspense>
      ) : (
        <CommitActivityPlaceholder />
      )}
    </div>
  );
}
