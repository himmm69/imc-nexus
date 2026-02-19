# Quick Start Guide - 5 Minutes to Launch

## Prerequisites

✅ Dependency installed: `@supabase/supabase-js`  
✅ All code changes committed  
✅ TypeScript: 0 errors

---

## Step 1: Create Supabase Project (2 min)

1. Go to [supabase.com](https://supabase.com) → New Project
2. Wait for database initialization
3. Get credentials from Project Settings → API:
   - Copy **Project URL**
   - Copy **anon public** key

---

## Step 2: Configure Environment (30 sec)

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Step 3: Setup Database (1 min)

In Supabase Dashboard → SQL Editor:

1. **Run schema:**

   ```sql
   -- Paste contents of: supabase/schema.sql
   -- Click RUN
   ```

2. **Create storage bucket:**
   - Storage → New Bucket
   - Name: `question-papers`
   - Visibility: **Private**
   - Create

3. **Run storage policies:**
   ```sql
   -- Paste contents of: supabase/storage-policies.sql
   -- Click RUN
   ```

---

## Step 4: Test Locally (1 min)

```bash
npm run dev
```

Visit `http://localhost:5173`:

1. Go to `/signup`
2. Create account
3. Verify in Supabase Dashboard → Authentication → Users

---

## Step 5: Create Admin User (30 sec)

In Supabase SQL Editor:

```sql
UPDATE public.profiles
SET role = 'admin'
WHERE id IN (
  SELECT id FROM auth.users WHERE email = 'your-email@example.com'
);
```

Refresh app → You should see "Admin" link in nav

---

## Step 6: Deploy to Vercel (1 min)

```bash
git add .
git commit -m "Add Supabase integration"
git push
```

On Vercel:

1. Import repository
2. Environment Variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Deploy

---

## ✅ Verification Checklist

Test these features:

**Public:**

- [ ] `/login` - Sign in page loads
- [ ] `/signup` - Can create new account
- [ ] `/topics` - Shows topic list (after adding topics)

**Authenticated:**

- [ ] `/dashboard` - Shows after login
- [ ] `/upload-new` - Can upload PDF
- [ ] Upload appears in dashboard as "Pending"

**Admin:**

- [ ] `/admin` - Accessible only as admin
- [ ] Can see pending uploads
- [ ] Approve/reject works
- [ ] Approved paper visible in `/topics/:id`

---

## 🎯 Quick Commands

```bash
# Development
npm run dev

# Build
npm run build

# Preview build
npm run preview

# Check types
npm run build
```

---

## 🚨 Troubleshooting

**Issue: Missing env vars error**

- Restart dev server after adding `.env.local`

**Issue: Can't access /admin**

- Run the admin promotion SQL with your email
- Log out and log back in

**Issue: Upload fails**

- Check storage bucket is named `question-papers`
- Verify storage policies are applied

**Issue: RLS policy errors in console**

- Check user is logged in
- Verify policies ran successfully

---

## 📁 Important Files

```
.env.local              ← Your credentials (DON'T COMMIT!)
supabase/schema.sql     ← Run in Supabase SQL Editor
supabase/storage-policies.sql  ← Run after creating bucket
SUPABASE_SETUP.md       ← Full documentation
IMPLEMENTATION_SUMMARY.md  ← What was built
```

---

## 🎓 First Test Run

1. **As Student:**
   - Sign up
   - Upload a PDF to any topic
   - See "Pending" in dashboard

2. **As Admin:**
   - Go to `/admin`
   - See your upload
   - Click Approve
   - Go to `/topics/[id]` → Paper appears

3. **As Public:**
   - Log out
   - Browse `/topics`
   - Download approved paper

---

## 🔗 Routes Quick Reference

| Route         | Access | Purpose       |
| ------------- | ------ | ------------- |
| `/login`      | Public | Sign in       |
| `/signup`     | Public | Register      |
| `/topics`     | Public | Browse topics |
| `/topics/:id` | Public | View papers   |
| `/dashboard`  | Auth   | My uploads    |
| `/upload-new` | Auth   | Upload paper  |
| `/admin`      | Admin  | Moderate      |

---

**Total Setup Time:** ~5-10 minutes  
**Questions?** See `SUPABASE_SETUP.md` for detailed guide
