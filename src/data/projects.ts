import type {
  PortfolioProject,
  ProjectCaseStudy,
  ProjectDemo,
  ProjectEvidence,
  ProjectPresentation,
} from '@/types/project';

interface ReadmeEvidenceInput {
  label: string;
  description: string;
}

type GitHubProjectInput = {
  id: string;
  slug: string;
  name: string;
  owner: string;
  repositoryName: string;
  summary?: string;
  liveUrl?: string;
  readme?: ReadmeEvidenceInput;
  additionalEvidence?: readonly ProjectEvidence[];
  caseStudy?: ProjectCaseStudy;
  demo?: ProjectDemo;
  presentation?: ProjectPresentation;
};

function createGitHubProject({
  id,
  slug,
  name,
  owner,
  repositoryName,
  summary,
  liveUrl,
  readme,
  additionalEvidence = [],
  caseStudy,
  demo,
  presentation,
}: GitHubProjectInput): PortfolioProject {
  const sourceUrl =
    `https://github.com/${owner}/${repositoryName}`;

  return {
    id,
    slug,
    name,

    ...(summary ? { summary } : {}),

    repository: {
      provider: 'github',
      owner,
      name: repositoryName,
      url: sourceUrl,
    },

    links: {
      source: sourceUrl,
      ...(liveUrl ? { live: liveUrl } : {}),
    },

    evidence: [
      {
        id: 'source-repository',
        type: 'repository',
        label: 'Source repository',
        href: sourceUrl,
      },

      ...(readme
        ? [
            {
              id: 'readme',
              type: 'readme' as const,
              label: readme.label,
              href: `${sourceUrl}#readme`,
              description: readme.description,
            },
          ]
        : []),

      ...(liveUrl
        ? [
            {
              id: 'live-application',
              type: 'live-demo' as const,
              label: 'Live application',
              href: liveUrl,
            },
          ]
        : []),

      ...additionalEvidence,
    ],

    ...(caseStudy ? { caseStudy } : {}),
    ...(demo ? { demo } : {}),
    ...(presentation ? { presentation } : {}),
  };
}

export const PROJECTS = [
  createGitHubProject({
    id: 'finance-tracker',
    slug: 'finance-tracker',
    name: 'Finance Tracker',
    owner: 'josuejero',
    repositoryName: 'finance-tracker',
  }),

  createGitHubProject({
    id: 'product-affordability-predictor',
    slug: 'product-affordability-predictor',
    name: 'Product Affordability Predictor',
    owner: 'josuejero',
    repositoryName: 'product-affordability-predictor',
  }),

  createGitHubProject({
    id: 'selestino',
    slug: 'selestino',
    name: 'Selestino',
    owner: 'josuejero',
    repositoryName: 'selestino',
    summary:
      'Recipe recommendation website for personalized Peruvian dish suggestions, backed by Python, PostgreSQL, containerized deployment, and automated testing.',
    readme: {
      label: 'README: architecture, delivery, and testing',
      description:
        'Documents recommendation features, PostgreSQL, Docker, Kubernetes, Google Cloud, Jenkins CI/CD, pytest, and Selenium-based browser testing.',
    },
    caseStudy: {
      problem:
        'Turn user input into personalized Peruvian dish recommendations while keeping the application testable and deployable.',
      approach:
        'Built a Python and PostgreSQL web application and paired it with container orchestration, cloud infrastructure, continuous delivery, and automated testing.',
      implementation: [
        'Django recipe service with models, views, serializers, templates, migrations, and supporting application logic.',
        'Docker packaging plus Kubernetes deployment, service, ingress, autoscaling, configuration, and secret manifests.',
        'Jenkins CI/CD workflow with pytest coverage and Selenium-oriented functional testing.',
      ],
    },
  }),

  createGitHubProject({
    id: 'framecast-web-portal',
    slug: 'framecast-web-portal',
    name: 'FrameCast Web Portal',
    owner: 'josuejero',
    repositoryName: 'FrameCast-Web-Portal',
    summary:
      'Web portal for managing digital photo frames, photos, device configuration, and network-connected frame operations.',
    readme: {
      label: 'README: device management and API',
      description:
        'Documents device and photo management, REST endpoints, Bluetooth and Wi-Fi connectivity, local operation, and pytest-based testing.',
    },
    caseStudy: {
      problem:
        'Provide a browser-based control surface for configuring digital photo frames and managing the photos displayed on them.',
      approach:
        'Combined a web application with REST endpoints and device-side Bluetooth and Wi-Fi communication.',
      implementation: [
        'Device configuration and photo-management interfaces backed by persistent configuration and database migrations.',
        'REST operations for retrieving devices, uploading photos, and saving device and photo configuration.',
        'Bluetooth and Wi-Fi communication modules plus Python and JavaScript test coverage.',
      ],
    },
    demo: {
      type: 'framecast-configurator',
      label: 'FrameCast configuration simulator',
      description:
        'Assign photos to digital frames and experiment with the display configuration model used by the original FrameCast portal.',
      disclaimer:
        'In-browser portfolio simulation only — it does not connect to Bluetooth, Wi-Fi, Raspberry Pi hardware, or the original Flask backend.',
    },
  }),

  createGitHubProject({
    id: 'cheapest-grocery-finder',
    slug: 'cheapest-grocery-finder',
    name: 'Cheapest Grocery Finder',
    owner: 'josuejero',
    repositoryName: 'grocery-finder',
    summary:
      'Work-in-progress microservices application for aggregating grocery pricing, comparing stores, and experimenting with predictive price insights.',
    readme: {
      label: 'README: microservices architecture',
      description:
        'Documents the work-in-progress API gateway, authentication, user and price services, React frontend, FastAPI, PostgreSQL, MongoDB, Redis, Docker, and Terraform.',
    },
  }),

  createGitHubProject({
    id: 'fludde',
    slug: 'fludde',
    name: 'Fludde',
    owner: 'josuejero',
    repositoryName: 'Fludde',
    summary:
      'Android social application for sharing and discovering reviews of books, music, and movies through accounts, timelines, search, profiles, and external content APIs.',
    readme: {
      label: 'README: Android product flows',
      description:
        'Documents authentication, timelines, content search, profiles, review creation, application schema, networking flows, and external API configuration.',
    },
  }),

  createGitHubProject({
    id: 'portfolio-website',
    slug: 'portfolio-website',
    name: 'Portfolio Website',
    owner: 'josuejero',
    repositoryName: 'portfolio-final',
    summary:
      'Personal portfolio built with Next.js and TypeScript for presenting projects, technical skills, GitHub-backed activity, and contact workflows.',
    liveUrl:
      'https://portfolio-josuejero.vercel.app',
    readme: {
      label: 'README: portfolio architecture',
      description:
        'Documents the portfolio structure, GitHub integration, responsive interface, project surfaces, contact features, and Vercel deployment workflow.',
    },
  }),

  createGitHubProject({
    id: 'ozzie-gonzalez-photography',
    slug: 'ozzie-gonzalez-photography',
    name: 'Ozzie Gonzalez Photography',
    owner: 'CourajeousMax',
    repositoryName: 'ozzie-photography',
    summary:
      'Next.js photography website presenting a bilingual photographer through portfolio, contact, workshop, and image-gallery experiences.',
    liveUrl:
      'https://ozzie-photography.vercel.app',
    readme: {
      label: 'README: photography site features',
      description:
        'Documents portfolio, contact, workshop, image-upload and gallery experiences together with Jest-based testing.',
    },
    caseStudy: {
      problem:
        'Give a photographer a focused web presence for presenting work, sharing background information, promoting workshops, and receiving inquiries.',
      approach:
        'Organized the experience around portfolio, about, contact, and workshop routes with reusable Next.js interface components.',
      implementation: [
        'Portfolio gallery and image-upload functionality.',
        'Dedicated about, contact, and workshop experiences.',
        'Reusable navigation and gallery components with Jest tests for key interface behavior.',
      ],
    },
  }),

  createGitHubProject({
    id: 'hostdesk',
    slug: 'hostdesk',
    name: 'HostDesk',
    owner: 'josuejero',
    repositoryName: 'HostDesk',
    summary:
      'Authenticated sales-operations simulator for researching, qualifying, routing, and following up with prospects through persisted workflow data and stage gates.',
    liveUrl: 'https://josuejero.github.io/HostDesk/',
    readme: {
      label: 'README: full-stack workflow and security',
      description:
        'Documents the React and TypeScript frontend, PHP JSON API, MySQL persistence, Docker setup, authentication controls, workflow model, and test strategy.',
    },
    additionalEvidence: [
      {
        id: 'hostdesk-system-scope',
        type: 'metric',
        label: 'Recorded system scope',
        value:
          '17 API routes · 7 MySQL tables · 10 indexes · 7 foreign keys',
        href: 'https://github.com/josuejero/HostDesk/blob/1a6bfccda63f47780681aa12e6a853f0f64397c8/docs/project-metrics.md',
        description:
          'Repository metrics snapshot for the API and relational data model.',
      },
      {
        id: 'hostdesk-test-scope',
        type: 'metric',
        label: 'Test and security coverage',
        value:
          '32 executable tests · 16/17 API routes exercised · 10/10 state-changing routes covered for CSRF rejection',
        href: 'https://github.com/josuejero/HostDesk/blob/1a6bfccda63f47780681aa12e6a853f0f64397c8/docs/project-metrics.md',
        description:
          'Recorded frontend, API-integration, and Playwright evidence together with route-level security checks.',
      },
      {
        id: 'hostdesk-web-quality',
        type: 'metric',
        label: 'Recorded web quality',
        value:
          'Lighthouse: 100 performance · 100 accessibility · 96 best practices',
        href: 'https://github.com/josuejero/HostDesk/blob/1a6bfccda63f47780681aa12e6a853f0f64397c8/docs/project-metrics.md',
      },
    ],
    caseStudy: {
      problem:
        'Model a sales-operations workflow where qualification, routing, notes, follow-up tasks, and stage changes persist across an authenticated application.',
      approach:
        'Built a React and TypeScript client over a PHP 8.3 JSON API and MySQL 8 data model, then added containerized local orchestration, application-security controls, and automated regression coverage.',
      implementation: [
        'Persisted users, prospects, notes, activities, cadence tasks, and stage history across seven relational tables with ten indexes and seven foreign keys.',
        'Implemented 17 API route entries with password hashing, login lockout, session-ID regeneration, CSRF validation, and authenticated mutation controls.',
        'Created 32 executable tests spanning frontend behavior, Docker-backed API integration, and Playwright workflows; 16 of 17 listed API routes are directly exercised.',
      ],
      outcome:
        'The recorded evidence snapshot shows 71.36% line coverage, CSRF rejection coverage for all ten state-changing routes, and Lighthouse scores of 100 for performance and accessibility.',
    },
    demo: {
      type: 'hostdesk-operations',
      label: 'HostDesk operations workspace',
      description:
        'Work a seeded prospect queue, log a note, complete a cadence task, and exercise a representative handoff gate while inspecting the evidence behind the full-stack project.',
      disclaimer:
        'Portfolio simulation only. It uses seeded browser state and does not authenticate against or mutate the HostDesk PHP/MySQL backend. The handoff prerequisite shown here is intentionally representative rather than a verbatim production stage rule.',
    },
    presentation: {
      featured: true,
      order: 1,
    },
  }),

  createGitHubProject({
    id: 'botmedic',
    slug: 'botmedic',
    name: 'BotMedic',
    owner: 'josuejero',
    repositoryName: 'BotMedic',
    summary:
      'Discord incident-triage platform combining live diagnostics, telemetry, rule-driven troubleshooting, and generated support documentation.',
    liveUrl: 'https://josuejero.github.io/BotMedic/',
    readme: {
      label: 'README: incident triage platform',
      description:
        'Documents the TypeScript monorepo, Cloudflare Worker backend, Discord interactions, shared diagnostic rules, Workers KV telemetry, and companion support site.',
    },
    additionalEvidence: [
      {
        id: 'botmedic-product-scope',
        type: 'metric',
        label: 'Recorded diagnostic scope',
        value:
          '6 slash commands · 10 diagnostic rule cases · 10 generated runbooks',
        href: 'https://github.com/josuejero/BotMedic/blob/fbb405544c732c61eb6c18786a36dcdc81073183/metrics/current.json',
      },
      {
        id: 'botmedic-test-scope',
        type: 'metric',
        label: 'Recorded automated testing',
        value:
          '28 tests · 100% pass rate · 76.68% line coverage · 85.71% function coverage',
        href: 'https://github.com/josuejero/BotMedic/blob/fbb405544c732c61eb6c18786a36dcdc81073183/metrics/current.json',
      },
    ],
    caseStudy: {
      problem:
        'Turn Discord support incidents into repeatable diagnostic flows without letting troubleshooting logic drift away from commands, documentation, or regression fixtures.',
      approach:
        'Built a TypeScript serverless platform on Cloudflare Workers with Discord signature verification, Workers KV telemetry, shared command and rule packages, and a generated companion site.',
      implementation: [
        'Implemented six Discord slash commands and ten diagnostic rule cases backed by shared TypeScript metadata.',
        'Validated Discord interaction signatures with Ed25519 checks and covered both valid and invalid signature paths in tests.',
        'Generated ten runbook pages and companion-site command data from the same packages used by worker behavior and incident fixtures.',
      ],
      outcome:
        'The recorded metrics snapshot reports 28 automated tests at a 100% pass rate, 76.68% line coverage, and 85.71% function coverage.',
    },
    demo: {
      type: 'botmedic-triage',
      label: 'BotMedic incident-triage console',
      description:
        'Run the documented BotMedic command surfaces, replay representative support incidents, inspect matched diagnostic guidance, and watch browser-only telemetry accumulate.',
      disclaimer:
        'In-browser portfolio simulation only — it does not connect to Discord, Cloudflare Workers, Workers KV, or the deployed BotMedic service. Representative incident fixtures are intentionally labeled and do not claim to reproduce all ten repository rule cases verbatim.',
    },
    presentation: {
      featured: true,
      order: 2,
    },
  }),

  createGitHubProject({
    id: 'dqsentry',
    slug: 'dqsentry',
    name: 'DQSentry',
    owner: 'josuejero',
    repositoryName: 'DQSentry',
    summary:
      'Data-quality platform that converts raw CSV exports into validated, scored, explainable datasets, issue histories, and reviewable reporting artifacts.',
    liveUrl: 'https://dqsentry.streamlit.app/',
    readme: {
      label: 'README: data-quality pipeline',
      description:
        'Documents Python validation, DuckDB staging, Pandas and PyArrow processing, YAML-driven rules, issue lifecycle tracking, reporting, and automation.',
    },
    additionalEvidence: [
      {
        id: 'dqsentry-quality-snapshot',
        type: 'metric',
        label: 'Recorded validation snapshot',
        value:
          '27 validation checks · 98.22 overall score · 5 failed checks',
        href: 'https://github.com/josuejero/DQSentry/blob/42150c09eac8c56c2b557f92f1ee8f2653b7479c/metrics/metric_catalog.yml',
        description:
          'Synthetic demonstration snapshot used to exercise scoring and issue detection.',
      },
      {
        id: 'dqsentry-explainability',
        type: 'metric',
        label: 'Issue explainability',
        value:
          '5/5 sampled issue previews include root-cause and recommended-fix guidance',
        href: 'https://github.com/josuejero/DQSentry/blob/42150c09eac8c56c2b557f92f1ee8f2653b7479c/metrics/metric_catalog.yml',
      },
      {
        id: 'dqsentry-published-scorecard',
        type: 'case-study',
        label: 'Published scorecard and run history',
        value: '14 generated review artifacts',
        href: 'https://josuejero.github.io/DQSentry/',
      },
    ],
    caseStudy: {
      problem:
        'Make raw tabular exports reviewable by detecting quality problems, preserving issue history, and explaining what failed instead of returning only a pass-or-fail result.',
      approach:
        'Built a Python pipeline around DuckDB, Pandas, PyArrow/Parquet, and YAML-configured validation, then added scoring, issue lifecycle tracking, a Streamlit upload surface, and generated reporting.',
      implementation: [
        'Implemented 27 automated validation checks with deterministic synthetic fixtures and regression expectations.',
        'Tracked new, recurring, open, and not-seen issues while generating root-cause and recommended-fix guidance.',
        'Published HTML, CSV, and Parquet evidence and added a configurable quality gate requiring a score of at least 90 with no failed severity-5-or-higher checks.',
      ],
      outcome:
        'The recorded synthetic run scored 98.22, surfaced five failed checks, and produced root-cause plus recommended-fix guidance for all five sampled issue previews.',
    },
    presentation: {
      featured: true,
      order: 3,
    },
  }),

  createGitHubProject({
    id: 'cycleready',
    slug: 'cycleready',
    name: 'CycleReady',
    owner: 'josuejero',
    repositoryName: 'CycleReady',
    summary:
      'QA release-readiness demo for a synthetic CME recertification workflow, combining requirements traceability, manual and automated tests, defects, and release signoff evidence.',
    liveUrl:
      'https://josuejero.github.io/CycleReady/release-room.html',
    readme: {
      label: 'README: QA evidence and release workflow',
      description:
        'Documents the React and TypeScript workflow simulation, requirements matrix, manual QA, Playwright automation, UAT evidence, and release artifacts.',
    },
    additionalEvidence: [
      {
        id: 'cycleready-traceability',
        type: 'metric',
        label: 'Requirements and manual QA',
        value:
          '15/15 requirements covered · 25 manual test cases',
        href: 'https://github.com/josuejero/CycleReady/blob/0f315ca8df659eec0ecc32795036b01829ad757c/README.md',
      },
      {
        id: 'cycleready-automation',
        type: 'metric',
        label: 'Automation evidence',
        value:
          '27/27 Playwright tests passing · 13/15 requirements automated',
        href: 'https://github.com/josuejero/CycleReady/blob/0f315ca8df659eec0ecc32795036b01829ad757c/README.md',
      },
      {
        id: 'cycleready-release-decision',
        type: 'release',
        label: 'Recorded release decision',
        value: 'No-go · 1 open Sev1 · 2 open Sev2 defects',
        href: 'https://github.com/josuejero/CycleReady/blob/0f315ca8df659eec0ecc32795036b01829ad757c/reports/latest/release-decision.json',
      },
    ],
    caseStudy: {
      problem:
        'Demonstrate how a QA team can connect requirements, test evidence, defects, UAT, and severity-based release criteria into one release-readiness decision.',
      approach:
        'Built a React and TypeScript workflow simulation and paired it with documented requirements, manual cases, Playwright coverage, generated UAT evidence, and explicit release gates.',
      implementation: [
        'Documented 15 requirements, mapped all 15 to evidence, and supported them with 25 manual test cases.',
        'Implemented 27 Playwright tests with 27 of 27 passing and automated evidence for 13 of 15 requirements.',
        'Modeled eight synthetic workflow surfaces and generated a UAT packet alongside release-room evidence.',
      ],
      outcome:
        'Applying the recorded severity-based release criteria produced a no-go decision because one Sev1 and two Sev2 defects remained open.',
    },
    presentation: {
      featured: true,
      order: 4,
    },
  }),

] satisfies readonly PortfolioProject[];

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

export function getFeaturedProjects(): PortfolioProject[] {
  return PROJECTS.filter(
    (project) =>
      project.presentation?.featured === true,
  ).sort(
    (left, right) =>
      (left.presentation?.order ??
        Number.MAX_SAFE_INTEGER) -
      (right.presentation?.order ??
        Number.MAX_SAFE_INTEGER),
  );
}

export function getProjectById(
  id: string,
): PortfolioProject | undefined {
  const normalizedId = normalize(id);

  return PROJECTS.find(
    (project) =>
      normalize(project.id) === normalizedId,
  );
}

export function getProjectBySlug(
  slug: string,
): PortfolioProject | undefined {
  const normalizedSlug = normalize(slug);

  return PROJECTS.find(
    (project) =>
      normalize(project.slug) === normalizedSlug,
  );
}

export function getProjectByRepository(
  owner: string,
  repositoryName: string,
): PortfolioProject | undefined {
  const normalizedOwner = normalize(owner);
  const normalizedRepository =
    normalize(repositoryName);

  return PROJECTS.find(
    (project) =>
      normalize(project.repository.owner) ===
        normalizedOwner &&
      normalize(project.repository.name) ===
        normalizedRepository,
  );
}

export function getProjectByFullRepositoryName(
  fullName: string,
): PortfolioProject | undefined {
  const [owner, repositoryName, ...rest] =
    fullName.trim().split('/');

  if (
    !owner ||
    !repositoryName ||
    rest.length > 0
  ) {
    return undefined;
  }

  return getProjectByRepository(
    owner,
    repositoryName,
  );
}

export function getProjectByRepositoryName(
  repositoryName: string,
): PortfolioProject | undefined {
  const normalizedRepository =
    normalize(repositoryName);

  const matches = PROJECTS.filter(
    (project) =>
      normalize(project.repository.name) ===
      normalizedRepository,
  );

  return matches.length === 1
    ? matches[0]
    : undefined;
}
