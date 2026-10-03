import { useState } from 'react'
import photos from '../../data/photos.json'

function PhotoTile({ photo }) {
  const [failed, setFailed] = useState(false)
  const showFallback = !photo.src || failed

  return (
    <figure className="gallery__item">
      {showFallback ? (
        <div className="gallery__nosignal">NO SIGNAL</div>
      ) : (
        <img
          className="gallery__img"
          src={photo.src}
          alt={photo.title}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}
      <figcaption className="gallery__caption">{photo.title}</figcaption>
    </figure>
  )
}

export default function Photography() {
  return (
    <div className="gallery">
      {photos.map((photo) => (
        <PhotoTile key={photo.id} photo={photo} />
      ))}
    </div>
  )
}