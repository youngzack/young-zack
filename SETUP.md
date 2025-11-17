# Young Zack Website - Setup Guide

This is a modern beat marketplace and artist showcase website built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Features

- 🎵 **Beat Marketplace**: Upload, manage, and sell beats with metadata (BPM, key, genre, tags)
- 🎤 **Artist Section**: Showcase artists and their music with streaming links
- 🎨 **Admin Panel**: Easy-to-use interface for managing beats and artists
- 🔊 **Audio Player**: Built-in audio preview for beats and tracks
- 💳 **Payment Ready**: Stripe integration ready for beat purchases
- 📱 **Responsive Design**: Works beautifully on all devices

## Setup Instructions

### 1. Supabase Setup

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Once your project is created, go to **Settings** → **API**
3. Copy your **Project URL** and **anon public** key
4. Go to **SQL Editor** and run the SQL from `supabase/schema.sql` to create all tables and storage buckets

### 2. Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Update `.env.local` with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

### 3. Supabase Storage Setup

In your Supabase dashboard:

1. Go to **Storage**
2. Create three buckets (if not already created by the SQL script):
   - `beats` (public)
   - `artist-tracks` (public)
   - `images` (public)
3. Make sure all buckets are set to **public**

### 4. Install Dependencies

```bash
npm install
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your website!

## Usage Guide

### Admin Panel

Access the admin panel at `/admin`

#### Managing Beats

1. Click "Add New Beat"
2. Fill in the beat details:
   - **Title** (required)
   - **Description**
   - **BPM** (beats per minute)
   - **Key** (e.g., C Minor, A Major)
   - **Genre** (e.g., Trap, Hip Hop)
   - **Tags** (comma-separated, e.g., "dark, melodic, 808")
   - **Price** (required)
   - **Audio File** (required for new beats)
   - **Cover Image** (optional)
3. Click "Add Beat" to save

#### Managing Artists

1. Go to `/admin/artists`
2. Click "Add New Artist"
3. Fill in artist details:
   - **Name** (required)
   - **Bio**
   - **Profile Image**
   - **Social Media Links** (Spotify, Apple Music, SoundCloud, Instagram)
4. Click "Add Artist" to save

### Public Pages

- **Home** (`/`): Landing page with navigation
- **Beats** (`/beats`): Browse and purchase beats
- **Artists** (`/artists`): View artists and their music

## Optional: Stripe Payment Integration

To enable beat purchases:

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the Stripe dashboard
3. Add them to `.env.local`:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   ```
4. Implement the checkout flow in `components/beats/BeatCard.tsx`

## Database Schema

### Tables

- **beats**: Store beat information and metadata
- **artists**: Store artist profiles
- **artist_tracks**: Store artist music tracks
- **purchases**: Track beat purchases

### Storage Buckets

- **beats**: Audio files for beats
- **artist-tracks**: Audio files for artist tracks
- **images**: Cover images and artist photos

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Icons**: Lucide React, React Icons
- **Deployment**: Vercel (recommended)

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add your environment variables
5. Deploy!

## Support

For issues or questions, please check the documentation or create an issue in the repository.

