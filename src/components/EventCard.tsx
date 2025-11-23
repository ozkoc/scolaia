import React from 'react'
import type { Event } from '../types/content'
import { Link } from 'react-router-dom'

type Props = {
  event: Event
}

export const EventCard: React.FC<Props> = ({ event }) => {
  const start = new Date(event.startTime)
  const end = new Date(event.endTime)

  const date = start.toLocaleDateString('de-DE', {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
  })

  const time = `${start.toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
  })} – ${end.toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
  })}`

  const handleRegistrationClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    if (!event.registrationUrl) return
    evt.preventDefault()
    evt.stopPropagation()
    window.open(event.registrationUrl, '_blank', 'noopener')
  }

  return (
    <Link to={`/events/${event.id}`} className="event-card-link">
      <article className="event-card">
        <div
          className="event-card__media"
          style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.25), rgba(0,0,0,0.55)), url(${event.imageUrl})` }}
          aria-label={`Bild zu ${event.title}`}
        >
          <div className="event-card__media-meta">
            <span className="event-card__badge">{event.mode === 'online' ? 'Online' : event.mode}</span>
            <span className="event-card__date">
              {date} · {time}
            </span>
          </div>
        </div>

        <div className="event-card__body">
          <p className="event-card__topic">{event.topic}</p>
          <h3 className="event-card__title">{event.title}</h3>
          <p className="event-card__description">{event.description}</p>

          <p className="event-card__meta">
            <strong>Sprache:</strong> {event.language === 'de' ? 'Deutsch' : 'Englisch'} ·{' '}
            <strong>Zielgruppe:</strong> {event.targetAudience}
          </p>

          <p className="event-card__meta">
            <strong>Ort:</strong> {event.location}
            {event.host ? ` · ${event.host}` : null}
          </p>

          <div className="event-card__tags">
            {event.focusAreas.map((tag) => (
              <span key={tag} className="event-card__tag">
                {tag}
              </span>
            ))}
          </div>

          {event.registrationUrl && (
            <div className="event-card__footer">
              <button type="button" className="event-card__cta" onClick={handleRegistrationClick}>
                Zur Anmeldung
              </button>
            </div>
          )}
        </div>
      </article>
    </Link>
  )
}
