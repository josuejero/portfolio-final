export interface RoleLensPresentation {
  order: number;
  default?: boolean;
}

export interface RoleLens {
  /**
   * Stable internal identifier used for relationships.
   */
  id: string;

  /**
   * Stable URL/query-string representation for future lens UI.
   */
  slug: string;

  label: string;
  shortLabel: string;
  summary: string;

  /**
   * Canonical identifiers from src/data/skills.ts.
   */
  skillIds: readonly string[];

  /**
   * Canonical identifiers from src/data/projects.ts.
   *
   * These are curated project priorities for the lens. They must remain
   * supportable by at least one selected skill relationship.
   */
  projectIds: readonly string[];

  presentation: RoleLensPresentation;
}
