import type { CommunityTopic } from '../types/content'
import { TagList } from './TagList'

interface CommunityCardProps {
  topic: CommunityTopic
  onSelect?: (topic: CommunityTopic) => void
}

export const CommunityCard = ({ topic, onSelect }: CommunityCardProps) => (
  <article className="card community-card">
    <div className="card__body">
      <h3>{topic.title}</h3>
      <p>{topic.summary}</p>
      <TagList tags={topic.tags} />
    </div>
    <button className="link-button" type="button" onClick={() => onSelect?.(topic)}>
      Open conversation
    </button>
  </article>
)
