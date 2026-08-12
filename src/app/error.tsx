'use client';

import { useEffect } from 'react';

import styles from '@/components/common/SystemState.module.css';

export default function Error({
  error,
  reset,
}: {
  error:
    Error & {
      digest?: string;
    };

  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section
      className={styles.error}
      aria-labelledby="app-error-heading"
    >
      <div
        className={
          styles.errorTop
        }
      >
        <span
          className={
            styles.label
          }
        >
          APPLICATION ERROR
        </span>

        <span
          className={
            styles.errorCode
          }
        >
          {error.digest
            ? `TRACE ${error.digest}`
            : 'RECOVERY AVAILABLE'}
        </span>
      </div>

      <div
        className={
          styles.errorBody
        }
      >
        <h2
          id="app-error-heading"
        >
          Something
          <span>
            failed.
          </span>
        </h2>

        <div
          className={
            styles.errorAside
          }
        >
          <p>
            The page hit an
            unexpected runtime error.
            Retry the render before
            refreshing the browser.
          </p>

          <button
            type="button"
            className={
              styles.action
            }
            onClick={reset}
          >
            Retry
            <span
              aria-hidden="true"
            >
              ↗
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
