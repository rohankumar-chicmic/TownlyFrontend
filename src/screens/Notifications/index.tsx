import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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

  const openSwipeableRef = useRef<any>(null);
  const userToken = useAppSelector(state => state.auth.userToken);

  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [isPressed, setIsPressed] = useState(false);
  const [isMarkingAllRead, setIsMarkingAllRead] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [pageAll, setPageAll] = useState(1);
  const [pageUnread, setPageUnread] = useState(1);

  const [allNotifications, setAllNotifications] = useState<NotificationItem[]>(
    [],
  );
  const [unreadNotifications, setUnreadNotifications] = useState<
    NotificationItem[]
  >([]);

  const isAllFilter = filter === 'all';

  const [readSingleNotification] = useReadNotificationMutation();
  const [readAllNotifications] = useReadAllNotificationMutation();
  const [deleteNotification] = useDeleteNotificationMutation();

  // ================= QUERIES =================
  const {
    data: allData,
    isFetching: isFetchingAll,
    isLoading: isLoadingAll,
    refetch: refetchAll,
  } = useGetMyNotificationsQuery(
    { page: pageAll, pageSize: PAGE_SIZE },
    { skip: !userToken },
  );

  const {
    data: unreadData,
    isFetching: isFetchingUnread,
    isLoading: isLoadingUnread,
    refetch: refetchUnread,
  } = useGetMyUnreadNotificationsQuery(
    { page: pageUnread, pageSize: PAGE_SIZE },
    { skip: !userToken },
  );

  // ================= ACCUMULATE PAGES =================
  useEffect(() => {
    if (!allData?.items) return;
    setAllNotifications(prev => {
      if (pageAll === 1) return allData.items;
      const map = new Map(prev.map(i => [i.id, i]));
      allData.items.forEach(i => map.set(i.id, i));
      return Array.from(map.values());
    });
  }, [allData?.items, pageAll]);

  useEffect(() => {
    if (!unreadData?.items) return;
    setUnreadNotifications(prev => {
      if (pageUnread === 1) return unreadData.items;
      const map = new Map(prev.map(i => [i.id, i]));
      unreadData.items.forEach(i => map.set(i.id, i));
      return Array.from(map.values());
    });
  }, [unreadData?.items, pageUnread]);

  // ================= SYNC UNREAD COUNT =================
  useEffect(() => {
    if (unreadData?.totalCount !== undefined) {
      dispatch(setUnreadNotificationsState(unreadData.totalCount));
    }
  }, [unreadData?.totalCount]);

  // ================= DERIVED =================
  const notifications = isAllFilter ? allNotifications : unreadNotifications;
  const isFetchingCurrent = isAllFilter ? isFetchingAll : isFetchingUnread;
  const isLoadingCurrent = isAllFilter ? isLoadingAll : isLoadingUnread;
  const currentPage = isAllFilter ? pageAll : pageUnread;
  const hasMore = isAllFilter
    ? (allData?.hasMore ?? false)
    : (unreadData?.hasMore ?? false);
  const totalUnread = unreadData?.totalCount ?? 0;

  // ================= HANDLERS =================
  const handleFilterChange = (newFilter: 'all' | 'unread') => {
    if (newFilter === filter) return;
    setFilter(newFilter);
  };

  const handleEndReached = () => {
    if (isFetchingCurrent || !hasMore) return;
    if (isAllFilter) setPageAll(prev => prev + 1);
    else setPageUnread(prev => prev + 1);
  };

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      if (isAllFilter) {
        setAllNotifications([]);
        setPageAll(1);
        setTimeout(() => refetchAll(), 50);
      } else {
        setUnreadNotifications([]);
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
      setAllNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      setUnreadNotifications([]);
    } catch {
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
      setAllNotifications(prev =>
        prev.map(n => (n.id === item.id ? { ...n, isRead: true } : n)),
      );
      setUnreadNotifications(prev => prev.filter(n => n.id !== item.id));
      dispatch(decrementUnreadNotifications());
      await readSingleNotification(item.id).unwrap();
    } catch {
      setAllNotifications(prev =>
        prev.map(n => (n.id === item.id ? { ...n, isRead: false } : n)),
      );
      setUnreadNotifications(prev => [...prev, item]);
      dispatch(setUnreadNotificationsState(totalUnread + 1));
    }
  };

  const handleDelete = async (id: string) => {
    const deleted = notifications.find(n => n.id === id);
    setAllNotifications(prev => prev.filter(n => n.id !== id));
    setUnreadNotifications(prev => prev.filter(n => n.id !== id));
    if (deleted && !deleted.isRead) dispatch(decrementUnreadNotifications());
    try {
      await deleteNotification(id).unwrap();
    } catch {
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

  // ================= RENDER =================
  const renderItem = ({ item }: { item: NotificationItem }) => (
    <Notification
      item={item}
      onPress={() => handleSingleNotificationRead(item)}
      onDelete={handleDelete}
      openSwipeableRef={openSwipeableRef}
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
            <Text
              style={[
                dynamicStyles.tagText,
                { color: isPressed ? Colors.primary : Colors.textSecondary },
              ]}
            >
              Mark all read
            </Text>
          </Pressable>
        </View>
      </View>

      {isLoadingCurrent ? (
        <View style={dynamicStyles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text
            style={[
              dynamicStyles.heroText,
              { textAlign: 'center', marginTop: 8 },
            ]}
          >
            Loading Notifications...
          </Text>
        </View>
      ) : (
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
          ItemSeparatorComponent={() => (
            <View
              style={{
                width: '100%',
                backgroundColor: Colors.border,
                height: 1,
              }}
            />
          )}
          ListEmptyComponent={
            isFetchingCurrent ? null : (
              <View style={dynamicStyles.emptyContainer}>
                <Ionicons
                  name="notifications-off-outline"
                  size={100}
                  color={Colors.textMuted}
                  style={{ marginBottom: 12 }}
                />
                <Text style={dynamicStyles.emptyTitle}>
                  {isAllFilter ? 'No Notifications Yet' : 'All Caught Up'}
                </Text>
                <Text style={dynamicStyles.emptyDescription}>
                  {isAllFilter
                    ? 'You will see updates about your activity here.'
                    : 'You have no unread notifications.'}
                </Text>
              </View>
            )
          }
          ListFooterComponent={
            isFetchingCurrent && currentPage > 1 ? (
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
