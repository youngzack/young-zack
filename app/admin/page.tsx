'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Beat } from '@/types/database'
import { Upload, Edit, Trash2, Plus, Users, Music2 } from 'lucide-react'
import Link from 'next/link'
import BeatForm from '@/components/admin/BeatForm'
import BeatList from '@/components/admin/BeatList'

export const dynamic = 'force-dynamic'

export default function AdminPage() {
  const [beats, setBeats] = useState<Beat[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingBeat, setEditingBeat] = useState<Beat | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadBeats()
  }, [])

  async function loadBeats() {
    setLoading(true)
    const supabase = createClient()
    const { data, error } = await supabase
      .from('beats')
      .select('*')
      .order('created_at', { ascending: false })

    if (data) setBeats(data)
    setLoading(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this beat?')) return

    const supabase = createClient()
    const { error } = await supabase
      .from('beats')
      .delete()
      .eq('id', id)

    if (!error) {
      loadBeats()
    }
  }

  function handleEdit(beat: Beat) {
    setEditingBeat(beat)
    setShowForm(true)
  }

  function handleFormClose() {
    setShowForm(false)
    setEditingBeat(null)
    loadBeats()
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Link
              href="/admin/artists"
              className="bg-purple-600 text-white p-6 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-3"
            >
              <Users size={32} />
              <div>
                <h2 className="text-xl font-bold">Manage Artists</h2>
                <p className="text-purple-100">Add and edit artist profiles</p>
              </div>
            </Link>

            <Link
              href="/admin/tracks"
              className="bg-pink-600 text-white p-6 rounded-lg hover:bg-pink-700 transition-colors flex items-center gap-3"
            >
              <Music2 size={32} />
              <div>
                <h2 className="text-xl font-bold">Manage Artist Tracks</h2>
                <p className="text-pink-100">View and manage artist music</p>
              </div>
            </Link>
          </div>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Beat Management</h2>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700"
          >
            <Plus size={20} />
            Add New Beat
          </button>
        </div>

        {showForm && (
          <BeatForm
            beat={editingBeat}
            onClose={handleFormClose}
          />
        )}

        <BeatList
          beats={beats}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  )
}

