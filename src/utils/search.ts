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

export const filterCollection = <T extends Searchable>(items: T[], query: string) => {
  if (!query) return items
  const needle = normalize(query)
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
    return haystack.includes(needle)
  })
}
