// Gaya huruf "ransom note" ala menu utama Persona 5.
// Tiap huruf mendapat gaya berbeda (ubin putih/hitam/merah, font campuran,
// huruf besar-kecil, miring, naik-turun). Hasilnya selalu sama untuk kata yang
// sama (deterministik). Ubah SEED_SALT untuk mengacak ulang semua kata.
export const SEED_SALT = 'p5'

// Daftar ini berbobot: makin sering nama muncul, makin sering dipakai.
const TONE_POOL = ['white', 'white', 'black', 'black', 'red']
const FONT_POOL = ['sans', 'sans', 'sans', 'sans', 'serif', 'serif', 'slab', 'wide', 'wide']
const CLIP_COUNT = 4 // jumlah bentuk tepi guntingan (lihat data-clip di CSS)
const LOWERCASE_CHANCE = 0.28

function createRandom(seed) {
  let h = 2166136261
  for (const ch of seed) {
    h ^= ch.charCodeAt(0)
    h = Math.imul(h, 16777619)
  }
  return () => {
    h += 0x6d2b79f5
    let t = h
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function buildLetters(label) {
  const random = createRandom(`${SEED_SALT}:${label}`)
  const pick = (list) => list[Math.floor(random() * list.length)]
  const chars = Array.from(label)
  const last = Math.max(chars.length - 1, 1)
  const recent = []

  return chars.map((char, index) => {
    let tone = index === 0 ? 'white' : pick(TONE_POOL)
    // hindari tiga ubin berurutan dengan warna sama
    if (recent.length === 2 && recent[0] === tone && recent[1] === tone) {
      tone = tone === 'white' ? 'black' : 'white'
    }
    recent.push(tone)
    if (recent.length > 2) recent.shift()

    const lower = index > 0 && random() < LOWERCASE_CHANCE

    return {
      key: `${index}-${char}`,
      char: lower ? char.toLowerCase() : char.toUpperCase(),
      lower,
      tone,
      font: pick(FONT_POOL),
      clip: Math.floor(random() * CLIP_COUNT),
      t: index / last, // 0 (huruf pertama) sampai 1 (terakhir)
      rot: Number((random() * 14 - 7).toFixed(1)), // derajat
      dy: Number((random() * 0.2 - 0.1).toFixed(2)), // naik-turun (em)
      k: Number((0.92 + random() * 0.18).toFixed(2)), // variasi ukuran
    }
  })
}