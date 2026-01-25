'use client';

import ContactStrip, { type ContactDetail } from '@/components/CampusHelp/ContactStrip';
import TrackedLink from '@/components/common/TrackedLink';
import { type SessionLinks } from '@/lib/booking';

const contactDetails: ContactDetail[] = [
  {
    label: 'Email',
    value: 'josuejero@hotmail.com',
    href: 'mailto:josuejero@hotmail.com',
    trackEvents: [{ name: 'email_click', params: { label: 'Campus email' } }],
    helper: 'Send a 1-2 sentence goal + preferred slot—Zoom link comes with the confirmation.',
  },
];

type CampusHelpContactSectionProps = {
  calendlyUrl: string;
  sessionLinks: SessionLinks;
};

export default function CampusHelpContactSection({ calendlyUrl, sessionLinks }: CampusHelpContactSectionProps) {
  return (
    <section className="space-y-6 border-t border-border pt-10">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="space-y-4 rounded-3xl border border-border bg-card p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Contact</p>
          <h2 className="text-2xl font-semibold text-foreground">Book & message in one tap</h2>
          <ContactStrip details={contactDetails} />
          <p className="text-xs text-muted-foreground">
            If your issue is urgent, email me with “URGENT” plus a 1-sentence goal so I can bump you up.
          </p>
        </article>
        <article className="space-y-3 rounded-3xl border border-border bg-card p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Payments</p>
          <p className="text-sm text-muted-foreground">
            Handles for Venmo, Cash App, or Zelle arrive after the session is locked but before the meeting so you have the payment info ahead of the Zoom call.
          </p>
          <p className="text-xs text-muted-foreground">Need another option? Mention it in your prep note.</p>
        </article>
      </div>
      <article className="rounded-3xl border border-primary bg-gradient-to-br from-primary/10 via-card to-white px-6 py-6 shadow-sm sm:flex sm:items-center sm:justify-between">
        <div className="space-y-1 text-sm text-foreground">
          <p className="font-semibold">Need to lock a session?</p>
          <p className="text-xs text-muted-foreground">Book once and the follow-up notes + payment info land in your inbox.</p>
        </div>
        <div className="space-y-3">
          <TrackedLink
            href={calendlyUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 sm:w-auto"
            events={[{ name: 'book_click', params: { label: 'standard' } }]}
          >
            Book a session
          </TrackedLink>
          <div className="flex flex-wrap gap-4 text-sm font-semibold text-primary">
            <TrackedLink
              href={sessionLinks.quickFix}
              target="_blank"
              rel="noreferrer"
              className="underline"
              events={[{ name: 'book_click', params: { label: 'quick_fix' } }]}
            >
              Need 30 min?
            </TrackedLink>
            <TrackedLink
              href={sessionLinks.deepWork}
              target="_blank"
              rel="noreferrer"
              className="underline"
              events={[{ name: 'book_click', params: { label: 'deep_work' } }]}
            >
              Need 2 hours?
            </TrackedLink>
          </div>
        </div>
      </article>
    </section>
  );
}
