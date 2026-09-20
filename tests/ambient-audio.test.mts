import assert from 'node:assert/strict'
import test from 'node:test'
import { createAmbientPlayer } from '../app/components/ambient-audio.ts'

function audioFixture() {
  const state = { notes: 0, closed: 0, volume: 0, disconnects: 0 }
  const gain = {
    gain: {
      value: 0,
      setValueAtTime() {},
      exponentialRampToValueAtTime() {},
      setTargetAtTime(value: number) { state.volume = value },
    },
    connect() {},
    disconnect() { state.disconnects += 1 },
  }
  const context = {
    state: 'running', currentTime: 0, destination: {},
    createGain: () => gain,
    createOscillator: () => ({
      frequency: { value: 0 }, type: 'sine',
      connect() {}, disconnect() {}, addEventListener() {},
      start() { state.notes += 1 }, stop() {},
    }),
    resume: () => Promise.resolve(),
    close() { state.closed += 1; return Promise.resolve() },
  }
  return { context, state }
}

void test('ambient music starts explicitly and releases its audio context on stop', async () => {
  const { context, state } = audioFixture()
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- The fixture implements only the Web Audio methods used by the player.
  const player = createAmbientPlayer(context as unknown as AudioContext, .2)
  assert.equal(state.notes, 0)
  try {
    await player.start()
    assert.ok(state.notes > 0)
    player.setVolume(2)
    assert.equal(state.volume, .6)
    player.setVolume(-1)
    assert.equal(state.volume, 0)
  } finally {
    player.stop()
  }
  player.stop()
  assert.equal(state.closed, 1)
  assert.equal(state.disconnects, 1)
})

void test('stopping while audio resume is pending cannot restart playback', async () => {
  const { context, state } = audioFixture()
  let resolveResume: (() => void) | undefined
  context.resume = () => new Promise<void>((resolve) => { resolveResume = resolve })
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- The fixture implements only the Web Audio methods used by the player.
  const player = createAmbientPlayer(context as unknown as AudioContext, .2)
  const starting = player.start()
  player.stop()
  resolveResume?.()
  await starting
  assert.equal(state.notes, 0)
  assert.equal(state.closed, 1)
})

void test('returning from a throttled tab does not replay missed notes in a burst', async (t) => {
  t.mock.timers.enable({ apis: ['setInterval'] })
  const { context, state } = audioFixture()
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- The fixture implements only the Web Audio methods used by the player.
  const player = createAmbientPlayer(context as unknown as AudioContext, .2)
  try {
    await player.start()
    const initialNotes = state.notes
    context.currentTime = 180
    t.mock.timers.tick(250)
    assert.ok(state.notes > initialNotes)
    assert.ok(state.notes - initialNotes <= 12, 'only schedule the next second, not the past three minutes')
  } finally {
    player.stop()
  }
})
