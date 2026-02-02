const exampleLayouts = [
  {
    title: 'Portfolio story',
    summary: 'Hero → Projects → Resume → Contact keeps the narrative lean and the action obvious.',
    outline: ['Home', 'Projects', 'Resume', 'Contact']
  },
  {
    title: 'Club & community page',
    summary: 'About + Events + Join + Link hub so members see the loop and RSVP in one flow.',
    outline: ['About', 'Events', 'Join', 'Link hub']
  },
  {
    title: 'Small business microsite',
    summary: 'Services → Hours → Contact → Testimonials clarifies value and supports local search.',
    outline: ['Services', 'Hours', 'Contact', 'Testimonials']
  }
];

export default function ExamplesSection() {
  return (
    <section
      className="rounded-3xl border border-border/60 bg-background/85 p-6 shadow-sm shadow-slate-900/5 backdrop-blur"
    >
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-500">Examples</p>
        <h2 className="text-2xl font-semibold text-foreground">Module outlines that keep CTA focus sharp</h2>
        <p className="text-sm text-muted-foreground">
          Each structure highlights the essential pages, so we can confirm what earns you conversions before wireframes land.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {exampleLayouts.map((layout) => (
          <article key={layout.title} className="space-y-3 rounded-2xl border border-border/50 bg-slate-900/5 p-4">
            <h3 className="text-lg font-semibold text-foreground">{layout.title}</h3>
            <p className="text-sm text-muted-foreground">{layout.summary}</p>
            <div className="flex flex-wrap gap-2">
              {layout.outline.map((page) => (
                <span
                  key={page}
                  className="rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted-foreground"
                >
                  {page}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
