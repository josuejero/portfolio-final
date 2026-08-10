'use client';

import type { CommitActivity } from '@/types/github';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface Props {
  commitActivity: CommitActivity[];
}

export default function CommitActivityCard({ commitActivity }: Props) {
  return (
    <div
      className="rounded-surface border border-border/60 bg-card/50 p-4 shadow-soft"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-pill bg-brand/10 text-brand">
            <span className="text-xs">&lt;/&gt;</span>
          </span>
          <div>
            <p className="text-sm font-medium">Commit activity</p>
            <p className="text-xs text-muted-foreground">
              Last 12 months across your own repositories
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 h-56 w-full">
        {commitActivity.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={commitActivity}>
              <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} interval={1} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} tickLine={false} allowDecimals={false} />
              <Tooltip contentStyle={{ fontSize: 12 }} />
              <Line
                type="monotone"
                dataKey="commits"
                stroke="hsl(var(--brand))"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-sm text-muted-foreground">
            No recent commits found for this account.
          </p>
        )}
      </div>
    </div>
  );
}
