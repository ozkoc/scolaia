import type {
  Activity,
  CommunityDiscussion,
  CommunityTopic,
  PartnerResource,
  TeacherProfile,
} from '../types/content'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000/api'

const toJson = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const body = await response.text()
    throw new Error(body || `Request failed (${response.status})`)
  }
  return (await response.json()) as T
}

const buildUrl = (path: string) => `${API_BASE_URL}${path}`

const request = async <T>(path: string, init?: RequestInit) => {
  const response = await fetch(buildUrl(path), init)
  return toJson<T>(response)
}

export const apiClient = {
  getActivities(): Promise<Activity[]> {
    return request('/activities')
  },
  getActivity(id: string): Promise<Activity> {
    return request(`/activities/${id}`)
  },
  getCommunityTopics(): Promise<CommunityTopic[]> {
    return request('/community/topics')
  },
  getPartnerResources(): Promise<PartnerResource[]> {
    return request('/partners')
  },
  getCommunityDiscussion(id: string): Promise<CommunityDiscussion> {
    return request(`/community/topics/${id}/discussion`)
  },
  getTeacherProfiles(): Promise<TeacherProfile[]> {
    return request('/community/profiles')
  },
  async sendChat(prompt: string): Promise<string> {
    const data = await request<{ content: string }>('/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    })
    return data.content
  },
}
