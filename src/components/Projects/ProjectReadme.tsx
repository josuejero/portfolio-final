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
    return <p className="animate-pulse text-neutral-500">Loading README…</p>;
  }

  if (readme?.markdown) {
    return (
      <>
        <article
          className="prose prose-neutral dark:prose-invert max-w-none
                     prose-headings:text-neutral-50
                     prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline
                     prose-strong:text-neutral-100
                     prose-pre:bg-neutral-950/60 prose-pre:border prose-pre:border-neutral-800"
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
                    className="rounded-lg border border-neutral-800"
                    {...props}
                  />
                );
              },
              code({ children, ...props }) {
                return (
                  <code className="rounded bg-neutral-900/60 px-1 py-0.5" {...props}>
                    {children}
                  </code>
                );
              },
              pre({ children, ...props }) {
                return (
                  <pre className="overflow-x-auto rounded-lg p-3" {...props}>
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
          <p className="text-xs text-neutral-500">
            README from{' '}
            <a
              href={`${repoUrl}#readme`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300"
            >
              GitHub
            </a>
          </p>
        )}
      </>
    );
  }

  if (readmeError) {
    return <p className="text-xs text-red-400">{readmeError}</p>;
  }

  return <p className="text-neutral-400">No README found for this repository.</p>;
}
