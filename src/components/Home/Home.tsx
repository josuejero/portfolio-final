// src/components/Home/Home.tsx
'use client';

import Die from '@/components/Die';
import { Skill } from '@/components/Die/types';
import useGithubStats from '@/hooks/useGithubStats';
import type { GitHubStats } from '@/types/github';
import GitHubProfileCard from './GitHubProfileCard';

import {
  ArrowDownIcon,
  CloudIcon,
  CodeBracketIcon,
  CommandLineIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const GITHUB_USERNAME = 'josuejero'; // change here if needed

function scrollToSection(id: string) {
  if (typeof window === 'undefined') return;
  const el = document.getElementById(id);
  if (!el) return;

  const offset = 80;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({ top, behavior: 'smooth' });
}

export default function Home() {
  const stats = useGithubStats(GITHUB_USERNAME);

  const handleSkillSelect = (skill: Skill) => {
    // Optional: analytics or telemetry hook
    console.debug('[Die] selected skill', skill.name);
  };

  return (
    <section id="home" className="relative overflow-hidden">
      {/* Subtle background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-sky-500/10 via-background to-background"
      />

      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-24 pt-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:items-start">
          {/* GitHub-backed profile card */}
          <GitHubProfileCard username={GITHUB_USERNAME} />

          {/* Main hero content: intro, die, key areas, CTA */}
          <div className="space-y-8">
            {/* Intro copy */}
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

            {/* Die + focus areas */}
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

            {/* Call to Action */}
            <motion.div
              className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.15 }}
            >
              <button
                onClick={() => scrollToSection('projects')}
                className="inline-flex items-center justify-center rounded-full bg-sky-500 px-5 py-2 text-sm font-medium text-sky-950 shadow-sm transition hover:bg-sky-400"
              >
                View projects
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="inline-flex items-center justify-center rounded-full border border-border px-5 py-2 text-sm font-medium text-foreground/90 hover:bg-foreground/5"
              >
                Get in touch
              </button>
              <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                <ArrowDownIcon className="h-4 w-4 animate-bounce-slow" />
                <span>Scroll for GitHub activity and projects</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Snapshot stats bar */}
        <SnapshotStatsBar stats={stats} />
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

type SnapshotStatsBarProps = {
  stats: GitHubStats;
};

function SnapshotStatsBar({ stats }: SnapshotStatsBarProps) {
  return (
    <motion.div
      className="mt-2 grid gap-4 rounded-2xl border border-border/60 bg-background/70 p-4 shadow-sm backdrop-blur-sm sm:grid-cols-3 lg:grid-cols-6"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.35 }}
    >
      {stats.loading ? (
        <div className="col-span-full flex items-center justify-center py-2 text-xs text-muted-foreground sm:text-sm">
          Pulling live GitHub snapshot…
        </div>
      ) : stats.error ? (
        <div className="col-span-full flex items-center justify-center gap-2 py-2 text-xs text-red-500 sm:text-sm">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <span>Could not load GitHub snapshot right now.</span>
        </div>
      ) : (
        <>
          <SnapshotItem label="Public repos" value={stats.totalRepos} />
          <SnapshotItem label="Total stars" value={stats.totalStars} />
          <SnapshotItem label="Total forks" value={stats.totalForks} />
          <SnapshotItem
            label="Open issues (own repos)"
            value={stats.totalOpenIssues}
          />
          <SnapshotItem
            label="Contributions this year"
            value={stats.contributionsThisYear}
          />
          <SnapshotItem label="Followers" value={stats.followers} />
        </>
      )}
    </motion.div>
  );
}

type SnapshotItemProps = {
  label: string;
  value: number | string;
};

function SnapshotItem({ label, value }: SnapshotItemProps) {
  return (
    <div className="flex flex-col gap-1 rounded-xl border border-border/40 bg-background/90 px-3 py-2 text-xs sm:text-sm">
      <span className="text-[0.65rem] uppercase tracking-wide text-muted-foreground sm:text-[0.7rem]">
        {label}
      </span>
      <span className="text-lg font-semibold tabular-nums sm:text-xl">
        {value}
      </span>
    </div>
  );
}
