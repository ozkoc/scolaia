import type {
  Activity,
  CommunityTopic,
  Event,
  PartnerResource,
  TeacherProfile,
} from '../types/content'
import { filterCollection } from './search'

export interface SearchResultItem {
  id: string
  title: string
  description?: string
  meta?: string
  tags?: string[]
  href?: string
  external?: boolean
  actionLabel?: string
}

export interface SearchResultGroup {
  id: string
  label: string
  results: SearchResultItem[]
}

interface BuildGlobalSearchArgs {
  query: string
  events: Event[]
  activities: Activity[]
  communityTopics: CommunityTopic[]
  partners: PartnerResource[]
  profiles: TeacherProfile[]
}

const formatDateRange = (startIso: string, endIso?: string) => {
  if (!startIso) return undefined
  const start = new Date(startIso)
  if (Number.isNaN(start.getTime())) return undefined
  const formatter = new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
  const startLabel = formatter.format(start)
  if (!endIso) return startLabel
  const end = new Date(endIso)
  if (Number.isNaN(end.getTime())) return startLabel
  const sameDay = start.toDateString() === end.toDateString()
  const endLabel = sameDay
    ? new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).format(end)
    : formatter.format(end)
  return `${startLabel} – ${endLabel}`
}

export const buildGlobalSearchResults = ({
  query,
  events,
  activities,
  communityTopics,
  partners,
  profiles,
}: BuildGlobalSearchArgs): SearchResultGroup[] => {
  const trimmed = query.trim()
  if (!trimmed) return []

  const groups: SearchResultGroup[] = []

  const addGroup = (group: SearchResultGroup) => {
    if (group.results.length) {
      groups.push(group)
    }
  }

  addGroup({
    id: 'events',
    label: 'Events & Live Sessions',
    results: filterCollection(events, trimmed).map((event) => ({
      id: event.id,
      title: event.title,
      description: event.description,
      meta: `${event.mode.toUpperCase()} · ${formatDateRange(event.startTime, event.endTime) ?? ''}`.trim(),
      tags: event.focusAreas,
      href: `/events/${event.id}`,
      actionLabel: 'View event details',
    })),
  })

  addGroup({
    id: 'activities',
    label: 'Activities & Routines',
    results: filterCollection(activities, trimmed).map((activity) => ({
      id: activity.id,
      title: activity.title,
      description: activity.summary,
      meta: `${activity.gradeBand} · ${activity.subject}`,
      tags: activity.tags,
      href: `/activities/${activity.id}`,
      actionLabel: 'View activity',
    })),
  })

  addGroup({
    id: 'community',
    label: 'Community Discussions',
    results: filterCollection(communityTopics, trimmed).map((topic) => ({
      id: topic.id,
      title: topic.title,
      description: topic.summary,
      tags: topic.tags,
      href: topic.url,
      external: true,
      actionLabel: 'Open discussion',
    })),
  })

  addGroup({
    id: 'partners',
    label: 'Partner Tools & Resources',
    results: filterCollection(partners, trimmed).map((resource) => ({
      id: resource.id,
      title: resource.name,
      description: resource.description,
      meta: resource.focus,
      href: resource.url,
      external: true,
      actionLabel: 'Visit resource',
    })),
  })

  addGroup({
    id: 'profiles',
    label: 'Teacher Community Profiles',
    results: filterCollection(profiles, trimmed).map((profile) => ({
      id: profile.id,
      title: profile.name,
      description: profile.bio,
      meta: `${profile.role} · ${profile.school}`,
      tags: profile.expertise,
    })),
  })

  return groups
}
