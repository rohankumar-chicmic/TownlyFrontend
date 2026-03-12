import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
} from 'react-native';

import styles from './styles';
import useStyles from '@hooks/useStyles';
import useTheme from '@hooks/useTheme';
import Notification from '@components/molecules/Notification';

import {
  useGetMyNotificationsQuery,
  useGetMyUnreadNotificationsQuery,
  useReadAllNotificationMutation,
  useReadNotificationMutation,
  useDeleteNotificationMutation,
} from '@redux/NotificationsApiReducer';

import { useAppDispatch, useAppSelector } from '@redux/store';
import handleNotification from '@utils/handleNotification';
import {
  decrementUnreadNotifications,
  setUnreadNotifications as setUnreadNotificationsState,
  resetUnreadNotifications,
} from '@redux/AuthReducer';
import { NotificationItem } from '@utils/types';
import Toast from 'react-native-toast-message';

const PAGE_SIZE = 10;

const Notifications = () => {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();
  const dispatch = useAppDispatch();

  const [allNotifications, setAllNotifications] = useState<NotificationItem[]>(
    [],
  );
  const [unreadNotifications, setUnreadNotifications] = useState<
    NotificationItem[]
  >([]);

  const userToken = useAppSelector(state => state.auth.userToken);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [isPressed, setIsPressed] = useState(false);
  const [isMarkingAllRead, setIsMarkingAllRead] = useState(false);
  const [pageAll, setPageAll] = useState(1);
  const [pageUnread, setPageUnread] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const isAllFilter = filter === 'all';

  const [readSingleNotification] = useReadNotificationMutation();
  const [readAllNotifications] = useReadAllNotificationMutation();
  const [deleteNotification] = useDeleteNotificationMutation();

  const {
    data: allData,
    isFetching: isFetchingAll,
    isLoading: isLoadingAll,
    refetch: refetchAll,
  } = useGetMyNotificationsQuery(
    { page: pageAll, pageSize: PAGE_SIZE },
    { skip: !userToken, refetchOnMountOrArgChange: true },
  );

  const {
    data: unreadData,
    isFetching: isFetchingUnread,
    isLoading: isLoadingUnread,
    refetch: refetchUnread,
  } = useGetMyUnreadNotificationsQuery(
    { page: pageUnread, pageSize: PAGE_SIZE },
    { skip: !userToken, refetchOnMountOrArgChange: true },
  );

  const isAllFilter_check = filter === 'all';
  const isFetchingCurrent = isAllFilter_check
    ? isFetchingAll
    : isFetchingUnread;
  const isLoadingCurrent = isAllFilter_check ? isLoadingAll : isLoadingUnread;
  const currentData = isAllFilter_check ? allData : unreadData;
  const notifications = isAllFilter_check
    ? allNotifications
    : unreadNotifications;
  const totalUnread = unreadData?.totalCount ?? 0;
  const hasMore = currentData?.hasMore ?? false;

  // Append all-notifications pages
  useEffect(() => {
    if (!allData?.items) return;
    if (pageAll === 1) {
      setAllNotifications(allData.items);
    } else {
      setAllNotifications(prev => {
        const map = new Map(prev.map(i => [i.id, i]));
        allData.items.forEach(i => map.set(i.id, i));
        return Array.from(map.values());
      });
    }
  }, [allData]);

  // Append unread-notifications pages
  useEffect(() => {
    if (!unreadData?.items) return;
    if (pageUnread === 1) {
      setUnreadNotifications(unreadData.items);
    } else {
      setUnreadNotifications(prev => {
        const map = new Map(prev.map(i => [i.id, i]));
        unreadData.items.forEach(i => map.set(i.id, i));
        return Array.from(map.values());
      });
    }
    dispatch(setUnreadNotificationsState(unreadData?.totalCount ?? 0));
  }, [unreadData]);

  const handleFilterChange = (newFilter: 'all' | 'unread') => {
    if (newFilter === filter) return;
    setFilter(newFilter);
    // Reset the page for the tab being switched to
    if (newFilter === 'all') setPageAll(1);
    else setPageUnread(1);
  };

  const handleEndReached = () => {
    if (isFetchingCurrent || !hasMore) return;
    if (isAllFilter) setPageAll(prev => prev + 1);
    else setPageUnread(prev => prev + 1);
  };

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      // Reset to page 1 and force refetch
      if (isAllFilter) {
        setPageAll(1);
        // Small delay to let page state settle before refetch
        setTimeout(() => refetchAll(), 50);
      } else {
        setPageUnread(1);
        setTimeout(() => refetchUnread(), 50);
      }
    } finally {
      setRefreshing(false);
    }
  }, [isAllFilter, refetchAll, refetchUnread]);

  const handleMarkAllAsRead = async () => {
    if (!userToken) return;
    try {
      setIsMarkingAllRead(true);
      await readAllNotifications().unwrap();
      dispatch(resetUnreadNotifications());

      // Optimistically mark all as read in local state
      setAllNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      setUnreadNotifications([]);

      // Refetch both from page 1 in background
      setPageAll(1);
      setPageUnread(1);
    } catch (error) {
      console.log(error);
      Toast.show({ type: 'error', text1: 'Failed to mark all as read' });
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

      // Optimistically update local state immediately
      setAllNotifications(prev =>
        prev.map(n => (n.id === item.id ? { ...n, isRead: true } : n)),
      );
      setUnreadNotifications(prev => prev.filter(n => n.id !== item.id));
      dispatch(decrementUnreadNotifications());

      await readSingleNotification(item.id).unwrap();
    } catch (error) {
      console.log(error);
      // Revert optimistic update on failure
      setAllNotifications(prev =>
        prev.map(n => (n.id === item.id ? { ...n, isRead: false } : n)),
      );
      setUnreadNotifications(prev => [...prev, item]);
      dispatch(setUnreadNotificationsState(totalUnread + 1));
    }
  };

  const handleDelete = async (id: string) => {
    const deleted = notifications.find(n => n.id === id);

    // Optimistically remove from local state immediately
    setAllNotifications(prev => prev.filter(n => n.id !== id));
    setUnreadNotifications(prev => prev.filter(n => n.id !== id));

    if (deleted && !deleted.isRead) {
      dispatch(decrementUnreadNotifications());
    }

    try {
      await deleteNotification(id).unwrap();
    } catch (error) {
      console.log('Delete failed:', error);
      Toast.show({ type: 'error', text1: 'Some error occurred' });

      if (deleted) {
        setAllNotifications(prev => [deleted, ...prev]);
        if (!deleted.isRead) {
          setUnreadNotifications(prev => [deleted, ...prev]);
          dispatch(setUnreadNotificationsState(totalUnread + 1));
        }
      }
    }
  };

  const renderItem = ({ item: notification }: { item: NotificationItem }) => (
    <Notification
      item={notification}
      onPress={() => handleSingleNotificationRead(notification)}
      onDelete={handleDelete}
    />
  );

  return (
    <View>
      <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
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
                { borderColor: isAllFilter ? Colors.primary : Colors.border },
              ]}
              onPress={() => handleFilterChange('all')}
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
                { borderColor: !isAllFilter ? Colors.primary : Colors.border },
              ]}
              onPress={() => handleFilterChange('unread')}
            >
              <Text
                style={[
                  dynamicStyles.tagText,
                  {
                    color: !isAllFilter ? Colors.primary : Colors.textSecondary,
                  },
                ]}
              >
                Unread {totalUnread > 0 && `(${totalUnread})`}
              </Text>
            </Pressable>
          </View>

          <Pressable
            style={[
              dynamicStyles.tag,
              { borderColor: isPressed ? Colors.primary : Colors.border },
            ]}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            onPress={handleMarkAllAsRead}
            disabled={isMarkingAllRead}
          >
            {isMarkingAllRead ? (
              <ActivityIndicator size="small" color={Colors.primary} />
            ) : (
              <Text
                style={[
                  dynamicStyles.tagText,
                  { color: isPressed ? Colors.primary : Colors.textSecondary },
                ]}
              >
                Mark all read
              </Text>
            )}
          </Pressable>
        </View>
      </View>

      {/* Initial load only */}
      {isLoadingCurrent && (
        <View style={dynamicStyles.loadingContainer}>
          <ActivityIndicator size="large" />
          <Text
            style={[
              dynamicStyles.heroText,
              { textAlign: 'center', marginTop: 8 },
            ]}
          >
            Loading Notifications...
          </Text>
        </View>
      )}

      {!isLoadingCurrent && (
        <FlatList
          data={notifications}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 10 }}
          style={dynamicStyles.notificationsContainer}
          showsVerticalScrollIndicator={false}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          ListEmptyComponent={
            <View style={dynamicStyles.emptyContainer}>
              <Text style={dynamicStyles.heroText}>
                {isAllFilter
                  ? 'No notifications yet'
                  : 'No unread notifications'}
              </Text>
            </View>
          }
          ListFooterComponent={
            isFetchingCurrent && (isAllFilter ? pageAll : pageUnread) > 1 ? (
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
  );
};

export default Notifications;
