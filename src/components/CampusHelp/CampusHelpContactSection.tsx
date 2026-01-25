'use client';

import { Banknotes, CreditCard, Wallet, type LucideIcon } from 'lucide-react';
import ContactStrip, { type ContactDetail } from '@/components/CampusHelp/ContactStrip';
import TrackedLink from '@/components/common/TrackedLink';

type PaymentMethod = {
  name: string;
  detail: string;
  Icon: LucideIcon;
};

const contactDetails: ContactDetail[] = [
  {
    label: 'Email',
    value: 'hi@wholesway.dev',
    href: 'mailto:hi@wholesway.dev',
    trackEvents: [{ name: 'email_click', params: { label: 'Campus email' } }],
    helper: 'Paste into the Calendly message or urgent note.',
  },
  {
    label: 'Handle',
    value: '@wholesway',
    helper: 'Copy this for Venmo/Zelle memos.',
  },
];

const paymentMethods: PaymentMethod[] = [
  { name: 'Venmo', detail: '@wholesway', Icon: CreditCard },
  { name: 'Zelle', detail: 'Handle shared right after you book', Icon: Banknotes },
  { name: 'Cash', detail: 'Bring cash so we can settle when we meet', Icon: Wallet },
];

type CampusHelpContactSectionProps = {
  calendlyUrl: string;
};

export default function CampusHelpContactSection({ calendlyUrl }: CampusHelpContactSectionProps) {
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
        <article className="space-y-4 rounded-3xl border border-border bg-card p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Payments</p>
          <div className="space-y-3">
            {paymentMethods.map((method) => {
              const Icon = method.Icon;
              return (
                <div
                  key={method.name}
                  className="flex items-center gap-3 rounded-2xl border border-border/50 bg-background/80 px-3 py-3"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{method.name}</p>
                    <p className="text-xs text-muted-foreground">{method.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground">
            Venmo, Zelle, or cash—confirmation includes the current handle so paying stays seamless.
          </p>
        </article>
      </div>
      <article className="rounded-3xl border border-primary bg-gradient-to-br from-primary/10 via-card to-white px-6 py-6 shadow-sm sm:flex sm:items-center sm:justify-between">
        <div className="space-y-1 text-sm text-foreground">
          <p className="font-semibold">Need to lock a session?</p>
          <p className="text-xs text-muted-foreground">Book once and the follow-up notes + payment info land in your inbox.</p>
        </div>
        <TrackedLink
          href={calendlyUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 sm:mt-0"
          events={[{ name: 'book_click', params: { label: 'Footer book button' } }]}
        >
          Book a session
        </TrackedLink>
      </article>
    </section>
  );
}
