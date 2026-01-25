import type { Metadata } from 'next';

import Layout from '@/components/common/Layout';
import StickyBookingBar from '@/components/CampusHelp/StickyBookingBar';
import CampusHelpHero from '@/components/CampusHelp/CampusHelpHero';
import CampusHelpServices from '@/components/CampusHelp/CampusHelpServices';
import CampusHelpPricing from '@/components/CampusHelp/CampusHelpPricing';
import CampusHelpProof from '@/components/CampusHelp/CampusHelpProof';
import CampusHelpHowItWorks from '@/components/CampusHelp/CampusHelpHowItWorks';
import CampusHelpFAQ from '@/components/CampusHelp/CampusHelpFAQ';
import CampusHelpContactSection from '@/components/CampusHelp/CampusHelpContactSection';
import CampusHelpPhaseSix from '@/components/CampusHelp/CampusHelpPhaseSix';
import CampusHelpFlyer from '@/components/CampusHelp/CampusHelpFlyer';
import { bookingInfo } from '@/lib/booking';

export const metadata: Metadata = {
  title: 'Campus Tech & Creative Help | Prices + Booking',
  description:
    'Tutoring, debugging, resume help, fast websites, design help. Clear prices and quick booking.',
  openGraph: {
    title: 'Campus Tech & Creative Help | Prices + Booking',
    description:
      'Tutoring, debugging, resume help, fast websites, design help. Clear prices and quick booking.',
  },
  twitter: {
    title: 'Campus Tech & Creative Help | Prices + Booking',
    description:
      'Tutoring, debugging, resume help, fast websites, design help. Clear prices and quick booking.',
  },
};

export default function CampusHelpPage() {
  const { calendlyUrl, specialServices, domain } = bookingInfo;
  const sanitizedDomain = domain.replace(/\/$/, '');
  const qrUrl = `${sanitizedDomain}/go/campus`;
  const fallbackUrl = `${new URL(sanitizedDomain).host}/go/campus`;

  return (
    <Layout>
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-14 px-4 py-10 sm:py-14 sm:gap-16">
        <CampusHelpHero calendlyUrl={calendlyUrl} />
        <CampusHelpServices />
        <CampusHelpPricing calendlyUrl={calendlyUrl} specialServices={specialServices} />
        <CampusHelpProof />
        <CampusHelpHowItWorks />
        <CampusHelpFAQ />
        <CampusHelpContactSection calendlyUrl={calendlyUrl} />
        <CampusHelpPhaseSix />
        <CampusHelpFlyer qrUrl={qrUrl} fallbackUrl={fallbackUrl} />
      </div>
      <StickyBookingBar href={calendlyUrl} />
    </Layout>
  );
}
