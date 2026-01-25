'use client';

import Link from 'next/link';

type Step = {
  title: string;
  detail: string;
};

const howItWorksSteps: Step[] = [
  {
    title: 'Send your goal + link/file',
    detail:
      'Tell me what you are trying to build or fix, drop the repo/doc/asset, and mention any blockers so Zoom can be ready.',
  },
  {
    title: 'Meet on Zoom',
    detail: 'The Calendly confirmation includes the call link; we’ll share screens and code directly during the session.',
  },
  {
    title: 'Leave with notes + next steps',
    detail: 'Every session ends with a recap, prioritized action items, and follow-up so the work keeps moving.',
  },
];

export default function CampusHelpHowItWorks() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">How it works</p>
        <h2 className="text-2xl font-semibold">Simple steps that keep everything on track</h2>
      </div>
      <div className="space-y-4">
        {howItWorksSteps.map((step, index) => (
          <article
            key={step.title}
            className="flex flex-col gap-2 rounded-2xl border border-border bg-card px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <span className="text-lg font-semibold text-primary sm:text-xl">{`0${index + 1}`}</span>
            <div className="flex-1 space-y-1">
              <h3 className="text-base font-semibold">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.detail}</p>
            </div>
            <div className="text-sm text-primary">→</div>
          </article>
        ))}
      </div>
      <div className="space-y-1 text-xs text-muted-foreground">
        <p>For code: bring the repo link or have it open locally.</p>
        <p>For design: bring assets + required size (IG post/story, flyer size).</p>
      </div>
      <p className="text-sm text-muted-foreground">
        Questions about the flow? <Link href="/contact" className="text-primary underline">Send a note</Link> before you book.
      </p>
    </section>
  );
}
