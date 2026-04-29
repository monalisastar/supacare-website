-- ============================================================
-- SUPACARE — STEP 2C: Pin admin email to admin role forever
-- Run in Supabase SQL Editor
--
-- Creates a trigger that makes it physically impossible for
-- info@supacaresolutions.com to ever have any role other than
-- 'admin', regardless of what code or SQL tries to set it.
-- ============================================================

-- ── 1. Trigger function ─────────────────────────────────────

CREATE OR REPLACE FUNCTION public.enforce_pinned_roles()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- info@ is always admin, no exceptions
  IF NEW.email = 'info@supacaresolutions.com' THEN
    NEW.role      := 'admin';
    NEW.is_active := TRUE;
  END IF;

  -- njeri@ is always supervisor minimum
  IF NEW.email = 'njeri@supacaresolutions.com' AND NEW.role = 'client' THEN
    NEW.role := 'supervisor';
  END IF;

  -- trizer@ is always enumerator minimum
  IF NEW.email = 'trizer@supacaresolutions.com' AND NEW.role = 'client' THEN
    NEW.role := 'enumerator';
  END IF;

  RETURN NEW;
END;
$$;

-- ── 2. Attach to profiles on both INSERT and UPDATE ─────────

DROP TRIGGER IF EXISTS trg_enforce_pinned_roles ON public.profiles;
CREATE TRIGGER trg_enforce_pinned_roles
  BEFORE INSERT OR UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.enforce_pinned_roles();

-- ── 3. Apply immediately — fix any existing wrong roles ─────

UPDATE public.profiles SET role = 'admin',      is_active = TRUE
  WHERE email = 'info@supacaresolutions.com';

UPDATE public.profiles SET role = 'supervisor', is_active = TRUE
  WHERE email = 'njeri@supacaresolutions.com'  AND role = 'client';

UPDATE public.profiles SET role = 'enumerator', is_active = TRUE
  WHERE email = 'trizer@supacaresolutions.com' AND role = 'client';

-- ── 4. Verify ───────────────────────────────────────────────

SELECT email, name, role, staff_code, is_active
FROM public.profiles
WHERE email IN (
  'info@supacaresolutions.com',
  'njeri@supacaresolutions.com',
  'trizer@supacaresolutions.com'
)
ORDER BY role;

-- ============================================================
-- From this point on, even if a bug in the app or a bad SQL
-- query tries to set info@ to 'client', the trigger silently
-- corrects it back to 'admin' before the row is saved.
-- ============================================================
