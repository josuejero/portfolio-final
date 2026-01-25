import Link from 'next/link';
import type { Metadata } from 'next';

import Layout from '@/components/common/Layout';

const heroHighlights = [
  'Tailored tech tutoring, debugging, and code walkthroughs for campus projects.',
  'Resume, portfolio, and creative direction that helps you stand out in applications.',
  'Fast websites, mockups, and design polish ready for student orgs, labs, and clubs.',
];

const services = [
  {
    title: 'Tutoring & debugging',
    summary: 'One-on-one coaching for assignments, labs, and capstone work.',
    detail: 'Pair-programming, architecture reviews, and exam prep with clear explanations.',
  },
  {
    title: 'Resume & portfolio help',
    summary: 'Feedback on real experiences so your story lands with recruiters.',
    detail: 'Resume edits, portfolio polish, and interview-ready talking points.',
  },
  {
    title: 'Fast websites & labs',
    summary: 'Landing pages, demos, and experimentation-ready builds.',
    detail: 'React/Next.js sites, copies, and hosting guidance tailored to campus apps.',
  },
  {
    title: 'Creative support',
    summary: 'Design direction that balances clarity and personality.',
    detail: 'Figma mockups, motion polish, pitch decks, and documentation audits.',
  },
];

const pricingTiers = [
  {
    name: 'Drop-in support',
    price: '$85 / hour',
    description: 'Best for last-minute debugging or targeted questions.',
    features: ['Live screen share + pairing', 'Quick notes + follow-up checklist', 'Flexible scheduling'],
    cta: 'Book drop-in',
  },
  {
    name: 'Weekly office hours',
    price: '$280 / week',
    description: 'Recurring slots for steady progress on a course or project.',
    features: ['Up to 3 hours total time', 'Priority scheduling', 'Progress summaries & action items'],
    cta: 'Reserve office hours',
  },
  {
    name: 'Project sprint',
    price: '$520 flat',
    description: 'Deep-dive on a key deliverable with prep and wrap-up.',
    features: ['2-hour focused session', 'Wireframes or prototype review', 'Follow-up draft & resources'],
    cta: 'Start a sprint',
  },
];

const proofItems = [
  {
    title: '4.9 / 5 average rating',
    detail: 'Campus volunteers, student founders, and club leaders praise the clarity of each session.',
  },
  {
    title: '30+ campus projects launched',
    detail: 'From mobile apps to pitching decks, I help students ship something tangible each week.',
  },
  {
    title: 'Same-day replies',
    detail: 'I respond to booking or rescheduling questions within one business day so you can keep momentum.',
  },
];

const howItWorksSteps = [
  {
    title: 'Book the vibe',
    detail: 'Pick a time slot or send a quick note on the contact page—tell me what you are working on.',
  },
  {
    title: 'Prep + agenda',
    detail: 'Share repos, docs, or slides. I review everything in advance, so sessions start with clarity.',
  },
  {
    title: 'Session + follow-up',
    detail: 'We work live, then I send a short recap with next steps, fixes, or design ideas.',
  },
];

const faqs = [
  {
    question: 'Can I book for a club or team, too?',
    answer:
      'Absolutely—just share the team size and goals on the contact form. We can then agree on prep work and notes for every member.',
  },
  {
    question: 'Do you offer evening or weekend sessions?',
    answer:
      'Yes. I keep slots later in the day for campus schedules and do my best to stay flexible around deadlines.',
  },
  {
    question: 'What is included with every session?',
    answer:
      'Every booking includes prep time, the live session, and concise follow-up notes so the work keeps moving forward.',
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
  return (
    <Layout>
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-14 px-4 py-10 sm:py-14 sm:gap-16">
        <section className="space-y-6">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Campus help</p>
            <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">
              Campus Tech & Creative Help that keeps your timelines sane.
            </h1>
            <p className="text-base leading-relaxed text-muted-foreground">
              Tutoring, debugging, resume help, fast websites, design help. Clear prices and quick booking so
              you spend less time waiting and more time shipping.
            </p>
          </div>
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <a
              href="#pricing"
              className="w-full rounded-full bg-primary px-6 py-3 text-center text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 sm:w-auto"
            >
              See prices
            </a>
            <Link
              href="/contact"
              className="w-full rounded-full border border-border px-6 py-3 text-center text-sm font-semibold transition hover:bg-muted sm:w-auto"
            >
              Book a session
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {heroHighlights.map((highlight) => (
              <p key={highlight} className="rounded-2xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
                {highlight}
              </p>
            ))}
          </div>
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
                className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-card px-5 py-5 shadow-sm transition hover:border-primary"
              >
                <h3 className="text-lg font-semibold">{service.title}</h3>
                <p className="text-sm font-semibold text-muted-foreground">{service.summary}</p>
                <p className="text-sm text-foreground">{service.detail}</p>
              </article>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Need a different combo? <Link href="/contact" className="text-primary underline">Tell me what you are working on.</Link>
          </p>
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
            {pricingTiers.map((tier) => (
              <article
                key={tier.name}
                className="flex h-full flex-col gap-4 rounded-3xl border border-border bg-gradient-to-b from-card to-background p-6"
              >
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">{tier.name}</p>
                  <p className="mt-1 text-3xl font-semibold">{tier.price}</p>
                  <p className="text-sm text-muted-foreground">{tier.description}</p>
                </div>
                <ul className="flex-1 space-y-2 text-sm text-foreground">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-muted-foreground">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-foreground" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="w-full rounded-full border border-primary px-4 py-3 text-center text-sm font-semibold text-primary transition hover:bg-primary/10"
                >
                  {tier.cta}
                </Link>
              </article>
            ))}
          </div>
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
              </article>
            ))}
          </div>
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
