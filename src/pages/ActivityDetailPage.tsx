import { Link, useParams } from 'react-router-dom'
import { activities } from '../data/activities'
import { TagList } from '../components/TagList'

export const ActivityDetailPage = () => {
  const { activityId } = useParams()
  const activity = activities.find((item) => item.id === activityId)

  if (!activity) {
    return (
      <div className="activity-detail">
        <p className="empty-state">We could not find that activity.</p>
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
