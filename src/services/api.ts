import type {
  Activity,
  CommunityDiscussion,
  CommunityTopic,
  PartnerResource,
  TeacherProfile,
  Event,
  TeacherStageTalk,
} from '../types/content'

// Import local data directly to ensure content availability
import { activities } from '../data/activities'
import { communityTopics } from '../data/communityTopics'
import { partnerResources } from '../data/partnerResources'
import { teacherProfiles } from '../data/teacherProfiles'
import { events } from '../data/events'
import { communityDiscussions } from '../data/communityDiscussions'
import { teacherStageTalks } from '../data/teacherOnStage'

// Helper to simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const apiClient = {
  async getActivities(): Promise<Activity[]> {
    await delay(300)
    return activities
  },

  async getActivity(id: string): Promise<Activity> {
    await delay(200)
    const activity = activities.find((a) => a.id === id)
    if (!activity) throw new Error(`Activity not found: ${id}`)
    return activity
  },

  async getCommunityTopics(): Promise<CommunityTopic[]> {
    await delay(300)
    return communityTopics
  },

  async getCommunityDiscussion(id: string): Promise<CommunityDiscussion> {
    await delay(400)
    const discussion = communityDiscussions.find((d) => d.topicId === id)
    if (!discussion) throw new Error(`Discussion not found for topic: ${id}`)
    return discussion
  },

  async getTeacherProfiles(): Promise<TeacherProfile[]> {
    await delay(300)
    return teacherProfiles
  },

  async getPartnerResources(): Promise<PartnerResource[]> {
    await delay(200)
    return partnerResources
  },

  async getEvents(): Promise<Event[]> {
    await delay(300)
    return events
  },

  async getEvent(id: string): Promise<Event> {
    await delay(200)
    const event = events.find((e) => e.id === id)
    if (!event) throw new Error(`Event not found: ${id}`)
    return event
  },

  async sendChat(messages: Array<{ role: 'user' | 'assistant'; content: string }>): Promise<string> {
    try {
      // Use relative path for API calls - works in both dev (proxy) and production
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages }),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()
      return data.reply || 'No response from Scolaia AI.'
    } catch (error) {
      console.error('Chat API error:', error)
      // Fallback response if backend is unavailable
      return `I'm having trouble connecting right now. Please try again in a moment.`
    }
  },

  async getTeacherStageTalks(): Promise<TeacherStageTalk[]> {
    await delay(300)
    return teacherStageTalks
  },
}
