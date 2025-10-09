'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeSwitcher } from './theme-switcher'

const navItems = {
  '/': {
    name: 'home',
  },
  '/blog': {
    name: 'blog',
  },
  '/about': {
    name: 'about',
  },
}

export function Navbar() {
  const pathname = usePathname()

  return (
    <aside className="fixed top-0 left-0 right-0 z-50 bg-background/80 dark:bg-background-dark/80 backdrop-blur-md">
      <div className="max-w-2xl mx-auto px-4 py-3 flex justify-between items-center tracking-tight">
        <nav
          className="flex flex-row items-center relative px-0 fade md:overflow-auto scroll-pr-6"
          id="nav"
        >
          <div className="flex flex-row space-x-0">
            {Object.entries(navItems).map(([path, { name }], index) => {
              const isActive = pathname === path || (path === '/blog' && pathname?.startsWith('/blog'))

              return (
                <Link
                  key={path}
                  href={path}
                  className={`flex align-middle relative py-1 m-1 transition-colors ${
                    index === 0 ? 'pl-0 pr-2' : 'px-2'
                  } ${
                    isActive
                      ? 'text-primary dark:text-primary-dark font-medium'
                      : 'text-text-secondary dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary-dark'
                  }`}
                >
                  {name}
                </Link>
              )
            })}
          </div>
        </nav>
        <ThemeSwitcher />
      </div>
    </aside>
  )
}
