import { Link } from 'react-router-dom'
import type { SearchResultGroup } from '../utils/globalSearch'

interface SearchResultsOverlayProps {
  isOpen: boolean
  query: string
  groups: SearchResultGroup[]
  onClose: () => void
  isLoading: boolean
  dataError?: string | null
}

export const SearchResultsOverlay = ({
  isOpen,
  query,
  groups,
  onClose,
  isLoading,
  dataError,
}: SearchResultsOverlayProps) => {
  if (!isOpen) return null

  const hasResults = groups.length > 0

  const renderAction = (href?: string, label?: string, external?: boolean) => {
    if (!href) return null
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="search-result-card__action"
          onClick={onClose}
        >
          {label ?? 'Open link'}
        </a>
      )
    }
    return (
      <Link to={href} className="search-result-card__action" onClick={onClose}>
        {label ?? 'View details'}
      </Link>
    )
  }

  return (
    <div className="search-overlay" role="dialog" aria-modal="true" aria-label={`Search results for ${query}`}>
      <div className="search-overlay__backdrop" onClick={onClose} />
      <div className="search-overlay__panel">
        <header className="search-overlay__header">
          <div>
            <p className="eyebrow">Search results</p>
            <h2>Matches for "{query}"</h2>
            {dataError && <p className="search-overlay__error">{dataError}</p>}
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close search results">
            ×
          </button>
        </header>
        <div className="search-overlay__body">
          {isLoading && <p className="empty-state">Collecting content from across Scolaia…</p>}
          {!isLoading && !hasResults && (
            <p className="empty-state">No matches for "{query}" yet. Try another keyword.</p>
          )}
          {!isLoading && hasResults && (
            <div className="search-results">
              {groups.map((group) => (
                <article key={group.id} className="search-results__group">
                  <header>
                    <h3>{group.label}</h3>
                    <span className="search-results__count">{group.results.length}</span>
                  </header>
                  <ul>
                    {group.results.map((result) => (
                      <li key={result.id} className="search-result-card">
                        <div>
                          <p className="search-result-card__title">{result.title}</p>
                          {result.meta && <p className="search-result-card__meta">{result.meta}</p>}
                          {result.description && (
                            <p className="search-result-card__description">{result.description}</p>
                          )}
                          {result.tags && result.tags.length > 0 && (
                            <ul className="tag-list">
                              {result.tags.map((tag) => (
                                <li key={tag}>{tag}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                        {renderAction(result.href, result.actionLabel, result.external)}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
