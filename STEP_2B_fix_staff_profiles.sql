-- ============================================================
-- SUPACARE — STEP 2B: Fix staff names, roles and staff codes
-- Run this in Supabase SQL Editor if accounts already exist
-- but have wrong roles or names.
-- ============================================================

-- ── 1. Fix roles + names directly in profiles ───────────────

UPDATE public.profiles
SET
  name       = 'Supacare Admin',
  role       = 'admin',
  county     = 'Nairobi',
  staff_code = COALESCE(staff_code, public.next_staff_code('admin')),
  is_active  = TRUE
WHERE email = 'info@supacaresolutions.com';

UPDATE public.profiles
SET
  name       = 'Virginia Njeri',
  role       = 'supervisor',
  county     = 'Nairobi',
  staff_code = COALESCE(staff_code, public.next_staff_code('supervisor')),
  is_active  = TRUE
WHERE email = 'njeri@supacaresolutions.com';

UPDATE public.profiles
SET
  name       = 'Trizer Chepkemboi',
  role       = 'enumerator',
  county     = 'Nairobi',
  staff_code = COALESCE(staff_code, public.next_staff_code('enumerator')),
  is_active  = TRUE
WHERE email = 'trizer@supacaresolutions.com';

-- ── 2. Also fix the raw_user_meta_data in auth.users ────────
--    (this ensures role is correct on next token refresh)

UPDATE auth.users
SET raw_user_meta_data = jsonb_build_object(
  'name',   'Supacare Admin',
  'role',   'admin',
  'county', 'Nairobi'
)
WHERE email = 'info@supacaresolutions.com';

UPDATE auth.users
SET raw_user_meta_data = jsonb_build_object(
  'name',   'Virginia Njeri',
  'role',   'supervisor',
  'county', 'Nairobi'
)
WHERE email = 'njeri@supacaresolutions.com';

UPDATE auth.users
SET raw_user_meta_data = jsonb_build_object(
  'name',   'Trizer Chepkemboi',
  'role',   'enumerator',
  'county', 'Nairobi'
)
WHERE email = 'trizer@supacaresolutions.com';

-- ── 3. Verify ───────────────────────────────────────────────

SELECT
  email,
  name,
  role,
  staff_code,
  county,
  is_active
FROM public.profiles
WHERE email IN (
  'info@supacaresolutions.com',
  'njeri@supacaresolutions.com',
  'trizer@supacaresolutions.com'
)
ORDER BY role;

-- ============================================================
-- Expected:
--   info@...   → Supacare Admin    → admin      → SC-ADM-0001
--   njeri@...  → Virginia Njeri    → supervisor → SC-SUP-0001
--   trizer@... → Trizer Chepkemboi → enumerator → SC-ENM-0001
-- ============================================================
