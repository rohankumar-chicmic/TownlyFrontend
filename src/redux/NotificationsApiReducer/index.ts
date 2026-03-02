import api from '@redux/store/api';
import { NotificationItem } from '@utils/types';

const NotificationApi = api.injectEndpoints({
  endpoints: builder => ({
    getMyNotifications: builder.query<
      {
        items: NotificationItem[];
        totalCount: number;
        page: number;
        pageSize: number;
        hasMore: boolean;
      },
      { page: number; pageSize: number }
    >({
      query: ({ page = 1, pageSize = 10 }) => ({
        url: '/notifications/me',
        method: 'GET',
        params: { page, pageSize },
      }),

      serializeQueryArgs: ({ endpointName }) => endpointName,

      merge: (currentCache, newData, { arg }) => {
        if (arg.page === 1) {
          currentCache.items = newData.items;
        } else {
          const existingIds = new Set(currentCache.items.map(i => i.id));
          const filtered = newData.items.filter(i => !existingIds.has(i.id));
          currentCache.items.push(...filtered);
        }
        currentCache.totalCount = newData.totalCount;
        currentCache.page = newData.page;
        currentCache.pageSize = newData.pageSize;
        currentCache.hasMore = newData.hasMore;
      },

      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },
    }),

    getMyUnreadNotifications: builder.query<
      {
        items: NotificationItem[];
        totalCount: number;
        page: number;
        pageSize: number;
        hasMore: boolean;
      },
      { page: number; pageSize: number }
    >({
      query: ({ page = 1, pageSize = 10 }) => ({
        url: '/notifications/me/unread',
        method: 'GET',
        params: { page, pageSize },
      }),

      serializeQueryArgs: ({ endpointName }) => endpointName,

      merge: (currentCache, newData, { arg }) => {
        if (arg.page === 1) {
          currentCache.items = newData.items;
        } else {
          const existingIds = new Set(currentCache.items.map(i => i.id));
          const filtered = newData.items.filter(i => !existingIds.has(i.id));
          currentCache.items.push(...filtered);
        }
        currentCache.totalCount = newData.totalCount;
        currentCache.page = newData.page;
        currentCache.pageSize = newData.pageSize;
        currentCache.hasMore = newData.hasMore;
      },

      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },
    }),
    readNotification: builder.mutation<void, string>({
      query: (notificationId: string) => ({
        url: `/notifications/${notificationId}/read`,
        method: 'POST',
      }),
    }),
    readAllNotification: builder.mutation<void, void>({
      query: () => ({
        url: `/notifications/me/read-all`,
        method: 'POST',
      }),
    }),
    sendFCMToken: builder.mutation<
      void,
      { deviceToken: string; platform: string }
    >({
      query: ({ deviceToken, platform }) => ({
        url: '/notifications/device-token',
        method: 'POST',
        body: {
          deviceToken: deviceToken,
          platform: platform,
        },
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetMyNotificationsQuery,
  useGetMyUnreadNotificationsQuery,
  useReadAllNotificationMutation,
  useReadNotificationMutation,
  useSendFCMTokenMutation,
} = NotificationApi;

export { NotificationApi };
