import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { createAssistantMessage, createUserMessage, defaultAssistantMessage } from '../data/chat'
import type {
  Activity,
  ChatMessage,
  CommunityDiscussion,
  CommunityTopic,
  PartnerResource,
  TeacherProfile,
} from '../types/content'
import { SearchBar } from '../components/SearchBar'
import { Section } from '../components/Section'
import { ActivityCard } from '../components/ActivityCard'
import { CommunityCard } from '../components/CommunityCard'
import { PartnerLinkCard } from '../components/PartnerLinkCard'
import { AskiaChatPanel } from '../components/AskiaChatPanel'
import { CommunityDiscussionPanel } from '../components/CommunityDiscussionPanel'
import { TeacherProfileCard } from '../components/TeacherProfileCard'
import { filterCollection } from '../utils/search'
import { apiClient } from '../services/api'

export const LandingPage = () => {
  const [activities, setActivities] = useState<Activity[]>([])
  const [communityTopics, setCommunityTopics] = useState<CommunityTopic[]>([])
  const [partners, setPartners] = useState<PartnerResource[]>([])
  const [profiles, setProfiles] = useState<TeacherProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [performedQuery, setPerformedQuery] = useState('')
  const [isChatOpen, setChatOpen] = useState(false)
  const [isSendingChat, setIsSendingChat] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    createAssistantMessage(defaultAssistantMessage),
  ])
  const [selectedTopic, setSelectedTopic] = useState<CommunityTopic | null>(null)
  const [discussion, setDiscussion] = useState<CommunityDiscussion | null>(null)
  const [discussionLoading, setDiscussionLoading] = useState(false)
  const [discussionError, setDiscussionError] = useState<string | null>(null)
  const [discussionReloadKey, setDiscussionReloadKey] = useState(0)

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        setLoading(true)
        const [activitiesData, topicData, partnerData, profileData] = await Promise.all([
          apiClient.getActivities(),
          apiClient.getCommunityTopics(),
          apiClient.getPartnerResources(),
          apiClient.getTeacherProfiles(),
        ])
        if (!active) return
        setActivities(activitiesData)
        setCommunityTopics(topicData)
        setPartners(partnerData)
        setProfiles(profileData)
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

  useEffect(() => {
    if (!selectedTopic) return
    let active = true
    const loadDiscussion = async () => {
      try {
        setDiscussionLoading(true)
        setDiscussionError(null)
        setDiscussion(null)
        const data = await apiClient.getCommunityDiscussion(selectedTopic.id)
        if (!active) return
        setDiscussion(data)
      } catch (err) {
        if (!active) return
        setDiscussionError(
          err instanceof Error ? err.message : 'Unable to load the discussion right now.',
        )
      } finally {
        if (active) {
          setDiscussionLoading(false)
        }
      }
    }
    loadDiscussion()
    return () => {
      active = false
    }
  }, [selectedTopic, discussionReloadKey])

  const filteredActivities = useMemo(
    () => filterCollection(activities, performedQuery),
    [activities, performedQuery],
  )
  const filteredTopics = useMemo(
    () => filterCollection(communityTopics, performedQuery),
    [communityTopics, performedQuery],
  )
  const filteredPartners = useMemo(
    () => filterCollection(partners, performedQuery),
    [partners, performedQuery],
  )
  const filteredProfiles = useMemo(
    () => filterCollection(profiles, performedQuery),
    [profiles, performedQuery],
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

  const handleOpenDiscussion = (topic: CommunityTopic) => {
    setSelectedTopic(topic)
  }

  const handleCloseDiscussion = () => {
    setSelectedTopic(null)
    setDiscussion(null)
    setDiscussionError(null)
  }

  const handleRetryDiscussion = () => {
    if (!selectedTopic) return
    setDiscussionReloadKey((prev) => prev + 1)
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

      <Section title="Community Conversations" description="See how other educators are iterating in public.">
        {renderCollection(filteredTopics, () => (
          <div className="stack stack-md">
            {filteredTopics.map((topic) => (
              <CommunityCard key={topic.id} topic={topic} onSelect={handleOpenDiscussion} />
            ))}
          </div>
        ))}
      </Section>

      <Section
        title="Community Educators"
        description="Profiles of the coaches and teachers fueling these discussions."
      >
        {renderCollection(filteredProfiles, () => (
          <div className="grid grid-profiles">
            {filteredProfiles.map((profile) => (
              <TeacherProfileCard key={profile.id} profile={profile} />
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

      <CommunityDiscussionPanel
        isOpen={Boolean(selectedTopic)}
        topic={selectedTopic}
        discussion={discussion}
        profiles={profiles}
        isLoading={discussionLoading}
        error={discussionError}
        onClose={handleCloseDiscussion}
        onRetry={handleRetryDiscussion}
      />
    </div>
  )
}
