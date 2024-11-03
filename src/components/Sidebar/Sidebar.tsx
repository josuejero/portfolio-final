'use client';

import { useState } from 'react';
import { HomeIcon, UserIcon, BookOpenIcon, MapIcon, MinusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { ThemeSwitcher } from '../common/ThemeSwitcher';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Home', icon: HomeIcon, href: '/' },
    { name: 'About', icon: UserIcon, href: '/about' },
    { name: 'Blog', icon: BookOpenIcon, href: '/blog' },
    { name: 'Contact', icon: MapIcon, href: '/contact' }
  ];

  return (
    <div className={`fixed h-screen bg-gray-900 text-white transition-all duration-300 ${
      isOpen ? 'w-64' : 'w-20'
    }`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute right-0 top-4 -mr-6 rounded-r bg-gray-900 p-2"
        aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        <MinusIcon className="h-6 w-6" />
      </button>

      <nav className="mt-16 space-y-8">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center px-4 py-2 hover:bg-gray-800 transition-colors"
          >
            <item.icon className="h-6 w-6" />
            {isOpen && (
              <span className="ml-4">{item.name}</span>
            )}
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default Sidebar;