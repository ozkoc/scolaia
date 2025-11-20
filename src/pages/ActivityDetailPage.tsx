import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import type { Activity } from '../types/content'
import { TagList } from '../components/TagList'
import { apiClient } from '../services/api'

export const ActivityDetailPage = () => {
  const { activityId } = useParams()
  const [activity, setActivity] = useState<Activity | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    const load = async () => {
      if (!activityId) {
        setError('Activity ID missing in route.')
        setLoading(false)
        return
      }
      try {
        setLoading(true)
        const data = await apiClient.getActivity(activityId)
        if (!active) return
        setActivity(data)
        setError(null)
      } catch (err) {
        if (!active) return
        setError(err instanceof Error ? err.message : 'Unable to load that activity.')
        setActivity(null)
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }
    load()
    return () => {
      active = false
    }
  }, [activityId])

  if (loading) {
    return (
      <div className="activity-detail">
        <p className="empty-state">Loading activity…</p>
      </div>
    )
  }

  if (error || !activity) {
    return (
      <div className="activity-detail">
        <p className="empty-state">{error || 'We could not find that activity.'}</p>
        <Link to="/activities" className="link-button">
          Back to activities
        </Link>
      </div>
    )
  }

  return (
    <article className="activity-detail">
      <Link to="/activities" className="back-link">
        ← Back to activities
      </Link>
      <header>
        <p className="eyebrow">{activity.subject} • {activity.gradeBand}</p>
        <h1>{activity.title}</h1>
        <p className="lead">{activity.summary}</p>
        <TagList tags={activity.tags} />
        <div className="meta-grid">
          <div>
            <span className="meta-label">Duration</span>
            <strong>{activity.duration}</strong>
          </div>
          <div>
            <span className="meta-label">Focus</span>
            <strong>{activity.subject}</strong>
          </div>
        </div>
      </header>

      <div className="detail-layout">
        <div className="detail-layout__main">
          <section>
            <h2>Overview</h2>
            <p>{activity.description}</p>
          </section>
          <section>
            <h2>Steps</h2>
            <ol>
              {activity.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </section>
        </div>
        <aside className="detail-layout__aside">
          <figure>
            <img src={activity.imageUrl} alt={activity.title} loading="lazy" />
          </figure>
          <section>
            <h3>Objectives</h3>
            <ul>
              {activity.objectives.map((objective) => (
                <li key={objective}>{objective}</li>
              ))}
            </ul>
          </section>
          <section>
            <h3>Materials</h3>
            <ul>
              {activity.materials.map((material) => (
                <li key={material}>{material}</li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </article>
  )
}
