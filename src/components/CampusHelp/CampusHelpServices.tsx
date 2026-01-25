'use client';

import Link from 'next/link';

type Service = {
  title: string;
  summary: string;
  commonRequests: string[];
  whatToBring: string;
  typicalTime: string;
};

const services: Service[] = [
  {
    title: 'Portfolio + Resume (ATS-friendly)',
    summary: 'Tight bullet points and targeted keywords for brighter applications.',
    commonRequests: [
      'Tighten bullet points for impact',
      'ATS formatting + keyword alignment',
      'Choose 2–3 best projects',
    ],
    whatToBring: 'Latest resume draft, job/club postings, and project notes.',
    typicalTime: '60 minutes',
  },
  {
    title: 'Personal Sites + Club Pages (Fast launch)',
    summary: 'One-page builds, refreshes, and domains ready for the next event.',
    commonRequests: [
      'One-page site structure + copy',
      'Deploy + custom domain',
      'Update/refresh an existing page',
    ],
    whatToBring: 'Existing links, copy ideas, and brand colors or assets.',
    typicalTime: '120 minutes',
  },
  {
    title: 'Coding Tutoring',
    summary: 'Pair programming, concept explanations, and code style coaching.',
    commonRequests: [
      'Explain a concept with examples',
      'Pair-program a solution',
      'Debug errors + improve code style',
    ],
    whatToBring: 'Repo links, assignment prompts, and error output.',
    typicalTime: '60 minutes',
  },
  {
    title: 'App/DB Help',
    summary: 'Postgres setups, migrations, and deployment troubleshooting.',
    commonRequests: [
      'Set up PostgreSQL locally',
      'Fix migrations / schema issues',
      'Deploy + env var troubleshooting',
    ],
    whatToBring: 'Schema snapshots, migration errors, and hosting details.',
    typicalTime: '120 minutes',
  },
  {
    title: 'Design Help',
    summary: 'Flyers, IG posts, and tidy templates for campus teams.',
    commonRequests: [
      'Flyers, IG posts, simple branding',
      'Clean up graphics / export correctly',
      'Template creation',
    ],
    whatToBring: 'Brand assets, copy, and platform size requirements.',
    typicalTime: '60 minutes',
  },
  {
    title: 'Debug + Setup',
    summary: 'Git fixes, IDE tweaks, and "it works on my machine" troubleshooting.',
    commonRequests: [
      'Git setup, SSH keys, repo issues',
      'IDE configuration',
      '"it works on my machine" fixes',
    ],
    whatToBring: 'Repo access, commands you tried, and terminal logs.',
    typicalTime: '30 minutes',
  },
];

export default function CampusHelpServices() {
  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Services</p>
          <h2 className="text-2xl font-semibold">What I help campus teams build</h2>
        </div>
        <Link href="/contact" className="text-sm font-semibold text-primary transition hover:underline">
          Reserve a slot
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {services.map((service) => (
          <article
            key={service.title}
            className="flex h-full flex-col gap-2 rounded-2xl border border-border bg-card px-5 py-5 shadow-sm transition hover:border-primary"
          >
            <h3 className="text-lg font-semibold">{service.title}</h3>
            <p className="text-sm text-muted-foreground">{service.summary}</p>
          </article>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        Not sure which one fits? Book a Standard Session and we will decide in the first 5 minutes.
      </p>
      <div className="space-y-6">
        {services.map((service) => (
          <article
            key={`${service.title}-details`}
            className="space-y-3 rounded-2xl border border-border bg-card px-5 py-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h3 className="text-lg font-semibold">{service.title}</h3>
              <span className="text-sm font-semibold text-muted-foreground">Typical time: {service.typicalTime}</span>
            </div>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Common requests</p>
              <ul className="space-y-2 text-sm text-foreground">
                {service.commonRequests.map((request) => (
                  <li key={request} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-foreground" aria-hidden="true" />
                    <span>{request}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">What to bring:</span> {service.whatToBring}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
