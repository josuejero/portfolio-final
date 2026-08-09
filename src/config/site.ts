const personName = 'Josue Sebastian Jeronimo';
const githubUsername = 'josuejero';

export const siteConfig = {
  person: {
    name: personName,
  },

  site: {
    title: `${personName} - Portfolio`,
    description:
      'Full-Stack Developer specializing in Python, Java, and Cloud Technologies',
    url: 'https://portfolio-josuejero.vercel.app',
    locale: 'en_US',
    image: {
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: `${personName} - Full-Stack Developer`,
    },
  },

  github: {
    username: githubUsername,
    profileUrl: `https://github.com/${githubUsername}`,
  },

  social: {
    linkedin: 'https://linkedin.com/in/josue-jeronimo',
  },

  services: {
    websiteHelp: {
      calendlyUrl: `https://calendly.com/${githubUsername}/60-min-standard`,
    },
  },
} as const;
