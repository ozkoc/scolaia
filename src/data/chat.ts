import { activities } from './activities'
import type { ChatMessage } from '../types/content'

let counter = 0

const sampleStrategies = [
  'Try a gallery walk where students annotate prompts with sticky notes.',
  'Layer think-pair-share before group synthesis to elevate quieter voices.',
  'Co-create success criteria with the class before releasing independent work.',
  'Use a quick video or image hook to anchor prior knowledge.',
  'Plan a mini-conference round where you coach one group at a time.',
]

const getActivityReference = () => {
  const pick = activities[Math.floor(Math.random() * activities.length)]
  return pick.title
}

export const createAssistantMessage = (topic: string): ChatMessage => {
  counter += 1
  const strategies = sampleStrategies
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)
  const reference = getActivityReference()

  const content = [
    `Here is a quick summary of "${topic || 'your prompt'}": it centers on learner engagement, so let's mix structures that surface student thinking.`,
    'Suggested strategies:',
    strategies.map((s, idx) => `${idx + 1}. ${s}`).join('\n'),
    `You could remix ideas from our "${reference}" activity to extend this sequence.`,
  ].join('\n\n')

  return {
    id: `assistant-${counter}`,
    role: 'assistant',
    content,
    timestamp: new Date().toISOString(),
  }
}

export const createUserMessage = (content: string): ChatMessage => {
  counter += 1
  return {
    id: `user-${counter}`,
    role: 'user',
    content,
    timestamp: new Date().toISOString(),
  }
}
