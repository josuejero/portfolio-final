"use client";

import React, { useState } from 'react';
import styles from '@/app/styles/Projects.module.scss';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState([
    {
      name: 'Selestino',
      description: 'A recipe website where you insert certain ingredients that the user has available at your current location, and it will output and show you relevant recipes of Peruvian dishes that include those ingredients.',
      progress: 70,
      category: 'Web Development',
      tags: ['Python', 'SQL', 'PostgreSQL', 'Google Cloud', 'Kubernetes', 'Docker', 'API', 'Git'],
      blogLink: '/blogs/selestino'
    },
    {
      name: 'Bartholomew',
      description: 'A website where the user connects to their Spotify account and it scans their profile. It will then take their 100 most listened-to songs of the last 30 days, and make a playlist out of the 100 songs with seamless transitions. It also has a feature to tweet whenever the user likes a song on Spotify.',
      progress: 50,
      category: 'Music Analysis',
      tags: ['JavaScript', 'Node.js', 'MERN Stack', 'Spotify API', 'Twitter API', 'OAuth', 'REST API', 'Git'],
      blogLink: '/blogs/bartholomew'
    },
    {
      name: 'Ezra',
      description: 'A school-centered to-do list/journal with an interactive map that lists all the closest tutors and their contact information.',
      progress: 30,
      category: 'Educational Tool',
      tags: ['Google Cloud', 'PostgreSQL', 'Python', 'API', 'Data Structures', 'Git'],
      blogLink: '/blogs/ezra'
    },
    {
      name: 'NEXT?',
      description: 'A Tinder-clone focused on movies. Users log movies they have seen, swipe based on their interest, and get AI-based recommendations for what movie to watch next. It also displays the services where the movie can be watched.',
      progress: 20,
      category: 'Social Platform',
      tags: ['JavaScript', 'Python', 'Django', 'MERN Stack', 'Movie Database API', 'Pandas', 'Data Science', 'Docker', 'Kubernetes', 'Git', 'AI', 'CI/CD', 'Jenkins'],
      blogLink: '/blogs/next'
    }
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
