import { getAllTrimLevelsFullInfo } from '@modules/new-vehicles/lib/repository';
import { logger } from '@core/lib/logger';
import { HomeHeroStatsPanel } from './HomeHeroStatsPanel';
import { HomeHeroRotator, type ShowcaseModel } from './HomeHeroRotator';

/** Keep the sequence varied without loading an excessive number of hero images. */
const MAX_MODELS = 24;
const GROUP_SIZE = 4;
const TIER_COUNTS = { accessible: 8, value: 8, premium: 8 } as const;
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

function normalized(value: string): string {
  return value.toLowerCase().replace(/[׳'’\-\s]/g, '');
}

function isJacModel(model: ShowcaseModel): boolean {
  const manufacturer = normalized(`${model.manufacturerSlug} ${model.manufacturer}`);
  return manufacturer.includes('jac') || manufacturer.includes('ג׳אק') || manufacturer.includes('גאק');
}

function isExcludedHeroModel(model: ShowcaseModel): boolean {
  const manufacturer = normalized(`${model.manufacturerSlug} ${model.manufacturer}`);
  return manufacturer.includes('peugeot') || manufacturer.includes('פיגו') || manufacturer.includes('porsche') || manufacturer.includes('פורשה');
}

function isHeroPriorityModel(model: ShowcaseModel): boolean {
  const manufacturer = normalized(`${model.manufacturerSlug} ${model.manufacturer}`);
  const name = normalized(`${model.modelSlug} ${model.name}`);
  const omoda = manufacturer.includes('omoda') || manufacturer.includes('אומודה');
  const toyotaYarisCross = manufacturer.includes('toyota') && (name.includes('yaris') || name.includes('יאריס')) && name.includes('cross');
  const box = name.includes('box') || name.includes('בוקס');
  const chery = manufacturer.includes('chery') || manufacturer.includes('צארי') || manufacturer.includes('צ׳רי') || manufacturer.includes('צרי');
  const cupra = manufacturer.includes('cupra') || manufacturer.includes('קופרה');
  const skodaSuperb = manufacturer.includes('skoda') && (name.includes('superb') || name.includes('סופרב'));
  const bmwX1 = manufacturer.includes('bmw') && name.includes('x1');
  const byd = manufacturer.includes('byd');
  const bydPopularModel = ['atto', 'dolphin', 'seal', 'song', 'tang', 'yuan', 'sealion', 'אטו', 'דולפין', 'סיל', 'סונג', 'טאנג'].some((term) => name.includes(normalized(term)));
  return (omoda && (name.includes('7') || name.includes('9'))) || toyotaYarisCross || box || chery || cupra || skodaSuperb || bmwX1 || (byd && bydPopularModel);
}

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

    const heroModels = Array.from(byModel.values()).filter(
      (model) => !isJacModel(model) && !isExcludedHeroModel(model),
    );
    const priced = heroModels
      .filter((model) => model.price != null && model.price > 0)
      .sort((a, b) => (a.price ?? 0) - (b.price ?? 0));

    const priorityModels = heroModels.filter(isHeroPriorityModel);
    const remainingModels = heroModels.filter((model) => !isHeroPriorityModel(model));
    const orderedModels = [...priorityModels, ...remainingModels];
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
      ...pickTier(orderedModels.filter(isHeroPriorityModel), MAX_MODELS, 'value'),
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
