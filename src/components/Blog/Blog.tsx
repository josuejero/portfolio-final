// src/components/Blog/Blog.tsx
'use client';

import {
  CalendarIcon,
  ClockIcon,
  TagIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

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
    excerpt:
      'A deep dive into creating a modern portfolio website using Next.js, TypeScript, and Tailwind CSS.',
    date: '2024-03-01',
    readTime: '5 min read',
    tags: ['Next.js', 'TypeScript', 'Web Development'],
    content: 'Full blog post content here...',
  },
  {
    id: '2',
    title: 'My Journey with Cloud Technologies',
    excerpt:
      'Exploring various cloud platforms and sharing insights from real-world projects.',
    date: '2024-02-15',
    readTime: '7 min read',
    tags: ['Cloud', 'AWS', 'DevOps'],
    content: 'Full blog post content here...',
  },
];

const Blog = () => {
  const [selectedPost, setSelectedPost] =
    useState<BlogPost | null>(null);

  return (
    <div className="mx-auto max-w-reading space-y-12 py-8">
      <motion.h1
        className="mb-8 text-center text-4xl font-bold"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Technical Blog
      </motion.h1>

      <div className="grid gap-8">
        {SAMPLE_POSTS.map((post, index) => (
          <motion.article
            key={post.id}
            className="overflow-hidden rounded-surface border border-border/60 bg-card/70 shadow-soft"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="p-6">
              <h2
                className="mb-2 cursor-pointer text-2xl font-bold transition-colors duration-fast hover:text-brand"
                onClick={() => setSelectedPost(post)}
              >
                {post.title}
              </h2>

              <div className="mb-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4" />
                  <span>
                    {new Date(
                      post.date,
                    ).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <ClockIcon className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              <p className="mb-4 text-muted-foreground">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-2">
                <TagIcon className="h-4 w-4 text-muted-foreground" />

                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-pill border border-brand/30 bg-brand/10 px-2 py-1 text-sm text-brand"
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

      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm">
          <motion.div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-panel border border-border/60 bg-card shadow-raised"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="p-6">
              <h2 className="mb-4 text-2xl font-bold">
                {selectedPost.title}
              </h2>

              <p className="text-muted-foreground">
                {selectedPost.content}
              </p>

              <Button
                className="mt-6"
                onClick={() => setSelectedPost(null)}
              >
                Close
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Blog;
