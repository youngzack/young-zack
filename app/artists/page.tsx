'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Artist, ArtistTrack } from '@/types/database'
import ArtistCard from '@/components/artists/ArtistCard'
import { Users } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function ArtistsPage() {
  const [artists, setArtists] = useState<Artist[]>([])
  const [artistTracks, setArtistTracks] = useState<Record<string, ArtistTrack[]>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadArtists()
  }, [])

  async function loadArtists() {
    setLoading(true)
    const supabase = createClient()

    // Load artists
    const { data: artistsData } = await supabase
      .from('artists')
      .select('*')
      .order('name')

    if (artistsData) {
      setArtists(artistsData)

      // Load tracks for each artist
      const tracksPromises = artistsData.map(artist =>
        supabase
          .from('artist_tracks')
          .select('*')
          .eq('artist_id', artist.id)
          .order('release_date', { ascending: false })
      )

      const tracksResults = await Promise.all(tracksPromises)
      const tracksMap: Record<string, ArtistTrack[]> = {}

      artistsData.forEach((artist, idx) => {
        tracksMap[artist.id] = tracksResults[idx].data || []
      })

      setArtistTracks(tracksMap)
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Our Artists</h1>
          <p className="text-xl text-gray-400">Discover music from talented artists</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          </div>
        ) : artists.length === 0 ? (
          <div className="text-center py-12">
            <Users size={48} className="mx-auto text-gray-600 mb-4" />
            <p className="text-gray-400">No artists yet. Check back soon!</p>
          </div>
        ) : (
          <div className="space-y-12">
            {artists.map((artist) => (
              <ArtistCard
                key={artist.id}
                artist={artist}
                tracks={artistTracks[artist.id] || []}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

