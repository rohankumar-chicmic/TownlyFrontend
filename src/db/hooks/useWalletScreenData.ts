import { db } from '../client';
import { accountBalances } from '../schemas';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { eq } from 'drizzle-orm';

// --- HOOKS ---

/**
 * Live hook for the current user's balance details
 */
export function useAccountBalance(walletAddress: string) {
  return useLiveQuery(
    db
      .select()
      .from(accountBalances)
      .where(eq(accountBalances.walletAddress, walletAddress)),
  );
}

// --- SAVING FUNCTIONS ---

/**
 * Updates or Inserts the account balance from API response
 */
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

    console.log('✅ Account balance synced locally');
  } catch (err) {
    console.error('❌ Database Error (Balance):', err);
  }
};
