-- ============================================================
-- SUPACARE — STEP 2: Create the 3 initial staff accounts
-- Run in Supabase SQL Editor AFTER Step 1
-- ============================================================

DO $$
DECLARE
  admin_id      UUID;
  supervisor_id UUID;
  enumerator_id UUID;
BEGIN

  -- ── 1. Supacare Admin ───────────────────────────────────────
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'info@supacaresolutions.com') THEN
    admin_id := gen_random_uuid();
    INSERT INTO auth.users (
      instance_id, id, aud, role,
      email, encrypted_password, email_confirmed_at,
      raw_user_meta_data, created_at, updated_at
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      admin_id, 'authenticated', 'authenticated',
      'info@supacaresolutions.com',
      crypt('Supacare2024!', gen_salt('bf')),
      NOW(),
      '{"name": "Supacare Admin", "role": "admin", "county": "Nairobi"}'::jsonb,
      NOW(), NOW()
    );
    RAISE NOTICE 'Created admin: info@supacaresolutions.com';
  ELSE
    RAISE NOTICE 'Skipped (already exists): info@supacaresolutions.com';
  END IF;

  -- ── 2. Njeri Kamau — Supervisor ────────────────────────────
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'njeri@supacaresolutions.com') THEN
    supervisor_id := gen_random_uuid();
    INSERT INTO auth.users (
      instance_id, id, aud, role,
      email, encrypted_password, email_confirmed_at,
      raw_user_meta_data, created_at, updated_at
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      supervisor_id, 'authenticated', 'authenticated',
      'njeri@supacaresolutions.com',
      crypt('Supacare2024!', gen_salt('bf')),
      NOW(),
      '{"name": "Njeri Kamau", "role": "supervisor", "county": "Nairobi"}'::jsonb,
      NOW(), NOW()
    );
    RAISE NOTICE 'Created supervisor: njeri@supacaresolutions.com';
  ELSE
    RAISE NOTICE 'Skipped (already exists): njeri@supacaresolutions.com';
  END IF;

  -- ── 3. Trizer Wanjiku — Enumerator ─────────────────────────
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'trizer@supacaresolutions.com') THEN
    enumerator_id := gen_random_uuid();
    INSERT INTO auth.users (
      instance_id, id, aud, role,
      email, encrypted_password, email_confirmed_at,
      raw_user_meta_data, created_at, updated_at
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      enumerator_id, 'authenticated', 'authenticated',
      'trizer@supacaresolutions.com',
      crypt('Supacare2024!', gen_salt('bf')),
      NOW(),
      '{"name": "Trizer Wanjiku", "role": "enumerator", "county": "Nairobi"}'::jsonb,
      NOW(), NOW()
    );
    RAISE NOTICE 'Created enumerator: trizer@supacaresolutions.com';
  ELSE
    RAISE NOTICE 'Skipped (already exists): trizer@supacaresolutions.com';
  END IF;

END $$;

-- ── Verify profiles were auto-created with staff codes ─────────
SELECT
  email,
  name,
  role,
  staff_code,
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
--   info@...   → admin      → SC-ADM-0001
--   njeri@...  → supervisor → SC-SUP-0001
--   trizer@... → enumerator → SC-ENM-0001
--
-- Password for all 3: Supacare2024!
-- ============================================================
