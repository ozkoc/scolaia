import { useMemo } from 'react'
import type { CommunityDiscussion, CommunityTopic, TeacherProfile } from '../types/content'

interface CommunityDiscussionPanelProps {
  isOpen: boolean
  topic: CommunityTopic | null
  discussion: CommunityDiscussion | null
  profiles: TeacherProfile[]
  isLoading: boolean
  error: string | null
  onClose: () => void
  onRetry: () => void
}

export const CommunityDiscussionPanel = ({
  isOpen,
  topic,
  discussion,
  profiles,
  isLoading,
  error,
  onClose,
  onRetry,
}: CommunityDiscussionPanelProps) => {
  const profileLookup = useMemo(() => {
    return profiles.reduce<Record<string, TeacherProfile>>((acc, profile) => {
      acc[profile.id] = profile
      return acc
    }, {})
  }, [profiles])

  if (!isOpen || !topic) return null

  const renderBody = () => {
    if (isLoading) {
      return <p className="discussion-empty">Loading thread…</p>
    }

    if (error) {
      return (
        <div className="discussion-empty">
          <p>{error}</p>
          <button className="link-button" onClick={onRetry}>
            Try again
          </button>
        </div>
      )
    }

    if (!discussion || discussion.messages.length === 0) {
      return <p className="discussion-empty">No conversation yet. Be the first to drop a reflection.</p>
    }

    return (
      <ul className="discussion-log">
        {discussion.messages.map((message) => {
          const profile = message.authorProfileId ? profileLookup[message.authorProfileId] : undefined
          return (
            <li key={message.id} className={`discussion-log__item discussion-log__item--${message.authorRole}`}>
              <header>
                <div>
                  <strong>{profile?.name ?? message.authorName}</strong>
                  <span>
                    {profile ? `${profile.role} • ${profile.school}` : message.authorRole === 'askia' ? 'Askia AI Coach' : message.authorRole}
                  </span>
                </div>
                <time>{new Date(message.timestamp).toLocaleString()}</time>
              </header>
              <p>{message.content}</p>
              {profile && (
                <footer>
                  <span>{profile.location}</span>
                  <span>▲ {message.upvotes} upvotes</span>
                </footer>
              )}
              {!profile && (
                <footer>
                  <span>▲ {message.upvotes} upvotes</span>
                </footer>
              )}
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <div
      className="discussion-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`Community discussion for ${topic.title}`}
    >
      <div className="discussion-panel">
        <header className="discussion-panel__header">
          <div>
            <p className="eyebrow">Community conversation</p>
            <h3>{topic.title}</h3>
            {discussion?.guidingPrompt ? (
              <p className="discussion-prompt">{discussion.guidingPrompt}</p>
            ) : (
              <p className="discussion-prompt">Tap into how teachers are iterating on this idea.</p>
            )}
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close discussion">
            ×
          </button>
        </header>
        <div className="discussion-panel__summary">
          <p>{discussion?.summary ?? topic.summary}</p>
        </div>
        <div className="discussion-panel__body">{renderBody()}</div>
      </div>
    </div>
  )
}
