export type SkillCategory =
  | 'language'
  | 'framework'
  | 'tool'
  | 'cloud'
  | 'database'
  | 'devops';

export type AboutSkillGroupId =
  | 'core-languages-frameworks'
  | 'cloud-devops'
  | 'databases-tools';

export interface SkillAboutPresentation {
  group: AboutSkillGroupId;
  order: number;
  label?: string;
  details: string;
}

export interface SkillPresentation {
  /**
   * Include this skill in the interactive skill die.
   */
  showInDie?: boolean;

  /**
   * Presentation metadata for the About page.
   */
  about?: SkillAboutPresentation;
}

export interface PortfolioSkill {
  /**
   * Stable identifier for relationships and future role lenses.
   */
  id: string;

  name: string;
  aliases?: readonly string[];

  category: SkillCategory;

  /**
   * Optional because not every existing skill claim has a numeric
   * proficiency rating.
   */
  proficiency?: number;

  yearsOfExperience: number;

  /**
   * Canonical project identifiers from src/data/projects.ts.
   *
   * Project names, slugs, and URLs must not be duplicated here.
   */
  projectIds: readonly string[];

  presentation?: SkillPresentation;
}
