import { motion } from 'motion/react'
import TechBackground from './TechBackground'
import { prewarmInteractiveAssets } from '../lib/prewarm'

export default function StartScreen({ onStart }) {
  const handleStart = () => {
    // gestur pengguna pertama: waktu yang tepat untuk menyalakan audio dan
    // memuat gambar efek tembakan lebih awal (lihat lib/prewarm.js)
    prewarmInteractiveAssets()
    onStart()
  }

  return (
    <motion.div
      className="start-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.08 }}
      transition={{ duration: 0.4 }}
    >
      <TechBackground />
      <button type="button" className="start-button" onClick={handleStart}>
        Press to start
      </button>
    </motion.div>
  )
}