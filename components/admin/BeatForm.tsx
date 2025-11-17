'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Beat } from '@/types/database'
import { X, Upload } from 'lucide-react'

interface BeatFormProps {
  beat?: Beat | null
  onClose: () => void
}

export default function BeatForm({ beat, onClose }: BeatFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    bpm: '',
    key: '',
    genre: '',
    tags: '',
    price: '',
    is_available: true,
  })
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    if (beat) {
      setFormData({
        title: beat.title,
        description: beat.description || '',
        bpm: beat.bpm?.toString() || '',
        key: beat.key || '',
        genre: beat.genre || '',
        tags: beat.tags?.join(', ') || '',
        price: beat.price.toString(),
        is_available: beat.is_available,
      })
    }
  }, [beat])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setUploading(true)

    try {
      let audio_url = beat?.audio_url || ''
      let cover_image_url = beat?.cover_image_url || ''

      // Upload audio file if new file selected
      if (audioFile) {
        const audioPath = `${Date.now()}-${audioFile.name}`
        const { data: audioData, error: audioError } = await supabase.storage
          .from('beats')
          .upload(audioPath, audioFile)
        
        if (audioError) throw audioError
        
        const { data: { publicUrl } } = supabase.storage
          .from('beats')
          .getPublicUrl(audioPath)
        
        audio_url = publicUrl
      }

      // Upload cover image if new file selected
      if (coverImage) {
        const imagePath = `${Date.now()}-${coverImage.name}`
        const { data: imageData, error: imageError } = await supabase.storage
          .from('images')
          .upload(imagePath, coverImage)
        
        if (imageError) throw imageError
        
        const { data: { publicUrl } } = supabase.storage
          .from('images')
          .getPublicUrl(imagePath)
        
        cover_image_url = publicUrl
      }

      const beatData = {
        title: formData.title,
        description: formData.description || null,
        bpm: formData.bpm ? parseInt(formData.bpm) : null,
        key: formData.key || null,
        genre: formData.genre || null,
        tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : [],
        audio_url,
        cover_image_url: cover_image_url || null,
        price: parseFloat(formData.price),
        is_available: formData.is_available,
        updated_at: new Date().toISOString(),
      }

      if (beat) {
        // Update existing beat
        const { error } = await supabase
          .from('beats')
          .update(beatData)
          .eq('id', beat.id)
        
        if (error) throw error
      } else {
        // Create new beat
        const { error } = await supabase
          .from('beats')
          .insert([beatData])
        
        if (error) throw error
      }

      onClose()
    } catch (error) {
      console.error('Error saving beat:', error)
      alert('Error saving beat. Please try again.')
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
              {beat ? 'Edit Beat' : 'Add New Beat'}
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">BPM</label>
                <input
                  type="number"
                  value={formData.bpm}
                  onChange={(e) => setFormData({ ...formData, bpm: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Key</label>
                <input
                  type="text"
                  value={formData.key}
                  onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="e.g., C Minor"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Genre</label>
              <input
                type="text"
                value={formData.genre}
                onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="e.g., Trap, Hip Hop"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="e.g., dark, melodic, 808"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Price ($) *</label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Audio File {!beat && '*'}</label>
              <input
                type="file"
                accept="audio/*"
                required={!beat}
                onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Cover Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_available"
                checked={formData.is_available}
                onChange={(e) => setFormData({ ...formData, is_available: e.target.checked })}
                className="mr-2"
              />
              <label htmlFor="is_available" className="text-sm font-medium">
                Available for purchase
              </label>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={uploading}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
              >
                {uploading ? 'Saving...' : (beat ? 'Update Beat' : 'Add Beat')}
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

