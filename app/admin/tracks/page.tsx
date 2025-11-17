'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Artist, ArtistTrack } from '@/types/database'
import { Plus, Edit, Trash2, ArrowLeft, Music } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default function AdminTracksPage() {
  const [artists, setArtists] = useState<Artist[]>([])
  const [tracks, setTracks] = useState<ArtistTrack[]>([])
  const [selectedArtist, setSelectedArtist] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadArtists()
  }, [])

  useEffect(() => {
    if (selectedArtist) {
      loadTracks(selectedArtist)
    }
  }, [selectedArtist])

  async function loadArtists() {
    const supabase = createClient()
    const { data } = await supabase
      .from('artists')
      .select('*')
      .order('name')
    
    if (data) {
      setArtists(data)
      if (data.length > 0) {
        setSelectedArtist(data[0].id)
      }
    }
    setLoading(false)
  }

  async function loadTracks(artistId: string) {
    const supabase = createClient()
    const { data } = await supabase
      .from('artist_tracks')
      .select('*')
      .eq('artist_id', artistId)
      .order('release_date', { ascending: false })
    
    if (data) setTracks(data)
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this track?')) return
    
    const supabase = createClient()
    const { error } = await supabase
      .from('artist_tracks')
      .delete()
      .eq('id', id)
    
    if (!error && selectedArtist) {
      loadTracks(selectedArtist)
    }
  }

  const selectedArtistData = artists.find(a => a.id === selectedArtist)

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="text-gray-600 hover:text-gray-800">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-4xl font-bold">Artist Tracks Management</h1>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : artists.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <Music size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-4">No artists found. Add artists first!</p>
            <Link
              href="/admin/artists"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg inline-block hover:bg-blue-700"
            >
              Go to Artist Management
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Select Artist</label>
              <select
                value={selectedArtist}
                onChange={(e) => setSelectedArtist(e.target.value)}
                className="border rounded-lg px-4 py-2 w-full max-w-md"
              >
                {artists.map((artist) => (
                  <option key={artist.id} value={artist.id}>
                    {artist.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  Tracks for {selectedArtistData?.name}
                </h2>
                <p className="text-sm text-gray-600">
                  Add tracks directly in Supabase → artist_tracks table
                </p>
              </div>

              {tracks.length === 0 ? (
                <p className="text-gray-600 text-center py-8">
                  No tracks yet for this artist.
                </p>
              ) : (
                <div className="space-y-3">
                  {tracks.map((track) => (
                    <div
                      key={track.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        {track.cover_image_url && (
                          <img
                            src={track.cover_image_url}
                            alt={track.title}
                            className="w-12 h-12 rounded object-cover"
                          />
                        )}
                        <div>
                          <h3 className="font-semibold">{track.title}</h3>
                          {track.release_date && (
                            <p className="text-sm text-gray-600">
                              {new Date(track.release_date).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete(track.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

