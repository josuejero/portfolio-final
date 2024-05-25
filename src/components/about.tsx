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
    // Fetch language data from GitHub API
    const fetchData = async () => {
      // Simulate API call
      const data: LanguageData[] = [
        { language: 'JavaScript', percentage: 50 },
        { language: 'TypeScript', percentage: 25 },
        { language: 'Python', percentage: 25 }
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
          Hi, I&aposm Josué Jerónimo, a passionate software engineer with experience in building web applications and solving complex problems. I love learning new technologies and improving my skills.
        </p>

        <div className={styles.skills}>
          <h3>Skills</h3>
          <ul>
            <li>JavaScript / TypeScript</li>
            <li>React / Next.js</li>
            <li>Python / Django</li>
            <li>HTML / CSS / SCSS</li>
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

        <div className={styles.timeline}>
          <h3>Professional Journey</h3>
          <ul>
            <li>2024: Started working at XYZ Company</li>
            <li>2023: Completed a major project on ABC</li>
            <li>2022: Graduated with a degree in Computer Science</li>
            <li>2021: Interned at DEF Company</li>
          </ul>
        </div>

        <div className={styles.coursework}>
          <h3>Relevant Coursework</h3>
          <ul>
            <li>CS101: Introduction to Programming - Project: Simple Calculator, Grade: A, Languages: Python</li>
            <li>CS202: Data Structures - Project: Library Management System, Grade: A, Languages: Java</li>
            <li>CS303: Web Development - Project: Personal Blog, Grade: A, Languages: JavaScript</li>
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
    default:
      return '#ccc';
  }
};

export default About;
