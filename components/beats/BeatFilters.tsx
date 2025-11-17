'use client'

import { Search } from 'lucide-react'

interface BeatFiltersProps {
  genres: string[]
  selectedGenre: string
  onGenreChange: (genre: string) => void
  searchQuery: string
  onSearchChange: (query: string) => void
}

export default function BeatFilters({
  genres,
  selectedGenre,
  onGenreChange,
  searchQuery,
  onSearchChange,
}: BeatFiltersProps) {
  return (
    <div className="mb-8 space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search beats by title, description, or tags..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onGenreChange('')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            selectedGenre === ''
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          All Genres
        </button>
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => onGenreChange(genre)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedGenre === genre
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  )
}

