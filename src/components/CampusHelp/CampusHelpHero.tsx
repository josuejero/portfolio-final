'use client';

import TrackedLink from '@/components/common/TrackedLink';

type CampusHelpHeroProps = {
  calendlyUrl: string;
};

export default function CampusHelpHero({ calendlyUrl }: CampusHelpHeroProps) {
  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Campus help</p>
        <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">Tech & Creative Help on Campus</h1>
        <p className="text-base leading-relaxed text-muted-foreground">
          Friendly, affordable help for students & clubs — on-call or scheduled.
        </p>
      </div>
      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
        <TrackedLink
          href={calendlyUrl}
          target="_blank"
          rel="noreferrer"
          className="w-full rounded-full bg-primary px-6 py-3 text-center text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 sm:w-auto"
          events={[{ name: 'book_click', params: { label: 'standard' } }]}
        >
          Book a session
        </TrackedLink>
        <a
          href="#pricing"
          className="w-full rounded-full border border-border px-6 py-3 text-center text-sm font-semibold transition hover:bg-muted sm:w-auto"
        >
          See prices
        </a>
      </div>
      <p className="text-sm font-medium text-foreground">
        Same-day help when available • Clear pricing • Notes + next steps after every session
      </p>
      <p className="text-xs text-muted-foreground">
        Sessions run exclusively on Zoom—details land in the Calendly confirmation.
      </p>
    </section>
  );
}
