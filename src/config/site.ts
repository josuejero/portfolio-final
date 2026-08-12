const personName =
  'Josue Sebastian Jeronimo';

const githubUsername =
  'josuejero';

export const siteConfig = {
  person: {
    name: personName,
  },

  site: {
    title:
      `${personName} — Engineering Portfolio`,

    description:
      'Software, QA, data quality, and platform support engineering work focused on systems that have to work.',

    url:
      'https://portfolio-josuejero.vercel.app',

    locale: 'en_US',

    image: {
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt:
        `${personName} — Engineering Portfolio`,
    },
  },

  github: {
    username: githubUsername,
    profileUrl:
      `https://github.com/${githubUsername}`,
  },

  social: {
    linkedin:
      'https://linkedin.com/in/josue-jeronimo',
  },
} as const;
