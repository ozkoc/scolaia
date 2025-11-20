import { activities } from '../data/activities.js'
import type { ChatResponse } from '../types.js'

const strategies = [
  'Layer a silent gallery walk before whole-group discussion to surface diverse ideas.',
  'Use color-coded sentence stems so students can easily vary their responses.',
  'Launch with a quick-write, then move into partner share to build confidence.',
  'Reserve the last five minutes for self-assessment using a micro-rubric.',
  'Invite students to co-create anchor charts that capture success criteria.',
]

const randomSlice = (items: string[], count: number) =>
  [...items].sort(() => Math.random() - 0.5).slice(0, count)

export const buildChatResponse = (prompt: string): ChatResponse => {
  const referencedActivity = activities[Math.floor(Math.random() * activities.length)]
  const picks = randomSlice(strategies, 3)
  const content = [
    `Thanks for sharing the prompt "${prompt || 'your latest challenge'}".`,
    'Here are a few classroom moves to try:',
    picks.map((line, index) => `${index + 1}. ${line}`).join('\n'),
    `Consider remixing ideas from our "${referencedActivity.title}" activity for an extended sequence.`,
  ].join('\n\n')

  return {
    id: `chat-${Date.now()}`,
    content,
  }
}
