import { useMemo, useState } from 'react'
import { activities } from '../data/activities'
import { SearchBar } from '../components/SearchBar'
import { ActivityCard } from '../components/ActivityCard'
import { filterCollection } from '../utils/search'

export const ActivitiesPage = () => {
  const [query, setQuery] = useState('')
  const filteredActivities = useMemo(() => filterCollection(activities, query), [query])

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

      {filteredActivities.length ? (
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
