// Efek suara tembakan sintetis (tanpa file audio).
// Matikan suara dengan mengubah GUNSHOT_SOUND menjadi false.
export const GUNSHOT_SOUND = true

let audioContext = null
let noiseBuffer = null // dibuat sekali lalu dipakai ulang di setiap tembakan,
// supaya klik menu tidak perlu mengisi ribuan sampel noise saat itu juga

function getAudioContext() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext
  if (!AudioContextClass) return null
  if (!audioContext) audioContext = new AudioContextClass()
  if (audioContext.state === 'suspended') audioContext.resume()
  return audioContext
}

function getNoiseBuffer(audio) {
  if (noiseBuffer) return noiseBuffer
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
  noiseBuffer = buffer
  return buffer
}

// Panggil sekali dari gestur pengguna pertama (lihat lib/prewarm.js) supaya
// AudioContext sudah menyala dan buffer noise sudah siap sebelum menu
// pertama kali diklik.
export function prewarmAudio() {
  const audio = getAudioContext()
  if (audio) getNoiseBuffer(audio)
}

// volume: 0 sampai 1
export function playGunshot(volume = 0.3) {
  try {
    const audio = getAudioContext()
    if (!audio) return
    const now = audio.currentTime

    // 1) Letusan: noise (buffer yang sudah disiapkan) disaring low-pass yang menutup
    const noise = audio.createBufferSource()
    noise.buffer = getNoiseBuffer(audio)

    const filter = audio.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(6000, now)
    filter.frequency.exponentialRampToValueAtTime(400, now + 0.25)

    const noiseGain = audio.createGain()
    noiseGain.gain.setValueAtTime(volume, now)
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35)

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