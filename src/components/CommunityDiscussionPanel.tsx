import { useMemo, useState, useEffect } from 'react'
import type { CommunityDiscussion, CommunityTopic, TeacherProfile } from '../types/content'
import { apiClient } from '../services/api'

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
  const [aiRecommendation, setAiRecommendation] = useState<string>('')
  const [aiLoading, setAiLoading] = useState(false)

  const profileLookup = useMemo(() => {
    return profiles.reduce<Record<string, TeacherProfile>>((acc, profile) => {
      acc[profile.id] = profile
      return acc
    }, {})
  }, [profiles])

  // Generate AI recommendation based on discussion
  useEffect(() => {
    if (!isOpen || !topic || !discussion || discussion.messages.length === 0) {
      setAiRecommendation('')
      return
    }

    const generateAiRecommendation = async () => {
      setAiLoading(true)
      try {
        // Build context from discussion messages
        const discussionContext = discussion.messages
          .map(msg => `${msg.authorName}: ${msg.content}`)
          .join('\n')

        const prompt = `As an AI Learning Partner for teachers, analyze this ongoing discussion about "${topic.title}":

Topic Summary: ${discussion.summary || topic.summary}

Discussion:
${discussionContext}

Based on this discussion, provide 2-3 alternative approaches or recommendations that could help teachers address this topic more effectively. Be practical, supportive, and suggest innovative methods. Keep your response concise and actionable.`

        const response = await apiClient.sendChat([{ role: 'user', content: prompt }])
        setAiRecommendation(response)
      } catch (err) {
        console.error('AI recommendation error:', err)
        setAiRecommendation('')
      } finally {
        setAiLoading(false)
      }
    }

    generateAiRecommendation()
  }, [isOpen, topic, discussion])

  const formatAiText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/)
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>
      }
      return part
    })
  }

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
                    {profile ? `${profile.role} • ${profile.school}` : message.authorRole === 'askia' ? 'Scolaia AI Coach' : message.authorRole}
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
        
        {/* AI Learning Partner Recommendation */}
        <li className="discussion-log__item discussion-log__item--askia ai-learning-partner">
          <header>
            <div>
              <strong>Scolaia AI</strong>
              <span>AI Learning Partner</span>
            </div>
          </header>
          <div className="ai-partner-content">
            {aiLoading ? (
              <p className="ai-loading">🤔 Analyzing discussion and generating recommendations...</p>
            ) : aiRecommendation ? (
              <div className="ai-recommendation-text">
                <p className="ai-intro">Based on this discussion, here are some alternative approaches you might consider:</p>
                <div className="ai-suggestions">{formatAiText(aiRecommendation)}</div>
              </div>
            ) : (
              <p className="ai-waiting">AI recommendations will appear once the discussion loads.</p>
            )}
          </div>
        </li>
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
