-- ============================================================
-- Supacare Solutions — Supabase Database Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- ── PROFILES (extends auth.users) ────────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  role        TEXT NOT NULL DEFAULT 'client'
              CHECK (role IN ('enumerator', 'supervisor', 'admin', 'client')),
  phone       TEXT,
  county      TEXT,
  client_type TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- ── SURVEYS ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.surveys (
  id               TEXT PRIMARY KEY,
  survey_date      DATE NOT NULL,
  enumerator_id    UUID REFERENCES auth.users(id),
  enumerator_name  TEXT NOT NULL,
  county           TEXT NOT NULL,
  gps_latitude     DOUBLE PRECISION,
  gps_longitude    DOUBLE PRECISION,
  gps_accuracy     DOUBLE PRECISION,
  responses        JSONB NOT NULL DEFAULT '{}',
  status           TEXT NOT NULL DEFAULT 'draft'
                   CHECK (status IN ('draft', 'complete', 'synced', 'rejected')),
  notes            TEXT,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW(),
  synced_at        TIMESTAMPTZ
);
ALTER TABLE public.surveys ENABLE ROW LEVEL SECURITY;

-- ── CLIENTS ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.clients (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id               UUID REFERENCES auth.users(id),
  name                  TEXT NOT NULL,
  type                  TEXT NOT NULL,
  county                TEXT NOT NULL,
  phone                 TEXT,
  email                 TEXT,
  oswp_unit_id          UUID,
  join_date             DATE DEFAULT CURRENT_DATE,
  total_waste_kg        DOUBLE PRECISION DEFAULT 0,
  total_compost_kg      DOUBLE PRECISION DEFAULT 0,
  credits_earned        DOUBLE PRECISION DEFAULT 0,
  status                TEXT DEFAULT 'active',
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- ── OSWP UNITS ────────────────────────────────────────────────
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

-- ── COLLECTION RECORDS ────────────────────────────────────────
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

-- ── CARBON CREDITS ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.carbon_credits (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vintage             TEXT NOT NULL,
  quantity_tco2e      DOUBLE PRECISION NOT NULL,
  status              TEXT DEFAULT 'pending'
                      CHECK (status IN ('pending', 'verified', 'issued', 'retired')),
  gold_standard_id    TEXT,
  period              TEXT,
  waste_processed_t   DOUBLE PRECISION,
  oswp_units_active   INTEGER,
  issued_at           TIMESTAMPTZ,
  price_usd           DOUBLE PRECISION,
  revenue_usd         DOUBLE PRECISION,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.carbon_credits ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================================

-- Profiles
CREATE POLICY "Own profile readable" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Staff can read all profiles" ON public.profiles
  FOR SELECT USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) IN ('enumerator','supervisor','admin')
  );

CREATE POLICY "Admin can manage profiles" ON public.profiles
  FOR ALL USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
  );

-- Surveys: only staff can create/read
CREATE POLICY "Staff can manage surveys" ON public.surveys
  FOR ALL USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) IN ('enumerator','supervisor','admin')
  );

-- Clients: own data readable by the client user; staff can manage all
CREATE POLICY "Client reads own record" ON public.clients
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Staff manages clients" ON public.clients
  FOR ALL USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) IN ('supervisor','admin')
  );

-- OSWP units: staff only
CREATE POLICY "Staff manages OSWP units" ON public.oswp_units
  FOR ALL USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) IN ('enumerator','supervisor','admin')
  );

CREATE POLICY "Client views own OSWP unit" ON public.oswp_units
  FOR SELECT USING (
    client_id IN (SELECT id FROM public.clients WHERE user_id = auth.uid())
  );

-- Collection records: staff only
CREATE POLICY "Staff manages collections" ON public.collection_records
  FOR ALL USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) IN ('enumerator','supervisor','admin')
  );

-- Carbon credits: supervisor/admin only
CREATE POLICY "Supervisors manage credits" ON public.carbon_credits
  FOR ALL USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) IN ('supervisor','admin')
  );

-- ============================================================
-- AUTO-CREATE PROFILE ON SIGN UP
-- ============================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, role, phone, county, client_type)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'client'),
    NEW.raw_user_meta_data->>'phone',
    NEW.raw_user_meta_data->>'county',
    NEW.raw_user_meta_data->>'clientType'
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- DONE — verify with: SELECT * FROM public.profiles;
-- ============================================================
