// Efek tembakan: kilatan layar, cahaya hangat, sinar menyebar, dan cincin.
// Semua gaya ada di index.css (bagian SHOT EFFECT).
export default function ShotEffect({ x, y }) {
  return (
    <div
      className="shot"
      aria-hidden="true"
      style={{ '--x': `${x}px`, '--y': `${y}px` }}
    >
      <div className="shot__flash" />
      <div className="shot__glow" />
      <div className="shot__burst" />
      <div className="shot__ring" />
    </div>
  )
}