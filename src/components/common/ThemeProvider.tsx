// src/components/common/ThemeProvider.tsx
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

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    disableDarkReader();
    const root = window.document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const applyTheme = (resolvedTheme: string) => {
      root.classList.remove('light', 'dark');
      root.classList.add(resolvedTheme);
      // Also update the color-scheme
      root.style.colorScheme = resolvedTheme;
    };

    const updateTheme = (newTheme: Theme) => {
      let resolvedTheme = newTheme;
      
      if (newTheme === 'system' && enableSystem) {
        resolvedTheme = mediaQuery.matches ? 'dark' : 'light';
      }
      
      applyTheme(resolvedTheme);
    };

    updateTheme(theme);

    const listener = () => {
      if (theme === 'system') {
        updateTheme('system');
      }
    };

    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, [theme, enableSystem]);

  // Store theme in localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Load theme from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      setTheme(theme);
    },
  };

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