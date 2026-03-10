import NetInfo from '@react-native-community/netinfo';
import {
  getPendingTasks,
  processOfflineTask,
  deleteTask,
  incrementRetry,
  updateTaskStatus,
} from '../db/hooks/useOfflineQueue';

import { OfflineTask } from '@utils/types';

let isProcessingQueue = false;

export const processQueue = async () => {
  if (isProcessingQueue) return;

  isProcessingQueue = true;

  try {
    const state = await NetInfo.fetch();

    if (!state.isConnected) return;

    const tasks = await getPendingTasks();

    for (const task of tasks) {
      try {
        await updateTaskStatus(task.id, 'processing');

        await processOfflineTask(task as OfflineTask);

        await deleteTask(task.id);
      } catch (err) {
        console.error('Offline task failed:', err);

        await incrementRetry(task.id);
      }
    }
  } finally {
    isProcessingQueue = false;
  }
};
