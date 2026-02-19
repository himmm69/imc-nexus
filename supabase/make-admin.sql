-- ============================================
-- PROMOTE USER TO ADMIN
-- ============================================
-- Use this script to promote your first user to admin role
-- Replace 'YOUR_USER_EMAIL' with the actual email address

-- Method 1: Update by email
UPDATE public.profiles
SET role = 'admin'
WHERE id IN (
  SELECT id FROM auth.users WHERE email = 'parthgandhi6k@example.com'
);

-- Method 2: Update by user ID (if you know the UUID)
-- UPDATE public.profiles
-- SET role = 'admin'
-- WHERE id = 'your-user-uuid-here';

-- Verify the update
SELECT 
  p.id,
  u.email,
  p.full_name,
  p.role,
  p.created_at
FROM public.profiles p
JOIN auth.users u ON p.id = u.id
WHERE p.role = 'admin';
