const pricingHighlights = [
  {
    title: 'Discovery sprint',
    price: 'Free consult → quote',
    detail: 'Align on goals, scope, and non-negotiables before we define the next phase.'
  },
  {
    title: 'Focused build',
    price: 'Starting at $3K',
    detail: 'Landing pages, microsites, or feature slices delivered in 4–6 weeks with measurable clarity.'
  },
  {
    title: 'Full product refresh',
    price: '$7K–$15K',
    detail: 'Cross-platform experiences with automation, instrumentation, and performance guardrails.'
  }
];

export default function PricingBlock() {
  return (
    <section
      id="pricing"
      className="rounded-3xl border border-border/60 bg-background/80 p-6 shadow-sm shadow-slate-900/5 backdrop-blur"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-500">
            Pricing & starting points
          </p>
          <h2 className="text-2xl font-semibold text-foreground">Most engagements fall in these bands</h2>
        </div>
        <p className="text-xs font-medium text-muted-foreground">
          Free consult → tailored quote after we align on scope.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {pricingHighlights.map((block) => (
          <article
            key={block.title}
            className="rounded-2xl border border-border/40 bg-slate-900/5 p-4 transition hover:border-sky-400/60"
          >
            <p className="text-sm font-semibold text-sky-500">{block.title}</p>
            <p className="mt-2 text-lg font-bold text-foreground">{block.price}</p>
            <p className="mt-3 text-sm text-muted-foreground">{block.detail}</p>
          </article>
        ))}
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Need to break this into phases? We can stage deliverables so you hit the next milestone without waiting for the full build.
      </p>
    </section>
  );
}
