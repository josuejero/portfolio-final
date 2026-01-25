import { bookingInfo } from '@/lib/booking';

export default function ProofAssets() {
  const { proofAssets, testimonial } = bookingInfo;

  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Proof assets</h2>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
          2–3 examples
        </p>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {proofAssets.map((asset) => (
          <article key={asset.title} className="space-y-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{asset.title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">{asset.result}</p>
            <a
              href={asset.link}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-slate-900 underline transition-colors hover:text-slate-700 dark:text-slate-100 dark:hover:text-slate-300"
            >
              {asset.linkLabel}
            </a>
          </article>
        ))}
      </div>
      {testimonial && (
        <p className="mt-4 text-sm italic text-slate-600 dark:text-slate-300">{testimonial}</p>
      )}
    </section>
  );
}
