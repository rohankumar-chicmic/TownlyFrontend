import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './styles';
import useStyles from '@hooks/useStyles';
import useTheme from '@hooks/useTheme';
import Notification from '@components/molecules/Notification';

import {
  useGetMyNotificationsQuery,
  useGetMyUnreadNotificationsQuery,
  useReadAllNotificationMutation,
  useReadNotificationMutation,
} from '@redux/NotificationsApiReducer';

import { useAppDispatch, useAppSelector } from '@redux/store';
import handleNotification from '@utils/handleNotification';
import { hasUnreadNotifications } from '@redux/AuthReducer';
import { NotificationItem } from '@utils/types';

const Notifications = () => {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();
  const userToken = useAppSelector(state => state.auth.userToken);

  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [isPressed, setIsPressed] = useState(false);
  const dispatch = useAppDispatch();
  const PAGE_SIZE = 10;

  const [pageAll, setPageAll] = useState(1);
  const [pageUnread, setPageUnread] = useState(1);

  const {
    data: allNotificationsData,
    isFetching: isFetchingAll,
    isLoading: isLoadingNotifications,
    refetch: refetchAll,
  } = useGetMyNotificationsQuery(
    { page: pageAll, pageSize: PAGE_SIZE },
    { skip: !userToken },
  );

  const {
    data: unreadNotificationsData,
    isFetching: isFetchingUnread,
    refetch: refetchUnread,
  } = useGetMyUnreadNotificationsQuery(
    { page: pageUnread, pageSize: PAGE_SIZE },
    { skip: !userToken },
  );

  const [readSingleNotification] = useReadNotificationMutation();
  const [readAllNotifications] = useReadAllNotificationMutation();

  const allNotifications = allNotificationsData?.items ?? [];
  const unreadNotifications = unreadNotificationsData?.items ?? [];

  const totalAll = allNotificationsData?.totalCount ?? 0;
  const totalUnread = unreadNotificationsData?.totalCount ?? 0;

  const unreadCount = totalUnread;

  const notificationsToRender =
    filter === 'unread' ? unreadNotifications : allNotifications;

  const handleMarkAllAsRead = async () => {
    try {
      if (!userToken) return;
      await readAllNotifications();
      setPageAll(1);
      setPageUnread(1);
      dispatch(hasUnreadNotifications(false));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSingleNotificationRead = async (item: NotificationItem) => {
    try {
      handleNotification({
        type: item.type,
        referenceId: String(item.referenceId),
      });
      if (!item.isRead) {
        await readSingleNotification(item.id);
        refetchAll();
        refetchUnread();
      }
    } catch (e: any) {
      console.log(e);
    }
  };

  const hasMoreAll = allNotifications.length < totalAll;
  const hasMoreUnread = unreadNotifications.length < totalUnread;

  const handleLoadMore = () => {
    if (filter === 'all') {
      if (!isFetchingAll && hasMoreAll) {
        setPageAll(prev => prev + 1);
      }
    } else {
      if (!isFetchingUnread && hasMoreUnread) {
        setPageUnread(prev => prev + 1);
      }
    }
  };

  useEffect(() => {
    if (filter === 'all') {
      setPageAll(1);
    } else {
      setPageUnread(1);
    }
  }, [filter]);

  const renderItem = ({ item }: { item: NotificationItem }) => (
    <Notification
      item={item}
      onPress={() => handleSingleNotificationRead(item)}
    />
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
            <View style={{ flexDirection: 'row', gap: 8 }}>
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
      </View>
      <View style={dynamicStyles.container}>
        {isLoadingNotifications ? (
          <View style={{ width: '100%', alignContent: 'center' }}>
            <Text style={[dynamicStyles.heroText, { textAlign: 'center' }]}>
              Loading Notifications...
            </Text>
          </View>
        ) : (
          <FlatList
            data={notificationsToRender}
            contentContainerStyle={{ paddingVertical: 10 }}
            style={dynamicStyles.notificationsContainer}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            ListEmptyComponent={renderEmpty}
            showsVerticalScrollIndicator={false}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            refreshing={
              filter === 'all'
                ? isFetchingAll && pageAll === 1
                : isFetchingUnread && pageUnread === 1
            }
            ListFooterComponent={
              (filter === 'all' && isFetchingAll && pageAll > 1) ||
              (filter === 'unread' && isFetchingUnread && pageUnread > 1) ? (
                <Text style={{ textAlign: 'center', padding: 10 }}>
                  Loading...
                </Text>
              ) : null
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Notifications;
