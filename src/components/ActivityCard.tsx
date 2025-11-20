import { Link } from 'react-router-dom'
import type { Activity } from '../types/content'
import { TagList } from './TagList'

interface ActivityCardProps {
  activity: Activity
  variant?: 'compact' | 'detailed'
}

export const ActivityCard = ({ activity, variant = 'compact' }: ActivityCardProps) => (
  <article className={`card activity-card activity-card-${variant}`}>
    <div className="activity-card__media">
      <img src={activity.imageUrl} alt={activity.title} loading="lazy" />
    </div>
    <div className="activity-card__content">
      <div className="activity-card__meta">
        <span>{activity.gradeBand}</span>
        <span>•</span>
        <span>{activity.subject}</span>
        <span>•</span>
        <span>{activity.duration}</span>
      </div>
      <h3>{activity.title}</h3>
      <p>{variant === 'compact' ? activity.summary : activity.description}</p>
      <TagList tags={activity.tags} />
      <div className="activity-card__actions">
        <Link to={`/activities/${activity.id}`} className="link-button">
          View activity details
        </Link>
      </div>
    </div>
  </article>
)
