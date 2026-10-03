import { motion } from 'motion/react'

// Mengambil src/assets/images/profile.* (png/webp/jpg).
// Kalau filenya belum ada, hasilnya kosong dan placeholder yang tampil.
const photoModules = import.meta.glob('../assets/images/profile.*', {
  eager: true,
  import: 'default',
})
const profilePhoto = Object.values(photoModules)[0] ?? null

export default function Stage() {
  return (
    <motion.main
      className="stage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="stage__backdrop" />

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
    </motion.main>
  )
}