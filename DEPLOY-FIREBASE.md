# Deploy to Firebase (Advanced)

⚠️ **Warning**: Firebase Hosting doesn't natively support Next.js server-side features. You'll need Firebase Functions.

## 🔧 Setup Firebase Deployment

### Step 1: Install Firebase Tools

```bash
npm install -g firebase-tools
```

### Step 2: Login to Firebase

```bash
firebase login
```

### Step 3: Initialize Firebase

```bash
firebase init hosting
```

Select:
- Use an existing project or create new one
- Public directory: `out`
- Configure as single-page app: `No`
- Set up automatic builds: `No`

### Step 4: Update next.config.js

Create or update `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
```

⚠️ **Important**: This disables server-side features!

### Step 5: Build for Static Export

```bash
npm run build
```

This creates an `out` folder with static files.

### Step 6: Deploy

```bash
firebase deploy --only hosting
```

## ⚠️ Limitations with Firebase Static Export

When using `output: 'export'`, you lose:
- ❌ Server-side rendering (SSR)
- ❌ API routes
- ❌ Dynamic routes
- ❌ Image optimization
- ❌ Incremental Static Regeneration

Your app will still work but:
- All data fetching happens client-side
- Slower initial page loads
- No SEO benefits from SSR

## 🎯 Better Option: Firebase + Cloud Functions

For full Next.js support on Firebase, you need:

1. Firebase Hosting
2. Firebase Cloud Functions
3. Next.js Firebase adapter

This is complex and requires:
- Paid Firebase plan (Blaze)
- Additional configuration
- More expensive than Vercel

## 💡 Recommendation

**Use Vercel instead!**

Vercel is:
- ✅ Free
- ✅ Made for Next.js
- ✅ Zero configuration
- ✅ Automatic deployments
- ✅ Better performance

## 🚀 Quick Vercel Deploy

1. Push to GitHub
2. Go to vercel.com
3. Import your repo
4. Add environment variables
5. Deploy (done in 2 minutes!)

---

**Firebase is great for many things, but Vercel is specifically built for Next.js!**

