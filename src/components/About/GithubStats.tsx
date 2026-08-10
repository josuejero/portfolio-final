'use client';

import type { GitHubStats } from '@/types/github';
import React from 'react';
import ActivityFeedCard from './github-stats/ActivityFeedCard';
import DeferredCommitActivityCard from './github-stats/DeferredCommitActivityCard';
import ContributionCalendarCard from './github-stats/ContributionCalendarCard';
import LanguageCard from './github-stats/LanguageCard';

interface GithubStatsProps {
  stats: GitHubStats;
  username: string;
}

export default function GithubStats({ stats, username }: GithubStatsProps) {
  if (stats.loading) {
    return (
      <div className="space-y-4">
        <div className="h-5 w-40 animate-pulse rounded bg-muted" />
        <div className="h-32 animate-pulse rounded bg-muted" />
        <div className="h-24 animate-pulse rounded bg-muted" />
      </div>
    );
  }

  if (stats.error) {
    return (
      <div className="rounded-control border border-destructive/40 bg-destructive/10 p-4 text-sm">
        <p className="font-medium text-foreground">
          GitHub data is currently unavailable.
        </p>
        <p className="mt-1 text-muted-foreground">{stats.error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h3 className="text-lg font-semibold tracking-tight">
          GitHub activity for{' '}
          <span className="font-mono text-brand">@{username}</span>
        </h3>
        <p className="text-xs text-muted-foreground">
          {stats.contributionsThisYear.toLocaleString()} contributions in the last 12 months
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1.1fr)]">
        <ContributionCalendarCard
          calendar={stats.contributionCalendar}
          contributionsThisYear={stats.contributionsThisYear}
        />
      </div>

      <DeferredCommitActivityCard commitActivity={stats.commitActivity} />

      <div className="grid gap-6 md:grid-cols-2">
        <LanguageCard topLanguages={stats.topLanguages} />
        <ActivityFeedCard activity={stats.activity} />
      </div>
    </div>
  );
}
