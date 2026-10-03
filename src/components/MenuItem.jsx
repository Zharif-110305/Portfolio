import { motion } from 'motion/react'

export default function MenuItem({ label, side, delay = 0, onClick }) {
  return (
    <motion.button
      type="button"
      className="menu-item"
      onClick={onClick}
      initial={{ x: side === 'left' ? -160 : 160, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ delay, type: 'spring', stiffness: 140, damping: 16 }}
    >
      <span>{label}</span>
    </motion.button>
  )
}