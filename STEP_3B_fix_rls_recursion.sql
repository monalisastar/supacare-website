-- ============================================================
-- SUPACARE — STEP 3B: Fix infinite recursion in RLS policies
-- Run in Supabase SQL Editor — replaces ALL policies
--
-- Root cause: policies that do
--   (SELECT role FROM public.profiles WHERE id = auth.uid())
-- cause infinite recursion because that SELECT itself triggers
-- the same policies again.
--
-- Fix: a SECURITY DEFINER function bypasses RLS entirely,
-- breaking the loop. All policies now call get_my_role().
-- ============================================================

-- ── 1. Role helper function (bypasses RLS — no recursion) ───

CREATE OR REPLACE FUNCTION public.get_my_role()
RETURNS TEXT
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$;

GRANT EXECUTE ON FUNCTION public.get_my_role() TO authenticated, anon;

-- ── 2. Drop ALL existing policies (clean slate) ─────────────

DROP POLICY IF EXISTS "Own profile readable"          ON public.profiles;
DROP POLICY IF EXISTS "Staff can read all profiles"   ON public.profiles;
DROP POLICY IF EXISTS "Admin can manage profiles"     ON public.profiles;
DROP POLICY IF EXISTS "Users update own safe fields"  ON public.profiles;

DROP POLICY IF EXISTS "Staff can manage surveys"      ON public.surveys;
DROP POLICY IF EXISTS "Enumerators manage own surveys" ON public.surveys;
DROP POLICY IF EXISTS "Supervisors manage surveys"    ON public.surveys;
DROP POLICY IF EXISTS "Admins manage surveys"         ON public.surveys;

DROP POLICY IF EXISTS "Client reads own record"       ON public.clients;
DROP POLICY IF EXISTS "Staff manages clients"         ON public.clients;

DROP POLICY IF EXISTS "Staff manages OSWP units"      ON public.oswp_units;
DROP POLICY IF EXISTS "Client views own OSWP unit"    ON public.oswp_units;

DROP POLICY IF EXISTS "Staff manages collections"     ON public.collection_records;
DROP POLICY IF EXISTS "Supervisors manage credits"    ON public.carbon_credits;
DROP POLICY IF EXISTS "Admin manages invitations"     ON public.staff_invitations;
DROP POLICY IF EXISTS "Supervisors read audit log"    ON public.audit_log;

-- ── 3. PROFILES policies ────────────────────────────────────

-- Anyone can read their own row (no recursion — just uid check)
CREATE POLICY "profiles_own_select" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- Staff can read all profiles (uses helper — no recursion)
CREATE POLICY "profiles_staff_select" ON public.profiles
  FOR SELECT USING (public.get_my_role() IN ('enumerator','supervisor','admin'));

-- Users can update their own safe fields only
CREATE POLICY "profiles_own_update" ON public.profiles
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Admins have full control over all profiles
CREATE POLICY "profiles_admin_all" ON public.profiles
  FOR ALL USING (public.get_my_role() = 'admin');

-- ── 4. SURVEYS policies ─────────────────────────────────────

-- Enumerators: only their own surveys
CREATE POLICY "surveys_enumerator" ON public.surveys
  FOR ALL
  USING    (public.get_my_role() = 'enumerator' AND enumerator_id = auth.uid())
  WITH CHECK (public.get_my_role() = 'enumerator' AND enumerator_id = auth.uid());

-- Supervisors: all surveys, read + write
CREATE POLICY "surveys_supervisor" ON public.surveys
  FOR ALL USING (public.get_my_role() = 'supervisor');

-- Admins: everything
CREATE POLICY "surveys_admin" ON public.surveys
  FOR ALL USING (public.get_my_role() = 'admin');

-- ── 5. CLIENTS policies ─────────────────────────────────────

CREATE POLICY "clients_own_select" ON public.clients
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "clients_staff_all" ON public.clients
  FOR ALL USING (public.get_my_role() IN ('supervisor','admin'));

-- ── 6. OSWP UNITS policies ──────────────────────────────────

CREATE POLICY "oswp_staff_all" ON public.oswp_units
  FOR ALL USING (public.get_my_role() IN ('enumerator','supervisor','admin'));

CREATE POLICY "oswp_client_select" ON public.oswp_units
  FOR SELECT USING (
    client_id IN (SELECT id FROM public.clients WHERE user_id = auth.uid())
  );

-- ── 7. COLLECTION RECORDS policies ─────────────────────────

CREATE POLICY "collections_staff_all" ON public.collection_records
  FOR ALL USING (public.get_my_role() IN ('enumerator','supervisor','admin'));

-- ── 8. CARBON CREDITS policies ──────────────────────────────

CREATE POLICY "credits_supervisor_all" ON public.carbon_credits
  FOR ALL USING (public.get_my_role() IN ('supervisor','admin'));

-- ── 9. STAFF INVITATIONS policies ───────────────────────────

CREATE POLICY "invitations_admin_all" ON public.staff_invitations
  FOR ALL USING (public.get_my_role() = 'admin');

-- ── 10. AUDIT LOG policies ───────────────────────────────────

CREATE POLICY "audit_supervisor_select" ON public.audit_log
  FOR SELECT USING (public.get_my_role() IN ('supervisor','admin'));

-- ── 11. Verify all policies are in place ────────────────────

SELECT tablename, policyname, cmd
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- ============================================================
-- DONE — no more infinite recursion.
-- ============================================================
