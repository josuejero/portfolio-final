import Link from 'next/link';
import type { Metadata } from 'next';

import Layout from '@/components/common/Layout';
import { bookingInfo } from '@/lib/booking';

const services = [
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

const sessionCards = [
  {
    name: 'Quick Fix',
    duration: '30 minutes',
    price: '$25',
    description: 'Tackle a single bug, question, or setup hurdle and be back in motion.',
  },
  {
    name: 'Standard Session',
    duration: '60 minutes',
    price: '$45',
    description: 'Pair on a feature, debug an assignment, or advance a launch with a full hour.',
    recommended: true,
  },
  {
    name: 'Deep Work',
    duration: '2 hours',
    price: '$80',
    description: 'Dedicated block for big builds, architecture reviews, or complex debugging.',
  },
];

const proofItems = [
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

const microTestimonial =
  '“Josue transformed a vague task into focused debugging and explained every step so I could keep learning.” – Product partner (anonymous)';

const toolboxLine =
  'I work in: React/Next.js, Python/Django, PostgreSQL, Git, Docker, cloud deploys, Photoshop/Illustrator.';

const howItWorksSteps = [
  {
    title: 'Send your goal + link/file',
    detail: 'Tell me what you are trying to build or fix and drop the repo, doc, or asset so I can prep.',
  },
  {
    title: 'Meet on campus or online',
    detail: 'We can meet at a public campus spot or hop on a call—whichever keeps you comfortable and focused.',
  },
  {
    title: 'Leave with notes + next steps',
    detail: 'Every session ends with a recap, prioritized action items, and follow-up so the work keeps moving.',
  },
];

const faqs = [
  {
    question: 'Can you meet on campus?',
    answer:
      'Yes, I regularly meet at public campus spots (quads, libraries, or study lounges). Just name the building and I will find a quiet corner or move online if needed.',
  },
  {
    question: 'Do you do clubs?',
    answer:
      'Absolutely—clubs get the same prep, notes, and follow-up. Share the goals and headcount in the contact form so we can tailor the agenda.',
  },
  {
    question: 'Do you offer same-day?',
    answer:
      'Often yes when the schedule allows—shoot me a note and I will confirm within a business day. Same-day slots are limited, so it helps to follow up quickly.',
  },
  {
    question: 'What if we don’t finish?',
    answer:
      'We end with a clear status update, action items, and any blockers I spotted. You are always welcome to book a follow-up or message for quick clarifications.',
  },
  {
    question: 'What do I need to bring?',
    answer:
      'Bring your laptop, charger, and repository or design files, plus screenshots of errors or drafts. If you have prompts or size requirements, drop those in the prep note.',
  },
  {
    question: 'Do you guarantee outcomes?',
    answer:
      'I don’t promise specific offers, but I guarantee honest feedback, clarity on the next moves, and follow-up notes that recap what we covered.',
  },
  {
    question: 'Do you help with homework?',
    answer:
      'Yes—think of it as guided work. I explain concepts, debug code, and coach your next steps without doing the assignment for you.',
  },
  {
    question: 'What times are you available?',
    answer:
      'Late afternoons, evenings, and weekend windows are usually open for campus folks. Head to the contact page to see current slots and share your class/club schedule.',
  },
  {
    question: 'Can I just ask one quick question for free?',
    answer: 'Quick Fix is built for that. If it’s truly tiny, I’ll tell you in 1 minute.',
  },
];

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
  const { calendlyUrl, specialServices } = bookingInfo;
  return (
    <Layout>
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-14 px-4 py-10 sm:py-14 sm:gap-16">
        <section className="space-y-6">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Campus help</p>
            <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">Tech & Creative Help on Campus</h1>
            <p className="text-base leading-relaxed text-muted-foreground">
              Friendly, affordable help for students & clubs — on-call or scheduled.
            </p>
          </div>
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full rounded-full bg-primary px-6 py-3 text-center text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 sm:w-auto"
            >
              Book a session
            </a>
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
          <p className="text-xs text-muted-foreground">On campus (public spots) or online.</p>
        </section>

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

        <section id="pricing" className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Pricing</p>
            <h2 className="text-2xl font-semibold">Clear rates, no surprises</h2>
            <p className="text-sm text-muted-foreground">
              Every booking includes prep time, recorded notes, and follow-up guidance so the work keeps moving forward.
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {sessionCards.map((session) => (
              <article
                key={session.name}
                className={`flex h-full flex-col gap-4 rounded-3xl border p-6 transition ${session.recommended ? 'border-primary bg-primary/5' : 'border-border bg-card'}`}
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
                <a
                  href={calendlyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto inline-flex w-full items-center justify-center rounded-full border border-primary px-4 py-3 text-center text-sm font-semibold text-primary transition hover:bg-primary/10"
                >
                  Book this session
                </a>
              </article>
            ))}
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

        <section className="space-y-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">FAQ</p>
            <h2 className="text-2xl font-semibold">Need answers before you hit book?</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <article key={faq.question} className="rounded-2xl border border-border bg-card px-5 py-4">
                <h3 className="text-base font-semibold">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </article>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Still curious? <Link href="/contact" className="text-primary underline">Let me know what you need</Link> and we will craft the right slot.
          </p>
        </section>

        <section className="rounded-3xl border border-border bg-gradient-to-b from-card via-card to-background px-6 py-8 text-center shadow-lg">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Book / Contact</p>
          <h2 className="mt-4 text-3xl font-semibold">Ready to build, ship, or rehearse?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Swing by the <Link href="/contact" className="text-primary underline">contact page</Link>, drop your materials, and I will book a time that fits your campus schedule.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 sm:w-auto"
          >
            Schedule now
          </Link>
        </section>
      </div>
    </Layout>
  );
}
