export interface Beat {
  id: string
  title: string
  description?: string
  bpm?: number
  key?: string
  genre?: string
  tags?: string[]
  audio_url: string
  waveform_url?: string
  cover_image_url?: string
  price: number
  is_available: boolean
  plays_count: number
  created_at: string
  updated_at: string
}

export interface Artist {
  id: string
  name: string
  bio?: string
  image_url?: string
  spotify_url?: string
  apple_music_url?: string
  soundcloud_url?: string
  instagram_url?: string
  created_at: string
  updated_at: string
}

export interface ArtistTrack {
  id: string
  artist_id: string
  title: string
  audio_url: string
  cover_image_url?: string
  spotify_url?: string
  apple_music_url?: string
  release_date?: string
  created_at: string
  updated_at: string
}

export interface Purchase {
  id: string
  beat_id: string
  customer_email: string
  customer_name?: string
  amount: number
  stripe_payment_id?: string
  download_url?: string
  created_at: string
}

