import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Code2Icon, BarChart3Icon } from 'lucide-react';
import type { GitHubStats } from '@/types/github';

interface GithubStatsProps {
  stats: GitHubStats;
  username: string;
}

const GithubStats: React.FC<GithubStatsProps> = ({ stats, username }) => {
  const githubProfileUrl = `https://github.com/${username}`;
  const githubReposUrl = `https://github.com/${username}?tab=repositories`;

  const statCards = [
    { 
      icon: Code2Icon,
      label: 'Repositories',
      value: stats.totalRepos,
      color: 'text-emerald-500',
      link: githubReposUrl
    },
    { 
      icon: BarChart3Icon,
      label: 'Total Commits',
      value: stats.totalCommits,
      color: 'text-blue-500',
      link: githubProfileUrl
    }
  ];

  return (
    <div className="space-y-6">
      {/* Centered Stats Grid */}
      <div className="flex justify-center mb-8">
        <div className="grid grid-cols-2 gap-8 w-full max-w-2xl mx-auto">
          {statCards.map((stat) => (
            <motion.a
              key={stat.label}
              href={stat.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg 
                       transform hover:scale-105 transition-all duration-300
                       cursor-pointer group"
            >
              <div className="flex flex-col items-center text-center space-y-2">
                <stat.icon className={`h-12 w-12 ${stat.color} transform group-hover:scale-110 transition-transform`} />
                <div>
                  <p className="text-base text-gray-500 dark:text-gray-400">{stat.label}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value.toLocaleString()}</p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Activity Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
      >
        <a 
          href={`${githubProfileUrl}?tab=overview`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          <h3 className="text-lg font-semibold mb-4 inline-flex items-center gap-2 group">
            Commit Activity
            <svg 
              className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </h3>
        </a>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stats.commitActivity} margin={{ bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="month" 
                stroke="#6B7280"
                tick={{ fontSize: 12 }}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                stroke="#6B7280"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#F3F4F6'
                }}
                formatter={(value: number) => [`${value} commits`, 'Commits']}
              />
              <Line
                type="monotone"
                dataKey="commits"
                name="Commits"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ fill: '#3B82F6', r: 4 }}
                activeDot={{ r: 6, fill: '#60A5FA' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Language Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
      >
        <a 
          href={`${githubProfileUrl}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          <h3 className="text-lg font-semibold mb-4 inline-flex items-center gap-2 group">
            Language Distribution
            <svg 
              className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </h3>
        </a>
        <div className="space-y-4">
          {Object.entries(stats.topLanguages).map(([language, percentage]) => (
            <div key={language} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{language}</span>
                <span className="text-sm text-gray-500">{percentage}%</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default GithubStats;