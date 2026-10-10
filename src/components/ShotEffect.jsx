import shotSpriteAvif from '../assets/shot-sprite.avif'
import shotSpriteWebp from '../assets/shot-sprite.webp'

// Efek tembakan: kilatan layar singkat, lalu satu sprite (cahaya + sinar +
// cincin) yang sudah digambar sebelumnya — lihat scripts/build-shot-sprite.mjs.
// <picture> memberi browser versi AVIF (jauh lebih kecil) kalau didukung,
// dan otomatis jatuh ke WebP kalau tidak — tanpa JavaScript tambahan.
export default function ShotEffect({ x, y }) {
  return (
    <div
      className="shot"
      aria-hidden="true"
      style={{ '--x': `${x}px`, '--y': `${y}px` }}
    >
      <div className="shot__flash" />
      <picture>
        <source srcSet={shotSpriteAvif} type="image/avif" />
        <img className="shot__sprite" src={shotSpriteWebp} alt="" decoding="async" />
      </picture>
    </div>
  )
}