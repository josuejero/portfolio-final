// src/components/About/About.tsx
'use client'

import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Code2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useGithubStats from '@/hooks/useGithubStats';
import ErrorBoundary from '@/components/common/ErrorBoundary';

const GithubStats = React.lazy(() => import('./GithubStats'));

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
  ]
};

const TechnicalSkills = () => {
  const skillCategories = [
    {
      category: "Core Languages & Frameworks",
      skills: [
        { name: "Python", years: 6, details: "Django, Flask, Data Analysis" },
        { name: "Java", years: 7, details: "Android Development, Spring Boot" },
        { name: "JavaScript/TypeScript", years: 5, details: "React, Next.js, Node.js" },
        { name: "C++", years: 5, details: "Systems Programming, Embedded Systems" }
      ]
    },
    {
      category: "Cloud & DevOps",
      skills: [
        { name: "Docker & Kubernetes", years: 3, details: "Container Orchestration, Microservices" },
        { name: "Google Cloud Platform", years: 3, details: "App Engine, Cloud Functions, Cloud Run" },
        { name: "CI/CD", years: 2, details: "Jenkins, GitHub Actions" },
        { name: "Infrastructure as Code", years: 2, details: "Terraform, CloudFormation" }
      ]
    },
    {
      category: "Databases & Tools",
      skills: [
        { name: "PostgreSQL", years: 4, details: "Performance Optimization, Schema Design" },
        { name: "MongoDB", years: 2, details: "Document Design, Aggregation Pipeline" },
        { name: "Git & GitHub", years: 5, details: "Version Control, Code Review" },
        { name: "AWS Services", years: 2, details: "Lambda, S3, EC2, RDS" }
      ]
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-3xl font-bold">
            <Code2 className="h-8 w-8 text-blue-600" />
            Technical Proficiency
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-8">
            {skillCategories.map((category, idx) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <h3 className="text-xl font-semibold mb-4">{category.category}</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {category.skills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-lg">{skill.name}</span>
                        <span className="text-sm text-blue-600 dark:text-blue-400">
                          {skill.years} years
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{skill.details}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
};

const About = () => {
  const username = 'josuejero';
  const stats = useGithubStats(username);

  return (
    <div className="max-w-[calc(100vw-5rem)] mx-auto space-y-12 py-8 px-4">

      {/* Professional Summary */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-3xl font-bold">
              <BookOpen className="h-10 w-10 text-blue-600" />
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
            <CardTitle className="flex items-center gap-2 text-3xl font-bold">
              <GraduationCap className="h-10 w-10 text-blue-600" />
              Education
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold mb-2">{education.degree}</h3>
              <p className="text-gray-600 dark:text-gray-400">{education.school}</p>
              <p className="text-gray-600 dark:text-gray-400">{education.location}</p>
              <p className="text-gray-600 dark:text-gray-400">Graduating: {education.graduation}</p>
              <p className="text-blue-600 dark:text-blue-400 mt-2">{education.gpa}</p>
            </div>

            <div className="mt-4">
              <h4 className="text-xl font-semibold mb-2">Relevant Coursework:</h4>
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
            <CardTitle className="flex items-center gap-2 text-3xl font-bold">
              <Code2 className="h-10 w-10 text-blue-600" />
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
              <ErrorBoundary>
                <Suspense fallback={<div>Loading...</div>}>
                  <GithubStats stats={stats} username={username} />
                </Suspense>
              </ErrorBoundary>
            )}
          </CardContent>
        </Card>
      </motion.section>

      {/* Technical Skills Section */}
      <TechnicalSkills />
    </div>
  );
};

export default About;