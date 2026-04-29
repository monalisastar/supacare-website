# Deploying Supabase Edge Functions

Edge Functions run on Supabase's servers and can use the service role key,
which lets them create auth users from the mobile app safely.

## One-time setup (do this once on your PC)

### 1. Install Supabase CLI
```bash
npm install -g supabase
```

### 2. Log in to Supabase
```bash
npx supabase login
```
(Opens a browser — paste your Supabase access token)

### 3. Deploy the create-staff-member function
Run this from the `supacare/` folder (where `supabase/` lives):
```bash
npx supabase functions deploy create-staff-member --project-ref pgedfrusyfyalnsjjpkq
```

That's it. The function will be live at:
`https://pgedfrusyfyalnsjjpkq.supabase.co/functions/v1/create-staff-member`

The mobile app already calls it via `supabase.functions.invoke('create-staff-member', ...)`.

---

## What the function does

1. Verifies the caller's JWT → checks their role in `profiles` is `'admin'`
2. Uses `supabase.auth.admin.createUser()` with the service role key (server-side only)
3. Sets `email_confirm: true` so the account is immediately usable
4. Waits up to 3 seconds for the `handle_new_user` trigger to assign a staff code
5. Returns `{ success, staff_code, user_id }`

## Troubleshooting

- **"Function not found"**: The function hasn't been deployed yet — run the deploy command above.
- **"Permission denied"**: The logged-in user is not an admin in the `profiles` table.
- **staff_code is "—"**: The `handle_new_user` trigger didn't fire in time. Check that the trigger exists in Supabase → Database → Functions. The staff code will still be set; refresh the Staff list after a few seconds.
