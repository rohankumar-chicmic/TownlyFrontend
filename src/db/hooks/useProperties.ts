import { db } from '../client';
import { featuredProperties } from '../schemas';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';

export function useFeaturedProperties() {
  return useLiveQuery(db.select().from(featuredProperties));
}

export const saveFeaturedProperties = async (
  data: (typeof featuredProperties.$inferInsert)[],
) => {
  try {
    const sanitizedData = data.map(item => ({
      id: item.id,
      name: item.name,
      location: item.location,
      imageUrl: item.imageUrl,
      propertyType: item.propertyType,
      annualYieldPercent: item.annualYieldPercent,
      approvedValuation: item.approvedValuation,
      availableUnits: item.availableUnits,
      totalUnits: item.totalUnits,
      riskScore: item.riskScore,
      pricePerUnitEth: item.pricePerUnitEth,
      userOwned: item.userOwned ?? false,
      status: item.status ?? 0,
    }));

    await db.transaction(async tx => {
      await tx.delete(featuredProperties);
      await tx.insert(featuredProperties).values(sanitizedData);
    });

    console.log(
      '✅ Successfully stored',
      sanitizedData.length,
      'properties locally',
    );
  } catch (err) {
    console.error('❌ Database Error:', err);
  }
};
