'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Beat } from '@/types/database'

export const dynamic = 'force-dynamic'

export default function DebugPage() {
  const [beats, setBeats] = useState<Beat[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadBeats()
  }, [])

  async function loadBeats() {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('beats')
      .select('*')
      .order('created_at', { ascending: false })

    if (data) {
      setBeats(data)
    }
    if (error) {
      console.error('Error loading beats:', error)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Debug: Beat Data</h1>

        {loading ? (
          <p>Loading...</p>
        ) : beats.length === 0 ? (
          <p className="text-gray-400">No beats found in database.</p>
        ) : (
          <div className="space-y-6">
            {beats.map((beat) => (
              <div key={beat.id} className="bg-gray-800 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">{beat.title}</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-blue-400 mb-2">Basic Info</h3>
                    <div className="space-y-1 text-sm">
                      <p><span className="text-gray-400">ID:</span> {beat.id}</p>
                      <p><span className="text-gray-400">Title:</span> {beat.title}</p>
                      <p><span className="text-gray-400">Description:</span> {beat.description || 'N/A'}</p>
                      <p><span className="text-gray-400">BPM:</span> {beat.bpm || 'N/A'}</p>
                      <p><span className="text-gray-400">Key:</span> {beat.key || 'N/A'}</p>
                      <p><span className="text-gray-400">Genre:</span> {beat.genre || 'N/A'}</p>
                      <p><span className="text-gray-400">Price:</span> ${beat.price}</p>
                      <p><span className="text-gray-400">Available:</span> {beat.is_available ? 'Yes' : 'No'}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-green-400 mb-2">File URLs</h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <p className="text-gray-400 mb-1">Audio URL:</p>
                        {beat.audio_url ? (
                          <>
                            <p className="text-xs break-all bg-gray-900 p-2 rounded">{beat.audio_url}</p>
                            <a 
                              href={beat.audio_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:underline text-xs"
                            >
                              Test Audio Link →
                            </a>
                          </>
                        ) : (
                          <p className="text-red-400">No audio URL</p>
                        )}
                      </div>

                      <div className="mt-4">
                        <p className="text-gray-400 mb-1">Cover Image URL:</p>
                        {beat.cover_image_url ? (
                          <>
                            <p className="text-xs break-all bg-gray-900 p-2 rounded mb-2">{beat.cover_image_url}</p>
                            <a 
                              href={beat.cover_image_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:underline text-xs block mb-2"
                            >
                              Test Image Link →
                            </a>
                            <div className="mt-2">
                              <p className="text-gray-400 text-xs mb-1">Image Preview:</p>
                              <img 
                                src={beat.cover_image_url} 
                                alt={beat.title}
                                className="w-32 h-32 object-cover rounded border border-gray-700"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none'
                                  const errorMsg = document.createElement('p')
                                  errorMsg.className = 'text-red-400 text-xs'
                                  errorMsg.textContent = '❌ Image failed to load'
                                  e.currentTarget.parentElement?.appendChild(errorMsg)
                                }}
                                onLoad={(e) => {
                                  const successMsg = document.createElement('p')
                                  successMsg.className = 'text-green-400 text-xs mt-1'
                                  successMsg.textContent = '✅ Image loaded successfully'
                                  e.currentTarget.parentElement?.appendChild(successMsg)
                                }}
                              />
                            </div>
                          </>
                        ) : (
                          <p className="text-red-400">❌ No cover image URL</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {beat.tags && beat.tags.length > 0 && (
                  <div className="mt-4">
                    <p className="text-gray-400 text-sm">Tags:</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {beat.tags.map((tag, idx) => (
                        <span key={idx} className="text-xs bg-purple-600 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 p-4 bg-blue-900 rounded-lg">
          <h3 className="font-bold mb-2">🔍 What to Check:</h3>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>Does the cover_image_url exist?</li>
            <li>Does it start with: <code className="bg-gray-800 px-1">https://oyqlwemvqbbervhmorkp.supabase.co/storage/v1/object/public/images/</code></li>
            <li>Can you click the "Test Image Link" and see the image?</li>
            <li>Does the image preview show below?</li>
          </ul>
        </div>

        <div className="mt-4 text-center">
          <a href="/" className="text-blue-400 hover:underline">← Back to Home</a>
          {' | '}
          <a href="/admin" className="text-blue-400 hover:underline">Go to Admin →</a>
        </div>
      </div>
    </div>
  )
}

