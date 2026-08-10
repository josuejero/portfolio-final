'use client';

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
    <section
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-3xl font-bold">
            <GraduationCap className="h-10 w-10 text-brand" />
            Education
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-2xl font-bold mb-2">{education.degree}</h3>
            <p className="text-muted-foreground">{education.school}</p>
            <p className="text-muted-foreground">{education.location}</p>
            <p className="text-muted-foreground">Graduating: {education.graduation}</p>
            <p className="mt-2 text-brand">{education.gpa}</p>
          </div>

          <div className="mt-4">
            <h4 className="text-xl font-semibold mb-2">Relevant Coursework:</h4>
            <div className="flex flex-wrap gap-2">
              {education.relevantCourses.map((course, index) => (
                <span
                  key={index}
                  className="rounded-pill border border-brand/30 bg-brand/10 px-3 py-1 text-sm text-brand"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
