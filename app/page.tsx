'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Beat } from '@/types/database'
import BeatCard from '@/components/beats/BeatCard'
import BeatFilters from '@/components/beats/BeatFilters'
import { Music } from 'lucide-react'
import { siteConfig } from '@/config/site'
import StreamingLinks from '@/components/StreamingLinks'

export default function Home() {
  const [beats, setBeats] = useState<Beat[]>([])
  const [filteredBeats, setFilteredBeats] = useState<Beat[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedGenre, setSelectedGenre] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    loadBeats()
  }, [])

  useEffect(() => {
    filterBeats()
  }, [beats, selectedGenre, searchQuery])

  async function loadBeats() {
    setLoading(true)
    const supabase = createClient()
    const { data, error } = await supabase
      .from('beats')
      .select('*')
      .eq('is_available', true)
      .order('created_at', { ascending: false })

    if (data) {
      setBeats(data)
      setFilteredBeats(data)
    }
    setLoading(false)
  }

  function filterBeats() {
    let filtered = [...beats]

    if (selectedGenre) {
      filtered = filtered.filter(beat => beat.genre === selectedGenre)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(beat =>
        beat.title.toLowerCase().includes(query) ||
        beat.description?.toLowerCase().includes(query) ||
        beat.tags?.some(tag => tag.toLowerCase().includes(query))
      )
    }

    setFilteredBeats(filtered)
  }

  const genres = Array.from(new Set(beats.map(b => b.genre).filter(Boolean))) as string[]

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900 to-black text-white">
      {/* Artist Section */}
      <div className="relative py-20 px-4">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <h1 className="text-7xl md:text-9xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
            {siteConfig.artist.name}
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300 mb-12">
            {siteConfig.artist.tagline}
          </p>

          {/* Streaming Links with Neon Glow Effect */}
          <StreamingLinks style="neon" />
        </div>
      </div>

      {/* Beat Store Section */}
      <div className="py-20 px-4 bg-black bg-opacity-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-4">Beat Store</h2>
            <p className="text-xl text-gray-400">Premium beats for purchase</p>
          </div>

          <BeatFilters
            genres={genres}
            selectedGenre={selectedGenre}
            onGenreChange={setSelectedGenre}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
            </div>
          ) : filteredBeats.length === 0 ? (
            <div className="text-center py-12">
              <Music size={48} className="mx-auto text-gray-600 mb-4" />
              <p className="text-gray-400">No beats found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBeats.map((beat) => (
                <BeatCard key={beat.id} beat={beat} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-400 border-t border-gray-800">
        <p>&copy; 2024 {siteConfig.artist.name}. All rights reserved.</p>
      </footer>
    </div>
  )
}
