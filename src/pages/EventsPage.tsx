import { useEffect, useState } from 'react'
import { apiClient } from '../services/api'
import type { Event } from '../types/content'
import { Section } from '../components/Section'
import { EventCard } from '../components/EventCard'

export const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoadingEvents, setIsLoadingEvents] = useState(false)
  const [eventsError, setEventsError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoadingEvents(true)
        const data = await apiClient.getEvents()
        setEvents(data)
      } catch (err) {
        setEventsError('Events konnten nicht geladen werden.')
      } finally {
        setIsLoadingEvents(false)
      }
    }

    fetchEvents()
  }, [])

  return (
    <div className="page-container events-page">
      <Section
        title="Upcoming Live Observations & Events"
        description="Participate without leaving your school."
        className="content-section--wide"
      >
        {isLoadingEvents && <p className="empty-state">Loading events...</p>}

        {eventsError && !isLoadingEvents && (
          <p className="empty-state">{eventsError}</p>
        )}

        {!isLoadingEvents && !eventsError && events.length === 0 && (
          <p className="empty-state">
            No events scheduled at the moment. Check back soon.
          </p>
        )}

        {!isLoadingEvents && !eventsError && events.length > 0 && (
          <div className="events-grid">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </Section>
    </div>
  )
}
