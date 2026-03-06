import { db } from '../client';
import {
  portfolioSummary,
  properties,
  userInvestments,
  portfolioValueHistory,
  portfolioAllocation,
  transactions,
} from '../schemas';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { sql } from 'drizzle-orm';
import type { InferInsertModel } from 'drizzle-orm';

type NewPortfolioSummary = InferInsertModel<typeof portfolioSummary>;
type NewProperty = InferInsertModel<typeof properties>;
type NewUserInvestment = InferInsertModel<typeof userInvestments>;
type NewPortfolioSnapshot = InferInsertModel<typeof portfolioValueHistory>;
type NewPortfolioAllocation = InferInsertModel<typeof portfolioAllocation>;
type NewTransaction = InferInsertModel<typeof transactions>;

export const usePortfolioData = () => {
  const { data: summary } = useLiveQuery(db.select().from(portfolioSummary));
  const { data: holdings } = useLiveQuery(db.select().from(userInvestments));
  const { data: valueHistory } = useLiveQuery(
    db.select().from(portfolioValueHistory).limit(1),
  );
  const { data: allocation } = useLiveQuery(
    db.select().from(portfolioAllocation),
  );
  const { data: txHistory } = useLiveQuery(db.select().from(transactions));
  const { data: myProperties } = useLiveQuery(db.select().from(properties));
  return {
    summary: summary?.[0] ?? null,
    holdings,
    valueHistory,
    allocation,
    properties: myProperties,
    txHistory,
  };
};

export const savePortfolioSummary = async (data: NewPortfolioSummary) => {
  return await db
    .insert(portfolioSummary)
    .values({ ...data, updatedAt: new Date().toISOString() })
    .onConflictDoUpdate({
      target: portfolioSummary.id,
      set: {
        currentValueEth: data.currentValueEth,
        monthlyIncomeEth: data.monthlyIncomeEth,
        totalInvestedEth: data.totalInvestedEth,
        totalReturnEth: data.totalReturnEth,
        totalReturnPercent: data.totalReturnPercent,
        updatedAt: new Date().toISOString(),
      },
    });
};

export const saveProperty = async (data: NewProperty) => {
  return await db
    .insert(properties)
    .values(data)
    .onConflictDoUpdate({
      target: properties.id,
      set: {
        name: data.name,
        location: data.location,
        imageUrl: data.imageUrl,
        propertyType: data.propertyType,
        status: data.status,
        approvedValuation: data.approvedValuation,
        totalUnits: data.totalUnits,
        availableUnits: data.availableUnits,
        pricePerUnitEth: data.pricePerUnitEth,
        annualYieldPercent: data.annualYieldPercent,
        riskScore: data.riskScore,
      },
    });
};

export const saveProperties = async (data: NewProperty[]) => {
  return await db
    .insert(properties)
    .values(data)
    .onConflictDoUpdate({
      target: properties.id,
      set: {
        availableUnits: sql`excluded.availableUnits`,
        status: sql`excluded.status`,
        pricePerUnitEth: sql`excluded.pricePerUnitEth`,
      },
    });
};

export const saveUserInvestment = async (data: NewUserInvestment) => {
  return await db
    .insert(userInvestments)
    .values(data)
    .onConflictDoUpdate({
      target: userInvestments.id,
      set: {
        sharesPurchased: data.sharesPurchased,
        totalInvestedEth: data.totalInvestedEth,
        currentValueEth: data.currentValueEth,
        totalReturnEth: data.totalReturnEth,
        monthlyIncomeEth: data.monthlyIncomeEth,
        totalAmountUsd: data.totalAmountUsd,
      },
    });
};

export const saveUserInvestments = async (data: NewUserInvestment[]) => {
  return await db
    .insert(userInvestments)
    .values(data)
    .onConflictDoUpdate({
      target: userInvestments.id,
      set: {
        sharesPurchased: sql`excluded.sharesPurchased`,
        currentValueEth: sql`excluded.currentValueEth`,
        totalReturnEth: sql`excluded.totalReturnEth`,
        monthlyIncomeEth: sql`excluded.monthlyIncomeEth`,
        totalAmountUsd: sql`excluded.totalAmountUsd`,
      },
    });
};

export const savePortfolioSnapshot = async (data: NewPortfolioSnapshot) => {
  return await db
    .insert(portfolioValueHistory)
    .values({ ...data, updatedAt: new Date().toISOString() });
};

export const savePortfolioSnapshots = async (data: any[]) => {
  await db
    .insert(portfolioValueHistory)
    .values({
      id: 1,
      data,
      updatedAt: new Date().toISOString(),
    })
    .onConflictDoUpdate({
      target: portfolioValueHistory.id,
      set: {
        data,
        updatedAt: new Date().toISOString(),
      },
    });
};

export const savePortfolioAllocation = async (
  data: NewPortfolioAllocation[],
) => {
  const rows = data.map(d => ({ ...d, snapshotAt: new Date().toISOString() }));

  await db.transaction(async tx => {
    await tx.delete(portfolioAllocation);
    await tx.insert(portfolioAllocation).values(rows);
  });
};

export const saveTransaction = async (data: NewTransaction) => {
  return await db
    .insert(transactions)
    .values({ ...data, syncedAt: new Date().toISOString() })
    .onConflictDoNothing();
};

export const saveTransactions = async (data: NewTransaction[]) => {
  const rows = data.map(d => ({ ...d, syncedAt: new Date().toISOString() }));
  return await db.insert(transactions).values(rows).onConflictDoNothing();
};
