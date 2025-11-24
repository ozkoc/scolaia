type Searchable = {
  title?: string
  summary?: string
  description?: string
  tags?: string[]
  name?: string
  role?: string
  focus?: string
  bio?: string
}

const normalize = (value: string) => value.toLowerCase().trim()

// Common words to ignore when extracting keywords
const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 'he', 
  'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the', 'to', 'was', 'will', 'with',
  'can', 'could', 'should', 'would', 'how', 'what', 'when', 'where', 'who', 'why',
  'i', 'my', 'me', 'we', 'our', 'you', 'your', 'she', 'her', 'his', 'they', 'their',
  'this', 'these', 'those', 'am', 'do', 'does', 'did', 'have', 'been', 'being',
  // German stop words
  'der', 'die', 'das', 'den', 'dem', 'des', 'ein', 'eine', 'einer', 'eines', 
  'und', 'oder', 'aber', 'ich', 'du', 'er', 'sie', 'es', 'wir', 'ihr', 'ist',
  'sind', 'war', 'waren', 'hat', 'haben', 'kann', 'können', 'wie', 'was', 'wo',
  'wenn', 'dann', 'auch', 'noch', 'nur', 'schon', 'so', 'sehr', 'mehr', 'zu',
])

/**
 * Extract meaningful keywords from a natural language query
 * Examples:
 * "how can I teach fractions topic" -> ["teach", "fractions", "topic"]
 * "classroom management strategies" -> ["classroom", "management", "strategies"]
 */
export const extractKeywords = (query: string): string[] => {
  const normalized = normalize(query)
  const words = normalized.split(/\s+/)
  
  return words
    .filter(word => word.length > 2) // Remove very short words
    .filter(word => !STOP_WORDS.has(word)) // Remove stop words
    .filter((word, index, arr) => arr.indexOf(word) === index) // Remove duplicates
}

export const filterCollection = <T extends Searchable>(items: T[], query: string) => {
  if (!query) return items
  
  // Extract keywords from the query
  const keywords = extractKeywords(query)
  
  // If no keywords extracted, fall back to original query
  const searchTerms = keywords.length > 0 ? keywords : [normalize(query)]
  
  return items.filter((item) => {
    const haystack = normalize(
      [
        item.title,
        item.summary,
        item.description,
        item.name,
        item.role,
        item.focus,
        item.bio,
        item.tags?.join(' ') ?? '',
      ]
        .filter(Boolean)
        .join(' '),
    )
    
    // Match if ANY keyword is found (OR logic)
    return searchTerms.some(term => haystack.includes(term))
  })
}
