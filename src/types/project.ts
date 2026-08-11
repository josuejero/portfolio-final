export type ProjectEvidenceType =
  | 'repository'
  | 'live-demo'
  | 'readme'
  | 'release'
  | 'metric'
  | 'screenshot'
  | 'case-study';

export interface ProjectRepository {
  provider: 'github';
  owner: string;
  name: string;
  url: string;
}

export interface ProjectLinks {
  source: string;
  live?: string;
  docs?: string;
}

export interface ProjectEvidence {
  id: string;
  type: ProjectEvidenceType;
  label: string;
  value?: string;
  href?: string;
  description?: string;
}

export interface ProjectCaseStudy {
  problem?: string;
  approach?: string;
  implementation?: readonly string[];
  outcome?: string;
}

export interface ProjectPresentation {
  featured?: boolean;
  order?: number;
  image?: string;
}

export type ProjectDemoType =
  | 'framecast-configurator'
  | 'hostdesk-operations'
  | 'botmedic-triage'
  | 'dqsentry-validator'
  | 'cycleready-release-room';

export interface ProjectDemo {
  type: ProjectDemoType;
  label: string;
  description: string;
  disclaimer?: string;
}

export interface PortfolioProject {
  /**
   * Stable internal identifier.
   *
   * Do not derive relationships from a display name or repository name.
   */
  id: string;

  /**
   * Stable portfolio URL segment.
   *
   * This is intentionally independent from the GitHub repository name so
   * repository renames do not have to break portfolio URLs.
   */
  slug: string;

  name: string;
  summary?: string;

  repository: ProjectRepository;
  links: ProjectLinks;

  /**
   * Explicit proof supporting claims made about this project.
   *
   * The initial catalog only records evidence we can already verify from
   * existing repository data. Richer evidence can be added incrementally.
   */
  evidence: readonly ProjectEvidence[];

  caseStudy?: ProjectCaseStudy;
  demo?: ProjectDemo;
  presentation?: ProjectPresentation;
}
