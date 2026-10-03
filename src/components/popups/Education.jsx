import { education } from '../../data/education'

export default function Education() {
  return (
    <ol className="timeline">
      {education.map((item) => (
        <li key={item.id} className="timeline__item">
          <span className="timeline__period">{item.period}</span>
          <h3 className="timeline__title">{item.title}</h3>
          <p className="timeline__place">{item.place}</p>
          {item.description && <p className="timeline__desc">{item.description}</p>}
        </li>
      ))}
    </ol>
  )
}