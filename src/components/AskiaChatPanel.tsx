import { useState } from 'react'
import type { FormEvent } from 'react'
import type { ChatMessage } from '../types/content'

interface AskiaChatPanelProps {
  isOpen: boolean
  onClose: () => void
  messages: ChatMessage[]
  onSend: (input: string) => Promise<void> | void
  isSubmitting?: boolean
}

export const AskiaChatPanel = ({ isOpen, onClose, messages, onSend, isSubmitting = false }: AskiaChatPanelProps) => {
  const [input, setInput] = useState('')

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const value = input.trim()
    if (!value || isSubmitting) return
    try {
      await onSend(value)
    } finally {
      setInput('')
    }
  }

  const formatMessage = (content: string) => {
    // Split by double newlines for paragraphs, or numbered lists
    const paragraphs = content.split(/\n\n+/).filter(p => p.trim())
    
    return paragraphs.map((paragraph, idx) => {
      // Check if this is a numbered list or bullet points
      if (/^\d+\.|^[-•*]/.test(paragraph.trim())) {
        const lines = paragraph.split('\n').filter(l => l.trim())
        return (
          <div key={idx} style={{ marginBottom: '0.75rem' }}>
            {lines.map((line, lineIdx) => {
              // Process markdown-style bold text **text**
              const formattedLine = line.split(/(\*\*.*?\*\*)/).map((part, partIdx) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                  return <strong key={partIdx}>{part.slice(2, -2)}</strong>
                }
                return part
              })
              
              // Replace bullet points with green checkmark
              const lineWithCheckmark = line.trim().replace(/^[-•*]\s*/, '✓ ')
              
              return (
                <div key={lineIdx} style={{ marginBottom: '0.5rem' }}>
                  {line.trim().match(/^[-•*]\s*/) ? (
                    <>
                      <span style={{ color: '#22c55e', fontWeight: 'bold', marginRight: '0.5rem' }}>✓</span>
                      {formattedLine.map(part => typeof part === 'string' ? part.replace(/^[-•*]\s*/, '') : part)}
                    </>
                  ) : formattedLine}
                </div>
              )
            })}
          </div>
        )
      }
      
      // Process markdown-style bold text **text** in paragraphs
      const formattedParagraph = paragraph.split(/(\*\*.*?\*\*)/).map((part, partIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={partIdx}>{part.slice(2, -2)}</strong>
        }
        return part
      })
      
      return <p key={idx}>{formattedParagraph}</p>
    })
  }

  if (!isOpen) return null

  return (
    <div className="askia-overlay" role="dialog" aria-modal="true">
      <div className="askia-panel">
        <header>
          <h3>Scolaia AI</h3>
          <button className="icon-button" onClick={onClose} aria-label="Close chat">
            ×
          </button>
        </header>
        <div className="askia-panel__body">
          <ul className="chat-log">
            {messages.map((message) => (
              <li key={message.id} className={`chat-log__item chat-log__item--${message.role}`}>
                <span className="chat-log__role">{message.role === 'assistant' ? 'Scolaia AI' : 'You'}</span>
                <div className="chat-log__content">
                  {formatMessage(message.content)}
                </div>
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
            disabled={isSubmitting}
          />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending…' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  )
}
