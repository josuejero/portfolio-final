export type SkillCategory =
  | 'language'
  | 'framework'
  | 'tool'
  | 'cloud';

export interface PortfolioSkill {
  /**
   * Stable identifier for relationships and future role lenses.
   */
  id: string;

  name: string;
  category: SkillCategory;
  proficiency: number;
  yearsOfExperience: number;

  /**
   * Canonical project identifiers from src/data/projects.ts.
   *
   * Project names, slugs, and URLs must not be duplicated here.
   */
  projectIds: readonly string[];
}
