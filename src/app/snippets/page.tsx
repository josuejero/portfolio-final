import SnippetsGallery from '@/components/Snippets/SnippetsGallery';
import { siteMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

const PAGE_TITLE = 'Snippets';
const PAGE_DESCRIPTION =
  'Live GitHub Gists covering code fragments, utilities, experiments, and implementation notes.';

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,

  openGraph: {
    title:
      `${PAGE_TITLE} | ${siteMetadata.title}`,
    description: PAGE_DESCRIPTION,
    url:
      `${siteMetadata.siteUrl}/snippets`,
    siteName: siteMetadata.siteName,
    locale: siteMetadata.locale,
    type: 'website',
    images: [
      {
        url: siteMetadata.image.url,
        width:
          siteMetadata.image.width,
        height:
          siteMetadata.image.height,
        alt: siteMetadata.image.alt,
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title:
      `${PAGE_TITLE} | ${siteMetadata.title}`,
    description: PAGE_DESCRIPTION,
    images: [
      siteMetadata.image.url,
    ],
  },
};

export default function SnippetsPage() {
  return <SnippetsGallery />;
}
