import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { createAssistantMessage, createUserMessage, defaultAssistantMessage } from '../data/chat'
import type { Activity, BlogPost, ChatMessage, PartnerResource } from '../types/content'
import { SearchBar } from '../components/SearchBar'
import { Section } from '../components/Section'
import { ActivityCard } from '../components/ActivityCard'
import { BlogCard } from '../components/BlogCard'
import { PartnerLinkCard } from '../components/PartnerLinkCard'
import { AskiaChatPanel } from '../components/AskiaChatPanel'
import { filterCollection } from '../utils/search'
import { apiClient } from '../services/api'

export const LandingPage = () => {
  const [activities, setActivities] = useState<Activity[]>([])
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [partners, setPartners] = useState<PartnerResource[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [performedQuery, setPerformedQuery] = useState('')
  const [isChatOpen, setChatOpen] = useState(false)
  const [isSendingChat, setIsSendingChat] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    createAssistantMessage(defaultAssistantMessage),
  ])

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        setLoading(true)
        const [activitiesData, blogData, partnerData] = await Promise.all([
          apiClient.getActivities(),
          apiClient.getBlogPosts(),
          apiClient.getPartnerResources(),
        ])
        if (!active) return
        setActivities(activitiesData)
        setBlogs(blogData)
        setPartners(partnerData)
        setError(null)
      } catch (err) {
        if (!active) return
        setError(err instanceof Error ? err.message : 'Unable to load content right now.')
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }
    load()
    return () => {
      active = false
    }
  }, [])

  const filteredActivities = useMemo(
    () => filterCollection(activities, performedQuery),
    [activities, performedQuery],
  )
  const filteredBlogs = useMemo(
    () => filterCollection(blogs, performedQuery),
    [blogs, performedQuery],
  )
  const filteredPartners = useMemo(
    () => filterCollection(partners, performedQuery),
    [partners, performedQuery],
  )

  const handleSearch = (value: string) => {
    setPerformedQuery(value)
  }

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

  const emptyStateMessage = performedQuery
    ? `No matches for "${performedQuery}". Try another keyword.`
    : 'Use the search bar above to focus results.'

  const renderCollection = <T,>(items: T[], render: () => ReactNode) => {
    if (loading) return <p className="empty-state">Loading curated results…</p>
    if (error) return <p className="empty-state">{error}</p>
    return items.length ? render() : <p className="empty-state">{emptyStateMessage}</p>
  }

  return (
    <div className="landing-page">
      <section className="hero">
        <p className="eyebrow">For instructional coaches & classroom teachers</p>
        <h1>Plan richer learning moments with Askia.</h1>
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
        {performedQuery && <span className="search-chip">Showing matches for "{performedQuery}".</span>}
      </section>

      <Section
        title="Suggested Activities"
        description="High-impact routines and projects from the Askia library."
      >
        {renderCollection(filteredActivities, () => (
          <div className="grid grid-activities">
            {filteredActivities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        ))}
      </Section>

      <Section title="Related Blog Articles" description="Voices from our coach and teacher community.">
        {renderCollection(filteredBlogs, () => (
          <div className="stack stack-md">
            {filteredBlogs.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ))}
      </Section>

      <Section title="Partner Resources & External Links" description="External tools we trust and reference.">
        {renderCollection(filteredPartners, () => (
          <div className="stack stack-md">
            {filteredPartners.map((resource) => (
              <PartnerLinkCard key={resource.id} resource={resource} />
            ))}
          </div>
        ))}
      </Section>

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
  )
}
