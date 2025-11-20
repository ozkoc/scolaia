import type { TeacherProfile } from '../types/content'

interface TeacherProfileCardProps {
  profile: TeacherProfile
}

export const TeacherProfileCard = ({ profile }: TeacherProfileCardProps) => (
  <article className="card teacher-card">
    <div className="teacher-card__header">
      <img src={profile.avatarUrl} alt={profile.name} loading="lazy" />
      <div>
        <h4>{profile.name}</h4>
        <p>{profile.role}</p>
        <span>{profile.school}</span>
      </div>
    </div>
    <p>{profile.bio}</p>
    <div className="teacher-card__meta">
      <span>{profile.location}</span>
      <ul>
        {profile.expertise.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  </article>
)
