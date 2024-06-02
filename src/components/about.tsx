"use client";

import React, { useEffect, useState } from 'react';
import styles from '@/app/styles/About.module.scss';

interface LanguageData {
  language: string;
  percentage: number;
}

const About: React.FC = () => {
  const [languageData, setLanguageData] = useState<LanguageData[]>([]);

  useEffect(() => {
    // Fetch language data from GitHub API (simulated here)
    const fetchData = async () => {
      const data: LanguageData[] = [
        { language: 'JavaScript', percentage: 40 },
        { language: 'TypeScript', percentage: 25 },
        { language: 'Python', percentage: 20 },
        { language: 'Java', percentage: 15 }
      ];
      setLanguageData(data);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.about}>
      <div className={styles.section}>
        <h2>About Me</h2>
        <p className={styles.biography}>
          Hi, I'm Josué Jerónimo. I was born in Lima, Peru, and moved to Miami, Florida, with my family when I was two years old. I was raised in Miami and stayed there until 2024, when I moved to Delaware. I graduated high school in 2017 and completed my Bachelor's degree in Computer Engineering from Florida International University in 2024. Ever since I was young, I have always loved building things, whether it be with Lego or creating entire computer applications. This passion led me to learn more about how hardware and software work. In my spare time, I enjoy growing my skills through YouTube videos and implementing what I learn in personal projects. My ambitions include working to expand my skills in both personal and team projects, and eventually earning a Master's and Doctorate in Computer Science.
        </p>

        <div className={styles.education}>
          <h3>Education</h3>
          <p>
            <strong>Florida International University, Miami, Florida</strong><br />
            Bachelor of Science in Computer Engineering<br />
            <em>Expected: July 2024</em><br />
            Dean’s List (Spring 2020)
          </p>
        </div>

        <div className={styles.skills}>
          <h3>Skills</h3>
          <ul>
            <li>Java</li>
            <li>C / C++</li>
            <li>Python</li>
            <li>JavaScript / TypeScript</li>
            <li>React / Next.js</li>
            <li>Node.js</li>
            <li>HTML / CSS / SCSS</li>
            <li>Django</li>
            <li>PostgreSQL</li>
            <li>Docker / Kubernetes</li>
            <li>Google Cloud</li>
            <li>Data Structures / Object-Oriented Design</li>
          </ul>
        </div>

        <div className={styles.languages}>
          <h3>Programming Languages</h3>
          <div className={styles.languageBar}>
            {languageData.map((data, index) => (
              <div
                key={index}
                className={styles.language}
                style={{ width: `${data.percentage}%`, backgroundColor: getColor(data.language) }}
              >
                {data.language} ({data.percentage}%)
              </div>
            ))}
          </div>
        </div>

        <div className={styles.projects}>
          <h3>Projects</h3>
          <ul>
            <li>
              <strong>Selestino:</strong> Recipe Website for Peruvian Dishes (In Progress)
              <ul>
                <li>Skills: Python, SQL, PostgreSQL, Google Cloud, Kubernetes, Docker, Making an API, Git</li>
                <li>Details: Developed using Python for backend processing with a focus on efficient data management through PostgreSQL. Implemented Docker/Kubernetes for application containerization and orchestration. Designed an intuitive API for querying recipes based on user-input ingredients. Utilizing Git for version control and Apache for web service hosting.</li>
              </ul>
            </li>
            <li>
              <strong>Bartholomew:</strong> Spotify Profile Analyzer and Playlist Creator (In Progress)
              <ul>
                <li>Skills: JavaScript, Node.js, MERN Stack, Spotify API, Twitter API, OAuth, REST API, RESTful Web Services, Data Structures, Object-Oriented Design, Git</li>
                <li>Details: Integrated Spotify API using JavaScript/Node.js to analyze user music preferences and create playlists with seamless transitions. Implemented Twitter API for social media interaction, allowing automatic tweeting of liked songs. Employed Data Structures and Object-Oriented Design for an optimal user experience.</li>
              </ul>
            </li>
            <li>
              <strong>Ezra:</strong> School-Centered To-Do List/Journal with Tutor Map (In Progress)
              <ul>
                <li>Skills: Google Cloud, PostgreSQL, Python, Making an API, Data Structures, Object-Oriented Design, Git</li>
                <li>Details: Built on Google Cloud for robust cloud hosting. Utilized PostgreSQL for storing and managing user data and tutor information. Developed backend using Python, focusing on complex data structures and user interactivity.</li>
              </ul>
            </li>
            <li>
              <strong>Next?</strong> Movie-Based Social Platform (In Progress)
              <ul>
                <li>Skills: JavaScript, Python, Django, MERN Stack, REST API, RESTful Web Services, Movie Database API, Pandas, Data Science, Making an API, OAuth, Docker, Kubernetes, Git, AI, CI/CD, Jenkins</li>
                <li>Details: Developing AI algorithms using Pandas to suggest movies based on user preferences and interactions. Incorporating Movie Database API to fetch detailed movie data. Focused on user authentication using OAuth and application deployment through Docker/Kubernetes.</li>
              </ul>
            </li>
          </ul>
        </div>

        <div className={styles.coursework}>
          <h3>Relevant Coursework</h3>
          <ul>
            <li>Advanced Programming (Java, C++): Grade: A</li>
            <li>Data Structures: Grade: A</li>
            <li>Software Engineering Principles: Grade: A</li>
            <li>Mobile Application Development (Android): Grade: A</li>
            <li>IoT Security (Python, Raspberry Pi): Grade: A</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const getColor = (language: string) => {
  switch (language) {
    case 'JavaScript':
      return '#f1e05a';
    case 'TypeScript':
      return '#2b7489';
    case 'Python':
      return '#3572A5';
    case 'Java':
      return '#b07219';
    default:
      return '#ccc';
  }
};

export default About;
