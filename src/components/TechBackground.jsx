import { memo } from 'react'
import techStripAvif from '../assets/tech-strip.avif'
import techStripWebp from '../assets/tech-strip.webp'

const ROW_COUNT = 7

// image-set() membiarkan browser sendiri yang memilih format: AVIF (jauh
// lebih kecil) kalau didukung, WebP kalau tidak. Didukung semua browser
// modern; browser yang sangat lama akan mengabaikan baris ini dan tanpa
// latar (bukan error) — risikonya sangat kecil dan tidak terlihat di
// perangkat yang dipakai orang pada umumnya.
const techStripImage = `image-set(url(${techStripAvif}) type('image/avif'), url(${techStripWebp}) type('image/webp'))`

// Latar logo bahasa pemrograman: satu gambar yang sudah di-blur dan
// ditransparankan sebelumnya (lihat scripts/build-tech-strip.mjs)
// ditampilkan berulang dan digeser lewat CSS (.tech-track, transform saja).
// Tidak ada ikon React atau filter blur yang dihitung ulang saat animasi
// berjalan.
const rows = Array.from({ length: ROW_COUNT }, (_, i) => (
  <div className="tech-row" key={i}>
    <div className="tech-track" style={{ backgroundImage: techStripImage }} />
  </div>
))

function TechBackground() {
  return (
    <div className="tech-bg" aria-hidden="true">
      {rows}
    </div>
  )
}

export default memo(TechBackground)