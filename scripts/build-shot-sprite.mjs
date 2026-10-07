// Membuat src/assets/shot-sprite.webp: satu gambar yang sudah berisi cahaya
// hangat, sinar menyebar, dan cincin merah dari efek tembakan, digambar SEKALI
// di sini. Di web, ShotEffect.jsx hanya menampilkan satu <img> yang di-scale
// dan di-fade — tidak ada conic-gradient atau mask yang dihitung ulang oleh
// HP setiap kali efek muncul, karena itu penyebab utama macetnya animasi.
//
// Jalankan ulang setelah mengubah warna/bentuknya:
//   node scripts/build-shot-sprite.mjs
import sharp from '/home/claude/.npm-global/lib/node_modules/sharp/lib/index.js'
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const SIZE = 560 // resolusi sumber (px); ditampilkan hingga ~560px di layar
const CX = SIZE / 2
const CY = SIZE / 2
const ACCENT = '#e60012'

function rays(count, innerR, outerR, colorStops, rotateOffset) {
  const step = 360 / count
  let polys = ''
  for (let i = 0; i < count; i++) {
    if (i % 2 === 1) continue // setiap sinar genap dilewati = celah antar sinar
    const a0 = (i * step + rotateOffset) * (Math.PI / 180)
    const a1 = (i * step + rotateOffset + step * 0.42) * (Math.PI / 180)
    const x0 = CX + Math.cos(a0) * outerR
    const y0 = CY + Math.sin(a0) * outerR
    const x1 = CX + Math.cos(a1) * outerR
    const y1 = CY + Math.sin(a1) * outerR
    const ix0 = CX + Math.cos(a0) * innerR
    const iy0 = CY + Math.sin(a0) * innerR
    const ix1 = CX + Math.cos(a1) * innerR
    const iy1 = CY + Math.sin(a1) * innerR
    polys += `<polygon points="${ix0},${iy0} ${x0},${y0} ${x1},${y1} ${ix1},${iy1}" fill="${colorStops}"/>`
  }
  return polys
}

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <defs>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="1"/>
      <stop offset="7%" stop-color="#fff3d6" stop-opacity="0.95"/>
      <stop offset="20%" stop-color="#ffbe6e" stop-opacity="0.65"/>
      <stop offset="42%" stop-color="#ff6e28" stop-opacity="0.26"/>
      <stop offset="70%" stop-color="#ff6e28" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="fade" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fff" stop-opacity="1"/>
      <stop offset="60%" stop-color="#fff" stop-opacity="1"/>
      <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>
    <mask id="rayFade">
      <rect width="${SIZE}" height="${SIZE}" fill="url(#fade)"/>
    </mask>
  </defs>

  <circle cx="${CX}" cy="${CY}" r="${SIZE * 0.5}" fill="url(#glow)"/>

  <g mask="url(#rayFade)">
    <g opacity="0.95">${rays(24, SIZE * 0.07, SIZE * 0.47, '#ffffff', 2)}</g>
    <g opacity="0.8">${rays(18, SIZE * 0.09, SIZE * 0.43, '#ffd9a0', 11)}</g>
  </g>

  <circle cx="${CX}" cy="${CY}" r="${SIZE * 0.17}" fill="none" stroke="${ACCENT}"
    stroke-width="${SIZE * 0.012}" opacity="0.9"/>
</svg>
`.trim()

const outPath = fileURLToPath(new URL('../src/assets/shot-sprite.webp', import.meta.url))
await sharp(Buffer.from(svg), { density: 192 })
  .resize(SIZE * 2, SIZE * 2)
  .webp({ quality: 68, alphaQuality: 75 })
  .toFile(outPath)

console.log(`shot-sprite.webp: ${SIZE * 2}x${SIZE * 2}`)
