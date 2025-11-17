-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create artists table
CREATE TABLE artists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  bio TEXT,
  image_url TEXT,
  spotify_url TEXT,
  apple_music_url TEXT,
  soundcloud_url TEXT,
  instagram_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create beats table
CREATE TABLE beats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  bpm INTEGER,
  key TEXT,
  genre TEXT,
  tags TEXT[],
  audio_url TEXT NOT NULL,
  waveform_url TEXT,
  cover_image_url TEXT,
  price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  is_available BOOLEAN DEFAULT true,
  plays_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create purchases table
CREATE TABLE purchases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  beat_id UUID REFERENCES beats(id) ON DELETE CASCADE,
  customer_email TEXT NOT NULL,
  customer_name TEXT,
  amount DECIMAL(10, 2) NOT NULL,
  stripe_payment_id TEXT,
  download_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create artist_tracks table (for artist section music)
CREATE TABLE artist_tracks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  artist_id UUID REFERENCES artists(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  audio_url TEXT NOT NULL,
  cover_image_url TEXT,
  spotify_url TEXT,
  apple_music_url TEXT,
  release_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_beats_available ON beats(is_available);
CREATE INDEX idx_beats_created_at ON beats(created_at DESC);
CREATE INDEX idx_purchases_beat_id ON purchases(beat_id);
CREATE INDEX idx_artist_tracks_artist_id ON artist_tracks(artist_id);

-- Enable Row Level Security
ALTER TABLE artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE beats ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE artist_tracks ENABLE ROW LEVEL SECURITY;

-- Public read access for artists
CREATE POLICY "Artists are viewable by everyone" ON artists
  FOR SELECT USING (true);

-- Public read access for available beats
CREATE POLICY "Available beats are viewable by everyone" ON beats
  FOR SELECT USING (is_available = true);

-- Public read access for artist tracks
CREATE POLICY "Artist tracks are viewable by everyone" ON artist_tracks
  FOR SELECT USING (true);

-- Storage bucket for audio files
INSERT INTO storage.buckets (id, name, public) VALUES ('beats', 'beats', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('artist-tracks', 'artist-tracks', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true);

-- Storage policies for public access
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id IN ('beats', 'artist-tracks', 'images'));

