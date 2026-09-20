'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { createAmbientPlayer } from './ambient-audio'
import styles from './background-music.module.css'

export function BackgroundMusic() {
  const player = useRef<ReturnType<typeof createAmbientPlayer> | null>(null)
  const [status, setStatus] = useState<'off' | 'starting' | 'playing' | 'error'>('off')
  const [volume, setVolume] = useState(20)
  const volumeStyle: CSSProperties & { '--volume': string } = { '--volume': `${volume}%` }

  const stop = useCallback(() => {
    player.current?.stop()
    player.current = null
    setStatus('off')
  }, [])

  useEffect(() => {
    window.addEventListener('pagehide', stop)
    return () => {
      window.removeEventListener('pagehide', stop)
      player.current?.stop()
      player.current = null
    }
  }, [stop])

  async function toggle() {
    if (player.current) { stop(); return }
    let active: ReturnType<typeof createAmbientPlayer> | null = null
    try {
      active = createAmbientPlayer(new AudioContext(), volume / 100)
      player.current = active
      setStatus('starting')
      await active.start()
      if (player.current === active) setStatus('playing')
    } catch {
      active?.stop()
      if (player.current === active) {
        player.current = null
        setStatus('error')
      }
    }
  }

  return (
    <div className={styles.music}>
      <button type="button" onClick={() => { void toggle() }} aria-pressed={status === 'playing'}
        aria-label={status === 'playing' || status === 'starting' ? 'BGM 끄기' : 'BGM 켜기'}
        title={status === 'playing' || status === 'starting' ? 'BGM 끄기' : 'BGM 켜기 · 통통 튀는 멜로디'}
        className={styles.musicToggle}>
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18V5l11-2v13M9 9l11-2" />
          <ellipse cx="6" cy="18" rx="3" ry="2.5" /><ellipse cx="17" cy="16" rx="3" ry="2.5" />
        </svg>
        {status === 'playing' && <span className={styles.playingDot} aria-hidden="true" />}
      </button>
      {status === 'playing' ? (
        <label className={styles.volume}>
          <span className="sr-only">볼륨 조절</span>
          <input type="range" min="0" max="100" value={volume} style={volumeStyle} aria-valuetext={`${volume}%`}
            onChange={(event) => {
              const value = Number(event.target.value)
              setVolume(value)
              player.current?.setVolume(value / 100)
            }} />
        </label>
      ) : null}
      <output className={status === 'error' ? styles.musicError : 'sr-only'} aria-live="polite">{status === 'error' ? '음악을 재생하지 못했습니다. 다시 시도해 주세요.' : ''}</output>
    </div>
  )
}
