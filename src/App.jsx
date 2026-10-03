import { useCallback, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import StartScreen from './components/StartScreen'
import Stage from './components/Stage'
import Modal from './components/Modal'
import Education from './components/popups/Education'
import Projects from './components/popups/Projects'
import Photography from './components/popups/Photography'
import Contact from './components/popups/Contact'
import Profile from './components/popups/Profile'
import { profile } from './data/profile'

const POPUPS = {
  education: { title: 'Education', Component: Education },
  projects: { title: 'Project', Component: Projects },
  photography: { title: 'Photography', Component: Photography },
  contact: { title: 'Contact', Component: Contact },
  profile: { title: profile.name, Component: Profile },
}

export default function App() {
  const [started, setStarted] = useState(false)
  const [activePopup, setActivePopup] = useState(null)

  const closePopup = useCallback(() => setActivePopup(null), [])

  const popup = activePopup ? POPUPS[activePopup] : null
  const PopupContent = popup?.Component

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        {started ? (
          <Stage key="stage" onSelect={setActivePopup} />
        ) : (
          <StartScreen key="start" onStart={() => setStarted(true)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {popup && (
          <Modal key={activePopup} title={popup.title} onClose={closePopup}>
            <PopupContent />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  )
}