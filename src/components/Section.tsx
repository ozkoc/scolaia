import type { PropsWithChildren, ReactNode } from 'react'

interface SectionProps extends PropsWithChildren {
  title: ReactNode
  description?: ReactNode
  actions?: ReactNode
  id?: string
  className?: string
}

export const Section = ({ title, description, actions, id, className, children }: SectionProps) => (
  <section className={['content-section', className].filter(Boolean).join(' ')} id={id}>
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
