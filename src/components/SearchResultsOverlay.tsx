import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
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
  const [aiRecommendation, setAiRecommendation] = useState<string>('')
  const [aiLoading, setAiLoading] = useState(false)
  const [showFullAi, setShowFullAi] = useState(false)

  const formatAiText = (text: string) => {
    // Split by **text** and render bold
    const parts = text.split(/(\*\*.*?\*\*)/)
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>
      }
      return part
    })
  }

  useEffect(() => {
    if (isOpen && query && !isLoading && groups.length > 0) {
      setAiLoading(true)
      fetch('http://localhost:4000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: `Based on the search query "${query}", provide a brief recommendation or insight about what the user might find helpful on our educational platform. Keep it concise and actionable (3-4 sentences).`,
            },
          ],
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setAiRecommendation(data.reply || '')
        })
        .catch(() => {
          setAiRecommendation('Unable to generate recommendations at this time.')
        })
        .finally(() => {
          setAiLoading(false)
        })
    }
  }, [isOpen, query, isLoading, groups.length])

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

  if (showFullAi) {
    return (
      <div className="search-overlay" role="dialog" aria-modal="true" aria-label="AI Recommendation">
        <div className="search-overlay__backdrop" onClick={() => setShowFullAi(false)} />
        <div className="search-overlay__panel">
          <header className="search-overlay__header">
            <div>
              <p className="eyebrow">AI Recommendation</p>
              <h2>Personalized Insights</h2>
            </div>
            <button className="icon-button" onClick={() => setShowFullAi(false)} aria-label="Close AI recommendation">
              ×
            </button>
          </header>
          <div className="search-overlay__body">
            <div className="ai-recommendation ai-recommendation--full">
              <p>{formatAiText(aiRecommendation)}</p>
            </div>
          </div>
        </div>
      </div>
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
                          <div className="search-result-card__title">
                            {result.title}
                            {result.tags && result.tags.length > 0 && (
                              <ul className="tag-list">
                                {result.tags.map((tag) => (
                                  <li key={tag}>{tag}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                          {result.meta && <p className="search-result-card__meta">{result.meta}</p>}
                          {result.description && (
                            <p className="search-result-card__description">{result.description}</p>
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
          {!isLoading && hasResults && (
            <div className="ai-recommendation-section">
              <div className="ai-recommendation-header">
                <span className="eyebrow">AI Powered</span>
                <h4>Personalized Recommendation</h4>
              </div>
              <div className="ai-recommendation">
                {aiLoading ? (
                  <p>Generating personalized insights...</p>
                ) : (
                  <>
                    <p className="ai-recommendation__preview">{formatAiText(aiRecommendation)}</p>
                    {aiRecommendation && (
                      <button className="ai-recommendation__more" onClick={() => setShowFullAi(true)}>
                        Show more
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
