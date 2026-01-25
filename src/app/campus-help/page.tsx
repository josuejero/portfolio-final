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
  const { calendlyUrl, specialServices, domain, sessionLinks } = bookingInfo;
  const sanitizedDomain = domain.replace(/\/$/, '');
  const qrUrl = `${sanitizedDomain}/go/campus`;
  const fallbackUrl = `${new URL(sanitizedDomain).host}/go/campus`;

  return (
    <Layout>
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-14 px-4 py-10 sm:py-14 sm:gap-16">
        <CampusHelpHero calendlyUrl={calendlyUrl} />
        <CampusHelpServices />
        <CampusHelpPricing specialServices={specialServices} sessionLinks={sessionLinks} />
        <CampusHelpProof />
        <CampusHelpHowItWorks />
        <CampusHelpFAQ />
        <CampusHelpContactSection calendlyUrl={calendlyUrl} sessionLinks={sessionLinks} />
        <section className="space-y-3 rounded-3xl border border-border bg-card px-6 py-6">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Phase 0</p>
            <h2 className="text-2xl font-semibold">Create your booking flow (Calendly)</h2>
          </div>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>
              Quick Fix (30 min):
              <a
                href={sessionLinks.quickFix}
                target="_blank"
                rel="noreferrer"
                className="ml-2 font-semibold text-primary underline"
              >
                {sessionLinks.quickFix}
              </a>
            </p>
            <p>
              Standard Session (60 min):
              <a
                href={sessionLinks.standard}
                target="_blank"
                rel="noreferrer"
                className="ml-2 font-semibold text-primary underline"
              >
                {sessionLinks.standard}
              </a>
              <span className="ml-2 text-xs text-muted-foreground">(default for “Book a session”)</span>
            </p>
            <p>
              Deep Work (120 min):
              <a
                href={sessionLinks.deepWork}
                target="_blank"
                rel="noreferrer"
                className="ml-2 font-semibold text-primary underline"
              >
                {sessionLinks.deepWork}
              </a>
            </p>
          </div>
        </section>
        <CampusHelpPhaseSix />
        <CampusHelpFlyer qrUrl={qrUrl} fallbackUrl={fallbackUrl} />
      </div>
      <StickyBookingBar href={calendlyUrl} />
    </Layout>
  );
}
