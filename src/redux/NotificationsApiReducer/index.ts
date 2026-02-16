import api from '@redux/store/api';

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  isRead: boolean;
  type: number;
  createdAt: string;
}

const NotificationApi = api.injectEndpoints({
  endpoints: builder => ({
    getMyNotifications: builder.query<NotificationItem[], void>({
      query: () => ({
        url: '/notifications/me',
        method: 'GET',
      }),
    }),
    getMyUnreadNotifications: builder.query<NotificationItem[], void>({
      query: () => ({
        url: '/notifications/me/unread',
        method: 'GET',
      }),
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
