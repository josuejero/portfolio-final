'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import type { ReadmeData } from './project-detail-utils';

import styles from './ProjectReadme.module.css';

interface Props {
  readme: ReadmeData | null;
  readmeLoading: boolean;
  readmeError: string | null;
  repoUrl: string | undefined;
  urlTransform:
    (url: string, key?: string) => string;
}

export default function ProjectReadme({
  readme,
  readmeLoading,
  readmeError,
  repoUrl,
  urlTransform,
}: Props) {
  if (readmeLoading) {
    return (
      <p className={styles.state}>
        Loading README…
      </p>
    );
  }

  if (readme?.markdown) {
    return (
      <>
        <article className={styles.article}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            urlTransform={urlTransform}
            components={{
              a({
                href,
                children,
                ...props
              }) {
                const isExternal =
                  !!href &&
                  /^https?:\/\//i.test(
                    href,
                  );

                return (
                  <a
                    href={href}
                    {...props}
                    target={
                      isExternal
                        ? '_blank'
                        : undefined
                    }
                    rel={
                      isExternal
                        ? 'noreferrer'
                        : undefined
                    }
                  >
                    {children}
                  </a>
                );
              },

              img({
                alt,
                ...props
              }) {
                return (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    alt={alt ?? ''}
                    loading="lazy"
                    className={
                      styles.image
                    }
                    {...props}
                  />
                );
              },

              code({
                children,
                ...props
              }) {
                return (
                  <code
                    className={
                      styles.code
                    }
                    {...props}
                  >
                    {children}
                  </code>
                );
              },

              pre({
                children,
                ...props
              }) {
                return (
                  <pre
                    className={
                      styles.pre
                    }
                    {...props}
                  >
                    {children}
                  </pre>
                );
              },
            }}
          >
            {readme.markdown}
          </ReactMarkdown>
        </article>

        {repoUrl ? (
          <p className={styles.sourceNote}>
            Repository documentation from{' '}
            <a
              href={`${repoUrl}#readme`}
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>
          </p>
        ) : null}
      </>
    );
  }

  if (readmeError) {
    return (
      <p className={styles.state}>
        {readmeError}
      </p>
    );
  }

  return (
    <p className={styles.state}>
      No README found for this repository.
    </p>
  );
}
