'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Artist } from '@/types/database'
import { X } from 'lucide-react'

interface ArtistFormProps {
  artist?: Artist | null
  onClose: () => void
}

export default function ArtistForm({ artist, onClose }: ArtistFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    spotify_url: '',
    apple_music_url: '',
    soundcloud_url: '',
    instagram_url: '',
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    if (artist) {
      setFormData({
        name: artist.name,
        bio: artist.bio || '',
        spotify_url: artist.spotify_url || '',
        apple_music_url: artist.apple_music_url || '',
        soundcloud_url: artist.soundcloud_url || '',
        instagram_url: artist.instagram_url || '',
      })
    }
  }, [artist])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setUploading(true)

    try {
      let image_url = artist?.image_url || ''

      // Upload image if new file selected
      if (imageFile) {
        const imagePath = `${Date.now()}-${imageFile.name}`
        const { error: imageError } = await supabase.storage
          .from('images')
          .upload(imagePath, imageFile)
        
        if (imageError) throw imageError
        
        const { data: { publicUrl } } = supabase.storage
          .from('images')
          .getPublicUrl(imagePath)
        
        image_url = publicUrl
      }

      const artistData = {
        name: formData.name,
        bio: formData.bio || null,
        image_url: image_url || null,
        spotify_url: formData.spotify_url || null,
        apple_music_url: formData.apple_music_url || null,
        soundcloud_url: formData.soundcloud_url || null,
        instagram_url: formData.instagram_url || null,
        updated_at: new Date().toISOString(),
      }

      if (artist) {
        const { error } = await supabase
          .from('artists')
          .update(artistData)
          .eq('id', artist.id)
        
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('artists')
          .insert([artistData])
        
        if (error) throw error
      }

      onClose()
    } catch (error) {
      console.error('Error saving artist:', error)
      alert('Error saving artist. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {artist ? 'Edit Artist' : 'Add New Artist'}
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Profile Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Spotify URL</label>
              <input
                type="url"
                value={formData.spotify_url}
                onChange={(e) => setFormData({ ...formData, spotify_url: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="https://open.spotify.com/artist/..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Apple Music URL</label>
              <input
                type="url"
                value={formData.apple_music_url}
                onChange={(e) => setFormData({ ...formData, apple_music_url: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="https://music.apple.com/artist/..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">SoundCloud URL</label>
              <input
                type="url"
                value={formData.soundcloud_url}
                onChange={(e) => setFormData({ ...formData, soundcloud_url: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="https://soundcloud.com/..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Instagram URL</label>
              <input
                type="url"
                value={formData.instagram_url}
                onChange={(e) => setFormData({ ...formData, instagram_url: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="https://instagram.com/..."
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={uploading}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
              >
                {uploading ? 'Saving...' : (artist ? 'Update Artist' : 'Add Artist')}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

