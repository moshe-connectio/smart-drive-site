import { getAllTrimLevelsFullInfo } from '@modules/new-vehicles/lib/repository';
import { logger } from '@core/lib/logger';
import { HomeHeroStatsPanel } from './HomeHeroStatsPanel';
import { HomeHeroRotator, type ShowcaseModel } from './HomeHeroRotator';

/** Keep the sequence varied without loading an excessive number of hero images. */
const MAX_MODELS = 12;
const GROUP_SIZE = 4;
const TIER_COUNTS = { accessible: 5, value: 4, premium: 3 } as const;
const POPULAR_MANUFACTURERS = [
  'toyota', 'hyundai', 'kia', 'skoda', 'mazda', 'nissan', 'suzuki',
  'byd', 'volkswagen', 'ford', 'mitsubishi', 'seat', 'renault',
  'bmw', 'mercedes-benz', 'audi', 'volvo', 'lexus',
];
const POPULAR_MODEL_TERMS = [
  'corolla', 'קורולה', 'yaris', 'יאריס', 'rav4', 'ראב', 'camry', 'קאמרי',
  'ioniq', 'איוניק', 'elantra', 'אלנטרה', 'tucson', 'טוסון',
  'sportage', 'ספורטאז', 'picanto', 'פיקנטו', 'niro', 'נירו',
  'octavia', 'אוקטביה', 'kodiaq', 'קודיאק', 'karoq', 'קארוק',
  'mazda 3', 'מאזדה 3', 'cx-5', 'qashqai', 'קשקאי', 'juke', 'ג׳וק',
  'swift', 'סוויפט', 's-cross', 'dolphin', 'דולפין', 'atto',
  'golf', 'גולף', 'polo', 'פולו', 'focus', 'פוקוס', 'puma', 'פומה',
  'model 3', 'מודל 3', '3 series', 'סדרה 3', 'a-class', 'a3', 'xc40',
];

function popularityScore(model: ShowcaseModel): number {
  const manufacturerIndex = POPULAR_MANUFACTURERS.indexOf(model.manufacturerSlug);
  const searchableName = `${model.modelSlug} ${model.name}`.toLowerCase();
  const modelIndex = POPULAR_MODEL_TERMS.findIndex((term) => searchableName.includes(term));
  const manufacturerScore = manufacturerIndex === -1 ? 0 : POPULAR_MANUFACTURERS.length - manufacturerIndex;
  const modelScore = modelIndex === -1 ? 0 : (POPULAR_MODEL_TERMS.length - modelIndex) * 2;
  return manufacturerScore + modelScore;
}

/**
 * Async hero-right-column showcase. Selects a balanced mix from all available
 * manufacturers across accessible, mid-range and premium monthly payments.
 *
 * Falls back to the static stats panel if no matching models exist, so the
 * hero never renders an empty column.
 */
export async function HomeHeroShowcase() {
  let showcaseModels: ShowcaseModel[] = [];

  try {
    const trims = await getAllTrimLevelsFullInfo();
    const byModel = new Map<string, ShowcaseModel>();

    for (const t of trims) {
      if (!t.model_image) continue;
      const monthly = t.monthly_payment ?? null;
      const modelKey = `${t.manufacturer_slug}:${t.model_slug}`;
      const existing = byModel.get(modelKey);
      const existingPrice = existing?.price && existing.price > 0
        ? existing.price
        : Number.POSITIVE_INFINITY;
      const candidatePrice = t.price && t.price > 0
        ? t.price
        : Number.POSITIVE_INFINITY;

      if (!existing || candidatePrice < existingPrice) {
        byModel.set(modelKey, {
          modelSlug: t.model_slug,
          manufacturerSlug: t.manufacturer_slug,
          name: t.model_name_he || t.model_name,
          trimName: t.name,
          manufacturer: t.manufacturer_name,
          image: t.model_image,
          minMonthly: monthly,
          price: t.price ?? null,
          engineType: t.engine_type || t.fuel_type,
          powerHp: t.power_hp,
          acceleration: t.acceleration_0_100,
          rangeKm: t.range_km ?? null,
          drivetrain: t.drivetrain ?? null,
          bodyType: t.model_body_type ?? null,
          priceTier: 'value',
        });
      }
    }

    const priced = Array.from(byModel.values())
      .filter((model) => model.price != null && model.price > 0)
      .sort((a, b) => (a.price ?? 0) - (b.price ?? 0));

    const selectedKeys = new Set<string>();
    const selectedManufacturers = new Set<string>();
    const pickTier = (
      candidates: ShowcaseModel[],
      count: number,
      priceTier: ShowcaseModel['priceTier'],
    ) => {
      const chosen: ShowcaseModel[] = [];
      const rankedCandidates = [...candidates].sort((a, b) => {
        const scoreDifference = popularityScore(b) - popularityScore(a);
        if (scoreDifference !== 0) return scoreDifference;
        return (a.price ?? 0) - (b.price ?? 0);
      });
      for (const preferNewManufacturer of [true, false]) {
        for (const model of rankedCandidates) {
          const key = `${model.manufacturerSlug}:${model.modelSlug}`;
          if (selectedKeys.has(key)) continue;
          if (preferNewManufacturer && selectedManufacturers.has(model.manufacturerSlug)) continue;
          chosen.push({ ...model, priceTier });
          selectedKeys.add(key);
          selectedManufacturers.add(model.manufacturerSlug);
          if (chosen.length === count) return chosen;
        }
      }
      return chosen;
    };

    const third = Math.max(1, Math.floor(priced.length / 3));
    showcaseModels = [
      ...pickTier(priced.slice(0, third), TIER_COUNTS.accessible, 'accessible'),
      ...pickTier(
        priced.slice(third, Math.max(third + 1, priced.length - third)),
        TIER_COUNTS.value,
        'value',
      ),
      ...pickTier(priced.slice(-third).reverse(), TIER_COUNTS.premium, 'premium'),
    ].slice(0, MAX_MODELS);
  } catch (error) {
    logger.error('❌ HomeHeroShowcase: failed to load showcase models', error);
    return <HomeHeroStatsPanel />;
  }

  if (showcaseModels.length === 0) {
    return <HomeHeroStatsPanel />;
  }

  const groups: ShowcaseModel[][] = [];
  for (let i = 0; i < showcaseModels.length; i += GROUP_SIZE) {
    groups.push(showcaseModels.slice(i, i + GROUP_SIZE));
  }

  return (
    <HomeHeroRotator groups={groups} />
  );
}
