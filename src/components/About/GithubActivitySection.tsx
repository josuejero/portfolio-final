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
            <Code2 className="h-10 w-10 text-blue-600" />
            GitHub Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          {stats.loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            </div>
          ) : stats.error ? (
            <p className="text-red-500 text-center p-4">Error: {stats.error}</p>
          ) : (
            <ErrorBoundary>
              <Suspense fallback={<div>Loading...</div>}>
                <GithubStats stats={stats} username={username} />
              </Suspense>
            </ErrorBoundary>
          )}
        </CardContent>
      </Card>
    </motion.section>
  );
}
