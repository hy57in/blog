'use client'

import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

type Props = {
  theme: Theme
}

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<Theme>('dark')

  const applyTheme = (nextTheme: Theme) => {
    localStorage.setItem('theme', nextTheme)
    setTheme(nextTheme)

    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    applyTheme(storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : systemTheme)
  }, [])

  const handleToggle = () => {
    applyTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={handleToggle}
      aria-label={`${theme === 'light' ? '다크' : '라이트'} 모드로 전환`}
    >
      <ThemeIcon theme={theme} />
    </button>
  )
}

const ThemeIcon = ({ theme }: Props) => {
  if (theme === 'light') {
    return (
      <svg
        className="w-5 h-5"
        aria-hidden="true"
        fill="none"
        focusable="false"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    )
  }

  return (
    <svg
      className="w-5 h-5"
      aria-hidden="true"
      fill="none"
      focusable="false"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  )
}
