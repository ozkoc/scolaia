import { useMemo, useState } from 'react'
import { activities } from '../data/activities'
import { blogPosts } from '../data/blogPosts'
import { partnerResources } from '../data/partnerResources'
import { createAssistantMessage, createUserMessage } from '../data/chat'
import type { ChatMessage } from '../types/content'
import { SearchBar } from '../components/SearchBar'
import { Section } from '../components/Section'
import { ActivityCard } from '../components/ActivityCard'
import { BlogCard } from '../components/BlogCard'
import { PartnerLinkCard } from '../components/PartnerLinkCard'
import { AskiaChatPanel } from '../components/AskiaChatPanel'
import { filterCollection } from '../utils/search'

export const LandingPage = () => {
  const [performedQuery, setPerformedQuery] = useState('')
  const [isChatOpen, setChatOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    createAssistantMessage("today's planning focus"),
  ])

  const filteredActivities = useMemo(
    () => filterCollection(activities, performedQuery),
    [performedQuery],
  )
  const filteredBlogs = useMemo(
    () => filterCollection(blogPosts, performedQuery),
    [performedQuery],
  )
  const filteredPartners = useMemo(
    () => filterCollection(partnerResources, performedQuery),
    [performedQuery],
  )

  const handleSearch = (value: string) => {
    setPerformedQuery(value)
  }

  const handleSend = (input: string) => {
    setMessages((prev) => [...prev, createUserMessage(input), createAssistantMessage(input)])
  }

  const emptyStateMessage = performedQuery
    ? `No matches for "${performedQuery}". Try another keyword.`
    : 'Use the search bar above to focus results.'

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
        {filteredActivities.length ? (
          <div className="grid grid-activities">
            {filteredActivities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        ) : (
          <p className="empty-state">{emptyStateMessage}</p>
        )}
      </Section>

      <Section title="Related Blog Articles" description="Voices from our coach and teacher community.">
        {filteredBlogs.length ? (
          <div className="stack stack-md">
            {filteredBlogs.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="empty-state">{emptyStateMessage}</p>
        )}
      </Section>

      <Section title="Partner Resources & External Links" description="External tools we trust and reference.">
        {filteredPartners.length ? (
          <div className="stack stack-md">
            {filteredPartners.map((resource) => (
              <PartnerLinkCard key={resource.id} resource={resource} />
            ))}
          </div>
        ) : (
          <p className="empty-state">{emptyStateMessage}</p>
        )}
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
      />
    </div>
  )
}
