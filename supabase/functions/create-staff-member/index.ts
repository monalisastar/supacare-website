/**
 * Supabase Edge Function — create-staff-member
 *
 * Creates a new Supabase Auth user with the admin API (service role key),
 * then waits for the handle_new_user trigger to fire and returns the
 * auto-generated staff code.
 *
 * Deploy with:
 *   npx supabase functions deploy create-staff-member --project-ref pgedfrusyfyalnsjjpkq
 *
 * The mobile app calls this via:
 *   supabase.functions.invoke('create-staff-member', { body: { ... } })
 *
 * Security: caller's JWT is verified — only 'admin' role can proceed.
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req: Request) => {
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl          = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey   = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabaseAnonKey      = Deno.env.get('SUPABASE_ANON_KEY')!;

    // ── 1. Verify caller is an admin ───────────────────────────────────────────
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) throw new Error('Missing Authorization header');

    // Use the caller's JWT to identify them
    const supabaseUser = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
      auth:   { persistSession: false, autoRefreshToken: false },
    });

    const { data: { user }, error: userError } = await supabaseUser.auth.getUser();
    if (userError || !user) throw new Error('Not authenticated');

    // Use service role to read their profile role safely
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('role, name')
      .eq('id', user.id)
      .single();

    if (profileError || !profile) throw new Error('Could not verify caller profile');
    if (profile.role !== 'admin') {
      throw new Error('Permission denied: only admins can create staff accounts');
    }

    // ── 2. Parse request ───────────────────────────────────────────────────────
    const { p_email, p_name, p_role, p_county, p_password } = await req.json();

    if (!p_email || !p_name || !p_role || !p_county || !p_password) {
      throw new Error('Missing required fields: p_email, p_name, p_role, p_county, p_password');
    }

    const validRoles = ['enumerator', 'supervisor', 'admin'];
    if (!validRoles.includes(p_role)) {
      throw new Error(`Invalid role. Must be one of: ${validRoles.join(', ')}`);
    }

    // ── 3. Create auth user (service role → admin API) ─────────────────────────
    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email:          p_email.toLowerCase().trim(),
      password:       p_password,
      email_confirm:  true,                   // skip email confirmation
      user_metadata: {
        name:   p_name.trim(),
        role:   p_role,
        county: p_county,
      },
    });

    if (createError) {
      // Surface friendly messages for common errors
      if (createError.message.includes('already been registered')) {
        throw new Error('An account with this email already exists.');
      }
      throw createError;
    }

    // ── 4. Wait for handle_new_user trigger ────────────────────────────────────
    // The DB trigger fires asynchronously; give it up to 3 seconds.
    let staffCode = '';
    for (let attempt = 0; attempt < 6; attempt++) {
      await new Promise(resolve => setTimeout(resolve, 500));

      const { data: newProfile } = await supabaseAdmin
        .from('profiles')
        .select('staff_code, name, role')
        .eq('id', newUser.user.id)
        .single();

      if (newProfile?.staff_code) {
        staffCode = newProfile.staff_code;
        break;
      }
    }

    // ── 5. Return result ───────────────────────────────────────────────────────
    return new Response(
      JSON.stringify({
        success:    true,
        user_id:    newUser.user.id,
        staff_code: staffCode || '—',
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[create-staff-member]', message);
    return new Response(
      JSON.stringify({ success: false, error: message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});
