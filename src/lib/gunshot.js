// Efek suara tembakan sintetis (tanpa file audio).
// Matikan suara dengan mengubah GUNSHOT_SOUND menjadi false.
export const GUNSHOT_SOUND = true

let audioContext = null

function getAudioContext() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext
  if (!AudioContextClass) return null
  if (!audioContext) audioContext = new AudioContextClass()
  if (audioContext.state === 'suspended') audioContext.resume()
  return audioContext
}

// volume: 0 sampai 1
export function playGunshot(volume = 0.3) {
  try {
    const audio = getAudioContext()
    if (!audio) return
    const now = audio.currentTime

    // 1) Letusan: noise yang meredup cepat, disaring low-pass yang menutup
    const length = 0.35
    const buffer = audio.createBuffer(
      1,
      Math.floor(audio.sampleRate * length),
      audio.sampleRate,
    )
    const data = buffer.getChannelData(0)
    for (let i = 0; i < data.length; i++) {
      const decay = Math.pow(1 - i / data.length, 2)
      data[i] = (Math.random() * 2 - 1) * decay
    }

    const noise = audio.createBufferSource()
    noise.buffer = buffer

    const filter = audio.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(6000, now)
    filter.frequency.exponentialRampToValueAtTime(400, now + 0.25)

    const noiseGain = audio.createGain()
    noiseGain.gain.setValueAtTime(volume, now)
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + length)

    noise.connect(filter)
    filter.connect(noiseGain)
    noiseGain.connect(audio.destination)
    noise.start(now)

    // 2) Dentuman rendah: nada sinus yang turun cepat
    const thump = audio.createOscillator()
    thump.type = 'sine'
    thump.frequency.setValueAtTime(150, now)
    thump.frequency.exponentialRampToValueAtTime(40, now + 0.15)

    const thumpGain = audio.createGain()
    thumpGain.gain.setValueAtTime(volume * 1.2, now)
    thumpGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18)

    thump.connect(thumpGain)
    thumpGain.connect(audio.destination)
    thump.start(now)
    thump.stop(now + 0.2)
  } catch {
    // audio gagal: abaikan saja, efek visual tetap jalan
  }
}