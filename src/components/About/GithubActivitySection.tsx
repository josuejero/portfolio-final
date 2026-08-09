'use client';

import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import type { GitHubStats } from '@/types/github';

const GithubStats = React.lazy(() => import('./GithubStats'));

type GithubActivitySectionProps = {
  stats: GitHubStats;
  username: string;
};

export default function GithubActivitySection({ stats, username }: GithubActivitySectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-3xl font-bold">
            <Code2 className="h-10 w-10 text-brand" />
            GitHub Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          {stats.loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-32 rounded-surface bg-muted"></div>
              <div className="h-64 rounded-surface bg-muted"></div>
            </div>
          ) : stats.error ? (
            <p className="rounded-control border border-destructive/40 bg-destructive/10 p-4 text-center text-sm text-foreground">Error: {stats.error}</p>
          ) : (
            <ErrorBoundary>
              <Suspense fallback={<div className="text-sm text-muted-foreground">Loading GitHub activity…</div>}>
                <GithubStats stats={stats} username={username} />
              </Suspense>
            </ErrorBoundary>
          )}
        </CardContent>
      </Card>
    </motion.section>
  );
}
