'use client';

import { GitHubGist } from '@/types/github';
import {
  CalendarIcon,
  CodeBracketIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function SnippetsGallery() {
  const [gists, setGists] = useState<GitHubGist[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGist, setSelectedGist] = useState<GitHubGist | null>(null);

  useEffect(() => {
    fetchGists();
  }, []);

  const fetchGists = async () => {
    try {
      const response = await fetch('/api/github-projects/gists');
      const data = await response.json();
      setGists(data);
    } catch (error) {
      console.error('Failed to fetch gists:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">Loading snippets...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">Code Snippets</h1>
        <p className="text-lg text-muted-foreground">
          A collection of useful code snippets, algorithms, and utilities from my gists.
        </p>
      </motion.div>

      {/* Gists grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gists.map((gist, index) => (
          <motion.div
            key={gist.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card rounded-lg border shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <CodeBracketIcon className="w-6 h-6 text-primary" />
                <a
                  href={gist.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  View on GitHub
                </a>
              </div>
              
              <h3 className="font-semibold text-lg mb-2">
                {gist.description || Object.keys(gist.files)[0]}
              </h3>
              
              <div className="mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <CalendarIcon className="w-4 h-4" />
                  <span>
                    {new Date(gist.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-sm">
                  <span className="font-medium">Files: </span>
                  {Object.keys(gist.files).join(', ')}
                </div>
              </div>

              {/* Tags */}
              {gist.tags && gist.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {gist.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs bg-muted rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Preview first file content */}
              <div className="mt-4">
                <div className="text-sm font-medium mb-2">Preview:</div>
                <pre className="text-xs bg-muted p-3 rounded overflow-x-auto max-h-32">
                  {(
                    Object.values(gist.files)[0]?.content ??
                    'Preview not available for this gist'
                  ).substring(0, 200)}
                  ...
                </pre>
              </div>

              <button
                onClick={() => setSelectedGist(gist)}
                className="mt-4 w-full py-2 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
              >
                View Code
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Gist Detail Modal */}
      {selectedGist && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg border shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">
                  {selectedGist.description || 'Code Snippet'}
                </h3>
                <button
                  onClick={() => setSelectedGist(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              </div>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <span>
                  Created: {new Date(selectedGist.created_at).toLocaleDateString()}
                </span>
                <span>•</span>
                <span>
                  Updated: {new Date(selectedGist.updated_at).toLocaleDateString()}
                </span>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              {Object.entries(selectedGist.files).map(([filename, file]) => (
                <div key={filename} className="mb-8 last:mb-0">
                  <div className="flex items-center gap-2 mb-3">
                    <CodeBracketIcon className="w-5 h-5" />
                    <h4 className="font-medium">{filename}</h4>
                    {file.language && (
                      <span className="text-xs px-2 py-1 bg-muted rounded">
                        {file.language}
                      </span>
                    )}
                  </div>
                  <pre className="text-sm bg-muted p-4 rounded overflow-x-auto">
                    {file.content}
                  </pre>
                </div>
              ))}
            </div>
            
            <div className="p-6 border-t">
              <a
                href={selectedGist.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
              >
                View on GitHub
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
