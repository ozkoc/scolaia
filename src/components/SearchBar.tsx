import { useState } from 'react'
import type { FormEvent } from 'react'

interface SearchBarProps {
  label?: string
  placeholder?: string
  defaultValue?: string
  onSearch: (value: string) => void
  size?: 'md' | 'lg'
}

export const SearchBar = ({
  label,
  placeholder = 'Search…',
  defaultValue = '',
  onSearch,
  size = 'md',
}: SearchBarProps) => {
  const [value, setValue] = useState(defaultValue)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    onSearch(value.trim())
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setValue(newValue)
    // Clear the search results when input is empty
    if (newValue.trim() === '') {
      onSearch('')
    }
  }

  return (
    <form className={`search-bar search-bar-${size}`} onSubmit={handleSubmit}>
      {label && <label className="search-bar__label">{label}</label>}
      <div className="search-bar__field">
        <input
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          aria-label={label || placeholder}
        />
        <button type="submit">Search</button>
      </div>
    </form>
  )
}
