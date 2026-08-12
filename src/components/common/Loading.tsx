'use client';

import styles from './SystemState.module.css';

export default function Loading() {
  return (
    <div
      className={styles.loading}
      role="status"
      aria-live="polite"
    >
      <div
        className={
          styles.loadingInner
        }
      >
        <span
          className={styles.label}
        >
          SYSTEM STATE
        </span>

        <div
          className={
            styles.loadingText
          }
        >
          <span>
            Loading
          </span>

          <span
            className={styles.pulse}
            aria-hidden="true"
          >
            ●
          </span>
        </div>
      </div>
    </div>
  );
}
