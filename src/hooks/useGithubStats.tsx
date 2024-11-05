import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MapIcon, CodeBracketIcon, UsersIcon, ChartBarIcon } from 'lucide-react';

const mockActivityData = Array.from({ length: 12 }, (_, i) => ({
  month: new Date(2024, i).toLocaleString('default', { month: 'short' }),
  commits: Math.floor(Math.random() * 50) + 30
}));

const GithubStats = ({ stats, username }) => {
  const statCards = [
    { 
      icon: CodeBracketIcon,
      label: 'Repositories',
      value: stats.totalRepos,
      color: 'text-emerald-500'
    },
    { 
      icon: ChartBarIcon,
      label: 'Commits',
      value: stats.totalCommits,
      color: 'text-blue-500'
    },
    { 
      icon: UsersIcon,
      label: 'Followers',
      value: stats.followers,
      color: 'text-violet-500'
    },
    { 
      icon: MapIcon,
      label: 'Following',
      value: stats.following,
      color: 'text-pink-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg"
          >
            <div className="flex items-center gap-3">
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value || '0'}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Activity Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
      >
        <h3 className="text-lg font-semibold mb-4">Commit Activity</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockActivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#F3F4F6'
                }}
              />
              <Line
                type="monotone"
                dataKey="commits"
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
        <h3 className="text-lg font-semibold mb-4">Language Distribution</h3>
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