'use client'

import { useEffect, useState } from 'react'
import styles from './resume.module.css'

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 400)
    updateVisibility()
    window.addEventListener('scroll', updateVisibility, { passive: true })
    return () => window.removeEventListener('scroll', updateVisibility)
  }, [])

  if (!visible) return null

  return (
    <a href="#resume-top" className={styles.backToTop} aria-label="맨 위로 이동" title="맨 위로 이동">
      <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 19V5m-6 6 6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  )
}
