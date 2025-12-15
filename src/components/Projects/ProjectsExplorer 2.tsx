// src/components/Projects/ProjectsExplorer.tsx
import type { GitHubRepositorySummary } from '@/types/github';
import {
  BookOpenIcon,
  CodeBracketIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';

type SortKey = 'stars' | 'updated' | 'created';

interface GitHubReadme {
  repo: string;
  path: string;
  excerpt: string;
  fullMarkdown: string;
  lastFetched: string;
}

const fetchRepos = async (): Promise<GitHubRepositorySummary[]> => {
  const response = await fetch('/api/github-projects/repos');
  if (!response.ok) {
    throw new Error('Failed to fetch repositories');
  }
  return response.json();
};

export default function ProjectsExplorer() {
  const [repos, setRepos] = useState<GitHubRepositorySummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortKey>('stars');
  const [selectedReadme, setSelectedReadme] = useState<GitHubReadme | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const data = await fetchRepos();
      setRepos(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load repositories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const fetchReadme = async (repoName: string) => {
    try {
      const response = await fetch(`/api/github-projects/readme/${repoName}`);
      if (!response.ok) return null;
      const data = await response.json();
      return data as GitHubReadme;
    } catch {
      return null;
    }
  };

  const matchesSearch = useCallback((repo: GitHubRepositorySummary): boolean => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      repo.name.toLowerCase().includes(query) ||
      (repo.description?.toLowerCase() || '').includes(query) ||
      repo.topics.some(topic => topic.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  const matchesLanguage = useCallback((repo: GitHubRepositorySummary): boolean => {
    if (!selectedLanguage) return true;
    return repo.language === selectedLanguage;
  }, [selectedLanguage]);

  const matchesTopic = useCallback((repo: GitHubRepositorySummary): boolean => {
    if (selectedTopics.length === 0) return true;
    return selectedTopics.every(topic => repo.topics.includes(topic));
  }, [selectedTopics]);

  const filteredRepos = useMemo(() => {
    return repos
      .filter(repo => matchesSearch(repo) && matchesLanguage(repo) && matchesTopic(repo))
      .sort((a, b) => {
        switch (sortBy) {
          case 'stars':
            return b.stargazersCount - a.stargazersCount;
          case 'updated':
            return new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime();
          case 'created':
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          default:
            return 0;
        }
      });
  }, [repos, searchQuery, selectedLanguage, selectedTopics, sortBy, matchesSearch, matchesLanguage, matchesTopic]);

  const toggleTopic = (topic: string) => {
    setSelectedTopics(prev =>
      prev.includes(topic)
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const languages = useMemo(() => {
    const langSet = new Set(repos.map(repo => repo.language).filter(Boolean));
    return Array.from(langSet).sort();
  }, [repos]);

  const topics = useMemo(() => {
    const topicSet = new Set(repos.flatMap(repo => repo.topics));
    return Array.from(topicSet).sort();
  }, [repos]);

  // ... rest of the component code including JSX ...
  // Note: The JSX code references the state variables that are now properly declared above

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Controls */}
      <div className="mb-8 space-y-4">
        {/* Search */}
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search repositories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <FunnelIcon className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-medium">Filters:</span>
          </div>

          {/* Language filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedLanguage(null)}
              className={`px-3 py-1 text-sm rounded-full ${
                selectedLanguage === null
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              All Languages
            </button>
            {languages.map(lang => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang === selectedLanguage ? null : lang)}
                className={`px-3 py-1 text-sm rounded-full ${
                  selectedLanguage === lang
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Topic filter */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium mr-2">Topics:</span>
            {topics.slice(0, 10).map(topic => (
              <button
                key={topic}
                onClick={() => toggleTopic(topic)}
                className={`px-3 py-1 text-sm rounded-full ${
                  selectedTopics.includes(topic)
                    ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">Sort by:</span>
          <div className="flex gap-2">
            {(['stars', 'updated', 'created'] as SortKey[]).map(key => (
              <button
                key={key}
                onClick={() => setSortBy(key)}
                className={`px-3 py-1 text-sm rounded-full ${
                  sortBy === key
                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading repositories...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12 text-red-600 dark:text-red-400">
          <p>{error}</p>
          <button
            onClick={load}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="mb-6 text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredRepos.length} of {repos.length} repositories
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRepos.map(repo => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={`/projects/${repo.name}`}>
                  <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-5 hover:border-blue-300 dark:hover:border-blue-700 transition-colors cursor-pointer h-full bg-white dark:bg-gray-900">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-lg truncate">{repo.name}</h3>
                      <div className="flex items-center gap-2">
                        <StarIcon className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm">{repo.stargazersCount}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                      {repo.description || 'No description'}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {repo.topics.slice(0, 3).map(topic => (
                        <span
                          key={topic}
                          className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded"
                        >
                          {topic}
                        </span>
                      ))}
                      {repo.topics.length > 3 && (
                        <span className="px-2 py-1 text-xs text-gray-500">
                          +{repo.topics.length - 3}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        {repo.language && (
                          <>
                            <CodeBracketIcon className="h-4 w-4" />
                            <span>{repo.language}</span>
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpenIcon className="h-4 w-4" />
                        <span>Updated {new Date(repo.pushedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}