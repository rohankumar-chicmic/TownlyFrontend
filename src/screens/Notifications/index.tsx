import React, { useEffect, useMemo, useState } from 'react';
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

const PAGE_SIZE = 10;

const Notifications = () => {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();
  const dispatch = useAppDispatch();

  const userToken = useAppSelector(state => state.auth.userToken);
  const hasUnread = useAppSelector(state => state.auth.unreadNotifications);

  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [isPressed, setIsPressed] = useState(false);
  const [pageAll, setPageAll] = useState(1);
  const [pageUnread, setPageUnread] = useState(1);
  const [isMarkingAllRead, setIsMarkingAllRead] = useState(false);

  const isAllFilter = filter === 'all';

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

  const allNotifications = useMemo(
    () => allNotificationsData?.items ?? [],
    [allNotificationsData?.items],
  );

  const unreadNotifications = useMemo(
    () => unreadNotificationsData?.items ?? [],
    [unreadNotificationsData?.items],
  );

  const totalAll = allNotificationsData?.totalCount ?? 0;
  const totalUnread = unreadNotificationsData?.totalCount ?? 0;
  const unreadCount = totalUnread;

  const notificationsToRender = useMemo(
    () => (isAllFilter ? allNotifications : unreadNotifications),
    [isAllFilter, allNotifications, unreadNotifications],
  );

  const currentPage = isAllFilter ? pageAll : pageUnread;

  const isFetchingCurrent = isAllFilter ? isFetchingAll : isFetchingUnread;

  const hasMore = isAllFilter
    ? allNotifications.length < totalAll
    : unreadNotifications.length < totalUnread;

  const isRefreshing = isFetchingCurrent && currentPage === 1;

  const shouldShowFooter = isFetchingCurrent && currentPage > 1;

  const handleMarkAllAsRead = async () => {
    try {
      if (!userToken) return;
      setIsMarkingAllRead(true);
      await readAllNotifications().unwrap();

      setPageAll(1);
      setPageUnread(1);

      await Promise.all([refetchAll(), refetchUnread()]);

      dispatch(hasUnreadNotifications(false));
    } catch (error) {
      console.log(error);
    } finally {
      setIsMarkingAllRead(false);
    }
  };

  const handleSingleNotificationRead = async (item: NotificationItem) => {
    try {
      handleNotification({
        type: item.type,
        referenceId: String(item.referenceId),
      });

      if (item.isRead) return;

      if (unreadCount === 1) {
        dispatch(hasUnreadNotifications(false));
      }

      await readSingleNotification(item.id);
      await Promise.all([refetchAll(), refetchUnread()]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoadMore = () => {
    if (isFetchingCurrent || !hasMore) return;

    if (isAllFilter) {
      setPageAll(prev => prev + 1);
    } else {
      setPageUnread(prev => prev + 1);
    }
  };

  useEffect(() => {
    if (isAllFilter) {
      setPageAll(1);
    } else {
      setPageUnread(1);
    }
  }, [isAllFilter]);

  useEffect(() => {
    if (hasUnread) {
      setPageAll(1);
      setPageUnread(1);
      refetchAll();
      refetchUnread();
    }
  }, [hasUnread, refetchAll, refetchUnread]);

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
          {isAllFilter ? 'No notifications yet' : 'No unread notifications'}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={dynamicStyles.container}>
        <View style={dynamicStyles.headerSection}>
          <Text style={dynamicStyles.heroPrimarytext}>Notifications</Text>
          <Text style={dynamicStyles.heroText}>
            Stay updated with your investments and activities
          </Text>
        </View>

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
                  borderColor: isAllFilter ? Colors.primary : Colors.border,
                },
              ]}
              onPress={() => setFilter('all')}
            >
              <Text
                style={[
                  dynamicStyles.tagText,
                  {
                    color: isAllFilter ? Colors.primary : Colors.textSecondary,
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
                  borderColor: isAllFilter ? Colors.border : Colors.primary,
                },
              ]}
              onPress={() => setFilter('unread')}
            >
              <Text
                style={[
                  dynamicStyles.tagText,
                  {
                    color: isAllFilter ? Colors.textSecondary : Colors.primary,
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

      <View style={dynamicStyles.container}>
        {isLoadingNotifications || isMarkingAllRead ? (
          <View style={{ width: '100%', alignContent: 'center' }}>
            <Text style={[dynamicStyles.heroText, { textAlign: 'center' }]}>
              Loading Notifications...
            </Text>
          </View>
        ) : (
          <FlatList
            data={notificationsToRender}
            contentContainerStyle={{ paddingBottom: 10 }}
            style={dynamicStyles.notificationsContainer}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            ListEmptyComponent={renderEmpty}
            showsVerticalScrollIndicator={false}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            refreshing={isRefreshing}
            ListFooterComponent={
              shouldShowFooter ? (
                <Text
                  style={{
                    textAlign: 'center',
                    padding: 10,
                    color: Colors.textMuted,
                  }}
                >
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
