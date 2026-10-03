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
          // sementara hanya console.log; di fase berikutnya diganti popup
          <Stage key="stage" onSelect={(id) => console.log('menu:', id)} />
        ) : (
          <StartScreen key="start" onStart={() => setStarted(true)} />
        )}
      </AnimatePresence>
    </div>
  )
}