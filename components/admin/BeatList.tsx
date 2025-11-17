'use client'

import { Beat } from '@/types/database'
import { Edit, Trash2, Music } from 'lucide-react'

interface BeatListProps {
  beats: Beat[]
  loading: boolean
  onEdit: (beat: Beat) => void
  onDelete: (id: string) => void
}

export default function BeatList({ beats, loading, onEdit, onDelete }: BeatListProps) {
  if (loading) {
    return <div className="text-center py-12">Loading beats...</div>
  }

  if (beats.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg">
        <Music size={48} className="mx-auto text-gray-400 mb-4" />
        <p className="text-gray-600">No beats yet. Add your first beat to get started!</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">BPM</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Key</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Genre</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {beats.map((beat) => (
            <tr key={beat.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="flex items-center">
                  {beat.cover_image_url && (
                    <img
                      src={beat.cover_image_url}
                      alt={beat.title}
                      className="w-10 h-10 rounded mr-3 object-cover"
                    />
                  )}
                  <div>
                    <div className="font-medium">{beat.title}</div>
                    {beat.tags && beat.tags.length > 0 && (
                      <div className="text-xs text-gray-500">
                        {beat.tags.slice(0, 3).join(', ')}
                      </div>
                    )}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm">{beat.bpm || '-'}</td>
              <td className="px-6 py-4 text-sm">{beat.key || '-'}</td>
              <td className="px-6 py-4 text-sm">{beat.genre || '-'}</td>
              <td className="px-6 py-4 text-sm font-medium">${beat.price}</td>
              <td className="px-6 py-4">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    beat.is_available
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {beat.is_available ? 'Available' : 'Unavailable'}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(beat)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(beat.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

