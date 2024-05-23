"use client";

import React, { useEffect, useState } from 'react';
import styles from '@/app/styles/About.module.scss';

interface LanguageData {
  [key: string]: number;
}

const About: React.FC = () => {
  const [languages, setLanguages] = useState<LanguageData>({});
  const [totalSize, setTotalSize] = useState<number>(0);

  useEffect(() => {
    fetch('https://api.github.com/users/your-username/repos')
      .then(response => response.json())
      .then(data => {
        const promises = data.map((repo: any) =>
          fetch(repo.languages_url).then(response => response.json())
        );
        Promise.all(promises).then(results => {
          const languageData: LanguageData = {};
          let total = 0;
          results.forEach((result: LanguageData) => {
            for (const [language, size] of Object.entries(result)) {
              languageData[language] = (languageData[language] || 0) + size;
              total += size;
            }
          });
          setLanguages(languageData);
          setTotalSize(total);
        });
      });
  }, []);

  return (
    <div className={styles.about}>
      <div className={styles.section}>
        <h2>About Me</h2>
        <div className={styles.languages}>
          <h3>Programming Languages</h3>
          <div className={styles.languageBar}>
            {Object.entries(languages).map(([language, size]) => (
              <div
                key={language}
                className={styles.language}
                style={{ width: `${(size / totalSize) * 100}%` }}
              >
                {language}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.coursework}>
          <h3>Relevant Coursework</h3>
          <ul>
            <li>
              <strong>Course 1:</strong> Description, projects, grades, languages used, and stuff learned
            </li>
            <li>
              <strong>Course 2:</strong> Description, projects, grades, languages used, and stuff learned
            </li>
          </ul>
        </div>
        <div className={styles.projects}>
          <h3>Ongoing Projects</h3>
          <ul>
            <li>
              <strong>Project 1:</strong>
              <div className={styles.progressBar}>
                <div className={styles.progress} style={{ width: '70%' }}></div>
              </div>
              <a href="/blogs/project-1">Project 1 Blog</a>
            </li>
            <li>
              <strong>Project 2:</strong>
              <div className={styles.progressBar}>
                <div className={styles.progress} style={{ width: '50%' }}></div>
              </div>
              <a href="/blogs/project-2">Project 2 Blog</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
