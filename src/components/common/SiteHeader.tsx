import Link from 'next/link';

import styles from './SiteHeader.module.css';

const navigation = [
  {
    href: '/projects',
    label: 'Work',
  },
  {
    href: '/about',
    label: 'About',
  },
  {
    href: '/contact',
    label: 'Contact',
  },
] as const;

export default function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link
          href="/"
          className={styles.mark}
          aria-label="Josue Jeronimo — home"
        >
          JJ
        </Link>

        <nav
          className={styles.nav}
          aria-label="Primary navigation"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.link}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
