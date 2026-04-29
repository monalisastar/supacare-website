-- ============================================================
-- SUPACARE — STEP 2D: Ensure profiles exist for all auth users
-- Run if accounts exist in auth.users but have no profile row.
-- ============================================================

-- Insert missing profiles (safe — won't touch existing ones)
INSERT INTO public.profiles (id, name, email, role, county, staff_code, is_active)
SELECT
  u.id,
  COALESCE(u.raw_user_meta_data->>'name', split_part(u.email, '@', 1)),
  u.email,
  COALESCE(u.raw_user_meta_data->>'role', 'client'),
  u.raw_user_meta_data->>'county',
  NULL,
  TRUE
FROM auth.users u
WHERE NOT EXISTS (
  SELECT 1 FROM public.profiles p WHERE p.id = u.id
)
ON CONFLICT (id) DO NOTHING;

-- Now force-fix the 3 staff accounts
UPDATE public.profiles SET
  name       = 'Supacare Admin',
  role       = 'admin',
  county     = 'Nairobi',
  staff_code = COALESCE(staff_code, public.next_staff_code('admin')),
  is_active  = TRUE
WHERE email = 'info@supacaresolutions.com';

UPDATE public.profiles SET
  name       = 'Virginia Njeri',
  role       = 'supervisor',
  county     = 'Nairobi',
  staff_code = COALESCE(staff_code, public.next_staff_code('supervisor')),
  is_active  = TRUE
WHERE email = 'njeri@supacaresolutions.com';

UPDATE public.profiles SET
  name       = 'Trizer Chepkemboi',
  role       = 'enumerator',
  county     = 'Nairobi',
  staff_code = COALESCE(staff_code, public.next_staff_code('enumerator')),
  is_active  = TRUE
WHERE email = 'trizer@supacaresolutions.com';

-- Verify
SELECT id, email, name, role, staff_code, is_active
FROM public.profiles
ORDER BY role, email;
