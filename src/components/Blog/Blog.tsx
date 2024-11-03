// src/components/Blog/Blog.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarIcon, TagIcon, ClockIcon } from '@heroicons/react/24/outline';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string;
}

const SAMPLE_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Building a Portfolio with Next.js and TypeScript',
    excerpt: 'A deep dive into creating a modern portfolio website using Next.js, TypeScript, and Tailwind CSS.',
    date: '2024-03-01',
    readTime: '5 min read',
    tags: ['Next.js', 'TypeScript', 'Web Development'],
    content: 'Full blog post content here...'
  },
  {
    id: '2',
    title: 'My Journey with Cloud Technologies',
    excerpt: 'Exploring various cloud platforms and sharing insights from real-world projects.',
    date: '2024-02-15',
    readTime: '7 min read',
    tags: ['Cloud', 'AWS', 'DevOps'],
    content: 'Full blog post content here...'
  }
];

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-12">
      <motion.h1
        className="text-4xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Technical Blog
      </motion.h1>

      <div className="grid gap-8">
        {SAMPLE_POSTS.map((post, index) => (
          <motion.article
            key={post.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2 hover:text-blue-600 cursor-pointer"
                  onClick={() => setSelectedPost(post)}>
                {post.title}
              </h2>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                <div className="flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ClockIcon className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-2">
                <TagIcon className="h-4 w-4 text-gray-500" />
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Modal for full post */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">{selectedPost.title}</h2>
              <p className="text-gray-600 dark:text-gray-300">{selectedPost.content}</p>
              <button
                onClick={() => setSelectedPost(null)}
                className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Blog;