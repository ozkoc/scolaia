import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import type { Event } from '../types/content'
import { apiClient } from '../services/api'

export const EventDetailPage = () => {
  const { id } = useParams()
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await apiClient.getEvent(id!)
        setEvent(data)
      } catch (err) {
        setError('Event konnte nicht geladen werden.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  if (loading) return <p className="empty-state">Event wird geladen…</p>
  if (error || !event) return <p className="empty-state">{error ?? 'Event nicht gefunden.'}</p>

  const start = new Date(event.startTime)
  const end = new Date(event.endTime)

  const date = start.toLocaleDateString('de-DE', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

  const time = `${start.toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
  })} – ${end.toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
  })}`

  return (
    <div className="event-detail">
      <Link to="/" className="back-link">← Zurück</Link>

      <h1 className="event-title">{event.title}</h1>
      <p className="event-meta">
        <strong>{date}</strong> · {time} · {event.mode === 'online' ? 'Online' : event.mode}
      </p>

      <p className="event-host">Veranstaltet von: {event.host}</p>

      <p className="event-description">{event.description}</p>

      <h3>Thema & Fokusbereiche</h3>
      <p>{event.topic}</p>
      <div className="event-tags">
        {event.focusAreas.map((tag) => (
          <span key={tag} className="event-tag">{tag}</span>
        ))}
      </div>

      <p className="event-meta">
        <strong>Sprache:</strong> {event.language === 'de' ? 'Deutsch' : 'Englisch'} <br />
        <strong>Zielgruppe:</strong> {event.targetAudience} <br />
        <strong>Ort:</strong> {event.location}
      </p>

      {event.registrationUrl && (
        <a
          href={event.registrationUrl}
          target="_blank"
          rel="noreferrer"
          className="event-cta"
        >
          Zur Anmeldung
        </a>
      )}
    </div>
  )
}
