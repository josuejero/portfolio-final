// src/components/About.tsx
'use client';

import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { BookOpenIcon, AcademicCapIcon, CodeBracketIcon } from '@heroicons/react/24/outline';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGithubStats } from '@/hooks/useGithubStats';

const GithubStats = React.lazy(() => import('./GithubStats'));

const About = () => {
  const username = 'josuejero';
  const stats = useGithubStats(username);

  const skills = [
    {
      category: 'Programming',
      items: [
        { name: 'Python', proficiency: 90, years: 6 },
        { name: 'Java', proficiency: 85, years: 7 },
        { name: 'JavaScript', proficiency: 85, years: 5 },
        { name: 'C++', proficiency: 80, years: 5 },
      ],
    },
    {
      category: 'Cloud & DevOps',
      items: [
        { name: 'Docker', proficiency: 85, years: 3 },
        { name: 'Kubernetes', proficiency: 80, years: 2 },
        { name: 'Jenkins', proficiency: 75, years: 2 },
        { name: 'Google Cloud', proficiency: 80, years: 3 },
      ],
    },
    {
      category: 'Frameworks & Tools',
      items: [
        { name: 'Django', proficiency: 85, years: 4 },
        { name: 'React', proficiency: 80, years: 3 },
        { name: 'Node.js', proficiency: 75, years: 3 },
        { name: 'PostgreSQL', proficiency: 80, years: 4 },
      ],
    },
  ];

  const education = {
    degree: 'Bachelor of Science in Computer Engineering',
    school: 'Florida International University (FIU)',
    location: 'Miami, Florida',
    graduation: 'July 2024',
    gpa: "Dean's List (Spring 2020)",
    relevantCourses: [
      'Data Structures',
      'Operating Systems',
      'Mobile App Development',
      'Systems Programming',
      'Embedded Systems',
      'Computer Architecture',
      'Analytics & Cloud in ECE',
      'IoT Security',
      'Deep Learning in ECE',
    ],
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8">
      {/* Professional Summary */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpenIcon className="h-8 w-8 text-blue-600" />
              Professional Background
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Results-oriented Computer Engineering graduate with 7 years of programming experience,
              including hands-on work in software development, cloud computing, and automation.
              Demonstrated strong work ethic and time management skills by working part-time to
              self-finance college education while pursuing a full-time degree.
            </p>
          </CardContent>
        </Card>
      </motion.section>

      {/* Education */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AcademicCapIcon className="h-8 w-8 text-blue-600" />
              Education
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-xl font-bold">{education.degree}</h3>
              <p className="text-gray-600 dark:text-gray-400">{education.school}</p>
              <p className="text-gray-600 dark:text-gray-400">{education.location}</p>
              <p className="text-gray-600 dark:text-gray-400">Graduating: {education.graduation}</p>
              <p className="text-blue-600 dark:text-blue-400 mt-2">{education.gpa}</p>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold mb-2">Relevant Coursework:</h4>
              <div className="flex flex-wrap gap-2">
                {education.relevantCourses.map((course, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.section>

      {/* GitHub Activity */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-6"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CodeBracketIcon className="h-8 w-8 text-blue-600" />
              GitHub Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stats.loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              </div>
            ) : stats.error ? (
              <p className="text-red-500 text-center p-4">Error: {stats.error}</p>
            ) : (
              <Suspense fallback={<div>Loading...</div>}>
                <GithubStats stats={stats} username={username} />
              </Suspense>
            )}
          </CardContent>
        </Card>
      </motion.section>

      {/* Skills */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Technical Proficiency</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {skills.map((skillGroup) => (
              <div key={skillGroup.category}>
                <h3 className="text-xl font-semibold mb-6">{skillGroup.category}</h3>
                <div className="space-y-6">
                  {skillGroup.items.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{skill.name}</span>
                        <span>{skill.years} years</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <motion.div
                          className="bg-blue-600 h-2.5 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.proficiency}%` }}
                          transition={{ duration: 1, delay: 0.8 }}
                        ></motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.section>
    </div>
  );
};

export default About;