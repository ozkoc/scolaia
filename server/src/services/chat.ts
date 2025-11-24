import '../config.js'
import Groq from 'groq-sdk'
import type { ChatResponse } from '../types.js'

// Groq Configuration (Free tier: 30 req/min)
const GROQ_API_KEY = process.env.GROQ_API_KEY
const GROQ_MODEL = 'llama-3.3-70b-versatile' // Fast, multilingual, free
const groqClient = GROQ_API_KEY ? new Groq({ apiKey: GROQ_API_KEY }) : null

// Debug logging
console.log('🔑 GROQ_API_KEY loaded:', GROQ_API_KEY ? `Yes (${GROQ_API_KEY.substring(0, 10)}...)` : 'No')
console.log('🤖 Groq Client initialized:', groqClient ? 'Yes' : 'No')

const FALLBACK_STRATEGIES = [
  'Starte mit einer Mini-Retrospektive: Was lief bei der letzten Stunde gut, was wollen wir verbessern? Halte die Antworten sichtbar fest.',
  'Nutze ein 3-2-1 Exit Ticket (3 Erkenntnisse, 2 Fragen, 1 nächste Handlung) um gezielte Anschlussaufträge zu planen.',
  'Lass Schüler:innen ihre Vorgehensweise laut denken und von einem Peer protokollieren – daraus entsteht sofortiges Feedbackmaterial.',
  'Plane ein Mikro-Experiment: 10-Minuten-Stationen mit einem klaren Beobachtungsfokus, danach Blitz-Auswertung im Kreis.',
  'Arbeite mit Kompetenzspektrum-Karten, auf denen Lernende markieren, wo sie sich aktuell einordnen – das steuert deine Differenzierung.',
  'Verankere jede Strategie an einem konkreten Schüler-Zitat oder Beobachtungspunkt, um Wirkung regelmäßig zu prüfen.',
]

const pickStrategies = (count: number) =>
  [...FALLBACK_STRATEGIES].sort(() => Math.random() - 0.5).slice(0, count)

const buildFallbackResponse = (): ChatResponse => {
  const suggestions = pickStrategies(3)
  const reply = [
    `Here are three quick ideas for your planning:`,
    suggestions.map((idea, index) => `${index + 1}. ${idea}`).join('\n'),
    'If you describe more specifically which learning group or subject is affected, Scolaia AI can answer even more precisely.',
  ].join('\n\n')

  return {
    reply,
  }
}

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export async function buildChatResponseAsync(messages: ChatMessage[]): Promise<ChatResponse> {
  if (!groqClient) {
    console.log('⚠️ Groq Client not initialized, using fallback')
    return buildFallbackResponse()
  }

  try {
    const lastUserMessage = messages.filter(m => m.role === 'user').pop()?.content || ''
    
    // Detect language from the last user message
    const isEnglish = /[a-z]/i.test(lastUserMessage) && !/[äöüß]/i.test(lastUserMessage) && (
      lastUserMessage.toLowerCase().includes('how') ||
      lastUserMessage.toLowerCase().includes('what') ||
      lastUserMessage.toLowerCase().includes('can') ||
      lastUserMessage.toLowerCase().includes('improve') ||
      lastUserMessage.toLowerCase().includes('help') ||
      lastUserMessage.toLowerCase().includes('recommend') ||
      lastUserMessage.toLowerCase().includes('search')
    )

    console.log('🚀 Calling Groq API')
    console.log('🌍 Detected language:', isEnglish ? 'English' : 'German')
    
    const languageInstruction = isEnglish 
      ? 'IMPORTANT: The user is asking in ENGLISH. You MUST respond in ENGLISH only.' 
      : 'WICHTIG: Der Nutzer fragt auf DEUTSCH. Du MUSST auf DEUTSCH antworten.'
    
    const systemPrompt = `You are Scolaia AI, an AI assistant for the Scolaia educational platform in Germany. Provide helpful, concise, and actionable recommendations.

${languageInstruction}

Always respond in the SAME language as the user's question. If asked in English, answer in English. If asked in German, answer in German.

FORMATTING INSTRUCTIONS:
- Use **bold** (markdown format with double asterisks) for key sentences, important concepts, or emphasized words
- Bold the most important takeaways and action items
- Use bold to highlight specific terms, strategies, or recommendations`
    
    const response = await groqClient.chat.completions.create({
      model: GROQ_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages.map(m => ({ role: m.role, content: m.content }))
      ],
      max_tokens: 500,
      temperature: 0.7,
    })

    console.log('✅ Groq API response received')
    const text = response.choices?.[0]?.message?.content?.trim()
    if (text) {
      console.log('📝 Response length:', text.length)
      return {
        reply: text,
      }
    }
    console.log('⚠️ No text in response, falling back')
  } catch (error) {
    console.error('❌ Groq API failed:', error)
  }

  return buildFallbackResponse()
}
