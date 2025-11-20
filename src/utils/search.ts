type Searchable = {
  title?: string
  summary?: string
  description?: string
  tags?: string[]
}

const normalize = (value: string) => value.toLowerCase().trim()

export const filterCollection = <T extends Searchable>(items: T[], query: string) => {
  if (!query) return items
  const needle = normalize(query)
  return items.filter((item) => {
    const haystack = normalize(
      [item.title, item.summary, item.description, item.tags?.join(' ') ?? '']
        .filter(Boolean)
        .join(' '),
    )
    return haystack.includes(needle)
  })
}
