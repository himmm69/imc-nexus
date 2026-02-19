-- ============================================
-- STORAGE BUCKET SETUP & RLS POLICIES
-- ============================================
-- Run this AFTER creating the 'question-papers' storage bucket in Supabase dashboard

-- ============================================
-- STORAGE BUCKET RLS POLICIES
-- ============================================

-- Policy 1: Authenticated users can upload to their own pending folder
CREATE POLICY "Users can upload to their pending folder"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'question-papers' AND
  (storage.foldername(name))[1] = 'pending' AND
  auth.uid()::text = (storage.foldername(name))[3]
);

-- Policy 2: Authenticated users can read their own pending uploads
CREATE POLICY "Users can read their own pending uploads"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'question-papers' AND
  (storage.foldername(name))[1] = 'pending' AND
  auth.uid()::text = (storage.foldername(name))[3]
);

-- Policy 3: Admins can read all files in question-papers bucket
CREATE POLICY "Admins can read all files"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'question-papers' AND
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Policy 4: Service role can do everything (for server-side operations)
-- This is already enabled by default, but listed here for completeness

-- ============================================
-- NOTES
-- ============================================
-- For approved paper downloads:
-- Use createSignedUrl() in the application code
-- This provides temporary, secure access to private files

-- Alternative approach (if you want approved papers fully public):
-- 1. Create an 'approved' folder in the bucket
-- 2. Make the bucket public for the 'approved' folder
-- 3. Move files from pending/ to approved/ on approval
-- However, signed URLs are recommended for better control

-- ============================================
-- COMPLETION MESSAGE
-- ============================================
DO $$
BEGIN
  RAISE NOTICE 'Storage policies created successfully!';
  RAISE NOTICE 'Make sure you have created the question-papers bucket first.';
  RAISE NOTICE 'Bucket should be set to PRIVATE (recommended).';
END $$;
