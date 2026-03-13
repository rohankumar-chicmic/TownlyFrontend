import { db } from '../client';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import {
  portfolioSummary,
  properties,
  userInvestments,
  portfolioValueHistory,
  portfolioAllocation,
  transactions,
  accountBalances,
  offlineTasks,
  offlinePropertyDrafts,
  myProperties,
  propertyDocuments,
  featuredProperties,
} from '../schemas';

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
      ' Successfully stored',
      sanitizedData.length,
      'properties locally',
    );
  } catch (err) {
    console.error(' Database Error:', err);
  }
};

export async function clearLocalDataExceptFeatured() {
  await db.transaction(async tx => {
    await tx.delete(portfolioSummary);
    await tx.delete(properties);
    await tx.delete(userInvestments);
    await tx.delete(portfolioValueHistory);
    await tx.delete(portfolioAllocation);
    await tx.delete(transactions);
    await tx.delete(accountBalances);
    await tx.delete(offlineTasks);
    await tx.delete(offlinePropertyDrafts);
    await tx.delete(propertyDocuments);
    await tx.delete(myProperties);
  });
}
