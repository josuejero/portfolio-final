import type { PortfolioProject } from '@/types/project';

import FrameCastDemo from './FrameCastDemo';

interface ProjectInteractiveDemoProps {
  project: PortfolioProject;
}

export default function ProjectInteractiveDemo({
  project,
}: ProjectInteractiveDemoProps) {
  const demo = project.demo;

  if (!demo) {
    return null;
  }

  return (
    <section
      aria-labelledby="interactive-demo-heading"
      className="space-y-5"
    >
      <div className="max-w-2xl space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">
          Interactive demo
        </p>

        <h2
          id="interactive-demo-heading"
          className="text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          {demo.label}
        </h2>

        <p className="text-sm leading-6 text-muted-foreground">
          {demo.description}
        </p>

        {demo.disclaimer && (
          <p className="text-xs leading-5 text-muted-foreground">
            {demo.disclaimer}
          </p>
        )}
      </div>

      {demo.type ===
        'framecast-configurator' && (
        <FrameCastDemo />
      )}
    </section>
  );
}
