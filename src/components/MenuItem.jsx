import { motion } from 'motion/react'

const LETTER_STAGGER = 0.045 // detik antar huruf

// Posisi, sudut, dan ukuran tiap label diatur di index.css
// lewat .menu-slot[data-id="..."]. Tiap huruf mendapat --t (0 sampai 1)
// yang dipakai CSS untuk membesarkan huruf bertahap dari awal ke akhir.
export default function MenuItem({ id, label, side, delay = 0, onClick }) {
  const letters = Array.from(label)
  const last = Math.max(letters.length - 1, 1)

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
          {letters.map((char, i) => (
            <span key={i} className="menu-letter" style={{ '--t': i / last }}>
              <motion.span
                style={{ display: 'inline-block' }}
                initial={{ scale: 0, y: 8 }}
                animate={{ scale: 1, y: 0 }}
                transition={{
                  delay: delay + 0.2 + i * LETTER_STAGGER,
                  type: 'spring',
                  stiffness: 320,
                  damping: 14,
                }}
              >
                {char}
              </motion.span>
            </span>
          ))}
        </span>
      </motion.button>
    </div>
  )
}