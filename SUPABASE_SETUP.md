# IMC Nexus - Supabase Setup Guide

Complete guide to transform your app into a revision platform with Supabase backend.

---

## 🚀 Quick Start

### 1. Install Dependencies

Dependencies already installed:

```bash
npm install @supabase/supabase-js
```

### 2. Supabase Project Setup

1. Create a Supabase account at [https://supabase.com](https://supabase.com)
2. Create a new project
3. Wait for the database to initialize (2-3 minutes)

### 3. Environment Variables

1. Copy `.env.example` to `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

2. Get your Supabase credentials from:
   - Project Settings → API
   - Copy `Project URL` → paste as `VITE_SUPABASE_URL`
   - Copy `anon public` key → paste as `VITE_SUPABASE_ANON_KEY`

3. Your `.env.local` should look like:
   ```env
   VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### 4. Database Setup

Run SQL scripts in Supabase SQL Editor (in order):

1. **Create Schema & Tables**
   - Open Supabase Dashboard → SQL Editor
   - Copy contents of `supabase/schema.sql`
   - Run the script
   - This creates: profiles, topics, papers tables + triggers + RLS policies

2. **Create Storage Bucket**
   - Go to Storage → Create new bucket
   - Name: `question-papers`
   - Set to **Private** (recommended)
   - Click Create

3. **Setup Storage Policies**
   - Open SQL Editor
   - Copy contents of `supabase/storage-policies.sql`
   - Run the script

### 5. Create Admin User

1. Start your dev server:

   ```bash
   npm run dev
   ```

2. Sign up at `/signup` with your email

3. In Supabase SQL Editor, run:

   ```sql
   UPDATE public.profiles
   SET role = 'admin'
   WHERE id IN (
     SELECT id FROM auth.users WHERE email = 'your-email@example.com'
   );
   ```

   Replace `your-email@example.com` with your actual email.

4. Refresh your app - you should now see the Admin link in navigation

### 6. Test the Application

1. **Public Routes** (no login required):
   - `/topics` - Browse all topics
   - `/topics/:id` - View approved papers for a topic

2. **Protected Routes** (login required):
   - `/dashboard` - View your uploads
   - `/upload-new` - Upload new papers

3. **Admin Routes** (admin role required):
   - `/admin` - Approve/reject pending papers

### 7. Deployment to Vercel

1. Push code to GitHub

2. Import to Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Add environment variables:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`

3. Deploy!

---

## 📁 File Structure

### New Files Created

```
src/
├── lib/
│   └── supabaseClient.ts          # Supabase client configuration
├── types/
│   └── supabase.ts                # Database type definitions
├── components/
│   └── ProtectedRoute.tsx         # Route protection wrapper
├── pages/
│   ├── Login.tsx                  # Email/password login
│   ├── Signup.tsx                 # User registration
│   ├── Dashboard.tsx              # User upload dashboard
│   ├── UploadNew.tsx              # Paper upload form
│   ├── Topics.tsx                 # Public topic browser
│   ├── TopicDetail.tsx            # Topic papers list
│   └── Admin.tsx                  # Admin moderation panel
└── contexts/
    └── AuthContext.tsx            # Updated for Supabase auth

supabase/
├── schema.sql                     # Database tables + triggers + RLS
├── storage-policies.sql           # Storage bucket policies
└── make-admin.sql                 # Helper to promote users to admin
```

### Modified Files

- `src/App.tsx` - Updated routing with protected routes
- `src/contexts/AuthContext.tsx` - Complete Supabase auth integration

---

## 🗃️ Database Schema

### Tables

#### **profiles**

- `id` (UUID, PK) - References auth.users
- `full_name` (TEXT)
- `role` (TEXT) - 'student' | 'admin'
- `created_at` (TIMESTAMPTZ)

#### **topics**

- `id` (BIGINT, PK)
- `name` (TEXT, UNIQUE)
- `parent_topic_id` (BIGINT, FK) - For hierarchical topics
- `created_at` (TIMESTAMPTZ)

#### **papers**

- `id` (BIGINT, PK)
- `title` (TEXT)
- `topic_id` (BIGINT, FK)
- `year` (INT)
- `course` (TEXT)
- `uploader_id` (UUID, FK)
- `file_path` (TEXT)
- `mime_type` (TEXT)
- `size_bytes` (BIGINT)
- `status` (TEXT) - 'pending' | 'approved' | 'rejected'
- `created_at` (TIMESTAMPTZ)

---

## 🔐 Security (RLS Policies)

### Profiles

- ✅ Users can view/update their own profile
- ✅ Admins can view all profiles

### Topics

- ✅ Public read access
- ✅ Admin-only create/update/delete

### Papers

- ✅ Public can view approved papers
- ✅ Users can view their own papers (any status)
- ✅ Users can upload papers
- ✅ Only admins can change status

### Storage

- ✅ Users can upload to `pending/{topicId}/{userId}/`
- ✅ Users can read their own pending uploads
- ✅ Admins can read all files
- ✅ Approved papers downloadable via signed URLs

---

## 📋 Usage Workflow

### Student Flow

1. Sign up → verify email
2. Browse topics (public)
3. Upload question paper
4. Track status in dashboard
5. Download approved papers

### Admin Flow

1. Access `/admin` panel
2. Review pending uploads
3. Preview PDF
4. Approve or reject
5. Student notified implicitly via status change

---

## 🎨 Routes Overview

### Public Routes

| Path          | Component   | Description                    |
| ------------- | ----------- | ------------------------------ |
| `/`           | HomePage    | Landing page                   |
| `/login`      | Login       | Email/password sign in         |
| `/signup`     | Signup      | New user registration          |
| `/topics`     | Topics      | Browse all topics              |
| `/topics/:id` | TopicDetail | View approved papers + filters |

### Protected Routes (Authentication Required)

| Path          | Component | Description                 |
| ------------- | --------- | --------------------------- |
| `/dashboard`  | Dashboard | View user's uploads + stats |
| `/upload-new` | UploadNew | Upload new question paper   |

### Admin Routes (Admin Role Required)

| Path     | Component | Description             |
| -------- | --------- | ----------------------- |
| `/admin` | Admin     | Moderate pending papers |

### Legacy Routes (Backward Compatible)

All old routes (`/modules`, `/notes`, `/papers`, etc.) remain functional.

---

## 🔧 Development Commands

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test
```

---

## 🚨 Common Issues & Solutions

### Issue: "Missing Supabase environment variables"

**Solution:** Ensure `.env.local` exists with correct `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. Restart dev server after adding.

### Issue: RLS policies blocking queries

**Solution:** Check Supabase logs (Dashboard → Database → Logs). Ensure:

- User is authenticated for protected operations
- Admin role is set correctly for admin operations

### Issue: File upload fails

**Solution:**

- Check bucket name is `question-papers`
- Verify storage policies are applied
- Ensure file is PDF and under 15MB

### Issue: Can't access admin panel

**Solution:** Run the `make-admin.sql` script with your email to promote your user.

### Issue: Email verification not working

**Solution:** In Supabase Dashboard → Authentication → Settings, configure email templates or disable email confirmation for testing (not recommended for production).

---

## 📦 Key Dependencies

- `@supabase/supabase-js` - Supabase client
- `@tanstack/react-query` - Data fetching & caching
- `react-router-dom` - Routing
- `shadcn/ui` - UI components
- `sonner` - Toast notifications

---

## 🎯 Next Steps

1. **Email Configuration**
   - Configure custom SMTP in Supabase
   - Customize email templates

2. **Enhanced Features**
   - Add paper ratings/reviews
   - Implement search functionality
   - Add user favorites
   - Paper download analytics

3. **Content Moderation**
   - Add rejection reasons
   - Email notifications on status change
   - Bulk approve/reject

4. **Performance**
   - Add pagination for large paper lists
   - Implement infinite scroll
   - Cache topic hierarchies

---

## 📞 Support

- Supabase Docs: [https://supabase.com/docs](https://supabase.com/docs)
- React Query Docs: [https://tanstack.com/query](https://tanstack.com/query)
- Shadcn UI: [https://ui.shadcn.com](https://ui.shadcn.com)

---

## ✅ Checklist

Setup completion checklist:

- [ ] Supabase project created
- [ ] Environment variables configured
- [ ] Database schema executed
- [ ] Storage bucket created
- [ ] Storage policies applied
- [ ] First admin user created
- [ ] Test signup/login works
- [ ] Test file upload works
- [ ] Test admin approval works
- [ ] Test public browsing works
- [ ] Deployed to Vercel

---

**Last Updated:** February 2026
**Version:** 1.0.0
