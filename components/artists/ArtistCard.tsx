'use client'

import { useState, useRef } from 'react'
import { Artist, ArtistTrack } from '@/types/database'
import { Play, Pause, ExternalLink } from 'lucide-react'
import { FaSpotify, FaApple, FaSoundcloud, FaInstagram } from 'react-icons/fa'

interface ArtistCardProps {
  artist: Artist
  tracks: ArtistTrack[]
}

export default function ArtistCard({ artist, tracks }: ArtistCardProps) {
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null)
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({})

  function togglePlay(trackId: string) {
    // Pause all other tracks
    Object.entries(audioRefs.current).forEach(([id, audio]) => {
      if (id !== trackId && audio) {
        audio.pause()
      }
    })

    const audio = audioRefs.current[trackId]
    if (audio) {
      if (playingTrackId === trackId) {
        audio.pause()
        setPlayingTrackId(null)
      } else {
        audio.play()
        setPlayingTrackId(trackId)
      }
    }
  }

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <div className="md:flex">
        {/* Artist Info */}
        <div className="md:w-1/3 p-8 bg-gradient-to-br from-purple-900 to-blue-900">
          {artist.image_url && (
            <img
              src={artist.image_url}
              alt={artist.name}
              className="w-48 h-48 rounded-full mx-auto mb-6 object-cover border-4 border-white"
            />
          )}
          
          <h2 className="text-3xl font-bold text-center mb-4">{artist.name}</h2>
          
          {artist.bio && (
            <p className="text-gray-300 mb-6">{artist.bio}</p>
          )}

          {/* Social Links */}
          <div className="flex justify-center gap-4">
            {artist.spotify_url && (
              <a
                href={artist.spotify_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 hover:text-green-400 transition-colors"
              >
                <FaSpotify size={28} />
              </a>
            )}
            {artist.apple_music_url && (
              <a
                href={artist.apple_music_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 hover:text-pink-400 transition-colors"
              >
                <FaApple size={28} />
              </a>
            )}
            {artist.soundcloud_url && (
              <a
                href={artist.soundcloud_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 hover:text-orange-400 transition-colors"
              >
                <FaSoundcloud size={28} />
              </a>
            )}
            {artist.instagram_url && (
              <a
                href={artist.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-400 hover:text-pink-300 transition-colors"
              >
                <FaInstagram size={28} />
              </a>
            )}
          </div>
        </div>

        {/* Tracks */}
        <div className="md:w-2/3 p-8">
          <h3 className="text-2xl font-bold mb-6">Music</h3>
          
          {tracks.length === 0 ? (
            <p className="text-gray-400">No tracks available yet.</p>
          ) : (
            <div className="space-y-4">
              {tracks.map((track) => (
                <div
                  key={track.id}
                  className="bg-gray-700 rounded-lg p-4 flex items-center gap-4 hover:bg-gray-650 transition-colors"
                >
                  {track.cover_image_url && (
                    <img
                      src={track.cover_image_url}
                      alt={track.title}
                      className="w-16 h-16 rounded object-cover"
                    />
                  )}
                  
                  <button
                    onClick={() => togglePlay(track.id)}
                    className="bg-blue-600 hover:bg-blue-700 rounded-full p-3 transition-colors"
                  >
                    {playingTrackId === track.id ? (
                      <Pause size={20} />
                    ) : (
                      <Play size={20} />
                    )}
                  </button>

                  <div className="flex-1">
                    <h4 className="font-semibold">{track.title}</h4>
                    {track.release_date && (
                      <p className="text-sm text-gray-400">
                        {new Date(track.release_date).getFullYear()}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {track.spotify_url && (
                      <a
                        href={track.spotify_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-500 hover:text-green-400"
                      >
                        <FaSpotify size={20} />
                      </a>
                    )}
                    {track.apple_music_url && (
                      <a
                        href={track.apple_music_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-500 hover:text-pink-400"
                      >
                        <FaApple size={20} />
                      </a>
                    )}
                  </div>

                  <audio
                    ref={(el) => {
                      if (el) audioRefs.current[track.id] = el
                    }}
                    src={track.audio_url}
                    onEnded={() => setPlayingTrackId(null)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

