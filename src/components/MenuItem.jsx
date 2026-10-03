import { motion } from 'motion/react'

// Posisi, sudut, dan ukuran tiap label diatur di index.css
// lewat .menu-slot[data-id="..."].
export default function MenuItem({ id, label, side, delay = 0, onClick }) {
  return (
    <div className="menu-slot" data-id={id} data-side={side}>
      <motion.button
        type="button"
        className="menu-item"
        onClick={onClick}
        style={{ originX: side === 'left' ? 1 : 0 }} // melebar dari sisi badan
        initial={{ x: side === 'left' ? '60%' : '-60%', scaleX: 0.2, opacity: 0 }}
        animate={{ x: 0, scaleX: 1, opacity: 1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ delay, type: 'spring', stiffness: 150, damping: 13 }}
      >
        <span>{label}</span>
      </motion.button>
    </div>
  )
}