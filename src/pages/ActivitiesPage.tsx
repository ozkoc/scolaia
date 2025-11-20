import { useEffect, useMemo, useState } from 'react'
import type { Activity } from '../types/content'
import { SearchBar } from '../components/SearchBar'
import { ActivityCard } from '../components/ActivityCard'
import { filterCollection } from '../utils/search'
import { apiClient } from '../services/api'

export const ActivitiesPage = () => {
  const [activities, setActivities] = useState<Activity[]>([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        setLoading(true)
        const data = await apiClient.getActivities()
        if (!active) return
        setActivities(data)
        setError(null)
      } catch (err) {
        if (!active) return
        setError(err instanceof Error ? err.message : 'Unable to load activities right now.')
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

  const filteredActivities = useMemo(() => filterCollection(activities, query), [activities, query])

  return (
    <div className="activities-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Activity library</p>
          <h1>Browse the full collection</h1>
          <p>Filter by subject, methodology, or grade level keywords.</p>
        </div>
        <SearchBar placeholder="Search activities" onSearch={(value) => setQuery(value)} />
      </header>

      {loading ? (
        <p className="empty-state">Loading activities…</p>
      ) : error ? (
        <p className="empty-state">{error}</p>
      ) : filteredActivities.length ? (
        <div className="grid grid-activities">
          {filteredActivities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} variant="detailed" />
          ))}
        </div>
      ) : (
        <p className="empty-state">No activities match that filter yet.</p>
      )}
    </div>
  )
}
