'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type Theme = 'light' | 'dark' | 'system'
type ResolvedTheme = 'light' | 'dark'

interface ThemeContextValue {
  theme: Theme
  resolvedTheme: ResolvedTheme
  setTheme: (t: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'system',
  resolvedTheme: 'light',
  setTheme: () => {},
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system')
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('light')

  // Read stored preference on mount
  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      setThemeState(stored)
    }
  }, [])

  // Apply theme whenever it changes
  useEffect(() => {
    const root = document.documentElement
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const systemDark = mediaQuery.matches

    const isDark =
      theme === 'dark' || (theme === 'system' && systemDark)

    root.classList.toggle('dark', isDark)
    root.classList.toggle('light', !isDark)
    setResolvedTheme(isDark ? 'dark' : 'light')

    if (theme !== 'system') {
      localStorage.setItem('theme', theme)
    } else {
      localStorage.removeItem('theme')
    }

    // Listen for system preference changes when in 'system' mode
    if (theme === 'system') {
      const handleChange = (e: MediaQueryListEvent) => {
        root.classList.toggle('dark', e.matches)
        root.classList.toggle('light', !e.matches)
        setResolvedTheme(e.matches ? 'dark' : 'light')
      }
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [theme])

  function setTheme(t: Theme) {
    setThemeState(t)
    if (t !== 'system') {
      localStorage.setItem('theme', t)
    } else {
      localStorage.removeItem('theme')
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
