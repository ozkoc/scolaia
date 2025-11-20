import type { PartnerResource } from '../types/content'

interface PartnerLinkCardProps {
  resource: PartnerResource
}

export const PartnerLinkCard = ({ resource }: PartnerLinkCardProps) => (
  <article className="card partner-card">
    <div className="card__body">
      <h3>{resource.name}</h3>
      <p>{resource.description}</p>
      <span className="partner-card__focus">Focus: {resource.focus}</span>
    </div>
    <a className="link-button" href={resource.url} target="_blank" rel="noreferrer">
      Visit resource
    </a>
  </article>
)
