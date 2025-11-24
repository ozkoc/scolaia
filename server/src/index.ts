import './config.js'
import express from 'express'
import cors from 'cors'

import { activities } from './data/activities.js'
import { communityTopics } from './data/communityTopics.js'
import { partnerResources } from './data/partnerResources.js'
import { communityDiscussions } from './data/communityDiscussions.js'
import { teacherProfiles } from './data/teacherProfiles.js'
import { events } from './data/events.js'
import { teacherStageTalks } from './data/teacherOnStage.js'
import { buildChatResponseAsync } from './services/chat.js'


import type {
  Activity,
  ChatRequest,
  ChatResponse,
  CommunityDiscussion,
  CommunityTopic,
  PartnerResource,
  TeacherProfile,
  Event,
} from './types.js'

const PORT = Number(process.env.PORT) || 4000
const API_PREFIX = process.env.API_PREFIX || '/api'

const app = express()

app.use(cors())
app.use(express.json())

// Küçük helper: tüm route'lara /api prefix ekliyoruz
const withPrefix = (path: string) => `${API_PREFIX}${path}`

// Health check
app.get(withPrefix('/health'), (_req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() })
})

/**
 * ACTIVITIES
 */
app.get(withPrefix('/activities'), (_req, res) => {
  res.json(activities as Activity[])
})

app.get(withPrefix('/activities/:id'), (req, res) => {
  const activity = (activities as Activity[]).find((a) => a.id === req.params.id)
  if (!activity) {
    res.status(404).json({ message: 'Activity not found' })
    return
  }
  res.json(activity)
})

/**
 * COMMUNITY TOPICS & DISCUSSIONS
 */
app.get(withPrefix('/community/topics'), (_req, res) => {
  res.json(communityTopics as CommunityTopic[])
})

app.get(withPrefix('/community/topics/:id/discussion'), (req, res) => {
  const topicId = req.params.id
  const discussion = (communityDiscussions as CommunityDiscussion[]).find(
    (d) => d.topicId === topicId,
  )
  if (!discussion) {
    res.status(404).json({ message: 'Discussion not found' })
    return
  }
  res.json(discussion)
})

/**
 * COMMUNITY PROFILES
 */
app.get(withPrefix('/community/profiles'), (_req, res) => {
  res.json(teacherProfiles as TeacherProfile[])
})

/**
 * PARTNER RESOURCES
 */
app.get(withPrefix('/partners'), (_req, res) => {
  res.json(partnerResources as PartnerResource[])
})

/**
 * EVENTS
 */
app.get(withPrefix('/events'), (_req, res) => {
  res.json(events as Event[])
})

app.get(withPrefix('/events/:id'), (req, res) => {
  const event = (events as Event[]).find((e) => e.id === req.params.id)
  if (!event) {
    res.status(404).json({ message: 'Event not found' })
    return
  }
  res.json(event)
})

/**
 * TEACHER ON STAGE TALKS
 */
app.get(withPrefix('/teacher-stage'), (_req, res) => {
  res.json(teacherStageTalks)
})

/**
 * ASK ASKIA CHAT
 */
app.post(withPrefix('/chat'), async (req, res) => {
  try {
    const chatRequest = req.body as ChatRequest
    const result = await buildChatResponseAsync(chatRequest.messages)
    res.json(result)
  } catch (e) {
    console.error("Chat error:", e)
    res.status(500).json({
      message:
        "Scolaia AI konnte gerade keine Antwort generieren. Bitte versuchen Sie es später erneut.",
    })
  }
})

/**
 * FALLBACK 404
 */
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.path} not found` })
})

app.listen(PORT, () => {
  console.log(`API ready on http://localhost:${PORT}${API_PREFIX}`)
})
