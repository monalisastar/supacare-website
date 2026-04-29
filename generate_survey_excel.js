/**
 * Supacare — Survey Data Excel Export
 *
 * Pulls all completed surveys from Supabase and generates a
 * structured Excel workbook for Gold Standard MRV reporting.
 *
 * Sheets produced:
 *   1. Master Data       — every survey, every field, one row per survey
 *   2. GS Carbon Data    — waste quantities + carbon-relevant fields only
 *   3. Waste & Health    — sections B, C, E, F (baseline disposal)
 *   4. Socioeconomic     — sections A, G (demographics + willingness to pay)
 *   5. Enumerator Log    — who collected what, when, GPS accuracy, sync status
 *   6. Summary Stats     — county-level aggregates for GS monitoring report
 *
 * Usage (in the supacare/ folder):
 *   node generate_survey_excel.js
 *   node generate_survey_excel.js --county nairobi
 *   node generate_survey_excel.js --from 2025-01-01 --to 2025-12-31
 *
 * Requires:
 *   npm install @supabase/supabase-js xlsx dotenv
 *   .env.admin file with SUPABASE_URL and SUPABASE_SECRET_KEY
 */

require('dotenv').config({ path: '.env.admin' });
const { createClient } = require('@supabase/supabase-js');
const XLSX = require('xlsx');
const path = require('path');
const fs   = require('fs');

// ─── Config ───────────────────────────────────────────────────────────────────

const SUPABASE_URL    = process.env.SUPABASE_URL;
const SUPABASE_SECRET = process.env.SUPABASE_SECRET_KEY;

if (!SUPABASE_URL || !SUPABASE_SECRET) {
  console.error('❌  Missing SUPABASE_URL or SUPABASE_SECRET_KEY in .env.admin');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// ─── Parse CLI args ───────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const getArg = (flag) => {
  const i = args.indexOf(flag);
  return i !== -1 ? args[i + 1] : null;
};

const filterCounty = getArg('--county');
const filterFrom   = getArg('--from');
const filterTo     = getArg('--to');

// ─── Question label map (all 13 sections A–M) ────────────────────────────────

const Q = {
  // Section A — Respondent Info
  a1_county:         'A1 County',
  a2_ward:           'A2 Ward / Village',
  a3_name:           'A3 Respondent Name',
  a4_phone:          'A4 Phone',
  a5_gender:         'A5 Gender',
  a6_age:            'A6 Age (years)',
  a7_hh_type:        'A7 Premises Type',
  a8_gps:            'A8 GPS (site)',
  a9_photo_site:     'A9 Site Photo',

  // Section B — Waste & Collection
  b1_hh_size:        'B1 Household Size',
  b2_waste_kg_day:   'B2 Waste Generated (kg/day)',
  b3_disposal:       'B3 Disposal Method',
  b4_collection_service: 'B4 Collection Service',
  b5_collection_freq: 'B5 Collection Frequency',
  b6_fee_ksh:        'B6 Collection Fee (KSH)',
  b7_fee_photo:      'B7 Fee Receipt Photo',

  // Section C — Composting
  c1_aware_compost:  'C1 Aware of Composting',
  c2_currently_composting: 'C2 Currently Composting',
  c3_method:         'C3 Composting Method',
  c4_compost_use:    'C4 Compost Use',
  c5_willing_compost: 'C5 Willing to Compost',
  c6_barrier:        'C6 Barrier to Composting',

  // Section D — Technology & Penetration
  d1_aware_oswp:     'D1 Aware of OSWP',
  d2_seen_oswp:      'D2 Seen OSWP',
  d3_willing_use:    'D3 Willing to Use OSWP',
  d4_reason_not_willing: 'D4 Reason Not Willing',
  d5_ownership_pref: 'D5 Ownership Preference',
  d6_power_scenario: 'D6 Power Scenario (A/B/C)',

  // Section E — Waste Characterisation
  e1_organic_fraction: 'E1 Organic Fraction (%)',
  e2_food_types:     'E2 Food Waste Types',
  e3_separation:     'E3 Waste Separation',
  e4_waste_wet:      'E4 Waste Wet Season (kg/day)',

  // Section F — Environment & Health
  f1_burning:        'F1 Waste Burning',
  f2_burn_freq:      'F2 Burn Frequency',
  f3_open_dump_observed: 'F3 Open Dump Observed',
  f4_health_problems: 'F4 Health Problems Reported',
  f5_water_source:   'F5 Water Source',

  // Section G — Willingness & Income
  g1_income_bracket: 'G1 Income Bracket (KSH/mo)',
  g2_wtp:            'G2 Willing to Pay for Service',
  g3_wtp_amount:     'G3 WTP Amount (KSH/mo)',
  g4_payment_method: 'G4 Preferred Payment Method',

  // Section H — Dumpsite Characterisation
  h1_dumpsite_distance: 'H1 Distance to Dumpsite (km)',
  h2_dumpsite_type:  'H2 Dumpsite Type',
  h3_dumpsite_condition: 'H3 Dumpsite Condition',
  h4_photo_dumpsite: 'H4 Dumpsite Photo',
  h5_dumpsite_gps:   'H5 Dumpsite GPS',
  h6_leachate:       'H6 Leachate Observed',
  h7_burning_dumpsite: 'H7 Burning at Dumpsite',

  // Section I — Enumerator Observations
  i1_interview_setting: 'I1 Interview Setting',
  i2_cooperation:    'I2 Respondent Cooperation',
  i3_observed_waste_mgmt: 'I3 Waste Mgmt Observed',
  i4_photo_waste:    'I4 Waste Photo',
  i5_general_notes:  'I5 General Notes',

  // Section J — Carbon & Double-Counting
  j1_other_projects: 'J1 Other Carbon Projects Nearby',
  j2_other_project_name: 'J2 Project Name',
  j3_registered_program: 'J3 Registered in Program',
  j4_program_name:   'J4 Program Name',
  j5_credit_understanding: 'J5 Understands Carbon Credits',

  // Section K — Informed Consent
  k1_note:           'K1 Consent Note',
  k2_consent_given:  'K2 Consent Given',
  k3_consent_method: 'K3 Consent Method',
  k4_photo_consent:  'K4 Consent Photo',

  // Section L — Energy Profile
  l1_electricity_access: 'L1 Electricity Access',
  l2_electricity_source: 'L2 Electricity Source',
  l3_electricity_bill:   'L3 Monthly Bill (KSH)',
  l4_cooking_fuel:       'L4 Primary Cooking Fuel',
  l5_cooking_expenditure: 'L5 Monthly Fuel Spend (KSH)',

  // Section M — Waste Carbon Accounting
  m1_organic_kg_week: 'M1 Organic Waste (kg/week)',
  m2_wet_fraction:    'M2 Wet Fraction (%)',
  m3_baseline_disposal: 'M3 Baseline Disposal Method',
  m4_carbon_notes:    'M4 Carbon Notes',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function flattenGPS(val) {
  if (!val) return '';
  if (typeof val === 'string') return val;
  if (typeof val === 'object') {
    return `${val.latitude ?? ''},${val.longitude ?? ''}`;
  }
  return String(val);
}

function flattenResponse(responses, key) {
  const val = responses?.[key];
  if (val === undefined || val === null) return '';
  if (key.includes('gps') || key.includes('_gps')) return flattenGPS(val);
  if (Array.isArray(val)) return val.join(', ');
  if (typeof val === 'object') return JSON.stringify(val);
  return String(val);
}

function safeNum(val) {
  const n = parseFloat(val);
  return isNaN(n) ? null : n;
}

function fmtDate(d) {
  if (!d) return '';
  return new Date(d).toISOString().split('T')[0];
}

function colStyle(wb, bold = false, bg = null) {
  return {};  // xlsx community edition doesn't support cell styles — use xlsx-style for formatting
}

// ─── Main export ──────────────────────────────────────────────────────────────

async function main() {
  console.log('🔗  Connecting to Supabase…');

  // ── Fetch surveys ────────────────────────────────────────────
  let query = supabase
    .from('surveys')
    .select(`
      id, survey_date, enumerator_id, enumerator_name,
      county, gps_latitude, gps_longitude, gps_accuracy,
      responses, status, notes, created_at, synced_at,
      profiles:enumerator_id ( name, staff_code, role )
    `)
    .in('status', ['complete', 'synced'])
    .order('survey_date', { ascending: true });

  if (filterCounty) query = query.ilike('county', `%${filterCounty}%`);
  if (filterFrom)   query = query.gte('survey_date', filterFrom);
  if (filterTo)     query = query.lte('survey_date', filterTo);

  const { data: surveys, error } = await query;

  if (error) {
    console.error('❌  Supabase error:', error.message);
    process.exit(1);
  }

  if (!surveys || surveys.length === 0) {
    console.warn('⚠️   No completed surveys found. Nothing to export.');
    process.exit(0);
  }

  console.log(`✅  Fetched ${surveys.length} surveys`);

  // ── Build rows ───────────────────────────────────────────────

  const masterRows = [];
  const carbonRows = [];
  const wasteRows  = [];
  const socioRows  = [];
  const enumRows   = [];

  for (const s of surveys) {
    const r   = s.responses || {};
    const profile = Array.isArray(s.profiles) ? s.profiles[0] : s.profiles;

    // Metadata columns (common to all sheets)
    const meta = {
      'Survey ID':        s.id,
      'Survey Date':      fmtDate(s.survey_date),
      'Status':           s.status,
      'County':           s.county,
      'GPS Lat':          s.gps_latitude  ?? '',
      'GPS Lon':          s.gps_longitude ?? '',
      'GPS Accuracy (m)': s.gps_accuracy  ?? '',
      'Enumerator Name':  s.enumerator_name,
      'Staff Code':       profile?.staff_code ?? '',
      'Synced At':        fmtDate(s.synced_at),
    };

    // ── Sheet 1: Master (all fields) ───────────────────────
    const masterRow = { ...meta };
    Object.keys(Q).forEach(key => {
      masterRow[Q[key]] = flattenResponse(r, key);
    });
    if (s.notes) masterRow['Enumerator Notes'] = s.notes;
    masterRows.push(masterRow);

    // ── Sheet 2: GS Carbon Data ────────────────────────────
    // Key fields for CDM Tool 13 / AMS-III.E calculations
    const wasteKgDay   = safeNum(flattenResponse(r, 'b2_waste_kg_day'));
    const orgFraction  = safeNum(flattenResponse(r, 'e1_organic_fraction'));
    const hhSize       = safeNum(flattenResponse(r, 'b1_hh_size'));
    const m1OrgWeek    = safeNum(flattenResponse(r, 'm1_organic_kg_week'));
    const m2WetFrac    = safeNum(flattenResponse(r, 'm2_wet_fraction'));
    const wetFracDec   = m2WetFrac !== null ? m2WetFrac / 100 : null;

    // Estimated organic waste per household per year (kg)
    const orgKgDay = (wasteKgDay !== null && orgFraction !== null)
      ? wasteKgDay * (orgFraction / 100)
      : m1OrgWeek !== null ? m1OrgWeek / 7 : null;

    // Dry organic matter (for CDM Tool 13 — DOCf calculation)
    const dryOrgKgDay = (orgKgDay !== null && wetFracDec !== null)
      ? orgKgDay * (1 - wetFracDec)
      : null;

    carbonRows.push({
      ...meta,
      'HH Size':                    hhSize ?? '',
      'Waste Generated (kg/day)':   wasteKgDay ?? '',
      'Organic Fraction (%)':       orgFraction ?? '',
      'Organic Waste (kg/day)':     orgKgDay    !== null ? orgKgDay.toFixed(3) : '',
      'Wet Fraction (%)':           m2WetFrac   ?? '',
      'Dry Organic Matter (kg/day)': dryOrgKgDay !== null ? dryOrgKgDay.toFixed(3) : '',
      'Baseline Disposal':          flattenResponse(r, 'm3_baseline_disposal'),
      'Burning at Dumpsite':        flattenResponse(r, 'h7_burning_dumpsite'),
      'Open Dump Observed':         flattenResponse(r, 'f3_open_dump_observed'),
      'Power Scenario':             flattenResponse(r, 'd6_power_scenario'),
      'Other Carbon Projects':      flattenResponse(r, 'j1_other_projects'),
      'Double-Counting Risk':       flattenResponse(r, 'j3_registered_program'),
      'Carbon Notes':               flattenResponse(r, 'm4_carbon_notes'),
    });

    // ── Sheet 3: Waste & Health ────────────────────────────
    wasteRows.push({
      ...meta,
      'HH Size':              hhSize ?? '',
      'Waste (kg/day)':       wasteKgDay ?? '',
      'Disposal Method':      flattenResponse(r, 'b3_disposal'),
      'Collection Service':   flattenResponse(r, 'b4_collection_service'),
      'Collection Frequency': flattenResponse(r, 'b5_collection_freq'),
      'Collection Fee (KSH)': flattenResponse(r, 'b6_fee_ksh'),
      'Aware of Composting':  flattenResponse(r, 'c1_aware_compost'),
      'Currently Composting': flattenResponse(r, 'c2_currently_composting'),
      'Composting Method':    flattenResponse(r, 'c3_method'),
      'Organic Fraction (%)': orgFraction ?? '',
      'Food Waste Types':     flattenResponse(r, 'e2_food_types'),
      'Waste Separation':     flattenResponse(r, 'e3_separation'),
      'Waste Burning':        flattenResponse(r, 'f1_burning'),
      'Burn Frequency':       flattenResponse(r, 'f2_burn_freq'),
      'Health Problems':      flattenResponse(r, 'f4_health_problems'),
      'Water Source':         flattenResponse(r, 'f5_water_source'),
      'Dumpsite Distance (km)': flattenResponse(r, 'h1_dumpsite_distance'),
      'Dumpsite Condition':   flattenResponse(r, 'h3_dumpsite_condition'),
      'Leachate Observed':    flattenResponse(r, 'h6_leachate'),
    });

    // ── Sheet 4: Socioeconomic ─────────────────────────────
    socioRows.push({
      ...meta,
      'Respondent Name':      flattenResponse(r, 'a3_name'),
      'Gender':               flattenResponse(r, 'a5_gender'),
      'Age':                  flattenResponse(r, 'a6_age'),
      'Premises Type':        flattenResponse(r, 'a7_hh_type'),
      'Ward / Village':       flattenResponse(r, 'a2_ward'),
      'HH Size':              hhSize ?? '',
      'Income (KSH/mo)':      flattenResponse(r, 'g1_income_bracket'),
      'WTP Service':          flattenResponse(r, 'g2_wtp'),
      'WTP Amount (KSH/mo)':  flattenResponse(r, 'g3_wtp_amount'),
      'Payment Method':       flattenResponse(r, 'g4_payment_method'),
      'Electricity Access':   flattenResponse(r, 'l1_electricity_access'),
      'Electricity Source':   flattenResponse(r, 'l2_electricity_source'),
      'Monthly Bill (KSH)':   flattenResponse(r, 'l3_electricity_bill'),
      'Cooking Fuel':         flattenResponse(r, 'l4_cooking_fuel'),
      'Fuel Spend (KSH/mo)':  flattenResponse(r, 'l5_cooking_expenditure'),
      'Consent Given':        flattenResponse(r, 'k2_consent_given'),
    });

    // ── Sheet 5: Enumerator Log ────────────────────────────
    enumRows.push({
      'Survey ID':            s.id,
      'Survey Date':          fmtDate(s.survey_date),
      'Enumerator':           s.enumerator_name,
      'Staff Code':           profile?.staff_code ?? '',
      'County':               s.county,
      'Ward':                 flattenResponse(r, 'a2_ward'),
      'GPS Lat':              s.gps_latitude  ?? '',
      'GPS Lon':              s.gps_longitude ?? '',
      'GPS Accuracy (m)':     s.gps_accuracy  ?? '',
      'Status':               s.status,
      'Collected At':         fmtDate(s.created_at),
      'Synced At':            fmtDate(s.synced_at),
      'Interview Setting':    flattenResponse(r, 'i1_interview_setting'),
      'Cooperation':          flattenResponse(r, 'i2_cooperation'),
      'Notes':                s.notes ?? '',
    });
  }

  // ── Sheet 6: Summary stats per county ───────────────────

  const counties = {};
  for (const s of surveys) {
    const r = s.responses || {};
    const c = s.county || 'Unknown';
    if (!counties[c]) counties[c] = {
      county: c, count: 0,
      totalWasteKgDay: 0, wasteCount: 0,
      totalOrgFrac: 0, orgCount: 0,
      burning: 0, composting: 0, collectionService: 0,
      wtpYes: 0, wtpCount: 0, avgWtp: 0, wtpAmountTotal: 0, wtpAmountCount: 0,
    };
    const g = counties[c];
    g.count++;
    const waste = safeNum(flattenResponse(r, 'b2_waste_kg_day'));
    if (waste !== null) { g.totalWasteKgDay += waste; g.wasteCount++; }
    const org = safeNum(flattenResponse(r, 'e1_organic_fraction'));
    if (org !== null) { g.totalOrgFrac += org; g.orgCount++; }
    if (flattenResponse(r, 'f1_burning') === 'yes') g.burning++;
    if (flattenResponse(r, 'c2_currently_composting') === 'yes') g.composting++;
    if (flattenResponse(r, 'b4_collection_service') === 'yes') g.collectionService++;
    const wtp = flattenResponse(r, 'g2_wtp');
    g.wtpCount++;
    if (wtp === 'yes') { g.wtpYes++; }
    const wtpAmt = safeNum(flattenResponse(r, 'g3_wtp_amount'));
    if (wtpAmt !== null) { g.wtpAmountTotal += wtpAmt; g.wtpAmountCount++; }
  }

  const summaryRows = Object.values(counties).map(g => ({
    'County':                   g.county,
    'Survey Count':             g.count,
    'Avg Waste (kg/hh/day)':    g.wasteCount  > 0 ? (g.totalWasteKgDay / g.wasteCount).toFixed(2) : '',
    'Avg Organic Fraction (%)': g.orgCount    > 0 ? (g.totalOrgFrac / g.orgCount).toFixed(1)      : '',
    'HHs Burning Waste (%)':    g.count       > 0 ? ((g.burning / g.count) * 100).toFixed(0) + '%'  : '',
    'HHs Composting (%)':       g.count       > 0 ? ((g.composting / g.count) * 100).toFixed(0) + '%' : '',
    'HHs with Collection (%)':  g.count       > 0 ? ((g.collectionService / g.count) * 100).toFixed(0) + '%' : '',
    'WTP Rate (%)':             g.wtpCount    > 0 ? ((g.wtpYes / g.wtpCount) * 100).toFixed(0) + '%' : '',
    'Avg WTP (KSH/mo)':         g.wtpAmountCount > 0 ? (g.wtpAmountTotal / g.wtpAmountCount).toFixed(0) : '',
  }));

  // ── Build workbook ───────────────────────────────────────

  console.log('📊  Building Excel workbook…');

  const wb = XLSX.utils.book_new();

  function addSheet(name, rows) {
    if (rows.length === 0) return;
    const ws = XLSX.utils.json_to_sheet(rows);

    // Set column widths
    const cols = Object.keys(rows[0]);
    ws['!cols'] = cols.map(c => ({ wch: Math.min(Math.max(c.length + 2, 12), 40) }));

    XLSX.utils.book_append_sheet(wb, ws, name);
  }

  addSheet('Master Data',     masterRows);
  addSheet('GS Carbon Data',  carbonRows);
  addSheet('Waste & Health',  wasteRows);
  addSheet('Socioeconomic',   socioRows);
  addSheet('Enumerator Log',  enumRows);
  addSheet('Summary Stats',   summaryRows);

  // ── Save file ────────────────────────────────────────────

  const timestamp = new Date().toISOString().slice(0, 10);
  const suffix = filterCounty ? `_${filterCounty}` : '';
  const filename = `Supacare_Survey_Export${suffix}_${timestamp}.xlsx`;
  const outPath  = path.join(__dirname, filename);

  XLSX.writeFile(wb, outPath);

  console.log(`\n✅  Export complete!`);
  console.log(`📁  File: ${outPath}`);
  console.log(`📋  Surveys exported: ${surveys.length}`);
  console.log(`\nSheets:`);
  console.log(`   1. Master Data     — all ${surveys.length} surveys, all 60+ fields`);
  console.log(`   2. GS Carbon Data  — waste quantities + CDM Tool 13 carbon inputs`);
  console.log(`   3. Waste & Health  — sections B, C, E, F`);
  console.log(`   4. Socioeconomic   — sections A, G, L, K`);
  console.log(`   5. Enumerator Log  — staff activity + GPS audit trail`);
  console.log(`   6. Summary Stats   — county-level aggregates for GS monitoring report`);
}

main().catch(err => {
  console.error('❌  Fatal error:', err.message);
  process.exit(1);
});
