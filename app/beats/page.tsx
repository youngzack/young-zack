'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Beat } from '@/types/database'
import BeatCard from '@/components/beats/BeatCard'
import BeatFilters from '@/components/beats/BeatFilters'
import { Music } from 'lucide-react'
import { FaSpotify, FaApple, FaSoundcloud, FaInstagram, FaYoutube } from 'react-icons/fa'
import { siteConfig } from '@/config/site'

export const dynamic = 'force-dynamic'

export default function BeatsPage() {
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4">{siteConfig.artist.name}</h1>
          <p className="text-xl text-gray-400 mb-6">{siteConfig.artist.tagline}</p>

          {/* Streaming Links */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <a
              href={siteConfig.socialLinks.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-full transition-colors"
            >
              <FaSpotify size={24} />
              <span className="font-semibold">Spotify</span>
            </a>
            <a
              href={siteConfig.socialLinks.appleMusic}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-full transition-colors"
            >
              <FaApple size={24} />
              <span className="font-semibold">Apple Music</span>
            </a>
            <a
              href={siteConfig.socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-full transition-colors"
            >
              <FaYoutube size={24} />
              <span className="font-semibold">YouTube</span>
            </a>
            <a
              href={siteConfig.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-3 rounded-full transition-colors"
            >
              <FaInstagram size={24} />
              <span className="font-semibold">Instagram</span>
            </a>
          </div>
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
  )
}

