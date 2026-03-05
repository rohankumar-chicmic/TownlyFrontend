import { db } from '../client';
import { accountBalances } from '../schemas';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { eq } from 'drizzle-orm';

/**
 * Live hook for the current user's balance.
 * Returns the OBJECT directly (or undefined), not an array.
 */
export function useAccountBalance(walletAddress: string) {
  const result = useLiveQuery(
    db
      .select()
      .from(accountBalances)
      .where(eq(accountBalances.walletAddress, walletAddress))
      .limit(1),
  );

  // useLiveQuery returns { data, error, updated }, we extract the first row
  return {
    ...result,
    data: result.data?.[0] ?? null, // Now you can use data.totalGranted safely
  };
}

export const saveAccountBalance = async (data: {
  totalGranted: number;
  totalUsed: number;
  available: number;
  walletAddress: string;
}) => {
  try {
    await db
      .insert(accountBalances)
      .values({
        walletAddress: data.walletAddress,
        totalGranted: data.totalGranted ?? 0,
        totalUsed: data.totalUsed ?? 0,
        availableBalance: data.available ?? 0,
        syncedAt: new Date().toISOString(),
      })
      .onConflictDoUpdate({
        target: accountBalances.walletAddress,
        set: {
          totalGranted: data.totalGranted,
          totalUsed: data.totalUsed,
          availableBalance: data.available,
          syncedAt: new Date().toISOString(),
        },
      });
  } catch (err) {
    console.error('❌ Database Error (Balance):', err);
  }
};
