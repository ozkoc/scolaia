import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime'
import { TextDecoder } from 'node:util'
import type { ChatResponse } from '../types.js'

const REGION = process.env.AWS_REGION || 'eu-central-1'
const MODEL_ID = process.env.BEDROCK_MODEL_ID || 'anthropic.claude-haiku-4-5-20251001-v1:0'
const HAS_BEDROCK_CONFIG = Boolean(process.env.AWS_REGION && process.env.BEDROCK_MODEL_ID)
const bedrockClient = HAS_BEDROCK_CONFIG ? new BedrockRuntimeClient({ region: REGION }) : null
const decoder = new TextDecoder('utf-8')

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
  if (!HAS_BEDROCK_CONFIG || !bedrockClient) {
    return buildFallbackResponse(prompt)
  }

  const body = {
    anthropic_version: 'bedrock-2023-05-31',
    system:
      "You are Askia, an AI planning assistant for teachers in Germany. Give practical, structured, classroom-ready suggestions. Always answer in the user's language (German or English).",
    messages: [
      {
        role: 'user',
        content: [{ type: 'text', text: prompt }],
      },
    ],
    max_tokens: 800,
    temperature: 0.7,
  }

  const command = new InvokeModelCommand({
    modelId: MODEL_ID,
    contentType: 'application/json',
    accept: 'application/json',
    body: Buffer.from(JSON.stringify(body)),
  })

  try {
    const response = await bedrockClient.send(command)
    const parsed = JSON.parse(decoder.decode(response.body))
    const text = parsed?.content?.[0]?.text?.trim()
    if (!text) {
      return buildFallbackResponse(prompt)
    }
    return {
      id: `askia-${Date.now()}`,
      content: text,
    }
  } catch (error) {
    console.error('Bedrock invocation failed:', error)
    return buildFallbackResponse(prompt)
  }
}
