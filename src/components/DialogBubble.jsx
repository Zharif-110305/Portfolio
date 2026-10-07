import { memo, useCallback, useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'

const TYPE_SPEED = 38 // ms per huruf
const HOLD_TIME = 2400 // jeda setelah satu kalimat selesai (ms)

function TypedText({ text, onDone }) {
  const reduceMotion = useReducedMotion()
  const [count, setCount] = useState(reduceMotion ? text.length : 0)

  useEffect(() => {
    if (count < text.length) {
      const timer = setTimeout(() => setCount(count + 1), TYPE_SPEED)
      return () => clearTimeout(timer)
    }
    const timer = setTimeout(onDone, HOLD_TIME)
    return () => clearTimeout(timer)
  }, [count, text, onDone])

  return (
    <span className="dialog__typed">
      <span className="dialog__ghost" aria-hidden="true">
        {text}
      </span>
      <span className="dialog__live">
        {text.slice(0, count)}
        <span className="dialog__cursor" aria-hidden="true" />
      </span>
    </span>
  )
}

function DialogBubble({ speaker, lines }) {
  const [index, setIndex] = useState(0)
  const next = useCallback(
    () => setIndex((i) => (i + 1) % lines.length),
    [lines.length],
  )

  return (
    <motion.div
      className="dialog"
      initial={{ opacity: 0, y: 120, scale: 0.6 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.6, type: 'spring', stiffness: 160, damping: 16 }}
    >
      <span className="dialog__name">{speaker}</span>
      <div className="dialog__box">
        <p className="dialog__text">
          <TypedText key={index} text={lines[index]} onDone={next} />
        </p>
      </div>
    </motion.div>
  )
}

// speaker & lines datang dari data/profile.js (objek modul, referensinya
// stabil), jadi memo di sini efektif mencegah render ulang yang tidak perlu
// saat komponen di atasnya (Stage) render ulang karena state lain.
export default memo(DialogBubble)