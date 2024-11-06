// src/components/common/ThemeSwitcher.tsx
'use client';

import { useTheme } from './ThemeProvider';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';

interface ThemeSwitcherProps {
  isOpen: boolean;
}

export function ThemeSwitcher({ isOpen }: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme();

  // Mobile or collapsed sidebar view
  if (!isOpen) {
    const ActiveIcon = {
      light: SunIcon,
      dark: MoonIcon,
      system: ComputerDesktopIcon
    }[theme];

    return (
      <button
        onClick={() => {
          const themes: Array<'light' | 'dark' | 'system'> = ['light', 'dark', 'system'];
          const currentIndex = themes.indexOf(theme);
          const nextTheme = themes[(currentIndex + 1) % themes.length];
          setTheme(nextTheme);
        }}
        className="p-2 rounded-md hover:bg-gray-700 transition-colors"
        aria-label={`Current theme: ${theme}. Click to change.`}
      >
        <ActiveIcon className="h-5 w-5" />
      </button>
    );
  }

  // Expanded sidebar view
  return (
    <div className="flex gap-2">
      {[
        { theme: 'light', Icon: SunIcon, label: 'Light mode' },
        { theme: 'dark', Icon: MoonIcon, label: 'Dark mode' },
        { theme: 'system', Icon: ComputerDesktopIcon, label: 'System theme' }
      ].map(({ theme: themeOption, Icon, label }) => (
        <button
          key={themeOption}
          onClick={() => setTheme(themeOption as 'light' | 'dark' | 'system')}
          className={`p-2 rounded-md hover:bg-gray-700 transition-colors
                     ${theme === themeOption ? 'bg-gray-700' : ''}`}
          aria-label={label}
        >
          <Icon className="h-5 w-5" />
        </button>
      ))}
    </div>
  );
}