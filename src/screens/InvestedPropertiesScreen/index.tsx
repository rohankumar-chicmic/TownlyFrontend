import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './styles';
import useStyles from '@hooks/useStyles';
import useTheme from '@hooks/useTheme';

import SearchInput from '@components/molecules/SearchInput';
import BackButton from '@components/atoms/BackButton';
import HoldingPropertyCard from '@components/molecules/HoldingPropertyCard';

import { useLazyGetMyInvestedPropertiesQuery } from '@redux/PropertyApiReducer';

const InvestedPropertiesScreen = () => {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();

  const [text, setText] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);
  const [list, setList] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const [trigger, { data, isLoading, isFetching }] =
    useLazyGetMyInvestedPropertiesQuery();

  // ================= DEBOUNCE =================
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(text);
    }, 500);

    return () => clearTimeout(handler);
  }, [text]);

  // ================= FETCH =================
  const fetchData = useCallback(
    (pageNumber: number, search: string) => {
      trigger({
        page: pageNumber,
        pageSize: 10,
        search,
      });
    },
    [trigger],
  );

  // ================= RESET ON SEARCH =================
  useEffect(() => {
    setPage(1);
    setList([]);
    setHasMore(true);
    fetchData(1, debouncedSearch);
  }, [debouncedSearch, fetchData]);

  // ================= LOAD MORE =================
  useEffect(() => {
    if (page > 1) {
      fetchData(page, debouncedSearch);
    }
  }, [page, fetchData]);

  // ================= SYNC DATA =================
  useEffect(() => {
    if (data) {
      setList(prev => (page === 1 ? data.items : [...prev, ...data.items]));
      setHasMore(data.hasMore);
    }
  }, [data, page]);

  // ================= PAGINATION =================
  const loadMore = () => {
    if (!isFetching && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  // // ================= FOOTER =================
  // const footer = isFetching ? (
  //   <View style={dynamicStyles.footerContainer}>
  //     <ActivityIndicator size="large" color={Colors.primary} />
  //   </View>
  // ) : !hasMore && list.length > 0 ? (
  //   <View style={dynamicStyles.footerContainer}>
  //     <Text style={dynamicStyles.endText}>No more invested properties</Text>
  //   </View>
  // ) : null;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* HEADER */}
      <View style={{ padding: 10 }}>
        <BackButton />
        <Text style={[dynamicStyles.heroText, { alignSelf: 'center' }]}>
          Your Invested Properties
        </Text>
      </View>

      {/* SEARCH */}
      <View style={dynamicStyles.container}>
        <SearchInput text={text} setText={setText} />
      </View>

      {/* LIST */}
      {isLoading && page === 1 ? (
        <View style={dynamicStyles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={dynamicStyles.loadingText}>Loading portfolio...</Text>
        </View>
      ) : (
        <FlatList
          data={list}
          keyExtractor={item => item.investmentId.toString()}
          renderItem={({ item }) => (
            <View style={{width: '100%'}}>
              <HoldingPropertyCard {...item} />
            </View>
          )}
          // ListFooterComponent={footer}
          contentContainerStyle={{ padding: 12, gap: 10, alignItems: 'center'}}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
        />
      )}
    </SafeAreaView>
  );
};

export default InvestedPropertiesScreen;
