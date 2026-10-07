import shotSprite from '../assets/shot-sprite.webp'

// Efek tembakan: kilatan layar singkat, lalu satu sprite (cahaya + sinar +
// cincin) yang sudah digambar sebelumnya — lihat scripts/build-shot-sprite.mjs.
// Hanya transform dan opacity yang dianimasikan di sini, tidak ada gradient
// atau mask yang dihitung ulang saat berjalan, supaya tetap mulus di HP.
// Gayanya ada di index.css (bagian SHOT EFFECT).
export default function ShotEffect({ x, y }) {
  return (
    <div
      className="shot"
      aria-hidden="true"
      style={{ '--x': `${x}px`, '--y': `${y}px` }}
    >
      <div className="shot__flash" />
      <img className="shot__sprite" src={shotSprite} alt="" decoding="async" />
    </div>
  )
}