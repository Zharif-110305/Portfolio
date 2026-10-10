import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, useReducedMotion } from 'motion/react'
import StartScreen from './components/StartScreen'
import Stage from './components/Stage'
import Modal from './components/Modal'
import ShotEffect from './components/ShotEffect'
import { profile } from './data/profile'
import { GUNSHOT_SOUND, playGunshot } from './lib/gunshot'

// Kode tiap popup baru diunduh saat benar-benar dibutuhkan, bukan ikut
// bundle awal (JavaScript yang harus dimuat sebelum halaman pertama kali
// interaktif). Specifier import() di sini harus sama persis dengan yang
// dipakai lib/prewarm.js, supaya tidak diunduh dua kali: begitu pengguna
// klik "Press to start", kelimanya sudah mulai diunduh di latar belakang,
// jadi saat benar-benar dibuka nyaris selalu sudah siap.
const Education = lazy(() => import('./components/popups/Education'))
const Projects = lazy(() => import('./components/popups/Projects'))
const Photography = lazy(() => import('./components/popups/Photography'))
const Contact = lazy(() => import('./components/popups/Contact'))
const Profile = lazy(() => import('./components/popups/Profile'))

const SHOT_DURATION = 450 // ms, lama efek tembakan
const POPUP_DELAY = 170 // ms, popup muncul saat kilatan masih terang

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
  const [shot, setShot] = useState(null)

  const reduceMotion = useReducedMotion()
  const timers = useRef([])
  const busy = useRef(false)

  // bersihkan timer kalau komponen dilepas
  useEffect(() => {
    const pending = timers.current
    return () => pending.forEach(clearTimeout)
  }, [])

  const closePopup = useCallback(() => setActivePopup(null), [])

  // dipanggil dari menu / foto; point = posisi klik di layar
  const handleSelect = useCallback(
    (id, point) => {
      if (busy.current) return

      // pengguna "kurangi gerakan": tanpa kilatan & getaran
      if (reduceMotion || !point) {
        setActivePopup(id)
        return
      }

      busy.current = true
      setShot({ key: Date.now(), x: point.x, y: point.y })
      if (GUNSHOT_SOUND) playGunshot()

      timers.current.push(
        setTimeout(() => setActivePopup(id), POPUP_DELAY),
        setTimeout(() => {
          setShot(null)
          busy.current = false
        }, SHOT_DURATION),
      )
    },
    [reduceMotion],
  )

  const popup = activePopup ? POPUPS[activePopup] : null
  const PopupContent = popup?.Component

  return (
    <div className={shot ? 'app app--shake' : 'app'}>
      <AnimatePresence mode="wait">
        {started ? (
          <Stage key="stage" onSelect={handleSelect} />
        ) : (
          <StartScreen key="start" onStart={() => setStarted(true)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {popup && (
          <Modal key={activePopup} title={popup.title} onClose={closePopup}>
            <Suspense fallback={null}>
              <PopupContent />
            </Suspense>
          </Modal>
        )}
      </AnimatePresence>

      {shot && <ShotEffect key={shot.key} x={shot.x} y={shot.y} />}
    </div>
  )
}