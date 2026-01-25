'use client';

import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProfessionalSummary() {
  return (
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
  );
}
