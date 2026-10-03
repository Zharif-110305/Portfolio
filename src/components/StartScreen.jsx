import { motion } from 'motion/react'
import TechBackground from './TechBackground'

export default function StartScreen({ onStart }) {
  return (
    <motion.div
      className="start-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.08 }}
      transition={{ duration: 0.4 }}
    >
      <TechBackground />
      <button type="button" className="start-button" onClick={onStart}>
        Press to start
      </button>
    </motion.div>
  )
}