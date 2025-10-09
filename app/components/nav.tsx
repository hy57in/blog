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
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20 flex justify-between">
        <nav
          className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex flex-row space-x-0 pr-10">
            {Object.entries(navItems).map(([path, { name }]) => {
              const isActive = pathname === path || (path === '/blog' && pathname?.startsWith('/blog'))

              return (
                <Link
                  key={path}
                  href={path}
                  className={`flex align-middle relative py-1 px-2 m-1 transition-colors ${
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
