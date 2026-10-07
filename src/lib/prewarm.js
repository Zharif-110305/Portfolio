import shotSprite from '../assets/shot-sprite.webp'
import { prewarmAudio } from './gunshot'

// Dipanggil sekali saat tombol "Press to start" ditekan (gestur pengguna
// pertama yang sah untuk menyalakan audio browser). Menyalakan AudioContext
// dan memuat + mendekode gambar efek tembakan lebih awal, selagi pengguna
// masih membaca layar start, sehingga saat menu pertama kali diklik semuanya
// sudah siap — tidak ada jeda memuat gambar atau menyalakan audio di tengah
// animasi (itulah penyebab efek terasa delay di percobaan pertama).
export function prewarmInteractiveAssets() {
  prewarmAudio()
  const img = new window.Image()
  img.decoding = 'async'
  img.src = shotSprite
}