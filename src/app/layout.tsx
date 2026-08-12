import AppShell from '@/components/common/AppShell';
import { GA_MEASUREMENT_ID } from '@/lib/gtag';
import { siteMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';

import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
  display: 'swap',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(
    siteMetadata.siteUrl,
  ),

  title: {
    default: siteMetadata.title,
    template:
      `%s | ${siteMetadata.title}`,
  },

  description:
    siteMetadata.description,

  openGraph: {
    title: siteMetadata.title,
    description:
      siteMetadata.description,
    url: siteMetadata.siteUrl,
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
    title: siteMetadata.title,
    description:
      siteMetadata.description,
    images: [
      siteMetadata.image.url,
    ],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview':
        'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {GA_MEASUREMENT_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />

            <Script
              id="ga-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_MEASUREMENT_ID}');
                `,
              }}
            />
          </>
        ) : null}

        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
