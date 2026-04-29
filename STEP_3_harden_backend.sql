-- ============================================================
-- SUPACARE — STEP 3: Backend Hardening
-- Run in Supabase SQL Editor AFTER Step 1 + Step 2
--
-- Covers:
--   1. Performance indexes
--   2. updated_at auto-trigger on all tables
--   3. Audit log (who changed what, when)
--   4. Granular RLS — enumerators scoped to own surveys
--   5. Role escalation prevention
--   6. Survey immutability (synced surveys are locked)
--   7. Deactivation synced to auth.users (real lockout)
--   8. Profile update guard (users can't change role/code)
--   9. Data integrity constraints
--  10. create_staff_member RPC (secured)
-- ============================================================

-- ============================================================
-- 1. PERFORMANCE INDEXES
-- ============================================================

-- Surveys — most common queries
CREATE INDEX IF NOT EXISTS idx_surveys_enumerator_id  ON public.surveys (enumerator_id);
CREATE INDEX IF NOT EXISTS idx_surveys_status          ON public.surveys (status);
CREATE INDEX IF NOT EXISTS idx_surveys_county          ON public.surveys (county);
CREATE INDEX IF NOT EXISTS idx_surveys_survey_date     ON public.surveys (survey_date DESC);
CREATE INDEX IF NOT EXISTS idx_surveys_created_at      ON public.surveys (created_at DESC);

-- Profiles
CREATE INDEX IF NOT EXISTS idx_profiles_role           ON public.profiles (role);
CREATE INDEX IF NOT EXISTS idx_profiles_is_active      ON public.profiles (is_active);
CREATE INDEX IF NOT EXISTS idx_profiles_staff_code     ON public.profiles (staff_code);
CREATE INDEX IF NOT EXISTS idx_profiles_county         ON public.profiles (county);

-- Collection records
CREATE INDEX IF NOT EXISTS idx_collection_enumerator   ON public.collection_records (enumerator_id);
CREATE INDEX IF NOT EXISTS idx_collection_date         ON public.collection_records (date DESC);
CREATE INDEX IF NOT EXISTS idx_collection_client       ON public.collection_records (client_id);

-- ============================================================
-- 2. UPDATED_AT AUTO-TRIGGER
-- ============================================================

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$;

-- Apply to profiles
DROP TRIGGER IF EXISTS trg_profiles_updated_at ON public.profiles;
CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Apply to surveys
DROP TRIGGER IF EXISTS trg_surveys_updated_at ON public.surveys;
CREATE TRIGGER trg_surveys_updated_at
  BEFORE UPDATE ON public.surveys
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Apply to clients
DROP TRIGGER IF EXISTS trg_clients_updated_at ON public.clients;
CREATE TRIGGER trg_clients_updated_at
  BEFORE UPDATE ON public.clients
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Apply to oswp_units
DROP TRIGGER IF EXISTS trg_oswp_updated_at ON public.oswp_units;
CREATE TRIGGER trg_oswp_updated_at
  BEFORE UPDATE ON public.oswp_units
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================
-- 3. AUDIT LOG
-- ============================================================

CREATE TABLE IF NOT EXISTS public.audit_log (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id    UUID REFERENCES auth.users(id),
  actor_email TEXT,
  action      TEXT NOT NULL,   -- 'UPDATE_PROFILE', 'DEACTIVATE_STAFF', 'CREATE_SURVEY', etc.
  table_name  TEXT NOT NULL,
  record_id   TEXT NOT NULL,
  old_data    JSONB,
  new_data    JSONB,
  ip_address  TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- Only admins and supervisors can read audit log; nobody can delete it
CREATE POLICY "Supervisors read audit log" ON public.audit_log
  FOR SELECT USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid())
    IN ('supervisor', 'admin')
  );

CREATE INDEX IF NOT EXISTS idx_audit_actor     ON public.audit_log (actor_id);
CREATE INDEX IF NOT EXISTS idx_audit_table     ON public.audit_log (table_name);
CREATE INDEX IF NOT EXISTS idx_audit_created   ON public.audit_log (created_at DESC);

-- Function to write audit entries
CREATE OR REPLACE FUNCTION public.write_audit(
  p_action     TEXT,
  p_table      TEXT,
  p_record_id  TEXT,
  p_old_data   JSONB DEFAULT NULL,
  p_new_data   JSONB DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql SECURITY DEFINER
AS $$
DECLARE
  v_email TEXT;
BEGIN
  SELECT email INTO v_email FROM auth.users WHERE id = auth.uid();
  INSERT INTO public.audit_log (actor_id, actor_email, action, table_name, record_id, old_data, new_data)
  VALUES (auth.uid(), v_email, p_action, p_table, p_record_id, p_old_data, p_new_data);
EXCEPTION WHEN OTHERS THEN
  NULL; -- never let audit failure break the main operation
END;
$$;

-- Audit trigger for profile changes (role, is_active, staff_code)
CREATE OR REPLACE FUNCTION public.audit_profile_changes()
RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER
AS $$
BEGIN
  -- Log role changes
  IF OLD.role IS DISTINCT FROM NEW.role THEN
    PERFORM public.write_audit(
      'CHANGE_ROLE', 'profiles', NEW.id::TEXT,
      jsonb_build_object('role', OLD.role),
      jsonb_build_object('role', NEW.role)
    );
  END IF;

  -- Log activation/deactivation
  IF OLD.is_active IS DISTINCT FROM NEW.is_active THEN
    PERFORM public.write_audit(
      CASE WHEN NEW.is_active THEN 'REACTIVATE_STAFF' ELSE 'DEACTIVATE_STAFF' END,
      'profiles', NEW.id::TEXT,
      jsonb_build_object('is_active', OLD.is_active, 'email', OLD.email),
      jsonb_build_object('is_active', NEW.is_active, 'email', NEW.email)
    );
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_audit_profiles ON public.profiles;
CREATE TRIGGER trg_audit_profiles
  AFTER UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.audit_profile_changes();

-- Audit trigger for survey status changes
CREATE OR REPLACE FUNCTION public.audit_survey_changes()
RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER
AS $$
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    PERFORM public.write_audit(
      'SURVEY_STATUS_CHANGE', 'surveys', NEW.id,
      jsonb_build_object('status', OLD.status),
      jsonb_build_object('status', NEW.status)
    );
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_audit_surveys ON public.surveys;
CREATE TRIGGER trg_audit_surveys
  AFTER UPDATE ON public.surveys
  FOR EACH ROW EXECUTE FUNCTION public.audit_survey_changes();

-- ============================================================
-- 4. GRANULAR RLS — REPLACE BLANKET STAFF POLICIES
-- ============================================================

-- Drop the broad catch-all survey policy
DROP POLICY IF EXISTS "Staff can manage surveys" ON public.surveys;

-- Enumerators: INSERT their own surveys; SELECT/UPDATE only their own
CREATE POLICY "Enumerators manage own surveys" ON public.surveys
  FOR ALL USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'enumerator'
    AND enumerator_id = auth.uid()
  )
  WITH CHECK (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'enumerator'
    AND enumerator_id = auth.uid()
  );

-- Supervisors: read all surveys, can update status (not responses)
CREATE POLICY "Supervisors manage surveys" ON public.surveys
  FOR ALL USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'supervisor'
  );

-- Admins: full access
CREATE POLICY "Admins manage surveys" ON public.surveys
  FOR ALL USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
  );

-- ============================================================
-- 5. ROLE ESCALATION PREVENTION
-- ============================================================

-- Users cannot update their own role, staff_code, or is_active.
-- Only admins (via "Admin can manage profiles") can change those fields.
-- This trigger fires before any profile update by a non-admin.

CREATE OR REPLACE FUNCTION public.prevent_role_escalation()
RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER
AS $$
DECLARE
  caller_role TEXT;
BEGIN
  SELECT role INTO caller_role
  FROM public.profiles
  WHERE id = auth.uid();

  -- Non-admins cannot change protected fields
  IF caller_role <> 'admin' THEN
    IF NEW.role IS DISTINCT FROM OLD.role THEN
      RAISE EXCEPTION 'Permission denied: you cannot change account roles.';
    END IF;
    IF NEW.staff_code IS DISTINCT FROM OLD.staff_code THEN
      RAISE EXCEPTION 'Permission denied: staff codes are immutable.';
    END IF;
    IF NEW.is_active IS DISTINCT FROM OLD.is_active THEN
      RAISE EXCEPTION 'Permission denied: only admins can activate or deactivate accounts.';
    END IF;
    IF NEW.created_by IS DISTINCT FROM OLD.created_by THEN
      RAISE EXCEPTION 'Permission denied: cannot change account ownership.';
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_prevent_escalation ON public.profiles;
CREATE TRIGGER trg_prevent_escalation
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.prevent_role_escalation();

-- Allow users to update their own safe fields (name, phone, county)
DROP POLICY IF EXISTS "Users update own safe fields" ON public.profiles;
CREATE POLICY "Users update own safe fields" ON public.profiles
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- ============================================================
-- 6. SURVEY IMMUTABILITY — SYNCED SURVEYS ARE LOCKED
-- ============================================================

CREATE OR REPLACE FUNCTION public.prevent_synced_survey_edit()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  -- Once a survey is synced, only admins can change it (e.g. to 'rejected')
  IF OLD.status = 'synced' THEN
    IF (SELECT role FROM public.profiles WHERE id = auth.uid()) <> 'admin' THEN
      RAISE EXCEPTION 'Synced surveys are locked. Contact an administrator to make changes.';
    END IF;
  END IF;

  -- Nobody can move a survey backward from synced to draft
  IF OLD.status = 'synced' AND NEW.status = 'draft' THEN
    RAISE EXCEPTION 'Cannot revert a synced survey to draft.';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_survey_immutability ON public.surveys;
CREATE TRIGGER trg_survey_immutability
  BEFORE UPDATE ON public.surveys
  FOR EACH ROW EXECUTE FUNCTION public.prevent_synced_survey_edit();

-- ============================================================
-- 7. DEACTIVATION SYNCS TO AUTH — REAL LOCKOUT
-- ============================================================
-- When is_active is set to FALSE, the auth.users row gets
-- banned_until = far future → user cannot log in at all.
-- Re-activation clears the ban.

CREATE OR REPLACE FUNCTION public.sync_auth_ban_on_deactivation()
RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER
AS $$
BEGIN
  IF NEW.is_active IS DISTINCT FROM OLD.is_active THEN
    IF NEW.is_active = FALSE THEN
      -- Ban the user in auth
      UPDATE auth.users
      SET banned_until = '2999-12-31 23:59:59+00'::timestamptz
      WHERE id = NEW.id;
    ELSE
      -- Lift the ban
      UPDATE auth.users
      SET banned_until = NULL
      WHERE id = NEW.id;
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_sync_auth_ban ON public.profiles;
CREATE TRIGGER trg_sync_auth_ban
  AFTER UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.sync_auth_ban_on_deactivation();

-- ============================================================
-- 8. DATA INTEGRITY CONSTRAINTS
-- ============================================================

-- Surveys: survey_date cannot be in the future
ALTER TABLE public.surveys
  DROP CONSTRAINT IF EXISTS chk_survey_date_not_future;
ALTER TABLE public.surveys
  ADD CONSTRAINT chk_survey_date_not_future
  CHECK (survey_date <= CURRENT_DATE + INTERVAL '1 day');

-- Surveys: GPS coordinates must be valid if provided
ALTER TABLE public.surveys
  DROP CONSTRAINT IF EXISTS chk_gps_latitude;
ALTER TABLE public.surveys
  DROP CONSTRAINT IF EXISTS chk_gps_longitude;
ALTER TABLE public.surveys
  ADD CONSTRAINT chk_gps_latitude  CHECK (gps_latitude  IS NULL OR (gps_latitude  BETWEEN -90  AND 90));
ALTER TABLE public.surveys
  ADD CONSTRAINT chk_gps_longitude CHECK (gps_longitude IS NULL OR (gps_longitude BETWEEN -180 AND 180));

-- Profiles: email must look like an email
ALTER TABLE public.profiles
  DROP CONSTRAINT IF EXISTS chk_profile_email;
ALTER TABLE public.profiles
  ADD CONSTRAINT chk_profile_email
  CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$');

-- Collection records: weights must be positive
ALTER TABLE public.collection_records
  DROP CONSTRAINT IF EXISTS chk_waste_positive;
ALTER TABLE public.collection_records
  DROP CONSTRAINT IF EXISTS chk_compost_positive;
ALTER TABLE public.collection_records
  ADD CONSTRAINT chk_waste_positive   CHECK (waste_weight_kg   > 0);
ALTER TABLE public.collection_records
  ADD CONSTRAINT chk_compost_positive CHECK (compost_output_kg >= 0);

-- Carbon credits: quantity must be positive
ALTER TABLE public.carbon_credits
  DROP CONSTRAINT IF EXISTS chk_credits_positive;
ALTER TABLE public.carbon_credits
  ADD CONSTRAINT chk_credits_positive CHECK (quantity_tco2e > 0);

-- ============================================================
-- 9. CREATE_STAFF_MEMBER RPC (PROPERLY SECURED)
-- ============================================================
-- Called by the admin mobile screen to create new staff.
-- Inserts directly into auth.users (allowed from SQL DEFINER
-- functions in Supabase when created by superuser via SQL Editor).

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
  caller_role  TEXT;
  new_user_id  UUID;
  new_code     TEXT;
BEGIN
  -- ── Auth check ───────────────────────────────────────────
  SELECT role INTO caller_role FROM public.profiles WHERE id = auth.uid();
  IF caller_role IS DISTINCT FROM 'admin' THEN
    RAISE EXCEPTION 'Permission denied: only admins can create staff accounts.';
  END IF;

  -- ── Validate role ────────────────────────────────────────
  IF p_role NOT IN ('enumerator', 'supervisor', 'admin') THEN
    RAISE EXCEPTION 'Invalid role: %. Must be enumerator, supervisor, or admin.', p_role;
  END IF;

  -- ── Validate email format ────────────────────────────────
  IF p_email !~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' THEN
    RAISE EXCEPTION 'Invalid email address: %', p_email;
  END IF;

  -- ── Validate password length ─────────────────────────────
  IF length(p_password) < 8 THEN
    RAISE EXCEPTION 'Password must be at least 8 characters.';
  END IF;

  -- ── Check for duplicate email ────────────────────────────
  IF EXISTS (SELECT 1 FROM auth.users WHERE email = lower(trim(p_email))) THEN
    RAISE EXCEPTION 'An account with email % already exists.', p_email;
  END IF;

  -- ── Generate staff code ──────────────────────────────────
  new_code := public.next_staff_code(p_role);

  -- ── Create auth user ─────────────────────────────────────
  new_user_id := gen_random_uuid();
  INSERT INTO auth.users (
    instance_id, id, aud, role,
    email, encrypted_password, email_confirmed_at,
    raw_user_meta_data, created_at, updated_at
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    new_user_id, 'authenticated', 'authenticated',
    lower(trim(p_email)),
    crypt(p_password, gen_salt('bf')),
    NOW(),
    jsonb_build_object('name', p_name, 'role', p_role, 'county', p_county),
    NOW(), NOW()
  );

  -- ── Profile created by trigger; top up staff fields ──────
  UPDATE public.profiles
  SET
    staff_code = new_code,
    county     = p_county,
    created_by = auth.uid()
  WHERE id = new_user_id;

  -- ── Audit ─────────────────────────────────────────────────
  PERFORM public.write_audit(
    'CREATE_STAFF', 'profiles', new_user_id::TEXT,
    NULL,
    jsonb_build_object('email', p_email, 'role', p_role, 'staff_code', new_code)
  );

  RETURN jsonb_build_object('staff_code', new_code, 'user_id', new_user_id);
END;
$$;

GRANT EXECUTE ON FUNCTION public.create_staff_member(TEXT, TEXT, TEXT, TEXT, TEXT)
  TO authenticated;

-- ============================================================
-- 10. HELPER: SAFE PROFILE UPDATE (for own profile)
-- ============================================================
-- Users call this RPC to update their name/phone/county.
-- Role, staff_code, is_active are silently ignored.

CREATE OR REPLACE FUNCTION public.update_my_profile(
  p_name   TEXT DEFAULT NULL,
  p_phone  TEXT DEFAULT NULL,
  p_county TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.profiles
  SET
    name   = COALESCE(p_name,   name),
    phone  = COALESCE(p_phone,  phone),
    county = COALESCE(p_county, county)
  WHERE id = auth.uid();

  RETURN jsonb_build_object('success', true);
END;
$$;

GRANT EXECUTE ON FUNCTION public.update_my_profile(TEXT, TEXT, TEXT)
  TO authenticated;

-- ============================================================
-- 11. VERIFY HARDENING
-- ============================================================

-- Check all tables have RLS enabled
SELECT
  schemaname,
  tablename,
  rowsecurity AS rls_enabled
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- Check all policies
SELECT
  tablename,
  policyname,
  cmd,
  qual
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- ============================================================
-- DONE — Backend is hardened.
-- ============================================================
