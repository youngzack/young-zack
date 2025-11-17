# Deploy to Vercel (RECOMMENDED)

The easiest and best way to deploy your Young Zack website!

## 🚀 Quick Deploy (5 Minutes)

### Step 1: Push to GitHub

If you haven't already:

```bash
git init
git add .
git commit -m "Initial commit - Young Zack website"
```

Create a new repository on GitHub:
1. Go to: https://github.com/new
2. Name it: `youngzack-website`
3. Click "Create repository"

Then push your code:

```bash
git remote add origin https://github.com/YOUR_USERNAME/youngzack-website.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to: **https://vercel.com/signup**
2. Click "Continue with GitHub"
3. Authorize Vercel

4. Click "Add New..." → "Project"
5. Find your `youngzack-website` repository
6. Click "Import"

### Step 3: Configure Environment Variables

Before deploying, add your Supabase credentials:

1. Click "Environment Variables"
2. Add these:

**Variable 1:**
- Name: `NEXT_PUBLIC_SUPABASE_URL`
- Value: `https://oyqlwemvqbbervhmorkp.supabase.co`

**Variable 2:**
- Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Value: (copy from your `.env.local` file)

3. Click "Deploy"

### Step 4: Wait for Deployment

Vercel will:
- ✅ Install dependencies
- ✅ Build your Next.js app
- ✅ Deploy to production
- ✅ Give you a live URL

**Time**: ~2 minutes

### Step 5: Your Site is Live! 🎉

You'll get a URL like:
```
https://youngzack-website.vercel.app
```

## 🎯 Add Custom Domain (Optional)

### If you have a domain (like youngzack.com):

1. Go to your Vercel project
2. Click "Settings" → "Domains"
3. Add your domain: `youngzack.com`
4. Follow the DNS instructions
5. Done!

### If you don't have a domain:

You can buy one from:
- Namecheap (~$10/year)
- Google Domains (~$12/year)
- GoDaddy (~$15/year)

Or use the free Vercel URL!

## 🔄 Automatic Deployments

Every time you push to GitHub:
- ✅ Vercel automatically rebuilds
- ✅ Deploys the new version
- ✅ Updates your live site

**To update your site:**
```bash
git add .
git commit -m "Updated beats"
git push
```

Wait 2 minutes → Your site is updated!

## 📊 Vercel Dashboard Features

- 📈 Analytics (see visitor stats)
- 🚀 Performance metrics
- 🐛 Error tracking
- 📝 Deployment logs
- 🔄 Rollback to previous versions

## 💰 Pricing

**Free Tier Includes:**
- ✅ Unlimited deployments
- ✅ Automatic SSL certificate
- ✅ 100GB bandwidth/month
- ✅ Custom domains
- ✅ Analytics

**Perfect for your beat store!**

## 🔧 Troubleshooting

### Build Failed?

Check the build logs in Vercel dashboard.

Common issues:
- Missing environment variables
- TypeScript errors
- Missing dependencies

### Environment Variables Not Working?

Make sure you added:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Both must start with `NEXT_PUBLIC_`

### Need to Redeploy?

Go to Vercel dashboard → "Deployments" → Click "Redeploy"

## 📚 Next Steps After Deployment

1. ✅ Test your live site
2. ✅ Upload beats via `/admin`
3. ✅ Update streaming links in `config/site.ts`
4. ✅ Share your site!

## 🎯 Quick Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel account created
- [ ] Repository imported to Vercel
- [ ] Environment variables added
- [ ] Deployment successful
- [ ] Site is live!
- [ ] Admin panel works
- [ ] Beats upload works
- [ ] Streaming links work

## 🆘 Need Help?

If deployment fails:
1. Check Vercel build logs
2. Make sure all files are committed to git
3. Verify environment variables are set
4. Check that `.env.local` is in `.gitignore` (don't commit it!)

---

## 🎉 Summary

**Vercel is the best choice because:**
- ✅ Made for Next.js
- ✅ Free tier is generous
- ✅ Automatic deployments
- ✅ Zero configuration
- ✅ Fast global CDN
- ✅ SSL included
- ✅ Custom domains

**Deploy now:** https://vercel.com

Your Young Zack website will be live in 5 minutes! 🚀

