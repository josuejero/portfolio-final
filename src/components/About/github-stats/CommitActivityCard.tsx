'use client';

import type { CommitActivity } from '@/types/github';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import styles from '../GithubActivity.module.css';

interface Props {
  commitActivity: CommitActivity[];
}

export default function CommitActivityCard({
  commitActivity,
}: Props) {
  return (
    <section className={styles.panel}>
      <div className={styles.panelHeading}>
        <span>COMMIT ACTIVITY</span>

        <strong>
          12 MONTHS
        </strong>
      </div>

      <div className={styles.chart}>
        {commitActivity.length > 0 ? (
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <LineChart
              data={commitActivity}
            >
              <CartesianGrid
                stroke="rgba(241, 237, 228, 0.14)"
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="month"
                tick={{
                  fontSize: 11,
                  fill:
                    'rgba(241, 237, 228, 0.55)',
                }}
                interval={1}
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                tick={{
                  fontSize: 11,
                  fill:
                    'rgba(241, 237, 228, 0.55)',
                }}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />

              <Tooltip
                contentStyle={{
                  fontSize: 12,
                  background: '#f1ede4',
                  border: '0',
                  color: '#11120f',
                }}
              />

              <Line
                type="monotone"
                dataKey="commits"
                stroke="#d8ff43"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 4,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className={styles.empty}>
            No recent commits found for
            this account.
          </p>
        )}
      </div>
    </section>
  );
}
