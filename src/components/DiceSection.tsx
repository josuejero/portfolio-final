import React, { useState } from 'react';
import Image from 'next/image';
import styles from '@/app/styles/DiceSection.module.scss';
import ReactImg from '../../public/reactjs.png';

interface Project {
  id: number;
  name: string;
  skills: string[];
}

const DiceSection: React.FC = () => {
  const skills = [
    { name: 'javascript', image: ReactImg },
    { name: 'python', image: ReactImg }, // Add appropriate images
    { name: 'mern stack', image: ReactImg },
    { name: 'node.js', image: ReactImg },
    { name: 'postgresql', image: ReactImg },
    { name: 'docker', image: ReactImg },
  ];

  const [diceValue, setDiceValue] = useState<number>(1);
  const [selectedSkill, setSelectedSkill] = useState<string>('');
  const [projects, setProjects] = useState<Project[]>([]);

  const rollDice = () => {
    const newDiceValue = Math.floor(Math.random() * 6 + 1);
    setDiceValue(newDiceValue);

    const randomSkill = skills[newDiceValue - 1];
    setSelectedSkill(randomSkill.name);

    const dummyProjects: Project[] = [
      {
        id: 1,
        name: 'Selestino: Recipe Website for Peruvian Dishes',
        skills: ['python', 'sql', 'postgresql', 'google cloud', 'kubernetes', 'docker', 'making an api', 'git'],
      },
      {
        id: 2,
        name: 'Bartholomew: Spotify Profile Analyzer and Playlist Creator',
        skills: ['javascript', 'node.js', 'mern stack', 'spotify api', 'twitter api', 'oauth', 'rest api', 'restful web services', 'data structures', 'object-oriented design', 'git'],
      },
      {
        id: 3,
        name: 'Ezra: School-Centered To-Do List/Journal with Tutor Map',
        skills: ['google cloud', 'postgresql', 'python', 'making an api', 'data structures', 'object-oriented design', 'git'],
      },
      {
        id: 4,
        name: 'Next? Movie-Based Social Platform',
        skills: ['javascript', 'python', 'django', 'mern stack', 'rest api', 'restful web services', 'movie database api', 'pandas', 'data science', 'making an api', 'oauth', 'docker', 'kubernetes', 'git', 'ai', 'ci/cd', 'jenkins'],
      },
    ];

    const filteredProjects = dummyProjects.filter(project => project.skills.includes(randomSkill.name));
    setProjects(filteredProjects);
  };

  return (
    <div className={styles.diceSection}>
      <h2 className={styles.discoverMyProjects}>
        Discover My Projects By Skill!
      </h2>
      <div className={styles.diceWrapper}>
        <div id="dice1" className={`${styles.dice} ${styles['show-' + diceValue]}`}>
          {skills.map((skill, index) => (
            <div key={index} className={`${styles.side} ${styles[`side${index + 1}`]}`}>
              {/* <Image src={skill.image} alt={`${skill.name} Logo`} priority /> */}
            </div>
          ))}
        </div>
        <div id="roll" className={styles.rollButton} onClick={rollDice}>
          <button className={styles.dieButton}>Roll dice!</button>
        </div>
      </div>
      {selectedSkill && (
        <div className={styles.selectedSkill}>
          <h2>Selected Skill: {selectedSkill}</h2>
          <h3>Projects:</h3>
          <ul>
            {projects.map(project => (
              <li key={project.id}>{project.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DiceSection;
