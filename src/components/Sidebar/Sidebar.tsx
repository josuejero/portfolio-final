'use client';

import { useState } from 'react';
import { 
  HomeIcon, 
  UserIcon, 
  EnvelopeIcon, 
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon 
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { ThemeSwitcher } from '../common/ThemeSwitcher';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Home', icon: HomeIcon, href: '/' },
    { name: 'About', icon: UserIcon, href: '/about' },
    { name: 'Contact', icon: EnvelopeIcon, href: '/contact' }
  ];

  return (
    <div className={`
      fixed 
      h-screen 
      bg-gray-900 
      text-white 
      transition-all 
      duration-300 
      flex 
      flex-col
      z-50  // Add z-index to keep sidebar above content
      ${isOpen ? 'w-64' : 'w-16'}
    `}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-4 bg-gray-900 rounded-full p-1.5"
        aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        {isOpen ? (
          <ChevronDoubleLeftIcon className="h-4 w-4" />
        ) : (
          <ChevronDoubleRightIcon className="h-4 w-4" />
        )}
      </button>

      <nav className="flex flex-col gap-2 mt-16">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center px-4 py-3 hover:bg-gray-800 transition-colors
                       ${isOpen ? 'justify-start' : 'justify-center'}`}
          >
            <item.icon className="h-5 w-5" />
            {isOpen && (
              <span className="ml-4">{item.name}</span>
            )}
          </Link>
        ))}
      </nav>

      {/* Updated theme switcher container */}
      <div className="mt-auto mb-4 flex justify-center">
        <ThemeSwitcher isOpen={isOpen} />
      </div>
    </div>
  );
};

export default Sidebar;