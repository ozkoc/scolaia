import { useEffect, useState } from 'react'
import { apiClient } from '../services/api'
import type { CommunityTopic, CommunityDiscussion, TeacherProfile } from '../types/content'
import { Section } from '../components/Section'
import { CommunityCard } from '../components/CommunityCard'
import { TeacherProfileCard } from '../components/TeacherProfileCard'
import { CommunityDiscussionPanel } from '../components/CommunityDiscussionPanel'

export const TeachersHubPage = () => {
  const [topics, setTopics] = useState<CommunityTopic[]>([])
  const [profiles, setProfiles] = useState<TeacherProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
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
        const [topicData, profileData] = await Promise.all([
          apiClient.getCommunityTopics(),
          apiClient.getTeacherProfiles(),
        ])
        if (!active) return
        setTopics(topicData)
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

  if (loading) return <div className="page-container"><p>Loading Teachers Hub...</p></div>
  if (error) return <div className="page-container"><p>{error}</p></div>

  return (
    <div className="page-container">
      <Section
        title="Teachers Hub"
        description="See how other educators are iterating in public."
        className="content-section--wide teachers-hub-section"
      >
        <div className="stack stack-md">
          {topics.map((topic) => (
            <CommunityCard key={topic.id} topic={topic} onSelect={handleOpenDiscussion} />
          ))}
        </div>
      </Section>

      <Section
        title="Community Educators"
        description="Profiles of the coaches and teachers fueling these discussions."
      >
        <div className="grid grid-profiles">
          {profiles.map((profile) => (
            <TeacherProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      </Section>

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
