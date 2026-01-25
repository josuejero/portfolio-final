'use client';

const deliverables = [
  'Live deployment',
  'QA checklist completed',
  'Simple iteration plan (change only after data)',
];

const qaChecklist = [
  { title: 'Mobile layout', detail: 'Looks good on a real phone—no tiny text or cramped buttons.' },
  { title: 'Hero balance', detail: 'Hero section fits cleanly without pushing everything down.' },
  { title: 'Links & buttons', detail: 'Every link works and each book button opens the right Calendly event type.' },
  { title: 'Pricing anchor', detail: 'The #pricing anchor scrolls smoothly.' },
  { title: 'Email copy', detail: 'Hero copy and follow-up email text render correctly.' },
  { title: 'QR scans', detail: 'The QR scans reliably via the camera and at least one QR scanner app.' },
  { title: 'Performance', detail: 'Page loads fast—avoid huge hero images at the top.' },
];

const launchSteps = ['Merge to master', 'Deploy', 'Scan the printed QR with multiple phones'];

const iterationIdeas = [
  'Test a different hero microcopy line',
  'Swap proof items order (put the strongest first)',
  'Tighten services wording (shorter is usually better)',
  'Add one testimonial',
];

const bookingSignals = [
  'Make Standard Session clearly the default pick',
  'Add "what to bring" near the Book button',
  'Remove any confusing pricing text',
];

const phase6Definition =
  'You have a working funnel: scans -> clicks -> bookings and you can tell which flyers/locations drive results.';

export default function CampusHelpPhaseSix() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Phase 6</p>
        <h2 className="text-2xl font-semibold">QA, launch, and iterate</h2>
        <p className="text-sm text-muted-foreground">Ship a stable v1 and improve it based on what the real data tells you.</p>
        <div className="flex flex-wrap gap-2 text-xs text-foreground/80">
          {deliverables.map((deliverable) => (
            <span
              key={deliverable}
              className="rounded-full border border-border/60 bg-background/80 px-3 py-1 text-xs font-semibold text-foreground"
            >
              {deliverable}
            </span>
          ))}
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <article className="space-y-3 rounded-3xl border border-border bg-card p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">QA checklist</p>
          <p className="text-sm text-muted-foreground">Do these checks on a real phone.</p>
          <ul className="space-y-3 text-sm text-foreground">
            {qaChecklist.map((item) => (
              <li
                key={item.title}
                className="space-y-1 rounded-2xl border border-border/70 bg-background/70 px-4 py-3"
              >
                <p className="font-semibold text-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.detail}</p>
              </li>
            ))}
          </ul>
        </article>
        <article className="space-y-3 rounded-3xl border border-border bg-card p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Launch steps</p>
          <ol className="space-y-3 text-sm text-foreground">
            {launchSteps.map((step, index) => (
              <li
                key={step}
                className="space-y-1 rounded-2xl border border-border/70 bg-background/70 px-4 py-3"
              >
                <p className="text-xs font-semibold text-muted-foreground">{`Step ${index + 1}`}</p>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </article>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <article className="space-y-3 rounded-3xl border border-border bg-card p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Iterate with data</p>
          <p className="text-sm text-muted-foreground">Make one change at a time so you can tell what helped.</p>
          <ul className="space-y-2 text-sm text-foreground">
            {iterationIdeas.map((idea) => (
              <li key={idea} className="rounded-2xl border border-border/70 bg-background/70 px-4 py-3">
                {idea}
              </li>
            ))}
          </ul>
        </article>
        <article className="space-y-3 rounded-3xl border border-border bg-card p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            If scans are high but bookings lag
          </p>
          <ul className="space-y-2 text-sm text-foreground">
            {bookingSignals.map((signal) => (
              <li key={signal} className="rounded-2xl border border-border/70 bg-background/70 px-4 py-3">
                {signal}
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted-foreground">{phase6Definition}</p>
        </article>
      </div>
    </section>
  );
}
