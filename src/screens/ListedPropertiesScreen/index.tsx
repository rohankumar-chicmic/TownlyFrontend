import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './styles';
import useStyles from '@hooks/useStyles';
import useTheme from '@hooks/useTheme';

import BackButton from '@components/atoms/BackButton';
import CardContainer2 from '@components/molecules/CardContainer2';
import FilterButton from '@components/atoms/FilterButton';

import { useLazyGetMyPropertiesQuery } from '@redux/PropertyApiReducer';

const CARD_WIDTH = Dimensions.get('window').width * 0.9;

const ListedProperiesScreen = () => {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();

  // ================= STATE =================
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [list, setList] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const [trigger, { data, isFetching, isLoading }] =
    useLazyGetMyPropertiesQuery();

  // ================= FETCH FUNCTION =================
  const fetchData = (pageNumber: number, statusValue: string) => {
    trigger({
      page: pageNumber,
      pageSize: 10,
      status: statusValue,
    });
  };

  // ================= INITIAL + STATUS CHANGE =================
  useEffect(() => {
    setPage(1);
    setList([]);
    setHasMore(true);
    fetchData(1, status);
  }, [status]);

  // ================= PAGE CHANGE =================
  useEffect(() => {
    if (page > 1) {
      fetchData(page, status);
    }
  }, [page]);

  // ================= SYNC DATA =================
  useEffect(() => {
    if (data) {
      // If backend returns array only:
      const items = Array.isArray(data) ? data : data.items || [];

      setList(prev => (page === 1 ? items : [...prev, ...items]));

      // If backend sends hasMore:
      if (!Array.isArray(data) && data.hasMore !== undefined) {
        setHasMore(data.hasMore);
      } else {
        // fallback: assume no more when less than pageSize returned
        setHasMore(items.length === 10);
      }
    }
  }, [data]);

  // ================= LOAD MORE =================
  const handleEndReached = () => {
    if (!isFetching && hasMore) {
      setPage(prev => prev + 1);
    }
  };
  console.log(data);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* HEADER */}
      <View style={{ padding: 10 }}>
        <BackButton />
        <Text style={[dynamicStyles.heroText, { alignSelf: 'center' }]}>
          My Listed Properties
        </Text>
      </View>

      {/* FILTERS */}
      <View
        style={{
          flexDirection: 'row',
          borderBottomColor: Colors.border,
          borderBottomWidth: 1,
          marginTop: 10,
        }}
      >
        <FilterButton
          label="All"
          value={''}
          currentValue={status}
          onPress={() => setStatus('')}
        />

        <FilterButton
          label="Pending"
          value={1}
          currentValue={status}
          onPress={() => setStatus(1)}
        />

        <FilterButton
          label="Active"
          value={2}
          currentValue={status}
          onPress={() => setStatus(2)}
        />

        <FilterButton
          label="Sold out"
          value={3}
          currentValue={status}
          onPress={() => setStatus(3)}
        />

        <FilterButton
          label="Rejected"
          value={4}
          currentValue={status}
          onPress={() => setStatus(4)}
        />
      </View>

      {/* LOADER */}
      {isLoading && page === 1 && (
        <Text style={[dynamicStyles.heroText, { textAlign: 'center' }]}>
          Loading Properties...
        </Text>
      )}

      {/* LIST */}
      <FlatList
        data={list}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ width: CARD_WIDTH }}>
            <CardContainer2 userOwned {...item} />
          </View>
        )}
        contentContainerStyle={{
          padding: 10,
          gap: 12,
          alignItems: 'center',
        }}
        showsVerticalScrollIndicator={false}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetching && page > 1 ? (
            <Text style={{ textAlign: 'center', padding: 10 }}>
              Loading more...
            </Text>
          ) : null
        }
        style={{ backgroundColor: Colors.background }}
      />
    </SafeAreaView>
  );
};

export default ListedProperiesScreen;
