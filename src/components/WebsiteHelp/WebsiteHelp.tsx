import Link from 'next/link';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import TrackedLink from '@/components/common/TrackedLink';

const CTA_LINK = 'https://calendly.com/wholesway/website-help-60min';

const services = [
  {
    title: 'Portfolio / personal sites',
    description: 'Feature your projects, resume, and links in a single page that still reads like a story.',
  },
  {
    title: 'Club & org pages',
    description: 'Keep members informed with events, sign-ups, and a clean link hub.',
  },
  {
    title: 'Small business landing pages',
    description: 'Highlight services, hours, and contact details with a CTA that drives bookings.',
  },
  {
    title: 'Contact forms + booking setup',
    description: 'Wire automated forms and calendar slots so visitors can convert without chasing you down.',
  },
  {
    title: 'Domain + hosting setup',
    description: 'Get DNS, hosting, and SSL lined up—or clean up what you already own.',
  },
  {
    title: 'Updates & redesigns',
    description: 'Freshen layouts, copy, or content when the page feels stuck or stale.',
  },
];

const whoItIsFor = [
  {
    title: 'Students building portfolios',
    description: 'Land interviews with a focused page that makes skills and projects effortless to scan.',
  },
  {
    title: 'Clubs & orgs',
    description: 'Share events, gather sign-ups, and keep every link in one trusted hub.',
  },
  {
    title: 'Small businesses',
    description: 'Deliver a confident services + contact page with the clarity your clients expect.',
  },
];

const workflowSteps = [
  {
    title: '1 · Book & share links',
    description:
      'Choose a 60-minute slot and drop the URLs plus the story you want this page to tell ahead of time.',
  },
  {
    title: '2 · Build & review',
    description:
      'We meet on Zoom, walk through the layout, clarify the copy, and resolve form or CTA friction together.',
  },
  {
    title: '3 · Launch & iterate',
    description:
      'I deliver the finalized files, launch checklist, and notes so you can ship and tweak on your timeline.',
  },
];

const callChecklist = [
  'Links you like (2–3 examples)',
  'Any logo or photos you plan to use',
  'Pages you need (Home, About, Services, Contact, etc.)',
  'Deadline or target launch date',
  'Any forms you need (contact, booking, sign-ups)',
];

const faqs = [
  {
    question: 'How fast can this be done?',
    answer:
      'Once the content and links are in hand, expect a polished page within a few days—share your deadline up front so I can prioritize it.',
  },
  {
    question: 'Do you help with domain/hosting?',
    answer: 'Yes. I walk through DNS, SSL, and hosting edits tied directly to the page we build together.',
  },
  {
    question: 'What if I don’t have content yet?',
    answer:
      'Bring whatever you have—ideas, rough copy, screenshots—and we can map the narrative live during the call.',
  },
  {
    question: 'How do revisions work?',
    answer:
      'We iterate in real time on Zoom, then I send a recap with files so you can tweak, test, and relaunch quickly.',
  },
  {
    question: 'Is this Zoom-only?',
    answer: 'Yes, the session happens over Zoom, but I follow up by email with checkpoints and next steps.',
  },
];

export default function WebsiteHelp() {
  return (
    <section className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-6 sm:py-10">
      <div className="space-y-6 rounded-2xl border border-border bg-card/60 p-6 sm:p-8 shadow-sm">
        <h1 className="text-3xl font-semibold leading-tight text-foreground sm:text-4xl">Website Help</h1>
        <p className="text-base text-muted-foreground">
          Mobile-friendly websites that look professional — launched in days, not weeks.
        </p>
        <p className="text-sm text-muted-foreground">Keep it simple; this reduces uncertainty and increases clicks.</p>
        <div className="flex flex-wrap items-center gap-3">
          <TrackedLink
            href={CTA_LINK}
            target="_blank"
            rel="noreferrer"
            events={[{ name: 'website_help_book_click', params: { location: 'hero' } }]}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            Book a 60-min Zoom
          </TrackedLink>
          <Link href="/contact" className="text-sm font-semibold text-muted-foreground transition hover:text-foreground">
            Contact me
          </Link>
          <Link href="/projects" className="text-sm font-semibold text-muted-foreground transition hover:text-foreground">
            See my work
          </Link>
        </div>
        <div className="space-y-1 text-sm text-muted-foreground">
          <p>Fast turnaround once content is ready.</p>
          <p>
            Calendly:{' '}
            <a
              href={CTA_LINK}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-primary underline-offset-2 hover:underline"
            >
              {CTA_LINK}
            </a>
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          Prefer email? Use the contact form or send details ahead of time so this session hits the ground running.
        </p>
      </div>

      <section aria-label="Services" className="space-y-6">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-primary">Services include</p>
          <h2 className="text-2xl font-semibold">Flyer content, web ready</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title} className="border-border bg-background/70">
              <CardHeader className="space-y-1.5">
                <CardTitle className="text-lg">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section aria-label="Who it is for" className="space-y-6">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-primary">Who it’s for</p>
          <h2 className="text-2xl font-semibold">Short-list clients I can help right now</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {whoItIsFor.map((person) => (
            <Card key={person.title} className="border-border bg-card/60">
              <CardContent className="space-y-2">
                <CardTitle className="text-lg">{person.title}</CardTitle>
                <CardDescription>{person.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section aria-label="How it works" className="space-y-5">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-primary">How it works</p>
          <h2 className="text-2xl font-semibold">Book → share links/content → build/review → launch/iterate</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {workflowSteps.map((step) => (
            <Card key={step.title} className="border-border bg-background/70">
              <CardContent className="space-y-2">
                <p className="text-sm font-semibold text-primary">{step.title}</p>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section aria-label="What to bring to the call" className="space-y-4">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-primary">What to bring</p>
          <h2 className="text-2xl font-semibold">This checklist keeps the call focused</h2>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {callChecklist.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="FAQ" className="space-y-4">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-primary">FAQ</p>
          <h2 className="text-2xl font-semibold">Quick answers</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <Card key={faq.question} className="border-border bg-card/80">
              <CardContent className="space-y-2">
                <p className="text-sm font-semibold text-foreground">{faq.question}</p>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section
        aria-label="Book a call"
        className="space-y-4 rounded-2xl border border-border bg-card/70 p-6 text-center shadow-sm"
      >
        <h2 className="text-2xl font-semibold">Ready to replace the flyer with a real booking page?</h2>
        <TrackedLink
          href={CTA_LINK}
          target="_blank"
          rel="noreferrer"
          events={[{ name: 'website_help_book_click', params: { location: 'footer' } }]}
          className="inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 sm:w-auto"
        >
          Book a 60-min Zoom
        </TrackedLink>
        <p className="text-sm text-muted-foreground">
          Prefer email? <Link href="/contact" className="font-semibold text-foreground underline">Contact me</Link> or leave
          a note before the call.
        </p>
        <p className="text-sm text-muted-foreground">
          Calendly:{' '}
          <a
            href={CTA_LINK}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-primary underline-offset-2 hover:underline"
          >
            {CTA_LINK}
          </a>
        </p>
      </section>
    </section>
  );
}
