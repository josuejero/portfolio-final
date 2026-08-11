// src/components/Home/Home.tsx
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

import Die from '@/components/Die';
import TrackedLink from '@/components/common/TrackedLink';
import FeaturedProjects from '@/components/Projects/FeaturedProjects';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { ROLE_LENSES } from '@/data/role-lenses';
import { cn } from '@/lib/utils';

import SchedulingModule from './Conversion/SchedulingModule';
import GitHubProfileCard from './GitHubProfileCard';

const orderedRoleLenses = [...ROLE_LENSES].sort(
  (left, right) =>
    left.presentation.order - right.presentation.order,
);

const SERVICES_TEASER_BULLETS = [
  'Pair with a 60-minute Website Help session to test every CTA, form, and layout.',
  'Walk through analytics, hosting, and copy tweaks while we refine the story together.',
  'Leave with a priority list and launch checklist so you ship confidently the same day.',
];

export default function Home() {
  return (
    <section
      id="home"
      className="relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[36rem] bg-gradient-to-b from-brand/10 via-background to-background"
      />

      <div className="flex flex-col gap-16 pb-24 pt-12 sm:pt-16">
        <section
          aria-labelledby="home-heading"
          className="max-w-4xl space-y-8"
        >
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              {siteConfig.person.name}
            </p>

            <p className="text-sm font-medium text-muted-foreground">
              Software Engineering · QA Automation · Data Quality · Platform Support
            </p>

            <h1
              id="home-heading"
              className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
            >
              Software engineering across applications, quality systems, data operations, and platform tooling.
            </h1>

            <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              I build TypeScript, React, and Python systems with automated testing, release evidence, data-quality workflows, and operational tooling you can inspect directly.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <TrackedLink
              href="/projects"
              prefetch={false}
              data-cta-location="hero"
              data-cta-name="view-projects"
              events={[
                {
                  name: 'hero_cta_click',
                  params: {
                    location: 'hero',
                    name: 'view-projects',
                  },
                },
              ]}
              className={cn(
                buttonVariants({
                  variant: 'default',
                  size: 'lg',
                }),
                'gap-2',
              )}
            >
              View projects
              <ArrowRightIcon
                className="h-4 w-4"
                aria-hidden="true"
              />
            </TrackedLink>

            <TrackedLink
              href="/contact"
              prefetch={false}
              data-cta-location="hero"
              data-cta-name="contact"
              events={[
                {
                  name: 'hero_cta_click',
                  params: {
                    location: 'hero',
                    name: 'contact',
                  },
                },
              ]}
              className={buttonVariants({
                variant: 'outline',
                size: 'lg',
              })}
            >
              Get in touch
            </TrackedLink>

            <TrackedLink
              href={siteConfig.github.profileUrl}
              target="_blank"
              rel="noreferrer"
              data-cta-location="hero"
              data-cta-name="github"
              events={[
                {
                  name: 'hero_cta_click',
                  params: {
                    location: 'hero',
                    name: 'github',
                  },
                },
              ]}
              className={buttonVariants({
                variant: 'ghost',
                size: 'lg',
              })}
            >
              GitHub
            </TrackedLink>
          </div>
        </section>

        <RoleLensSection />

        <FeaturedProjects />

        <section
          aria-labelledby="technical-proof-heading"
          className="space-y-6"
        >
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">
              Technical proof
            </p>

            <h2
              id="technical-proof-heading"
              className="text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              Repository activity and technical range
            </h2>

            <p className="text-sm leading-6 text-muted-foreground">
              GitHub activity provides a live view of the
              work, while the skill explorer connects the
              stack back to projects in the portfolio.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <GitHubProfileCard
              username={siteConfig.github.username}
            />

            <div className="rounded-panel border border-border/60 bg-card/50 p-6 shadow-soft">
              <Die />
            </div>
          </div>
        </section>

        <ServicesTeaser />

        <SchedulingModule />
      </div>
    </section>
  );
}

function RoleLensSection() {
  return (
    <section
      aria-labelledby="role-lenses-heading"
      className="space-y-6"
    >
      <div className="max-w-2xl space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">
          Focus areas
        </p>

        <h2
          id="role-lenses-heading"
          className="text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          Four ways to explore the work
        </h2>

        <p className="text-sm leading-6 text-muted-foreground">
          Each lens maps directly to skills and projects
          already represented in the portfolio.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {orderedRoleLenses.map((lens) => (
          <article
            key={lens.id}
            className="flex h-full flex-col rounded-panel border border-border/60 bg-card/60 p-5 shadow-soft"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              {lens.shortLabel}
            </p>

            <h3 className="mt-3 text-lg font-semibold text-foreground">
              {lens.label}
            </h3>

            <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
              {lens.summary}
            </p>

            <Link
              prefetch={false}
              href={`/projects?lens=${lens.slug}`}
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors duration-fast hover:text-brand-hover"
            >
              See matched projects
              <ArrowRightIcon
                className="h-4 w-4"
                aria-hidden="true"
              />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function ServicesTeaser() {
  return (
    <section
      aria-labelledby="website-help-heading"
      className="rounded-panel border border-border/60 bg-card/70 p-6 shadow-soft backdrop-blur"
    >
      <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">
            Services
          </p>

          <h2
            id="website-help-heading"
            className="text-2xl font-semibold text-foreground"
          >
            Need a Website Help review?
          </h2>

          <p className="text-sm text-muted-foreground">
            Short, focused diagnostics for layout, copy,
            forms, hosting, and CTA clarity before launch.
          </p>
        </div>

        <span className="mt-3 rounded-pill border border-border/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground md:mt-0">
          60-minute focus
        </span>
      </div>

      <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
        {SERVICES_TEASER_BULLETS.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2"
          >
            <span
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-pill bg-brand"
              aria-hidden="true"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <TrackedLink
          href="/website-help"
          prefetch={false}
          events={[
            {
              name: 'hero_cta_click',
              params: {
                location: 'services',
                name: 'website-help',
              },
            },
          ]}
          className={buttonVariants({
            variant: 'default',
          })}
        >
          Explore Website Help
        </TrackedLink>
      </div>
    </section>
  );
}
