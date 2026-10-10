import shotSpriteWebp from '../assets/shot-sprite.webp'
import { prewarmAudio } from './gunshot'

// Dipanggil sekali saat tombol "Press to start" ditekan (gestur pengguna
// pertama yang sah untuk menyalakan audio browser). Dari sini, selagi
// pengguna masih membaca layar start:
//   1) audio dinyalakan lebih awal
//   2) gambar efek tembakan dimuat + didekode lebih awal
//   3) kode kelima popup (Education, Project, dst — lihat App.jsx, dipecah
//      lewat React.lazy supaya tidak ikut bundle awal) mulai diunduh di
//      latar belakang
// Saat menu pertama kali diklik, semuanya sudah siap — tidak ada jeda
// memuat gambar, menyalakan audio, atau mengunduh kode popup di tengah
// animasi.
export function prewarmInteractiveAssets() {
  prewarmAudio()

  const img = new window.Image()
  img.decoding = 'async'
  img.src = shotSpriteWebp

  // specifier import() di sini harus sama persis dengan yang dipakai
  // React.lazy() di App.jsx, supaya hasil unduhannya dipakai bersama
  // (bukan diunduh dua kali).
  import('../components/popups/Education')
  import('../components/popups/Projects')
  import('../components/popups/Photography')
  import('../components/popups/Contact')
  import('../components/popups/Profile')
}