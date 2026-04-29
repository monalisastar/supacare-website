-- ============================================================
-- Supacare — Staff Management Additions
-- Run in Supabase SQL Editor AFTER supabase_schema.sql
-- ============================================================

-- Add staff_code and is_active to profiles
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS staff_code  TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS is_active   BOOLEAN NOT NULL DEFAULT TRUE,
  ADD COLUMN IF NOT EXISTS created_by  UUID REFERENCES auth.users(id),
  ADD COLUMN IF NOT EXISTS deactivated_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS deactivated_by UUID REFERENCES auth.users(id);

-- Staff invitations table (admin creates, staff member claims)
CREATE TABLE IF NOT EXISTS public.staff_invitations (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT NOT NULL,
  name          TEXT NOT NULL,
  role          TEXT NOT NULL CHECK (role IN ('enumerator', 'supervisor', 'admin')),
  staff_code    TEXT NOT NULL UNIQUE,
  temp_password TEXT NOT NULL,
  claimed       BOOLEAN DEFAULT FALSE,
  claimed_at    TIMESTAMPTZ,
  created_by    UUID REFERENCES auth.users(id),
  created_at    TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.staff_invitations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin manages invitations" ON public.staff_invitations
  FOR ALL USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
  );

-- Function to generate next staff code for a given role
CREATE OR REPLACE FUNCTION public.next_staff_code(p_role TEXT)
RETURNS TEXT
LANGUAGE plpgsql SECURITY DEFINER
AS $$
DECLARE
  prefix TEXT;
  next_num INTEGER;
  new_code TEXT;
BEGIN
  prefix := CASE p_role
    WHEN 'enumerator' THEN 'SC-ENM'
    WHEN 'supervisor'  THEN 'SC-SUP'
    WHEN 'admin'       THEN 'SC-ADM'
    ELSE 'SC-STF'
  END;

  SELECT COALESCE(
    MAX(CAST(split_part(staff_code, '-', 3) AS INTEGER)), 0
  ) + 1
  INTO next_num
  FROM public.profiles
  WHERE staff_code LIKE prefix || '-%';

  new_code := prefix || '-' || LPAD(next_num::TEXT, 4, '0');
  RETURN new_code;
END;
$$;

-- Update handle_new_user trigger to assign staff_code if provided
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  assigned_code TEXT;
  p_role TEXT;
BEGIN
  p_role := COALESCE(NEW.raw_user_meta_data->>'role', 'client');

  -- Only generate staff code for non-client roles
  IF p_role != 'client' THEN
    assigned_code := public.next_staff_code(p_role);
  END IF;

  INSERT INTO public.profiles (id, name, email, role, phone, county, client_type, staff_code, is_active)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.email,
    p_role,
    NEW.raw_user_meta_data->>'phone',
    NEW.raw_user_meta_data->>'county',
    NEW.raw_user_meta_data->>'clientType',
    assigned_code,
    TRUE
  );
  RETURN NEW;
END;
$$;

-- Re-create trigger with updated function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- View: staff activity summary (surveys per staff member)
CREATE OR REPLACE VIEW public.staff_activity AS
SELECT
  p.id,
  p.staff_code,
  p.name,
  p.email,
  p.role,
  p.is_active,
  p.county,
  p.created_at,
  COUNT(s.id)              AS total_surveys,
  MAX(s.created_at)        AS last_survey_at,
  COUNT(CASE WHEN s.status = 'synced' THEN 1 END) AS synced_surveys,
  COUNT(CASE WHEN s.status = 'draft'  THEN 1 END) AS draft_surveys
FROM public.profiles p
LEFT JOIN public.surveys s ON s.enumerator_id = p.id
WHERE p.role IN ('enumerator', 'supervisor', 'admin')
GROUP BY p.id, p.staff_code, p.name, p.email, p.role, p.is_active, p.county, p.created_at;

-- ============================================================
-- DONE
-- ============================================================
