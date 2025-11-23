import { HfInference } from '@huggingface/inference'
import type { ChatResponse } from '../types.js'

// Hugging Face Configuration
const HF_TOKEN = process.env.HF_TOKEN
const hf = HF_TOKEN ? new HfInference(HF_TOKEN) : null

// Using a multilingual model good for German and English
const MODEL_NAME = 'mistralai/Mistral-7B-Instruct-v0.2'

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

const buildFallbackResponse = (prompt: string): ChatResponse => {
  const suggestions = pickStrategies(3)
  const content = [
    `Danke für deinen Impuls: "${prompt || 'deine aktuelle Frage'}". Hier sind drei schnelle Ideen für deine Planung:`,
    suggestions.map((idea, index) => `${index + 1}. ${idea}`).join('\n'),
    'Wenn du genauer beschreibst, welche Lerngruppe oder welches Fach betroffen ist, kann Askia noch präziser antworten.',
  ].join('\n\n')

  return {
    id: `askia-fallback-${Date.now()}`,
    content,
  }
}

export async function buildChatResponseAsync(prompt: string): Promise<ChatResponse> {
  if (!HF_TOKEN || !hf) {
    console.warn('HF_TOKEN not configured, using fallback responses')
    return buildFallbackResponse(prompt)
  }

  const systemPrompt = `You are Askia, an AI planning assistant for teachers in Germany. 
You help teachers with lesson planning, classroom management, and educational strategies.
Always provide practical, structured, classroom-ready suggestions.
Respond in the same language as the user's question (German or English).
Keep responses concise and actionable (max 300 words).`

  const fullPrompt = `${systemPrompt}\n\nTeacher's question: ${prompt}\n\nYour response:`

  try {
    const response = await hf.textGeneration({
      model: MODEL_NAME,
      inputs: fullPrompt,
      parameters: {
        max_new_tokens: 500,
        temperature: 0.7,
        top_p: 0.9,
        return_full_text: false,
      },
    })

    const text = response.generated_text?.trim()
    
    if (!text || text.length < 20) {
      console.warn('HF response too short, using fallback')
      return buildFallbackResponse(prompt)
    }

    return {
      id: `askia-${Date.now()}`,
      content: text,
    }
  } catch (error) {
    console.error('Hugging Face API error:', error)
    return buildFallbackResponse(prompt)
  }
}
