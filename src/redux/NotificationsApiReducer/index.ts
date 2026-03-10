import api from '@redux/store/api';
import { NotificationItem } from '@utils/types';

export type NotificationsResponse = {
  items: NotificationItem[];
  totalCount: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
};

const NotificationApi = api.injectEndpoints({
  endpoints: builder => ({
    getMyNotifications: builder.query<
      NotificationsResponse,
      { page: number; pageSize: number }
    >({
      query: ({ page = 1, pageSize = 10 }) => ({
        url: '/notifications/me',
        method: 'GET',
        params: { page, pageSize },
      }),
      providesTags: ['Notifications'],
    }),

    getMyUnreadNotifications: builder.query<
      NotificationsResponse,
      { page: number; pageSize: number }
    >({
      query: ({ page = 1, pageSize = 10 }) => ({
        url: '/notifications/me/unread',
        method: 'GET',
        params: { page, pageSize },
      }),
      providesTags: ['Notifications'],
    }),

    readNotification: builder.mutation<void, string>({
      query: notificationId => ({
        url: `/notifications/${notificationId}/read`,
        method: 'POST',
      }),
      invalidatesTags: ['Notifications'],
    }),

    readAllNotification: builder.mutation<void, void>({
      query: () => ({
        url: `/notifications/me/read-all`,
        method: 'POST',
      }),
      invalidatesTags: ['Notifications'],
    }),

    sendFCMToken: builder.mutation<
      void,
      { deviceToken: string; platform: string }
    >({
      query: ({ deviceToken, platform }) => ({
        url: '/notifications/device-token',
        method: 'POST',
        body: { deviceToken, platform },
      }),
    }),

    deleteNotification: builder.mutation<void, string>({
      query: id => ({
        url: `/notifications/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Notifications'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetMyNotificationsQuery,
  useGetMyUnreadNotificationsQuery,
  useReadAllNotificationMutation,
  useReadNotificationMutation,
  useDeleteNotificationMutation,
  useSendFCMTokenMutation,
} = NotificationApi;

export { NotificationApi };
