import type { MouseEvent } from 'react'
import type { TeacherStageTalk } from '../types/content'

interface Props {
  talk: TeacherStageTalk
}

export const TeacherStageCard = ({ talk }: Props) => {
  const date = new Date(talk.scheduledAt).toLocaleDateString('de-DE', {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
  })

  const time = new Date(talk.scheduledAt).toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
  })

  const handleRegistration = (evt: MouseEvent<HTMLButtonElement>) => {
    if (!talk.registrationUrl) return
    evt.stopPropagation()
    evt.preventDefault()
    window.open(talk.registrationUrl, '_blank', 'noopener')
  }

  return (
    <article className="teacher-stage-card">
      <div
        className="teacher-stage-card__media"
        style={{ backgroundImage: `linear-gradient(180deg, rgba(15,23,42,0.05), rgba(15,23,42,0.55)), url(${talk.imageUrl})` }}
        aria-label={`Impression von ${talk.teacherName}`}
      >
        <div className="teacher-stage-card__meta">
          <span>{date}</span>
          <span>
            {time} · {talk.mode === 'online' ? 'Online' : talk.mode}
          </span>
        </div>
      </div>

      <div className="teacher-stage-card__body">
        <p className="teacher-stage-card__eyebrow">{talk.teacherName}</p>
        <h3>{talk.title}</h3>
        <p className="teacher-stage-card__role">
          {talk.teacherRole} · {talk.school}
        </p>
        <p className="teacher-stage-card__description">{talk.description}</p>
        <p className="teacher-stage-card__highlight">{talk.highlight}</p>

        <p className="teacher-stage-card__location">
          {talk.location} · {talk.duration}
        </p>

        <div className="teacher-stage-card__tags">
          {talk.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        {talk.registrationUrl && (
          <button type="button" className="teacher-stage-card__cta" onClick={handleRegistration}>
            Platz sichern
          </button>
        )}
      </div>
    </article>
  )
}
