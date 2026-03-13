import NetInfo from '@react-native-community/netinfo';
import {
  getPendingTasks,
  deleteTask,
  incrementRetry,
  updateTaskStatus,
} from '../db/functions/common';

import { OfflineTask } from '@utils/types';
import { processOfflineTask } from './functions/processOfflineTask';

let isProcessingQueue = false;

export const processQueue = async () => {
  if (isProcessingQueue) return;

  isProcessingQueue = true;

  try {
    const state = await NetInfo.fetch();
    if (!state.isInternetReachable) return;

    const tasks = await getPendingTasks();

    const CONCURRENCY = 4;

    for (let i = 0; i < tasks.length; i += CONCURRENCY) {
      const batch = tasks.slice(i, i + CONCURRENCY);

      await Promise.allSettled(
        batch.map(async task => {
          try {
            await updateTaskStatus(task.id, 'processing');
            await processOfflineTask(task as OfflineTask);
            await deleteTask(task.id);
          } catch (err) {
            console.error('Offline task failed:', err);
            await incrementRetry(task.id);
          }
        }),
      );
    }
  } finally {
    isProcessingQueue = false;
  }
};
