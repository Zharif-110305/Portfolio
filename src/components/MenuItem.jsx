import { useMemo } from 'react'
import { motion } from 'motion/react'
import { buildLetters } from '../lib/ransomLetters'

const LETTER_STAGGER = 0.045 // detik antar huruf

// Posisi dan sudut tiap label diatur di index.css lewat
// .menu-slot[data-id="..."]. Gaya tiap huruf (ubin, font, miring) dihasilkan
// oleh buildLetters() dan dipasang lewat atribut data-* serta variabel CSS.
export default function MenuItem({ id, label, side, delay = 0, onClick }) {
  const letters = useMemo(() => buildLetters(label), [label])

  return (
    <div className="menu-slot" data-id={id} data-side={side}>
      <motion.button
        type="button"
        className="menu-item"
        aria-label={label}
        onClick={onClick}
        style={{ originX: side === 'left' ? 1 : 0 }} // melebar dari sisi badan
        initial={{ x: side === 'left' ? '60%' : '-60%', scaleX: 0.2, opacity: 0 }}
        animate={{ x: 0, scaleX: 1, opacity: 1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ delay, type: 'spring', stiffness: 150, damping: 13 }}
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
              }}
            >
              <motion.span
                style={{ display: 'block' }}
                initial={{ scale: 0, y: 8 }}
                animate={{ scale: 1, y: 0 }}
                transition={{
                  delay: delay + 0.2 + i * LETTER_STAGGER,
                  type: 'spring',
                  stiffness: 320,
                  damping: 14,
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
              </motion.span>
            </span>
          ))}
        </span>
      </motion.button>
    </div>
  )
}