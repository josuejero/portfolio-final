import Image from 'next/image';

type ProofItem = {
  title: string;
  caption: string;
  tag: string;
};

const proofItems: ProofItem[] = [
  {
    title: 'Client portal refresh',
    caption: '3-page portal went from cluttered nav + 8s load to focused hero + 2.7s interactive, so teams can onboard faster.',
    tag: 'Clarity'
  },
  {
    title: 'Community event hub',
    caption: 'Reorganized content and added mobile keyboard shortcuts so the weekly event signup rate rose 28%.',
    tag: 'Engagement'
  },
  {
    title: 'Internal tooling rollout',
    caption: 'Few deployment mistakes + clear documentation cut support tickets in half the week after launch.',
    tag: 'Reliability'
  }
];

export default function ProofStrip() {
  return (
    <section className="rounded-3xl border border-border/60 bg-background/85 p-6 shadow-sm shadow-slate-900/5 backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-500">Proof</p>
          <h2 className="text-2xl font-semibold text-foreground">&lsquo;Visible improvements that moved the needle&rsquo;</h2>
        </div>
        <p className="text-xs font-medium text-muted-foreground">Screenshots + outcomes, directly tied to the experience.</p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {proofItems.map((item) => (
          <article key={item.title} className="space-y-3 rounded-2xl border border-border/50 bg-slate-900/5 p-4">
            <div className="relative h-32 w-full overflow-hidden rounded-xl border border-border/50 bg-gradient-to-br from-slate-900/70 via-slate-900 to-slate-800">
              <Image
                src="/window.svg"
                alt="Example project screenshot"
                fill
                className="object-cover opacity-70"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority={false}
              />
              <span className="pointer-events-none absolute bottom-2 left-2 rounded-full border border-white/30 bg-white/10 px-3 py-0.5 text-xs font-semibold text-white">
                {item.tag}
              </span>
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.caption}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
