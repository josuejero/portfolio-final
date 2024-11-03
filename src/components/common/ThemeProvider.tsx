'use client';

import * as React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { disableDarkReader } from '@/lib/utils';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  enableSystem?: boolean;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  enableSystem = true,
}: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    disableDarkReader();
    const root = window.document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    function updateTheme(newTheme: Theme) {
      let resolvedTheme = newTheme;
      
      if (newTheme === 'system' && enableSystem) {
        resolvedTheme = mediaQuery.matches ? 'dark' : 'light';
      }
      
      root.classList.remove('light', 'dark');
      root.classList.add(resolvedTheme);
    }

    updateTheme(theme);

    const listener = () => {
      if (theme === 'system') {
        updateTheme('system');
      }
    };

    if (enableSystem) {
      mediaQuery.addEventListener('change', listener);
    }

    return () => {
      if (enableSystem) {
        mediaQuery.removeEventListener('change', listener);
      }
    };
  }, [theme, enableSystem]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      setTheme(theme);
    },
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
