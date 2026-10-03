import { TECH_ICONS } from '../data/techIcons'

const ROW_COUNT = 7 // jumlah baris; arah selang-seling diatur di CSS
const ROW_SHIFT = 5 // tiap baris mulai dari logo yang berbeda

function rotate(list, n) {
  return [...list.slice(n), ...list.slice(0, n)]
}

export default function TechBackground() {
  return (
    <div className="tech-bg" aria-hidden="true">
      {Array.from({ length: ROW_COUNT }, (_, row) => {
        const set = rotate(TECH_ICONS, (row * ROW_SHIFT) % TECH_ICONS.length)
        // dua salinan agar putarannya mulus tanpa jeda
        const items = [...set, ...set]

        return (
          <div className="tech-row" key={row}>
            <div className="tech-track">
              {items.map(({ name, Icon }, i) => (
                <Icon key={`${i}-${name}`} className="tech-logo" />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}