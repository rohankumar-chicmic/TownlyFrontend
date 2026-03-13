import { OfflineTaskType } from '@utils/types';
import { eq, sql } from 'drizzle-orm';
import { db } from '../client';
import { offlineTasks } from '../schemas';

export async function addOfflineTask(type: OfflineTaskType, payload: any) {
  const propertyId = payload?.propertyId;

  if (type !== OfflineTaskType.REQUEST_TOKEN && propertyId) {
    const tasks = await db
      .select()
      .from(offlineTasks)
      .where(eq(offlineTasks.type, type));

    const duplicateTasks = tasks.filter(t => {
      const parsed = JSON.parse(t.payload);
      return parsed?.propertyId === propertyId && t.status === 'pending';
    });

    for (const task of duplicateTasks) {
      await db.delete(offlineTasks).where(eq(offlineTasks.id, task.id));
    }
  }

  await db.insert(offlineTasks).values({
    id: crypto.randomUUID(),
    type,
    payload: JSON.stringify(payload),
    status: 'pending',
    createdAt: Date.now(),
  });
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
