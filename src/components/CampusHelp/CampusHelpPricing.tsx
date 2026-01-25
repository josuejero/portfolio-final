'use client';

import { type SessionLinks, type SpecialService } from '@/lib/booking';
import PricingViewTracker from '@/components/CampusHelp/PricingViewTracker';
import TrackedLink from '@/components/common/TrackedLink';

type SessionCard = {
  name: string;
  duration: string;
  price: string;
  description: string;
  recommended?: boolean;
  urlKey: keyof SessionLinks;
  eventValue?: string;
};

const sessionCards: SessionCard[] = [
  {
    name: 'Quick Fix',
    duration: '30 minutes',
    price: '$25',
    description: 'Tackle a single bug, question, or setup hurdle and be back in motion.',
    urlKey: 'quickFix',
    eventValue: 'quick_fix',
  },
  {
    name: 'Standard Session',
    duration: '60 minutes',
    price: '$45',
    description: 'Pair on a feature, debug an assignment, or advance a launch with a full hour.',
    recommended: true,
    urlKey: 'standard',
    eventValue: 'standard',
  },
  {
    name: 'Deep Work',
    duration: '2 hours',
    price: '$80',
    description: 'Dedicated block for big builds, architecture reviews, or complex debugging.',
    urlKey: 'deepWork',
    eventValue: 'deep_work',
  },
];

type CampusHelpPricingProps = {
  sessionLinks: SessionLinks;
  specialServices: SpecialService[];
};

export default function CampusHelpPricing({ sessionLinks, specialServices }: CampusHelpPricingProps) {
  return (
    <section id="pricing" className="space-y-6">
      <PricingViewTracker />
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Pricing</p>
        <h2 className="text-2xl font-semibold">Clear rates, no surprises</h2>
        <p className="text-sm text-muted-foreground">
          Every booking includes prep time, recorded notes, and follow-up guidance so the work keeps moving forward.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {sessionCards.map((session) => {
          const sessionEvents = [
            { name: 'book_click', params: { label: session.eventValue ?? 'standard' } },
            ...(session.eventValue ? [{ name: 'pricing_select', params: { value: session.eventValue } }] : []),
          ];
          const href = sessionLinks[session.urlKey];

          return (
            <article
              key={session.name}
              className={`flex h-full flex-col gap-4 rounded-3xl border p-6 transition ${
                session.recommended ? 'border-primary bg-primary/5' : 'border-border bg-card'
              }`}
            >
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{session.duration}</p>
                <p className="mt-2 text-3xl font-semibold text-foreground">{session.price}</p>
                <p className="mt-1 text-sm text-muted-foreground">{session.description}</p>
              </div>
              {session.recommended && (
                <span className="inline-flex w-fit items-center justify-center rounded-full border border-primary/60 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  Standard pick
                </span>
              )}
              <TrackedLink
                href={href}
                target="_blank"
                rel="noreferrer"
                className="mt-auto inline-flex w-full items-center justify-center rounded-full border border-primary px-4 py-3 text-center text-sm font-semibold text-primary transition hover:bg-primary/10"
                events={sessionEvents}
              >
                Book
              </TrackedLink>
            </article>
          );
        })}
      </div>
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Packages</p>
        <div className="grid gap-4 md:grid-cols-2">
          {specialServices.map((packageItem) => (
            <article key={packageItem.name} className="rounded-2xl border border-border bg-card px-5 py-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold">{packageItem.name}</h3>
                <span className="text-sm font-semibold text-muted-foreground">{packageItem.price}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{packageItem.description}</p>
            </article>
          ))}
        </div>
      </div>
      <div className="grid gap-3 rounded-3xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground sm:grid-cols-3">
        <p>Extend in 30-minute blocks at $25 each (if schedule allows).</p>
        <p>Pay at the start via Venmo or Zelle.</p>
        <p>$5 off Standard Session for club officers.</p>
      </div>
      <p className="text-sm text-muted-foreground">
        If you are unsure: choose Standard Session. It is the best fit for most people.
      </p>
    </section>
  );
}
