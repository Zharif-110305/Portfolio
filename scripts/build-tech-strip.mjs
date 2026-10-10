// Membuat src/assets/tech-strip.webp DAN tech-strip.avif: satu pita logo
// bahasa pemrograman yang SUDAH transparan dan blur di dalam gambarnya
// (bukan lewat CSS filter saat berjalan). Dipakai sebagai latar bergerak
// (lihat .tech-track di index.css, dipasang lewat image-set() di
// TechBackground.jsx — browser otomatis memilih AVIF kalau didukung, atau
// WebP kalau tidak). Karena blurnya sudah "dipanggang" ke piksel, HP
// tinggal menggeser gambar (murah) alih-alih menghitung ulang blur tiap
// frame (mahal, penyebab umum animasi patah-patah di perangkat kelas
// menengah ke bawah).
//
// Jalankan ulang setelah mengubah daftar ICONS atau pengaturan di bawah:
//   node scripts/build-tech-strip.mjs
import { fileURLToPath } from 'node:url'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import sharp from 'sharp' // perlu: npm install -D sharp
import {
  SiReact, SiJavascript, SiTypescript, SiPython, SiHtml5, SiNodedotjs,
  SiPhp, SiCplusplus, SiGo, SiRust, SiKotlin, SiDart, SiFlutter,
  SiTailwindcss, SiVite, SiSupabase, SiGit, SiMysql, SiLaravel,
} from 'react-icons/si'
import { FaCss3Alt, FaJava } from 'react-icons/fa'

// Daftar logo (urutan = urutan di pita). Tambah atau hapus sesukamu.
const ICONS = [
  SiReact, SiJavascript, SiTypescript, SiPython, SiHtml5, FaCss3Alt,
  SiNodedotjs, SiPhp, SiCplusplus, SiGo, SiRust, SiKotlin, SiDart,
  SiFlutter, SiTailwindcss, SiVite, SiSupabase, SiGit, SiMysql,
  SiLaravel, FaJava,
]

const ICON = 64 // ukuran logo (satuan SVG)
const GAP = 84 // jarak antar logo
const PAD = 8 // ruang atas-bawah agar blur tidak terpotong
const OPACITY = 0.13 // transparansi logo
const BLUR = 2.2 // kekuatan blur
const SCALE = 2 // render @2x supaya tetap tajam di layar retina

const slot = ICON + GAP
const width = ICONS.length * slot
const height = ICON + PAD * 2

const parts = ICONS.map((Icon, i) => {
  const markup = renderToStaticMarkup(createElement(Icon))
  const viewBox = markup.match(/viewBox="([^"]+)"/)[1]
  const inner = markup.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '')
  const x = i * slot + GAP / 2
  return `<svg x="${x}" y="${PAD}" width="${ICON}" height="${ICON}" viewBox="${viewBox}">${inner}</svg>`
})

const svg =
  `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">` +
  `<defs><filter id="b" filterUnits="userSpaceOnUse" x="0" y="0" width="${width}" height="${height}">` +
  `<feGaussianBlur stdDeviation="${BLUR}"/></filter></defs>` +
  `<g fill="#fff" opacity="${OPACITY}" filter="url(#b)">${parts.join('')}</g></svg>`

const svgBuffer = Buffer.from(svg)
const base = sharp(svgBuffer, { density: 96 * SCALE }).resize(width * SCALE, height * SCALE)

const webpPath = fileURLToPath(new URL('../src/assets/tech-strip.webp', import.meta.url))
const avifPath = fileURLToPath(new URL('../src/assets/tech-strip.avif', import.meta.url))

await base.clone().webp({ quality: 90, alphaQuality: 90 }).toFile(webpPath)
await base.clone().avif({ quality: 45, effort: 6 }).toFile(avifPath)

console.log(`tech-strip.webp & tech-strip.avif: ${width * SCALE}x${height * SCALE} (satu tile = ${slot}px lebar pada skala dasar)`)
