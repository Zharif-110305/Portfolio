import { memo } from 'react'
import { motion } from 'motion/react'
import DialogBubble from './DialogBubble'
import MenuItem from './MenuItem'
import TechBackground from './TechBackground'
import { profile } from '../data/profile'
import { pointFromEvent } from '../lib/pointerPosition'

// Mengambil src/assets/images/profile.* (png/webp/jpg).
// Kalau filenya belum ada, hasilnya kosong dan placeholder yang tampil.
const photoModules = import.meta.glob('../assets/images/profile.*', {
  eager: true,
  import: 'default',
})
const profilePhoto = Object.values(photoModules)[0] ?? null

const MENU = [
  { id: 'education', label: 'Education', side: 'left' },
  { id: 'projects', label: 'Project', side: 'left' },
  { id: 'photography', label: 'Photography', side: 'right' },
  { id: 'contact', label: 'Contact', side: 'right' },
]

const MENU_START_DELAY = 0.9 // detik, menunggu foto & dialog muncul
const MENU_STAGGER = 0.14

function Stage({ onSelect }) {
  return (
    <motion.main
      className="stage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="stage__backdrop" />
      <TechBackground />

      <div className="stage__dialog-slot">
        <DialogBubble speaker={profile.name} lines={profile.dialogLines} />
      </div>

      {/* foto + label menu satu kelompok; urutan lapisan diatur di CSS */}
      <div className="stage__figure">
        <button
          type="button"
          className="stage__hotspot"
          aria-label="Lihat profil"
          onClick={(e) => onSelect('profile', pointFromEvent(e))}
        />

        <nav className="stage__menu" aria-label="Menu utama">
          {MENU.map((item, i) => (
            <MenuItem
              key={item.id}
              id={item.id}
              label={item.label}
              side={item.side}
              delay={MENU_START_DELAY + i * MENU_STAGGER}
              onSelect={onSelect}
            />
          ))}
        </nav>

        <motion.div
          className="stage__photo-wrap"
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
              width="749"
              height="1358"
              fetchPriority="high"
              decoding="async"
            />
          ) : (
            <div className="stage__photo-placeholder">PHOTO</div>
          )}
        </motion.div>
      </div>
    </motion.main>
  )
}

// onSelect (dari App.jsx) referensinya stabil (useCallback), jadi memo di
// sini membuat seluruh panggung — dialog, foto, dan ~30 huruf menu — TIDAK
// ikut render ulang saat App hanya memperbarui state efek tembakan atau
// popup. Ini perubahan performa yang paling besar pengaruhnya.
export default memo(Stage)