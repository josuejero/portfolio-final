// src/components/Home/Home.tsx
'use client';

import Die from '@/components/Die';
import { Skill } from '@/components/Die/types';
import Projects from '@/components/Projects/Projects';
import { trackEvent } from '@/lib/gtag';
import Link from 'next/link';
import SchedulingModule from './Conversion/SchedulingModule';
import GitHubProfileCard from './GitHubProfileCard';

import {
  CloudIcon,
  CodeBracketIcon,
  CommandLineIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const GITHUB_USERNAME = 'josuejero'; // change here if needed

const SERVICES_TEASER_BULLETS = [
  'Pair with a 60-minute Website Help session to test every CTA, form, and layout.',
  'Walk through analytics, hosting, and copy tweaks while we refine the story together.',
  'Leave with a priority list and launch checklist so you ship confidently the same day.',
];

function scrollToSection(id: string) {
  if (typeof window === 'undefined') return;
  const el = document.getElementById(id);
  if (!el) return;

  const offset = 80;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({ top, behavior: 'smooth' });
}

export default function Home() {

  const handleSkillSelect = (skill: Skill) => {
    // Optional: analytics or telemetry hook
    console.debug('[Die] selected skill', skill.name);
  };

  const trackHeroCta = (name: string) => {
    trackEvent('hero_cta_click', { location: 'hero', name });
  };

  const handleViewProjectsClick = () => {
    trackHeroCta('view-projects');
    scrollToSection('projects');
  };

  const handleGetInTouchClick = () => {
    trackHeroCta('get-in-touch');
    scrollToSection('schedule');
  };

  return (
    <section id="home" className="relative overflow-hidden">
      {/* Subtle background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-sky-500/10 via-background to-background"
      />

      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-24 pt-16 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:items-start">
            <GitHubProfileCard username={GITHUB_USERNAME} />

            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-3"
              >
                <p className="text-sm font-medium uppercase tracking-wide text-sky-500">
                  Software engineer • Cloud • Frontend
                </p>
                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                  I build reliable, observable systems with clean developer
                  experiences.
                </h1>
                <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
                  From APIs and infrastructure to polished interfaces, I like to
                  ship production-ready features backed by data, telemetry, and
                  tight feedback loops.
                </p>
              </motion.div>

              <div className="grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.05 }}
                  className="rounded-2xl border border-border/60 bg-background/60 p-4 shadow-sm backdrop-blur"
                >
                  <Die onSkillSelect={handleSkillSelect} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.1 }}
                  className="space-y-4"
                >
                  <FeatureRow
                    icon={CodeBracketIcon}
                    title="Frontend & DX"
                    body="Modern React, TypeScript, and component systems that are a joy to work in."
                  />
                  <FeatureRow
                    icon={CloudIcon}
                    title="Cloud & infra"
                    body="APIs and services deployed with sensible observability and guardrails."
                  />
                  <FeatureRow
                    icon={CommandLineIcon}
                    title="Automation"
                    body="Tooling and scripts that keep the boring parts out of the way."
                  />
                </motion.div>
              </div>

              <motion.div
                className="flex flex-wrap items-center gap-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.15 }}
              >
                <button
                  type="button"
                  data-cta-location="hero"
                  data-cta-name="view-projects"
                  onClick={handleViewProjectsClick}
                  className="inline-flex items-center justify-center rounded-full bg-sky-500 px-5 py-2 text-sm font-medium text-sky-950 shadow-sm transition hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                >
                  View projects
                </button>
                <button
                  type="button"
                  data-cta-location="hero"
                  data-cta-name="get-in-touch"
                  onClick={handleGetInTouchClick}
                  className="inline-flex items-center justify-center rounded-full border border-border px-5 py-2 text-sm font-medium text-foreground/90 hover:bg-foreground/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                >
                  Get in touch
                </button>
                <Link
                  href="/website-help"
                  onClick={() => trackHeroCta('website-help')}
                  className="text-sm font-semibold text-muted-foreground underline-offset-4 transition hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                >
                  Explore Website Help
                </Link>
              </motion.div>
            </div>
          </div>

          <ServicesTeaser />

          <Projects />



          <SchedulingModule />
        </div>
      </div>
    </section>
  );
}

function ServicesTeaser() {
  const handleServiceLinkClick = () => {
    trackEvent('hero_cta_click', { location: 'services', name: 'website-help' });
  };

  return (
    <section
      aria-label="Website Help services teaser"
      className="rounded-3xl border border-border/60 bg-card/70 p-6 shadow-sm shadow-slate-900/10 backdrop-blur"
    >
      <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-500">Services</p>
          <h2 className="text-2xl font-semibold text-foreground">Need a Website Help review?</h2>
          <p className="text-sm text-muted-foreground">
            Short, sharp diagnostics that surface layout fixes, copy polish, and CTA clarity before you launch.
          </p>
        </div>
        <span className="mt-3 rounded-full border border-border/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground md:mt-0">
          60-minute focus
        </span>
      </div>

      <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
        {SERVICES_TEASER_BULLETS.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-500" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Link
          href="/website-help"
          onClick={handleServiceLinkClick}
          className="inline-flex items-center justify-center rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-sky-950 transition hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
        >
          Book Website Help
        </Link>
        <p className="text-xs font-medium text-muted-foreground">
          Or keep scrolling for projects, proof, and the scheduler.
        </p>
      </div>
    </section>
  );
}

type FeatureRowProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  body: string;
};

function FeatureRow({ icon: Icon, title, body }: FeatureRowProps) {
  return (
    <div className="flex gap-3 rounded-2xl border border-border/60 bg-background/60 p-3 text-sm">
      <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full border border-border/70">
        <Icon className="h-4 w-4 text-sky-500" />
      </div>
      <div className="space-y-1">
        <h2 className="text-sm font-medium">{title}</h2>
        <p className="text-xs text-muted-foreground">{body}</p>
      </div>
    </div>
  );
}
