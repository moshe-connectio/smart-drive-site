import { getAllTrimLevelsFullInfo } from '@modules/new-vehicles/lib/repository';
import { logger } from '@core/lib/logger';
import { HomeHeroStatsPanel } from './HomeHeroStatsPanel';
import { HomeHeroRotator, type ShowcaseModel } from './HomeHeroRotator';

/** How many luxury models (max) to feature across the rotating slides. */
const MAX_MODELS = 9;
const GROUP_SIZE = 3;

/**
 * Async hero-right-column showcase. Picks the most premium models (ranked by
 * price) that have a photo, splits them into groups of three, and hands them
 * to a client rotator that cycles through the original stats-panel mockup and
 * each group of luxury models every few seconds.
 *
 * Falls back to the static stats panel if no models with images exist, so the
 * hero never renders an empty column.
 */
export async function HomeHeroShowcase() {
  let luxury: ShowcaseModel[] = [];

  try {
    const trims = await getAllTrimLevelsFullInfo();
    const byModel = new Map<string, ShowcaseModel & { rankPrice: number }>();

    for (const t of trims) {
      if (!t.model_image) continue;
      const monthly = t.monthly_payment ?? null;
      const price = t.price ?? 0;
      const existing = byModel.get(t.model_slug);

      if (!existing) {
        byModel.set(t.model_slug, {
          modelSlug: t.model_slug,
          manufacturerSlug: t.manufacturer_slug,
          name: t.model_name_he || t.model_name,
          manufacturer: t.manufacturer_name,
          image: t.model_image,
          minMonthly: monthly,
          rankPrice: price,
        });
      } else {
        if (monthly != null && (existing.minMonthly == null || monthly < existing.minMonthly)) {
          existing.minMonthly = monthly;
        }
        if (price > existing.rankPrice) existing.rankPrice = price;
      }
    }

    luxury = Array.from(byModel.values())
      .sort((a, b) => b.rankPrice - a.rankPrice)
      .slice(0, MAX_MODELS)
      .map((m) => ({
        modelSlug: m.modelSlug,
        manufacturerSlug: m.manufacturerSlug,
        name: m.name,
        manufacturer: m.manufacturer,
        image: m.image,
        minMonthly: m.minMonthly,
      }));
  } catch (error) {
    logger.error('❌ HomeHeroShowcase: failed to load luxury models', error);
    return <HomeHeroStatsPanel />;
  }

  if (luxury.length === 0) {
    return <HomeHeroStatsPanel />;
  }

  // Split the luxury models into groups of three for the rotating slides.
  const groups: ShowcaseModel[][] = [];
  for (let i = 0; i < luxury.length; i += GROUP_SIZE) {
    groups.push(luxury.slice(i, i + GROUP_SIZE));
  }

  return (
    <HomeHeroRotator groups={groups} statsPanel={<HomeHeroStatsPanel />} />
  );
}
