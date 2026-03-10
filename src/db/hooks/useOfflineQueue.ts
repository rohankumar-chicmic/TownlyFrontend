import { OfflineTask, OfflineTaskType } from '@utils/types';
import { db } from '../client';
import { eq, sql } from 'drizzle-orm';
import { propertyApi } from '@redux/PropertyApiReducer';
import { authApi } from '@redux/ApiReducer';
import { offlineTasks } from '../schemas';
import store from '@redux/store';
import { v4 as uuid } from 'uuid';
import { useEffect } from 'react';
import { processQueue } from '../queueProcessor';
import NetInfo from '@react-native-community/netinfo';

export async function addOfflineTask(type: OfflineTaskType, payload: any) {
  const save = await db.insert(offlineTasks).values({
    id: uuid(),
    type,
    payload: JSON.stringify(payload),
    status: 'pending',
    createdAt: Date.now(),
  });
  console.log(save);
}

export async function getPendingTasks() {
  return db
    .select()
    .from(offlineTasks)
    .where(eq(offlineTasks.status, 'pending'));
}

export async function updateTaskStatus(id: string, status: string) {
  await db.update(offlineTasks).set({ status }).where(eq(offlineTasks.id, id));
}

export async function incrementRetry(id: string) {
  await db
    .update(offlineTasks)
    .set({
      retries: sql`${offlineTasks.retries} + 1`,
      status: 'failed',
    })
    .where(eq(offlineTasks.id, id));
}

export async function deleteTask(id: string) {
  await db.delete(offlineTasks).where(eq(offlineTasks.id, id));
}

export async function processOfflineTask(task: OfflineTask) {
  const payload = JSON.parse(task.payload);

  switch (task.type) {
    case OfflineTaskType.CREATE_PROPERTY: {
      await store.dispatch(
        propertyApi.endpoints.makeProperty.initiate({
          data: payload.data,
          token: payload.token,
        }),
      );
      break;
    }

    case OfflineTaskType.EDIT_PROPERTY: {
      await store.dispatch(
        propertyApi.endpoints.editProperty.initiate({
          propertyId: payload.propertyId,
          body: payload.body,
        }),
      );
      break;
    }

    case OfflineTaskType.RESUBMIT_PROPERTY: {
      await store.dispatch(
        propertyApi.endpoints.resubmitProperty.initiate({
          propertyId: payload.propertyId,
          data: payload.data,
        }),
      );
      break;
    }

    case OfflineTaskType.REQUEST_TOKEN: {
      await store.dispatch(
        authApi.endpoints.requestCurrency.initiate(payload.tokens),
      );
      break;
    }
  }
}

export default function useOfflineQueue() {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        processQueue();
      }
    });

    return unsubscribe;
  }, []);
}
