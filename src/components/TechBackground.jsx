import { memo } from 'react'
import techStrip from '../assets/tech-strip.webp'

const ROW_COUNT = 7

// Latar logo bahasa pemrograman: satu gambar yang sudah di-blur dan
// ditransparankan sebelumnya (lihat scripts/build-tech-strip.mjs)
// ditampilkan berulang dan digeser lewat CSS (.tech-track, transform saja).
// Tidak ada ikon React atau filter blur yang dihitung ulang saat animasi
// berjalan — itu penyebab utama latar terasa patah-patah di HP kelas
// menengah ke bawah.
const rows = Array.from({ length: ROW_COUNT }, (_, i) => (
  <div className="tech-row" key={i}>
    <div
      className="tech-track"
      style={{ backgroundImage: `url(${techStrip})` }}
    />
  </div>
))

function TechBackground() {
  return (
    <div className="tech-bg" aria-hidden="true">
      {rows}
    </div>
  )
}

// Tidak punya props yang berubah, jadi cukup dirender sekali dan tidak
// perlu ikut render ulang setiap kali state lain (mis. efek tembakan) di
// atasnya berubah.
export default memo(TechBackground)