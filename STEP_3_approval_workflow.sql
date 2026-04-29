-- ============================================================
-- SUPACARE — STEP 3: Approval Workflow + Monitoring Periods
-- Run in Supabase SQL Editor AFTER Step 1 & Step 2
--
-- Implements the Gold Standard MRV approval chain:
--   Enumerator submits → Supervisor reviews → Approved/Rejected
--   Only APPROVED surveys count toward carbon credit calculations
-- ============================================================

-- ── 1. Extend surveys table ───────────────────────────────────

-- New status values: submitted, under_review, approved, rejected
-- (draft stays for local-only; synced is now called submitted)
ALTER TABLE public.surveys
  ADD COLUMN IF NOT EXISTS monitoring_period TEXT,          -- e.g. 'Baseline', 'M1-2025', 'M2-2026'
  ADD COLUMN IF NOT EXISTS approved_by       UUID REFERENCES auth.users(id),
  ADD COLUMN IF NOT EXISTS approved_at       TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS rejected_reason   TEXT,
  ADD COLUMN IF NOT EXISTS review_notes      TEXT,
  ADD COLUMN IF NOT EXISTS reviewed_by       UUID REFERENCES auth.users(id),
  ADD COLUMN IF NOT EXISTS reviewed_at       TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS section_completeness JSONB DEFAULT '{}'::jsonb;
  -- section_completeness: {"A": true, "B": true, "C": false, ...}

-- Drop the old status check and recreate with new values
ALTER TABLE public.surveys DROP CONSTRAINT IF EXISTS surveys_status_check;
ALTER TABLE public.surveys
  ADD CONSTRAINT surveys_status_check
  CHECK (status IN ('draft', 'complete', 'submitted', 'under_review', 'approved', 'rejected', 'synced'));

-- ── 2. Monitoring periods table ───────────────────────────────
-- Tracks official MRV monitoring periods for Gold Standard reporting

CREATE TABLE IF NOT EXISTS public.monitoring_periods (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL UNIQUE,          -- 'Baseline', 'M1-2025', 'M2-2026'
  label       TEXT NOT NULL,                 -- 'Baseline Survey (Jan 2025)'
  start_date  DATE NOT NULL,
  end_date    DATE NOT NULL,
  status      TEXT NOT NULL DEFAULT 'active'
              CHECK (status IN ('active', 'closed', 'verified')),
  target_surveys INTEGER,                    -- expected number of surveys
  notes       TEXT,
  created_by  UUID REFERENCES auth.users(id),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.monitoring_periods ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Staff reads periods" ON public.monitoring_periods;
DROP POLICY IF EXISTS "Admin manages periods" ON public.monitoring_periods;

CREATE POLICY "Staff reads periods" ON public.monitoring_periods
  FOR SELECT USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid())
    IN ('enumerator', 'supervisor', 'admin')
  );

CREATE POLICY "Admin manages periods" ON public.monitoring_periods
  FOR ALL USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
  );

-- ── 3. Audit log ──────────────────────────────────────────────
-- Every approve/reject/edit is logged — required for Gold Standard verification

CREATE TABLE IF NOT EXISTS public.audit_log (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type TEXT NOT NULL,              -- 'survey', 'profile', etc.
  entity_id   TEXT NOT NULL,
  action      TEXT NOT NULL,              -- 'approved', 'rejected', 'deactivated', 'edited'
  actor_id    UUID REFERENCES auth.users(id),
  actor_name  TEXT,
  actor_code  TEXT,                       -- staff_code for audit trail
  details     JSONB DEFAULT '{}'::jsonb,  -- reason, old_value, new_value, etc.
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Staff reads own audit" ON public.audit_log;
DROP POLICY IF EXISTS "Supervisor reads audit" ON public.audit_log;
DROP POLICY IF EXISTS "System writes audit" ON public.audit_log;

CREATE POLICY "Supervisor reads audit" ON public.audit_log
  FOR SELECT USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid())
    IN ('supervisor', 'admin')
  );

CREATE POLICY "Authenticated writes audit" ON public.audit_log
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- ── 4. Function: approve_survey ───────────────────────────────

CREATE OR REPLACE FUNCTION public.approve_survey(
  p_survey_id    TEXT,
  p_review_notes TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  caller_role TEXT;
  caller_name TEXT;
  caller_code TEXT;
BEGIN
  SELECT role, name, staff_code
  INTO caller_role, caller_name, caller_code
  FROM public.profiles WHERE id = auth.uid();

  IF caller_role NOT IN ('supervisor', 'admin') THEN
    RAISE EXCEPTION 'Permission denied: only supervisors and admins can approve surveys.';
  END IF;

  UPDATE public.surveys SET
    status       = 'approved',
    approved_by  = auth.uid(),
    approved_at  = NOW(),
    reviewed_by  = auth.uid(),
    reviewed_at  = NOW(),
    review_notes = p_review_notes,
    updated_at   = NOW()
  WHERE id = p_survey_id
    AND status IN ('submitted', 'under_review', 'complete', 'synced');

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Survey not found or not in a reviewable state.';
  END IF;

  -- Write audit log
  INSERT INTO public.audit_log (entity_type, entity_id, action, actor_id, actor_name, actor_code, details)
  VALUES ('survey', p_survey_id, 'approved', auth.uid(), caller_name, caller_code,
    jsonb_build_object('review_notes', p_review_notes));

  RETURN jsonb_build_object('success', true, 'status', 'approved');
END;
$$;

GRANT EXECUTE ON FUNCTION public.approve_survey(TEXT, TEXT) TO authenticated;

-- ── 5. Function: reject_survey ────────────────────────────────

CREATE OR REPLACE FUNCTION public.reject_survey(
  p_survey_id      TEXT,
  p_reason         TEXT,
  p_review_notes   TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  caller_role TEXT;
  caller_name TEXT;
  caller_code TEXT;
BEGIN
  SELECT role, name, staff_code
  INTO caller_role, caller_name, caller_code
  FROM public.profiles WHERE id = auth.uid();

  IF caller_role NOT IN ('supervisor', 'admin') THEN
    RAISE EXCEPTION 'Permission denied: only supervisors and admins can reject surveys.';
  END IF;

  IF p_reason IS NULL OR trim(p_reason) = '' THEN
    RAISE EXCEPTION 'A rejection reason is required for the audit trail.';
  END IF;

  UPDATE public.surveys SET
    status          = 'rejected',
    rejected_reason = p_reason,
    reviewed_by     = auth.uid(),
    reviewed_at     = NOW(),
    review_notes    = p_review_notes,
    updated_at      = NOW()
  WHERE id = p_survey_id
    AND status IN ('submitted', 'under_review', 'complete', 'synced', 'approved');

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Survey not found.';
  END IF;

  INSERT INTO public.audit_log (entity_type, entity_id, action, actor_id, actor_name, actor_code, details)
  VALUES ('survey', p_survey_id, 'rejected', auth.uid(), caller_name, caller_code,
    jsonb_build_object('reason', p_reason, 'review_notes', p_review_notes));

  RETURN jsonb_build_object('success', true, 'status', 'rejected');
END;
$$;

GRANT EXECUTE ON FUNCTION public.reject_survey(TEXT, TEXT, TEXT) TO authenticated;

-- ── 6. Seed: initial monitoring period ────────────────────────

INSERT INTO public.monitoring_periods (name, label, start_date, end_date, status, notes)
VALUES
  ('Baseline', 'Baseline Survey 2025', '2025-01-01', '2025-12-31', 'active',
   'Gold Standard baseline data collection for initial PDD submission'),
  ('M1-2026',  'Monitoring Period 1 — 2026', '2026-01-01', '2026-12-31', 'active',
   'First annual monitoring period post-registration')
ON CONFLICT (name) DO NOTHING;

-- ── 7. Updated staff_activity view (include pending count) ────
-- Must DROP first — PostgreSQL won't rename columns via CREATE OR REPLACE VIEW

DROP VIEW IF EXISTS public.staff_activity;

CREATE VIEW public.staff_activity AS
SELECT
  p.id,
  p.staff_code,
  p.name,
  p.email,
  p.role,
  p.is_active,
  p.county,
  p.created_at,
  COUNT(s.id)                                             AS total_surveys,
  MAX(s.created_at)                                       AS last_survey_at,
  COUNT(CASE WHEN s.status = 'approved'  THEN 1 END)     AS approved_surveys,
  COUNT(CASE WHEN s.status = 'submitted' OR
                  s.status = 'complete'  OR
                  s.status = 'synced'   THEN 1 END)      AS pending_review,
  COUNT(CASE WHEN s.status = 'rejected'  THEN 1 END)     AS rejected_surveys,
  COUNT(CASE WHEN s.status = 'draft'     THEN 1 END)     AS draft_surveys
FROM public.profiles p
LEFT JOIN public.surveys s ON s.enumerator_id = p.id
WHERE p.role IN ('enumerator', 'supervisor', 'admin')
GROUP BY p.id, p.staff_code, p.name, p.email, p.role, p.is_active, p.county, p.created_at;

-- ============================================================
-- DONE — Run STEP_1 first, then STEP_2, then this file
-- ============================================================
