// src/components/Sidebar/Sidebar.tsx
'use client';

import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  CodeBracketIcon,
  EnvelopeIcon,
  FolderIcon,
  HomeIcon,
  SparklesIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ThemeSwitcher } from '../common/ThemeSwitcher';

interface SidebarProps {
  isCollapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
}

const navItems = [
  {
    href: '/',
    icon: HomeIcon,
    label: 'Home',
  },
  {
    href: '/about',
    icon: UserIcon,
    label: 'About',
  },
  {
    href: '/projects',
    icon: FolderIcon,
    label: 'Projects',
  },
  {
    href: '/website-help',
    icon: SparklesIcon,
    label: 'Website Help',
  },
  {
    href: '/contact',
    icon: EnvelopeIcon,
    label: 'Contact',
  },
] as const;

function isRouteActive(
  pathname: string,
  href: string,
): boolean {
  if (href === '/') {
    return pathname === '/';
  }

  return (
    pathname === href ||
    pathname.startsWith(`${href}/`)
  );
}

export default function Sidebar({
  isCollapsed,
  onCollapsedChange,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border/60 bg-background/90 px-4 backdrop-blur sm:px-6 md:hidden">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold"
        >
          <CodeBracketIcon
            className="h-5 w-5 text-brand"
            aria-hidden="true"
          />
          <span>Portfolio</span>
        </Link>

        <ThemeSwitcher isOpen={false} />
      </header>

      <nav
        aria-label="Primary navigation"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-card/95 backdrop-blur md:hidden"
      >
        <div className="grid min-h-16 grid-cols-5 items-stretch pb-[env(safe-area-inset-bottom)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = isRouteActive(
              pathname,
              item.href,
            );

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={
                  isActive ? 'page' : undefined
                }
                className={[
                  'flex min-w-0 flex-col items-center justify-center gap-1 px-1 py-2',
                  'text-[11px] font-medium',
                  'transition-colors duration-fast ease-standard',
                  isActive
                    ? 'bg-brand/10 text-brand'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                ].join(' ')}
              >
                <Icon
                  className="h-5 w-5 shrink-0"
                  aria-hidden="true"
                />

                <span className="max-w-full truncate">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      <button
        type="button"
        onClick={() =>
          onCollapsedChange(!isCollapsed)
        }
        aria-expanded={!isCollapsed}
        aria-controls="desktop-sidebar"
        aria-label={
          isCollapsed
            ? 'Expand navigation'
            : 'Collapse navigation'
        }
        className={[
          'fixed top-4 z-50 hidden rounded-pill',
          'border border-border bg-card p-2 shadow-soft',
          'transition-[left,background-color] duration-normal ease-standard',
          'hover:bg-muted md:block',
          isCollapsed
            ? 'left-3'
            : 'left-[15rem]',
        ].join(' ')}
      >
        {isCollapsed ? (
          <ChevronDoubleRightIcon
            className="h-5 w-5"
            aria-hidden="true"
          />
        ) : (
          <ChevronDoubleLeftIcon
            className="h-5 w-5"
            aria-hidden="true"
          />
        )}
      </button>

      <aside
        id="desktop-sidebar"
        aria-label="Site navigation"
        className={[
          'fixed inset-y-0 left-0 z-40 hidden overflow-hidden',
          'border-r border-border/60 bg-card',
          'transition-[width] duration-normal ease-standard',
          'md:flex md:flex-col',
          isCollapsed ? 'w-16' : 'w-64',
        ].join(' ')}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 shrink-0 items-center border-b border-border/60 px-4">
            <Link
              href="/"
              className={[
                'flex min-w-0 items-center font-semibold',
                isCollapsed
                  ? 'w-full justify-center'
                  : 'gap-3',
              ].join(' ')}
            >
              <CodeBracketIcon
                className="h-6 w-6 shrink-0 text-brand"
                aria-hidden="true"
              />

              {!isCollapsed && (
                <span className="truncate">
                  Portfolio
                </span>
              )}
            </Link>
          </div>

          <nav
            aria-label="Primary navigation"
            className="flex-1 p-3"
          >
            <ul className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = isRouteActive(
                  pathname,
                  item.href,
                );

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={
                        isActive
                          ? 'page'
                          : undefined
                      }
                      title={
                        isCollapsed
                          ? item.label
                          : undefined
                      }
                      className={[
                        'flex min-h-10 items-center rounded-control px-3',
                        'text-sm font-medium',
                        'transition-colors duration-fast ease-standard',
                        isCollapsed
                          ? 'justify-center'
                          : 'gap-3',
                        isActive
                          ? 'bg-brand/10 text-brand'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                      ].join(' ')}
                    >
                      <Icon
                        className="h-5 w-5 shrink-0"
                        aria-hidden="true"
                      />

                      {!isCollapsed && (
                        <span>{item.label}</span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="border-t border-border/60 p-3">
            <ThemeSwitcher
              isOpen={!isCollapsed}
            />
          </div>
        </div>
      </aside>
    </>
  );
}
