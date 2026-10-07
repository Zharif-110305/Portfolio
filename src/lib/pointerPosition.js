// Titik untuk efek tembakan: posisi klik asli (mouse/sentuh), atau titik
// tengah elemen kalau dipicu lewat keyboard (clientX/Y bernilai 0).
export function pointFromEvent(event) {
  if (event.clientX || event.clientY) {
    return { x: event.clientX, y: event.clientY }
  }
  const rect = event.currentTarget.getBoundingClientRect()
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
}