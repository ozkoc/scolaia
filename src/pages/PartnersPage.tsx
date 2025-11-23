import { useEffect, useMemo, useState } from 'react'
import type { PartnerResource } from '../types/content'
import { SearchBar } from '../components/SearchBar'
import { PartnerLinkCard } from '../components/PartnerLinkCard'
import { filterCollection } from '../utils/search'
import { apiClient } from '../services/api'
import { Section } from '../components/Section'

export const PartnersPage = () => {
  const [partners, setPartners] = useState<PartnerResource[]>([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        setLoading(true)
        const data = await apiClient.getPartnerResources()
        if (!active) return
        setPartners(data)
        setError(null)
      } catch (err) {
        if (!active) return
        setError(err instanceof Error ? err.message : 'Unable to load partners right now.')
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }
    load()
    return () => {
      active = false
    }
  }, [])

  const filteredPartners = useMemo(() => filterCollection(partners, query), [partners, query])

  return (
    <div className="partners-page">
      <Section
        title="Partners & Tools"
        description="External tools we trust and reference."
        className="content-section--wide partners-section"
      >
        <SearchBar 
          placeholder="Search partners and tools" 
          onSearch={(value) => setQuery(value)} 
        />
        
        {loading ? (
          <p className="empty-state">Loading partners…</p>
        ) : error ? (
          <p className="empty-state">{error}</p>
        ) : filteredPartners.length ? (
          <div className="stack stack-md">
            {filteredPartners.map((resource) => (
              <PartnerLinkCard key={resource.id} resource={resource} />
            ))}
          </div>
        ) : (
          <p className="empty-state">No partners match that filter yet.</p>
        )}
      </Section>
    </div>
  )
}
