import type { PropsWithChildren, ReactNode } from 'react'

interface SectionProps extends PropsWithChildren {
  title: string
  description?: ReactNode
  actions?: ReactNode
  id?: string
}

export const Section = ({ title, description, actions, id, children }: SectionProps) => (
  <section className="content-section" id={id}>
    <header className="content-section__header">
      <div>
        <h2>{title}</h2>
        {description && <p className="content-section__description">{description}</p>}
      </div>
      {actions && <div className="content-section__actions">{actions}</div>}
    </header>
    <div className="content-section__body">{children}</div>
  </section>
)
