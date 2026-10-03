import { useState } from 'react'
import { AnimatePresence } from 'motion/react'
import StartScreen from './components/StartScreen'
import Stage from './components/Stage'

export default function App() {
  const [started, setStarted] = useState(false)

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        {started ? (
          <Stage key="stage" />
        ) : (
          <StartScreen key="start" onStart={() => setStarted(true)} />
        )}
      </AnimatePresence>
    </div>
  )
}