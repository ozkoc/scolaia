import { useState } from 'react'
import type { FormEvent } from 'react'
import type { ChatMessage } from '../types/content'

interface AskiaChatPanelProps {
  isOpen: boolean
  onClose: () => void
  messages: ChatMessage[]
  onSend: (input: string) => void
}

export const AskiaChatPanel = ({ isOpen, onClose, messages, onSend }: AskiaChatPanelProps) => {
  const [input, setInput] = useState('')

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!input.trim()) return
    onSend(input.trim())
    setInput('')
  }

  if (!isOpen) return null

  return (
    <div className="askia-overlay" role="dialog" aria-modal="true">
      <div className="askia-panel">
        <header>
          <h3>Ask Askia</h3>
          <button className="icon-button" onClick={onClose} aria-label="Close chat">
            ×
          </button>
        </header>
        <div className="askia-panel__body">
          <ul className="chat-log">
            {messages.map((message) => (
              <li key={message.id} className={`chat-log__item chat-log__item--${message.role}`}>
                <span className="chat-log__role">{message.role === 'assistant' ? 'Askia' : 'You'}</span>
                <p>{message.content}</p>
                <time>{new Date(message.timestamp).toLocaleTimeString()}</time>
              </li>
            ))}
          </ul>
        </div>
        <form className="askia-panel__input" onSubmit={handleSubmit}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a follow-up question"
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  )
}
