import Layout from '@/components/common/Layout';
import WebsiteHelp from '@/components/WebsiteHelp';
import { siteMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

const PAGE_TITLE = 'Website Help';
const PAGE_DESCRIPTION =
  'Book a 60-minute Website Help Zoom to triage copy, layout, forms, or hosting questions and walk away with an actionable to-do list.';

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: `${PAGE_TITLE} | ${siteMetadata.title}`,
    description: PAGE_DESCRIPTION,
    url: `${siteMetadata.siteUrl}/website-help`,
    siteName: siteMetadata.siteName,
    locale: siteMetadata.locale,
    type: 'website',
    images: [
      {
        url: siteMetadata.image.url,
        width: siteMetadata.image.width,
        height: siteMetadata.image.height,
        alt: siteMetadata.image.alt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${PAGE_TITLE} | ${siteMetadata.title}`,
    description: PAGE_DESCRIPTION,
    images: [siteMetadata.image.url],
  },
};

export default function WebsiteHelpPage() {
  return (
    <Layout>
      <WebsiteHelp />
    </Layout>
  );
}
