-- Allow admin to grant Google OAuth access to staff members
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS allow_google_auth boolean NOT NULL DEFAULT false;

-- Smart trigger: handles both staff (pre-created profiles) and new client signups
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  existing_profile RECORD;
BEGIN
  -- Check if this email was pre-created (staff case)
  SELECT * INTO existing_profile
  FROM public.profiles
  WHERE email = NEW.email
  LIMIT 1;

  IF existing_profile IS NOT NULL THEN
    -- STAFF FLOW
    IF existing_profile.allow_google_auth = false THEN
      -- Google not allowed → create profile but force inactive
      INSERT INTO public.profiles (id, email, name, role, is_active, allow_google_auth)
      VALUES (
        NEW.id,
        existing_profile.email,
        existing_profile.name,
        existing_profile.role,
        false,
        existing_profile.allow_google_auth
      )
      ON CONFLICT (id) DO NOTHING;
    ELSE
      -- Google allowed → activate
      INSERT INTO public.profiles (id, email, name, role, is_active, allow_google_auth)
      VALUES (
        NEW.id,
        existing_profile.email,
        existing_profile.name,
        existing_profile.role,
        true,
        existing_profile.allow_google_auth
      )
      ON CONFLICT (id) DO NOTHING;
    END IF;
  ELSE
    -- CLIENT FLOW (open signup)
    INSERT INTO public.profiles (id, email, name, role, is_active, allow_google_auth)
    VALUES (
      NEW.id,
      NEW.email,
      COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
      'client',
      true,
      true
    )
    ON CONFLICT (id) DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$;

-- Drop old trigger if exists, recreate cleanly
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
