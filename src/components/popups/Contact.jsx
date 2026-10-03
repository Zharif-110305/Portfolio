import { profile } from '../../data/profile'

export default function Contact() {
  return (
    <ul className="contact-list">
      {profile.contacts.map((contact) => (
        <li key={contact.id}>
          <a
            className="contact-link"
            href={contact.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="contact-link__label">{contact.label}</span>
            <span className="contact-link__value">{contact.value}</span>
          </a>
        </li>
      ))}
    </ul>
  )
}