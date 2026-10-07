import { useMemo } from 'react'
import { buildLetters } from '../lib/ransomLetters'
import { pointFromEvent } from '../lib/pointerPosition'

// Posisi dan sudut tiap label diatur di index.css lewat
// .menu-slot[data-id="..."]. Gaya tiap huruf (ubin, font, miring) dihasilkan
// oleh buildLetters() dan dipasang lewat atribut data-* serta variabel CSS.
//
// Animasi munculnya (kata meluncur masuk, lalu huruf "melompat" satu per
// satu) dilakukan lewat CSS @keyframes di index.css, bukan lewat JavaScript
// (dulu Framer Motion). Untuk ~30 huruf yang muncul sekaligus, versi CSS
// jauh lebih ringan di HP karena browser bisa menjalankannya di luar thread
// utama, alih-alih menjalankan puluhan simulasi pegas dengan JavaScript.
function MenuItem({ id, label, side, delay = 0, onSelect }) {
  const letters = useMemo(() => buildLetters(label), [label])

  return (
    <div className="menu-slot" data-id={id} data-side={side}>
      <button
        type="button"
        className="menu-item"
        aria-label={label}
        onClick={(e) => onSelect(id, pointFromEvent(e))}
        style={{ '--menu-delay': `${delay}s` }}
      >
        <span className="menu-label" aria-hidden="true">
          {letters.map((letter, i) => (
            <span
              key={letter.key}
              className="menu-letter"
              style={{
                '--lt': letter.t,
                '--lrot': letter.rot,
                '--ldy': letter.dy,
                '--lk': letter.k,
                '--i': i,
              }}
            >
              <span
                className="menu-letter__tile"
                data-tone={letter.tone}
                data-font={letter.font}
                data-clip={letter.clip}
                data-case={letter.lower ? 'lower' : 'upper'}
              >
                {letter.char}
              </span>
            </span>
          ))}
        </span>
      </button>
    </div>
  )
}

export default MenuItem