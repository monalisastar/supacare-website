-- ============================================================
-- SUPACARE — STEP 1: Schema + Functions + RLS
-- Paste this entire file into Supabase SQL Editor → Run
-- ============================================================

-- ── 0. Extensions ────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ── Drop all existing policies (safe re-run) ─────────────────
DROP POLICY IF EXISTS "Own profile readable"         ON public.profiles;
DROP POLICY IF EXISTS "Staff can read all profiles"  ON public.profiles;
DROP POLICY IF EXISTS "Admin can manage profiles"    ON public.profiles;
DROP POLICY IF EXISTS "Staff can manage surveys"     ON public.surveys;
DROP POLICY IF EXISTS "Client reads own record"      ON public.clients;
DROP POLICY IF EXISTS "Staff manages clients"        ON public.clients;
DROP POLICY IF EXISTS "Staff manages OSWP units"     ON public.oswp_units;
DROP POLICY IF EXISTS "Client views own OSWP unit"   ON public.oswp_units;
DROP POLICY IF EXISTS "Staff manages collections"    ON public.collection_records;
DROP POLICY IF EXISTS "Supervisors manage credits"   ON public.carbon_credits;
DROP POLICY IF EXISTS "Admin manages invitations"    ON public.staff_invitations;

-- ── 1. PROFILES ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id             UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name           TEXT NOT NULL,
  email          TEXT NOT NULL,
  role           TEXT NOT NULL DEFAULT 'client'
                 CHECK (role IN ('enumerator', 'supervisor', 'admin', 'client')),
  phone          TEXT,
  county         TEXT,
  client_type    TEXT,
  staff_code     TEXT UNIQUE,
  is_active      BOOLEAN NOT NULL DEFAULT TRUE,
  created_by     UUID REFERENCES auth.users(id),
  deactivated_at TIMESTAMPTZ,
  deactivated_by UUID REFERENCES auth.users(id),
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- ── 2. SURVEYS ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.surveys (
  id              TEXT PRIMARY KEY,
  survey_date     DATE NOT NULL,
  enumerator_id   UUID REFERENCES auth.users(id),
  enumerator_name TEXT NOT NULL,
  county          TEXT NOT NULL,
  gps_latitude    DOUBLE PRECISION,
  gps_longitude   DOUBLE PRECISION,
  gps_accuracy    DOUBLE PRECISION,
  responses       JSONB NOT NULL DEFAULT '{}',
  status          TEXT NOT NULL DEFAULT 'draft'
                  CHECK (status IN ('draft', 'complete', 'synced', 'rejected')),
  notes           TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  synced_at       TIMESTAMPTZ
);
ALTER TABLE public.surveys ENABLE ROW LEVEL SECURITY;

-- ── 3. CLIENTS ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.clients (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          UUID REFERENCES auth.users(id),
  name             TEXT NOT NULL,
  type             TEXT NOT NULL,
  county           TEXT NOT NULL,
  phone            TEXT,
  email            TEXT,
  oswp_unit_id     UUID,
  join_date        DATE DEFAULT CURRENT_DATE,
  total_waste_kg   DOUBLE PRECISION DEFAULT 0,
  total_compost_kg DOUBLE PRECISION DEFAULT 0,
  credits_earned   DOUBLE PRECISION DEFAULT 0,
  status           TEXT DEFAULT 'active',
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- ── 4. OSWP UNITS ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.oswp_units (
  id                       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  serial_number            TEXT UNIQUE NOT NULL,
  client_id                UUID REFERENCES public.clients(id),
  client_name              TEXT NOT NULL,
  county                   TEXT NOT NULL,
  gps_latitude             DOUBLE PRECISION,
  gps_longitude            DOUBLE PRECISION,
  install_date             DATE NOT NULL,
  status                   TEXT DEFAULT 'active'
                           CHECK (status IN ('active', 'maintenance', 'offline', 'installed')),
  power_scenario           TEXT DEFAULT 'A' CHECK (power_scenario IN ('A', 'B', 'C')),
  total_waste_processed_kg DOUBLE PRECISION DEFAULT 0,
  last_collection          TIMESTAMPTZ,
  created_at               TIMESTAMPTZ DEFAULT NOW(),
  updated_at               TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.oswp_units ENABLE ROW LEVEL SECURITY;

-- ── 5. COLLECTION RECORDS ────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.collection_records (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  oswp_id           UUID REFERENCES public.oswp_units(id),
  client_id         UUID REFERENCES public.clients(id),
  date              DATE NOT NULL,
  waste_weight_kg   DOUBLE PRECISION NOT NULL,
  compost_output_kg DOUBLE PRECISION NOT NULL,
  enumerator_id     UUID REFERENCES auth.users(id),
  notes             TEXT,
  created_at        TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.collection_records ENABLE ROW LEVEL SECURITY;

-- ── 6. CARBON CREDITS ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.carbon_credits (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vintage          TEXT NOT NULL,
  quantity_tco2e   DOUBLE PRECISION NOT NULL,
  status           TEXT DEFAULT 'pending'
                   CHECK (status IN ('pending', 'verified', 'issued', 'retired')),
  gold_standard_id TEXT,
  period           TEXT,
  waste_processed_t DOUBLE PRECISION,
  oswp_units_active INTEGER,
  issued_at        TIMESTAMPTZ,
  price_usd        DOUBLE PRECISION,
  revenue_usd      DOUBLE PRECISION,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.carbon_credits ENABLE ROW LEVEL SECURITY;

-- ── 7. STAFF INVITATIONS ─────────────────────────────────────
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

-- ============================================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================================

-- Profiles
CREATE POLICY "Own profile readable" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Staff can read all profiles" ON public.profiles
  FOR SELECT USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid())
    IN ('enumerator','supervisor','admin')
  );

CREATE POLICY "Admin can manage profiles" ON public.profiles
  FOR ALL USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
  );

-- Surveys
CREATE POLICY "Staff can manage surveys" ON public.surveys
  FOR ALL USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid())
    IN ('enumerator','supervisor','admin')
  );

-- Clients
CREATE POLICY "Client reads own record" ON public.clients
  FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Staff manages clients" ON public.clients
  FOR ALL USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid())
    IN ('supervisor','admin')
  );

-- OSWP units
CREATE POLICY "Staff manages OSWP units" ON public.oswp_units
  FOR ALL USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid())
    IN ('enumerator','supervisor','admin')
  );
CREATE POLICY "Client views own OSWP unit" ON public.oswp_units
  FOR SELECT USING (
    client_id IN (SELECT id FROM public.clients WHERE user_id = auth.uid())
  );

-- Collection records
CREATE POLICY "Staff manages collections" ON public.collection_records
  FOR ALL USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid())
    IN ('enumerator','supervisor','admin')
  );

-- Carbon credits
CREATE POLICY "Supervisors manage credits" ON public.carbon_credits
  FOR ALL USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid())
    IN ('supervisor','admin')
  );

-- Staff invitations
CREATE POLICY "Admin manages invitations" ON public.staff_invitations
  FOR ALL USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
  );

-- ============================================================
-- FUNCTIONS
-- ============================================================

-- Generate next staff code: SC-ENM-0001, SC-SUP-0001, SC-ADM-0001
CREATE OR REPLACE FUNCTION public.next_staff_code(p_role TEXT)
RETURNS TEXT
LANGUAGE plpgsql SECURITY DEFINER
AS $$
DECLARE
  prefix   TEXT;
  next_num INTEGER;
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

  RETURN prefix || '-' || LPAD(next_num::TEXT, 4, '0');
END;
$$;

-- Auto-create profile when a new auth user is created
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  assigned_code TEXT;
  p_role        TEXT;
BEGIN
  p_role := COALESCE(NEW.raw_user_meta_data->>'role', 'client');

  -- Auto-assign staff code for non-client roles
  IF p_role <> 'client' THEN
    assigned_code := public.next_staff_code(p_role);
  END IF;

  INSERT INTO public.profiles (
    id, name, email, role, phone, county, client_type, staff_code, is_active
  ) VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.email,
    p_role,
    NEW.raw_user_meta_data->>'phone',
    NEW.raw_user_meta_data->>'county',
    NEW.raw_user_meta_data->>'clientType',
    assigned_code,
    TRUE
  )
  ON CONFLICT (id) DO NOTHING;  -- safe to re-run

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Staff activity view (used by admin Staff Management screen)
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
  COUNT(s.id)                                       AS total_surveys,
  MAX(s.created_at)                                 AS last_survey_at,
  COUNT(CASE WHEN s.status = 'synced' THEN 1 END)  AS synced_surveys,
  COUNT(CASE WHEN s.status = 'draft'  THEN 1 END)  AS draft_surveys
FROM public.profiles p
LEFT JOIN public.surveys s ON s.enumerator_id = p.id
WHERE p.role IN ('enumerator', 'supervisor', 'admin')
GROUP BY p.id, p.staff_code, p.name, p.email, p.role, p.is_active, p.county, p.created_at;

-- ============================================================
-- DONE — run STEP_2_create_staff_accounts.sql next
-- ============================================================
