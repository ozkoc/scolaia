import type { ChatMessage } from '../types/content'

let counter = 0

const buildMessage = (role: ChatMessage['role'], content: string): ChatMessage => {
  counter += 1
  return {
    id: `${role}-${counter}`,
    role,
    content,
    timestamp: new Date().toISOString(),
  }
}

export const createAssistantMessage = (content: string): ChatMessage => buildMessage('assistant', content)

export const createUserMessage = (content: string): ChatMessage => buildMessage('user', content)

export const defaultAssistantMessage =
  'Describe a classroom challenge and Scolaia AI will suggest a few strategies you can remix straight away.'
