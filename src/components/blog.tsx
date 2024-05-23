"use client";

import React, { useState } from 'react';
import styles from '@/app/styles/Blog.module.scss';

const Blog: React.FC = () => {
  const [posts, setPosts] = useState([
    {
      title: 'Progress on Project X',
      content: 'Today, I made significant progress on Project X by implementing feature Y...',
      date: 'May 23, 2024'
    },
    {
      title: 'Job Hunting Tips',
      content: 'Here are some useful tips for job hunting that I found effective...',
      date: 'May 20, 2024'
    },
  ]);

  const handleNewPost = (title: string, content: string) => {
    const newPost = {
      title,
      content,
      date: new Date().toLocaleDateString()
    };
    setPosts([...posts, newPost]);

    // TODO: Integrate LinkedIn and Twitter APIs to post the blog simultaneously
    // postToLinkedIn(newPost);
    // postToTwitter(newPost);
  };

  return (
    <div className={styles.blog}>
      <div className={styles.section}>
        <h2>Blog</h2>
        <div className={styles.newPost}>
          <h3>Create a New Post</h3>
          <form onSubmit={(e) => {
            e.preventDefault();
            const title = (e.target as any).title.value;
            const content = (e.target as any).content.value;
            handleNewPost(title, content);
            (e.target as any).reset();
          }}>
            <input type="text" name="title" placeholder="Post Title" required />
            <textarea name="content" placeholder="Post Content" required></textarea>
            <button type="submit">Post</button>
          </form>
        </div>
        <div className={styles.posts}>
          {posts.map((post, index) => (
            <div key={index} className={styles.post}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <span>{post.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;