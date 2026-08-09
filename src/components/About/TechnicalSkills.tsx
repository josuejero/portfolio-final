'use client';

import { motion } from 'framer-motion';

import {
  ABOUT_SKILL_GROUPS,
  getAboutSkillsForGroup,
} from '@/data/skills';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

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
            {ABOUT_SKILL_GROUPS.map((group, idx) => {
              const skills = getAboutSkillsForGroup(group.id);

              return (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <h3 className="mb-4 text-xl font-semibold">
                    {group.label}
                  </h3>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {skills.map((skill) => {
                      const about =
                        skill.presentation?.about;

                      if (!about) {
                        return null;
                      }

                      return (
                        <motion.div
                          key={skill.id}
                          className="rounded-surface border border-border/60 bg-muted/30 p-4"
                          whileHover={{ scale: 1.02 }}
                          transition={{
                            type: 'spring',
                            stiffness: 300,
                          }}
                        >
                          <div className="mb-2 flex items-start justify-between">
                            <span className="text-lg font-medium">
                              {about.label ?? skill.name}
                            </span>

                            <span className="text-sm text-brand">
                              {skill.yearsOfExperience} years
                            </span>
                          </div>

                          <p className="text-sm text-muted-foreground">
                            {about.details}
                          </p>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
}
