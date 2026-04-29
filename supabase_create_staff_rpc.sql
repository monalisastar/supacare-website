-- ============================================================
-- Supacare — create_staff_member RPC
-- Run in Supabase SQL Editor AFTER supabase_staff_additions.sql
--
-- This function lets the mobile admin app create new staff
-- accounts directly without needing the service-role key.
-- It runs as SECURITY DEFINER (with elevated privileges) and
-- is restricted to callers whose profile role = 'admin'.
-- ============================================================

CREATE OR REPLACE FUNCTION public.create_staff_member(
  p_email    TEXT,
  p_name     TEXT,
  p_role     TEXT,
  p_county   TEXT,
  p_password TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  caller_role TEXT;
  new_user_id UUID;
  new_code    TEXT;
BEGIN
  -- ── 1. Verify caller is admin ───────────────────────────
  SELECT role INTO caller_role
  FROM public.profiles
  WHERE id = auth.uid();

  IF caller_role IS DISTINCT FROM 'admin' THEN
    RAISE EXCEPTION 'Permission denied: only admins can create staff accounts.';
  END IF;

  -- ── 2. Validate role ────────────────────────────────────
  IF p_role NOT IN ('enumerator', 'supervisor', 'admin') THEN
    RAISE EXCEPTION 'Invalid role: %. Must be enumerator, supervisor, or admin.', p_role;
  END IF;

  -- ── 3. Generate staff code ──────────────────────────────
  new_code := public.next_staff_code(p_role);

  -- ── 4. Create the auth user ─────────────────────────────
  -- Uses the internal Supabase admin function (requires SECURITY DEFINER + pg_net or auth schema access)
  -- NOTE: This uses auth.users directly. Works only if the function has superuser-equivalent privileges.
  -- If this raises "permission denied for table users", run the script via service role key instead.
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_user_meta_data,
    created_at,
    updated_at
  )
  VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    p_email,
    crypt(p_password, gen_salt('bf')),
    NOW(),
    jsonb_build_object(
      'name',    p_name,
      'role',    p_role,
      'county',  p_county
    ),
    NOW(),
    NOW()
  )
  RETURNING id INTO new_user_id;

  -- ── 5. Profile is auto-created by the handle_new_user trigger.
  --       But we also set staff_code, county, created_by here to be sure.
  UPDATE public.profiles
  SET
    staff_code = new_code,
    county     = p_county,
    created_by = auth.uid()
  WHERE id = new_user_id;

  -- ── 6. Return the generated staff code ──────────────────
  RETURN jsonb_build_object(
    'staff_code', new_code,
    'user_id',    new_user_id
  );

EXCEPTION
  WHEN unique_violation THEN
    RAISE EXCEPTION 'An account with email % already exists.', p_email;
END;
$$;

-- Grant execute to authenticated role (only admins can call per the internal check)
GRANT EXECUTE ON FUNCTION public.create_staff_member(TEXT, TEXT, TEXT, TEXT, TEXT)
  TO authenticated;

-- ============================================================
-- DONE
-- ============================================================
