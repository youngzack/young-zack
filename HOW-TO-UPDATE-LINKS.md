# How to Update Your Streaming Links

## Quick Update

To update your streaming platform links, edit the file: **`config/site.ts`**

```typescript
export const siteConfig = {
  artist: {
    name: 'Young Zack',
    tagline: 'Premium Beats & Music',
  },
  
  socialLinks: {
    spotify: 'https://open.spotify.com/artist/your-artist-id',
    appleMusic: 'https://music.apple.com/artist/your-artist-id',
    soundcloud: 'https://soundcloud.com/youngzack',
    youtube: 'https://youtube.com/@youngzack',
    instagram: 'https://instagram.com/youngzack',
  },
}
```

## Steps:

1. Open `config/site.ts` in your editor
2. Replace the placeholder URLs with your actual links:
   - **Spotify**: Your Spotify artist page URL
   - **Apple Music**: Your Apple Music artist page URL
   - **SoundCloud**: Your SoundCloud profile URL
   - **YouTube**: Your YouTube channel URL
   - **Instagram**: Your Instagram profile URL
3. Save the file
4. The changes will appear automatically (hot reload)

## Example:

```typescript
socialLinks: {
  spotify: 'https://open.spotify.com/artist/1a2b3c4d5e',
  appleMusic: 'https://music.apple.com/us/artist/young-zack/123456789',
  soundcloud: 'https://soundcloud.com/youngzack',
  youtube: 'https://youtube.com/@youngzack',
  instagram: 'https://instagram.com/youngzackmusic',
}
```

That's it! Your streaming links will update across the entire site.

