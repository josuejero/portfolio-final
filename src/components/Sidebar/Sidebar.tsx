// src/components/Sidebar/Sidebar.tsx
'use client';

import { useState, useEffect } from 'react';
import { 
  HomeIcon, 
  UserIcon, 
  EnvelopeIcon, 
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon 
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeSwitcher } from '../common/ThemeSwitcher';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: 'Home', icon: HomeIcon, href: '/' },
    { name: 'About', icon: UserIcon, href: '/about' },
    { name: 'Contact', icon: EnvelopeIcon, href: '/contact' }
  ];

  // Handle resize events
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // 768px is our mobile breakpoint
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
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white z-50">
        <div className="flex items-center justify-between px-4 h-16">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center justify-center flex-1 py-2
                           transition-colors duration-200
                           ${isActive ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`}
              >
                <item.icon className="h-6 w-6" />
                <span className="text-xs mt-1">{item.name}</span>
              </Link>
            );
          })}
          {/* Mobile Theme Switcher */}
          <div className="flex flex-col items-center justify-center flex-1 py-2">
            <ThemeSwitcher isOpen={false} />
            <span className="text-xs mt-1">Theme</span>
          </div>
        </div>
        
        {/* Safe area padding for mobile devices */}
        <div className="h-safe-area bg-gray-900" />
      </nav>
    );
  }

  // Desktop Sidebar
  return (
    <div 
      className={`fixed top-0 left-0 h-screen bg-gray-900 text-white
                  transition-all duration-300 flex flex-col z-50
                  ${isOpen ? 'w-64' : 'w-16'}`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-4 bg-gray-900 rounded-full p-1.5
                   hover:bg-gray-800 transition-colors"
        aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        {isOpen ? (
          <ChevronDoubleLeftIcon className="h-4 w-4" />
        ) : (
          <ChevronDoubleRightIcon className="h-4 w-4" />
        )}
      </button>

      <nav className="flex flex-col gap-2 mt-16">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-3 
                         transition-colors
                         ${isOpen ? 'justify-start' : 'justify-center'}
                         ${isActive 
                           ? 'bg-gray-800 text-blue-400' 
                           : 'hover:bg-gray-800 text-gray-400 hover:text-white'
                         }`}
            >
              <item.icon className="h-5 w-5" />
              {isOpen && (
                <span className="ml-4 transition-opacity duration-200">
                  {item.name}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Desktop Theme Switcher */}
      <div className="mt-auto mb-4 flex justify-center">
        <ThemeSwitcher isOpen={isOpen} />
      </div>
    </div>
  );
};

export default Sidebar;