# Quick Reference Card

## 🔗 Important URLs

| What | URL |
|------|-----|
| **Main Website** | http://localhost:3000 |
| **Admin Panel** | http://localhost:3000/admin |
| **Supabase Dashboard** | https://supabase.com/dashboard/project/oyqlwemvqbbervhmorkp |

## ⚙️ Quick Edits

### Update Streaming Links
**File**: `config/site.ts`
```typescript
socialLinks: {
  spotify: 'your-link-here',
  appleMusic: 'your-link-here',
  soundcloud: 'your-link-here',
  youtube: 'your-link-here',
  instagram: 'your-link-here',
}
```

### Change Artist Name/Tagline
**File**: `config/site.ts`
```typescript
artist: {
  name: 'YOUNG ZACK',
  tagline: 'Artist & Producer',
}
```

## 🎵 Add a Beat

1. Go to: http://localhost:3000/admin
2. Click "Add New Beat"
3. Fill form and upload files
4. Click "Add Beat"
5. Done! ✅

## 🚀 Start Dev Server

```bash
cmd /c "npm run dev"
```

Then open: http://localhost:3000

## 📁 Project Structure

```
yea/
├── app/
│   ├── page.tsx          ← Main page (everything here!)
│   └── admin/            ← Admin panel
├── components/
│   ├── beats/            ← Beat cards & filters
│   └── admin/            ← Admin forms
├── config/
│   └── site.ts           ← Update your links here!
└── supabase/
    └── schema.sql        ← Database setup
```

## 🎨 What's on the Main Page

1. **Artist Section**
   - Big name header
   - Streaming platform buttons
   
2. **Beat Store**
   - Search bar
   - Genre filters
   - Beat grid with players

## 🔧 Common Tasks

| Task | How |
|------|-----|
| Update links | Edit `config/site.ts` |
| Add beat | Go to `/admin` |
| Change colors | Edit Tailwind classes in components |
| Deploy | Push to GitHub → Import to Vercel |

## 📝 Environment Variables

**File**: `.env.local`
```
NEXT_PUBLIC_SUPABASE_URL=https://oyqlwemvqbbervhmorkp.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key-here
```

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| Can't run npm | Use `cmd /c "npm run dev"` |
| Beats not saving | Check Supabase RLS policies |
| Links not working | Update `config/site.ts` |
| Port 3000 in use | Kill process or use port 3001 |

## 📚 Documentation Files

- `FINAL-SETUP.md` - Complete setup guide
- `HOW-TO-UPDATE-LINKS.md` - Update streaming links
- `QUICKSTART.md` - Quick start guide
- `SETUP.md` - Full Supabase setup

---

**Everything you need at a glance!** 🎯

