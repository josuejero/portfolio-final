"use client";

import React, { useState } from 'react';
import styles from '@/app/styles/Projects.module.scss';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState([
    {
      name: 'Project A',
      description: 'A project about...',
      progress: 70,
      category: 'Web Development',
      tags: ['React', 'TypeScript'],
      blogLink: '/blogs/project-a'
    },
    {
      name: 'Project B',
      description: 'A project about...',
      progress: 30,
      category: 'Machine Learning',
      tags: ['Python', 'TensorFlow'],
      blogLink: '/blogs/project-b'
    },
  ]);

  return (
    <div className={styles.projects}>
      <div className={styles.section}>
        <h2>Projects</h2>
        {projects.map((project, index) => (
          <div key={index} className={styles.project}>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <div className={styles.progressBar}>
              <div
                className={styles.progress}
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
            <div className={styles.details}>
              <span>Category: {project.category}</span>
              <span>Tags: {project.tags.join(', ')}</span>
              <a href={project.blogLink}>Blog Post</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
