import { profile } from '../../data/profile'

export default function Profile() {
  return (
    <div className="profile">
      <p className="profile__role">{profile.role}</p>
      {profile.bio.map((paragraph, i) => (
        <p key={i} className="profile__text">
          {paragraph}
        </p>
      ))}
    </div>
  )
}