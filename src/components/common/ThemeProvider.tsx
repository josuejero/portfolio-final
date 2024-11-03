'use client';

import * as React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  attribute?: string;
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
  attribute = 'class',
  enableSystem = true,
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    const root = window.document.documentElement;

    root.removeAttribute('style');
    root.removeAttribute('data-darkreader-mode');
    root.removeAttribute('data-darkreader-scheme');

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    function updateTheme(newTheme: Theme) {
      let resolvedTheme = newTheme;
      
      if (newTheme === 'system' && enableSystem) {
        resolvedTheme = mediaQuery.matches ? 'dark' : 'light';
      }
      
      root.classList.remove('light', 'dark');
      
      if (attribute === 'class') {
        root.classList.add(resolvedTheme);
      } else {
        root.setAttribute(attribute, resolvedTheme);
      }
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
  }, [theme, attribute, enableSystem]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
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