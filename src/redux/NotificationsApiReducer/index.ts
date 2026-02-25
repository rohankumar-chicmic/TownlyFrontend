import api from '@redux/store/api';
import { NotificationItem } from '@utils/types';

const NotificationApi = api.injectEndpoints({
  endpoints: builder => ({
    getMyNotifications: builder.query<
      { hasMore: boolean; items: NotificationItem[] },
      { page: number; limit: number }
    >({
      query: ({ page, limit = 10 }) => ({
        url: '/notifications/me',
        method: 'GET',
        params: { page, limit },
      }),

      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },

      merge: (currentCache, newItems) => {
        currentCache.items.push(...newItems.items);
        currentCache.hasMore = newItems.hasMore;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },
    }),
    getMyUnreadNotifications: builder.query<
      { hasMore: boolean; items: NotificationItem[] },
      { page: number; limit: number }
    >({
      query: ({ page, limit = 10 }) => ({
        url: '/notifications/me/unread',
        method: 'GET',
        params: { page, limit },
      }),

      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },

      merge: (currentCache, newItems) => {
        currentCache.items.push(...newItems.items);
        currentCache.hasMore = newItems.hasMore;
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
