import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { createAssistantMessage, createUserMessage, defaultAssistantMessage } from '../data/chat'
import type {
  ChatMessage,
} from '../types/content'
import { SearchBar } from '../components/SearchBar'
import { AskiaChatPanel } from '../components/AskiaChatPanel'
import { apiClient } from '../services/api'
import { SearchResultsOverlay } from '../components/SearchResultsOverlay'
import { buildGlobalSearchResults } from '../utils/globalSearch'

export const LandingPage = () => {
  const [loading, setLoading] = useState(true)
  const [performedQuery, setPerformedQuery] = useState('')
  const [isChatOpen, setChatOpen] = useState(false)
  const [isSendingChat, setIsSendingChat] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    createAssistantMessage(defaultAssistantMessage),
  ])
  const [isSearchOverlayOpen, setSearchOverlayOpen] = useState(false)

  useEffect(() => {
    setLoading(false)
  }, [])

  const handleSearch = (value: string) => {
    setPerformedQuery(value)
    setSearchOverlayOpen(Boolean(value))
  }

  useEffect(() => {
    if (!isSearchOverlayOpen) return
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSearchOverlayOpen(false)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isSearchOverlayOpen])

  const handleSend = async (input: string) => {
    const trimmed = input.trim()
    if (!trimmed) return
    setMessages((prev) => [...prev, createUserMessage(trimmed)])
    try {
      setIsSendingChat(true)
      const content = await apiClient.sendChat(trimmed)
      setMessages((prev) => [...prev, createAssistantMessage(content)])
    } catch (err) {
      const fallback =
        err instanceof Error
          ? `I ran into an issue: ${err.message}. Please try again in a moment.`
          : 'Askia is unavailable at the moment. Please try again soon.'
      setMessages((prev) => [...prev, createAssistantMessage(fallback)])
    } finally {
      setIsSendingChat(false)
    }
  }

  const globalSearchGroups = useMemo(
    () =>
      buildGlobalSearchResults({
        query: performedQuery,
        events: [],
        activities: [],
        communityTopics: [],
        partners: [],
        profiles: [],
      }),
    [performedQuery],
  )

  const totalSearchMatches = globalSearchGroups.reduce((sum, group) => sum + group.results.length, 0)
  const overlayVisible = isSearchOverlayOpen && Boolean(performedQuery)

  return (
    <>
      <div className={`landing-page${overlayVisible ? ' landing-page--blurred' : ''}`}>
      <Link to="/work-shadowing" className="work-shadowing-banner">
        <p className="eyebrow">New Feature</p>
        <h1>Discover <span className="highlight-marker">Work Shadowing</span></h1>
        <p>
          Experience the classroom from a new perspective. Join our work shadowing program to observe and learn from peers.
        </p>
      </Link>

      <Link to="/teacher-on-stage" className="teacher-stage-banner">
        <p className="eyebrow">Live Events</p>
        <h1>Join Teacher on Stage</h1>
        <p>
          Participate in live classroom observations, seminars, and exchange formats without leaving your school.
        </p>
      </Link>

      <Link to="/activities" className="activities-banner">
        <p className="eyebrow">Curated Library</p>
        <h1>Spark Your Next Lesson</h1>
        <p>
          Stuck in a routine? Unlock our vault of high-impact activities and find the missing piece for your classroom.
        </p>
      </Link>

      <Link to="/teachers-hub" className="teachers-hub-banner">
        <p className="eyebrow">Community</p>
        <h1>Join the Teachers Hub</h1>
        <p>
          Collaborate, share insights, and grow together with a vibrant community of educators.
        </p>
      </Link>

      <Link to="/events" className="events-banner">
        <p className="eyebrow">Calendar</p>
        <h1>Upcoming Events</h1>
        <p>
          Don't miss out on workshops, webinars, and community gatherings.
        </p>
      </Link>

      <Link to="/partners" className="partners-banner">
        <p className="eyebrow">Resources</p>
        <h1>Partners & Tools</h1>
        <p>
          Discover trusted external tools and resources to enhance your teaching experience.
        </p>
      </Link>

      <section className="hero">
        <p className="eyebrow">For instructional coaches & classroom teachers</p>
        <h1>
          Plan richer learning moments with
          <span className="brand-highlight"> Scolaia.</span>
        </h1>
        <p>
          Describe a classroom challenge or methodology. We surface ready-to-run activities, discussions, and
          trusted partners so you can adapt fast.
        </p>
        <SearchBar
          label="Search teaching ideas"
          placeholder='Try "project-based learning" or "how to teach fractions"'
          onSearch={handleSearch}
          size="lg"
        />
        {performedQuery && (
          <button
            type="button"
            className="search-chip"
            onClick={() => setSearchOverlayOpen(true)}
          >
            {totalSearchMatches > 0
              ? `View ${totalSearchMatches} results for "${performedQuery}"`
              : 'View search results'}
          </button>
        )}
      </section>

      <section className="cta-panel">
        <div>
          <h2>Still need inspiration?</h2>
          <p>Loop in Askia, our planning assistant, for fresh strategies tailored to your prompt.</p>
        </div>
        <button className="primary" onClick={() => setChatOpen(true)}>
          Ask Askia – Ask the AI Assistant
        </button>
      </section>

      <AskiaChatPanel
        isOpen={isChatOpen}
        onClose={() => setChatOpen(false)}
        messages={messages}
        onSend={handleSend}
        isSubmitting={isSendingChat}
      />

      </div>
      <SearchResultsOverlay
        isOpen={overlayVisible}
        query={performedQuery}
        groups={globalSearchGroups}
        onClose={() => setSearchOverlayOpen(false)}
        isLoading={loading}
        dataError={null}
      />
    </>
  )
}
