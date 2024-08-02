import React, { useState } from 'react';
import Image from 'next/image';
import styles from '@/app/styles/DiceSection.module.scss';
import ReactImg from '../../public/reactjs.png';
import PythonImg from '../../public/python.png'; // Assuming you have a Python logo
import MernImg from '../../public/mern.png'; // Assuming you have a MERN logo
import NodeJsImg from '../../public/nodejs.png'; // Assuming you have a Node.js logo
import PostgresqlImg from '../../public/postgresql.png'; // Assuming you have a PostgreSQL logo
import DockerImg from '../../public/docker.png'; // Assuming you have a Docker logo

interface Project {
  id: number;
  name: string;
  skills: string[];
}

const DiceSection: React.FC = () => {
  const skills = [
    { name: 'javascript', image: ReactImg },
    { name: 'python', image: PythonImg },
    { name: 'mern stack', image: MernImg },
    { name: 'node.js', image: NodeJsImg },
    { name: 'postgresql', image: PostgresqlImg },
    { name: 'docker', image: DockerImg },
  ];

  const [diceValue, setDiceValue] = useState<number>(1);
  const [selectedSkill, setSelectedSkill] = useState<string>('');
  const [projects, setProjects] = useState<Project[]>([]);

  const rollDice = () => {
    const newDiceValue = Math.floor(Math.random() * 6) + 1;
    animateDice(newDiceValue);
  };

  const animateDice = (value: number) => {
    const dice = document.querySelector(`.${styles.dice}`);
    dice?.classList.add(styles.rolling);

    setTimeout(() => {
      switch (value) {
        case 1:
          dice?.setAttribute('style', 'transform: rotateX(0deg) rotateY(0deg);');
          setSelectedSkill('javascript');
          break;
        case 2:
          dice?.setAttribute('style', 'transform: rotateX(-90deg) rotateY(0deg);');
          setSelectedSkill('node.js');
          break;
        case 3:
          dice?.setAttribute('style', 'transform: rotateX(0deg) rotateY(90deg);');
          setSelectedSkill('python');
          break;
        case 4:
          dice?.setAttribute('style', 'transform: rotateX(0deg) rotateY(-90deg);');
          setSelectedSkill('docker');
          break;
        case 5:
          dice?.setAttribute('style', 'transform: rotateX(90deg) rotateY(0deg);');
          setSelectedSkill('postgresql');
          break;
        case 6:
          dice?.setAttribute('style', 'transform: rotateX(180deg) rotateY(0deg);');
          setSelectedSkill('mern stack');
          break;
        default:
          break;
      }
      dice?.classList.remove(styles.rolling);

      const randomSkill = skills.find(skill => skill.name === selectedSkill);
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

      const filteredProjects = dummyProjects.filter(project => project.skills.includes(randomSkill?.name || ''));
      setProjects(filteredProjects);
    }, 4000);
  };

  return (
    <div className={styles.diceSection}>
      <h2 className={styles.discoverMyProjects}>
        Discover My Projects By Skill!
      </h2>
      <div className={styles.diceWrapper}>
        <div className={`${styles.dice} ${styles['show-' + diceValue]}`}>
          {skills.map((skill, index) => (
            <div key={index} className={`${styles.side} ${styles[`side${index + 1}`]}`}>
              <div className={styles.imageContainer}>
                <Image src={skill.image} alt={`${skill.name} Logo`} priority layout="fill" objectFit="contain" />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.rollButton} onClick={rollDice}>
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