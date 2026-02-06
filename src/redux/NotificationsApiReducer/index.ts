import api from '@redux/store/api';
import PropertyCardProps from '@components/molecules/CardContainer2/PropertyCardProps.type';
import { NFTFormData } from '@screens/CreateNFT/types';
import { PropertyDetailsType } from '@utils/types';
import { RootState, useAppSelector } from '@redux/store';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

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
        method: 'GET'
      })
    }),
    getMyUnreadNotifications: builder.query<NotificationItem[], void>({
      query: () => ({
        url: '/notifications/me/unread', 
        method: 'GET'
      })
    }),    
    readNotification: builder.mutation<void, string>({
      query: (notificationId: string) =>({
        url: `/notifications/${notificationId}/read`, 
        method: 'POST'
      })
    }), 
    readAllNotification: builder.mutation<void, void>({
      query: () =>({
        url: `/notifications/me/read-all`, 
        method: 'POST'
      })
    }), 
  }),
  overrideExisting: false,
});

export const {
  useGetMyNotificationsQuery, 
  useGetMyUnreadNotificationsQuery, 
  useReadAllNotificationMutation, 
  useReadNotificationMutation,
} = NotificationApi;

export { NotificationApi };
