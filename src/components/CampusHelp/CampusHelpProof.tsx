'use client';

import Link from 'next/link';

type ProofItem = {
  title: string;
  detail: string;
  link: string;
  linkLabel: string;
};

const proofItems: ProofItem[] = [
  {
    title: 'Portfolio site refresh',
    detail:
      'Relaunched the living Next.js 15 portfolio on Vercel with refreshed copy, performance tuning, and mobile polish for the confirmed primary domain.',
    link: 'https://portfolio-josuejero.vercel.app',
    linkLabel: 'Live site (primary domain)',
  },
  {
    title: 'Deploy + debug win',
    detail:
      'Stabilized the GitHub Actions/CD pipeline by tuning caching and logging so every push auto-deploys without manual intervention.',
    link: 'https://github.com/josuejero/portfolio-final/actions',
    linkLabel: 'CI runs',
  },
  {
    title: 'Resume tune-up before/after',
    detail:
      'Reworked the resume layout and impact bullets, then exported a clean Word doc ready for sharing so the before/after story is obvious.',
    link: 'https://portfolio-josuejero.vercel.app/RESUME_word.docx',
    linkLabel: 'Download resume',
  },
];

const toolboxLine =
  'I work in: React/Next.js, Python/Django, PostgreSQL, Git, Docker, cloud deploys, Photoshop/Illustrator.';

const microTestimonial =
  '“Josue transformed a vague task into focused debugging and explained every step so I could keep learning.” – Product partner (anonymous)';

export default function CampusHelpProof() {
  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Proof</p>
          <h2 className="text-2xl font-semibold">Went from question to confidence</h2>
        </div>
        <Link href="/contact" className="text-sm font-semibold text-primary transition hover:underline">
          Book the next win
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {proofItems.map((item) => (
          <article key={item.title} className="rounded-2xl border border-border bg-card px-5 py-5">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.detail}</p>
            <a
              href={item.link}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-primary underline"
            >
              {item.linkLabel}
            </a>
          </article>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">{toolboxLine}</p>
      <p className="text-sm italic text-muted-foreground">{microTestimonial}</p>
      <p className="text-sm text-muted-foreground">
        Ready for similar proof? <Link href="/contact" className="text-primary underline">Share your deadline.</Link>
      </p>
    </section>
  );
}
