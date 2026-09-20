// Original stop-motion-inspired motif: short mallet notes, rests and a light swing.
// MIDI pitches keep the melody separate from the synthesized instrument voices.
const melody = [
  76, 79, 81, null, 79, 76, 74, null,
  72, null, 76, 79, 74, null, 72, null,
  77, 81, 84, null, 81, 79, 77, null,
  76, 77, 79, null, 77, null, 76, null,
  74, 79, 83, null, 81, 79, 74, null,
  77, 76, 74, null, 71, null, 74, null,
  76, 79, 84, 81, 79, null, 76, null,
  74, 76, 79, null, 72, null, null, null,
] as const
const bassRoots = [48, 48, 53, 53, 55, 55, 48, 48] as const
const frequencyFor = (midi: number) => 440 * 2 ** ((midi - 69) / 12)

export function createAmbientPlayer(context: AudioContext, volume: number) {
  const master = context.createGain()
  master.gain.value = Math.max(0, Math.min(1, volume)) * .6
  master.connect(context.destination)
  let timer: ReturnType<typeof setInterval> | undefined
  let stopped = false
  let noteIndex = 0
  let nextTime = context.currentTime + .1

  function playNote(midi: number, start: number, duration: number, level: number, type: OscillatorType) {
    const oscillator = context.createOscillator()
    const envelope = context.createGain()
    oscillator.type = type
    oscillator.frequency.value = frequencyFor(midi)
    envelope.gain.setValueAtTime(.0001, start)
    envelope.gain.exponentialRampToValueAtTime(level, start + .008)
    envelope.gain.exponentialRampToValueAtTime(.0001, start + duration)
    oscillator.connect(envelope)
    envelope.connect(master)
    oscillator.addEventListener('ended', () => { oscillator.disconnect(); envelope.disconnect() }, { once: true })
    oscillator.start(start)
    oscillator.stop(start + duration + .02)
  }

  function schedule() {
    if (stopped || context.state !== 'running') return
    // Background tabs throttle timers; never replay a backlog of expired notes.
    if (nextTime < context.currentTime) nextTime = context.currentTime + .05
    while (nextTime < context.currentTime + 1) {
      const step = noteIndex % melody.length
      const pitch = melody[step]
      if (pitch !== null) {
        playNote(pitch, nextTime, .28, step % 2 === 0 ? .10 : .075, 'triangle')
        playNote(pitch + 12, nextTime, .12, .018, 'sine')
      }
      if (step % 2 === 0) {
        const root = bassRoots[Math.floor(step / 8)]
        playNote(root + (step % 4 === 0 ? 0 : 7), nextTime, .18, .09, 'sine')
      }
      nextTime += noteIndex % 2 === 0 ? .30 : .24
      noteIndex += 1
    }
  }

  return {
    async start() {
      await context.resume()
      if (stopped) return
      nextTime = context.currentTime + .1
      schedule()
      timer = setInterval(schedule, 250)
    },
    setVolume(value: number) {
      if (!stopped) master.gain.setTargetAtTime(Math.max(0, Math.min(1, value)) * .6, context.currentTime, .08)
    },
    stop() {
      if (stopped) return
      stopped = true
      if (timer !== undefined) clearInterval(timer)
      master.disconnect()
      if (context.state !== 'closed') void context.close().catch(() => {})
    },
  }
}
