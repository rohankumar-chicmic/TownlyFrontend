import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  useReadNotificationMutation,
  useDeleteNotificationMutation,
} from '@redux/NotificationsApiReducer';

import { useAppDispatch, useAppSelector } from '@redux/store';
import handleNotification from '@utils/handleNotification';
import { hasUnreadNotifications } from '@redux/AuthReducer';
import { NotificationItem } from '@utils/types';
import Toast from 'react-native-toast-message';

const PAGE_SIZE = 10;

const mergeItems = (
  prev: NotificationItem[],
  incoming: NotificationItem[],
  isReset: boolean,
): NotificationItem[] => {
  if (isReset) return incoming;
  const existingIds = new Set(prev.map(i => i.id));
  return [...prev, ...incoming.filter(i => !existingIds.has(i.id))];
};

const Notifications = () => {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();
  const dispatch = useAppDispatch();

  const userToken = useAppSelector(state => state.auth.userToken);
  const hasUnread = useAppSelector(state => state.auth.unreadNotifications);

  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [isPressed, setIsPressed] = useState(false);
  const [isMarkingAllRead, setIsMarkingAllRead] = useState(false);

  const [allItems, setAllItems] = useState<NotificationItem[]>([]);
  const [unreadItems, setUnreadItems] = useState<NotificationItem[]>([]);
  const [pageAll, setPageAll] = useState(1);
  const [pageUnread, setPageUnread] = useState(1);
  const [totalAll, setTotalAll] = useState(0);
  const [totalUnread, setTotalUnread] = useState(0);

  const isResettingAll = useRef(false);
  const isResettingUnread = useRef(false);

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

  useEffect(() => {
    if (!allData) return;
    setTotalAll(allData.totalCount);
    setAllItems(prev =>
      mergeItems(prev, allData.items, isResettingAll.current),
    );
    isResettingAll.current = false;
  }, [allData]);

  useEffect(() => {
    if (!unreadData) return;
    setTotalUnread(unreadData.totalCount);
    setUnreadItems(prev =>
      mergeItems(prev, unreadData.items, isResettingUnread.current),
    );
    isResettingUnread.current = false;
  }, [unreadData]);

  const resetAll = useCallback(() => {
    isResettingAll.current = true;
    isResettingUnread.current = true;
    setPageAll(1);
    setPageUnread(1);
    refetchAll();
    refetchUnread();
  }, [refetchAll, refetchUnread]);

  useEffect(() => {
    if (isAllFilter) {
      isResettingAll.current = true;
      setPageAll(1);
      refetchAll();
    } else {
      isResettingUnread.current = true;
      setPageUnread(1);
      refetchUnread();
    }
  }, [isAllFilter, refetchAll, refetchUnread]);

  useEffect(() => {
    if (!hasUnread) return;
    resetAll();
  }, [hasUnread, resetAll]);

  // Derive per-tab actions once — removes repeated isAllFilter branching in handlers
  const setCurrentPage = isAllFilter ? setPageAll : setPageUnread;
  const isResettingCurrent = isAllFilter ? isResettingAll : isResettingUnread;
  const refetchCurrent = isAllFilter ? refetchAll : refetchUnread;

  const notificationsToRender = isAllFilter ? allItems : unreadItems;
  const isFetchingCurrent = isAllFilter ? isFetchingAll : isFetchingUnread;
  const isLoadingCurrent = isAllFilter ? isLoadingAll : isLoadingUnread;
  const currentPage = isAllFilter ? pageAll : pageUnread;
  const totalCurrent = isAllFilter ? totalAll : totalUnread;
  const hasMore = notificationsToRender.length < totalCurrent;
  const isRefreshing =
    isFetchingCurrent && currentPage === 1 && !isLoadingCurrent;
  const shouldShowFooter = isFetchingCurrent && currentPage > 1;

  const handleLoadMore = () => {
    if (isFetchingCurrent || !hasMore) return;
    setCurrentPage(prev => prev + 1);
  };

  const handleRefresh = () => {
    isResettingCurrent.current = true;
    setCurrentPage(1);
    refetchCurrent();
  };

  const handleMarkAllAsRead = async () => {
    try {
      if (!userToken) return;
      setIsMarkingAllRead(true);
      await readAllNotifications().unwrap();
      dispatch(hasUnreadNotifications(false));
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
      if (totalUnread === 1) dispatch(hasUnreadNotifications(false));
      await readSingleNotification(item.id);
      resetAll();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setIsMarkingAllRead(true);
      await deleteNotification(id).unwrap();
      resetAll();
    } catch (error) {
      console.log('Delete failed:', error);
      Toast.show({ type: 'error', text1: 'Some error occurred' });
    } finally {
      setIsMarkingAllRead(false);
    }
  };

  const renderItem = ({ item }: { item: NotificationItem }) => (
    <Notification
      item={item}
      onPress={() => handleSingleNotificationRead(item)}
      onDelete={handleDelete}
    />
  );

  const renderEmpty = () => {
    if (isLoadingCurrent) return null;
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
                { borderColor: isAllFilter ? Colors.primary : Colors.border },
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
                { borderColor: !isAllFilter ? Colors.primary : Colors.border },
              ]}
              onPress={() => setFilter('unread')}
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

      <View style={dynamicStyles.container}>
        {isLoadingCurrent || isMarkingAllRead ? (
          <View
            style={[
              dynamicStyles.notificationsContainer,
              { justifyContent: 'center', alignItems: 'center' },
            ]}
          >
            <ActivityIndicator size="large" />
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
            onRefresh={handleRefresh}
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
