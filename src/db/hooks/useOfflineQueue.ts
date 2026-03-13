import { useEffect } from 'react';
import { processQueue } from '../queueProcessor';
import NetInfo from '@react-native-community/netinfo';
import { or, eq } from 'drizzle-orm';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { db } from '../client';
import { offlineTasks } from '../schemas';

export function useGetIncompleteTasks() {
  return useLiveQuery(
    db
      .select()
      .from(offlineTasks)
      .where(
        or(
          eq(offlineTasks.status, 'pending'),
          eq(offlineTasks.status, 'failed'),
        ),
      ),
  );
}

export default function useOfflineQueue() {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isInternetReachable) {
        processQueue();
      }
    });

    return unsubscribe;
  }, []);
}
