import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './styles';
import useStyles from '@hooks/useStyles';
import useTheme from '@hooks/useTheme';
import Notification from '@components/molecules/Notification';

import {
  useGetMyNotificationsQuery,
  useGetMyUnreadNotificationsQuery,
  useReadAllNotificationMutation,
} from '@redux/NotificationsApiReducer';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  type: number;
  createdAt: string;
}

const Notifications = () => {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();

  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const { data: allNotifications = [], isLoading } =
    useGetMyNotificationsQuery();
  const { data: unreadNotifications = [] } = useGetMyUnreadNotificationsQuery();
  const [readAllNotifications, {isError}] = useReadAllNotificationMutation();

  const unreadCount = unreadNotifications.length;

  const notificationsToRender =
    filter === 'unread' ? unreadNotifications : allNotifications;

  const renderItem = ({ item }: { item: NotificationItem }) => (
    <Notification item={item} onPress={()=> console.log('hif')} />
  );

  const renderEmpty = () => {
    if (isLoading) return null;
    return (
      <View style={dynamicStyles.emptyContainer}>
        <Text style={dynamicStyles.heroText}>
          {filter === 'unread'
            ? 'No unread notifications'
            : 'No notifications yet'}
        </Text>
      </View>
    );
  };

  if (isLoading) {
    return (
        <View style={dynamicStyles.container}>
          <View style={dynamicStyles.headerSection}>
            <Text style={dynamicStyles.heroPrimarytext}>Notifications</Text>
            <Text style={dynamicStyles.heroText}>
              Stay updated with your investments and activities
            </Text>
          </View>

          <View style={dynamicStyles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={dynamicStyles.heroText}>Loading notifications...</Text>
          </View>
        </View>
    );
  }

  return (
    <SafeAreaView style={dynamicStyles.safeArea}>
      <View style={dynamicStyles.container}>
        <View style={dynamicStyles.headerSection}>
          <Text style={dynamicStyles.heroPrimarytext}>Notifications</Text>
          <Text style={dynamicStyles.heroText}>
            Stay updated with your investments and activities
          </Text>
        </View>

        <View style={dynamicStyles.filterContainer}>
          <Pressable
            style={[
              dynamicStyles.tag,
              {
                borderColor: filter === 'all' ? Colors.primary : Colors.border,
              },
            ]}
            onPress={() => setFilter('all')}
          >
            <Text
              style={[
                dynamicStyles.tagText,
                {
                  color:
                    filter === 'all' ? Colors.primary : Colors.textSecondary,
                },
              ]}
            >
              All
            </Text>
          </Pressable>

          <Pressable
            style={[
              dynamicStyles.tag,
              {
                borderColor:
                  filter === 'unread' ? Colors.primary : Colors.border,
              },
            ]}
            onPress={() => setFilter('unread')}
          >
            <Text
              style={[
                dynamicStyles.tagText,
                {
                  color:
                    filter === 'unread' ? Colors.primary : Colors.textSecondary,
                },
              ]}
            >
              Unread {unreadCount > 0 && `(${unreadCount})`}
            </Text>
          </Pressable>
        </View>

        <View style={dynamicStyles.notificationsContainer}>
          <FlatList
            data={notificationsToRender}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            ListEmptyComponent={renderEmpty}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Notifications;
