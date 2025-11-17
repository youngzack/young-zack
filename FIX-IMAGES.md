# Fix Beat Images Not Showing

## 🔍 Diagnosis

The beat images might not be showing because:
1. Storage buckets aren't public
2. Storage policies aren't set correctly
3. Image URLs aren't being saved properly

## 🔧 Quick Fix - Run This SQL in Supabase

Go to: **https://supabase.com/dashboard/project/oyqlwemvqbbervhmorkp/sql/new**

Copy and paste this SQL:

```sql
-- Make sure storage buckets exist and are public
UPDATE storage.buckets SET public = true WHERE id = 'images';
UPDATE storage.buckets SET public = true WHERE id = 'beats';
UPDATE storage.buckets SET public = true WHERE id = 'artist-tracks';

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Enable insert for all users" ON storage.objects;
DROP POLICY IF EXISTS "Enable update for all users" ON storage.objects;
DROP POLICY IF EXISTS "Enable delete for all users" ON storage.objects;

-- Create new storage policies for public read access
CREATE POLICY "Public Access" ON storage.objects 
  FOR SELECT 
  USING (bucket_id IN ('beats', 'artist-tracks', 'images'));

-- Allow uploads to storage
CREATE POLICY "Enable insert for all users" ON storage.objects
  FOR INSERT 
  WITH CHECK (bucket_id IN ('beats', 'artist-tracks', 'images'));

CREATE POLICY "Enable update for all users" ON storage.objects
  FOR UPDATE 
  USING (bucket_id IN ('beats', 'artist-tracks', 'images'));

CREATE POLICY "Enable delete for all users" ON storage.objects
  FOR DELETE 
  USING (bucket_id IN ('beats', 'artist-tracks', 'images'));
```

Click **"Run"** and wait for success.

## ✅ Verify Storage Buckets

1. Go to: **https://supabase.com/dashboard/project/oyqlwemvqbbervhmorkp/storage/buckets**
2. Check that you have these 3 buckets:
   - `beats` (Public)
   - `images` (Public)
   - `artist-tracks` (Public)
3. Each should show "Public" badge

## 🔍 Check Your Beat Data

1. Go to: **https://supabase.com/dashboard/project/oyqlwemvqbbervhmorkp/editor**
2. Click on the `beats` table
3. Look at the `cover_image_url` column
4. It should have a URL like: `https://oyqlwemvqbbervhmorkp.supabase.co/storage/v1/object/public/images/...`

## 🎯 Test Image Upload

After running the SQL:

1. Go to: **http://localhost:3000/admin**
2. Click "Add New Beat"
3. Fill in the form
4. **Upload a cover image** (JPG, PNG, etc.)
5. Click "Add Beat"
6. Check if the image shows up

## 🐛 Still Not Working?

### Option 1: Check Browser Console
1. Open your website: http://localhost:3000
2. Press `F12` to open Developer Tools
3. Go to the "Console" tab
4. Look for any errors related to images
5. Share the error message

### Option 2: Check Image URL Directly
1. Go to: **https://supabase.com/dashboard/project/oyqlwemvqbbervhmorkp/editor**
2. Click on `beats` table
3. Copy the `cover_image_url` value
4. Paste it in your browser
5. Does the image load?

### Option 3: Re-upload the Image
1. Go to admin panel
2. Edit the beat
3. Upload the cover image again
4. Save

## 💡 Common Issues

| Issue | Solution |
|-------|----------|
| Bucket not public | Run the SQL above to make buckets public |
| No storage policies | Run the SQL above to create policies |
| Wrong URL format | Should start with `https://oyqlwemvqbbervhmorkp.supabase.co/storage/v1/object/public/` |
| Image too large | Try a smaller image (< 5MB) |
| Wrong file type | Use JPG, PNG, or WebP |

## 🎨 Fallback Design

If no image is uploaded, the beat card shows:
- Gradient background (purple to blue)
- First letter of the beat title
- Still looks good!

---

**Run the SQL above first, then try uploading a beat with an image!** 🚀

