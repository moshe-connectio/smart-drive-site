/**
 * /api/vehicle-lookup?plate=12345678
 *
 * Hebrew vehicle data lookup via data.gov.il open datasets.
 *
 * Strategy (mirrors Zoho Deluge automation):
 *  1. Try active vehicles dataset.
 *  2. Fallback: inactive vehicles.
 *  3. Fallback: commercial / vans.
 *  4. Fallback: motorcycles.
 *  5. Fallback: personal-import vehicles.
 *  6. Enrich with model details (transmission, engine size, horsepower).
 *  7. Enrich with ownership history (cars from 2018+).
 *
 * Returns a normalized JSON object suitable for displaying to users on /trade-in.
 *
 * Security:
 *  - Plate input is sanitized to digits-only and length-bounded (server-side).
 *  - Only outbound to data.gov.il (no user-provided URLs).
 *  - 12s timeout per upstream call to avoid hanging.
 *  - Cached for 1 hour at the edge (public, plate-keyed).
 */

import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@core/lib/logger';
import { getClientIp, rateLimit } from '@shared/utils/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/* ─── data.gov.il datasets ─────────────────────────────────────── */
const RESOURCES = {
  active: '053cea08-09bc-40ec-8f7a-156f0677aff3',
  inactive: 'f6efe89a-fb3d-43a4-bb61-9bf12a9b9099',
  commercial: 'cd3acc5c-03c3-4c89-9c54-d40f93c0d790',
  motorcycle: 'bf9df4e2-d90d-4c0a-a400-19e15af8e95f',
  personalImport: '03adc637-b6fe-402b-9937-7c3d3afc9140',
  modelDetails: '142afde2-6228-49f9-8a29-9b6c3a0cbe40',
  ownershipHistory: 'bb2355dc-9ec7-4f06-9c3f-3344672171da',
} as const;

const GOV_BASE = 'https://data.gov.il/api/3/action/datastore_search';
const UPSTREAM_TIMEOUT_MS = 12_000;
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_MS = 60_000;

/* ─── Types ────────────────────────────────────────────────────── */
type GovRecord = Record<string, unknown>;
type GovResponse = {
  success?: boolean;
  result?: { records?: GovRecord[] };
};

export type VehicleLookupResult = {
  plate: string;
  category: 'active' | 'inactive' | 'commercial' | 'motorcycle' | 'personal-import';
  categoryLabel: string;
  manufacturer: string;
  model: string;
  trimLevel: string;
  year: string;
  color: string;
  fuelType: string;
  modelType: string;
  chassisNumber: string;
  testValidUntil: string;
  ownershipType: string;
  originality: string;
  transmission: string;
  engineSize: string;
  horsepower: string;
  ownershipHistory: Array<{ date: string; owner: string }>;
};

/* ─── Helpers ──────────────────────────────────────────────────── */
function sanitizePlate(raw: string): string {
  // Hebrew Israeli plates are 7 or 8 digits. Strip everything else.
  return raw.replace(/\D/g, '').slice(0, 10);
}

function str(rec: GovRecord | undefined, key: string): string {
  if (!rec) return '';
  const v = rec[key];
  if (v === null || v === undefined) return '';
  return String(v).trim();
}

const CATEGORY_LABELS: Record<VehicleLookupResult['category'], string> = {
  active: 'רכב פעיל',
  inactive: 'רכב לא פעיל',
  commercial: 'רכב מסחרי',
  motorcycle: 'אופנוע',
  'personal-import': 'ייבוא אישי',
};

async function fetchGov(resourceId: string, query: string, limit = 1): Promise<GovRecord[]> {
  const url = `${GOV_BASE}?resource_id=${resourceId}&q=${encodeURIComponent(query)}&limit=${limit}`;
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal: controller.signal,
      cache: 'no-store',
    });
    if (!res.ok) {
      logger.warn(`[vehicle-lookup] gov.il returned ${res.status} for ${resourceId}`);
      return [];
    }
    const json = (await res.json()) as GovResponse;
    return json?.result?.records ?? [];
  } catch (err) {
    logger.warn('[vehicle-lookup] upstream error:', err);
    return [];
  } finally {
    clearTimeout(t);
  }
}

async function findVehicleRecord(plate: string): Promise<{
  rec: GovRecord;
  category: VehicleLookupResult['category'];
} | null> {
  const order: Array<[VehicleLookupResult['category'], string]> = [
    ['active', RESOURCES.active],
    ['inactive', RESOURCES.inactive],
    ['commercial', RESOURCES.commercial],
    ['motorcycle', RESOURCES.motorcycle],
    ['personal-import', RESOURCES.personalImport],
  ];

  for (const [category, resourceId] of order) {
    const records = await fetchGov(resourceId, plate, 1);
    if (records.length > 0) {
      return { rec: records[0], category };
    }
  }
  return null;
}

function mapModelType(code: string): string {
  if (code === 'P') return 'פרטי';
  if (code === 'M') return 'מסחרי';
  return code;
}

function formatTokefDate(raw: string): string {
  // upstream returns ISO like "2025-08-15T00:00:00"
  return raw.replace('T00:00:00', '');
}

function formatBaalutDate(raw: string): string {
  // upstream returns "YYYYMMDD" (string of 8 digits)
  if (!/^\d{6,8}$/.test(raw)) return raw;
  const year = raw.substring(0, 4);
  const month = raw.substring(4, 6);
  return `${month}/${year}`;
}

/* ─── Route ────────────────────────────────────────────────────── */
export async function GET(req: NextRequest) {
  const { allowed, retryAfter } = rateLimit(
    `vehicle-lookup:${getClientIp(req)}`,
    RATE_LIMIT_MAX,
    RATE_LIMIT_WINDOW_MS,
  );
  if (!allowed) {
    return NextResponse.json(
      { error: 'יותר מדי חיפושים. נסו שוב בעוד מעט.' },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } },
    );
  }

  const rawPlate = req.nextUrl.searchParams.get('plate') ?? '';
  const plate = sanitizePlate(rawPlate);

  if (plate.length < 5 || plate.length > 8) {
    return NextResponse.json(
      { error: 'מספר רישוי לא תקין. יש להזין 7–8 ספרות.' },
      { status: 400 },
    );
  }

  const found = await findVehicleRecord(plate);
  if (!found) {
    return NextResponse.json(
      { error: 'לא נמצא רכב התואם למספר הרישוי שהוזן.' },
      { status: 404 },
    );
  }

  const { rec, category } = found;

  const tozeret = str(rec, 'tozeret_nm');
  const kinuy = str(rec, 'kinuy_mishari');
  const ramat = str(rec, 'ramat_gimur');
  const yearStr = str(rec, 'shnat_yitzur');
  const degemCd = str(rec, 'degem_cd');

  const result: VehicleLookupResult = {
    plate,
    category,
    categoryLabel: CATEGORY_LABELS[category],
    manufacturer: tozeret,
    model: kinuy,
    trimLevel: ramat,
    year: yearStr,
    color: str(rec, 'tzeva_rechev'),
    fuelType: str(rec, 'sug_delek_nm'),
    modelType: mapModelType(str(rec, 'sug_degem')),
    chassisNumber: str(rec, 'misgeret'),
    testValidUntil: formatTokefDate(str(rec, 'tokef_dt')),
    ownershipType: str(rec, 'baalut'),
    originality: '',
    transmission: '',
    engineSize: '',
    horsepower: '',
    ownershipHistory: [],
  };

  /* ─── Enrichment 1: model details ──────────────────────────── */
  if (tozeret && kinuy) {
    const q = [tozeret, kinuy, ramat, yearStr, degemCd].filter(Boolean).join(' ');
    const detail = (await fetchGov(RESOURCES.modelDetails, q, 1))[0];
    if (detail) {
      const auto = str(detail, 'automatic_ind');
      result.transmission = auto === '1' ? 'אוטומטית' : 'ידנית';
      result.engineSize = str(detail, 'nefah_manoa');
      result.horsepower = str(detail, 'koah_sus');
    }
  }

  /* ─── Enrichment 2: ownership history (2018+) ──────────────── */
  const yearNum = Number.parseInt(yearStr, 10);
  if (!Number.isNaN(yearNum) && yearNum > 2017) {
    const history = await fetchGov(RESOURCES.ownershipHistory, plate, 5);
    let minDate: number | null = null;
    let maxDate: number | null = null;
    let originality = '';
    let latestOwner = '';
    let latestAmbiguous = false;

    const formatted = history
      .map((line) => {
        const dt = str(line, 'baalut_dt');
        const owner = str(line, 'baalut');
        if (dt) {
          const num = Number.parseInt(dt, 10);
          if (!Number.isNaN(num)) {
            if (minDate === null || num < minDate) {
              minDate = num;
              originality = owner;
            }
            if (maxDate === null || num > maxDate) {
              maxDate = num;
              latestOwner = owner;
              latestAmbiguous = false;
            } else if (num === maxDate && owner !== latestOwner) {
              // Two different owners share the same latest date → can't decide
              latestAmbiguous = true;
            }
          }
        }
        return { date: formatBaalutDate(dt), owner };
      })
      .filter((h) => h.date || h.owner);

    result.originality = originality;
    result.ownershipHistory = formatted;

    // Current ownership = owner of the latest entry; tie on same date → unknown
    if (maxDate !== null) {
      result.ownershipType = latestAmbiguous ? 'לא ידוע' : latestOwner;
    }
  }

  return NextResponse.json(result, {
    status: 200,
    headers: {
      // Cache 1h at edge — plate data rarely changes within an hour
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
