import { motion } from 'motion/react'
import DialogBubble from './DialogBubble'
import MenuItem from './MenuItem'
import { profile } from '../data/profile'

// Mengambil src/assets/images/profile.* (png/webp/jpg).
// Kalau filenya belum ada, hasilnya kosong dan placeholder yang tampil.
const photoModules = import.meta.glob('../assets/images/profile.*', {
  eager: true,
  import: 'default',
})
const profilePhoto = Object.values(photoModules)[0] ?? null

const LEFT_MENU = [
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Project' },
]
const RIGHT_MENU = [
  { id: 'photography', label: 'Photography' },
  { id: 'contact', label: 'Contact' },
]

const MENU_START_DELAY = 1.0 // detik, menunggu foto & dialog muncul
const MENU_STAGGER = 0.12

export default function Stage({ onSelect = () => {} }) {
  return (
    <motion.main
      className="stage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="stage__backdrop" />

      <div className="stage__dialog-slot">
        <DialogBubble speaker={profile.name} lines={profile.dialogLines} />
      </div>

      <motion.button
        type="button"
        className="stage__photo-btn"
        aria-label="Lihat profil"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 120, damping: 18 }}
      >
        {profilePhoto ? (
          <img
            className="stage__photo"
            src={profilePhoto}
            alt="Foto profil"
            draggable="false"
          />
        ) : (
          <div className="stage__photo-placeholder">PHOTO</div>
        )}
      </motion.button>

      <nav className="stage__menu stage__menu--left" aria-label="Menu kiri">
        {LEFT_MENU.map((item, i) => (
          <MenuItem
            key={item.id}
            label={item.label}
            side="left"
            delay={MENU_START_DELAY + i * MENU_STAGGER}
            onClick={() => onSelect(item.id)}
          />
        ))}
      </nav>

      <nav className="stage__menu stage__menu--right" aria-label="Menu kanan">
        {RIGHT_MENU.map((item, i) => (
          <MenuItem
            key={item.id}
            label={item.label}
            side="right"
            delay={MENU_START_DELAY + i * MENU_STAGGER}
            onClick={() => onSelect(item.id)}
          />
        ))}
      </nav>
    </motion.main>
  )
}