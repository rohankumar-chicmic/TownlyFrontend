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

  const isAllFilter = filter === 'all';

  const [readSingleNotification] = useReadNotificationMutation();
  const [readAllNotifications] = useReadAllNotificationMutation();
  const [deleteNotification] = useDeleteNotificationMutation();

  const {
    data: allData,
    isFetching: isFetchingAll,
    isLoading: isLoadingAll,
  } = useGetMyNotificationsQuery(
    { page: pageAll, pageSize: PAGE_SIZE },
    { skip: !userToken, refetchOnMountOrArgChange: true },
  );

  const {
    data: unreadData,
    isFetching: isFetchingUnread,
    isLoading: isLoadingUnread,
  } = useGetMyUnreadNotificationsQuery(
    { page: pageUnread, pageSize: PAGE_SIZE },
    { skip: !userToken, refetchOnMountOrArgChange: true },
  );

  // Derive current-tab values — no branching needed in handlers
  const currentPage = isAllFilter ? pageAll : pageUnread;
  const setCurrentPage = isAllFilter ? setPageAll : setPageUnread;
  const isFetchingCurrent = isAllFilter ? isFetchingAll : isFetchingUnread;
  const isLoadingCurrent = isAllFilter ? isLoadingAll : isLoadingUnread;

  const currentData = isAllFilter ? allData : unreadData;
  const notifications = isAllFilter ? allNotifications : unreadNotifications;
  const totalUnread = unreadData?.totalCount ?? 0;
  const hasMore = currentData?.hasMore ?? false;

  const resetAll = useCallback(() => {
    setPageAll(1);
    setPageUnread(1);
  }, []);

  const handleFilterChange = (newFilter: 'all' | 'unread') => {
    setFilter(newFilter);

    if (newFilter === 'all') {
      setPageAll(1);
    } else {
      setPageUnread(1);
    }
  };

  const handleEndReached = () => {
    if (isFetchingCurrent || !hasMore) return;
    setCurrentPage(prev => prev + 1);
  };

  const handleMarkAllAsRead = async () => {
    try {
      if (!userToken) return;
      setIsMarkingAllRead(true);
      await readAllNotifications().unwrap();
      dispatch(resetUnreadNotifications());
      resetAll();
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
      dispatch(decrementUnreadNotifications());
      await readSingleNotification(item.id).unwrap();
      resetAll();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setIsMarkingAllRead(true);
      const deleted = notifications.find(n => n.id === id);

      await deleteNotification(id).unwrap();

      if (deleted && !deleted.isRead) {
        dispatch(decrementUnreadNotifications());
      }
      resetAll();
    } catch (error) {
      console.log('Delete failed:', error);
      Toast.show({ type: 'error', text1: 'Some error occurred' });
    } finally {
      setIsMarkingAllRead(false);
    }
  };
  useEffect(() => {
    if (allData?.items) {
      if (pageAll === 1) {
        setAllNotifications(allData.items);
      } else {
        setAllNotifications(prev => {
          const map = new Map(prev.map(i => [i.id, i]));
          allData.items.forEach(i => map.set(i.id, i));
          return Array.from(map.values());
        });
      }
    }
  }, [allData, pageAll]);

  useEffect(() => {
    if (unreadData?.items) {
      if (pageUnread === 1) {
        setUnreadNotifications(unreadData.items);
      } else {
        setUnreadNotifications(prev => {
          const map = new Map(prev.map(i => [i.id, i]));
          unreadData.items.forEach(i => map.set(i.id, i));
          return Array.from(map.values());
        });
      }
    }
    dispatch(setUnreadNotificationsState(unreadData?.totalCount ?? 0));
  }, [unreadData, pageUnread, dispatch]);

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

      {/* LOADER */}
      {(isLoadingCurrent || isMarkingAllRead) && (
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

      {!isLoadingCurrent && !isMarkingAllRead && (
        <FlatList
          data={notifications}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 10 }}
          style={dynamicStyles.notificationsContainer}
          showsVerticalScrollIndicator={false}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
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
