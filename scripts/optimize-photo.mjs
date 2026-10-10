// Membuat src/assets/images/profile.webp DAN profile.avif dari satu foto
// sumber (idealnya PNG hasil cutout transparan, sebelum dipangkas).
// Otomatis memangkas ke area yang tidak transparan (seperti yang dilakukan
// manual di awal project), lalu mengekspor dua format. Jalankan setiap kali
// foto profil diganti:
//
//   npm install -D sharp   (sekali saja, kalau belum)
//   node scripts/optimize-photo.mjs path/ke/foto-sumber.png
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'

const input = process.argv[2]
if (!input) {
  console.error('Pakai: node scripts/optimize-photo.mjs path/ke/foto-sumber.png')
  process.exit(1)
}

const src = sharp(input).ensureAlpha()
const { data, info } = await src.raw().toBuffer({ resolveWithObject: true })

// cari kotak pembatas area yang tidak transparan (alpha > 10)
let minX = info.width
let minY = info.height
let maxX = 0
let maxY = 0
for (let y = 0; y < info.height; y++) {
  for (let x = 0; x < info.width; x++) {
    const alpha = data[(y * info.width + x) * 4 + 3]
    if (alpha > 10) {
      if (x < minX) minX = x
      if (x > maxX) maxX = x
      if (y < minY) minY = y
      if (y > maxY) maxY = y
    }
  }
}

const pad = 4
minX = Math.max(minX - pad, 0)
minY = Math.max(minY - pad, 0)
maxX = Math.min(maxX + pad, info.width - 1)
maxY = Math.min(maxY + pad, info.height - 1)
const width = maxX - minX + 1
const height = maxY - minY + 1

const cropped = sharp(input).extract({ left: minX, top: minY, width, height })

const webpPath = fileURLToPath(new URL('../src/assets/images/profile.webp', import.meta.url))
const avifPath = fileURLToPath(new URL('../src/assets/images/profile.avif', import.meta.url))

await cropped.clone().webp({ quality: 85 }).toFile(webpPath)
await cropped.clone().avif({ quality: 55, effort: 6 }).toFile(avifPath)

console.log(`profile.webp & profile.avif dibuat, ukuran ${width}x${height}`)
console.log('Kalau ukurannya beda dari foto sebelumnya, perbarui juga:')
console.log(`  - width="${width}" height="${height}" di Stage.jsx`)
console.log(`  - --photo-aspect: ${(width / height).toFixed(4)}; di index.css (bagian .stage__figure)`)
