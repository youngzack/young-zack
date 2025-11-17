'use client'

import { useState, useRef } from 'react'
import { Beat } from '@/types/database'
import { Play, Pause, ShoppingCart } from 'lucide-react'

interface BeatCardProps {
  beat: Beat
}

export default function BeatCard({ beat }: BeatCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  function togglePlay() {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  function handlePurchase() {
    // TODO: Implement Stripe checkout
    alert(`Purchase functionality coming soon for: ${beat.title}`)
  }

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-all hover:scale-105">
      <div className="relative aspect-square">
        {beat.cover_image_url ? (
          <img
            src={beat.cover_image_url}
            alt={beat.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
            <span className="text-6xl font-bold opacity-50">{beat.title[0]}</span>
          </div>
        )}
        
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-60 transition-all"
        >
          {isPlaying ? (
            <Pause size={64} className="text-white" />
          ) : (
            <Play size={64} className="text-white" />
          )}
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{beat.title}</h3>
        
        {beat.description && (
          <p className="text-sm text-gray-400 mb-3 line-clamp-2">{beat.description}</p>
        )}

        <div className="flex flex-wrap gap-2 mb-3">
          {beat.bpm && (
            <span className="text-xs bg-gray-700 px-2 py-1 rounded">{beat.bpm} BPM</span>
          )}
          {beat.key && (
            <span className="text-xs bg-gray-700 px-2 py-1 rounded">{beat.key}</span>
          )}
          {beat.genre && (
            <span className="text-xs bg-purple-600 px-2 py-1 rounded">{beat.genre}</span>
          )}
        </div>

        {beat.tags && beat.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {beat.tags.slice(0, 4).map((tag, idx) => (
              <span key={idx} className="text-xs text-gray-500">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-gray-700">
          <span className="text-2xl font-bold">${beat.price}</span>
          <button
            onClick={handlePurchase}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <ShoppingCart size={18} />
            Buy Now
          </button>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={beat.audio_url}
        onEnded={() => setIsPlaying(false)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />
    </div>
  )
}

