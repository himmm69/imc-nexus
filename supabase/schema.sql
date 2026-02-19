-- ============================================
-- IMC Nexus Database Schema
-- ============================================
-- This script creates all necessary tables, triggers, and RLS policies
-- Run this in your Supabase SQL Editor

-- ============================================
-- 1. PROFILES TABLE
-- ============================================
-- Stores user profiles linked to auth.users
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON public.profiles
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================
-- 2. TOPICS TABLE
-- ============================================
-- Stores subject topics/categories
CREATE TABLE IF NOT EXISTS public.topics (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  parent_topic_id BIGINT REFERENCES public.topics(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for topics
CREATE POLICY "Anyone can view topics"
  ON public.topics
  FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Only admins can insert topics"
  ON public.topics
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Only admins can update topics"
  ON public.topics
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Only admins can delete topics"
  ON public.topics
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================
-- 3. PAPERS TABLE
-- ============================================
-- Stores uploaded question papers
CREATE TABLE IF NOT EXISTS public.papers (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  topic_id BIGINT NOT NULL REFERENCES public.topics(id) ON DELETE CASCADE,
  year INT,
  course TEXT,
  uploader_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  file_path TEXT NOT NULL,
  mime_type TEXT,
  size_bytes BIGINT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.papers ENABLE ROW LEVEL SECURITY;

-- RLS Policies for papers
CREATE POLICY "Anyone can view approved papers"
  ON public.papers
  FOR SELECT
  TO authenticated, anon
  USING (status = 'approved');

CREATE POLICY "Users can view their own papers"
  ON public.papers
  FOR SELECT
  TO authenticated
  USING (uploader_id = auth.uid());

CREATE POLICY "Users can insert their own papers"
  ON public.papers
  FOR INSERT
  TO authenticated
  WITH CHECK (uploader_id = auth.uid());

CREATE POLICY "Only admins can update paper status"
  ON public.papers
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================
-- 4. FUNCTIONS AND TRIGGERS
-- ============================================
-- Auto-create profile when new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    'student'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 5. INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_papers_topic_id ON public.papers(topic_id);
CREATE INDEX IF NOT EXISTS idx_papers_uploader_id ON public.papers(uploader_id);
CREATE INDEX IF NOT EXISTS idx_papers_status ON public.papers(status);
CREATE INDEX IF NOT EXISTS idx_papers_year ON public.papers(year);
CREATE INDEX IF NOT EXISTS idx_topics_parent ON public.topics(parent_topic_id);

-- ============================================
-- 6. SAMPLE DATA (OPTIONAL)
-- ============================================
-- Insert some sample topics
INSERT INTO public.topics (name) VALUES
  ('Mathematics'),
  ('Physics'),
  ('Chemistry'),
  ('Biology'),
  ('Economics'),
  ('Computer Science'),
  ('English Literature'),
  ('History')
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- COMPLETION MESSAGE
-- ============================================
DO $$
BEGIN
  RAISE NOTICE 'Database schema created successfully!';
  RAISE NOTICE 'Next steps:';
  RAISE NOTICE '1. Create storage bucket: question-papers';
  RAISE NOTICE '2. Run storage-policies.sql for storage RLS';
  RAISE NOTICE '3. Manually promote first user to admin in profiles table';
END $$;
