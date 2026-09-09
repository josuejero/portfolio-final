import SnippetsGallery from '@/components/Snippets/SnippetsGallery';
import { siteMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

const PAGE_TITLE = 'Snippets';
const PAGE_DESCRIPTION =
  'Live GitHub Gists covering code fragments, utilities, experiments, and implementation notes.';

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: '/snippets',
  },

  openGraph: {
    title:
      `${PAGE_TITLE} | ${siteMetadata.title}`,
    description: PAGE_DESCRIPTION,
    url:
      `${siteMetadata.siteUrl}/snippets`,
    siteName: siteMetadata.siteName,
    locale: siteMetadata.locale,
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title:
      `${PAGE_TITLE} | ${siteMetadata.title}`,
    description: PAGE_DESCRIPTION,
  },
};

export default function SnippetsPage() {
  return <SnippetsGallery />;
}
