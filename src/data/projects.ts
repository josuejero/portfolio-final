import type {
  PortfolioProject,
  ProjectCaseStudy,
  ProjectDemo,
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
    presentation: {
      featured: true,
      order: 1,
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
    presentation: {
      featured: true,
      order: 2,
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
    presentation: {
      featured: true,
      order: 3,
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
