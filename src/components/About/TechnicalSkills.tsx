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
    <section
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
            {ABOUT_SKILL_GROUPS.map((group) => {
              const skills = getAboutSkillsForGroup(group.id);

              return (
                <div
                  key={group.id}
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
                        <div
                          key={skill.id}
                          className="rounded-surface border border-border/60 bg-muted/30 p-4"
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
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
