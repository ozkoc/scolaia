import { useEffect, useState } from 'react'
import type { TeacherStageTalk } from '../types/content'
import { apiClient } from '../services/api'
import { TeacherStageCard } from '../components/TeacherStageCard'

export const TeacherOnStagePage = () => {
  const [talks, setTalks] = useState<TeacherStageTalk[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        setLoading(true)
        const data = await apiClient.getTeacherStageTalks()
        if (!active) return
        setTalks(data)
        setError(null)
      } catch (err) {
        if (!active) return
        setError('Teacher on Stage Sessions konnten nicht geladen werden.')
      } finally {
        if (active) setLoading(false)
      }
    }

    load()
    return () => {
      active = false
    }
  }, [])

  return (
    <div className="teacher-stage-page">
      <section className="teacher-stage-hero">
        <div className="teacher-stage-hero__content">
          <p className="eyebrow">Teacher on Stage</p>
          <h1>Where courageous teachers rehearse the future of learning.</h1>
          <p>
            Jede Session ist eine Initiative aus der Praxis: Lehrkräfte öffnen ihre Klassenräume – online oder
            vor Ort – und laden Kolleg:innen ein, mutige Entscheidungen live mitzuerleben.
          </p>
        </div>
      </section>

      <section className="teacher-stage-mission">
        <div>
          <h2>Eine Bewegung für Rollenmodelle</h2>
          <p>
            Teacher on Stage ist unsere Bühne für Lehrkräfte, die Verantwortung übernehmen, Experimente teilen und
            andere Teams empowern. Wir spotlighten Initiativen, die Transparenz schaffen: Hospitationen, Playbooks,
            Reflexionen über Fehler und nächste Schritte.
          </p>
        </div>
        <div className="teacher-stage-mission__stats">
          <div>
            <span>50+</span>
            <p>Lehrkräfte teilen jährlich ihre Praxis.</p>
          </div>
          <div>
            <span>1200</span>
            <p>Teilnehmende, die live Fragen stellen.</p>
          </div>
          <div>
            <span>18 Städte</span>
            <p>aus denen wir on-site streamen.</p>
          </div>
        </div>
      </section>

      <section className="teacher-stage-list">
        <header>
          <h2>Nächste Teacher on Stage Talks</h2>
          <p>Reservieren Sie Ihren Spot – online, hybrid oder unmittelbar vor Ort.</p>
        </header>

        {loading ? (
          <p className="empty-state">Sessions werden geladen…</p>
        ) : error ? (
          <p className="empty-state">{error}</p>
        ) : talks.length ? (
          <div className="teacher-stage-grid">
            {talks.map((talk) => (
              <TeacherStageCard key={talk.id} talk={talk} />
            ))}
          </div>
        ) : (
          <p className="empty-state">Aktuell sind keine Sessions geplant.</p>
        )}
      </section>
    </div>
  )
}
