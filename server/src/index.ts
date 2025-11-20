import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { activities } from './data/activities.js'
import { blogPosts } from './data/blogPosts.js'
import { partnerResources } from './data/partnerResources.js'
import { buildChatResponse } from './services/chat.js'
import type { Activity, ChatRequest } from './types.js'

const PORT = Number(process.env.PORT) || 4000
const API_PREFIX = process.env.API_PREFIX || '/api'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() })
})

app.get(`${API_PREFIX}/activities`, (_req, res) => {
  res.json(activities)
})

app.get(`${API_PREFIX}/activities/:id`, (req, res) => {
  const activity = activities.find((item: Activity) => item.id === req.params.id)
  if (!activity) {
    res.status(404).json({ message: 'Activity not found' })
    return
  }
  res.json(activity)
})

app.get(`${API_PREFIX}/blog-posts`, (_req, res) => {
  res.json(blogPosts)
})

app.get(`${API_PREFIX}/partners`, (_req, res) => {
  res.json(partnerResources)
})

app.post(`${API_PREFIX}/chat`, (req, res) => {
  const body = req.body as ChatRequest | undefined
  const prompt = body?.prompt?.trim()
  if (!prompt) {
    res.status(400).json({ message: 'Prompt is required' })
    return
  }
  const result = buildChatResponse(prompt)
  res.json(result)
})

app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.path} not found` })
})

app.listen(PORT, () => {
  console.log(`API ready on http://localhost:${PORT}${API_PREFIX}`)
})
