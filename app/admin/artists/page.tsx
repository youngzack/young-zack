'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Artist } from '@/types/database'
import { Plus, Edit, Trash2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import ArtistForm from '@/components/admin/ArtistForm'

export const dynamic = 'force-dynamic'

export default function AdminArtistsPage() {
  const [artists, setArtists] = useState<Artist[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingArtist, setEditingArtist] = useState<Artist | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadArtists()
  }, [])

  async function loadArtists() {
    setLoading(true)
    const supabase = createClient()
    const { data, error } = await supabase
      .from('artists')
      .select('*')
      .order('name')

    if (data) setArtists(data)
    setLoading(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this artist?')) return

    const supabase = createClient()
    const { error } = await supabase
      .from('artists')
      .delete()
      .eq('id', id)

    if (!error) {
      loadArtists()
    }
  }

  function handleEdit(artist: Artist) {
    setEditingArtist(artist)
    setShowForm(true)
  }

  function handleFormClose() {
    setShowForm(false)
    setEditingArtist(null)
    loadArtists()
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="text-gray-600 hover:text-gray-800">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-4xl font-bold">Artist Management</h1>
          <button
            onClick={() => setShowForm(true)}
            className="ml-auto bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700"
          >
            <Plus size={20} />
            Add New Artist
          </button>
        </div>

        {showForm && (
          <ArtistForm
            artist={editingArtist}
            onClose={handleFormClose}
          />
        )}

        {loading ? (
          <div className="text-center py-12">Loading artists...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artists.map((artist) => (
              <div key={artist.id} className="bg-white rounded-lg shadow p-6">
                {artist.image_url && (
                  <img
                    src={artist.image_url}
                    alt={artist.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                )}
                <h3 className="text-xl font-bold text-center mb-2">{artist.name}</h3>
                {artist.bio && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{artist.bio}</p>
                )}
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => handleEdit(artist)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(artist.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

