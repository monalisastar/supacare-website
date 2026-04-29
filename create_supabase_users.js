/**
 * Supacare — Create Supabase user accounts
 *
 * Run ONCE from the supacare/ folder:
 *   node create_supabase_users.js
 *
 * Reads credentials from .env.admin (never committed to git).
 * Delete this script after running if you prefer.
 */

const https = require('https');
const fs    = require('fs');
const path  = require('path');

// ── Load .env.admin ──────────────────────────────────────────────────────────
const envPath = path.join(__dirname, '.env.admin');
const envVars = {};
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8')
    .split('\n')
    .forEach((line) => {
      const [key, ...rest] = line.split('=');
      if (key && !key.startsWith('#')) envVars[key.trim()] = rest.join('=').trim();
    });
} else {
  console.error('❌  .env.admin not found. Create it next to this script with SUPABASE_URL and SUPABASE_SECRET_KEY.');
  process.exit(1);
}

const SUPABASE_HOST = envVars.SUPABASE_URL.replace('https://', '');
const SECRET_KEY    = envVars.SUPABASE_SECRET_KEY;

// ── Accounts to create ───────────────────────────────────────────────────────
const USERS = [
  { email: 'njeri@supacaresolutions.com',  password: 'Supacare@Njeri1',  name: 'Njeri Kamau',    role: 'supervisor' },
  { email: 'info@supacaresolutions.com',   password: 'Supacare@Info1',   name: 'Supacare Admin', role: 'admin' },
  { email: 'trizer@supacaresolutions.com', password: 'Supacare@Trizer1', name: 'Trizer Wanjiku', role: 'enumerator' },
];

// ── Helper ───────────────────────────────────────────────────────────────────
function createUser(user) {
  return new Promise((resolve) => {
    const body = JSON.stringify({
      email: user.email,
      password: user.password,
      email_confirm: true,
      user_metadata: { name: user.name, role: user.role },
    });

    const req = https.request(
      {
        hostname: SUPABASE_HOST,
        path: '/auth/v1/admin/users',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${SECRET_KEY}`,
          'apikey': SECRET_KEY,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(body),
        },
      },
      (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => {
          try {
            const json = JSON.parse(data);
            if (json.id) {
              console.log(`✅  ${user.email}  (role: ${user.role})`);
            } else if (json.message?.toLowerCase().includes('already')) {
              console.log(`ℹ️   ${user.email}  — already exists, skipped`);
            } else {
              console.log(`⚠️   ${user.email}  — ${json.msg || json.message || JSON.stringify(json)}`);
            }
          } catch {
            console.log(`❌  ${user.email}  — unexpected: ${data}`);
          }
          resolve();
        });
      }
    );

    req.on('error', (e) => { console.log(`❌  ${user.email}  — ${e.message}`); resolve(); });
    req.write(body);
    req.end();
  });
}

// ── Run ──────────────────────────────────────────────────────────────────────
(async () => {
  console.log('\n🌿 Supacare — Creating Supabase accounts...\n');
  for (const user of USERS) await createUser(user);
  console.log('\n✔  Done.\n');
})();
