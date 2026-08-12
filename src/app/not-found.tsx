import Link from 'next/link';

import styles from '@/components/common/SystemState.module.css';

export default function NotFound() {
  return (
    <section
      className={styles.error}
      aria-labelledby="not-found-heading"
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
          ROUTE STATE
        </span>

        <span
          className={
            styles.errorCode
          }
        >
          404 / NOT FOUND
        </span>
      </div>

      <div
        className={
          styles.errorBody
        }
      >
        <h2 id="not-found-heading">
          Nothing
          <span>
            here.
          </span>
        </h2>

        <div
          className={
            styles.errorAside
          }
        >
          <p>
            This route does not
            resolve to a portfolio
            surface.
          </p>

          <Link
            href="/"
            className={
              styles.action
            }
          >
            Return home
            <span aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
