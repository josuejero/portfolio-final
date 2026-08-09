'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { ReadmeData } from './project-detail-utils';

interface Props {
  readme: ReadmeData | null;
  readmeLoading: boolean;
  readmeError: string | null;
  repoUrl: string | undefined;
  urlTransform: (url: string, key?: string) => string;
}

export default function ProjectReadme({
  readme,
  readmeLoading,
  readmeError,
  repoUrl,
  urlTransform,
}: Props) {
  if (readmeLoading) {
    return <p className="animate-pulse text-muted-foreground">Loading README…</p>;
  }

  if (readme?.markdown) {
    return (
      <>
        <article
          className="prose prose-neutral dark:prose-invert max-w-none
                     prose-headings:text-foreground
                     prose-a:text-brand prose-a:no-underline hover:prose-a:underline
                     prose-strong:text-foreground
                     prose-pre:bg-surface-raised prose-pre:border prose-pre:border-border"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            urlTransform={urlTransform}
            components={{
              a({ href, children, ...props }) {
                const isExternal = !!href && /^https?:\/\//i.test(href);
                return (
                  <a
                    href={href}
                    {...props}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noreferrer' : undefined}
                  >
                    {children}
                  </a>
                );
              },
              img({ alt, ...props }) {
                return (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    alt={alt ?? ''}
                    loading="lazy"
                    className="rounded-surface border border-border"
                    {...props}
                  />
                );
              },
              code({ children, ...props }) {
                return (
                  <code className="rounded-control bg-muted/60 px-1 py-0.5" {...props}>
                    {children}
                  </code>
                );
              },
              pre({ children, ...props }) {
                return (
                  <pre className="overflow-x-auto rounded-surface p-3" {...props}>
                    {children}
                  </pre>
                );
              },
            }}
          >
            {readme.markdown}
          </ReactMarkdown>
        </article>

        {repoUrl && (
          <p className="text-xs text-muted-foreground">
            README from{' '}
            <a
              href={`${repoUrl}#readme`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-brand transition-colors duration-fast hover:text-brand-hover"
            >
              GitHub
            </a>
          </p>
        )}
      </>
    );
  }

  if (readmeError) {
    return <p className="text-xs text-foreground">{readmeError}</p>;
  }

  return <p className="text-muted-foreground">No README found for this repository.</p>;
}
