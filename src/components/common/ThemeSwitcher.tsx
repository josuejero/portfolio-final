// src/components/common/ThemeSwitcher.tsx
'use client';

import { useTheme } from './ThemeProvider';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';

interface ThemeSwitcherProps {
  isOpen: boolean;
}

export function ThemeSwitcher({ isOpen }: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme();

  // If sidebar is closed, only show the active theme button
  if (!isOpen) {
    const ActiveIcon = {
      light: SunIcon,
      dark: MoonIcon,
      system: ComputerDesktopIcon
    }[theme];

    return (
      <button
        onClick={() => {
          // Cycle through themes when clicked
          const themes: Array<'light' | 'dark' | 'system'> = ['light', 'dark', 'system'];
          const currentIndex = themes.indexOf(theme as any);
          const nextTheme = themes[(currentIndex + 1) % themes.length];
          setTheme(nextTheme);
        }}
        className="p-1.5 rounded-md hover:bg-gray-700 transition-colors"
        aria-label={`Current theme: ${theme}. Click to change.`}
      >
        <ActiveIcon className="w-4 h-4" />
      </button>
    );
  }

  // If sidebar is open, show all theme buttons
  return (
    <div className="flex gap-1">
      <button
        onClick={() => setTheme('light')}
        className={`p-1.5 rounded-md hover:bg-gray-700 transition-colors ${
          theme === 'light' ? 'bg-gray-700' : ''
        }`}
        aria-label="Light mode"
      >
        <SunIcon className="w-4 h-4" />
      </button>
      
      <button
        onClick={() => setTheme('dark')}
        className={`p-1.5 rounded-md hover:bg-gray-700 transition-colors ${
          theme === 'dark' ? 'bg-gray-700' : ''
        }`}
        aria-label="Dark mode"
      >
        <MoonIcon className="w-4 h-4" />
      </button>
      
      <button
        onClick={() => setTheme('system')}
        className={`p-1.5 rounded-md hover:bg-gray-700 transition-colors ${
          theme === 'system' ? 'bg-gray-700' : ''
        }`}
        aria-label="System theme"
      >
        <ComputerDesktopIcon className="w-4 h-4" />
      </button>
    </div>
  );
}