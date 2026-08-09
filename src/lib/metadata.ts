import { siteConfig } from '@/config/site';

export const siteMetadata = {
  title: siteConfig.site.title,
  description: siteConfig.site.description,
  siteUrl: siteConfig.site.url,
  siteName: siteConfig.person.name,
  creator: siteConfig.person.name,
  locale: siteConfig.site.locale,
  type: 'website' as const,
  image: siteConfig.site.image,
  social: {
    github: siteConfig.github.profileUrl,
    linkedin: siteConfig.social.linkedin,
  },
};
