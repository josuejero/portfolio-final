'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const skillCategories = [
  {
    category: 'Core Languages & Frameworks',
    skills: [
      { name: 'Python', years: 6, details: 'Django, Flask, Data Analysis' },
      { name: 'Java', years: 7, details: 'Android Development, Spring Boot' },
      { name: 'JavaScript/TypeScript', years: 5, details: 'React, Next.js, Node.js' },
      { name: 'C++', years: 5, details: 'Systems Programming, Embedded Systems' },
    ],
  },
  {
    category: 'Cloud & DevOps',
    skills: [
      { name: 'Docker & Kubernetes', years: 3, details: 'Container Orchestration, Microservices' },
      { name: 'Google Cloud Platform', years: 3, details: 'App Engine, Cloud Functions, Cloud Run' },
      { name: 'CI/CD', years: 2, details: 'Jenkins, GitHub Actions' },
      { name: 'Infrastructure as Code', years: 2, details: 'Terraform, CloudFormation' },
    ],
  },
  {
    category: 'Databases & Tools',
    skills: [
      { name: 'PostgreSQL', years: 4, details: 'Performance Optimization, Schema Design' },
      { name: 'MongoDB', years: 2, details: 'Document Design, Aggregation Pipeline' },
      { name: 'Git & GitHub', years: 5, details: 'Version Control, Code Review' },
      { name: 'AWS Services', years: 2, details: 'Lambda, S3, EC2, RDS' },
    ],
  },
];

export default function TechnicalSkills() {
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
                      transition={{ type: 'spring', stiffness: 300 }}
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
}
