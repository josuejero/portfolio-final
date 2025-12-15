// src/components/Sidebar/Sidebar.tsx
'use client';

import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  CodeBracketIcon,
  EnvelopeIcon,
  FolderIcon,
  HomeIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ThemeSwitcher } from '../common/ThemeSwitcher';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  // Navigation items
  const navItems = [
    { href: '/', icon: HomeIcon, label: 'Home' },
    { href: '/about', icon: UserIcon, label: 'About' },
    { href: '/projects', icon: FolderIcon, label: 'Projects' },
    { href: '/contact', icon: EnvelopeIcon, label: 'Contact' },
  ];

  // Handle resize events
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // 768px is our mobile breakpoint
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mobile Bottom Navigation
  if (isMobile) {
    return (
      <>
        {/* Main content area - add padding to avoid overlap */}
        <div className="pb-16" />

        {/* Mobile Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40 h-16">
          <div className="h-full flex items-center justify-around">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
                    isActive
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs mt-1">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Theme Switcher */}
          <div className="absolute top-2 right-2">
            <ThemeSwitcher isOpen={true} />
          </div>

          {/* Safe area padding for mobile devices */}
          <div className="h-safe-area" />
        </nav>
      </>
    );
  }

  // Desktop Sidebar
  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`fixed top-4 z-50 bg-card border border-border rounded-full p-2 transition-all duration-300 ${
          isCollapsed ? 'left-4' : 'md:left-64'
        } hover:bg-muted`}
      >
        {isCollapsed ? (
          <ChevronDoubleRightIcon className="h-5 w-5" />
        ) : (
          <ChevronDoubleLeftIcon className="h-5 w-5" />
        )}
      </button>

      {/* Desktop Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-card border-r border-border z-40 transition-all duration-300 overflow-hidden ${
          isCollapsed ? 'w-0 md:w-16' : 'w-64'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Logo/Brand */}
          <div className="p-6 border-b border-border">
            {!isCollapsed ? (
              <h1 className="text-xl font-bold">Portfolio</h1>
            ) : (
              <div className="flex justify-center">
                <CodeBracketIcon className="h-6 w-6" />
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center rounded-lg p-3 transition-colors ${
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${isCollapsed ? '' : 'mr-3'}`} />
                      {!isCollapsed && <span>{item.label}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Desktop Theme Switcher */}
          <div className="p-4 border-t border-border">
            <ThemeSwitcher isOpen={!isCollapsed} />
          </div>
        </div>
      </aside>

      {/* Main content offset */}
      <div className={`transition-all duration-300 ${isCollapsed ? 'md:ml-16' : 'md:ml-64'}`} />
    </>
  );
};

export default Sidebar;