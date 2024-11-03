// src/components/common/ThemeSwitcher.tsx
'use client';

import { useTheme } from './ThemeProvider';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex gap-2">
      <button
        onClick={() => setTheme('light')}
        className={`p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${
          theme === 'light' ? 'bg-gray-200 dark:bg-gray-700' : ''
        }`}
        aria-label="Light mode"
      >
        <SunIcon className="w-5 h-5" />
      </button>
      
      <button
        onClick={() => setTheme('dark')}
        className={`p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${
          theme === 'dark' ? 'bg-gray-200 dark:bg-gray-700' : ''
        }`}
        aria-label="Dark mode"
      >
        <MoonIcon className="w-5 h-5" />
      </button>
      
      <button
        onClick={() => setTheme('system')}
        className={`p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${
          theme === 'system' ? 'bg-gray-200 dark:bg-gray-700' : ''
        }`}
        aria-label="System theme"
      >
        <ComputerDesktopIcon className="w-5 h-5" />
      </button>
    </div>
  );
}