import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './styles';
import useStyles from '@hooks/useStyles';
import useTheme from '@hooks/useTheme';

import SearchInput from '@components/molecules/SearchInput';
import BackButton from '@components/atoms/BackButton';
import CardContainer2 from '@components/molecules/CardContainer2';

import { useLazyGetMyPropertiesQuery } from '@redux/PropertyApiReducer';

const CARD_WIDTH = Dimensions.get('window').width * 0.75;

const ListedProperiesScreen = () => {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();

  // ================= STATE =================
  const [text, setText] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);
  const [list, setList] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const [trigger, { data, isLoading, isFetching }] =
    useLazyGetMyPropertiesQuery();

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
      setList(prev =>
        page === 1 ? data.items : [...prev, ...data.items],
      );
      setHasMore(data.hasMore);
    }
  }, [data, page]);

  // ================= PAGINATION =================
  const loadMore = () => {
    if (!isFetching && hasMore) {
      setPage(prev => prev + 1);
    }
  };



  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* HEADER */}
      <View style={{ padding: 10 }}>
        <BackButton />
        <Text style={[dynamicStyles.heroText, { alignSelf: 'center' }]}>
          My Listed Properties
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
          <Text style={dynamicStyles.loadingText}>
            Loading properties...
          </Text>
        </View>
      ) : (
        <FlatList
          data={list}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ width: CARD_WIDTH }}>
              <CardContainer2 userOwned {...item} />
            </View>
          )}
          contentContainerStyle={{ padding: 12, gap: 12 }}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
        />
      )}
    </SafeAreaView>
  );
};

export default ListedProperiesScreen;
