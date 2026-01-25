'use client';

import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

export default function EducationSection() {
  return (
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
  );
}
