import React, { useState } from 'react';
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
import { useAppSelector } from '@redux/store';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  type: number;
  createdAt: string;
}

const DUMMY_NOTIFICATIONS: NotificationItem[] = Array.from(
  { length: 100 },
  (_, i) => ({
    id: `dummy-${i + 1}`,
    title: `Notification ${i + 1}`,
    message: `This is a dummy notification message number ${i + 1}. Testing FlatList rendering performance.`,
    isRead: i % 3 === 0, // some read, some unread
    type: (i % 5) + 1,
    createdAt: new Date(Date.now() - i * 60000).toISOString(), // staggered times
  }),
);



const Notifications = () => {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();
  const userToken = useAppSelector(state => state.auth.userToken);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [isPressed, setIsPressed] = useState(false);

  const {
    data: allNotifications = [],
    isLoading: isLoadingNotifications,
    refetch: refetchAll,
  } = useGetMyNotificationsQuery(undefined, {
    skip: !userToken,
  });
  const { data: unreadNotifications = [], refetch: refetchUnread } =
    useGetMyUnreadNotificationsQuery(undefined, {
      skip: !userToken,
    });
  const [readAllNotifications, { isLoading: isLoadingReadAll, isError }] =
    useReadAllNotificationMutation();

  const unreadCount = unreadNotifications.length;

  const notificationsToRender =
    filter === 'unread' ? unreadNotifications : allNotifications;

  const handleMarkAllAsRead = async () => {
    try {
      if (!userToken) return;
      await readAllNotifications();
      refetchAll();
      refetchUnread();
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({ item }: { item: NotificationItem }) => (
    <Notification item={item} onPress={() => console.log('hif')} />
  );

  const renderEmpty = () => {
    if (isLoadingNotifications) return null;
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

  if (isLoadingNotifications) {
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
        <View>
          <View
            style={[
              dynamicStyles.filterContainer,
              { justifyContent: 'space-between' },
            ]}
          >
            <View style={{ flexDirection: 'row' }}>
              <Pressable
                style={[
                  dynamicStyles.tag,
                  {
                    borderColor:
                      filter === 'all' ? Colors.primary : Colors.border,
                  },
                ]}
                onPress={() => setFilter('all')}
              >
                <Text
                  style={[
                    dynamicStyles.tagText,
                    {
                      color:
                        filter === 'all'
                          ? Colors.primary
                          : Colors.textSecondary,
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
                        filter === 'unread'
                          ? Colors.primary
                          : Colors.textSecondary,
                    },
                  ]}
                >
                  Unread {unreadCount > 0 && `(${unreadCount})`}
                </Text>
              </Pressable>
            </View>

            <Pressable
              style={[
                dynamicStyles.tag,
                {
                  borderColor: isPressed ? Colors.primary : Colors.border,
                },
              ]}
              onPressIn={() => setIsPressed(true)}
              onPressOut={() => setIsPressed(false)}
              onPress={handleMarkAllAsRead}
            >
              <Text
                style={[
                  dynamicStyles.tagText,
                  {
                    color: isPressed ? Colors.primary : Colors.textSecondary,
                  },
                ]}
              >
                Mark all read
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={dynamicStyles.notificationsContainer}>
          <FlatList
            // data={DUMMY_NOTIFICATIONS}
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
